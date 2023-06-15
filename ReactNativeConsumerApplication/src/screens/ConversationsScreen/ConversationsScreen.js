import React, { useLayoutEffect } from 'react'
import { View } from 'react-native'
import { useTheme, useTranslations } from 'dopenative'
import { IMConversationListView } from '../../Core/chat'
import Hamburger from '../../components/Hamburger/Hamburger'
import dynamicStyles from './styles'

function ConversationsScreen(props) {
  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  useLayoutEffect(() => {
    const colorSet = theme.colors[appearance]
    props.navigation.setOptions({
      headerTitle: localized('Messages'),
      headerLeft: () => (
        <Hamburger
          onPress={() => {
            props.navigation.openDrawer()
          }}
        />
      ),
      headerStyle: {
        backgroundColor: colorSet.primaryBackground,
        borderBottomColor: colorSet.hairline,
      },
      headerTintColor: colorSet.primaryText,
      headerRight: null,
    })
  }, [])

  const emptyStateConfig = {
    title: localized('No Messages'),
    description: localized(
      'You can contact Professionals by messaging them on the detail page. Your conversations with them will show up here.',
    ),
  }

  return (
    <View style={styles.container}>
      <IMConversationListView
        navigation={props.navigation}
        emptyStateConfig={emptyStateConfig}
      />
    </View>
  )
}

export default ConversationsScreen
