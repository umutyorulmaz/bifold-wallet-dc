import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'

import { useTheme } from '../../contexts/theme'

interface ActionMenuBubbleProps {
  content: any
  workflowID: string
  handleActionButtonPress: (action: string, workflowID: string) => void
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
})

const ActionMenuBubble: React.FC<ActionMenuBubbleProps> = ({ content, workflowID, handleActionButtonPress }) => {
  const { ColorPallet, TextTheme } = useTheme()

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
      default:
        return null
    }
  }

  return <View style={styles.bubble}>{content.map((item: any, index: number) => renderContent(item, index))}</View>
}

export default ActionMenuBubble
