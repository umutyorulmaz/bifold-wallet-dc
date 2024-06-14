import { Agent, ConsoleLogger, HttpOutboundTransport, LogLevel, WsOutboundTransport } from '@aries-framework/core'
import { useAgent } from '@aries-framework/react-hooks'
import { agentDependencies } from '@aries-framework/react-native'
import { useNavigation } from '@react-navigation/core'
import { CommonActions } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { DeviceEventEmitter, StyleSheet } from 'react-native'
import { Config } from 'react-native-config'
import { SafeAreaView } from 'react-native-safe-area-context'

import { EventTypes } from '../constants'
import { TOKENS, useContainer } from '../container-api'
import { useAnimatedComponents } from '../contexts/animated-components'
import { useAuth } from '../contexts/auth'
import { useConfiguration } from '../contexts/configuration'
import { DispatchAction } from '../contexts/reducers/store'
import { useStore } from '../contexts/store'
import { useTheme } from '../contexts/theme'
import { BifoldError } from '../types/error'
import { Screens, Stacks } from '../types/navigators'
import { Onboarding as StoreOnboardingState } from '../types/state'
import { activate } from '../utils/PushNotificationsHelper'
import { getAgentModules, createLinkSecretIfRequired } from '../utils/agent'
import { migrateToAskar, didMigrateToAskar } from '../utils/migration'

const onboardingComplete = (state: StoreOnboardingState, params: { termsVersion?: boolean | string }): boolean => {
  const termsVer = params.termsVersion ?? true
  return (
    state.didCompleteTutorial && state.didAgreeToTerms === termsVer && state.didCreatePIN && state.didConsiderBiometry
  )
}

const resumeOnboardingAt = (
  state: StoreOnboardingState,
  params: {
    enableWalletNaming?: boolean
    enablePushNotifications?: boolean
    showPreface?: boolean
    termsVersion?: boolean | string
  }
): Screens => {
  const termsVer = params.termsVersion ?? true
  if (
    (state.didSeePreface || !params.showPreface) &&
    state.didCompleteTutorial &&
    state.didAgreeToTerms === termsVer &&
    state.didCreatePIN &&
    (state.didConsiderPushNotifications || !params.enablePushNotifications) &&
    (state.didNameWallet || !params.enableWalletNaming) &&
    !state.didConsiderBiometry
  ) {
    return Screens.UseBiometry
  }

  if (
    (state.didSeePreface || !params.showPreface) &&
    state.didCompleteTutorial &&
    state.didAgreeToTerms === termsVer &&
    state.didCreatePIN &&
    (state.didConsiderPushNotifications || !params.enablePushNotifications) &&
    params.enableWalletNaming &&
    !state.didNameWallet
  ) {
    return Screens.NameWallet
  }

  if (
    (state.didSeePreface || !params.showPreface) &&
    state.didCompleteTutorial &&
    state.didAgreeToTerms === termsVer &&
    !state.didCreatePIN
  ) {
    return Screens.CreatePIN
  }

  if ((state.didSeePreface || !params.showPreface) && state.didCompleteTutorial && state.didAgreeToTerms !== termsVer) {
    return Screens.Terms
  }

  if (state.didSeePreface || !params.showPreface) {
    return Screens.Onboarding
  }

  return Screens.Preface
}

/**
 * To customize this splash screen set the background color of the
 * iOS and Android launch screen to match the background color of
 * of this view.
 */
