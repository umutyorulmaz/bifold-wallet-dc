import { CaptureBaseAttributeType } from '@hyperledger/aries-oca';
import { Attribute, Field } from '@hyperledger/aries-oca/build/legacy';
import startCase from 'lodash.startcase';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { hiddenFieldValue } from '../../constants';
import { useTheme } from '../../contexts/theme';
import { isDataUrl } from '../../utils/helpers';
import { testIdWithKey } from '../../utils/testable';

import RecordBinaryField from './RecordBinaryField';
import RecordDateIntField from './RecordDateIntField';

interface RecordFieldProps {
  field: Field;
  hideFieldValue?: boolean;
  hideBottomBorder?: boolean;
  shown?: boolean;
  onToggleViewPressed?: () => void;
  fieldLabel?: (field: Field) => React.ReactElement | null;
  fieldValue?: (field: Field) => React.ReactElement | null;
}

export const validEncoding = 'base64';
export const validFormat = new RegExp('^image/(jpeg|png|jpg)');

interface AttributeValueParams {
  field: Attribute;
  shown?: boolean;
  style?: Record<string, unknown>;
}

export const AttributeValue: React.FC<AttributeValueParams> = ({ field, style, shown }) => {
  const { ListItems } = useTheme();
  const styles = StyleSheet.create({
    text: {
      ...ListItems.recordAttributeText,
    },
  });

// Function to render transcript data with improved styling
const renderTranscript = (value: string) => {
  try {
    const data = JSON.parse(value);
    if (Array.isArray(data)) {
      return (
        <View style={transcriptStyles.transcriptContainer}>
          {data.map((item, index) => (
            <View key={index} style={transcriptStyles.courseContainer}>
              <Text style={transcriptStyles.courseLabel}>Course Code:</Text>
              <Text style={transcriptStyles.courseValue}>{item.CourseCode}</Text>
              <Text style={transcriptStyles.courseLabel}>Course Title:</Text>
              <Text style={transcriptStyles.courseValue}>{item.CourseTitle}</Text>
              <Text style={transcriptStyles.courseLabel}>Grade:</Text>
              <Text style={transcriptStyles.courseValue}>{item.Grade}</Text>
              <Text style={transcriptStyles.courseLabel}>Year:</Text>
              <Text style={transcriptStyles.courseValue}>{item.syear}</Text>
              <Text style={transcriptStyles.courseLabel}>Term:</Text>
              <Text style={transcriptStyles.courseValue}>{item.Term}</Text>
            </View>
          ))}
        </View>
      );
    }
  } catch (error) {
    console.error('Failed to parse transcript data:', error);
  }
  return <Text style={transcriptStyles.text}>{value}</Text>;
};

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
  courseLabel: {
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  courseValue: {
    color: '#666',
    marginBottom: 5,
  },
  text: {
    color: '#333',
  },
});

  // // Function to render transcript data
  // const renderTranscript = (value: string) => {
  //   try {
  //     const data = JSON.parse(value);
  //     if (Array.isArray(data)) {
  //       return (
  //         <View>
  //           {data.map((item, index) => (
  //             <View key={index}>
  //               <Text>Course Code: {item.CourseCode}</Text>
  //               <Text>Course Title: {item.CourseTitle}</Text>
  //               <Text>Grade: {item.Grade}</Text>
  //               <Text>Year: {item.syear}</Text>
  //               <Text>Term: {item.Term}</Text>
  //             </View>
  //           ))}
  //         </View>
  //       );
  //     }
  //   } catch (error) {
  //     console.error('Failed to parse transcript data:', error);
  //   }
  //   return <Text style={style || styles.text}>{value}</Text>;
  // };

  // Handling different types of attribute values
  if (field.name === 'Transcript' && shown) {
    return renderTranscript(field.value);
  } else if (
    (field.encoding === validEncoding && field.format && validFormat.test(field.format) && field.value) ||
    isDataUrl(field.value)
  ) {
    return <RecordBinaryField attributeValue={field.value as string} style={style} shown={shown} />;
  } else if (field.type === CaptureBaseAttributeType.DateInt || field.type === CaptureBaseAttributeType.DateTime) {
    return <RecordDateIntField field={field} style={style} shown={shown} />;
  }
  return (
    <Text style={style || styles.text} testID={testIdWithKey('AttributeValue')}>
      {shown ? field.value : hiddenFieldValue}
    </Text>
  );
};

const RecordField: React.FC<RecordFieldProps> = ({
  field,
  hideFieldValue = false,
  hideBottomBorder = false,
  shown = !hideFieldValue,
  onToggleViewPressed = () => undefined,
  fieldLabel = null,
  fieldValue = null,
}) => {
  const { t } = useTranslation();
  const { ListItems } = useTheme();
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
  });

  return (
    <View style={styles.container}>
      <View style={styles.valueContainer}>
        {fieldLabel ? fieldLabel(field) : (
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
        {fieldValue ? fieldValue(field) : (
          <View style={styles.valueText}>
            <AttributeValue field={field as Attribute} shown={shown} />
          </View>
        )}
      </View>
      {<View style={[styles.border, hideBottomBorder && { borderBottomWidth: 0 }]} />}
    </View>
  );
};

export default RecordField;


