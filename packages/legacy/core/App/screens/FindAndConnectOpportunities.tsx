import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FC } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { SvgProps } from 'react-native-svg'
import BuildingOutline from '../assets/icons/building-outline.svg'
import CapitolOutline from '../assets/icons/capitol-outline.svg'
import GraduationOutline from '../assets/icons/graduation-outline.svg'
import ShieldOutline from '../assets/icons/shield-outline.svg'
import { HomeStackParams, Screens } from '../types/navigators'

type NavigationProp = {
  navigation: StackNavigationProp<HomeStackParams>
}

const FindAndConnectOpportunities: React.FC<NavigationProp> = ({navigation}) =>  {

  interface Category {
    name: string
    icon: FC<SvgProps> 
    screen: keyof HomeStackParams
  }

  const categories: Category[] = [
    { name: 'Education', icon: GraduationOutline, screen: Screens.EducationList },
    { name: 'Employers', icon: BuildingOutline, screen: Screens.EmployersList},
    { name: 'Military', icon: ShieldOutline, screen: Screens.MilitaryList},
    { name: 'State\nGov', icon: CapitolOutline, screen: Screens.StateGovernmentList },
  ]

  const styles = StyleSheet.create({
    outerContainer: {
      flexDirection: 'column',
      flexWrap: 'wrap',
      paddingBottom: 10,
      justifyContent: 'space-between',
    },
    container: {
      flexDirection: 'row',
      marginBottom: 20,
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#000000',
      marginBottom: 5,
      marginTop: -10,
    },
    category: {
      alignItems: 'center',
      flex: 1, // Distribute space equally among category buttons
      padding: 10,
      margin: 5,
      borderWidth: 1,
      borderRadius: 12,
      borderColor: '#d1d4c9',
      backgroundColor: '#f1f1f1',
    },
    text: {
      textAlign: 'center',
      fontSize: 12,
      fontWeight: 'bold',
      color: '#000000',
    },
  })

  const navigateToScreen = (screenName: keyof HomeStackParams) => {
    console.log(screenName)
    if (screenName != 'StateGovernmentList') { // *ACS* Gov screen is currently not active
      navigation.navigate(screenName)
    }
  }

  return (
    <View style={styles.outerContainer}>
      <Text style={styles.title}>Find & Connect Opportunities</Text>
      <View style={styles.container}>
        {/* Mapping through categories to create buttons for each */}
        {categories.map((category) => (
          <TouchableOpacity
            key={category.name}
            style={styles.category}
            onPress={() => navigateToScreen(category.screen)}
          >
            <category.icon width={36} height={36} />
            <Text style={styles.text}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

export default FindAndConnectOpportunities
