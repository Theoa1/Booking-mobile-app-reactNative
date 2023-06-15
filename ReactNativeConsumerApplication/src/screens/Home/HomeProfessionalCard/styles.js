import { StyleSheet } from 'react-native'

const dynamicStyles = (theme, appearance) =>
  StyleSheet.create({
    container: {
      width: 140,
      height: 170,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: theme.colors[appearance].grey0,
      backgroundColor: theme.colors[appearance].primaryBackground,
      overflow: 'hidden',
      marginLeft: 4,
      marginRight: 4,
    },
    bodyContainer: {
      flex: 1,
    },
    avatarContainer: {
      flex: 1,
    },
    avatar: {
      flex: 1,
    },
    detailContainer: {
      flex: 0.4,
      marginLeft: 8,
      marginTop: 8,
    },
    name: {
      fontSize: 16,
      color: theme.colors[appearance].primaryText,
      fontWeight: '600',
      marginBottom: 2,
    },
    specialty: {
      fontSize: 12,
      color: theme.colors[appearance].secondaryText,
    },
  })

export default dynamicStyles
