import { firebase } from '../../Core/api/firebase/config'

const appointmentsRef = firebase.firestore().collection('appointments_bookings')

const appointmentStatus = {
  rescheduled: 'Rescheduled',
  confirmed: 'Confirmed',
  unconfirmed: 'Unconfirmed',
  canceled: 'Canceled',
  completed: 'Completed',
}

const subscribeUserUpcomingAppointments = (
  userID,
  callback,
  isProfessional = false,
) => {
  if (!userID) {
    return () => {}
  }

  const currentDate = +new Date()
  const userFieldID = isProfessional ? 'professionalId' : 'authorID'

  return appointmentsRef
    .where(userFieldID, '==', userID)
    .where('selectedDate', '>', currentDate)
    .onSnapshot(snapshot => {
      // if (snapshot?.metadata?.fromCache === true) {
      //   return
      // }

      if (!snapshot?.docs?.length) {
        callback && callback(null)
      }

      const upcomingAppointments = []
      snapshot?.docs.forEach(doc => {
        const appointment = doc.data()

        const notCanceled = appointment.status !== appointmentStatus.canceled

        if (notCanceled) {
          upcomingAppointments.push(appointment)
        }
      })

      const sortedUpcomingAppointments = upcomingAppointments.sort((a, b) => {
        return a.selectedDate < b.selectedDate
          ? 1
          : a.selectedDate < b.selectedDate
          ? -1
          : 0
      })

      callback && callback(sortedUpcomingAppointments)
    })
}

const subscribeUserAppointments = (userID, callback) => {
  if (!userID) {
    return null
  }
  return (
    appointmentsRef
      .where('authorID', '==', userID)
      // .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const appointments = snapshot?.docs
          ?.map(doc => ({
            appointmentDate: 0,
            ...(doc?.data() ?? {}),
            id: doc.id,
          }))
          .sort((a, b) => {
            return a.appointmentDate - b.appointmentDate
          })

        if (appointments?.length) {
          const currentDate = +new Date()

          const upcomingStartIndex = appointments?.findIndex(
            dataItem => dataItem?.appointmentDate > currentDate,
          )
          const upcomingAppointments = appointments?.splice(upcomingStartIndex)

          return (
            callback && callback([...upcomingAppointments, ...appointments])
          )
        }
      })
  )
}

const updateAppointment = async appointment => {
  if (appointment?.recentEditorID && appointment?.id) {
    appointment.status = appointmentStatus.rescheduled
  }

  if (!appointment?.id) {
    appointment.id = appointmentsRef.doc().id
    appointment.createdAt = +new Date()
    appointment.status = appointmentStatus.unconfirmed
  }

  try {
    appointmentsRef.doc(appointment.id).set(
      {
        ...appointment,
        updatedAt: +new Date(),
      },
      { merge: true },
    )
    return appointment
  } catch (error) {
    console.log('__ error', error)
    return null
  }
}

const cancelAppointment = async appointmentId => {
  try {
    appointmentsRef.doc(appointmentId).update({
      updatedAt: +new Date(),
      status: appointmentStatus.canceled,
    })
    return appointmentId
  } catch (error) {
    return null
  }
}

const deleteAppointment = async appointmentId => {
  try {
    appointmentsRef.doc(appointmentId).delete()
    return appointmentId
  } catch (error) {
    return null
  }
}

const confirmAppointment = async appointmentId => {
  try {
    appointmentsRef.doc(appointmentId).update({
      updatedAt: +new Date(),
      status: appointmentStatus.confirmed,
    })
    return appointmentId
  } catch (error) {
    return null
  }
}

const addAppointmentNote = async (appointmentId, note) => {
  if (!appointmentId) {
    return
  }

  try {
    appointmentsRef.doc(appointmentId).set(
      {
        notes: firebase.firestore.FieldValue.arrayUnion(note),
        updatedAt: +new Date(),
      },
      { merge: true },
    )
    return note
  } catch (error) {
    return null
  }
}

const removeAppointmentNote = async (appointmentId, note) => {
  if (!appointmentId) {
    return
  }

  try {
    appointmentsRef.doc(appointmentId).set(
      {
        notes: firebase.firestore.FieldValue.arrayRemove(note),
        updatedAt: +new Date(),
      },
      { merge: true },
    )
    return note
  } catch (error) {
    return null
  }
}

export default {
  subscribeUserUpcomingAppointments,
  subscribeUserAppointments,
  updateAppointment,
  cancelAppointment,
  deleteAppointment,
  confirmAppointment,
  appointmentStatus,
  addAppointmentNote,
  removeAppointmentNote,
}
