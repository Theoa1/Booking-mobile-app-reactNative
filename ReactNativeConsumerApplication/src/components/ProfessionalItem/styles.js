import { StyleSheet } from 'react-native'
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from 'react-native-responsive-screen'

const containerSize = h(23)
const avatarWrapperSize = Math.floor(containerSize / 3.4)

const dynamicStyles = (theme, appearance) =>
  StyleSheet.create({
    container: {
      width: '50%',
      height: containerSize,
      // minHeight: containerSize,
      justifyContent: 'center',
      alignItems: 'center',
    },
    deleteIconContainer: {
      padding: 10,
      position: 'absolute',
      right: 0,
      top: 0,
    },
    deleteIcon: {
      height: 18,
      width: 18,
    },
    addIcon: {
      height: 13,
      width: 13,
    },
    bodyContainer: {
      justifyContent: 'center',
      width: '90%',
      height: '90%',
      borderRadius: 20,
      overflow: 'hidden',
      backgroundColor: theme.colors[appearance].primaryBackground,
    },
    avatarContainer: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatarWrapper: {
      width: avatarWrapperSize,
      height: avatarWrapperSize,
      borderRadius: Math.floor(avatarWrapperSize / 2),
      overflow: 'hidden',
    },
    avatar: {
      height: '100%',
      width: '100%',
    },
    detailContainer: {
      flex: 1.5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    name: {
      fontSize: h(1.7),
      paddingBottom: 8,
      color: theme.colors[appearance].primaryText,
      fontWeight: '600',
    },
    time: {
      fontSize: h(1.5),
      color: theme.colors[appearance].secondaryText,
    },
    ratingContainer: {
      flex: 1.2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    ratingWrapper: {
      paddingHorizontal: 7,
      paddingVertical: 5,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      backgroundColor: '#fff8eb',
    },
    rating: {
      fontSize: h(1.5),
      color: theme.colors[appearance].primaryText,
    },
  })

export default dynamicStyles
