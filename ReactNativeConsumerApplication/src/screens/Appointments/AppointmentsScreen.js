import React, { useState, useLayoutEffect, useEffect } from 'react'
import { FlatList, View } from 'react-native'
import { useTheme, useTranslations } from 'dopenative'
import Modal from 'react-native-modal'
import { useSelector } from 'react-redux'
import dynamicStyles from './styles'
import Hamburger from '../../components/Hamburger/Hamburger'
import { appointmentAPIManager } from '../../api'
import { TNEmptyStateView } from '../../Core/truly-native'
import AppointmentItem from '../../components/AppointmentItem/AppointmentItem'
import ProfileCard from '../../components/ProfileCard/ProfileCard'

const AppointmentsScreen = props => {
  const { navigation } = props

  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const currentUser = useSelector(state => state.auth.user)

  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [isProfileCardVisible, setIsProfileCardVisible] = useState(false)
  const [profileCard, setProfileCard] = useState(null)

  useLayoutEffect(() => {
    navigation.setOptions({
      title: localized('Your Appointments'),
      headerLeft: () => (
        <Hamburger
          onPress={() => {
            navigation.openDrawer()
          }}
        />
      ),
    })
  }, [])

  useEffect(() => {
    if (profileCard) {
      setIsProfileCardVisible(true)
      return
    }
    setIsProfileCardVisible(false)
  }, [profileCard])

  useEffect(() => {
    const unsubscribeAppointment =
      appointmentAPIManager.subscribeUserAppointments(
        currentUser?.id,
        onAppointmentsUpdate,
      )

    return () => {
      unsubscribeAppointment && unsubscribeAppointment()
    }
  }, [])

  const onAppointmentsUpdate = data => {
    setAppointments(data)
    setLoading(false)
  }

  const onUserItemPress = async item => {
    const isProfessional = currentUser.id === item.professionalId

    const professionalProfileCard = {
      fullname: item.professionalName,
      profilePictureURL: item?.professionalProfilePicture,
      specialty: item?.selectedSkill,
      profileId: item?.professionalId,
      vendorId: item?.vendorId,
      professionalID: item.professionalId,
    }

    const customerProfileCard = {
      fullname: item?.customerName,
      profilePictureURL: item?.customerProfilePicture,
      specialty: item?.selectedSkill,
      profileId: item?.authorID,
      vendorId: item?.vendorId,
      professionalID: item.professionalId,
    }

    setProfileCard(
      isProfessional ? customerProfileCard : professionalProfileCard,
    )
  }

  const editAppointment = async (item, isReschedule) => {
    const navParams = {
      defaultAppointment: {
        professionalId: item.professionalId,
        vendorId: item.vendorId,
      },
    }

    if (isReschedule) {
      navParams.defaultAppointment = item
    }

    navigation?.navigate('BookAppointment', navParams)
  }

  const onReschedule = async item => {
    editAppointment(item, true)
  }

  const onBookAgain = async item => {
    editAppointment(item)
  }

  const renderItem = ({ item, index }) => {
    const isProfessional = currentUser.id === item.professionalId
    return (
      <AppointmentItem
        key={item?.id ?? index}
        item={item}
        isProfessional={isProfessional}
        onReschedule={onReschedule}
        onBookAgain={onBookAgain}
        onUserItemPress={onUserItemPress}
      />
    )
  }

  const emptyStateConfig = {
    title: localized('No Appointments'),
    description: localized(
      "You haven't made any appointment yet. Your appointments will be displayed here.",
    ),
  }

  const renderEmptyComponent = () => {
    if (!loading) {
      return (
        <View style={styles.emptyViewContainer}>
          <TNEmptyStateView emptyStateConfig={emptyStateConfig} />
        </View>
      )
    }
    return null
  }

  const onDimiss = () => {
    setIsProfileCardVisible(false)
    setProfileCard(null)
  }

  return (
    <View style={styles.flat}>
      <FlatList
        style={styles.flat}
        data={appointments}
        renderItem={renderItem}
        keyExtractor={item => `${item.id}`}
        initialNumToRender={5}
        ListEmptyComponent={renderEmptyComponent}
      />
      <Modal
        isVisible={isProfileCardVisible}
        onSwipeComplete={onDimiss}
        swipeDirection={['up', 'left', 'right', 'down']}
        onBackdropPress={onDimiss}
        onDismiss={onDimiss}
        style={styles.modalContainer}>
        <ProfileCard {...(profileCard ?? {})} onDismissCard={onDimiss} />
      </Modal>
    </View>
  )
}

export default AppointmentsScreen
