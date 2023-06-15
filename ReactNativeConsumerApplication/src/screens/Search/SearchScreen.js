import React, { useLayoutEffect, useRef, useState, useEffect } from 'react'
import { Alert, FlatList, Keyboard, View, Text } from 'react-native'
import { useTheme, useTranslations } from 'dopenative'
import Hamburger from '../../components/Hamburger/Hamburger'
import { professionalsAPIManager } from '../../api/'
import dynamicStyles from './styles'
import SearchBar from '../../Core/ui/SearchBar/SearchBar'
import { useSelector } from 'react-redux'
import ProfessionalItem from '../../components/ProfessionalItem/ProfessionalItem'
import IMVendorsScreen from '../../Core/vendor/ui/IMVendors/IMVendorsScreen'
import { useConfig } from '../../config'

export default function SearchScreen(props) {
  const { navigation } = props

  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)
  const config = useConfig()

  const vendors = useSelector(state => state.vendor.vendors)

  const [data, setData] = useState([])
  const [vendorResult, setVendorResult] = useState([])

  const searchRef = useRef(null)
  const currentSearchText = useRef('')
  const unsubscribeSearch = useRef(null)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Hamburger
          onPress={() => {
            navigation.openDrawer()
          }}
        />
      ),
      headerTitleAlign: 'left',
      headerTitle: () => (
        <SearchBar
          searchRef={searchRef}
          onSearch={text => onSearch(text)}
          onChangeText={() => {}}
          placeholder={localized('Search...')}
          searchContainerStyle={styles.searchContainer}
          onSearchBarCancel={() => {
            searchRef.current?.clearText()
            onSearch('')
            Keyboard.dismiss()
          }}
        />
      ),
      headerRight: null,
    })
  }, [navigation])

  useEffect(() => {
    return unsubscribePrevSearch
  }, [])

  const unsubscribePrevSearch = () => {
    unsubscribeSearch.current && unsubscribeSearch.current()
  }

  const searchProfessionals = () => {
    unsubscribePrevSearch()

    unsubscribeSearch.current =
      professionalsAPIManager.subscribeProfessionals(onCollectionUpdate)
  }

  const getIsWordIncludeSearchText = word => {
    const text = currentSearchText.current?.trim()
    const index = word?.toLowerCase().search(text?.toLowerCase())
    if (text && index !== -1) {
      return true
    }
    return false
  }

  const onCollectionUpdate = result => {
    const filteredData = []
    const filteredVendorData = []

    result.forEach(item => {
      const fullname = `${item?.firstName ?? ''} ${item?.lastName ?? ''}`
      const isWordIncludeSearchText = getIsWordIncludeSearchText(fullname)
      if (isWordIncludeSearchText) {
        filteredData.push(item)
      }
    })

    vendors.forEach(item => {
      const isWordIncludeSearchText = getIsWordIncludeSearchText(
        item?.title ?? '',
      )
      if (isWordIncludeSearchText) {
        filteredVendorData.push(item)
      }
    })

    setData(filteredData)
    setVendorResult(filteredVendorData)
  }

  const onSearch = text => {
    currentSearchText.current = text
    searchProfessionals()
  }

  const onDeleteProfessional = item => {
    professionalsAPIManager.deleteProfessional(item.id)
  }

  const onDelete = item => {
    Alert.alert(
      localized('Remove Professional'),
      localized('Are you sure you want to remove this professional'),
      [
        {
          text: localized('Yes'),
          style: 'destructive',
          onPress: () => onDeleteProfessional(item),
        },
        {
          text: localized('No'),
        },
      ],
    )
  }

  const onAddProfessional = item => {
    professionalsAPIManager?.addProfessional?.(item.id)
  }

  const onAdd = item => {
    Alert.alert(
      localized('Add Professional'),
      localized('Are you sure you want to add this professional'),
      [
        {
          text: localized('Yes'),
          onPress: () => onAddProfessional(item),
        },
        {
          text: localized('No'),
        },
      ],
    )
  }

  const onProfessionalItemPress = async item => {
    navigation.navigate('ProfessionalItemDetail', {
      professional: item,
      vendorId: item.professionalVendorID,
    })
  }

  const renderListHeader = () => {
    if (data?.length) {
      return <Text style={styles.title}> {localized('Professionals')} </Text>
    }
    return null
  }

  const renderVendors = () => {
    if (vendorResult?.length) {
      return (
        <View style={styles.vendorContainer}>
          <Text style={styles.title}> {localized('Vendors')} </Text>
          <IMVendorsScreen navigation={navigation} vendors={vendorResult} />
        </View>
      )
    }

    return null
  }

  const renderItem = ({ item }) => {
    return (
      <ProfessionalItem
        item={item}
        onPress={onProfessionalItemPress}
        onDelete={onDelete}
        onAdd={onAdd}
      />
    )
  }

  return (
    <FlatList
      onScroll={() => {
        searchRef.current.blur()
      }}
      ListHeaderComponent={renderListHeader}
      style={styles.container}
      data={data}
      renderItem={renderItem}
      keyExtractor={item => `${item.id}`}
      numColumns={2}
      ListFooterComponent={renderVendors}
    />
  )
}
