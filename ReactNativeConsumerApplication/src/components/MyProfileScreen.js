import React, { useLayoutEffect } from 'react'
import { View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { useTheme, useTranslations } from 'dopenative'
import { authManager } from '../Core/onboarding/api'
import { IMUserProfileComponent } from '../Core/profile'
import { logout, setUserData } from '../Core/onboarding/redux/auth'
import Hamburger from './Hamburger/Hamburger'
import { useConfig } from '../config'

const MyProfileScreen = props => {
  const { navigation } = props

  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const config = useConfig()

  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user)
  const isAdmin = useSelector(state => state.auth.user?.isAdmin)

  useLayoutEffect(() => {
    let currentTheme = theme.colors[appearance]

    navigation.setOptions({
      title: localized('My Profile'),
      headerTintColor: currentTheme.primaryForeground,
      headerTitleStyle: { color: currentTheme.primaryText },
      headerStyle: {
        backgroundColor: currentTheme.primaryBackground,
      },
      headerLeft: () => (
        <Hamburger
          onPress={() => {
            navigation.openDrawer()
          }}
        />
      ),
      headerRight: () => <View />,
    })
  }, [])

  const onLogout = () => {
    authManager.logout(user)
    dispatch(logout())
    navigation.navigate('LoadScreen')
  }

  const onUpdateUser = newUser => {
    dispatch(setUserData({ user: newUser }))
  }

  var menuItems = [
    {
      title: localized('Account Details'),
      icon: theme.icons.accountDetail,
      tintColor: '#6b7be8',
      onPress: () =>
        navigation.navigate('AccountDetail', {
          form: config.editProfileFields,
          screenTitle: localized('Edit Profile'),
        }),
    },
    {
      title: localized('Settings'),
      icon: theme.icons.settings,
      tintColor: '#a6a4b1',
      onPress: () =>
        navigation.navigate('Settings', {
          form: config.userSettingsFields,
          screenTitle: localized('Settings'),
        }),
    },
    {
      title: localized('Contact Us'),
      icon: theme.icons.contactUs,
      tintColor: '#9ee19f',
      onPress: () =>
        navigation.navigate('Contact', {
          form: config.contactUsFields,
          screenTitle: localized('Contact us'),
        }),
    },
  ]

  if (isAdmin) {
    menuItems.push({
      title: localized('Admin Dashboard'),
      tintColor: '#8aced8',
      icon: theme.icons.checklist,
      onPress: () => navigation.navigate('AdminDashboard'),
    })
  }

  return (
    <IMUserProfileComponent
      user={user}
      onUpdateUser={newUser => onUpdateUser(newUser)}
      onLogout={onLogout}
      menuItems={menuItems}
    />
  )
}

export default MyProfileScreen
