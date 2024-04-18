import { useNavigation } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { ButtonType } from '../components/buttons/Button-api'
import CheckBoxRow from '../components/inputs/CheckBoxRow'
//import HighlightTextBox from '../components/texts/HighlightTextBox'
import InfoTextBox from '../components/texts/InfoTextBox'
import { TOKENS, useContainer } from '../container-api'
import { DispatchAction } from '../contexts/reducers/store'
import { useStore } from '../contexts/store'
import { useTheme } from '../contexts/theme'
import { AuthenticateStackParams, Screens } from '../types/navigators'
import { testIdWithKey } from '../utils/testable'

export const TermsVersion = true

const Terms: React.FC = () => {
  const [store, dispatch] = useStore()
  const [checked, setChecked] = useState(false)
  const { t } = useTranslation()
  const navigation = useNavigation<StackNavigationProp<AuthenticateStackParams>>()
  const { OnboardingTheme, TextTheme } = useTheme()
  const container = useContainer()
  const Button = container.resolve(TOKENS.COMP_BUTTON)
  const agreedToPreviousTerms = store.onboarding.didAgreeToTerms
  const onSubmitPressed = useCallback(() => {
    dispatch({
      type: DispatchAction.DID_AGREE_TO_TERMS,
      payload: [{ DidAgreeToTerms: TermsVersion }],
    })

    navigation.navigate(Screens.CreatePIN)
  }, [])
  const style = StyleSheet.create({
    container: {
      ...OnboardingTheme.container,
      padding: 20,
    },
    bodyText: {
      ...OnboardingTheme.bodyText,
      flexShrink: 1,
    },
    controlsContainer: {
      marginTop: 'auto',
      marginBottom: 20,
    },
  })
  const onBackPressed = () => {
    //TODO:(jl) goBack() does not unwind the navigation stack but rather goes back to the splash screen. Needs fixing before the following code will work as expected.
    // if (nav.canGoBack()) {
    //   nav.goBack()
    // }
    navigation.navigate(Screens.Onboarding)
  }

  return (
    <SafeAreaView edges={['left', 'right', 'bottom']}>
      <ScrollView style={[style.container]}>
        <InfoTextBox>Please agree to the terms and conditions below before using this application.</InfoTextBox>
        <Text style={[style.bodyText, { marginTop: 20, marginBottom: 20 }]}>
          <Text style={[style.bodyText, { fontWeight: TextTheme.bold.fontWeight }]}>Terms and Conditions</Text> These
          Terms and Conditions (Terms) govern your use of the DigiCred Mobile Wallet (“App”), developed by DigiCred
          Holdings Inc. (“Developer”). By downloading, installing, or using the App, you agree to be bound by these
          Terms. If you do not agree to these Terms, do not use this App.
        </Text>
        {/* <HighlightTextBox>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui</HighlightTextBox> */}
        <Text style={[style.bodyText, { marginTop: 20 }]}>Definitions</Text>
        <Text style={[style.bodyText]}>
          “User” refers to any person who downloads, installs, or uses the App. “Content” refers to any text, images, or
          other media through the App.
        </Text>
        <Text style={[style.bodyText, { marginTop: 20 }]}>License</Text>
        <Text style={[style.bodyText]}>
          Subject to your compliance with these Terms, the Developer grants you a limited, non-exclusive,
          non-transferrable, revocable license to download, install, and use the App for your personal, non-commercial
          purposes.
        </Text>
        <View style={[style.controlsContainer]}>
          {!agreedToPreviousTerms && (
            <CheckBoxRow
              title={t('Terms.Attestation')}
              accessibilityLabel={t('Terms.IAgree')}
              testID={testIdWithKey('IAgree')}
              checked={checked}
              onPress={() => setChecked(!checked)}
            />
          )}
          <View style={[{ paddingTop: 10 }]}>
            <Button
              title={agreedToPreviousTerms ? t('Global.Accept') : t('Global.Continue')}
              accessibilityLabel={agreedToPreviousTerms ? t('Global.Accept') : t('Global.Continue')}
              testID={agreedToPreviousTerms ? testIdWithKey('Accept') : testIdWithKey('Continue')}
              disabled={!checked && !agreedToPreviousTerms}
              onPress={onSubmitPressed}
              buttonType={ButtonType.Primary}
            />
          </View>
          {!agreedToPreviousTerms && (
            <View style={[{ paddingTop: 10, marginBottom: 20 }]}>
              <Button
                title={t('Global.Back')}
                accessibilityLabel={t('Global.Back')}
                testID={testIdWithKey('Back')}
                onPress={onBackPressed}
                buttonType={ButtonType.Secondary}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Terms
