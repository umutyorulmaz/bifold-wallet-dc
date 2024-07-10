import { CaptureBaseAttributeType } from '@hyperledger/aries-oca'
import { Attribute, Field } from '@hyperledger/aries-oca/build/legacy'
import startCase from 'lodash.startcase'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'

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
interface Course {
  courseTitle: string
  courseNumber: string
  subject: string
  grade: string
  creditsAttempted: number
  creditsEarned: number
  [key: string]: any // for other properties
}

interface Term {
  term: string
  school: string
  courses: Course[]
  cumulativeGPA: number
  cumulativeCredits: number
  cumulativeWeightedGPA: number
  creditsThisTerm: number
}

interface Vaccination {
  Vaccination: string
  [key: string]: string
}

export const AttributeValue = ({ field, style, shown }: AttributeValueParams): React.ReactElement => {
  const { ListItems } = useTheme()
  const styles = StyleSheet.create({
    text: {
      ...ListItems.recordAttributeText,
    },
    transcriptContainer: {
      padding: 10,
      backgroundColor: '#f0f0f0',
      borderRadius: 5,
      marginVertical: 5,
    },
    termContainer: {
      marginBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      paddingBottom: 10,
    },
    termTitleContainer: {
      marginBottom: 10,
    },
    termTitle: {
      fontWeight: 'bold',
      fontSize: 16,
      marginBottom: 10,
      color: '#000',
    },
    termSchool: {
      fontSize: 16,
      color: '#000',
    },
    coursesContainer: {
      marginLeft: 10,
    },
    courseItem: {
      marginBottom: 10,
    },
    courseTitle: {
      fontWeight: 'bold',
    },
    detailContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 2,
    },
    label: {
      fontWeight: 'bold',
      color: '#000',
      felx: 1,
    },
    value: {
      color: '#000',
      flex: 2,
      textAlign: 'right',
    },
    courseValue: {
      color: '#000',
      flex: 2,
      textAlign: 'right',
      fontWeight: 'bold',
    },
    vaccinationContainer: {
      padding: 10,
      backgroundColor: '#f0f0f0',
      borderRadius: 5,
      marginVertical: 5,
    },
    vaccinationItem: {
      marginBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      paddingBottom: 10,
    },
    vaccinationName: {
      fontWeight: 'bold',
      fontSize: 16,
      color: '#000',
      marginBottom: 5,
    },
  })

  const renderVaccinations = (vaccinationsData: string) => {
    try {
      //const vaccinations: Array<{ Vaccination: string; [key: string]: string }> = JSON.parse(vaccinationsData)
      const vaccinations: Vaccination[] = JSON.parse(vaccinationsData)
      return (
        <ScrollView style={styles.vaccinationContainer}>
          {vaccinations.map((vaccination, index) => (
            <View key={index} style={styles.vaccinationItem}>
              <Text style={styles.vaccinationName}>{vaccination.Vaccination}</Text>
              {Object.entries(vaccination).map(
                ([key, value]) =>
                  key !== 'Vaccination' && (
                    <View key={key} style={styles.detailContainer}>
                      <Text style={styles.label}>{key}:</Text>
                      <Text style={styles.value}>{value}</Text>
                    </View>
                  )
              )}
            </View>
          ))}
        </ScrollView>
      )
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to parse vaccination data:', error)
      return <Text style={styles.text}>Error parsing vaccination data</Text>
    }
  }

  const renderTranscript = (transcriptData: string) => {
    try {
      const transcript: Term[] = JSON.parse(transcriptData)
      return (
        <ScrollView style={styles.transcriptContainer}>
          {transcript.map((term, index) => (
            <View key={index} style={styles.termContainer}>
              <View style={styles.termTitleContainer}>
                <Text style={styles.termTitle}>{term.term}</Text>
                <Text style={styles.termSchool}>{term.school}</Text>
              </View>
              <View style={styles.coursesContainer}>
                {term.courses.map((course, courseIndex) => (
                  <View key={courseIndex} style={styles.courseItem}>
                    <View style={styles.detailContainer}>
                      <Text style={styles.label}>Course Title:</Text>
                      <Text style={styles.courseValue}>{course.courseTitle}</Text>
                    </View>
                    {Object.entries(course).map(
                      ([key, value]) =>
                        key !== 'courseTitle' && (
                          <View key={key} style={styles.detailContainer}>
                            <Text style={styles.label}>{startCase(key)}:</Text>
                            <Text style={styles.value}>
                              {typeof value === 'string' || typeof value === 'number' ? value : JSON.stringify(value)}
                            </Text>
                          </View>
                        )
                    )}
                  </View>
                ))}
              </View>
              <View style={styles.detailContainer}>
                <Text style={styles.label}>Cumulative GPA:</Text>
                <Text style={styles.value}>{term.cumulativeGPA}</Text>
              </View>
              <View style={styles.detailContainer}>
                <Text style={styles.label}>Cumulative Credits:</Text>
                <Text style={styles.value}>{term.cumulativeCredits}</Text>
              </View>
              <View style={styles.detailContainer}>
                <Text style={styles.label}>Cumulative Weighted GPA:</Text>
                <Text style={styles.value}>{term.cumulativeWeightedGPA}</Text>
              </View>
              <View style={styles.detailContainer}>
                <Text style={styles.label}>Credits This Term:</Text>
                <Text style={styles.value}>{term.creditsThisTerm}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      )
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to parse transcript data:', error)
      return <Text style={styles.text}>Error parsing transcript data</Text>
    }
  }

  if (shown) {
    if (field.name === 'Transcript' && typeof field.value === 'string') {
      return renderTranscript(field.value)
    } else if (field.name === 'Vaccinations' && typeof field.value === 'string') {
      return renderVaccinations(field.value)
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
        {typeof field.value === 'string' ? field.value : JSON.stringify(field.value)}
      </Text>
    )
  }
  return (
    <Text style={style || styles.text} testID={testIdWithKey('AttributeValue')}>
      {hiddenFieldValue}
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
