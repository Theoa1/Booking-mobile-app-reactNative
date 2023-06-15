import React, { useState, useRef, useEffect, useLayoutEffect } from 'react'
import {
  ScrollView,
  TouchableOpacity,
  TextInput,
  Text,
  View,
} from 'react-native'
import { useSelector } from 'react-redux'
import { useTheme, useTranslations } from 'dopenative'
import Geolocation from '@react-native-community/geolocation'
import ModalSelector from 'react-native-modal-selector'
import TextButton from 'react-native-button'
import FastImage from 'react-native-fast-image'
import ImagePicker from 'react-native-image-crop-picker'
import Icon from 'react-native-vector-icons/FontAwesome'
import SelectLocationModal from './SelectLocationModal/SelectLocationModal'
import ActionSheet from 'react-native-actionsheet'
import * as Location from 'expo-location'
import { storageAPI } from '../../Core/media'
import dynamicStyles from './styles'
import { TNActivityIndicator } from '../../Core/truly-native'
import { useVendorsMutations } from '../../Core/vendor/api'
import { categoriesAPIManager } from '../../api'
import { useConfig } from '../../config'

function EditVendorScreen(props) {
  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const config = useConfig()
  const { tables, initialMapRegion } = config
  const { vendorsTableName, vendorCategoriesTableName } = tables

  const { updateVendor } = useVendorsMutations(vendorsTableName)

  const defaultCategories = props?.route.params?.categories
  const selectedItem = props?.route.params?.selectedItem

  const defaultState = {
    category: { name: localized('Select...') },
    title: '',
    description: '',
    location: {
      latitude: initialMapRegion.origin.latitude,
      longitude: initialMapRegion.origin.longitude,
    },
    localPhotos: [],
    photoUrls: [],
    price: '$1000',
    textInputValue: '',
    address: 'Checking...',
  }

  // if (categories.length > 0) category = categories[0];
  if (selectedItem) {
    const { title, latitude, longitude, photos, place } = selectedItem

    defaultState.category = defaultCategories?.find(
      category => selectedItem.categoryID === category.id,
    )
    defaultState.title = title
    defaultState.description = selectedItem.description
    defaultState.location = {
      latitude,
      longitude,
    }
    defaultState.localPhotos = photos ?? []
    defaultState.photoUrls = photos
    defaultState.price = selectedItem.price
    defaultState.address = place
  }

  const currentUser = useSelector(state => state.auth.user)

  const [categories, setCategories] = useState(defaultCategories ?? [])
  const [category, setCategory] = useState(defaultState.category)
  const [description, setDescription] = useState(defaultState.description)
  const [title, setTitle] = useState(defaultState.title)
  const [location, setLocation] = useState(defaultState.location)
  const [localPhotos, setLocalPhotos] = useState(defaultState.localPhotos)
  const [price, setPrice] = useState(defaultState.price)
  const [address, setAddress] = useState(defaultState.address)
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null)
  const [locationModalVisible, setLocationModalVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  const actionsheetRef = useRef(null)

  useLayoutEffect(() => {
    props.navigation.setOptions({
      title: categories?.length
        ? localized('Edit Vendor')
        : localized('Add Vendor'),
    })
  }, [props.navigation])

  useEffect(() => {
    if (categories?.length) {
      return
    }
    const unsubscribeCategories = categoriesAPIManager.subscribeCategories(
      vendorCategoriesTableName,
      onCategoriesUpdate,
    )

    return unsubscribeCategories
  }, [])

  const onCategoriesUpdate = newCategories => {
    setCategories(newCategories)
  }

  const selectLocation = () => {
    setLocationModalVisible(true)
  }

  const onChangeLocation = async newLocation => {
    try {
      let json = await Location.reverseGeocodeAsync(newLocation)

      const choosenIndex = Math.floor(json.length * 0.8)
      const formatted_address = `${json[choosenIndex].city}, ${json[choosenIndex].region}.`
      setAddress(formatted_address)
    } catch (error) {
      console.log(error)
      setAddress('Unknown')
    }
  }

  const onSelectLocationDone = newLocation => {
    setLocation(newLocation)
    setLocationModalVisible(false)
    onChangeLocation(newLocation)
  }

  const onSelectLocationCancel = () => {
    setLocationModalVisible(false)
  }

  const onPressAddPhotoBtn = () => {
    // More info on all the options is below in the API Reference... just some common use cases shown here
    const options = {
      title: localized('Select a photo'),
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    }

    ImagePicker.openPicker({
      cropping: false,
      multiple: false,
    })
      .then(image => {
        setLocalPhotos([...localPhotos, { ...image, uri: image.sourceURL }])
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const onCancel = () => {
    // props.onCancel();
  }

  const onSave = () => {
    if (!title) {
      alert(localized('Title was not provided.'))
      return
    }
    if (!description) {
      alert(localized('Description was not set.'))
      return
    }
    if (!price) {
      alert(localized('Price is empty.'))
      return
    }
    if (localPhotos.length == 0) {
      alert(localized('Please choose at least one photo.'))
      return
    }

    setLoading(true)

    let photoUrls = []

    if (selectedItem?.photos) {
      photoUrls = [...localPhotos]
    }

    const uploadPromiseArray = []
    localPhotos.forEach((file, index) => {
      if (file?.uri && !file?.uri?.startsWith('https://')) {
        uploadPromiseArray.push(
          new Promise((resolve, reject) => {
            storageAPI.processAndUploadMediaFile(file).then(response => {
              if (response.downloadURL) {
                photoUrls[index] = response.downloadURL
              }
              resolve()
            })
          }),
        )
      }
    })

    Promise.all(uploadPromiseArray)
      .then(values => {
        const newLocation = {
          latitude: location.latitude,
          longitude: location.longitude,
        }
        const uploadObject = {
          // isApproved: !ServerConfiguration.isApprovalProcessEnabled,
          // authorID: currentUser?.id,
          author: currentUser?.id,
          categoryID: category?.id,
          description: description,
          latitude: location.latitude,
          longitude: location.longitude,
          title: title,
          price: price,
          place: address || 'San Francisco, CA',
          photo: photoUrls.length > 0 ? photoUrls[0] : null,
          photos: photoUrls,
          photoURLs: photoUrls,
        }

        updateVendor(
          selectedItem,
          uploadObject,
          photoUrls,
          newLocation,

          ({ success }) => {
            if (success) {
              setLoading(false)
              onCancel()
            } else {
              alert(error)
            }
          },
        )
      })
      .catch(reason => {
        console.log(reason)
      })
  }

  const showActionSheet = async index => {
    await setSelectedPhotoIndex(index)
    actionsheetRef.current.show()
  }

  const onActionDone = index => {
    if (index == 0) {
      var array = [...localPhotos]
      array.splice(selectedPhotoIndex, 1)
      setLocalPhotos(array)
    }
  }

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        setLocation(position.coords)
        onChangeLocation(position.coords)
      },
      error => console.log(error.message),
    )
  }, [])

  var categoryData = categories?.map((categoryItem, index) => ({
    key: categoryItem.id,
    label: categoryItem.name ?? categoryItem.title,
  }))

  categoryData.unshift({ key: 'section', label: 'Category', section: true })

  const photos = localPhotos.map((photo, index) => (
    <TouchableOpacity
      key={index.toString()}
      onPress={() => {
        showActionSheet(index)
      }}>
      <FastImage style={styles.photo} source={{ uri: photo?.uri ?? photo }} />
    </TouchableOpacity>
  ))
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors[appearance].primaryBackground,
      }}>
      <ScrollView style={styles.body}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{localized('Title')}</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={text => setTitle(text)}
            placeholder="Start typing"
            placeholderTextColor={theme.colors[appearance].grey6}
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.divider} />
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{localized('Description')}</Text>
          <TextInput
            multiline={true}
            numberOfLines={2}
            style={styles.input}
            onChangeText={text => setDescription(text)}
            value={description}
            placeholder="Start typing"
            placeholderTextColor={theme.colors[appearance].grey6}
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.divider} />
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.title}>{localized('Price')}</Text>
            <TextInput
              style={styles.priceInput}
              keyboardType="numeric"
              value={price}
              onChangeText={text => setPrice(text)}
              placeholderTextColor={theme.colors[appearance].grey6}
              underlineColorAndroid="transparent"
            />
          </View>
          <ModalSelector
            touchableActiveOpacity={0.9}
            data={categoryData}
            sectionTextStyle={styles.sectionTextStyle}
            optionTextStyle={styles.optionTextStyle}
            optionContainerStyle={styles.optionContainerStyle}
            cancelContainerStyle={styles.cancelContainerStyle}
            cancelTextStyle={styles.cancelTextStyle}
            selectedItemTextStyle={styles.selectedItemTextStyle}
            backdropPressToClose={true}
            cancelText={localized('Cancel')}
            initValue={category.name ?? category.title}
            onChange={option => {
              setCategory({ id: option.key, name: option.label })
            }}>
            <View style={styles.row}>
              <Text style={styles.title}>{localized('Category')}</Text>
              <Text style={styles.value}>
                {category.name ?? category.title}
              </Text>
            </View>
          </ModalSelector>
          <TouchableOpacity onPress={selectLocation}>
            <View style={styles.row}>
              <Text style={styles.title}>{localized('Location')}</Text>
              <View style={styles.location}>
                <Text style={styles.value}>{address}</Text>
              </View>
            </View>
          </TouchableOpacity>
          <Text style={styles.addPhotoTitle}>{localized('Add Photos')}</Text>
          <ScrollView style={styles.photoList} horizontal={true}>
            {photos}
            <TouchableOpacity onPress={onPressAddPhotoBtn}>
              <View style={[styles.addButton, styles.photo]}>
                <Icon name="camera" size={30} color="white" />
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
        {locationModalVisible && (
          <SelectLocationModal
            location={location}
            onCancel={onSelectLocationCancel}
            onDone={onSelectLocationDone}
          />
        )}
      </ScrollView>
      {loading ? (
        <TNActivityIndicator />
      ) : (
        <TextButton
          containerStyle={styles.addButtonContainer}
          onPress={onSave}
          style={styles.addButtonText}>
          {localized('Save')}
        </TextButton>
      )}
      <ActionSheet
        ref={actionsheetRef}
        title={localized('Confirm to delete?')}
        options={[localized('Confirm'), localized('Cancel')]}
        cancelButtonIndex={1}
        destructiveButtonIndex={0}
        onPress={index => {
          onActionDone(index)
        }}
      />
    </View>
  )
}

export default EditVendorScreen
