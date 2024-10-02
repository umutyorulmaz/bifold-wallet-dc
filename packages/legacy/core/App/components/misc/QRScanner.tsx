//QRScanner.tsx
import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { View, Modal, Pressable, StyleSheet, Text, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { hitSlop } from '../../constants'
import { useConfiguration } from '../../contexts/configuration'
import { useTheme } from '../../contexts/theme'
import { QrCodeScanError } from '../../types/error'
import { Screens } from '../../types/navigators'
import { testIdWithKey } from '../../utils/testable'
import InfoBox, { InfoBoxType } from '../misc/InfoBox'
import DismissiblePopupModal from '../modals/DismissiblePopupModal'

import { useNFC } from './NFCHandler'
import QRScannerTorch from './QRScannerTorch'
import ScanCamera from './ScanCamera'

interface Props {
  handleCodeScan: (value: string) => Promise<void>
  error?: QrCodeScanError | null
  enableCameraOnError?: boolean
}

const QRScanner: React.FC<Props> = ({ handleCodeScan, error, enableCameraOnError }) => {
  const navigation = useNavigation()
  const { showScanHelp, showScanButton } = useConfiguration()
  const [torchActive, setTorchActive] = useState(false)
  const [showInfoBox, setShowInfoBox] = useState(false)
  const [showErrorDetailsModal, setShowErrorDetailsModal] = useState(false)
  const { t } = useTranslation()
  const { ColorPallet, TextTheme } = useTheme()
  const [firstTabActive, setFirstTabActive] = useState(true) // Initialize as needed

  const styles = StyleSheet.create({
    nfcButton: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      paddingVertical: 10,
      paddingHorizontal: 20, // Ensures the button has consistent width
      borderRadius: 5,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 30, // Adjust this value if more spacing is needed
      position: 'absolute',
      bottom: 150, // Adjust this to move the button further up
      alignSelf: 'center', // Center the button horizontally
    },
    nfcButtonText: {
      color: 'white',
      marginLeft: 10,
    },
    nfcIndicator: {
      position: 'absolute',
      bottom: 20,
      left: 0,
      right: 0,
      alignItems: 'center',
    },
    nfcText: {
      color: 'white',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      padding: 5,
      borderRadius: 5,
    },
    container: {
      flex: 1,
    },
    viewFinder: {
      width: 250,
      height: 250,
      borderRadius: 24,
      borderWidth: 2,
      borderColor: ColorPallet.grayscale.white,
    },
    viewFinderContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    messageContainer: {
      marginHorizontal: 40,
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
      paddingTop: 30,
    },
    icon: {
      color: ColorPallet.grayscale.white,
      padding: 4,
    },
    textStyle: {
      ...TextTheme.title,
      color: 'white',
      marginHorizontal: 10,
      textAlign: 'center',
    },
  })

  const { startNfcScan } = useNFC()

  //const [isNfcActive, setIsNfcActive] = useState(false)

  const handleScanPress = async () => {
    setFirstTabActive(true)
    try {
      await startNfcScan()
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('NFC Scan error:', error)
      // Handle the error, possibly show an alert to the user
      Alert.alert('NFC Scan Error', 'Failed to start NFC scanning. Please try again.')
    }
  }

  const styleForState = ({ pressed }: { pressed: boolean }) => [{ opacity: pressed ? 0.2 : 1 }]

  const toggleShowInfoBox = () => setShowInfoBox(!showInfoBox)

  return (
    <View style={styles.container}>
      <Modal visible={showInfoBox} animationType="fade" transparent>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 10,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.6)',
          }}
        >
          <InfoBox
            notificationType={InfoBoxType.Info}
            title={t('Scan.BadQRCode')}
            description={t('Scan.BadQRCodeDescription')}
            onCallToActionPressed={toggleShowInfoBox}
          />
        </View>
      </Modal>
      {showErrorDetailsModal && (
        <DismissiblePopupModal
          title={t('Scan.ErrorDetails')}
          description={error?.details || t('Scan.NoDetails')}
          onCallToActionLabel={t('Global.Dismiss')}
          onCallToActionPressed={() => setShowErrorDetailsModal(false)}
          onDismissPressed={() => setShowErrorDetailsModal(false)}
        />
      )}
      <ScanCamera handleCodeScan={handleCodeScan} error={error} enableCameraOnError={enableCameraOnError}></ScanCamera>
      <View style={{ flex: 1 }}>
        <View style={styles.messageContainer}>
          {error ? (
            <>
              <Icon style={styles.icon} name="cancel" size={40} />
              <Text testID={testIdWithKey('ErrorMessage')} style={styles.textStyle}>
                {error.message}
              </Text>
              <Pressable
                onPress={() => setShowErrorDetailsModal(true)}
                accessibilityLabel={t('Scan.ShowDetails')}
                accessibilityRole={'button'}
                testID={testIdWithKey('ShowDetails')}
                hitSlop={hitSlop}
              >
                <Icon name="information-outline" size={40} style={styles.icon} />
              </Pressable>
            </>
          ) : (
            <>
              <Icon name="qrcode-scan" size={40} style={styles.icon} />
              <Text style={styles.textStyle}>{t('Scan.WillScanAutomatically')}</Text>
            </>
          )}
        </View>
        <View style={styles.viewFinderContainer}>
          <View style={styles.viewFinder} />
        </View>
        {firstTabActive && (
          <Pressable onPress={handleScanPress} style={styles.nfcButton} accessibilityLabel={t('Scan.ScanNFC')}>
            <Icon name="nfc" size={24} color="white" />
            <Text style={styles.nfcButtonText}>{t('Scan.ScanNFC')}</Text>
          </Pressable>
        )}
        {showScanButton && (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Pressable
              accessibilityLabel={t('Scan.ScanNow')}
              accessibilityRole={'button'}
              testID={testIdWithKey('ScanNow')}
              onPress={toggleShowInfoBox}
              style={styleForState}
              hitSlop={hitSlop}
            >
              <Icon name="circle-outline" size={60} style={{ color: 'white', marginBottom: -15 }} />
            </Pressable>
          </View>
        )}

        <View style={{ marginHorizontal: 24, height: 24, marginBottom: 60, flexDirection: 'row' }}>
          {showScanHelp && (
            <Pressable
              accessibilityLabel={t('Scan.ScanHelp')}
              accessibilityRole={'button'}
              testID={testIdWithKey('ScanHelp')}
              // @ts-ignore
              onPress={() => navigation.navigate(Screens.ScanHelp)}
              style={styleForState}
              hitSlop={hitSlop}
            >
              <Icon name="help-circle" size={24} style={{ color: 'white' }} />
            </Pressable>
          )}

          <View style={{ width: 10, marginLeft: 'auto' }} />
          <QRScannerTorch active={torchActive} onPress={() => setTorchActive(!torchActive)} />
        </View>
      </View>
    </View>
  )
}

export default QRScanner
