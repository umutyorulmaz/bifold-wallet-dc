import { CaptureBaseAttributeType } from '@hyperledger/aries-oca'
import { Attribute, Field } from '@hyperledger/aries-oca/build/legacy'
import startCase from 'lodash.startcase'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { hiddenFieldValue } from '../../constants'
import { useTheme } from '../../contexts/theme'
import { isDataUrl } from '../../utils/helpers'
import { testIdWithKey } from '../../utils/testable'

import RecordBinaryField from './RecordBinaryField'
import RecordDateIntField from './RecordDateIntField'

interface RecordFieldProps {
  field: Field
  hideFieldValue?: boolean
  hideBottomBorder?: boolean
  shown?: boolean
  onToggleViewPressed?: () => void
  fieldLabel?: (field: Field) => React.ReactElement | ''
  fieldValue?: (field: Field) => React.ReactElement | ''
}

export const validEncoding = 'base64'
export const validFormat = new RegExp('^image/(jpeg|png|jpg)')

interface AttributeValueParams {
  field: Attribute
  shown?: boolean
  style?: Record<string, unknown>
}

export const AttributeValue: React.FC<AttributeValueParams> = ({ field, style, shown }) => {
  const { ListItems } = useTheme()
  const styles = StyleSheet.create({
    text: {
      ...ListItems.recordAttributeText,
    },
  })

  const renderTranscript = (value: string) => {
    try {
      const data = JSON.parse(value)
      if (Array.isArray(data)) {
        return (
          <View style={transcriptStyles.transcriptContainer}>
            {data.map((item, index) => (
              <View key={index} style={transcriptStyles.courseContainer}>
                {Object.entries(item).map(([key, value]) => (
                  <View key={key} style={transcriptStyles.detailContainer}>
                    <Text style={transcriptStyles.detailLabel}>{startCase(key)}:</Text>
                    <Text style={transcriptStyles.detailValue}>
                      {typeof value === 'string' || typeof value === 'number' ? value : JSON.stringify(value)}
                    </Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )
      }
    } catch (error) {
      console.error('Failed to parse transcript data:', error)
    }
    return <Text style={transcriptStyles.text}>{value}</Text>
  }

  // Stylesheet for transcript display
  const transcriptStyles = StyleSheet.create({
    transcriptContainer: {
      padding: 10,
      backgroundColor: '#f0f0f0',
      borderRadius: 5,
      marginVertical: 5,
    },
    courseContainer: {
      borderBottomWidth: 1,
      borderBottomColor: '#cccccc',
      paddingBottom: 10,
      marginBottom: 10,
    },
    detailContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 5,
    },
    detailLabel: {
      fontWeight: 'bold',
      color: '#333',
    },
    detailValue: {
      color: '#666',
    },
    text: {
      color: '#333',
    },
  })

  if (shown) {
    if (typeof field.value === 'string') {
      return renderTranscript(field.value)
    } else {
      console.error('Expected string for transcript data, received:', typeof field.value)
      return <Text style={style || styles.text}>Invalid transcript data</Text>
    }
  } else if (
    field.encoding === validEncoding &&
    field.format &&
    validFormat.test(field.format) &&
    typeof field.value === 'string' &&
    (isDataUrl(field.value) || field.value)
  ) {
    return <RecordBinaryField attributeValue={field.value} style={style} shown={shown} />
  } else if (
    (field.type === CaptureBaseAttributeType.DateInt || field.type === CaptureBaseAttributeType.DateTime) &&
    typeof field.value === 'string'
  ) {
    return <RecordDateIntField field={field} style={style} shown={shown} />
  }
  return (
    <Text style={style || styles.text} testID={testIdWithKey('AttributeValue')}>
      {shown ? field.value : hiddenFieldValue}
    </Text>
  )
}

const RecordField: React.FC<RecordFieldProps> = ({
  field,
  hideFieldValue = false,
  hideBottomBorder = false,
  shown = !hideFieldValue,
  onToggleViewPressed = () => undefined,
  fieldLabel = '',
  fieldValue = '',
}) => {
  const { t } = useTranslation()
  const { ListItems } = useTheme()
  const styles = StyleSheet.create({
    container: {
      ...ListItems.recordContainer,
      paddingHorizontal: 25,
      paddingTop: 16,
    },
    border: {
      ...ListItems.recordBorder,
      borderBottomWidth: 2,
      paddingTop: 12,
    },
    link: {
      ...ListItems.recordLink,
      paddingVertical: 2,
    },
    valueContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 5,
    },
    valueText: {
      ...ListItems.recordAttributeText,
      paddingVertical: 4,
    },
  })

  return (
    <View style={styles.container}>
      <View style={styles.valueContainer}>
        {typeof fieldLabel === 'function' ? (
          fieldLabel(field)
        ) : (
          <Text style={[ListItems.recordAttributeLabel]} testID={testIdWithKey('AttributeName')}>
            {field.label ?? startCase(field.name || '')}
          </Text>
        )}

        {hideFieldValue && (
          <TouchableOpacity
            accessible={true}
            accessibilityLabel={shown ? t('Record.Hide') : t('Record.Show')}
            testID={testIdWithKey('ShowHide')}
            activeOpacity={1}
            onPress={onToggleViewPressed}
            style={styles.link}
          >
            <Text style={ListItems.recordLink}>{shown ? t('Record.Hide') : t('Record.Show')}</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.valueContainer}>
        {typeof fieldValue === 'function' ? (
          fieldValue(field)
        ) : (
          <View style={styles.valueText}>
            <AttributeValue field={field as Attribute} shown={shown} />
          </View>
        )}
      </View>
      <View style={[styles.border, hideBottomBorder && { borderBottomWidth: 0 }]} />
    </View>
  )
}

export default RecordField
