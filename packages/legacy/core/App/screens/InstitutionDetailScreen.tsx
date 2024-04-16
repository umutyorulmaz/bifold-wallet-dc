import { useRoute, RouteProp } from '@react-navigation/native'
import React from 'react'
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native'

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
  const onApplyPress = () => {
    // Logic to handle the apply action (connection creation)
  }

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
      color: 'black',
    },
    institutionAddress: {
      fontSize: 20,
      color: 'black',
      marginTop: 4,
      marginBottom: 16,
    },
    institutionDescription: {
      fontSize: 20,
      marginTop: 8,
      color: 'black',
    },
    applyButton: {
      backgroundColor: '#007AFF',
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 40,
      alignSelf: 'center',
      marginTop: 80,
      width: '100%',
    },
    applyButtonText: {
      fontSize: 25,
      color: '#fff',
      textAlign: 'center',
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
        <TouchableOpacity style={styles.applyButton} onPress={onApplyPress}>
          <Text style={styles.applyButtonText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default InstitutionDetailScreen
