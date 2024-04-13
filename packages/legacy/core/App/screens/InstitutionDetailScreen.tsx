import { useRoute, RouteProp } from '@react-navigation/native'
import React from 'react'
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native'

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

  const styles = StyleSheet.create({
    bannerImage: {
      width: '100%',
      height: 200,
    },
    contentContainer: {
      padding: 16,
    },
    institutionName: {
      fontSize: 30,
      fontWeight: 'bold',
    },
    institutionAddress: {
      fontSize: 20,
      color: 'grey',
      marginTop: 4,
      marginBottom: 16,
    },
    institutionDescription: {
      fontSize: 20,
      marginTop: 8,
    },
  })

  return (
    <ScrollView>
      <Image source={{ uri: institution.bannerImage }} style={styles.bannerImage} />
      <View style={styles.contentContainer}>
        <Text style={styles.institutionName}>{institution.name.substring(3)}</Text>
        <Text style={styles.institutionAddress}>{institution.address}</Text>
        <Text style={styles.institutionDescription}>{institution.description}</Text>
        {/* Render additional institution details here */}
      </View>
    </ScrollView>
  )
}

export default InstitutionDetailScreen
