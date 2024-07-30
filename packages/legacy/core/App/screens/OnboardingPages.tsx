import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import { SvgProps } from 'react-native-svg'

import CredentialList from '../assets/img/credential-list.svg'
import ScanShare from '../assets/img/scan-share.svg'
import SecureImage from '../assets/img/secure-image.svg'
import Button, { ButtonType } from '../components/buttons/Button'
import { DispatchAction } from '../contexts/reducers/store'
import { useStore } from '../contexts/store'
import { GenericFn } from '../types/fn'
import { OnboardingStackParams, Screens } from '../types/navigators'
import { testIdWithKey } from '../utils/testable'

import { OnboardingStyleSheet } from './Onboarding'

export const createCarouselStyle = (OnboardingTheme: any): OnboardingStyleSheet => {
  return StyleSheet.create({
    container: {
      ...OnboardingTheme.container,
      flex: 1,
      alignItems: 'center',
    },
    carouselContainer: {
      ...OnboardingTheme.carouselContainer,
      flexDirection: 'column',
    },
    pagerContainer: {
      flexShrink: 1,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 30,
    },
    pagerDot: {
      ...OnboardingTheme.pagerDot,
      borderWidth: 1,
      borderStyle: 'solid',
    },
    pagerDotActive: {
      ...OnboardingTheme.pagerDotActive,
    },
    pagerDotInactive: {
      ...OnboardingTheme.pagerDotInactive,
    },
    pagerPosition: {
      position: 'relative',
      top: 0,
    },
    pagerNavigationButton: {
      ...OnboardingTheme.pagerNavigationButton,
    },
  })
}

export const createStyles = (OnboardingTheme: any) => {
  return StyleSheet.create({
    headerText: {
      ...OnboardingTheme.headerText,
    },
    bodyText: {
      ...OnboardingTheme.bodyText,
      flexShrink: 1,
    },
    point: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 20,
      marginTop: 10,
      marginRight: 20,
      marginBottom: 10,
    },
    icon: {
      marginRight: 10,
    },
  })
}

const createImageDisplayOptions = (OnboardingTheme: any) => {
  return {
    ...OnboardingTheme.imageDisplayOptions,
    height: 180,
    width: 180,
  }
}

const customPages = (onTutorialCompleted: GenericFn, OnboardingTheme: any) => {
  const { t } = useTranslation()
  const styles = createStyles(OnboardingTheme)
  const imageDisplayOptions = createImageDisplayOptions(OnboardingTheme)
  return (
    <>
      <ScrollView style={{ padding: 20 }}>
        <View style={{ alignItems: 'center' }}>
          <SecureImage {...imageDisplayOptions} />
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={[styles.headerText, { fontSize: 18 }]} testID={testIdWithKey('HeaderText')}>
            Your credential wallet
          </Text>
          <Text style={[styles.bodyText, { marginTop: 25 }]} testID={testIdWithKey('BodyText')}>
            This is your wallet where you will hold your digital credentials. It will help you receive and present your
            documents when you are in-person or online. You will receive your documents from participating organizations
            and be able to safely and securely share them with others.
          </Text>
          <Text>Interact with confidence with individuals and organizations you trust.</Text>
        </View>
      </ScrollView>
      <View style={{ marginTop: 'auto', margin: 20 }}>
        <Button
          title={t('Global.GetStarted')}
          accessibilityLabel={t('Global.GetStarted')}
          testID={testIdWithKey('GetStarted')}
          onPress={onTutorialCompleted}
          buttonType={ButtonType.Primary}
        />
      </View>
    </>
  )
}

const guides: Array<{ image: React.FC<SvgProps>; title: string; body: string; devModeListener?: boolean }> = [
  {
    image: CredentialList,
    title: 'Digital Credentials',
    body: 'Digital credentials are the electronic equivalent of physical credentials and documents such as identity cards, certificates, or transcripts offered by participating services.\n\nServices are simplified and expedited as organizations can confirm who you are and what you have accomplished with trusted information from the digital credentials.\n\n',
    devModeListener: true,
  },
  {
    image: ScanShare,
    title: 'Private and Confidential',
    body: 'Your privacy is important.\n\nDigiCred nor any other party has access to your credentials unless they issued them directly to you or you have explicitly consented to share them.  There is no tracking, analytics or correlation.\n\nYou approve every use of your digital credentials.\n\n',
  },
]

export const createPageWith = (
  PageImage: React.FC<SvgProps>,
  title: string,
  body: string,
  OnboardingTheme: any,
  devModeListener?: boolean,
  onDevModeTouched?: () => void
) => {
  const styles = createStyles(OnboardingTheme)
  const imageDisplayOptions = createImageDisplayOptions(OnboardingTheme)
  const titleElement = (
    <Text style={[styles.headerText]} testID={testIdWithKey('HeaderText')}>
      {title}
    </Text>
  )
  return (
    <ScrollView style={{ padding: 20 }}>
      <View style={{ alignItems: 'center' }}>{<PageImage style={imageDisplayOptions} />}</View>
      <View style={{ marginBottom: 20 }}>
        {devModeListener ? (
          <TouchableWithoutFeedback testID={testIdWithKey('DeveloperModeTouch')} onPress={onDevModeTouched}>
            {titleElement}
          </TouchableWithoutFeedback>
        ) : (
          titleElement
        )}
        <Text style={[styles.bodyText, { marginTop: 25 }]} testID={testIdWithKey('BodyText')}>
          {body}
        </Text>
      </View>
    </ScrollView>
  )
}

const OnboardingPages = (onTutorialCompleted: GenericFn, OnboardingTheme: any): Array<Element> => {
  const navigation = useNavigation<StackNavigationProp<OnboardingStackParams>>()
  const [, dispatch] = useStore()
  const onDevModeEnabled = () => {
    dispatch({
      type: DispatchAction.ENABLE_DEVELOPER_MODE,
      payload: [true],
    })
    navigation.getParent()?.navigate(Screens.Developer)
  }
  const developerOptionCount = useRef(0)
  const touchCountToEnableBiometrics = 9

  const incrementDeveloperMenuCounter = () => {
    if (developerOptionCount.current >= touchCountToEnableBiometrics) {
      developerOptionCount.current = 0
      if (onDevModeEnabled) {
        onDevModeEnabled()
      }
      return
    }

    developerOptionCount.current = developerOptionCount.current + 1
  }
  return [
    ...guides.map((g) =>
      createPageWith(
        g.image,
        g.title,
        g.body,
        OnboardingTheme,
        g.devModeListener,
        g.devModeListener ? incrementDeveloperMenuCounter : undefined
      )
    ),
    customPages(onTutorialCompleted, OnboardingTheme),
  ]
}

export default OnboardingPages
