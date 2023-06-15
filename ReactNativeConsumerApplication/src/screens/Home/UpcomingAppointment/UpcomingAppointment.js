import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { useTheme, useTranslations } from 'dopenative'
import dynamicStyles from './styles'

export default function UpcomingAppointment({ appointment, onSeeDetailPress }) {
  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>
          {localized('Upcoming Appointment')}
        </Text>
        <Text style={styles.subtitle}>
          {`${appointment?.professionalName} - ${appointment?.appointmentType}`}
        </Text>
        <View style={styles.scheduleDetailContainer}>
          <View style={styles.scheduleItemContainer}>
            <Image
              style={styles.scheduleItemIcon}
              source={theme.icons.calendar}
            />
            <Text style={styles.scheduleItemTitle}>
              {appointment?.formattedDate}
            </Text>
          </View>
          <View style={styles.scheduleItemContainer}>
            <Image style={styles.scheduleItemIcon} source={theme.icons.clock} />
            <Text style={styles.scheduleItemTitle}>
              {appointment?.appointmentTime}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => onSeeDetailPress(appointment)}
            style={styles.scheduleItemContainer}>
            {/* <View style={styles.statusContainer} /> */}
            {/* <Text style={styles.scheduleItemTitle}>{'Unconfirmed'}</Text> */}
            <View style={styles.seeDetailsButton}>
              <Text style={styles.seeDetailsTitle}>
                {localized('View Details')}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
