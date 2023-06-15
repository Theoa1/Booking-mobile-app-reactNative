import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { FlatList, Image, TouchableOpacity, View, Text } from 'react-native'
import PropTypes from 'prop-types'
import { useTheme, useTranslations } from 'dopenative'
import { professionalsAPIManager, appointmentAPIManager } from '../../api'
import { TNEmptyStateView } from '../../Core/truly-native'
import { useSelector } from 'react-redux'
import dynamicStyles from './styles'
import ProfessionalItem from '../../components/ProfessionalItem/ProfessionalItem'
import { useSingleVendor } from '../../Core/vendor/api'
import UpcomingAppointment from '../Home/UpcomingAppointment/UpcomingAppointment'
import HomeProfessionalCard from '../Home/HomeProfessionalCard/HomeProfessionalCard'
import Hamburger from '../../components/Hamburger/Hamburger'
import { useConfig } from '../../config'

function SingleVendorHomeScreen(props) {
  const { navigation } = props

  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)
  const config = useConfig()

  const currentUser = useSelector(state => state.auth.user)

  const [professionals, setProfessionals] = useState([])
  const [refreshing] = useState(false)
  const [featuredProfessionals, setFeaturedProfessionals] = useState(null)
  const [loading, setLoading] = useState(true)
  const [upcomingAppointment, setUpcomingAppointment] = useState(false)

  const { vendor } = useSingleVendor(
    config.tables?.vendorsTableName,
    currentUser?.vendorID,
  )

  useLayoutEffect(() => {
    const navigationOptions = {
      title: vendor?.title,
      headerLeft: () => (
        <Hamburger
          onPress={() => {
            navigation.openDrawer()
          }}
        />
      ),
    }

    if (config.isMultiVendorEnabled) {
      navigationOptions.headerRight = renderHeaderRight
    }
    navigation.setOptions(navigationOptions)
  }, [navigation, vendor])

  useEffect(() => {
    const unsubscribeUpcomingAppointment =
      appointmentAPIManager.subscribeUserUpcomingAppointments(
        currentUser.id,
        res => {
          if (res) {
            setUpcomingAppointment(res[0])
          }
        },
      )

    const unsubscribeFeaturedPros =
      professionalsAPIManager.subscribeFeaturedProfessionals(
        onFeaturedProsUpdate,
      )

    return () => {
      unsubscribeFeaturedPros()
      unsubscribeUpcomingAppointment()
    }
  }, [])

  useEffect(() => {
    setLoading(true)

    const unsubscribeProfessionals =
      professionalsAPIManager.subscribeProfessionals(onProfessionalsUpdate)

    return () => {
      unsubscribeProfessionals && unsubscribeProfessionals()
    }
  }, [])

  const emptyStateConfig = {
    title: localized('No Professionals'),
    description: localized('No professionals added, please check back later.'),
  }

  const onProfessionalsUpdate = data => {
    setProfessionals(data)
    setLoading(false)
  }

  const onFeaturedProsUpdate = pros => {
    setFeaturedProfessionals(pros)
  }

  const onSeeDetailPress = async appointment => {
    navigation?.navigate('BookAppointment', {
      defaultAppointment: appointment,
    })
  }

  const renderHeaderRight = () => {
    return (
      <View style={styles.iconContainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Reviews', { entityID: vendor.id })
          }>
          <Image
            style={styles.icon}
            source={require('../../assets/icons/review.png')}
          />
        </TouchableOpacity>
      </View>
    )
  }

  const onProfessionalItemPress = pro => {
    navigation.navigate('ProfessionalItemDetail', {
      professional: pro,
      vendorId: pro?.professionalVendorID,
    })
  }

  const renderItem = ({ item, index }) => (
    <ProfessionalItem
      key={item?.id ?? index}
      onPress={onProfessionalItemPress}
      item={item}
    />
  )

  const renderListHeader = () => {
    if (professionals?.length) {
      return (
        <>
          {!!upcomingAppointment && (
            <UpcomingAppointment
              appointment={upcomingAppointment}
              onSeeDetailPress={onSeeDetailPress}
            />
          )}
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
          <Text style={styles.title}> {localized('All Professionals')} </Text>
        </>
      )
    }
    return null
  }

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
        ListHeaderComponent={renderListHeader}
      />
    </View>
  )
}

SingleVendorHomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
}

export default SingleVendorHomeScreen
