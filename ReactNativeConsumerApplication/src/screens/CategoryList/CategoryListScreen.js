import React, { useState, useLayoutEffect, useEffect } from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { useTheme, useTranslations } from 'dopenative'
import dynamicStyles from './styles'
import Hamburger from '../../components/Hamburger/Hamburger'
import { categoriesAPIManager } from '../../api'
import { useConfig } from '../../config'

const CategoryListScreen = props => {
  /* const navToMap() {
      if (vendors.length > 0 || vendors !== undefined) {
        this.props.navigation.navigate('Map', {vendors});
      }
    } */

  const { navigation } = props

  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const config = useConfig()

  const [data, setData] = useState([])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: localized('Categories'),
      headerLeft: () => (
        <Hamburger
          onPress={() => {
            navigation.openDrawer()
          }}
        />
      ),
    })
  }, [])

  useEffect(() => {
    const unsubscribeCategories = categoriesAPIManager.subscribeCategories(
      config.tables?.vendorCategoriesTableName,
      onCategoriesUpdate,
    )

    return unsubscribeCategories
  }, [])

  const onCategoriesUpdate = newCategories => {
    setData(newCategories)
  }

  const onPress = item => {
    if (config.isMultiVendorEnabled) {
      props.navigation.navigate('Vendor', {
        category: item,
      })
    } else {
      props.navigation.navigate('Professionals', {
        category: item,
      })
    }
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => onPress(item)}>
      <View style={styles.container}>
        <FastImage
          placeholderColor={theme.colors[appearance].grey9}
          style={styles.photo}
          source={{ uri: item.photo }}
        />
        <View style={styles.overlay} />
        <Text numberOfLines={3} style={styles.title}>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  )

  return (
    <FlatList
      vertical
      showsVerticalScrollIndicator={false}
      style={styles.listStyle}
      numColumns={2}
      data={data}
      renderItem={renderItem}
      keyExtractor={item => `${item.id}`}
    />
  )
}

export default CategoryListScreen
