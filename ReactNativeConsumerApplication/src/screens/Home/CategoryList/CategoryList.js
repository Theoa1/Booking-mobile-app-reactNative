import React, { useEffect, useState, useRef } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image'
import { useTheme } from 'dopenative'
import { useNavigation } from '@react-navigation/native'
import dynamicStyles from './styles'
import { useCategoryVendors } from '../../../Core/vendor/api'
import { useConfig } from '../../../config'

const CategoryList = ({ categories = [], title = '', categoryID }) => {
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const navigation = useNavigation()
  const config = useConfig()

  const { categoryVendors: categoryList = categories ?? [] } =
    useCategoryVendors(config.tables?.vendorsTableName, categoryID)

  const onPressCategoryItem = item => {
    if (item?.author) {
      navigation.navigate('Professionals', { vendor: item })
      return
    }
    navigation.navigate('Vendor', { category: item })
  }

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity onPress={() => onPressCategoryItem(item)}>
      <View style={styles.categoryItemContainer}>
        <FastImage
          placeholderColor={theme.colors[appearance].grey69}
          style={styles.categoryItemPhoto}
          source={{ uri: item.photo }}
        />
        <Text style={styles.categoryItemTitle}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  )

  if (!categoryList?.length) {
    return null
  }

  return (
    <View style={styles.container}>
      {title?.length > 0 && <Text style={styles.title}> {title} </Text>}
      <FlatList
        horizontal
        initialNumToRender={4}
        data={categoryList}
        showsHorizontalScrollIndicator={false}
        renderItem={renderCategoryItem}
        keyExtractor={item => `${item.id}`}
      />
    </View>
  )
}

export default CategoryList
