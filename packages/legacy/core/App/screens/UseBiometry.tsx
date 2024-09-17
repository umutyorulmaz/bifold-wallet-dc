import { CommonActions, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, View, Modal, ScrollView, DeviceEventEmitter } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import Button, { ButtonType } from '../components/buttons/Button'
import CheckBoxRow from '../components/inputs/CheckBoxRow'
import { EventTypes } from '../constants'
import { useAnimatedComponents } from '../contexts/animated-components'
import { useAuth } from '../contexts/auth'
import { DispatchAction } from '../contexts/reducers/store'
import { useStore } from '../contexts/store'
import { useTheme } from '../contexts/theme'
import { OnboardingStackParams, Screens } from '../types/navigators'
import { testIdWithKey } from '../utils/testable'

import PINEnter, { PINEntryUsage } from './PINEnter'

enum UseBiometryUsage {
  InitialSetup,
  ToggleOnOff,
}

const UseBiometry: React.FC = () => {
  const [store, dispatch] = useStore()
  const { t } = useTranslation()
  const { isBiometricsActive, commitPIN, disableBiometrics } = useAuth()
  const [biometryAvailable, setBiometryAvailable] = useState(false)
  const [biometryEnabled, setBiometryEnabled] = useState(store.preferences.useBiometry) // Initialize with stored preference
  const [continueEnabled, setContinueEnabled] = useState(true)
  const [canSeeCheckPIN, setCanSeeCheckPIN] = useState<boolean>(false)
  const { ColorPallet, TextTheme, Assets } = useTheme()
  const { ButtonLoading } = useAnimatedComponents()
  const navigation = useNavigation<StackNavigationProp<OnboardingStackParams>>()
  const screenUsage = store.onboarding.didCompleteOnboarding
    ? UseBiometryUsage.ToggleOnOff
    : UseBiometryUsage.InitialSetup

  const styles = StyleSheet.create({
    container: {
      height: '100%',
      padding: 20,
      backgroundColor: ColorPallet.brand.primaryBackground,
    },
    image: {
      minWidth: 200,
      minHeight: 200,
      marginBottom: 66,
    },
  })

  useEffect(() => {
    isBiometricsActive().then((result) => {
      setBiometryAvailable(result)
    })
  }, [])

  useEffect(() => {
    if (screenUsage === UseBiometryUsage.InitialSetup) {
      setBiometryEnabled(biometryAvailable) // Only enable if biometrics are available
    } else {
      setBiometryEnabled(store.preferences.useBiometry)
    }
  }, [biometryAvailable, screenUsage])

  const continueTouched = async () => {
    setContinueEnabled(false)

    await commitPIN(biometryEnabled)

    dispatch({
      type: DispatchAction.USE_BIOMETRY,
      payload: [biometryEnabled],
    })

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: Screens.CreatePIN }],
      })
    )
  }

  const handleCheckBoxChange = async () => {
    // If biometrics is not available, return early
    if (!biometryAvailable) {
      setBiometryEnabled(false)
      return
    }

    // Toggle biometry state internally
    const newBiometryEnabled = !biometryEnabled
    setBiometryEnabled(newBiometryEnabled)

    // Commit or disable based on the new state
    if (newBiometryEnabled) {
      await commitPIN(true) // Enable biometrics
    } else {
      await disableBiometrics() // Disable biometrics
    }

    // Dispatch the biometry preference to the global store
    dispatch({
      type: DispatchAction.USE_BIOMETRY,
      payload: [newBiometryEnabled], // Pass the new biometry state
    })
  }

  const onAuthenticationComplete = (status: boolean) => {
    if (status) {
      setBiometryEnabled((previousState) => !previousState)
    }
    DeviceEventEmitter.emit(EventTypes.BIOMETRY_UPDATE, false)
    setCanSeeCheckPIN(false)
  }
  return (
    <SafeAreaView edges={['left', 'right', 'bottom']}>
      <ScrollView style={styles.container}>
        <View style={{ alignItems: 'center' }}>
          <Assets.svg.biometrics style={[styles.image]} />
        </View>
        {biometryAvailable ? (
          <View>
            <Text style={[TextTheme.normal]}>{t('Biometry.EnabledText1')}</Text>
          </View>
        ) : (
          <View>
            <Text style={[TextTheme.normal]}>{t('Biometry.NotEnabledText1')}</Text>
            <Text></Text>
            <Text style={[TextTheme.normal]}>{t('Biometry.NotEnabledText2')}</Text>
          </View>
        )}

        <View
          style={{
            margin: 5,
            marginBottom: 20,
          }}
        >
          <CheckBoxRow
            title={t('Biometry.UseToUnlock')}
            accessibilityLabel={t('Biometry.UseToUnlock')}
            testID={testIdWithKey('EnableBiometrics')}
            checked={biometryEnabled}
            onPress={handleCheckBoxChange}
          />
        </View>
      </ScrollView>
      <View style={{ marginTop: 'auto', margin: 20 }}>
        {store.onboarding.didCompleteOnboarding || (
          <Button
            title={'Continue'}
            accessibilityLabel={'Continue'}
            testID={testIdWithKey('Continue')}
            onPress={continueTouched}
            buttonType={ButtonType.Primary}
            disabled={!continueEnabled}
          >
            {!continueEnabled && <ButtonLoading />}
          </Button>
        )}
      </View>
      <Modal
        style={{ backgroundColor: ColorPallet.brand.primaryBackground }}
        visible={canSeeCheckPIN}
        transparent={false}
        animationType={'slide'}
      >
        <PINEnter usage={PINEntryUsage.PINCheck} setAuthenticated={onAuthenticationComplete} />
      </Modal>
    </SafeAreaView>
  )
}

export default UseBiometry
