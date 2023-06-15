import React, { useRef } from 'react'
import FastImage from 'react-native-fast-image'
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native'
import { useTheme, useTranslations } from 'dopenative'
import ActionSheet from 'react-native-actionsheet'
import { appointmentAPIManager } from '../../api'
import dynamicStyles from './styles'

export default function AppointmentItem({
  item,
  onReschedule = () => {},
  onBookAgain = () => {},
  onUserItemPress = () => {},
  isProfessional,
}) {
  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const moreActionSheetRef = useRef()

  const isPastAppointment = +new Date() > item.selectedDate

  const isCanceled =
    item?.status === appointmentAPIManager.appointmentStatus.canceled
  const isConfirmed =
    item?.status === appointmentAPIManager.appointmentStatus.confirmed
  const canNotEdit = isCanceled || isConfirmed || isPastAppointment

  const statusStyle = {
    [appointmentAPIManager.appointmentStatus.confirmed]:
      styles.confirmStatusContainer,
    [appointmentAPIManager.appointmentStatus.unconfirmed]:
      styles.unconfirmStatusContainer,
    [appointmentAPIManager.appointmentStatus.canceled]:
      styles.canceledStatusContainer,
    [appointmentAPIManager.appointmentStatus.rescheduled]:
      styles.rescheduledStatusContainer,
  }

  const actionSheetOption =
    isPastAppointment && !isProfessional
      ? localized('Book Again')
      : localized('Delete')

  const onCancel = () => {
    if (isCanceled) {
      return Alert.alert(
        localized('Cancelled'),
        localized('This appointment is already cancelled'),
        [
          {
            text: localized('Ok'),
          },
        ],
      )
    }

    Alert.alert(
      localized('Cancel appointment?'),
      localized('Are you sure you want to cancel this appointment?'),
      [
        {
          text: localized('Yes, cancel'),
          onPress: () => appointmentAPIManager.cancelAppointment(item.id),
          style: 'destructive',
        },
        {
          text: localized('No, keep'),
        },
      ],
    )
  }

  const alertCanNotEdit = () => {
    Alert.alert(
      localized('Cannot edit appointment'),
      localized(
        `You can no longer edit this appointment as it is already ${
          item?.status?.toLowerCase() ?? ''
        }`,
      ),
      [
        {
          text: localized('Ok'),
        },
      ],
    )
  }

  const deleteAppointment = () => {
    appointmentAPIManager.deleteAppointment(item.id)
  }

  const onDeleteAppointment = () => {
    Alert.alert(
      localized('Delete appointment'),
      localized('Are you sure you want to delete this appointment?'),
      [
        {
          text: localized('Yes'),
          onPress: deleteAppointment,
          style: 'destructive',
        },
        {
          text: localized('No'),
        },
      ],
    )
  }

  const onEditPress = () => {
    if (canNotEdit) {
      return alertCanNotEdit()
    }
    onReschedule(item)
  }

  const onMorePress = () => {
    moreActionSheetRef.current.show()
  }

  const onMoreActionSheetDone = index => {
    if (index !== 0) {
      return
    }

    if (isPastAppointment && !isProfessional) {
      onBookAgain(item)
    } else {
      onDeleteAppointment()
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity
          onPress={() => onUserItemPress(item)}
          style={styles.avatarContainer}>
          <View style={styles.avatarWrapper}>
            <FastImage
              style={styles.avatar}
              source={{
                uri: isProfessional
                  ? item?.customerProfilePicture
                  : item?.professionalProfilePicture,
              }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onUserItemPress(item)}
          style={styles.detailContainer}>
          <Text style={styles.name}>
            {isProfessional ? item?.customerName : item?.professionalName}
          </Text>
          <Text style={styles.time}>
            {item?.selectedSkill} -{' '}
            <Text style={styles.time}>{item?.appointmentType}</Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onMorePress} style={styles.menuContainer}>
          <Image style={styles.menu} source={theme.icons.more} />
        </TouchableOpacity>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.scheduleDetailContainer}>
          <TouchableOpacity style={styles.scheduleItemContainer}>
            <Image
              style={styles.scheduleItemIcon}
              source={theme.icons.calendar}
            />
            <Text style={styles.scheduleItemTitle}>{item?.formattedDate}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.scheduleItemContainer}>
            <Image style={styles.scheduleItemIcon} source={theme.icons.clock} />
            <Text style={styles.scheduleItemTitle}>
              {item?.appointmentTime}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.scheduleItemContainer}>
            <View style={[styles.statusContainer, statusStyle[item.status]]} />
            <Text style={styles.scheduleItemTitle}>{item?.status}</Text>
          </TouchableOpacity>
        </View>
        {!isPastAppointment && (
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              onPress={onCancel}
              style={[styles.buttonContainer, styles.cancelButtonContainer]}>
              <Text style={[styles.buttonTitle, styles.cancelButtonTitle]}>
                {localized('Cancel')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onEditPress}
              style={[
                styles.buttonContainer,
                canNotEdit && styles.cancelButtonContainer,
              ]}>
              <Text
                style={[
                  styles.buttonTitle,
                  canNotEdit && styles.cancelButtonTitle,
                ]}>
                {localized('Edit')}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <ActionSheet
        ref={moreActionSheetRef}
        title={localized('Actions')}
        options={[actionSheetOption, localized('Cancel')]}
        cancelButtonIndex={1}
        destructiveButtonIndex={isPastAppointment ? undefined : 0}
        onPress={onMoreActionSheetDone}
      />
    </View>
  )
}
