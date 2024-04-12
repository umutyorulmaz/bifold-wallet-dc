import { useRoute, RouteProp } from '@react-navigation/native'
import React from 'react'
import { View, Text, ScrollView, Image } from 'react-native'

import { InstitutionRegistry } from '../data/institutions-data'
import { RootStackParamList } from '../types/navigators'

// Type for the route parameter
type InstitutionDetailRouteProp = RouteProp<RootStackParamList, 'InstitutionDetail'>

const InstitutionDetailScreen = () => {
  const route = useRoute<InstitutionDetailRouteProp>()
  const { institutionId, categoryType } = route.params

  // Find the institution data by ID
  const institution = InstitutionRegistry.find((category) => category.type === categoryType)?.institutions.find(
    (inst) => inst.id === institutionId
  )

  if (!institution) {
    return (
      <View>
        <Text>Institution not found.</Text>
      </View>
    )
  }

  return (
    <ScrollView>
      <Image source={{ uri: institution.bannerImage }} style={{ width: '100%', height: 200 }} />
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{institution.name}</Text>
        <Text>{institution.description}</Text>
        {/* Render additional institution details here */}
      </View>
    </ScrollView>
  )
}

export default InstitutionDetailScreen
