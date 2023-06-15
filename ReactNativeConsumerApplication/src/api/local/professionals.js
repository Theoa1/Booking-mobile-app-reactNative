/**
 * Subcribe to list of professionals.
 * Parameters
 * @param {function} callback - A callback method that gets called with the list of professionals every time changes in the list of professionals.
 * @returns a function to unsubscribe to changes in the list of professionals
 */
const subscribeProfessionals = callback => {
  callback()
}

/**
 * Subcribe to list of the featured professionals (usually the isFeatured flag is set to true on the user object)
 * Parameters
 * @param {function} callback - A callback method that gets called with the list of professionals every time changes in the list of professionals.
 * @returns a function to unsubscribe to changes in the list of professionals
 */
const subscribeFeaturedProfessionals = callback => {
  callback()
}

/**
 * Subcribe to a list of professionals of a single vendor.
 * Parameters
 * @param {string} vendorID -  the vendor id whose list of professionals we subscribe to
 * @param {function} callback - A callback method that gets called with the  vendor list of professionals every time there is changes in the list.
 * @returns a function to unsubscribe to changes in the list of professionals
 */
const subscribeVendorProfessionals = (vendorID, callback) => {
  if (!vendorID) {
    return () => {}
  }
  callback([])
}

/**
 * Subcribe to a list of professionals of a catefory.
 * Parameters
 * @param {string} categoryID -  the catefory id whose list of professionals we subscribe to
 * @param {function} callback - A callback method that gets called a  catefory list of professionals every time there is changes in the list.
 * @returns a function to unsubscribe to changes in the list of professionals
 */
const subscribeCategoryProfessionals = (categoryID, callback) => {
  if (!categoryID) {
    return
  }
  callback([])
}

/**
 * Fetch a single professional.
 * Parameters
 * @param {string} professionalId -  the professional id to fetch
 * @returns a proffesional
 */
const getProfessional = async professionalId => {
  if (!professionalId) {
    return null
  }
  return {}
}

/**
 * Delete a single professional.
 * Parameters
 * @param {string} professionalId -  the professional id to delete
 */
const deleteProfessional = async professionalId => {
  if (!professionalId) {
    return null
  }

  return {}
}

export default {
  getProfessional,
  deleteProfessional,
  subscribeProfessionals,
  subscribeFeaturedProfessionals,
  subscribeVendorProfessionals,
  subscribeCategoryProfessionals,
}
