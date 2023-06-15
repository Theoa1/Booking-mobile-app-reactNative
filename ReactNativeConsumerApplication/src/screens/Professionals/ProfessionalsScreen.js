import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Alert, FlatList, Image, TouchableOpacity, View } from 'react-native'
import { useTheme, useTranslations } from 'dopenative'
import PropTypes from 'prop-types'
import { categoriesAPIManager, professionalsAPIManager } from '../../api'
import { useVendorsMutations } from '../../Core/vendor/api'
import { TNEmptyStateView } from '../../Core/truly-native'
import { useSelector } from 'react-redux'
import dynamicStyles from './styles'
import ProfessionalItem from '../../components/ProfessionalItem/ProfessionalItem'
import { useConfig } from '../../config'

function ProfessionalsScreen(props) {
  const { navigation, route } = props
  const vendor = route.params.vendor
  const category = route.params.category // used only for single vendor config

  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const config = useConfig()

  const currentUser = useSelector(state => state.auth.user)

  const [professionals, setProfessionals] = useState([])
  const [categories, setCategories] = useState([])
  const [refreshing] = useState(false)
  const [loading, setLoading] = useState(true)

  const { deleteVendor } = useVendorsMutations(config.tables.vendorsTableName)

  const isVendorAdmin =
    currentUser?.role === 'vendor' && currentUser.vendorID === vendor?.id
  const isAppAdmin = currentUser?.role === 'admin'

  const emptyStateConfig = {
    title: localized('No Items'),
    description: localized(
      'There are currently no items under this vendor. Please wait until the vendor completes their profile.',
    ),
  }

  useLayoutEffect(() => {
    const navigationOptions = {
      title: vendor?.title || category?.title,
    }

    if (config.isMultiVendorEnabled) {
      navigationOptions.headerRight = renderHeaderRight
    }
    navigation.setOptions(navigationOptions)
  }, [navigation, categories, vendor])

  useEffect(() => {
    setLoading(true)
    const subscribeProfessionals = config.isMultiVendorEnabled
      ? professionalsAPIManager.subscribeVendorProfessionals
      : professionalsAPIManager.subscribeCategoryProfessionals
    const subscriptionId = config.isMultiVendorEnabled ? vendor.id : category.id

    const unsubscribeProfessionals = subscribeProfessionals(
      subscriptionId,
      onProfessionalsUpdate,
    )
    const unsubscribeCategories = categoriesAPIManager.subscribeCategories(
      config.tables?.vendorCategoriesTableName,
      onCategoriesUpdate,
    )

    return () => {
      unsubscribeProfessionals && unsubscribeProfessionals()
      unsubscribeCategories && unsubscribeCategories()
    }
  }, [])

  const onCategoriesUpdate = newCategories => {
    setCategories(newCategories)
  }

  const onProfessionalsUpdate = data => {
    setProfessionals(data)
    setLoading(false)
  }

  const onPress = item => {}

  const didDeleteVendor = () => {
    deleteVendor(vendor.id)
    navigation.goBack()
  }

  const onDeleteVendor = () => {
    Alert.alert(
      localized('Delete vendor'),
      localized('Are you sure you want to delete this vendor'),
      [
        {
          onPress: didDeleteVendor,
          style: 'destructive',
          text: localized('Yes'),
        },
        {
          text: localized('No'),
        },
      ],
    )
  }

  const renderHeaderRight = () => {
    return (
      <View style={styles.iconContainer}>
        {(isVendorAdmin || isAppAdmin) && (
          <>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('EditVendor', {
                  selectedItem: vendor,
                  categories: categories,
                })
              }}>
              <Image
                style={styles.icon}
                source={require('../../assets/icons/pen.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={onDeleteVendor}>
              <Image
                style={styles.icon}
                source={require('../../assets/icons/delete.png')}
              />
            </TouchableOpacity>
          </>
        )}
      </View>
    )
  }

  const onProfessionalItemPress = item => {
    navigation.navigate('ProfessionalItemDetail', {
      professional: item,
      vendor,
    })
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
    professionalsAPIManager.addProfessional(item.id)
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

  const renderItem = ({ item, index }) => (
    <ProfessionalItem
      key={item?.id ?? index}
      onPress={onProfessionalItemPress}
      item={item}
      onDelete={onDelete}
      onAdd={onAdd}
    />
  )

  return (
    <View style={styles.container}>
      {professionals.length === 0 && !loading && (
        <View style={styles.emptyViewContainer}>
          <TNEmptyStateView emptyStateConfig={emptyStateConfig} />
        </View>
      )}
      <FlatList
        contentContainerStyle={styles.listContentContainer}
        data={professionals}
        renderItem={renderItem}
        keyExtractor={item => `${item.id}`}
        numColumns={2}
        initialNumToRender={5}
        refreshing={refreshing}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

ProfessionalsScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
}

export default ProfessionalsScreen
