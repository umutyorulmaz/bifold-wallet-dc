// NFCHandler.tsx
import { useAgent } from '@credo-ts/react-hooks'
import { useNavigation } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useCallback, useEffect, useState } from 'react'
import { Alert } from 'react-native'
import NfcManager, { Ndef, NfcTech } from 'react-native-nfc-manager'

import { ConsoleLogger } from '../../services/logger'
import { RootStackParams, Screens } from '../../types/navigators'

const logger = new ConsoleLogger()

const NFCHandler: React.FC = () => {
  return null // Since this component manages NFC logic, no rendering is needed
}

export default NFCHandler

export const useNFC = () => {
  const { agent } = useAgent()
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>()
  const [isNfcScanning, setIsNfcScanning] = useState(false)
  const [isNfcManagerStarted, setIsNfcManagerStarted] = useState(false) // Track if NfcManager has been started

  const handleConnectToInvitation = async (invitationLink: string) => {
    if (!agent) {
      logger.error('Agent is not initialized')
      Alert.alert('Error', 'Unable to connect. Please try again later.')
      return
    }

    try {
      const invitation = await agent.oob.parseInvitation(invitationLink)
      const invitationId = invitation.id

      // Check for existing out-of-band record
      const existingOutOfBandRecord = await agent.oob.findByReceivedInvitationId(invitationId)
      if (existingOutOfBandRecord) {
        const existingConnections = await agent.connections.findAllByOutOfBandId(existingOutOfBandRecord.id)

        if (existingConnections && existingConnections.length > 0) {
          const existingConnection = existingConnections[0]
          navigation.navigate(Screens.Chat, { connectionId: existingConnection.id })
          return
        }
      }

      // If no existing connection, proceed with receiving the invitation
      const { outOfBandRecord, connectionRecord } = await agent.oob.receiveInvitation(invitation, {
        autoAcceptConnection: true,
      })

      if (connectionRecord) {
        navigation.navigate(Screens.Chat, { connectionId: connectionRecord.id })
      } else {
        // If no connectionRecord is created immediately, we need to wait for it
        const connection = await agent.connections.returnWhenIsConnected(outOfBandRecord.id)
        navigation.navigate(Screens.Chat, { connectionId: connection.id })
      }
    } catch (error) {
      logger.error('Error processing the invitation:', error as object)
      Alert.alert('Error', 'An error occurred while connecting. Please try again.')
    }
  }

  const startNfcScan = useCallback(async () => {
    if (isNfcScanning) {
      // eslint-disable-next-line no-console
      console.warn('NFC scan already in progress, ignoring duplicate request.')
      return
    }

    const handleTagDiscovered = async (tag: any) => {
      try {
        if (tag?.ndefMessage?.length > 0) {
          const payload = tag.ndefMessage[0].payload
          const text = Ndef.text.decodePayload(payload)
          const invitationLink = text.replace(/^[a-z]{2}/, '').trim()

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
      }
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

      // Request NDEF technology to start NFC scanning
      await NfcManager.requestTechnology(NfcTech.Ndef)

      try {
        const tag = await NfcManager.getTag()
        if (tag) {
          await handleTagDiscovered(tag)
        } else {
          Alert.alert('Error', 'No NFC tag found or could not read the tag.')
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn('Error reading NFC tag:', error)
        Alert.alert('Error', 'Failed to read NFC tag. Please try again.')
      } finally {
        // Clean up the NFC session
        await NfcManager.cancelTechnologyRequest()
        setIsNfcScanning(false)
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('Error starting NFC scan:', error)
      Alert.alert('Error', 'Failed to start NFC scan. Please try again.')
      setIsNfcScanning(false)
    }
  }, [isNfcScanning, isNfcManagerStarted])

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

    return () => {
      // Clean up any ongoing NFC sessions when the component unmounts
      NfcManager.cancelTechnologyRequest().catch(() => {})
    }
  }, [isNfcManagerStarted])

  return { startNfcScan }
}
