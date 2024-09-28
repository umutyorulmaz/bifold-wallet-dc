import AgentProvider from '@credo-ts/react-hooks'
import * as React from 'react'
import { useEffect, useMemo } from 'react'
// eslint-disable-next-line import/order
import { StatusBar } from 'react-native'

// eslint-disable-next-line import/no-extraneous-dependencies
import NfcManager from 'react-native-nfc-manager'
import SplashScreen from 'react-native-splash-screen'
import Toast from 'react-native-toast-message'

import { animatedComponents } from './animated-components'
import NFCHandler from './components/misc/NFCHandler'
import ErrorModal from './components/modals/ErrorModal'
import NetInfo from './components/network/NetInfo'
import toastConfig from './components/toast/ToastConfig'
import { credentialOfferTourSteps } from './components/tour/CredentialOfferTourSteps'
import { credentialsTourSteps } from './components/tour/CredentialsTourSteps'
import { homeTourSteps } from './components/tour/HomeTourSteps'
import { proofRequestTourSteps } from './components/tour/ProofRequestTourSteps'
import { Container, ContainerProvider } from './container-api'
import { AnimatedComponentsProvider } from './contexts/animated-components'
import { AuthProvider } from './contexts/auth'
import { ConfigurationProvider } from './contexts/configuration'
import { NetworkProvider } from './contexts/network'
import { StoreProvider } from './contexts/store'
import { ThemeProvider } from './contexts/theme'
import { TourProvider } from './contexts/tour/tour-provider'
import { defaultConfiguration } from './defaultConfiguration'
import { initLanguages, initStoredLanguage, translationResources } from './localization'
import RootStack from './navigators/RootStack'
import { theme } from './theme'

initLanguages(translationResources)

function App(system: Container) {
  return () => {
    useMemo(() => {
      initStoredLanguage().then()
    }, [])

    useEffect(() => {
      // Initialize NFC
      const initNfc = async () => {
        try {
          await NfcManager.start()
          // eslint-disable-next-line no-console
          console.log('NFC initialized successfully')
        } catch (ex) {
          // eslint-disable-next-line no-console
          console.warn('Failed to initialize NFC', ex)
        }
      }

      initNfc()

      // Hide the native splash / loading screen so that our
      // RN version can be displayed.
      SplashScreen.hide()

      return () => {
        // Clean up NFC
        NfcManager.cancelTechnologyRequest().catch(() => {
          /* ignore */
        })
      }
    }, [])

    // Function to read NFC tag
    // const readNfcTag = async () => {
    //   try {
    //     await NfcManager.requestTechnology(NfcTech.Ndef)
    //     const tag = await NfcManager.getTag()
    //     // eslint-disable-next-line no-console
    //     console.log('NFC Tag found:', tag)
    //     // Here you can process the tag data, e.g., extract the invitation link
    //     // and call handleConnectToInvitation(invitationLink)
    //   } catch (ex) {
    //     // eslint-disable-next-line no-console
    //     console.warn('Error reading NFC tag:', ex)
    //   } finally {
    //     NfcManager.cancelTechnologyRequest().catch(() => {
    //       /* ignore */
    //     })
    //   }
    // }

    return (
      <ContainerProvider value={system}>
        <StoreProvider>
          <AgentProvider agent={undefined}>
            <ThemeProvider value={theme}>
              <AnimatedComponentsProvider value={animatedComponents}>
                <ConfigurationProvider value={defaultConfiguration}>
                  <AuthProvider>
                    <NetworkProvider>
                      <StatusBar
                        hidden={false}
                        barStyle="light-content"
                        backgroundColor={theme.ColorPallet.brand.primary}
                        translucent={false}
                      />
                      <NetInfo />
                      <ErrorModal />
                      <TourProvider
                        homeTourSteps={homeTourSteps}
                        credentialsTourSteps={credentialsTourSteps}
                        credentialOfferTourSteps={credentialOfferTourSteps}
                        proofRequestTourSteps={proofRequestTourSteps}
                        overlayColor={'gray'}
                        overlayOpacity={0.7}
                      >
                        <NFCHandler />
                        <RootStack />
                      </TourProvider>
                      <Toast topOffset={15} config={toastConfig} />
                    </NetworkProvider>
                  </AuthProvider>
                </ConfigurationProvider>
              </AnimatedComponentsProvider>
            </ThemeProvider>
          </AgentProvider>
        </StoreProvider>
      </ContainerProvider>
    )
  }
}

export default App
