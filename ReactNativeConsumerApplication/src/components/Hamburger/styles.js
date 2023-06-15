import { StyleSheet } from 'react-native'

const styles = (theme, appearance) => {
  return new StyleSheet.create({
    headerButtonContainer: {
      padding: 10,
    },
    headerButtonImage: {
      justifyContent: 'center',
      width: 25,
      height: 25,
      margin: 6,
      tintColor: theme.colors[appearance].primaryForeground,
    },
  })
}

export default styles
