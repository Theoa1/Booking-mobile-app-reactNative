import { StyleSheet } from 'react-native'

const styles = (theme, appearance) => {
  return new StyleSheet.create({
    container: {
      marginBottom: 12,
      marginTop: 16,
      flex: 1,
      alignItems: 'center',
      // maxWidth: 200,
      height: 170,
      // borderRadius: 20,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors[appearance].grey0,
      backgroundColor: theme.colors[appearance].primaryBackground,
      shadowBottomColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.37,
      shadowRadius: 32,
      elevation: 5,
      
    },
    title: {
      marginLeft: 5,
      fontWeight: 'bold',
      color: theme.colors[appearance].primaryText,
      fontSize: 20,
      marginBottom: 8,
    },
    categoryItemContainer: {
      margin: 8,
      alignItems: 'center',
      maxWidth: 120,
      width: 120,
      height: 115,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: theme.colors[appearance].grey0,
      backgroundColor: theme.colors[appearance].primaryBackgroundCardHome,
      shadowColor: theme.colors[appearance].primaryBackgroundCardHome,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.37,
      shadowRadius: 32,
      elevation: 5,
      overflow: 'hidden',
      marginLeft: 4,
      marginRight: 4,
      
    },
    categoryItemPhoto: {
      height: 70, 
      width: 70,
      borderRadius: 20,
      
    },
    categoryItemTitle: {
      marginTop: 5,
      color: theme.colors[appearance].primaryText,
      textAlign: 'center',
    },
  })
}

export default styles
