import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FC } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
//import Icon from 'react-native-vector-icons/MaterialCommunityIcons' // Make sure this library is installed
import { SvgProps } from 'react-native-svg'

import BuildingOutline from '../assets/icons/building-outline.svg'
import CapitolOutline from '../assets/icons/capitol-outline.svg'
import GraduationOutline from '../assets/icons/graduation-outline.svg'
import ShieldOutline from '../assets/icons/shield-outline.svg'
//import { Icon } from '../assets/icons/icons'
import { RootStackParamList } from '../types/navigators'

type NavigationProp = StackNavigationProp<RootStackParamList>

const FindAndConnectOpportunities = () => {
  const navigation = useNavigation<NavigationProp>()

  interface Category {
    name: string
    icon: FC<SvgProps> // Expect a React component instead of a string
    screen: keyof RootStackParamList
  }

  const categories: Category[] = [
    { name: 'Education', icon: GraduationOutline, screen: 'EducationScreen' },
    { name: 'Military', icon: ShieldOutline, screen: 'MilitaryScreen' },
    { name: 'Employers', icon: BuildingOutline, screen: 'EmployersScreen' }, // Assuming JobsFlatIcon is for Employers
    { name: 'State Government', icon: CapitolOutline, screen: 'StateGovernmentScreen' }, // Assuming GovernmentFlatIcon is for State Government
  ]

  const styles = StyleSheet.create({
    outerContainer: {
      // Apply padding to all sides except the top
      paddingTop: 10, // Smaller padding at the top to move title up
      paddingBottom: 20, // Padding at the bottom
      paddingHorizontal: 20, // Horizontal padding
      alignItems: 'center', // Center children horizontally
      justifyContent: 'center', // Center children vertically, if needed
    },
    title: {
      fontSize: 32, // Set the size of your title text
      fontWeight: 'bold', // Makes the title text bold
      marginBottom: 30, // Space between the title and the category buttons
      textAlign: 'center', // Ensures that the title is centered
      // You can add additional styling for the title text if needed
    },
    container: {
      flexDirection: 'row', // Aligns children (categories) in a row
      justifyContent: 'space-around', // Evenly distributes children along the horizontal axis
      alignItems: 'center', // Aligns children along the vertical axis
      // The padding here may no longer be necessary if you have padding in outerContainer
      // padding: 20, // You can adjust this padding or remove it as per your design needs
    },
    category: {
      alignItems: 'center', // Centers the icon and text within each category button
      flex: 1, // Distributes space equally among category buttons
      // You may want to add some vertical padding if the buttons are too close to each other
      paddingVertical: 10, // Adjust as needed
    },
    icon: {
      marginBottom: 20, // Space between icon and category name text
    },
    text: {
      textAlign: 'center',
      fontSize: 24,
      fontWeight: 'bold', // Ensures text is centered below the icon
      // Add any specific text styles you need, like font size or color
    },
  })

  const navigateToScreen = (screenName: keyof RootStackParamList) => {
    navigation.navigate(screenName)
  }

  return (
    <View style={styles.outerContainer}>
      {/* Title text for the opportunities section */}
      <Text style={styles.title}>Find & Connect Opportunities</Text>
      <View style={styles.container}>
        {/* Mapping through categories to create buttons for each */}
        {categories.map((category) => (
          <TouchableOpacity
            key={category.name}
            style={styles.category}
            onPress={() => navigateToScreen(category.screen)}
          >
            <category.icon width={90} height={90} />
            <Text style={styles.text}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

export default FindAndConnectOpportunities
