import { StyleSheet } from 'react-native'

const styles = (theme, appearance) => {
  return new StyleSheet.create({
    flat: {
      flex: 1,
      backgroundColor: theme.colors[appearance].grey3,
      paddingTop: 10,
    },
    container: {
      marginBottom: 30,
      padding: 10,
    },
    modalContainer: {
      justifyContent: 'flex-end',
      margin: 0,
    },
    photo: {
      width: '100%',
      height: 100,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    headerTitle: {
      position: 'absolute',
      top: 30,
      left: 0,
      right: 0,
      textAlign: 'center',
      fontWeight: 'bold',
      color: 'white',
      opacity: 0.8,
    },
    rowContainer: {
      flexDirection: 'row',
    },
    count: {
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      paddingLeft: 7,
      paddingRight: 7,
      paddingTop: 2,
      paddingBottom: 2,
      textAlign: 'center',
      color: theme.colors[appearance].primaryForeground,
      backgroundColor: theme.colors[appearance].primaryBackground,
      borderColor: theme.colors[appearance].primaryForeground,
      borderWidth: 1,
      borderRadius: 3,
    },
    price: {
      padding: 10,
      color: theme.colors[appearance].primaryText,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    title: {
      flex: 1,
      padding: 10,
      color: theme.colors[appearance].primaryText,
      fontWeight: 'bold',
      textAlign: 'left',
    },
    actionContainer: {
      flexDirection: 'row',
      marginTop: 30,
    },
    total: {
      flex: 4,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      padding: 5,
      textAlign: 'center',
      color: theme.colors[appearance].primaryText,
      borderColor: theme.colors[appearance].grey3,
    },
    actionButtonContainer: {
      flex: 1,
      borderRadius: 5,
      padding: 3,
      marginRight: 50,
      width: 70,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors[appearance].primaryForeground,
    },
    actionButtonText: {
      color: theme.colors[appearance].primaryBackground,
      fontSize: 12,
      fontWeight: 'bold',
    },
    emptyViewContainer: {
      paddingTop: '25%',
      flex: 1,
      backgroundColor: theme.colors[appearance].grey3,
    },
  })
}

export default styles
