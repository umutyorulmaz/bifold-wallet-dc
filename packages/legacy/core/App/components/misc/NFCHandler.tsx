//NFCHandler.tsx
import { useAgent } from '@credo-ts/react-hooks'
import { useNavigation } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useCallback, useEffect, useState } from 'react'
import { Alert } from 'react-native'
// eslint-disable-next-line import/no-extraneous-dependencies
import NfcManager, { NfcTech, Ndef } from 'react-native-nfc-manager'

import { ConsoleLogger } from '../../services/logger'
import { RootStackParams, Screens, Stacks, TabStacks } from '../../types/navigators'
import { connectFromScanOrDeepLink } from '../../utils/helpers'

const logger = new ConsoleLogger()

const NFCHandler: React.FC = () => {
  return null // Since this component manages NFC logic, no rendering is needed
}

export default NFCHandler

export const useNFC = () => {
  const { agent } = useAgent()
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>()
  const [isNfcScanning, setIsNfcScanning] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false) // Track if the event is registered
  const [isTechRequested, setIsTechRequested] = useState(false) // Track if technology is requested
  const [isNfcManagerStarted, setIsNfcManagerStarted] = useState(false) // Track if NfcManager has been started

  const handleConnectToInvitation = async (invitationLink: string) => {
    if (!agent) {
      logger.error('Agent is not initialized')
      Alert.alert('Error', 'Unable to connect. Please try again later.')
      return
    }

    try {
      const parsedInvitation = await agent.oob.parseInvitation(invitationLink)
      const invitationId = parsedInvitation.id

      const existingOutOfBandRecord = await agent.oob.findByReceivedInvitationId(invitationId)
      if (existingOutOfBandRecord) {
        const existingConnections = await agent.connections.findAllByOutOfBandId(existingOutOfBandRecord.id)

        if (existingConnections && existingConnections.length > 0) {
          const existingConnection = existingConnections[0]
          navigation.reset({
            index: 0,
            routes: [
              {
                name: Stacks.TabStack,
                params: {
                  screen: TabStacks.HomeStack,
                  params: {
                    screen: Screens.Home,
                  },
                },
              },
              {
                name: Screens.Chat,
                params: { connectionId: existingConnection.id },
              },
            ],
          })
          return
        }
      }

      const { connectionRecord, outOfBandRecord } = await connectFromScanOrDeepLink(
        invitationLink,
        agent,
        logger,
        navigation,
        false,
        false,
        true
      )

      if (connectionRecord?.id) {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: Stacks.TabStack,
              params: {
                screen: TabStacks.HomeStack,
                params: {
                  screen: Screens.Home,
                },
              },
            },
            {
              name: Screens.Chat,
              params: { connectionId: connectionRecord.id },
            },
          ],
        })
      } else if (outOfBandRecord?.id) {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: Stacks.TabStack,
              params: {
                screen: TabStacks.HomeStack,
                params: {
                  screen: Screens.Home,
                },
              },
            },
            {
              name: Screens.Chat,
              params: { outOfBandRecordId: outOfBandRecord.id },
            },
          ],
        })
      } else {
        logger.error('Neither connectionId nor outOfBandRecordId found')
        Alert.alert('Error', 'Unable to start chat. Please try again.')
      }
    } catch (error) {
      logger.error('Error processing the invitation:', error as object)
      Alert.alert('Error', 'An error occurred while connecting. Please try again.')
    }
  }

  const cleanUpNfcSession = async () => {
    try {
      if (isRegistered) {
        await NfcManager.unregisterTagEvent()
        setIsRegistered(false)
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('Error during NFC cleanup (unregisterTagEvent):', e)
    }

    try {
      if (isTechRequested) {
        await NfcManager.cancelTechnologyRequest()
        setIsTechRequested(false)
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('Error during NFC cleanup (cancelTechnologyRequest):', e)
    }

    setIsNfcScanning(false)
  }

  // Initialize NFC in the useEffect
  useEffect(() => {
    const initializeNfc = async () => {
      try {
        if (!isNfcManagerStarted) {
          await NfcManager.start()
          setIsNfcManagerStarted(true) // Set the state when NfcManager is successfully started
          // eslint-disable-next-line no-console
          console.log('NFC Manager initialized')
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn('Failed to initialize NFC Manager', error)
      }
    }

    initializeNfc()

    return () => {
      cleanUpNfcSession()
    }
  }, [isNfcManagerStarted]) // Add isNfcManagerStarted as a dependency

  const handleTagDiscovered = async (tag: any) => {
    try {
      if (tag?.ndefMessage?.length > 0) {
        const invitationLink = Ndef.text
          .decodePayload(new Uint8Array(tag.ndefMessage[0].payload))
          .replace(/^[a-z]{2}/, '')
          .trim()

        // eslint-disable-next-line no-console
        console.log('cleanInvitationLink', invitationLink)
        await handleConnectToInvitation(invitationLink)
      } else {
        Alert.alert('Error', 'No valid invitation found in the NFC tag.')
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error handling tag data:', error)
      Alert.alert('Error', 'An error occurred while processing the NFC tag.')
    } finally {
      cleanUpNfcSession()
    }
  }

  const startNfcScan = useCallback(async () => {
    if (isNfcScanning) {
      // eslint-disable-next-line no-console
      console.warn('NFC scan already in progress, ignoring duplicate request.')
      return
    }

    setIsNfcScanning(true)
    try {
      // Ensure NfcManager is started before proceeding
      if (!isNfcManagerStarted) {
        await NfcManager.start() // Start the NFC Manager
        setIsNfcManagerStarted(true) // Update the state indicating it's started
      }

      const isSupported = await NfcManager.isSupported()
      if (!isSupported) {
        Alert.alert('Error', 'NFC is not supported on this device')
        setIsNfcScanning(false)
        return
      }

      const isEnabled = await NfcManager.isEnabled()
      if (!isEnabled) {
        Alert.alert('Error', 'NFC is not enabled. Please enable NFC in your device settings.')
        setIsNfcScanning(false)
        return
      }

      // Check if already registered before registering again
      if (!isRegistered) {
        try {
          await NfcManager.registerTagEvent()
          setIsRegistered(true)
        } catch (registerError) {
          // eslint-disable-next-line no-console
          console.warn('Failed to register tag event:', registerError)
          Alert.alert('Error', 'Failed to register NFC tag event. Please try again.')
          setIsNfcScanning(false)
          return
        }
      }

      // Ensure we request the technology only if not already requested
      if (!isTechRequested) {
        try {
          await NfcManager.requestTechnology(NfcTech.Ndef)
          setIsTechRequested(true)
        } catch (techRequestError) {
          // eslint-disable-next-line no-console
          console.warn('Failed to request NFC technology:', techRequestError)
          Alert.alert('Error', 'Failed to request NFC technology. Please try again.')
          cleanUpNfcSession()
          return
        }
      }

      const tag = await NfcManager.getTag()
      if (tag) {
        await handleTagDiscovered(tag)
      } else {
        Alert.alert('Error', 'No NFC tag found or could not read the tag.')
        cleanUpNfcSession()
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('Error starting NFC scan:', error)
      Alert.alert('Error', 'Failed to start NFC scan. Please try again.')
      cleanUpNfcSession()
    }
  }, [isNfcScanning, isRegistered, isTechRequested, isNfcManagerStarted])

  return { startNfcScan }
}
