//PushNotificationsHelper.ts
import type { ParsedMessageType } from '@aries-framework/core/build/utils/messageType'

import {
  Agent,
  ConnectionRecord,
  ConnectionType,
  AgentMessage,
  AgentContext,
  ConnectionService,
  MessageSender,
  OutboundMessageContext,
  ReturnRouteTypes,
} from '@aries-framework/core'
import { FcmDeviceInfo } from '@aries-framework/push-notifications/build/fcm/models/FcmDeviceInfo'
import AsyncStorage from '@react-native-async-storage/async-storage'
// eslint-disable-next-line import/no-extraneous-dependencies
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging'
// eslint-disable-next-line import/no-extraneous-dependencies
import { Platform } from 'react-native'
import { Config } from 'react-native-config'
import { request, check, PERMISSIONS, RESULTS, PermissionStatus } from 'react-native-permissions'
import { v4 as uuidv4 } from 'uuid'

const TOKEN_STORAGE_KEY = 'deviceToken'

class PushNotificationsFcmDeviceInfoMessage extends AgentMessage {
  public static readonly type: ParsedMessageType = {
    messageName: 'device-info',
    protocolName: 'push-notifications-fcm',
    protocolMajorVersion: 1,
    protocolMinorVersion: 0,
    protocolVersion: '1.0',
    documentUri: 'https://didcomm.org',
    protocolUri: 'https://didcomm.org/push-notifications-fcm/1.0',
    messageTypeUri: 'https://didcomm.org/push-notifications-fcm/1.0/device-info',
  }

  public deviceToken: string
  public devicePlatform: string

  public constructor(options: { id?: string; deviceToken: string; devicePlatform: string }) {
    super()
    this.id = options.id || uuidv4()
    this.deviceToken = options.deviceToken
    this.devicePlatform = options.devicePlatform
    //this.type = PushNotificationsFcmDeviceInfoMessage.type
  }

  protected override getMessageType(): string {
    return PushNotificationsFcmDeviceInfoMessage.type
  }
  public toJSON(): Record<string, unknown> {
    return {
      ...super.toJSON(),
      //'@type': this.type,
      device_token: this.deviceToken,
      device_platform: this.devicePlatform,
    }
  }
}
//   public deviceToken: string
//   public devicePlatform: string

//   public toJSON(): Record<string, unknown> {
//     return classToPlain(this, { excludePrefixes: ['_'] })
//   }

//   public static fromJSON(json: Record<string, unknown>): PushNotificationsFcmDeviceInfoMessage {
//     return plainToClass(PushNotificationsFcmDeviceInfoMessage, json, {
//       excludePrefixes: ['_'],
//     })
//   }
// }

class PushNotificationsFcmApi {
  private messageSender: MessageSender
  private connectionService: ConnectionService
  private agentContext: AgentContext

  public constructor(messageSender: MessageSender, connectionService: ConnectionService, agentContext: AgentContext) {
    this.messageSender = messageSender
    this.connectionService = connectionService
    this.agentContext = agentContext
  }

  public async setDeviceInfo(connectionId: string, deviceInfo: FcmDeviceInfo): Promise<void> {
    const customMessage = new PushNotificationsFcmDeviceInfoMessage({
      deviceToken: deviceInfo.deviceToken,
      devicePlatform: deviceInfo.devicePlatform,
    })

    customMessage.setReturnRouting(ReturnRouteTypes.all)

    // eslint-disable-next-line no-console
    console.log('Sending message:', JSON.stringify(customMessage, null, 2))

    try {
      const connection = await this.connectionService.getById(this.agentContext, connectionId)
      const outboundMessageContext = new OutboundMessageContext(customMessage, {
        agentContext: this.agentContext,
        connection: connection,
      })

      await this.messageSender.sendMessage(outboundMessageContext)
      // eslint-disable-next-line no-console
      console.log('Message sent successfully')
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error sending message:', error)
      throw error
    }
  }
}

// eslint-disable-next-line no-console
console.log('TOKEN_STORAGE_KEY:', TOKEN_STORAGE_KEY)

const enum NotificationPermissionStatus {
  DENIED = 'denied',
  GRANTED = 'granted',
  UNKNOWN = 'unknown',
}

/**
 * Handler Section
 */

const backgroundHandler = (): void => {
  return messaging().setBackgroundMessageHandler(async () => {
    // Do nothing with background messages. Defaults to login and home screen flow
  })
}

const foregroundHandler = (): (() => void) => {
  return messaging().onMessage(async () => {
    // Ignore foreground messages
  })
}

/**
 * Permissions Section
 */

