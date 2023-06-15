import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useTheme } from 'dopenative'
import dynamicStyles from './styles'

export default function Picker({
  title = '',
  list = [],
  onChangeValue = () => {},
  defaultValue,
}) {
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const [selectedIndex, setSelctedIndex] = useState(-1)

  useEffect(() => {
    if (!defaultValue) {
      return
    }

    const defaultIndex = list.findIndex(listItem => listItem === defaultValue)

    if (defaultIndex > -1) {
      setSelctedIndex(defaultIndex)
    }
  }, [list])

  useEffect(() => {
    if (selectedIndex > -1) {
      onChangeValue(list[selectedIndex])
    }
  }, [selectedIndex, list])

  const onItemPress = (item, index) => {
    setSelctedIndex(index)
  }

  const renderTimeItem = (item, index) => {
    const isSelected = index === selectedIndex
    return (
      <TouchableOpacity
        key={`${index}`}
        onPress={() => onItemPress(item, index)}
        style={[
          styles.itemContainer,
          isSelected && styles.selctedItemContainer,
        ]}>
        <Text
          style={[styles.itemTitle, isSelected && styles.selectedItemTitle]}>
          {item}
        </Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.listContainer}>{list.map(renderTimeItem)}</View>
    </View>
  )
}
