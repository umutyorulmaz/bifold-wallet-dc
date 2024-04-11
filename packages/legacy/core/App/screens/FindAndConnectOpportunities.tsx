import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons' // Make sure this library is installed

import { RootStackParamList } from '../types/navigators'

type NavigationProp = StackNavigationProp<RootStackParamList>

const FindAndConnectOpportunities = () => {
  const navigation = useNavigation<NavigationProp>()

  interface Category {
    name: string
    icon: string
    screen: keyof RootStackParamList
  }

  const categories: Category[] = [
    { name: 'Education', icon: 'school', screen: 'EducationScreen' },
    { name: 'Military', icon: 'shield-cross', screen: 'MilitaryScreen' },
    { name: 'Employers', icon: 'briefcase-check', screen: 'EmployersScreen' },
    { name: 'State Government', icon: 'city', screen: 'StateGovernmentScreen' },
  ]

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: 20, // Adjust padding as needed
    },
    category: {
      alignItems: 'center',
      flex: 1, // Equally divide space among items
    },
    icon: {
      marginBottom: 8, // Space between icon and text
    },
    text: {
      textAlign: 'center',
    },
  })

  const navigateToScreen = (screenName: keyof RootStackParamList) => {
    navigation.navigate(screenName)
  }

  return (
    <View style={styles.container}>
      {categories.map((category) => (
        <TouchableOpacity key={category.name} style={styles.category} onPress={() => navigateToScreen(category.screen)}>
          <Icon name={category.icon} size={30} style={styles.icon} />
          <Text style={styles.text}>{category.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

export default FindAndConnectOpportunities
