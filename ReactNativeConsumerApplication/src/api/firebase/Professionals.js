import { firebase } from '../../Core/api/firebase/config'

const usersRef = firebase.firestore().collection('users')
const professionalsRef = usersRef.where('role', '==', 'professional')

const onSnapshotsAvailable = (snapshot, callback) => {
  const data = snapshot?.docs?.map(doc => ({
    ...(doc?.data() ?? {}),
    id: doc.id,
  }))

  return callback && callback(data)
}

const subscribeProfessionals = callback => {
  return professionalsRef.onSnapshot(snapshot => {
    onSnapshotsAvailable(snapshot, callback)
  })
}

const subscribeFeaturedProfessionals = callback => {
  return professionalsRef
    .where('isFeatured', '==', true)
    .onSnapshot(snapshot => {
      onSnapshotsAvailable(snapshot, callback)
    })
}

const subscribeVendorProfessionals = (vendorID, callback) => {
  if (!vendorID) {
    return () => {}
  }
  return professionalsRef
    .where('professionalVendorID', '==', vendorID)
    .onSnapshot(snapshot => {
      onSnapshotsAvailable(snapshot, callback)
    })
}

const subscribeCategoryProfessionals = (categoryID, callback) => {
  if (!categoryID) {
    return
  }
  return professionalsRef
    .where('professionalCategoryID', '==', categoryID)
    .onSnapshot(snapshot => {
      onSnapshotsAvailable(snapshot, callback)
    })
}

const getProfessional = async professionalId => {
  if (!professionalId) {
    return null
  }
  try {
    const doc = await usersRef.doc(professionalId).get()

    return doc?.data()
  } catch (error) {
    return null
  }
}

const deleteProfessional = async professionalId => {
  if (!professionalId) {
    return null
  }
  try {
    const res = await usersRef.doc(professionalId).delete()

    return professionalId
  } catch (error) {
    return null
  }
}

export default {
  getProfessional,
  deleteProfessional,
  subscribeProfessionals,
  subscribeFeaturedProfessionals,
  subscribeVendorProfessionals,
  subscribeCategoryProfessionals,
}
