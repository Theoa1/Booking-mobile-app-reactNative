import React, { useState, useLayoutEffect, useEffect, useRef } from 'react'
import { FlatList, Text, View, TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image'
import { useSelector, useDispatch } from 'react-redux'
import { useTheme, useTranslations } from 'dopenative'
import dynamicStyles from './styles'
import Hamburger from '../../components/Hamburger/Hamburger'
import { IMSearchBarAlternate } from '../../Core/ui'
import { setVendors } from '../../Core/vendor/redux'
import {
  appointmentAPIManager,
  categoriesAPIManager,
  professionalsAPIManager,
} from '../../api/'
import { useVendors } from '../../Core/vendor/api'
import IMVendorsScreen from '../../Core/vendor/ui/IMVendors/IMVendorsScreen'
import UpcomingAppointment from './UpcomingAppointment/UpcomingAppointment'
import CategoryList from './CategoryList/CategoryList'
import HomeProfessionalCard from './HomeProfessionalCard/HomeProfessionalCard'
import { useConfig } from '../../config'

const HomeScreen = props => {
  const { navigation, route } = props
  const dispatch = useDispatch()

  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)
  const config = useConfig()

  const [categories, setCategories] = useState([])
  const [featuredProfessionals, setFeaturedProfessionals] = useState(null)

  const [upcomingAppointment, setUpcomingAppointment] = useState(false)

  const { vendors } = useVendors()

  const currentUser = useSelector(state => state.auth.user)

  useLayoutEffect(() => {
    navigation.setOptions({
      title: localized('Home'),
      headerLeft: () => (
        <Hamburger
          onPress={() => {
            navigation.openDrawer()
          }}
        />
      ),
      headerRight: () => (
        <View style={styles.headerRight}>
          {config.isMultiVendorEnabled && (
            <TouchableOpacity
              style={styles.mapNavIconContainer}
              onPress={onMapIconPress}>
              <FastImage
                source={require('../../assets/icons/map.png')}
                style={styles.mapNavIcon}
                tintColor={theme.colors[appearance].primaryForeground}
              />
            </TouchableOpacity>
          )}
        </View>
      ),
    })
  }, [])

  useEffect(() => {
    dispatch(setVendors(vendors))
  }, [vendors])

  useEffect(() => {
    if (config.isMultiVendorEnabled) {
      const unsubscribeUpcomingAppointment =
        appointmentAPIManager.subscribeUserUpcomingAppointments(
          currentUser.id,
          res => {
            if (res?.length) {
              setUpcomingAppointment(res[0])
            }
          },
        )

      return unsubscribeUpcomingAppointment
    }
  }, [])

  useEffect(() => {
    const unsubscribeCategories = categoriesAPIManager.subscribeCategories(
      config.tables?.vendorCategoriesTableName,
      onCategoriesUpdate,
    )

    const unsubscribeFeaturedPros =
      professionalsAPIManager.subscribeFeaturedProfessionals(
        onFeaturedProsUpdate,
      )

    return () => {
      unsubscribeCategories && unsubscribeCategories()
      unsubscribeFeaturedPros && unsubscribeFeaturedPros()
    }
  }, [])

  const onMapIconPress = () => {
    if (vendors.length > 0 || vendors !== undefined) {
      navigation.navigate('Map', { vendorRouteName: 'Professionals' })
    }
  }

  const onSeeDetailPress = async appointment => {
    navigation?.navigate('BookAppointment', {
      defaultAppointment: appointment,
    })
  }

  const onProfessionalItemPress = pro => {
    navigation.navigate('ProfessionalItemDetail', {
      professional: pro,
      vendorId: pro?.professionalVendorID,
    })
  }

  const onCategoriesUpdate = newCategories => {
    setCategories(newCategories)
  }

  const onFeaturedProsUpdate = pros => {
    setFeaturedProfessionals(pros)
  }

  const renderSections = (item, index) => {
    return (
      <CategoryList
        key={item?.id ?? index?.toString()}
        title={item.title}
        categoryID={item.id}
      />
    )
  }

  const onSearchBarPress = () => {
    navigation.navigate('Search')
  }

  const renderListHeader = () => {
    return (
      <>
        {!!upcomingAppointment && (
          <UpcomingAppointment
            appointment={upcomingAppointment}
            onSeeDetailPress={onSeeDetailPress}
          />
        )}
        <View style={styles.searchBarContainer}>
          <IMSearchBarAlternate
            onPress={onSearchBarPress}
            placeholderTitle={localized('Find here...')}
          />
        </View>

        <CategoryList title="" categories={categories} />

        {featuredProfessionals?.length > 0 && (
          <View style={styles.bestSpecialistsModule}>
            <Text style={styles.featuredProsTitle}>
              {localized('Best Specialists')}
            </Text>
            <View style={styles.bestSpecialistsCarouselContainer}>
              <FlatList
                horizontal
                initialNumToRender={4}
                data={featuredProfessionals}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => {
                  return (
                    <HomeProfessionalCard
                      item={item}
                      key={item?.id ?? index}
                      onPress={onProfessionalItemPress}
                    />
                  )
                }}
              />
            </View>
          </View>
        )}
        {categories?.map(renderSections)}
        <Text style={styles.title}> {localized('Top Rated Venders')} </Text>
      </>
    )
  }

  return (
    <IMVendorsScreen
      containerStyle={styles.container}
      navigation={navigation}
      renderListHeader={renderListHeader}
      route={route}
      vendors={vendors}
    />
  )
}

export default HomeScreen
