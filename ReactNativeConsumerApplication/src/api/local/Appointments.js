const appointmentStatus = {
  rescheduled: 'Rescheduled',
  confirmed: 'Confirmed',
  unconfirmed: 'Unconfirmed',
  canceled: 'Canceled',
  completed: 'Completed',
}

/**
 * Subcribe to changes in a single upcoming appointment.
 * Parameters
 * @param {string} userID - The user ID whose upcoming appointment we subcribe to
 * @param {function} callback - A callback method that gets called with a single upcoming appointment  every time there is  changes in tha upcoming appointment
 * @returns a function to unsubscribe to changes in the upcoming appointment
 */
const subscribeUserUpcomingAppointments = async (userID, callback) => {
  if (!userID) {
    return () => {}
  }

  callback({})
}

/**
 * Subcribe to changes in user appointments.
 * Parameters
 * @param {string} userID - The user ID whose user appointments we subcribe to
 * @param {function} callback - A callback method that gets called with a list of user appointments every time there is  changes in tha list of user appointments
 * @returns a function to unsubscribe to changes in the user appointments
 */
const subscribeUserAppointments = (userID, callback) => {
  if (!userID) {
    return null
  }
  callback([])
}

/**
 * Update a single appointment.
 * Parameters
 * @param {object} appointment- The appointment to be updated
 */

const updateAppointment = async appointment => {
  if (appointment?.recentEditorID && appointment?.id) {
    appointment.status = appointmentStatus.rescheduled
  }

  if (!appointment?.id) {
    appointment.id = '<auto_generated_id>'
    appointment.createdAt = +new Date()
    appointment.status = appointmentStatus.unconfirmed
  }
}

/**
 * Cancel a single appointment.
 * Parameters
 * @param {string} appointmentId - The appointment id to be canceled.
 */
const cancelAppointment = async appointmentId => {}

/**
 * Delete a single appointment.
 * Parameters
 * @param {string} appointmentId - The appointment id to be Deleted.
 */
const deleteAppointment = async appointmentId => {}

/**
 * Confirm a single appointment.
 * Parameters
 * @param {string} appointmentId - The appointment id to be confirmed.
 */
const confirmAppointment = async appointmentId => {}

/**
 * Add note to a single appointment.
 * Parameters
 * @param {string} appointmentId - The appointment id.
 * @param {object} note - the note to be added.
 */
const addAppointmentNote = async (appointmentId, note) => {
  if (!appointmentId) {
    return
  }
}

/**
 * Remove note from a single appointment.
 * Parameters
 * @param {string} appointmentId - The appointment id.
 * @param {object} note - the note to be removed.
 */
const removeAppointmentNote = async (appointmentId, note) => {
  if (!appointmentId) {
    return
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
