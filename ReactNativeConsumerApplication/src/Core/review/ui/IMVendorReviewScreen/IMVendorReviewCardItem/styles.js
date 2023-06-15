import { StyleSheet } from 'react-native'

const dynamicStylesCard = (theme, appearance) => {
  const colorSet = theme.colors[appearance]

  return StyleSheet.create({
    starContainer: { flexDirection: 'row', alignSelf: 'center' },
    date: {
      color: colorSet.grey,
      fontSize: 12,
    },
    starStyle: { marginHorizontal: 0.5 },
    // reviewContainer: { marginVertical: 1 },
    profilePic: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 5,
    },
    horizontalPane: {
      flexDirection: 'row',
    },
    pad: {
      padding: 10,
      justifyContent: 'space-between',
    },
    reviewText: {
      fontSize: 15,
      paddingHorizontal: 1,
      color: colorSet.primaryText,
    },
    authorName: {
      color: colorSet.primaryText,
      fontSize: 12,
      fontWeight: 'bold',
    },
    date: {
      color: colorSet.secondaryText,
      fontSize: 13,
    },
    starBox: {
      backgroundColor: colorSet.primaryBackground,
    },
    actionButtonContainer: {
      padding: 16,
      width: '90%',
      alignSelf: 'center',
      borderRadius: 5,
      backgroundColor: colorSet.primaryForeground,
      marginBottom: 30,
    },
    actionButtonText: {
      fontWeight: 'bold',
      color: colorSet.primaryBackground,
    },
    reviewContainer: {
      shadowColor: theme.colors[appearance].primaryBackgroundCardHome,
      shadowRadius: 2,
      borderRadius: 8,
      margin: 5, // margin around each card
      borderBottomWidth: 1,
      borderBottomColor: theme.colors[appearance].grey0,
      backgroundColor: theme.colors[appearance].primaryBackgroundCardHome,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.37,
      elevation: 5,
      
    },
  })
}

export default dynamicStylesCard
