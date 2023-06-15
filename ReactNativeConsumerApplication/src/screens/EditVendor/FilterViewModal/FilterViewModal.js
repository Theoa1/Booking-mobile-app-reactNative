import React, { useState, useRef, useEffect } from 'react'
import { Modal, ScrollView, Text, View } from 'react-native'
import { useTheme, useTranslations } from 'dopenative'
import ModalSelector from 'react-native-modal-selector'
import { filterAPI } from '../../../Core/listing/api'
import TextButton from 'react-native-button'
import dynamicStyles from './styles'
import { useConfig } from '../../../config'

function FilterViewModal(props) {
  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)
  const config = useConfig()

  const [data, setData] = useState([])
  const [filter, setFilter] = useState(props.value)

  const unsubscribe = useRef(null)

  const onCollectionUpdate = updatedData => {
    updatedData.forEach(updatedFilter => {
      if (filter[updatedFilter.name]) {
        updatedData.name = filter[updatedFilter.name]
      }
    })

    setData(updatedData)
  }

  useEffect(() => {
    unsubscribe.current = filterAPI.subscribeFilters(
      config.tables.filtersTableName,
      props.category?.id,
      onCollectionUpdate,
    )
    return () => {
      unsubscribe?.current && unsubscribe?.current()
    }
  }, [])

  const onDone = () => {
    props.onDone(filter)
  }

  const onCancel = () => {
    props.onCancel()
  }

  const renderItem = item => {
    let filter_key = item.name

    var newData = item.options.map((option, index) => ({
      key: option,
      label: option,
    }))
    newData.unshift({ key: 'section', label: item.name, section: true })

    let initValue = item.options[0]
    if (filter[filter_key]) {
      initValue = filter[filter_key]
    }

    return (
      <ModalSelector
        touchableActiveOpacity={0.9}
        key={item.id}
        data={newData}
        sectionTextStyle={styles.sectionTextStyle}
        optionTextStyle={styles.optionTextStyle}
        optionContainerStyle={styles.optionContainerStyle}
        cancelContainerStyle={styles.cancelContainerStyle}
        cancelTextStyle={styles.cancelTextStyle}
        selectedItemTextStyle={styles.selectedItemTextStyle}
        backdropPressToClose={true}
        cancelText={'Cancel'}
        initValue={initValue}
        onChange={option => {
          setFilter({ ...filter, [filter_key]: option.key })
        }}>
        <View style={styles.container}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.value}>{initValue}</Text>
        </View>
      </ModalSelector>
    )
  }

  const selectorArray = data.map(item => {
    return renderItem(item)
  })

  return (
    <Modal animationType="slide" transparent={false} onRequestClose={onCancel}>
      <ScrollView style={styles.body}>
        <View style={styles.modalBar}>
          <Text style={styles.modalTitle}>{localized('Filters')}</Text>
          <TextButton style={styles.modalRightButton} onPress={onDone}>
            {localized('Done')}
          </TextButton>
        </View>
        {selectorArray}
      </ScrollView>
    </Modal>
  )
}

export default FilterViewModal
