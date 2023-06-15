/**
 * Subcribe to changes in categories.
 * Parameters
 * @param {callback} callback - A callback method that gets called with a list of categories every time changes in tha list of categories
 * @returns {function} a function to unsubscribe to changes in the list of categories
 */
const subscribeCategories = callback => {
  callback([])
}

export default {
  subscribeCategories,
}
