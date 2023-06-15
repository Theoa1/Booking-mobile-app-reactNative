import { StyleSheet } from 'react-native'
const dynamicStyles = (theme, appearance) =>
  StyleSheet.create({
    container: {
      paddingVertical: 10,
      width: '100%',
    },
    listContainer: {
      padding: 12,
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    titleContainer: {
      width: '100%',
      marginBottom: 0,
      paddingLeft: 20,
    },
    title: {
      color: theme.colors[appearance].primaryText,
      fontWeight: '600',
    },
    itemContainer: {
      paddingVertical: 5,
      paddingHorizontal: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 7,
      backgroundColor: theme.colors[appearance].secondaryForeground,
      marginLeft: 10,
      marginTop: 10,
    },
    itemTitle: {
      color: theme.colors[appearance].primaryText,
      fontWeight: '600',
    },
    selctedItemContainer: {
      backgroundColor: theme.colors[appearance].primaryForeground,
    },
    selectedItemTitle: {
      color: '#fff',
      fontWeight: '600',
    },
  })

export default dynamicStyles
