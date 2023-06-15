import firestore from '@react-native-firebase/firestore'

const orderRef = firestore().collection('restaurant_orders')

export const persistOrder = async order => {
  return orderRef.add(order)
}
