import { StyleSheet } from 'react-native'
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from 'react-native-responsive-screen'

// const containerSize = h(13);
const avatarWrapperSize = h(7)

const dynamicStyles = (theme, appearance) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      width: '90%',
      marginBottom: 10,
      padding: 10,
      alignSelf: 'center',
      borderRadius: 20,
      overflow: 'hidden',
      backgroundColor: theme.colors[appearance].primaryBackground,
    },
    topContainer: {
      flex: 1,
      flexDirection: 'row',
      paddingVertical: 15,
    },

    avatarContainer: {
      flex: 1.5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatarWrapper: {
      width: avatarWrapperSize,
      height: avatarWrapperSize,
      borderRadius: Math.floor(avatarWrapperSize / 4),
      overflow: 'hidden',
    },
    avatar: {
      height: '100%',
      width: '100%',
    },
    detailContainer: {
      flex: 3,
      justifyContent: 'center',
    },
    name: {
      fontSize: h(2),
      paddingBottom: 8,
      color: theme.colors[appearance].primaryText,
    },
    time: {
      fontSize: h(1.7),
      color: theme.colors[appearance].secondaryText,
    },

    menuContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    menu: {
      height: 16,
      width: 16,
    },
    bottomContainer: {
      width: '100%',
      paddingVertical: 5,
    },
    scheduleDetailContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      borderTopWidth: 1,
      borderTopColor: theme.colors[appearance].grey3,
      paddingVertical: 10,
    },
    scheduleItemContainer: {
      marginLeft: 10,
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 5,
    },
    scheduleItemIcon: {
      height: 20,
      width: 20,
      marginRight: 8,
      tintColor: theme.colors[appearance].primaryForeground,
    },
    statusContainer: {
      height: 8,
      width: 8,
      borderRadius: 4,
      backgroundColor: theme.colors[appearance].grey6,
      overflow: 'hidden',
      marginRight: 8,
    },
    confirmStatusContainer: {
      backgroundColor: theme.colors[appearance].primaryForeground,
    },
    unconfirmStatusContainer: {
      backgroundColor: theme.colors[appearance].grey6,
    },
    canceledStatusContainer: {
      backgroundColor: 'red',
    },
    rescheduledStatusContainer: {
      backgroundColor: 'pink',
    },
    scheduleItemTitle: {
      color: theme.colors[appearance].primaryText,
      fontWeight: '500',
    },
    buttonsContainer: {
      flexDirection: 'row',
      flex: 2,
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 12,
    },
    buttonContainer: {
      height: 45,
      width: '45%',
      backgroundColor: theme.colors[appearance].primaryForeground,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },
    cancelButtonContainer: {
      marginRight: 13,
      backgroundColor: theme.colors[appearance].grey3,
    },
    buttonTitle: {
      color: '#fff',
      fontWeight: '500',
    },
    cancelButtonTitle: {
      color: theme.colors[appearance].primaryText,
      fontWeight: '500',
    },
  })

export default dynamicStyles
