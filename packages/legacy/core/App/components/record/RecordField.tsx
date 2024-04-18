
import { CaptureBaseAttributeType } from '@hyperledger/aries-oca'
import { Attribute, Field } from '@hyperledger/aries-oca/build/legacy'
import startCase from 'lodash.startcase'
import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/theme';
import { testIdWithKey } from '../../utils/testable';
import { isDataUrl } from '../../utils/helpers';

import RecordBinaryField from './RecordBinaryField'
import RecordDateIntField from './RecordDateIntField'
import { hiddenFieldValue } from '../../constants'

interface RecordFieldProps {
  field: Field
  hideFieldValue?: boolean
  hideBottomBorder?: boolean
  shown?: boolean
  onToggleViewPressed?: () => void
  fieldLabel?: (field: Field) => React.ReactElement | null
  fieldValue?: (field: Field) => React.ReactElement | null
}

interface TranscriptItem {
  CourseCode: string;
  CourseTitle: string;
  Grade: string;
  syear: string;
  Term: string;
}


export const validEncoding = 'base64'
export const validFormat = new RegExp('^image/(jpeg|png|jpg)')


const TranscriptDisplay: React.FC<{ value: string }> = ({ value }) => {
  const { ListItems } = useTheme(); 
  const parsed = useMemo(() => {
    try {
      return JSON.parse(value) as TranscriptItem[];
    } catch (error) {
      console.error("Failed to parse transcript data:", error);
      return []; 
    }
  }, [value]);

  const renderItem = ({ item }: { item: TranscriptItem }) => (
    <View style={{ padding: 5 }}>
      <Text style={{ color: '#333', fontWeight: 'bold' }}>Course Code:</Text>
      <Text style={{ color: '#333' }}>{item.CourseCode}</Text>
      <Text style={{ color: '#333', fontWeight: 'bold' }}>Course Title:</Text>
      <Text style={{ color: '#333' }}>{item.CourseTitle}</Text>
      <Text style={{ color: '#333', fontWeight: 'bold' }}>Grade:</Text>
      <Text style={{ color: '#333' }}>{item.Grade}</Text>
      <Text style={{ color: '#333', fontWeight: 'bold' }}>Year:</Text>
      <Text style={{ color: '#333' }}>{item.syear}</Text>
      <Text style={{ color: '#333', fontWeight: 'bold' }}>Term:</Text>
      <Text style={{ color: '#333' }}>{item.Term}</Text>
    </View>
  );

  const keyExtractor = (item: TranscriptItem) => `${item.CourseCode}-${item.syear}`;


  return (
    <FlatList
      data={parsed}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
    />
  );
};



interface AttributeValueParams {
  field: Attribute
  shown?: boolean
  style?: Record<string, unknown>
}

export const AttributeValue: React.FC<AttributeValueParams> = ({ field, style, shown }) => {
  const { ListItems } = useTheme();
  const styles = StyleSheet.create({
    text: {
      ...ListItems.recordAttributeText,
    },
  });
  if (field.name === 'Transcript' && shown) {
    if (field.value && typeof field.value === 'string') {
      try {
   
        const data = JSON.parse(field.value);
        if (Array.isArray(data)) {
          // Use the TranscriptDisplay component to render the parsed data
          return <TranscriptDisplay value={field.value} />;
        }
      } catch (error) {
        // If parsing fails, just display the raw value
        return <Text style={[style || styles.text || {}]}>{field.value}</Text>;
      }
    }
 
  if (
    (field.encoding === validEncoding && field.format && validFormat.test(field.format) && field.value) ||
    isDataUrl(field.value)
  ) {
    return <RecordBinaryField attributeValue={field.value as string} style={style} shown={shown} />;
  }
  if (field.type === CaptureBaseAttributeType.DateInt || field.type === CaptureBaseAttributeType.DateTime) {
    return <RecordDateIntField field={field} style={style} shown={shown} />;
  }
  return (
    <Text style={style || styles.text} testID={testIdWithKey('AttributeValue')}>
      {shown ? field.value : hiddenFieldValue}
    </Text>
  );
};
}

const RecordField: React.FC<RecordFieldProps> = ({
  field,
  hideFieldValue = false,
  hideBottomBorder = false,
  shown = !hideFieldValue,
  onToggleViewPressed = () => undefined,
  fieldLabel = null,
  fieldValue = null,
}) => {
  const { t } = useTranslation()
  const { ListItems } = useTheme()
  const styles = StyleSheet.create({
    container: {
      ...ListItems.recordContainer,
      paddingHorizontal: 25,
      paddingTop: 16,
      backgroundColor: '#f5f5f5',
      // ...(field.name === 'Transcript' && { backgroundColor: 'pink' }),  // Highlight background if Transcript
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
        {fieldLabel ? (
          fieldLabel(field)
        ) : (
          <Text style={[ListItems.recordAttributeLabel]} testID={testIdWithKey('AttributeName')}>
          {field.label ?? startCase(field.name || '')}
        </Text>
          )}

        {hideFieldValue ? (
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
        ) : null}
      </View>

      <View style={styles.valueContainer}>
        {fieldValue ? (
          fieldValue(field)
        ) : (
            <>
              <View style={styles.valueText}>
                <AttributeValue field={field as Attribute} shown={shown} />
              </View>
            </>
          )}
      </View>
      {<View style={[styles.border, hideBottomBorder && { borderBottomWidth: 0 }]} />}
    </View>
  )
}

export default RecordField;
