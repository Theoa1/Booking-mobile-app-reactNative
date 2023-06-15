import { firebase } from '../../Core/api/firebase/config'

const subscribeCategories = (vendorCategoriesTableName, callback) => {
  const categoriesRef = firebase
    .firestore()
    .collection(vendorCategoriesTableName)
    .orderBy('order')

  return categoriesRef.onSnapshot(snapshot => {
    const data = snapshot?.docs.map(doc => ({
      ...(doc?.data() ?? {}),
      id: doc.id,
    }))

    return callback && callback(data)
  })
}

export default {
  subscribeCategories,
}
