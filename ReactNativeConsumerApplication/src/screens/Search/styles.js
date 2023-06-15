import { StyleSheet } from 'react-native'
import { heightPercentageToDP as h } from 'react-native-responsive-screen'

const styles = (theme, appearance) => {
  return new StyleSheet.create({
    container: {
      backgroundColor: theme.colors[appearance].grey3,
      flex: 1,
    },
    searchContainer: {
      width: 300,
    },
    modalContainer: {
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingTop: h(2),
    },
    mapImage: { width: 25, height: 25 },
    headerRight: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    vendorContainer: {
      backgroundColor: theme.colors[appearance].grey3,
    },
    title: {
      marginTop: 20,
      marginLeft: 5,
      fontWeight: 'bold',
      color: theme.colors[appearance].primaryText,
      fontSize: 20,
      marginBottom: 15,
    },
  })
}

export default styles
