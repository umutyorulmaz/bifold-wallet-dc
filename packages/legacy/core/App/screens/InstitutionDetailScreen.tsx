import { useAgent } from '@aries-framework/react-hooks'
import { useRoute, RouteProp } from '@react-navigation/native'
import React from 'react'
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native'

import { InstitutionRegistry } from '../data/institutions-data'
import { RootStackParamList, Screens, Stacks } from '../types/navigators'
import { connectFromInvitation } from '../utils/helpers'

import { ScanProps } from './Scan'

// Type for the route parameter
type InstitutionDetailRouteProp = RouteProp<RootStackParamList, 'InstitutionDetail'>

const InstitutionDetailScreen: React.FC<ScanProps> = ({ navigation }) => {
  const route = useRoute<InstitutionDetailRouteProp>()
  const { institutionId, categoryType } = route.params
  const { agent } = useAgent()
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

  const onApplyPress = async () => {
    const defaultInvitationURL =
      'http://crms.digicred.services:8030?c_i=eyJAdHlwZSI6ICJodHRwczovL2RpZGNvbW0ub3JnL2Nvbm5lY3Rpb25zLzEuMC9pbnZpdGF0aW9uIiwgIkBpZCI6ICIzNTdlYjE3YS1jZTgzLTQwMTMtOTdiNy1iYmY3ZTYzYzMyOGUiLCAibGFiZWwiOiAiRGlnaUNyZWRBIiwgInJlY2lwaWVudEtleXMiOiBbIkVIOUQ2U3V0RGlFbkoxRkNkeVdGbmhHRHZabXpWeHd2ZzljZERnd3ZCQlNBIl0sICJzZXJ2aWNlRW5kcG9pbnQiOiAiaHR0cDovL2NybXMuZGlnaWNyZWQuc2VydmljZXM6ODAzMCJ9'
    try {
      const record = await connectFromInvitation(
        defaultInvitationURL,
        agent, // Make sure 'agent' is properly initialized
        false,
        false,
        true //true for multi-use invitation
      )

      if (record?.connectionRecord?.id) {
        navigation.getParent()?.navigate(Stacks.ConnectionStack, {
          screen: Screens.Connection,
          params: { connectionId: record.connectionRecord.id },
        })
      } else {
        // Handling for connectionless scenarios
        navigation.navigate(Stacks.ConnectionStack as any, {
          screen: Screens.Connection,
          params: { threadId: record?.outOfBandRecord.outOfBandInvitation.threadId },
        })
      } //else {
      //   // Fallback navigation
      //   navigation.navigate('DefaultRoute')
      // }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error processing the invitation:', error)
      // Handle error appropriately
    }
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
