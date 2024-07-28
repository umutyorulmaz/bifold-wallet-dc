import { useAgent } from '@credo-ts/react-hooks'
import { useRoute, RouteProp, useFocusEffect } from '@react-navigation/native'
import React, { useState, useCallback } from 'react'
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native'

//import { useTheme } from '../contexts/theme' // *ACS*
import { InstitutionRegistry } from '../data/institutions-data'
import { HomeStackParams, Screens, Stacks } from '../types/navigators'
import { connectFromInvitation } from '../utils/helpers'

import { ScanProps } from './Scan'

// Type for the route parameter
type InstitutionDetailRouteProp = RouteProp<HomeStackParams, Screens.InstitutionDetail>

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

  // State to manage button clickability
  const [isButtonDisabled, setButtonDisabled] = useState(false)

  useFocusEffect(
    useCallback(() => {
      // Enable the button when the screen is focused
      setButtonDisabled(false)
    }, [])
  )

  const onApplyPress = async () => {
    setButtonDisabled(true)
    //const defaultInvitationURL =
    //'http://crms.digicred.services:8030?c_i=eyJAdHlwZSI6ICJodHRwczovL2RpZGNvbW0ub3JnL2Nvbm5lY3Rpb25zLzEuMC9pbnZpdGF0aW9uIiwgIkBpZCI6ICIzNTdlYjE3YS1jZTgzLTQwMTMtOTdiNy1iYmY3ZTYzYzMyOGUiLCAibGFiZWwiOiAiRGlnaUNyZWRBIiwgInJlY2lwaWVudEtleXMiOiBbIkVIOUQ2U3V0RGlFbkoxRkNkeVdGbmhHRHZabXpWeHd2ZzljZERnd3ZCQlNBIl0sICJzZXJ2aWNlRW5kcG9pbnQiOiAiaHR0cDovL2NybXMuZGlnaWNyZWQuc2VydmljZXM6ODAzMCJ9'
    try {
      const record = await connectFromInvitation(
        institution.invitationLink!,
        agent, // Make sure 'agent' is properly initialized
        false,
        false,
        true //true for multi-use invitation
      )

      if (record?.connectionRecord?.id) {
        // eslint-disable-next-line no-console
        //console.log('Navigating to Chat with connectionId:', record.connectionRecord.id)
        navigation.navigate(Stacks.ContactStack as any, {
          screen: Screens.Chat,
          params: { connectionId: record.connectionRecord.id },
        })
      } else {
        // Handling for connectionless scenarios
        navigation.navigate(Stacks.ContactStack as any, {
          screen: Screens.Chat,
          params: { threadId: record?.outOfBandRecord.outOfBandInvitation.threadId },
        })
      } //else {
      //   // Fallback navigation
      //   navigation.navigate('DefaultRoute')
      // }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error processing the invitation:', error)
      setButtonDisabled(false)
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
      fontSize: 24,
      fontWeight: 'bold',
      color: 'black',
    },
    institutionAddress: {
      fontSize: 16,
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
      alignSelf: 'center', // Center button horizontally
      marginTop: 50, // Increase space from the last text element to move it lower
      width: '100%', // Set width to a percentage of the screen width // Space from the last text element
      padding: 16,
      borderRadius: 4,
      backgroundColor: '#062c80',
    },
    applyButtonText: {
      fontSize: 16, // *ACS*
      color: '#ffffff',
      textAlign: 'center',
      fontWeight: 'bold',
    },
  })

  const getButtonStyles = () => ({
    ...styles.applyButton,
    backgroundColor: isButtonDisabled ? '#AAB8C2' : '#062c80', // Light grey when disabled
    opacity: isButtonDisabled ? 0.5 : 1,
  })

  return (
    <ScrollView>
      <Image source={{ uri: institution.bannerImage }} style={styles.bannerImage} />
      <View style={styles.contentContainer}>
        <Text style={styles.institutionName}>{institution.name.substring(3)}</Text>
        <Text style={styles.institutionAddress}>{institution.address}</Text>
        <Text style={styles.institutionDescription}>{institution.description}</Text>
        {/* Conditionally render the Apply button if there's an invitationLink */}
        {institution.invitationLink && (
          <TouchableOpacity style={getButtonStyles()} onPress={onApplyPress} disabled={isButtonDisabled}>
            <Text style={styles.applyButtonText}>APPLY</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  )
}

export default InstitutionDetailScreen
