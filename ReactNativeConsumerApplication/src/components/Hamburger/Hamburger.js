import React from 'react'
import { TouchableOpacity, Image } from 'react-native'
import { useTheme } from 'dopenative'
import PropTypes from 'prop-types'
import dynamicStyles from './styles'

export default Hamburger = props => {
  const { onPress } = props
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  return (
    <TouchableOpacity style={styles.headerButtonContainer} onPress={onPress}>
      <Image
        style={styles.headerButtonImage}
        source={theme.icons.menuHamburger}
      />
    </TouchableOpacity>
  )
}

Hamburger.propTypes = {
  onPress: PropTypes.func,
}
