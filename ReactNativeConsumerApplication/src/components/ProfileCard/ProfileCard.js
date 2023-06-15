import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import FastImage from 'react-native-fast-image'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from 'dopenative'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import dynamicStyles from './styles'

export default function ProfileCard({
  professionalID,
  profilePictureURL,
  fullname,
  specialty,
  profileId,
  vendorId,
  isBottomSheet = true,
  canContact = true,
  onDismissCard,
}) {
  const navigation = useNavigation()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const insets = useSafeAreaInsets()

  const currentUser = useSelector(state => state.auth.user)
  const channels = useSelector(state => state.chat.channels)

  const isProfessional = currentUser.id === professionalID

  const displayChat = () => {
    const participant = {
      firstName: fullname,
      id: profileId,
      lastName: '',
      profilePictureURL: profilePictureURL,
    }

    const id1 = currentUser.id
    const id2 = profileId
    let channel = {
      id: id1 < id2 ? id1 + id2 : id2 + id1,
      participants: [participant],
    }

    const otherChannelInfo = channels?.find(
      currentChannel => currentChannel.id === channel.id,
    )

    if (otherChannelInfo) {
      channel = {
        ...channel,
        ...otherChannelInfo,
      }
    }

    navigation.navigate('PersonalChat', { channel })
  }

  const onChat = () => {
    onDismissCard && onDismissCard()

    if (!isBottomSheet) {
      return displayChat()
    }
    setTimeout(() => {
      displayChat()
    }, 500)
  }

  const onCall = () => {
    // TODO: call number
  }

  const onProfileAvatarPress = async () => {
    if (!isBottomSheet) {
      return
    }
    onDismissCard && onDismissCard()

    setTimeout(() => {
      navigation.navigate('ProfessionalItemDetail', {
        profileId,
        vendorId,
      })
    }, 500)
  }

  return (
    <View
      style={[
        styles.container,
        isBottomSheet && { paddingBottom: Math.max(insets.bottom, 16) },
        isBottomSheet && styles.borderedContainer,
      ]}>
      {/* <FastImage
          style={styles.avatarBackground}
          source={{
            uri: professional?.profilePictureURL,
          }}
        /> */}
      {/* <View style={styles.avatarBackgroundOverlay} /> */}
      <View style={styles.avatarContainer}>
        <TouchableOpacity
          disabled={isProfessional}
          onPress={onProfileAvatarPress}
          style={styles.avatarWrapper}>
          <FastImage
            style={styles.avatar}
            source={{
              uri: profilePictureURL,
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.name}>{fullname}</Text>
        <Text style={styles.specialty}>{specialty}</Text>
      </View>
      {canContact && (
        <View style={styles.contactContainer}>
          <TouchableOpacity onPress={onCall} style={styles.contactWrapper}>
            <Image style={styles.contactIcon} source={theme.icons.call} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onChat} style={styles.contactWrapper}>
            <Image style={styles.contactIcon} source={theme.icons.chat} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}
