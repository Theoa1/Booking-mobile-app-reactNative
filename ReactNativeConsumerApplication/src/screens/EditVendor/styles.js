import { Dimensions } from 'react-native'
import { StyleSheet } from 'react-native'

const dynamicStyles = (theme, appearance) => {
  return StyleSheet.create({
    navBarContainer: {
      backgroundColor: theme.colors[appearance].primaryBackground,
    },
    body: {
      flex: 1,
      backgroundColor: theme.colors[appearance].primaryBackground,
    },
    divider: {
      height: 10,
      backgroundColor: theme.colors[appearance].grey61,
    },
    container: {
      backgroundColor: theme.colors[appearance].primaryBackground,
      justifyContent: 'center',
      height: 65,
      alignItems: 'center',
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: theme.colors[appearance].grey6,
    },
    rightButton: {
      marginRight: 10,
    },
    sectionTitle: {
      textAlign: 'left',
      alignItems: 'center',
      color: theme.colors[appearance].primaryText,
      fontSize: 19,
      padding: 10,
      paddingTop: 15,
      paddingBottom: 7,
      fontWeight: 'bold',
    },
    input: {
      width: '100%',
      fontSize: 19,
      padding: 10,
      textAlignVertical: 'top',
      justifyContent: 'flex-start',
      paddingRight: 0,
      color: theme.colors[appearance].primaryText,
    },
    priceInput: {
      flex: 1,
      borderRadius: 5,
      borderColor: theme.colors[appearance].grey6,
      borderWidth: 0.5,
      height: 40,
      textAlign: 'right',
      paddingRight: 5,
      color: theme.colors[appearance].primaryText,
    },
    title: {
      flex: 2,
      textAlign: 'left',
      alignItems: 'center',
      color: theme.colors[appearance].primaryText,
      fontSize: 19,
      fontWeight: 'bold',
    },
    value: {
      textAlign: 'right',
      color: theme.colors[appearance].secondaryText,
    },
    section: {
      backgroundColor: theme.colors[appearance].primaryBackground,
      marginBottom: 10,
    },
    row: {
      backgroundColor: theme.colors[appearance].primaryBackground,
      height: 50,
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 10,
      paddingRight: 10,
    },
    addPhotoTitle: {
      color: theme.colors[appearance].primaryText,
      fontSize: 19,
      paddingLeft: 10,
      marginTop: 10,
      fontWeight: 'bold',
    },
    photoList: {
      height: 70,
      marginTop: 20,
      marginRight: 10,
    },
    location: {
      // alignItems: 'center',
      width: '50%',
    },
    photo: {
      marginLeft: 10,
      width: 70,
      height: 70,
      borderRadius: 10,
    },
    addButton: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors[appearance].primaryForeground,
    },
    photoIcon: {
      width: 50,
      height: 50,
    },
    buttonPosition: {
      position: 'relative',
      bottom: -50,
      alignItems: 'center',
      width: Dimensions.get('window').width,
    },
    addButtonContainer: {
      backgroundColor: theme.colors[appearance].primaryForeground,
      borderRadius: 5,
      padding: 15,
      margin: 10,
      marginVertical: 27,
    },
    activityIndicatorContainer: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 30,
    },
    addButtonText: {
      color: theme.colors[appearance].primaryBackground,
      fontWeight: 'bold',
      fontSize: 15,
    },
    optionTextStyle: {
      color: theme.colors[appearance].secondaryText,
      fontSize: 16,
      fontFamily: 'FontAwesome',
    },
    selectedItemTextStyle: {
      fontSize: 18,
      color: theme.colors[appearance].primaryForeground,
      fontFamily: 'FontAwesome',
      fontWeight: 'bold',
    },
    optionContainerStyle: {
      backgroundColor: theme.colors[appearance].primaryBackground,
    },
    cancelContainerStyle: {
      backgroundColor: theme.colors[appearance].primaryBackground,
      borderRadius: 10,
    },
    sectionTextStyle: {
      fontSize: 21,
      color: theme.colors[appearance].primaryText,
      fontFamily: 'FontAwesome',
      fontWeight: 'bold',
    },
    cancelTextStyle: {
      fontSize: 21,
      color: theme.colors[appearance].primaryForeground,
      fontFamily: 'FontAwesome',
    },
  })
}
export default dynamicStyles
