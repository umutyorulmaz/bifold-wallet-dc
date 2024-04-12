import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'

// Assuming InstitutionDetail type is imported from the institutions-data file
import { InstitutionDetail } from '../../data/institutions-data'

type InstitutionCardProps = {
  institution: InstitutionDetail
  onPress: () => void
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontWeight: 'bold',
  },
  description: {
    color: '#666',
    marginTop: 2,
  },
  learnMore: {
    marginTop: 4,
    color: '#0066cc',
  },
})

const InstitutionCard: React.FC<InstitutionCardProps> = ({ institution, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: institution.iconUrl }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{institution.name}</Text>
        <Text style={styles.description}>{institution.description}</Text>
        <Text style={styles.learnMore}>Learn More</Text>
      </View>
    </TouchableOpacity>
  )
}

export default InstitutionCard
