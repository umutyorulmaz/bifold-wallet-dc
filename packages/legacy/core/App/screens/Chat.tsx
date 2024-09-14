import {
  BasicMessageRecord,
  BasicMessageRepository,
  CredentialExchangeRecord,
  CredentialState,
  ProofExchangeRecord,
  ProofState,
  ConnectionRecord,
} from '@credo-ts/core'
import { useAgent, useBasicMessagesByConnectionId, useConnectionById } from '@credo-ts/react-hooks'
import { isPresentationReceived } from '@hyperledger/aries-bifold-verifier'
import { useIsFocused, useNavigation } from '@react-navigation/core'
import { StackScreenProps, StackNavigationProp } from '@react-navigation/stack'
import React, { useMemo, useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { View, Text, StyleSheet, Alert } from 'react-native'
import { GiftedChat, IMessage } from 'react-native-gifted-chat'
import { SafeAreaView } from 'react-native-safe-area-context'

import InfoIcon from '../components/buttons/InfoIcon'
import { renderComposer, renderInputToolbar, renderSend } from '../components/chat'
import ActionMenuBubble from '../components/chat/ActionMenuMessage'
import ActionSlider from '../components/chat/ActionSlider'
import { renderActions } from '../components/chat/ChatActions'
import { ChatEvent } from '../components/chat/ChatEvent'
import { ChatMessage, ExtendedChatMessage, CallbackType } from '../components/chat/ChatMessage'
import { useNetwork } from '../contexts/network'
import { useStore } from '../contexts/store'
import { useTheme } from '../contexts/theme'
//import { useChatMessagesByConnection } from '../hooks/chat-messages'
import { useCredentialsByConnectionId } from '../hooks/credentials'
import { useProofsByConnectionId } from '../hooks/proofs'
import { ConsoleLogger } from '../services/logger'
import { Role } from '../types/chat'
import { BasicMessageMetadata, basicMessageCustomMetadata } from '../types/metadata'
import { RootStackParams, ContactStackParams, Screens, Stacks } from '../types/navigators'
import {
  connectFromScanOrDeepLink,
  getConnectionName,
  getCredentialEventLabel,
  getCredentialEventRole,
  getMessageEventRole,
  getProofEventLabel,
  getProofEventRole,
} from '../utils/helpers'

type ChatProps = StackScreenProps<ContactStackParams, Screens.Chat> | StackScreenProps<RootStackParams, Screens.Chat>

const Chat: React.FC<ChatProps> = ({ route }) => {
  if (!route?.params) {
    throw new Error('Chat route params were not set properly')
  }

  const { connectionId } = route.params
  const [store] = useStore()
  const { t } = useTranslation()
  const { agent } = useAgent()
  const navigation = useNavigation<StackNavigationProp<RootStackParams | ContactStackParams>>()
  const connection = useConnectionById(connectionId) as ConnectionRecord
  const basicMessages = useBasicMessagesByConnectionId(connectionId)
  //  const chatMessages = useChatMessagesByConnection(connection)
  const credentials = useCredentialsByConnectionId(connectionId)
  const proofs = useProofsByConnectionId(connectionId)
  const isFocused = useIsFocused()
  const { assertConnectedNetwork, silentAssertConnectedNetwork } = useNetwork()
  const [showActionSlider, setShowActionSlider] = useState(false)
  const [messages, setMessages] = useState<Array<ExtendedChatMessage>>([])
  const { ChatTheme: theme, Assets } = useTheme()
  // const { ColorPallet } = useTheme()
  const [theirLabel, setTheirLabel] = useState(getConnectionName(connection, store.preferences.alternateContactNames))

  const logger = new ConsoleLogger()

  useEffect(() => {
    setTheirLabel(getConnectionName(connection, store.preferences.alternateContactNames))
  }, [isFocused, connection, store.preferences.alternateContactNames])

  useMemo(() => {
    assertConnectedNetwork()
  }, [])

  useEffect(() => {
    navigation.setOptions({
      title: theirLabel,
      headerRight: () => <InfoIcon connectionId={connection?.id as string} />,
    })
  }, [connection, theirLabel])

  useEffect(() => {
    basicMessages.forEach((msg) => {
      const meta = msg.metadata.get(BasicMessageMetadata.customMetadata) as basicMessageCustomMetadata
      if (agent && !meta?.seen) {
        msg.metadata.set(BasicMessageMetadata.customMetadata, { ...meta, seen: true })
        const basicMessageRepository = agent.context.dependencyManager.resolve(BasicMessageRepository)
        basicMessageRepository.update(agent.context, msg)
      }
    })
  }, [basicMessages])

  const handleConnectToInvitation = async (invitationLink: string) => {
    if (!agent) {
      logger.error('Agent is not initialized')
      Alert.alert('Error', 'Unable to connect. Please try again later.')
      return
    }

    try {
      // Parse the invitation
      const parsedInvitation = await agent.oob.parseInvitation(invitationLink)
      const invitationId = parsedInvitation.id

      // Check for existing OutOfBandRecord
      const existingOutOfBandRecord = await agent.oob.findByReceivedInvitationId(invitationId)
      if (existingOutOfBandRecord) {
        // Handle existing OutOfBandRecord
        // For example, navigate to the existing chat or connection
        const existingConnections = await agent.connections.findAllByOutOfBandId(existingOutOfBandRecord.id)

        if (existingConnections && existingConnections.length > 0) {
          const existingConnection = existingConnections[0]
          navigation.navigate(Stacks.ContactStack as any, {
            screen: Screens.Chat,
            params: { connectionId: existingConnection.id },
          })
        }
        return
      }

      // Establish a new connection
      const { connectionRecord, outOfBandRecord } = await connectFromScanOrDeepLink(
        invitationLink,
        agent,
        logger,
        navigation,
        false,
        false,
        true // reuseConnection is true for this case
      )

      if (connectionRecord?.id) {
        navigation.navigate(Stacks.ContactStack as any, {
          screen: Screens.Chat,
          params: { connectionId: connectionRecord.id },
        })
      } else if (outOfBandRecord?.id) {
        navigation.navigate(Stacks.ContactStack as any, {
          screen: Screens.Chat,
          params: { outOfBandRecordId: outOfBandRecord.id },
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

  const handleActionButtonPress = async (action: string, workflowID: string, invitationLink?: string) => {
    if (invitationLink) {
      await handleConnectToInvitation(invitationLink)
    } else {
      const actionJSON = {
        workflowID: `${workflowID}`,
        actionID: `${action}`,
        data: {},
      }
      await agent?.basicMessages.sendMessage(connectionId, `${JSON.stringify(actionJSON)}`)
    }
  }

  const styles = StyleSheet.create({
    leftContainer: {
      backgroundColor: 'rgba(211, 211, 211, 0.7)',
      borderRadius: 10,
      padding: 10,
      marginBottom: 10,
      alignSelf: 'flex-start',
    },
    rightContainer: {
      backgroundColor: 'rgba(0, 100, 200, 0.7)',
      borderRadius: 10,
      padding: 10,
      marginBottom: 10,
      alignSelf: 'flex-end',
    },
    leftText: {
      color: '#000',
    },
    rightText: {
      color: '#fff',
    },
  })

  useEffect(() => {
    const connectionName = getConnectionName(connection, store.preferences.alternateContactNames)
    const filteredBasicMessages = basicMessages.filter((record) => {
      // Check if the content is JSON
      let isJsonContent = false
      try {
        const parsedContent = JSON.parse(record.content)
        if (typeof parsedContent === 'object' && parsedContent !== null) {
          isJsonContent = true
        }
      } catch (e) {
        // Not a JSON string
      }

      // Get the role of the message sender
      const role = getMessageEventRole(record)

      if (
        (record.content === ':menu' && role === Role.me) ||
        record.content === `${connectionName} received your message` ||
        (isJsonContent && role === Role.me)
      ) {
        return false
      }

      return true
    })

    const transformedMessages: Array<ExtendedChatMessage> = filteredBasicMessages.map((record: BasicMessageRecord) => {
      const role = getMessageEventRole(record)
      let msgText: JSX.Element

      try {
        const content = JSON.parse(record.content)

        if (content && Array.isArray(content.displayData)) {
          msgText = (
            <ActionMenuBubble
              key={record.id}
              content={content.displayData}
              workflowID={content.workflowID}
              handleActionButtonPress={handleActionButtonPress}
            />
          )
        } else {
          msgText = (
            <View style={role === Role.me ? styles.rightContainer : styles.leftContainer}>
              <Text style={role === Role.me ? styles.rightText : styles.leftText}>{record.content}</Text>
            </View>
          )
        }
      } catch (e) {
        msgText = (
          <View style={role === Role.me ? styles.rightContainer : styles.leftContainer}>
            <Text style={role === Role.me ? styles.rightText : styles.leftText}>{record.content}</Text>
          </View>
        )
      }

      return {
        _id: record.id,
        text: record.content,
        renderEvent: () => msgText,
        createdAt: record.updatedAt || record.createdAt,
        type: record.type,
        user: { _id: role },
      }
    })

    const callbackTypeForMessage = (record: CredentialExchangeRecord | ProofExchangeRecord) => {
      if (
        record instanceof CredentialExchangeRecord &&
        (record.state === CredentialState.Done || record.state === CredentialState.OfferReceived)
      ) {
        return CallbackType.CredentialOffer
      }

      if (
        (record instanceof ProofExchangeRecord && isPresentationReceived(record) && record.isVerified !== undefined) ||
        record.state === ProofState.RequestReceived ||
        (record.state === ProofState.Done && record.isVerified === undefined)
      ) {
        return CallbackType.ProofRequest
      }

      if (
        record instanceof ProofExchangeRecord &&
        (record.state === ProofState.PresentationSent || record.state === ProofState.Done)
      ) {
        return CallbackType.PresentationSent
      }
    }

    transformedMessages.push(
      ...credentials.map((record: CredentialExchangeRecord) => {
        const role = getCredentialEventRole(record)
        const userLabel = role === Role.me ? t('Chat.UserYou') : theirLabel
        const actionLabel = t(getCredentialEventLabel(record) as any)

        return {
          _id: record.id,
          text: actionLabel,
          renderEvent: () => <ChatEvent role={role} userLabel={userLabel} actionLabel={actionLabel} />,
          createdAt: record.updatedAt || record.createdAt,
          type: record.type,
          user: { _id: role },
          messageOpensCallbackType: callbackTypeForMessage(record),
          onDetails: () => {
            const navMap: { [key in CredentialState]?: () => void } = {
              [CredentialState.Done]: () => {
                navigation.navigate(Stacks.ContactStack as any, {
                  screen: Screens.CredentialDetails,
                  params: { credential: record },
                })
              },
              [CredentialState.OfferReceived]: () => {
                navigation.navigate(Stacks.ContactStack as any, {
                  screen: Screens.CredentialOffer,
                  params: { credentialId: record.id },
                })
              },
            }
            const nav = navMap[record.state]
            if (nav) {
              nav()
            }
          },
        }
      })
    )

    transformedMessages.push(
      ...proofs.map((record: ProofExchangeRecord) => {
        const role = getProofEventRole(record)
        const userLabel = role === Role.me ? t('Chat.UserYou') : theirLabel
        const actionLabel = t(getProofEventLabel(record) as any)

        return {
          _id: record.id,
          text: actionLabel,
          renderEvent: () => <ChatEvent role={role} userLabel={userLabel} actionLabel={actionLabel} />,
          createdAt: record.updatedAt || record.createdAt,
          type: record.type,
          user: { _id: role },
          messageOpensCallbackType: callbackTypeForMessage(record),
          onDetails: () => {
            const toProofDetails = () => {
              navigation.navigate(Stacks.ContactStack as any, {
                screen: Screens.ProofDetails,
                params: {
                  recordId: record.id,
                  isHistory: true,
                  senderReview:
                    record.state === ProofState.PresentationSent ||
                    (record.state === ProofState.Done && record.isVerified === undefined),
                },
              })
            }
            const navMap: { [key in ProofState]?: () => void } = {
              [ProofState.Done]: toProofDetails,
              [ProofState.PresentationSent]: toProofDetails,
              [ProofState.PresentationReceived]: toProofDetails,
              [ProofState.RequestReceived]: () => {
                navigation.navigate(Stacks.ContactStack as any, {
                  screen: Screens.ProofRequest,
                  params: { proofId: record.id },
                })
              },
            }
            const nav = navMap[record.state]
            if (nav) {
              nav()
            }
          },
        }
      })
    )

    const connectedMessage = connection
      ? {
          _id: 'connected',
          text: `${t('Chat.YouConnected')} ${theirLabel}`,
          renderEvent: () => (
            <Text style={theme.rightText}>
              {t('Chat.YouConnected')}
              <Text style={[theme.rightText, theme.rightTextHighlighted]}> {theirLabel}</Text>
            </Text>
          ),
          createdAt: connection.createdAt,
          user: { _id: Role.me },
        }
      : undefined

    setMessages(
      connectedMessage
        ? [...transformedMessages.sort((a: any, b: any) => b.createdAt - a.createdAt), connectedMessage]
        : transformedMessages.sort((a: any, b: any) => b.createdAt - a.createdAt)
    )
  }, [basicMessages, credentials, proofs, theirLabel])

  const onSend = useCallback(
    async (messages: IMessage[]) => {
      await agent?.basicMessages.sendMessage(connectionId, messages[0].text)
    },
    [agent, connectionId]
  )

  const onSendRequest = useCallback(async () => {
    navigation.navigate(Stacks.ProofRequestsStack as any, {
      screen: Screens.ProofRequests,
      params: { navigation: navigation, connectionId },
    })
  }, [navigation, connectionId])

  const actions = useMemo(() => {
    return store.preferences.useVerifierCapability
      ? [
          {
            text: t('Verifier.SendProofRequest'),
            onPress: () => {
              setShowActionSlider(false)
              onSendRequest()
            },
            icon: () => <Assets.svg.iconInfoSentDark height={30} width={30} />,
          },
        ]
      : undefined
  }, [t, store.preferences.useVerifierCapability, onSendRequest])

  const onDismiss = () => {
    setShowActionSlider(false)
  }

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={{ flex: 1, paddingTop: 20 }}>
      <GiftedChat
        messages={messages}
        showAvatarForEveryMessage={true}
        alignTop
        renderAvatar={() => null}
        messageIdGenerator={(msg) => msg?._id.toString() || '0'}
        renderMessage={(props) => <ChatMessage messageProps={props} />}
        renderInputToolbar={(props) => renderInputToolbar(props, theme)}
        renderSend={(props) => renderSend(props, theme)}
        renderComposer={(props) => renderComposer(props, theme, t('Contacts.TypeHere'))}
        disableComposer={!silentAssertConnectedNetwork()}
        onSend={onSend}
        user={{
          _id: Role.me,
        }}
        renderActions={(props) => renderActions(props, theme, actions)}
        onPressActionButton={actions ? () => setShowActionSlider(true) : undefined}
      />
      {showActionSlider && <ActionSlider onDismiss={onDismiss} actions={actions} />}
    </SafeAreaView>
  )
}

export default Chat
