import { StyleSheet, Dimensions } from 'react-native'

// screen sizing
const { width, height } = Dimensions.get('window')
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height

const numColumns = 2
// item size
const PRODUCT_ITEM_HEIGHT = 150
const PRODUCT_ITEM_OFFSET = 5
const PRODUCT_ITEM_MARGIN = PRODUCT_ITEM_OFFSET * 2

const styles = (theme, appearance) => {
  return new StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      marginLeft: 8,
      justifyContent: 'center',
      margin: PRODUCT_ITEM_OFFSET,
      width:
        (SCREEN_WIDTH - PRODUCT_ITEM_MARGIN) / numColumns - PRODUCT_ITEM_MARGIN,
      height: PRODUCT_ITEM_HEIGHT,
    },
    listStyle: {
      flex: 1,
      backgroundColor: theme.colors[appearance].primaryBackground,
    },
    title: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      opacity: 0.8,
    },
    photo: {
      width:
        (SCREEN_WIDTH - PRODUCT_ITEM_MARGIN) / numColumns - PRODUCT_ITEM_MARGIN,
      height: PRODUCT_ITEM_HEIGHT,
      ...StyleSheet.absoluteFillObject,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    mapImage: { width: 25, height: 25 },
    headerRight: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  })
}
export default styles
