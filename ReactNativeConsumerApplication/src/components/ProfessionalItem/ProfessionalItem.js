import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { useTheme } from 'dopenative'
import { useSelector } from 'react-redux'
import FastImage from 'react-native-fast-image'
import dynamicStyles from './styles'

export default function ProfessionalItem({ item, onPress, onDelete, onAdd }) {
  const currentUser = useSelector(state => state.auth.user)
  const isUserVendorAdmin = currentUser?.role === 'vendor'
  const isVendorProfessional =
    currentUser.vendorID === item?.professionalVendorID
  const hasVendor = item?.professionalVendorID

  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const fullname = `${item?.firstName ?? ''} ${item?.lastName ?? ''}`

  return (
    <TouchableOpacity onPress={() => onPress(item)} style={styles.container}>
      <View style={styles.bodyContainer}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatarWrapper}>
            <FastImage
              style={styles.avatar}
              source={{
                uri: item?.profilePictureURL,
              }}
            />
          </View>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.name}>{fullname}</Text>
          <Text style={styles.time}>{item?.professionalSpecialty ?? ''}</Text>
        </View>

        <View style={styles.ratingContainer}>
          <View style={styles.ratingWrapper}>
            <Text style={styles.rating}>{`⭐ ${item?.avgRating ?? ''}(${
              item?.totalNReviews ?? 0
            })`}</Text>
          </View>
        </View>

        {isUserVendorAdmin && (
          <>
            {isVendorProfessional && (
              <TouchableOpacity
                onPress={() => onDelete(item)}
                style={styles.deleteIconContainer}>
                <Image style={styles.deleteIcon} source={theme.icons.close} />
              </TouchableOpacity>
            )}
            {!isVendorProfessional && !hasVendor && (
              <TouchableOpacity
                onPress={() => onAdd(item)}
                style={styles.deleteIconContainer}>
                <Image style={styles.addIcon} source={theme.icons.plus} />
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
    </TouchableOpacity>
  )
}
