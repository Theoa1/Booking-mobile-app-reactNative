import { StyleSheet } from 'react-native'

const styles = (theme, appearance) => {
  return new StyleSheet.create({
    container: {
      marginTop: 16,
      marginHorizontal: 8,
    },
    contentContainer: {
      justifyContent: 'center',
      width: '100%',
      padding: 10,
      alignSelf: 'center',
      borderRadius: 16,
      overflow: 'hidden',
      backgroundColor: theme.colors[appearance].secondaryForeground,
    },
    title: {
      paddingTop: 5,
      paddingLeft: 12,
      fontWeight: '800',
      color: theme.colors[appearance].primaryForeground,
      fontSize: 20,
    },
    subtitle: {
      paddingTop: 5,
      paddingLeft: 16,
      color: theme.colors[appearance].primaryText,
      fontSize: 14,
      fontWeight: '600',
      paddingBottom: 5,
    },
    scheduleDetailContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      borderTopWidth: 1,
      borderTopColor: theme.colors[appearance].grey3,
      paddingVertical: 10,
    },
    scheduleItemContainer: {
      marginLeft: 10,
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 5,
    },
    scheduleItemIcon: {
      height: 20,
      width: 20,
      marginRight: 8,
      tintColor: theme.colors[appearance].primaryForeground,
    },
    statusContainer: {
      height: 8,
      width: 8,
      borderRadius: 4,
      backgroundColor: theme.colors[appearance].primaryForeground,
      overflow: 'hidden',
      marginRight: 8,
    },
    confirmStatusContainer: {
      backgroundColor: theme.colors[appearance].primaryForeground,
    },
    unconfirmStatusContainer: {
      backgroundColor: theme.colors[appearance].grey66,
    },
    canceledStatusContainer: {
      backgroundColor: 'red',
    },
    rescheduledStatusContainer: {
      backgroundColor: 'blue',
    },
    scheduleItemTitle: {
      color: theme.colors[appearance].primaryText,
      fontWeight: '500',
    },
    seeDetailsButton: {
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors[appearance].primaryForeground,
    },
    seeDetailsTitle: {
      color: theme.colors[appearance].grey3,
      paddingVertical: 8,
      paddingHorizontal: 16,
      fontWeight: '600',
    },
  })
}

export default styles
