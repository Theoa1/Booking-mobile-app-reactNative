import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { View, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { useTheme, useTranslations } from 'dopenative'
import IMDrawerMenu from '../Core/ui/drawer/IMDrawerMenu/IMDrawerMenu'
import { NavigationContainer } from '@react-navigation/native'
import useNotificationOpenedApp from '../Core/helpers/notificationOpenedApp'
import {
  LoadScreen,
  LoginScreen,
  ResetPasswordScreen,
  SignupScreen,
  SmsAuthenticationScreen,
  WalkthroughScreen,
  WelcomeScreen,
} from '../Core/onboarding'
import {
  IMEditProfileScreen,
  IMUserSettingsScreen,
  IMContactUsScreen,
} from '../Core/profile'
import MyProfileScreen from '../components/MyProfileScreen'
import ProfessionalItemDetail from '../screens/ProfessionalItemDetail/ProfessionalItemDetailScreen'
import ConversationsScreen from '../screens/ConversationsScreen/ConversationsScreen'

import EditVendorScreen from '../screens/EditVendor/EditVendorScreen'
import BookAppointmentScreen from '../screens/BookAppointment/BookAppointmentScreen'
import SearchScreen from '../screens/Search/SearchScreen'
import { IMChatScreen } from '../Core/chat'
import IMVendorReview from '../Core/review/ui/IMVendorReviewScreen/IMVendorReviewScreen'




import ProfessionalsScreen from '../screens/Professionals/ProfessionalsScreen'
import IMVendorsMap from '../Core/vendor/ui/IMVendorsMap/IMVendorsMap'
import { IMCategoryVendorsScreen } from '../Core/vendor/ui/IMVendors/IMCategoryVendors/IMCategoryVendorsScreen'
import CategoryListScreen from '../screens/CategoryList/CategoryListScreen'
import HomeScreen from '../screens/Home/HomeScreen'
import SingleVendorHomeScreen from '../screens/SingleVendorHome/SingleVendorHomeScreen'
import AppointmentsScreen from '../screens/Appointments/AppointmentsScreen'



import { useConfig } from '../config'



const AdminDrawer = createDrawerNavigator()
const AdminDrawerStack = props => {
  const config = useConfig()
  return (
    <AdminDrawer.Navigator
      drawerPosition="left"
      drawerStyle={{ width: 250 }}
      initialRouteName="Main"
      screenOptions={{ headerShown: false }}
      drawerContent={({ navigation }) => (
        <IMDrawerMenu
          navigation={props.navigation}
          menuItems={config.drawerMenuConfig.adminDrawerConfig.upperMenu}
          menuItemsSettings={
            config.drawerMenuConfig.adminDrawerConfig.lowerMenu
          }
        />
      )}>
      <AdminDrawer.Screen name="Main" component={MainNavigation} />
    </AdminDrawer.Navigator>
  )
}
const Main = createStackNavigator()
const MainNavigation = () => {
  const { theme, appearance } = useTheme()
  const config = useConfig()
  const { localized } = useTranslations()
  useNotificationOpenedApp()

  return (
    <Main.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: theme.colors[appearance].primaryBackground,
        },
        headerTintColor: theme.colors[appearance].primaryText,
      })}
      initialRouteName="Home"
      headerMode="float">
      <Main.Screen
        name="Home"
        component={
          config.isMultiVendorEnabled ? HomeScreen : SingleVendorHomeScreen
        }
      />
      <Main.Screen name="Appointments" component={AppointmentsScreen} />
      <Main.Screen name="EditVendor" component={EditVendorScreen} />
      <Main.Screen name="Search" component={SearchScreen} />
      <Main.Screen name="Professionals" component={ProfessionalsScreen} />
      <Main.Screen name="SingleVendor" component={ProfessionalsScreen} />
      <Main.Screen
        name="ProfessionalItemDetail"
        component={ProfessionalItemDetail}
      />
      <Main.Screen name="BookAppointment" component={BookAppointmentScreen} />
      <Main.Screen name="CategoryList" component={CategoryListScreen} />
      <Main.Screen name="Map" component={IMVendorsMap} />
      <Main.Screen name="Reviews" component={IMVendorReview} />
      <Main.Screen name="MyProfile" component={MyProfileScreen} />
      <Main.Screen
        options={{ headerRight: () => <View /> }}
        name={'Contact'}
        component={IMContactUsScreen}
      />
      <Main.Screen
        options={{ headerRight: () => <View /> }}
        name={localized('Settings')}
        component={IMUserSettingsScreen}
      />
      <Main.Screen name="AccountDetail" component={IMEditProfileScreen} />
      <Main.Screen name="Vendor" component={IMCategoryVendorsScreen} />
      <Main.Screen name="PersonalChat" component={IMChatScreen} />
      <Main.Screen name="Messages" component={ConversationsScreen} />
    </Main.Navigator>
  )
}
const Drawer = createDrawerNavigator()
const DrawerStack = props => {
  const config = useConfig()
  const drawer = config.isMultiVendorEnabled ? (
    <IMDrawerMenu
      navigation={props.navigation}
      menuItems={
        config.drawerMenuConfig.multiVendorCustomerDrawerConfig.upperMenu
      }
      menuItemsSettings={
        config.drawerMenuConfig.multiVendorCustomerDrawerConfig.lowerMenu
      }
    />
  ) : (
    <IMDrawerMenu
      navigation={props.navigation}
      menuItems={
        config.drawerMenuConfig.singleVendorCustomerDrawerConfig.upperMenu
      }
      menuItemsSettings={
        config.drawerMenuConfig.singleVendorCustomerDrawerConfig.lowerMenu
      }
    />
  )
  return (
    <Drawer.Navigator
      drawerPosition="left"
      drawerStyle={{ width: 250 }}
      initialRouteName="Main"
      screenOptions={{ headerShown: false }}
      drawerContent={({ navigation }) => drawer}>
      <Drawer.Screen name="Main" component={MainNavigation} />
    </Drawer.Navigator>
  )
}

const Login = createStackNavigator()
const LoginStack = () => {
  return (
    <Login.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Welcome">
      <Login.Screen name="Login" component={LoginScreen} />
      <Login.Screen name="Signup" component={SignupScreen} />
      <Login.Screen name="Welcome" component={WelcomeScreen} />
      <Login.Screen name="Sms" component={SmsAuthenticationScreen} />
      <Login.Screen name="ResetPassword" component={ResetPasswordScreen} />
    </Login.Navigator>
  )
}

const RootStack = createStackNavigator()
const RootNavigator = () => {
  const currentUser = useSelector(state => state.auth.user)
  console.log(currentUser.role)
  return (
    <RootStack.Navigator
      initialRouteName="LoadScreen"
      screenOptions={{ headerShown: false, animationEnabled: false }}
      headerMode="none">
      <RootStack.Screen
        options={{ headerShown: false }}
        name="LoadScreen"
        component={LoadScreen}
      />
      <RootStack.Screen
        options={{ headerShown: false }}
        name="Walkthrough"
        component={WalkthroughScreen}
      />
      <RootStack.Screen
        options={{ headerShown: false }}
        name="LoginStack"
        component={LoginStack}
      />



      {currentUser?.role === 'admin' ? (
        <RootStack.Screen
          options={{ headerShown: false }}
          name="MainStack"
          component={AdminDrawerStack}
        />
      ) : (
        <RootStack.Screen
          options={{ headerShown: false }}
          name="MainStack"
          component={DrawerStack}
        />
      )}
    </RootStack.Navigator>
  )
}

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  )
}

export { RootNavigator, AppNavigator }

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mapImage: { width: 25, height: 25 },
})
