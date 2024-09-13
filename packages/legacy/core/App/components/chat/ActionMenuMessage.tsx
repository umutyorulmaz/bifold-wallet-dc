import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native'

import { useTheme } from '../../contexts/theme'

interface ActionMenuBubbleProps {
  content: any
  workflowID: string
  handleActionButtonPress: (action: string, workflowID: string) => void
}
interface FormData {
  [key: string]: string | Date | undefined
}

const styles = StyleSheet.create({
  bubble: {
    backgroundColor: 'transparent',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#d3d3d3',
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
    color: '#000',
  },
  image: {
    width: '100%',
    height: 150,
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    marginBottom: 10,
    color: '#000',
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: '100%',
  },
  buttonText: {
    fontSize: 14,
    textAlign: 'center',
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioButtonIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    marginRight: 10,
  },
  radioButtonIconSelected: {
    backgroundColor: 'blue',
  },
  radioButtonText: {
    fontSize: 16,
  },
})

const ActionMenuBubble: React.FC<ActionMenuBubbleProps> = ({ content, workflowID, handleActionButtonPress }) => {
  const { ColorPallet, TextTheme } = useTheme()
  const [formData, setFormData] = useState<FormData>({})

  const renderFormField = (field: any, index: number) => {
    if (!field) {
      return null
    }

    switch (field.type) {
      case 'text': {
        return (
          <TextInput
            key={index}
            style={styles.textInput}
            placeholder={field.label}
            value={formData[field.name] ? formData[field.name]?.toString() : ''}
            onChangeText={(text) => setFormData({ ...formData, [field.name]: text })}
          />
        )
      }

      case 'radio': {
        return (
          <View key={index}>
            <Text style={styles.radioButtonText}>{field.label}</Text>
            {field.options.map((option: string, optionIndex: number) => (
              <TouchableOpacity
                key={optionIndex}
                style={styles.radioButton}
                onPress={() => setFormData({ ...formData, [field.name]: option })}
              >
                <View
                  style={[styles.radioButtonIcon, formData[field.name] === option && styles.radioButtonIconSelected]}
                />
                <Text style={styles.radioButtonText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )
      }
      default:
        return null
    }
  }

  const renderContent = (item: any, index: number) => {
    switch (item.type) {
      case 'image':
        return item.url ? (
          <Image key={index} source={{ uri: item.url }} style={styles.image} resizeMode="contain" />
        ) : null
      case 'title':
        return (
          <Text key={index} style={[styles.title, TextTheme.bold]}>
            {item.text}
          </Text>
        )
      case 'text':
        return (
          <Text key={index} style={[styles.description, TextTheme.normal]}>
            {item.text}
          </Text>
        )
      case 'button':
        return (
          <TouchableOpacity
            key={index}
            style={[styles.button, { backgroundColor: ColorPallet.brand.primary }]}
            onPress={() => handleActionButtonPress(item.actionID, workflowID)}
          >
            <Text style={[styles.buttonText, { color: ColorPallet.grayscale.white }]}>{item.label}</Text>
          </TouchableOpacity>
        )
      case 'form':
        return (
          <View key={index}>
            {item.fields.map((field: any, fieldIndex: number) => renderFormField(field, fieldIndex))}
          </View>
        )
      default:
        return null
    }
  }

  return <View style={styles.bubble}>{content.map((item: any, index: number) => renderContent(item, index))}</View>
}

export default ActionMenuBubble