const Splash: React.FC = () => {
  const { indyLedgers, showPreface, enablePushNotifications } = useConfiguration()
  const { setAgent } = useAgent()
  const { t } = useTranslation()
  const [store, dispatch] = useStore()
  const navigation = useNavigation()
  const { getWalletCredentials } = useAuth()
  const { ColorPallet } = useTheme()
  const { LoadingIndicator } = useAnimatedComponents()
  const container = useContainer()
  const { version: TermsVersion } = container.resolve(TOKENS.SCREEN_TERMS)
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: ColorPallet.brand.primaryBackground,
    },
  })

  useEffect(() => {
    if (store.authentication.didAuthenticate) {
      return
    }

    const initOnboarding = async (): Promise<void> => {
      try {
        // load authentication attempts from storage
        if (!store.stateLoaded) {
          return
        }

        if (onboardingComplete(store.onboarding, { termsVersion: TermsVersion })) {
          // if they previously completed onboarding before wallet naming was enabled, mark complete
          if (!store.onboarding.didNameWallet) {
            dispatch({ type: DispatchAction.DID_NAME_WALLET, payload: [true] })
          }

          // if they previously completed onboarding before preface was enabled, mark seen
          if (!store.onboarding.didSeePreface) {
            dispatch({ type: DispatchAction.DID_SEE_PREFACE })
          }

          if (!store.loginAttempt.lockoutDate) {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: Screens.EnterPIN }],
              })
            )
          } else {
            // return to lockout screen if lockout date is set
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: Screens.AttemptLockout }],
              })
            )
          }
          return
        } else {
          // If onboarding was interrupted we need to pickup from where we left off.
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                {
                  name: resumeOnboardingAt(store.onboarding, {
                    enableWalletNaming: store.preferences.enableWalletNaming,
                    enablePushNotifications: !!enablePushNotifications,
                    showPreface,
                    termsVersion: TermsVersion,
                  }),
                },
              ],
            })
          )
        }
      } catch (err: unknown) {
        const error = new BifoldError(
          t('Error.Title1044'),
          t('Error.Message1044'),
          (err as Error)?.message ?? err,
          1044
        )
        DeviceEventEmitter.emit(EventTypes.ERROR_ADDED, error)
      }
    }

    initOnboarding()
  }, [store.authentication.didAuthenticate, store.stateLoaded])

  useEffect(() => {
    if (!store.authentication.didAuthenticate || !store.onboarding.didConsiderBiometry) {
      return
    }

    const initAgent = async (): Promise<void> => {
      try {
        const credentials = await getWalletCredentials()

        if (!credentials?.id || !credentials.key) {
          // Cannot find wallet id/secret
          return
        }

        const newAgent = new Agent({
          config: {
            label: store.preferences.walletName || 'Aries Bifold',
            walletConfig: {
              id: credentials.id,
              key: credentials.key,
            },
            logger: new ConsoleLogger(LogLevel.trace),
            autoUpdateStorageOnStartup: true,
          },
          dependencies: agentDependencies,
          modules: getAgentModules({
            indyNetworks: indyLedgers,
            mediatorInvitationUrl: Config.MEDIATOR_URL,
          }),
        })
        const wsTransport = new WsOutboundTransport()
        const httpTransport = new HttpOutboundTransport()

        newAgent.registerOutboundTransport(wsTransport)
        newAgent.registerOutboundTransport(httpTransport)

        // If we haven't migrated to Aries Askar yet, we need to do this before we initialize the agent.
        if (!didMigrateToAskar(store.migration)) {
          newAgent.config.logger.debug('Agent not updated to Aries Askar, updating...')

          await migrateToAskar(credentials.id, credentials.key, newAgent)

          newAgent.config.logger.debug('Successfully finished updating agent to Aries Askar')
          // Store that we migrated to askar.
          dispatch({
            type: DispatchAction.DID_MIGRATE_TO_ASKAR,
          })
        }

        await newAgent.initialize()

        await createLinkSecretIfRequired(newAgent)

        setAgent(newAgent)
        if (store.preferences.usePushNotifications) {
          activate(newAgent)
        }
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: Stacks.TabStack }],
          })
        )
      } catch (err: unknown) {
        const error = new BifoldError(
          t('Error.Title1045'),
          t('Error.Message1045'),
          (err as Error)?.message ?? err,
          1045
        )
        DeviceEventEmitter.emit(EventTypes.ERROR_ADDED, error)
      }
    }

    initAgent()
  }, [store.authentication.didAuthenticate, store.onboarding.didConsiderBiometry])

  return (
    <SafeAreaView style={styles.container}>
      <LoadingIndicator />
    </SafeAreaView>
  )
}

export default Splash