const requestNotificationPermission = async (): Promise<PermissionStatus> => {
  const result = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS)
  return result
}

const formatPermissionIos = (permission: FirebaseMessagingTypes.AuthorizationStatus): NotificationPermissionStatus => {
  switch (permission) {
    case messaging.AuthorizationStatus.AUTHORIZED:
      return NotificationPermissionStatus.GRANTED
    case messaging.AuthorizationStatus.DENIED:
      return NotificationPermissionStatus.DENIED
    case messaging.AuthorizationStatus.PROVISIONAL:
      return NotificationPermissionStatus.GRANTED
    default:
      return NotificationPermissionStatus.UNKNOWN
  }
}

const formatPermissionAndroid = (permission: PermissionStatus): NotificationPermissionStatus => {
  switch (permission) {
    case RESULTS.GRANTED:
      return NotificationPermissionStatus.GRANTED
    case RESULTS.DENIED:
      return NotificationPermissionStatus.DENIED
    case RESULTS.BLOCKED:
      return NotificationPermissionStatus.DENIED
    default:
      return NotificationPermissionStatus.UNKNOWN
  }
}

const requestPermission = async (): Promise<NotificationPermissionStatus> => {
  // IOS doesn't need the extra permission logic like android
  if (Platform.OS === 'ios') {
    const permission = await messaging().requestPermission()
    return formatPermissionIos(permission)
  }

  const checkPermission = await check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS)
  if (checkPermission !== RESULTS.GRANTED) {
    const result = await requestNotificationPermission()

    return formatPermissionAndroid(result)
  }
  return formatPermissionAndroid(checkPermission)
}

/**
 * Helper Functions Section
 */

const getMediatorConnection = async (agent: Agent): Promise<ConnectionRecord | undefined> => {
  const connections: ConnectionRecord[] = await agent.connections.getAll()
  const mediators = connections.filter((r) => r.connectionTypes.includes(ConnectionType.Mediator))
  if (mediators.length < 1) {
    agent.config.logger.warn(`Mediator connection not found`)
    return undefined
  }

  // get most recent mediator connection
  const latestMediator = mediators.reduce((acc, cur) => {
    if (!acc.updatedAt) {
      if (!cur.updatedAt) {
        return acc.createdAt > cur.createdAt ? acc : cur
      } else {
        return acc.createdAt > cur.updatedAt ? acc : cur
      }
    }

    if (!cur.updatedAt) {
      return acc.updatedAt > cur.createdAt ? acc : cur
    } else {
      return acc.updatedAt > cur.updatedAt ? acc : cur
    }
  })

  return latestMediator
}

/**
 * Checks wether the user denied permissions on the info modal
 * @returns {Promise<boolean>}
 */
const isUserDenied = async (): Promise<boolean> => {
  return (await AsyncStorage.getItem('userDeniedPushNotifications')) === 'true'
}

/**
 * Uses the discover didcomm protocol to check with the mediator if it supports the firebase push notification protocol
 * @param agent - The active aries agent
 * @returns {Promise<boolean>}
 */
const isMediatorCapable = async (agent: Agent): Promise<boolean | undefined> => {
  if (Config.MEDIATOR_USE_PUSH_NOTIFICATIONS !== 'true') {
    return false
  }

  const mediator = await getMediatorConnection(agent)
  if (!mediator) return

  const response = await agent.discovery.queryFeatures({
    awaitDisclosures: true,
    connectionId: mediator.id,
    protocolVersion: 'v1',
    queries: [
      {
        featureType: 'protocol',
        match: 'https://didcomm.org/push-notifications-fcm/1.0',
      },
    ],
  })
  if (response.features && response.features?.length > 0) {
    return true
  }
  return false
}

/**
 * Checks if the device token is already registered by checking the permission was granted and the storage key was used
 * @param token - If defined will use this token instead of fetching with firebase
 * @returns {Promise<boolean>}
 */
const isRegistered = async (): Promise<boolean> => {
  const authorized = (await messaging().hasPermission()) === messaging.AuthorizationStatus.AUTHORIZED

  // Need to register for push notification capability on iOS
  if (Platform.OS === 'ios' && !messaging().isDeviceRegisteredForRemoteMessages) {
    await messaging().registerDeviceForRemoteMessages()
  }

  if (authorized && (await AsyncStorage.getItem(TOKEN_STORAGE_KEY)) !== null) {
    return true
  }
  return false
}

/**
 * Checks if push notifications are enabled by checking if the stored token matches the expected firebase token
 * @returns {Promise<boolean>}
 */
