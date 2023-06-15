import { StyleSheet } from 'react-native'

const styles = (theme, appearance) => {
  return new StyleSheet.create({
    container: {
      backgroundColor: theme.colors[appearance].primaryBackground,
      flex: 1,
    },
    mapNavIconContainer: {
      paddingHorizontal: 15,
    },
    mapNavIcon: {
      width: 25,
      height: 25,
    },
    searchBarContainer: {
      marginTop: 8,
    },
    bestSpecialistsModule: {
      marginBottom: 16,
    },
    bestSpecialistsCarouselContainer: {},
    featuredProsTitle: {
      color: theme.colors[appearance].primaryText,
      fontWeight: 'bold',
      fontSize: 20,
      marginLeft: 8,
      marginTop: 16,
      marginBottom: 16,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    paginationContainer: {
      flex: 1,
      position: 'absolute',
      alignSelf: 'center',
      // backgroundColor: 'green',
      paddingVertical: 8,
      marginTop: 200,
    },
    paginationDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginHorizontal: 0,
    },

    foods: {},
    vendorItemContainer: {
      flex: 1,
      marginHorizontal: 8,
      marginBottom: 8,
      elevation: 2,
      padding: 10,
      shadowColor: theme.colors[appearance].grey6,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.4,
      shadowRadius: 1,
      borderColor: '#8cbbf1',
      borderRadius: 5,
      backgroundColor: theme.colors[appearance].primaryBackground,
    },
    mapImage: { width: 25, height: 25 },
    headerRight: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    foodPhoto: {
      width: '100%',
      height: 200,
    },
    foodInfo: {
      marginTop: 10,
      flexDirection: 'row',
    },
    title: {
      marginTop: 20,
      fontWeight: 'bold',
      color: theme.colors[appearance].primaryText,
      fontSize: 20,
      marginBottom: 15,
      textAlign: 'center',
    },
    photo: {
      height: 300,
    },
    detail: {
      height: 60,
      width: 100,
      marginRight: 10,
    },

    description: {
      color: theme.colors[appearance].secondaryText,
      fontSize: 13,
    },
    modalContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonSetContainer: {
      marginTop: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonSet: {
      flexDirection: 'row',
      borderWidth: 1,
      borderRadius: 25,
      borderColor: theme.colors[appearance].grey63,
    },
    count: {
      padding: 10,
      marginTop: 2,
      color: theme.colors[appearance].primaryText,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    buttonContainer: {
      padding: 10,
      width: 50,
    },
    buttonText: {
      color: theme.colors[appearance].primaryText,
    },
    mostPopular: {
      backgroundColor: theme.colors[appearance].grey3,
    },
    price: {
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 5,
      borderWidth: 1,
      fontWeight: 'bold',
      padding: 10,
      textAlign: 'center',
      color: theme.colors[appearance].primaryText,
      borderColor: theme.colors[appearance].grey63,
    },
    actionContainer: {
      flexDirection: 'row',
      marginTop: 10,
      marginBottom: 50,
    },
    actionButtonContainer: {
      flex: 1,
      borderRadius: 5,
      padding: 10,
      marginLeft: 10,
      backgroundColor: theme.colors[appearance].primaryForeground,
    },
    actionButtonText: {
      color: theme.colors[appearance].primaryBackground,
    },
  })
}

export default styles
