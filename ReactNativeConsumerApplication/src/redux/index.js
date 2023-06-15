import { combineReducers } from 'redux'
import { auth } from '../Core/onboarding/redux/auth'
import { chat } from '../Core/chat/redux'
import { vendor } from '../Core/vendor/redux'

const AppReducer = combineReducers({
  auth,
  chat,
  vendor,
})

export default AppReducer
