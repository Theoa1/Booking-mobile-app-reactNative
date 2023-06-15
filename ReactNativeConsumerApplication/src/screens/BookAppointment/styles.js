import { StyleSheet } from 'react-native'
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from 'react-native-responsive-screen'

const dynamicStyles = (theme, appearance) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors[appearance].primaryBackground,
      paddingBottom: h(10),
    },
    listContainer: {
      flex: 1,
    },
    vendorContainer: {
      paddingVertical: 20,
      width: '100%',
      // backgroundColor: 'pink',
    },
    vendorLocationContainer: {
      width: '100%',
      flexDirection: 'row',
      marginLeft: 16,
    },
    vendorIconContainer: {
      flex: 0.6,
      justifyContent: 'center',
      alignItems: 'center',
    },
    vendorIconWrapper: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 80,
      width: 80,
      borderRadius: 40,
      overflow: 'hidden',
      backgroundColor: '#fff8eb',
    },
    professionalAvatar: {
      height: '100%',
      width: '100%',
      borderRadius: 40,
    },
    professionalName: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    vendorDetailContainer: {
      flex: 2.2,
      justifyContent: 'center',
      marginLeft: 16,
    },
    vendorName: {
      color: theme.colors[appearance].primaryText,
      paddingBottom: 5,
      fontWeight: '400',
    },
    vendorAddress: {
      color: theme.colors[appearance].secondaryText,
    },
    titleContainer: {
      width: '100%',
      marginBottom: 10,
      paddingLeft: 20,
    },
    title: {
      color: theme.colors[appearance].primaryText,
      fontWeight: '600',
    },
    calendarContainer: {
      paddingVertical: 20,
      width: '100%',
      // backgroundColor: 'yellow',
    },
    calendarDetailContainer: {
      paddingVertical: 5,
    },
    calendar: {
      height: h(10),
      // paddingTop: 20,
      // paddingBottom: 10,
    },
    calendarTitle: {
      color: theme.colors[appearance].secondaryText,
    },
    highlightDateContainer: {
      backgroundColor: theme.colors[appearance].primaryForeground,
      borderRadius: 8,
    },
    highlightDate: {
      color: '#fff',
    },
    timeContainer: {
      paddingVertical: 10,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 20,
      height: 60,
    },
    selectedTimeContainer: {
      width: 100,
      paddingVertical: 5,
      paddingHorizontal: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 7,
      marginLeft: 20,
      // marginTop: 10,
      backgroundColor: theme.colors[appearance].primaryForeground,
    },
    selectedTimeTitle: {
      color: '#fff',
      fontWeight: '600',
    },
    //
    inputContainer: {
      width: '100%',
      marginBottom: 10,
    },
    inputFieldContainer: {
      paddingVertical: 5,
      paddingLeft: 20,
    },
    inputField: {
      width: '88%',
      height: h(10),
      borderColor: theme.colors[appearance].grey3,
      borderWidth: 2,
      borderRadius: 8,
      padding: 8,
      color: theme.colors[appearance].primaryText,
      // paddingVertical: 8,
    },
    professionalContainer: {
      paddingTop: 5,
    },
    professionalNoteContainer: {
      paddingTop: 5,
      paddingBottom: 9,
      paddingLeft: 20,
    },
    professionalNote: {
      padding: 8,
      color: theme.colors[appearance].secondaryText,
      backgroundColor: theme.colors[appearance].grey3,
      width: '95%',
      marginBottom: 3,
    },
    footerContainer: {
      position: 'absolute',
      width: '100%',
      bottom: 0,
      backgroundColor: theme.colors[appearance].primaryBackground,
    },
    buttonContainer: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      height: h(6),
      width: '95%',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors[appearance].primaryForeground,
    },
    buttonTitle: {
      color: '#fff',
      fontWeight: '600',
      fontSize: h(1.8),
    },
    confirmButton: {
      backgroundColor: theme.colors[appearance].primaryBackground,
      borderColor: theme.colors[appearance].primaryForeground,
      borderWidth: 1,
      marginTop: 10,
    },
    confirmButtonTitle: {
      color: theme.colors[appearance].primaryForeground,
    },
  })

export default dynamicStyles
