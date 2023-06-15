import { StyleSheet } from 'react-native'
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from 'react-native-responsive-screen'

const avatarWrapperSize = Math.floor(h(9))

const dynamicStyles = (theme, appearance) =>
  StyleSheet.create({
    container: {
      width: '100%',
      paddingVertical: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors[appearance].grey3,
      paddingTop: 20,
    },
    borderedContainer: {
      borderTopEndRadius: 20,
      borderTopStartRadius: 20,
    },
    avatarBackground: {
      ...StyleSheet.absoluteFill,
    },
    avatarBackgroundOverlay: {
      ...StyleSheet.absoluteFill,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    avatarContainer: {
      paddingVertical: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatarWrapper: {
      width: avatarWrapperSize,
      height: avatarWrapperSize,
      borderRadius: Math.floor(avatarWrapperSize / 2),
      overflow: 'hidden',
      backgroundColor: theme.colors[appearance].grey6,
    },
    avatar: {
      height: '100%',
      width: '100%',
    },
    detailContainer: {
      paddingVertical: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    name: {
      fontSize: 24,
      paddingBottom: 8,
      color: theme.colors[appearance].primaryText,
      fontWeight: 'bold',
    },
    specialty: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors[appearance].secondaryText,
    },
    contactContainer: {
      paddingVertical: 10,
      flexDirection: 'row',
      width: '50%',
      justifyContent: 'space-around',
    },
    contactWrapper: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 55,
      width: 55,
      borderRadius: 45,
      backgroundColor: theme.colors[appearance].primaryBackground,
    },
    contactIcon: {
      height: '40%',
      width: '40%',
      tintColor: theme.colors[appearance].primaryForeground,
    },
  })

export default dynamicStyles
