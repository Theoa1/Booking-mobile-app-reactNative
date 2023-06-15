import { StyleSheet } from 'react-native'
import { heightPercentageToDP as h } from 'react-native-responsive-screen'

const styles = (theme, appearance) => {
  return new StyleSheet.create({
    container: {
      backgroundColor: theme.colors[appearance].grey3,
      flex: 1,
    },
    listContentContainer: {
      marginHorizontal: 5,
      paddingTop: 10,
    },
    icon: {
      width: 25,
      height: 25,
      tintColor: theme.colors[appearance].primaryForeground,
      marginHorizontal: 5,
    },
    iconContainer: { flexDirection: 'row', marginRight: 15 },
    emptyState: {
      fontSize: 16,
      textAlignVertical: 'center',
      alignSelf: 'center',
      marginTop: h(40),
      textAlign: 'center',
      width: 300,
      color: theme.colors[appearance].primaryText,
    },
    bestSpecialistsModule: {
      marginBottom: 16,
    },
    bestSpecialistsCarouselContainer: {
      paddingLeft: 8,
    },
    featuredProsTitle: {
      color: theme.colors[appearance].primaryText,
      fontWeight: 'bold',
      fontSize: 20,
      marginLeft: 8,
      marginTop: 16,
      marginBottom: 16,
    },
    emptyViewContainer: {
      marginTop: '25%',
      flex: 1,
    },
    title: {
      fontSize: 18,
      color: theme.colors[appearance].primaryText,
      fontWeight: '600',
      paddingVertical: 7,
    },
  })
}

export default styles
