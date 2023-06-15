import { StyleSheet } from 'react-native'

const dynamicStyles = (theme, appearance) => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.colors[appearance].primaryBackground,
      flex: 1,
      paddingLeft: 15,
      paddingRight: 15,
      paddingTop: 10,
    },
  })
}
export default dynamicStyles
