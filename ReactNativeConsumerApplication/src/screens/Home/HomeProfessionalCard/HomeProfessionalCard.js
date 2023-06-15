import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useTheme } from 'dopenative'
import FastImage from 'react-native-fast-image'
import dynamicStyles from './styles'

export default function HomeProfessionalCard({ item, onPress }) {
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const fullname = `${item?.firstName ?? ''} ${item?.lastName ?? ''}`

  return (
    <TouchableOpacity onPress={() => onPress(item)} style={styles.container}>
      <View style={styles.bodyContainer}>
        <View style={styles.avatarContainer}>
          <FastImage
            style={styles.avatar}
            source={{
              uri: item?.profilePictureURL,
            }}
          />
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.name}>{fullname}</Text>
          <Text style={styles.specialty}>
            {item?.professionalSpecialty ?? ''}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
