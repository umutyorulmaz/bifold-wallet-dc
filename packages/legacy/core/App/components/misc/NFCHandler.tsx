//NFCHandler.tsx
import { useAgent } from '@credo-ts/react-hooks'
import { useNavigation } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useCallback, useEffect, useState } from 'react'
import { Alert } from 'react-native'
import NfcManager, { Ndef, NfcEvents } from 'react-native-nfc-manager'

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
    setIsNfcScanning(false)
  }

  const handleTagDiscovered = (tag: any) => {
    if (tag?.ndefMessage?.length > 0) {
      const payload = tag.ndefMessage[0].payload
      const text = Ndef.text.decodePayload(payload)
      const invitationLink = text.replace(/^[a-z]{2}/, '').trim()

      // eslint-disable-next-line no-console
      console.log('cleanInvitationLink', invitationLink)

      handleConnectToInvitation(invitationLink)
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error('Error handling tag data:', error)
          Alert.alert('Error', 'An error occurred while processing the NFC tag.')
        })
        .finally(() => {
          cleanUpNfcSession()
        })
    } else {
      Alert.alert('Error', 'No valid invitation found in the NFC tag.')
      cleanUpNfcSession()
    }
  }

  const handleSessionClosed = () => {
    // eslint-disable-next-line no-console
    console.log('NFC Session closed')
    setIsNfcScanning(false)
  }

  // Initialize NFC in the useEffect
  useEffect(() => {
    const initializeNfc = async () => {
      try {
        if (!isNfcManagerStarted) {
          await NfcManager.start()
          setIsNfcManagerStarted(true)
          // eslint-disable-next-line no-console
          console.log('NFC Manager initialized')
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn('Failed to initialize NFC Manager', error)
      }
    }

    initializeNfc()

    NfcManager.setEventListener(NfcEvents.DiscoverTag, handleTagDiscovered)
    NfcManager.setEventListener(NfcEvents.SessionClosed, handleSessionClosed)

    return () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null)
      NfcManager.setEventListener(NfcEvents.SessionClosed, null)
      cleanUpNfcSession()
    }
  }, [])

  const startNfcScan = useCallback(async () => {
    if (isNfcScanning) {
      // eslint-disable-next-line no-console
      console.warn('NFC scan already in progress, ignoring duplicate request.')
      return
    }

    setIsNfcScanning(true)
    try {
      if (!isNfcManagerStarted) {
        // eslint-disable-next-line no-console
        console.log('Starting NFC Manager')
        await NfcManager.start()
        setIsNfcManagerStarted(true)
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

      if (!isRegistered) {
        try {
          await NfcManager.registerTagEvent()
          setIsRegistered(true)
        } catch (registerError: unknown) {
          if (registerError instanceof Error && registerError.message === 'Duplicated registration') {
            // eslint-disable-next-line no-console
            console.warn('NFC already registered, proceeding.')
            setIsRegistered(true)
          } else {
            // eslint-disable-next-line no-console
            console.warn('Failed to register tag event:', registerError)
            Alert.alert('Error', 'Failed to register NFC tag event. Please try again.')
            setIsNfcScanning(false)
            return
          }
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('Error starting NFC scan:', error)
      Alert.alert('Error', 'Failed to start NFC scan. Please try again.')
      cleanUpNfcSession()
    }
  }, [isNfcScanning, isRegistered, isNfcManagerStarted])

  return { startNfcScan }
}
