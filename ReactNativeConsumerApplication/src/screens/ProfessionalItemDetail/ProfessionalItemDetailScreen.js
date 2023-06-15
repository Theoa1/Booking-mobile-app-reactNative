import React, { useLayoutEffect, useEffect, useRef, useState } from 'react'
import { Text, Image, View, TouchableOpacity, ScrollView } from 'react-native'
import { useTheme, useTranslations } from 'dopenative'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { professionalsAPIManager } from '../../api'
import { useSingleVendor } from '../../Core/vendor/api'
import { useSelector } from 'react-redux'
import dynamicStyles from './styles'
import ProfileCard from '../../components/ProfileCard/ProfileCard'
import { TNActivityIndicator } from '../../Core/truly-native'
import { useConfig } from '../../config'
import { FlatList } from 'react-native';
import ReviewPreview from '../../Core/review/ui/IMVendorReviewScreen/ReviewPreview'
import { Icon } from 'react-native-elements';

export default function ProfessionalItemDetailScreen({ route, navigation }) {
  const profileId = route?.params?.profileId
  const vendorId = route?.params?.vendorId

  
  const insets = useSafeAreaInsets()

  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const currentUser = useSelector(state => state.auth.user)
  const config = useConfig()

  const [loading, setLoading] = useState(false)

  const [professional, setProfessional] = useState(
    route?.params?.professional ?? {},
  )

  const { vendor } = useSingleVendor(
    config.tables.vendorsTableName,
    vendorId || route?.params?.vendor?.id,
  )

  const fullname = `${professional?.firstName ?? ''} ${
    professional?.lastName ?? ''
  }`

  const OnlyFirstname = `${professional?.firstName ?? ''}`

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${fullname}${localized("'s profile")} `,
      headerRight: renderHeaderRight,
    })
  }, [navigation])

  useEffect(() => {
    if (vendorId || profileId) {
      hydrateVendorAndProfessional()
    }
  }, [vendorId, profileId])

  const hydrateVendorAndProfessional = async () => {
    setLoading(true)
    const appointmentProfessional =
      await professionalsAPIManager.getProfessional(profileId)

    if (profileId) {
      setProfessional(appointmentProfessional)
    }

    setLoading(false)
  }

  const onBookAppointment = () => {
    navigation.navigate('BookAppointment', {
      professional,
      vendor,
    })
  }

  const onReviewPress = () => {
    navigation.navigate('Reviews', { entityID: professional.id })
  }

  const renderHeaderRight = () => {
    return (
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={onReviewPress}>
          <Image
            style={styles.navIcon}
            source={require('../../assets/icons/review.png')}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView 
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
      >
      <ProfileCard
        fullname={fullname}
        profilePictureURL={professional?.profilePictureURL}
        specialty={professional?.professionalSpecialty}
        isBottomSheet={false}
        profileId={professional?.id}
        canContact={!currentUser?.vendorID}
      />
      
      <View style={styles.bodyContainer}>
        <TouchableOpacity onPress={() => {/* handle press to message professional */}}>
          <View style={styles.bioContainerWithImage}>

              {/* Profile Image */}
            <Image
              source={{ uri: professional?.profilePictureURL }}
              style={styles.profileImage}
            />
            
            <View style={styles.bioContainer}>
              <View style={styles.infotitleContainer}>
                <Text style={styles.title}>{`${localized('About')} ${OnlyFirstname}`}</Text>
              </View>
              <View style={styles.bioDetailContainer}>
                <Text style={styles.skillsDetail}>{professional?.bio}</Text>
              </View>
            </View>

            {/* Message Icon */}
            {/* <View style={styles.messageIconContainer}>
              <Icon
                name='message'
                type='material' // Specify type if not using default
                size={24}
                color='#000'
              />
            </View> */}
          </View>
        </TouchableOpacity>


            <View style={styles.skillsContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{localized('Specialities')}</Text>
                </View>
                <View style={styles.skillsWrapper}>
                    {(professional?.professionalSkills ?? []).map((skill, index) => (
                        <View style={styles.skillCard} key={index.toString()}>
                            <Text style={styles.skillsDetail}>{skill?.displayName}</Text>
                        </View>
                    ))}
                </View>
            </View>
            <View style={styles.locationContainer}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{localized('Location')}</Text>
              </View>
              <View style={styles.vendorLocationContainer}>
                <View style={styles.locationIconContainer}>
                  <View style={styles.locationIconWrapper}>
                    <Image
                      style={styles.locationIcon}
                      source={theme.icons.mapMarker}
                    />
                  </View>
                </View>
                <View style={styles.locationDetailContainer}>
                  <Text style={styles.locationName}>{vendor?.title}</Text>
                  <Text style={styles.locationAddress}>{vendor?.place}</Text>
                </View>
              </View>
            </View>
            <View style={styles.reviewSecContainer}>
              <View style={styles.titleContainer}>
                <Text style={styles.Reviewtitle}>{localized('What people are Saying')}</Text>
              </View>
              <View style={styles.ReviewDetailContainer}>
                  <ReviewPreview entityId={professional?.id} />
              </View>
            </View>
      </View>
      </ScrollView>
      {!currentUser?.vendorID && (
        <View
          style={[
            styles.footerContainer,
            { paddingBottom: Math.floor(insets.bottom, 16) },
          ]}>
          <View style={styles.priceContainer}>
            <Text style={styles.priceTitle}>
              {localized('Booking Fee')}
            </Text>
            <Text style={styles.price}>
              {professional?.pricePerHr ?? localized('$2')}
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onBookAppointment} style={styles.button}>
              <Text style={styles.buttonTitle}>
                {`${localized('Book')} ${OnlyFirstname}`}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {loading && <TNActivityIndicator />}
    </View>
  )
}
