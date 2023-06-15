import React, { useRef, useState, useEffect, useLayoutEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import { useTheme, useTranslations } from 'dopenative'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import FastImage from 'react-native-fast-image'
import { useSelector } from 'react-redux'
import CalendarStrip from 'react-native-calendar-strip'
import moment from 'moment'
import { useSingleVendor } from '../../Core/vendor/api'
import { appointmentAPIManager, professionalsAPIManager } from '../../api'
import dynamicStyles from './styles'
import Picker from './Picker/Picker'
import { getAvailableWorkingHourSlots } from '../../utils/calTimeSlotAvailable'
import TNActivityIndicator from '../../Core/truly-native/TNActivityIndicator'
import { useConfig } from '../../config'

const defaultAvailableHours = getAvailableWorkingHourSlots(30, 8, 17, [13])

export default function BookAppointmentScreen({ route, navigation }) {
  const defaultAppointment = route?.params?.defaultAppointment ?? {}

  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const insets = useSafeAreaInsets()

  const currentUser = useSelector(state => state.auth.user)
  const config = useConfig()

  const [professionalNotes, setProfessionalNotes] = useState([
    ...(defaultAppointment?.notes ?? []),
  ])
  const [noteText, setNoteText] = useState('')
  const [didEditAppointment, setDidEditAppointment] = useState(false)
  const [professional, setProfessional] = useState(
    route?.params?.professional ?? {},
  )
  const [loadingProfessional, setLoadingProfessional] = useState(
    !professional?.id,
  )
  const [unAvailableDateHours, setUnAvailableDateHours] = useState(null)
  const [availableHours, setAvailableHours] = useState(null)

  const appointment = useRef({ ...defaultAppointment })

  const { vendor, loading: loadingVendor } = useSingleVendor(
    config.tables.vendorsTableName,
    defaultAppointment.vendorId || route?.params?.vendor?.id,
  )

  const loading = loadingProfessional || loadingVendor

  const isProfessional = currentUser?.role === 'professional'
  const professionalName = `${professional?.firstName ?? ''} ${
    professional?.lastName ?? ''
  }`
  const isRecentEditor =
    defaultAppointment?.id &&
    defaultAppointment?.recentEditorID === currentUser.id
  const canNotConfirm = isRecentEditor || didEditAppointment
  const canConfirm = !canNotConfirm && defaultAppointment?.id

  useLayoutEffect(() => {
    let screenTitle = 'Book Appointment'
    if (defaultAppointment?.id) {
      screenTitle = 'Edit Appointment'
    }
    navigation.setOptions({
      title: localized(screenTitle),
    })
  }, [])

  useEffect(() => {
    if (!professional?.id && defaultAppointment) {
      hydrateVendorAndProfessional()
    }
  }, [])

  useEffect(() => {
    const professionalId =
      appointment.current?.professionalId ?? professional?.id
    if (vendor?.id && professional?.id) {
      const unsubscribeAppointments =
        appointmentAPIManager.subscribeUserUpcomingAppointments(
          professionalId,
          onProfessionalUpcomingAppointments,
          true,
        )

      return unsubscribeAppointments
    }
  }, [vendor?.id, professional?.id])

  useEffect(() => {
    if (unAvailableDateHours) {
      const currentFormattedDate = moment().format('DD/MM/YYYY')
      const formattedDate =
        appointment.current.formattedDate ?? currentFormattedDate
      hydrateAvailableHours(formattedDate)
    }
  }, [unAvailableDateHours])

  const hydrateVendorAndProfessional = async () => {
    setLoadingProfessional(true)
    const appointmentProfessional =
      await professionalsAPIManager.getProfessional(
        appointment.current?.professionalId,
      )

    setProfessional(appointmentProfessional)
    setLoadingProfessional(false)
  }

  const onProfessionalUpcomingAppointments = upcomingAppointments => {
    if (!upcomingAppointments?.length) {
      setUnAvailableDateHours({})
      return
    }
    const upcomingAppointmentsDateHours = {}

    upcomingAppointments.forEach(upcomingAppointment => {
      if (upcomingAppointment?.id === defaultAppointment?.id) {
        return
      }
      const previousHours =
        upcomingAppointmentsDateHours[upcomingAppointment.formattedDate] ?? []
      upcomingAppointmentsDateHours[upcomingAppointment.formattedDate] = [
        ...previousHours,
        upcomingAppointment.appointmentTime,
      ]
    })
    setUnAvailableDateHours(upcomingAppointmentsDateHours)
  }

  const hydrateAvailableHours = selectedFormattedDate => {
    if (!selectedFormattedDate) {
      return
    }
    const unAvailableHours =
      (unAvailableDateHours ?? {})[selectedFormattedDate] ?? []
    const newAvailableHours = defaultAvailableHours?.filter(
      availableHour => !unAvailableHours?.includes(availableHour),
    )

    setAvailableHours(newAvailableHours)
  }

  const getAppointmentDate = () => {
    appointment.current
    const date = new Date(appointment.current.selectedDate)
    const timeArray = appointment.current.appointmentTime.split(':')
    date.setHours(timeArray[0], timeArray[1])
    return date.getTime()
  }

  const isAppointmentErred = () => {
    const { appointmentTime, formattedDate, selectedSkill, appointmentType } =
      appointment.current
    let error = null

    if (!appointmentType) {
      error = localized('Please choose an appointment type.')
    }
    if (!selectedSkill) {
      error = localized('Please choose a specialty.')
    }
    if (!appointmentTime) {
      error = localized('Please choose a time.')
    }
    if (!formattedDate) {
      error = localized('Please choose a day.')
    }

    return error
  }

  const onScheduleAppointment = async () => {
    const err = isAppointmentErred()
    if (err) {
      Alert.alert(localized('Incomplete'), err)
      return
    }

    const newAppointment = {
      ...appointment.current,
      vendorId: vendor?.id,
      professionalName,
      professionalProfilePicture: professional?.profilePictureURL ?? '',
      professionalId: professional?.id,
      recentEditorID: currentUser.id,
      appointmentDate: getAppointmentDate(),
    }

    if (professional?.id !== currentUser.id) {
      newAppointment.customerName = `${currentUser?.firstName ?? ''} ${
        currentUser?.lastName ?? ''
      }`
      newAppointment.customerProfilePicture =
        currentUser?.profilePictureURL ?? ''
      newAppointment.authorID = currentUser.id
    }

    const res = await appointmentAPIManager.updateAppointment(newAppointment)

    let messageTitle = localized('Your appointment has been created.')
    let messageDetail = localized(
      'Your appointment has been successfully created.',
    )
    if (!res) {
      messageTitle = localized('Failed')
      messageDetail = localized(
        'An error occured while creating your appointment. Please try again.',
      )
    }
    Alert.alert(messageTitle, messageDetail, [
      {
        text: localized('OK'),
        onPress: () => navigation.goBack(),
      },
    ])
  }

  const onConfirmAppointment = () => {
    Alert.alert(
      localized('Confirm appointment?'),
      localized('Are you sure you want to make this appointment?'),

      [
        {
          text: localized('Yes'),
          onPress: confirmAppointment,
        },
        {
          text: localized('No'),
        },
      ],
    )
  }

  const confirmAppointment = () => {
    appointmentAPIManager.confirmAppointment(defaultAppointment.id).then(id => {
      if (id) {
        Alert.alert(
          localized('Confirmed!'),
          localized('You have successfully confirmed this appointment.'),
          [
            {
              text: localized('OK'),
              onPress: () => navigation.goBack(),
            },
          ],
        )
      }
    })
  }

  const onAppointmentUpdated = () => {
    setDidEditAppointment(true)
  }

  const getProfessionalSkills = () => {
    return (professional?.professionalSkills ?? []).map(
      professionalSkill => professionalSkill.displayName,
    )
  }

  const onDateChange = date => {
    const formattedDate = date?.format('DD/MM/YYYY')
    hydrateAvailableHours(formattedDate)
    onAppointmentUpdated()
    appointment.current.formattedDate = formattedDate
    appointment.current.selectedDate = +new Date(date._d)
  }

  const onSelectedSkillChange = selectedSkill => {
    appointment.current.selectedSkill = selectedSkill
    if (defaultAppointment?.selectedSkill !== selectedSkill) {
      onAppointmentUpdated()
    }
  }

  const onSelectedTimeChange = appointmentTime => {
    appointment.current.appointmentTime = appointmentTime
    if (defaultAppointment?.appointmentTime !== appointmentTime) {
      onAppointmentUpdated()
    }
  }

  const onAppointmentTypeChange = selectedType => {
    appointment.current.appointmentType = selectedType
    if (defaultAppointment?.appointmentType !== selectedType) {
      onAppointmentUpdated()
    }
  }

  const onChangeNoteText = text => {
    setNoteText(text)
  }

  const onRemoveNote = note => {
    appointmentAPIManager
      .removeAppointmentNote(defaultAppointment.id, note)
      .then(newNote => {
        if (!newNote) {
          return
        }
        const index = findNoteIndex(newNote)

        if (index > -1) {
          const notes = [...professionalNotes]
          notes.splice(index, 1)
          setProfessionalNotes(notes)
        }
      })
  }

  const findNoteIndex = note => {
    return professionalNotes.findIndex(
      professionalNote => professionalNote.createdAt === note.createdAt,
    )
  }

  const onSubmitNote = ({ nativeEvent: { text } }) => {
    const note = {
      value: text?.trim(),
      createdAt: +new Date(),
    }
    appointmentAPIManager
      .addAppointmentNote(defaultAppointment.id, note)
      .then(newNote => {
        if (!newNote) {
          return
        }
        setNoteText('')
        const index = findNoteIndex(newNote)

        if (index < 0) {
          setProfessionalNotes(prevNotes => [...prevNotes, newNote])
        }
      })
  }

  let editButtonTitle = 'Confirm'
  if (defaultAppointment?.id) {
    editButtonTitle = 'Reschedule'
  }

  return (
    <View style={styles.container}>
      {!loading && availableHours && (
        <KeyboardAwareScrollView extraHeight={100} style={styles.listContainer}>
          <View style={styles.vendorContainer}>
            <View style={styles.vendorLocationContainer}>
              <View style={styles.vendorIconContainer}>
                <View style={styles.vendorIconWrapper}>
                  <FastImage
                    style={styles.professionalAvatar}
                    source={{
                      uri: professional?.profilePictureURL,
                    }}
                  />
                </View>
              </View>
              <View style={styles.vendorDetailContainer}>
                <Text style={styles.professionalName}>
                  {professional?.firstName + ' ' + professional?.lastName}
                </Text>

                <Text style={styles.vendorName}>{`from ` + vendor?.title}</Text>
                <Text style={styles.vendorAddress}>{vendor?.place}</Text>
              </View>
            </View>
          </View>
          <View style={styles.calendarContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{localized('Pick a day')}</Text>
            </View>
            <View style={styles.calendarDetailContainer}>
              <CalendarStrip
                scrollable
                style={styles.calendar}
                // calendarColor={'#3343CE'}
                calendarHeaderStyle={styles.calendarTitle}
                dateNumberStyle={styles.calendarTitle}
                dateNameStyle={styles.calendarTitle}
                highlightDateNumberStyle={styles.highlightDate}
                highlightDateNameStyle={styles.highlightDate}
                highlightDateContainerStyle={styles.highlightDateContainer}
                iconContainer={{ flex: 0.1 }}
                onDateSelected={onDateChange}
                selectedDate={defaultAppointment?.selectedDate ?? +new Date()}
                minDate={+new Date()}
              />
            </View>
          </View>
          <Picker
            list={availableHours}
            title={localized('Pick a time')}
            onChangeValue={onSelectedTimeChange}
            defaultValue={defaultAppointment?.appointmentTime}
          />
          <Picker
            list={getProfessionalSkills()}
            title={localized('Choose a Specialty')}
            onChangeValue={onSelectedSkillChange}
            defaultValue={defaultAppointment?.selectedSkill}
          />
          <Picker
            list={[
              localized('In Person'),
              localized('Audio Call'),
              localized('Video Session'),
            ]}
            title={localized('Type')}
            onChangeValue={onAppointmentTypeChange}
            defaultValue={defaultAppointment?.appointmentType}
          />
          {professionalNotes.length > 0 && (
            <View style={styles.professionalContainer}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{`${professionalName} ${localized(
                  'note:',
                )}`}</Text>
              </View>
              <View style={styles.professionalNoteContainer}>
                {professionalNotes?.map(note => (
                  <TouchableOpacity onPress={() => onRemoveNote(note)}>
                    <Text style={styles.professionalNote}>{note.value}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
          {isProfessional && (
            <View style={styles.inputContainer}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{localized('Add Note')}</Text>
              </View>
              <View style={styles.inputFieldContainer}>
                <TextInput
                  style={styles.inputField}
                  multiline={true}
                  blurOnSubmit={true}
                  onChangeText={onChangeNoteText}
                  value={noteText}
                  returnKeyLabel={localized('send')}
                  returnKeyType={'send'}
                  onSubmitEditing={onSubmitNote}
                />
              </View>
            </View>
          )}
        </KeyboardAwareScrollView>
      )}
      {!loading && availableHours && (
        <View
          style={[
            styles.footerContainer,
            { paddingBottom: Math.floor(insets.bottom, 16) },
          ]}>
          <View style={styles.buttonContainer}>
            {(canNotConfirm || !defaultAppointment?.id) && (
              <TouchableOpacity
                onPress={onScheduleAppointment}
                style={styles.button}>
                <Text style={styles.buttonTitle}>
                  {localized(editButtonTitle)}
                </Text>
              </TouchableOpacity>
            )}
            {canConfirm && (
              <TouchableOpacity
                onPress={onConfirmAppointment}
                style={[styles.button, styles.confirmButton]}>
                <Text style={[styles.buttonTitle, styles.confirmButtonTitle]}>
                  {localized('Confirm')}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
      {loading && <TNActivityIndicator />}
    </View>
  )
}
