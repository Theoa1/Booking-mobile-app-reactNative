import React from 'react'
import { Image } from 'react-native'

export default class HeaderSearch extends React.Component {
  render() {
    return (
      <Image
        source={require('../../assets/icons/menu.png')}
        onPress={() => alert('This is a button!')}
      />
    )
  }
}
