import React, { useState } from 'react'
import { Modal, View } from 'react-native'
import { useTheme, useTranslations } from 'dopenative'
import TextButton from 'react-native-button'
import MapView, { Marker } from 'react-native-maps'
import dynamicStyles from './styles'
import { useConfig } from '../../../config'

function SelectLocationModal(props) {
  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)
  const config = useConfig()
  const { initialMapRegion } = config

  const location = props.location

  const [latitude, setLatitude] = useState(location.latitude)
  const [longitude, setLongitude] = useState(location.longitude)
  const [latitudeDelta, setLatitudeDelta] = useState(
    initialMapRegion.delta.latitude,
  )
  const [longitudeDelta, setLongitudeDelta] = useState(
    initialMapRegion.delta.longitude,
  )

  const onDone = () => {
    props.onDone({
      latitude: latitude,
      longitude: longitude,
    })
  }

  const onCancel = () => {
    props.onCancel()
  }

  const onPress = event => {
    setLatitude(event.nativeEvent.coordinate.latitude)
    setLongitude(event.nativeEvent.coordinate.longitude)
  }

  const onRegionChange = region => {
    setLatitude(region.latitude)
    setLongitude(region.longitude)
    setLatitudeDelta(region.latitudeDelta)
    setLongitudeDelta(region.longitudeDelta)
  }

  return (
    <Modal animationType="slide" transparent={false} onRequestClose={onCancel}>
      <View style={styles.body}>
        <MapView
          ref={map => (map = map)}
          onPress={onPress}
          style={styles.mapView}
          onRegionChangeComplete={onRegionChange}
          region={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: latitudeDelta,
            longitudeDelta: longitudeDelta,
          }}>
          <Marker
            draggable
            coordinate={{
              latitude: latitude,
              longitude: longitude,
            }}
            onDragEnd={onPress}
          />
        </MapView>
        <View style={[styles.bar, styles.topbar]}>
          <TextButton
            style={[styles.rightButton, styles.rightButton]}
            onPress={onDone}>
            {localized('Done')}
          </TextButton>
        </View>
      </View>
    </Modal>
  )
}

export default SelectLocationModal
