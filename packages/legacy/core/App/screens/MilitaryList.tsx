import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { FlatList, View, StyleSheet } from 'react-native'

import InstitutionCard from '../components/institution/InstitutionCard'
import { InstitutionRegistry, InstitutionCategoryType, InstitutionDetail } from '../data/institutions-data'
import { HomeStackParams, Screens } from '../types/navigators'

type MilitaryScreenProps = {
  navigation: StackNavigationProp<HomeStackParams>
}

const MilitaryList: React.FC<MilitaryScreenProps> = ({ navigation }) => {
  const categoryType = InstitutionCategoryType.Military

  const militaryInstitutions =
    InstitutionRegistry.find((category) => category.type === categoryType)?.institutions || []

  const renderInstitution = ({ item }: { item: InstitutionDetail }) => (
    <InstitutionCard
      institution={item}
      onPress={() => {
        navigation.navigate(Screens.InstitutionDetail, {
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
        data={militaryInstitutions}
        renderItem={renderInstitution}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  )
}

export default MilitaryList
