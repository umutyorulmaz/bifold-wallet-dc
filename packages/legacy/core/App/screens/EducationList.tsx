import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { FlatList, View, StyleSheet } from 'react-native'

import InstitutionCard from '../components/institution/InstitutionCard'
import { InstitutionRegistry, InstitutionCategoryType, InstitutionDetail } from '../data/institutions-data'
import { RootStackParamList } from '../types/navigators'

type EducationScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'EducationScreen'>
}

const EducationScreen: React.FC<EducationScreenProps> = ({ navigation }) => {
  // Filter out only education institutions
  const educationInstitutions =
    InstitutionRegistry.find((category) => category.type === InstitutionCategoryType.Education)?.institutions || []

  const renderInstitution = ({ item }: { item: InstitutionDetail }) => (
    <InstitutionCard
      institution={item}
      onPress={() => {
        // Handle the press event, navigate to a detail screen
        navigation.navigate('InstitutionDetail', { institutionId: item.id })
      }}
    />
  )

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 10,
    },
    // Other styles can be added here
  })

  return (
    <View style={styles.container}>
      <FlatList
        data={educationInstitutions}
        renderItem={renderInstitution}
        keyExtractor={(item) => item.id.toString()}
        // Add other props such as ItemSeparatorComponent if needed
      />
    </View>
  )
}

export default EducationScreen