const isEnabled = async (): Promise<boolean> => {
  try {
    return (await messaging().getToken()) === (await AsyncStorage.getItem(TOKEN_STORAGE_KEY))
  } catch (error) {
    return false
  }
}

/**
 * Attempts to send the device token to the mediator agent. If the token is blank this is equivalent to disabling
 * @param agent - The active aries agent
 * @param blankDeviceToken - If true, will send an empty string as the device token to the mediator
 * @returns {Promise<void>}
 */
const setDeviceInfo = async (agent: Agent, blankDeviceToken = false): Promise<void> => {
  let token
  // eslint-disable-next-line no-console
  console.log('token:', token)
  if (blankDeviceToken) {
    token = ''
    // eslint-disable-next-line no-console
    console.log('token:', token)
  } else {
    token = await messaging().getToken()
    // eslint-disable-next-line no-console
    console.log('token:', token)
  }

  const mediator = await getMediatorConnection(agent)
  if (!mediator) {
    return
  }
  const devicePlatform = Platform.OS
  // eslint-disable-next-line no-console
  console.log('Device Platform:', devicePlatform)

  agent.config.logger.info(`Trying to send device info to mediator with connection [${mediator.id}]`)
  // eslint-disable-next-line no-console
  console.log(
    'Sending device info (watch this):',
    JSON.stringify({
      deviceToken: token,
      devicePlatform: devicePlatform,
    })
  )
  try {
    const pushNotificationsFcmApi = new PushNotificationsFcmApi(
      agent.dependencyManager.resolve(MessageSender),
      agent.dependencyManager.resolve(ConnectionService),
      agent.context
    )

    // Ensure both deviceToken and devicePlatform are included in the setDeviceInfo call
    await pushNotificationsFcmApi.setDeviceInfo(mediator.id, {
      deviceToken: token,
      devicePlatform: devicePlatform,
    })
    // eslint-disable-next-line no-console
    console.log('Device info sent successfully')
    // eslint-disable-next-line no-console
    console.log('Platform after sending:', devicePlatform)

    if (blankDeviceToken) {
      AsyncStorage.setItem(TOKEN_STORAGE_KEY, 'blank')
    } else {
      AsyncStorage.setItem(TOKEN_STORAGE_KEY, token)
    }
  } catch (error: unknown) {
    // try {
    //   // eslint-disable-next-line no-console
    //   console.log(
    //     'Sending device info(watch this):',
    //     JSON.stringify({
    //       deviceToken: token,
    //       devicePlatform: devicePlatform,
    //     })
    //   )
    //   await agent.modules.pushNotificationsFcm.setDeviceInfo(mediator.id, {
    //     deviceToken: token,
    //     devicePlatform: devicePlatform, //Platform.OS,
    //   })
    //   // eslint-disable-next-line no-console
    //   console.log('Device info sent successfully')
    //   // eslint-disable-next-line no-console
    //   console.log('Platform after sending:', devicePlatform) // Log after sending
    //   if (blankDeviceToken) {
    //     AsyncStorage.setItem(TOKEN_STORAGE_KEY, 'blank')
    //   } else {
    //     AsyncStorage.setItem(TOKEN_STORAGE_KEY, token)
    //   }
    // } catch (error) {
    //agent.config.logger.error('Error sending device token info to mediator agent')

    // eslint-disable-next-line no-console
    agent.config.logger.error('Error sending device token info to mediator agent', error as Record<string, any>)
    // eslint-disable-next-line no-console
    console.error('Error details:', error)
  }
  // eslint-disable-next-line no-console
  console.log('token:', token)
}

const status = async (): Promise<NotificationPermissionStatus> => {
  if (Platform.OS === 'ios') {
    const permission = await messaging().hasPermission()
    return formatPermissionIos(permission)
  } else if (Platform.OS === 'android') {
    const result = await check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS)
    return formatPermissionAndroid(result)
  }
  return NotificationPermissionStatus.UNKNOWN
}

/**
 * Attempts to send the device token to the mediator agent, register handlers and requests permissions
 * @param agent - The active aries agent
 * @prarm blankDeviceToken - If true, will setup the device token as blank (disabled)
 * @returns {Promise<void>}
 */
const setup = async (): Promise<NotificationPermissionStatus> => {
  backgroundHandler()
  foregroundHandler()
  return await requestPermission()
}

const activate = async (agent: Agent): Promise<void> => {
  await setDeviceInfo(agent)
}
const deactivate = async (agent: Agent): Promise<void> => {
  await setDeviceInfo(agent, true)
}

export { isEnabled, isRegistered, isMediatorCapable, isUserDenied, setDeviceInfo, setup, activate, deactivate, status }
