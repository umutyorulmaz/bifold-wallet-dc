import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { FlatList, View, StyleSheet } from 'react-native'

import InstitutionCard from '../components/institution/InstitutionCard'
import { InstitutionRegistry, InstitutionCategoryType, InstitutionDetail } from '../data/institutions-data'
import { RootStackParamList } from '../types/navigators'

type EmployersScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'EmployersScreen'>
}

const EmployersScreen: React.FC<EmployersScreenProps> = ({ navigation }) => {
  const categoryType = InstitutionCategoryType.Employers

  const employersInstitutions =
    InstitutionRegistry.find((category) => category.type === categoryType)?.institutions || []

  const renderInstitution = ({ item }: { item: InstitutionDetail }) => (
    <InstitutionCard
      institution={item}
      onPress={() => {
        navigation.navigate('InstitutionDetail', {
          institutionId: item.id,
          categoryType: categoryType,
        })
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
        data={employersInstitutions}
        renderItem={renderInstitution}
        keyExtractor={(item) => item.id.toString()}
        // Add other props such as ItemSeparatorComponent if needed
      />
    </View>
  )
}

export default EmployersScreen
