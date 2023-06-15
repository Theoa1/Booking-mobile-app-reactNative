import { StyleSheet } from 'react-native'
import { heightPercentageToDP as h } from 'react-native-responsive-screen'

const styles = (theme, appearance) => {
  return new StyleSheet.create({
    container: {
      backgroundColor: theme.colors[appearance].grey3,
      flex: 1,
    },
    listContentContainer: {
      marginHorizontal: 20,
      paddingTop: 10,
    },
    icon: {
      width: 25,
      height: 25,
      tintColor: theme.colors[appearance].primaryForeground,
      marginHorizontal: 5,
    },
    iconContainer: { flexDirection: 'row' },
    emptyState: {
      fontSize: 16,
      textAlignVertical: 'center',
      alignSelf: 'center',
      marginTop: h(40),
      textAlign: 'center',
      width: 300,
      color: theme.colors[appearance].primaryText,
    },
    modalContainer: {
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingTop: h(2),
    },
    emptyViewContainer: {
      marginTop: '25%',
      flex: 1,
    },
    title: {
      fontSize: 16,
      color: theme.colors[appearance].primaryText,
      fontWeight: '500',
    },
    reserveButton: {
      color: theme.colors[appearance].primaryForeground,
      fontSize: 16,
      marginHorizontal: 4,
    },
    subtitleView: {
      paddingTop: 5,
    },
    description: {
      color: theme.colors[appearance].secondaryText,
      fontSize: 12,
    },
    price: {
      fontSize: 16,
      color: theme.colors[appearance].primaryText,
      marginTop: 10,
    },
    rightIcon: {
      width: 100,
      height: 100,
    },
    listContainer: {
      backgroundColor: theme.colors[appearance].primaryBackground,
      borderBottomWidth: 0,
    },
  })
}

export default styles
