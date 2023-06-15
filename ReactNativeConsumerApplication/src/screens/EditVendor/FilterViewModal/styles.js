import { StyleSheet } from 'react-native'

const dynamicStyles = (theme, appearance) => {
  return StyleSheet.create({
    body: {
      flex: 1,
      backgroundColor: theme.colors[appearance].primaryBackground,
      paddingLeft: 10,
      paddingRight: 10,
    },
    container: {
      justifyContent: 'center',
      height: 65,
      alignItems: 'center',
      flexDirection: 'row',
      borderBottomWidth: 0.5,
      borderBottomColor: '#e6e6e6',
    },
    title: {
      flex: 2,
      textAlign: 'left',
      alignItems: 'center',
      color: theme.colors[appearance].primaryText,
      fontSize: 17,
    },
    value: {
      textAlign: 'right',
      color: theme.colors[appearance].secondaryText,
    },
    optionTextStyle: {
      color: theme.colors[appearance].secondaryText,
      fontSize: 16,
      fontFamily: 'FontAwesome',
    },
    selectedItemTextStyle: {
      fontSize: 18,
      color: theme.colors[appearance].primaryForeground,
      fontFamily: 'FontAwesome',
      fontWeight: 'bold',
    },
    optionContainerStyle: {
      backgroundColor: theme.colors[appearance].primaryBackground,
    },
    cancelContainerStyle: {
      backgroundColor: theme.colors[appearance].primaryBackground,
      borderRadius: 10,
    },
    sectionTextStyle: {
      fontSize: 21,
      color: theme.colors[appearance].primaryText,
      fontFamily: 'FontAwesome',
      fontWeight: 'bold',
    },
    cancelTextStyle: {
      fontSize: 21,
      color: theme.colors[appearance].primaryForeground,
      fontFamily: 'FontAwesome',
    },

    modalRightButton: {
      top: 0,
      right: 0,
      backgroundColor: 'transparent',
      alignSelf: 'flex-end',
      color: theme.colors[appearance].primaryForeground,
      fontSize: 18,
    },
    modalSelectorRightButton: {
      marginRight: 10,
    },
    modalNavBarContainer: {
      backgroundColor: theme.colors[appearance].primaryBackground,
    },
    modalBar: {
      height: 50,
      marginTop: Platform.OS === 'ios' ? 30 : 0,
      justifyContent: 'center',
    },
  })
}

export default dynamicStyles
