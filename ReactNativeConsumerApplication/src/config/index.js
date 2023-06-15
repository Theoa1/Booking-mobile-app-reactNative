import React, { useContext } from 'react'
import { useTheme, useTranslations } from 'dopenative'

const regexForNames = /^[a-zA-Z]{2,25}$/
const regexForPhoneNumber = /\d{9}$/

export const ConfigContext = React.createContext({})

export const ConfigProvider = ({ children }) => {
  const { theme } = useTheme()
  const { localized } = useTranslations()
  const config = {
    isMultiVendorEnabled: true,
    isSMSAuthEnabled: true,
    isGoogleAuthEnabled: true,
    isAppleAuthEnabled: true,
    isFacebookAuthEnabled: true,
    forgotPasswordEnabled: true,
    appIdentifier: 'rn-multi-vendor-appointments-android',
    facebookIdentifier: '285315185217069',
    isDelayedLoginEnabled: false,
    googleAPIKey: 'AIzaSyA4Bt3Mt6H-JC9beq910oaKm1Jl8yLNiu0', // This is used for fetching Google Maps data, such as geocoding data, reverse geocoding, directions, maps, etc.
    tables: {
      vendorsTableName: 'appointments_vendors',
      vendorReviewsTableName: 'appointments_reviews',
      vendorProductsTableName: 'users',
      bookingsTableName: 'appointments_bookings',
      vendorCategoriesTableName: 'appointments_categories',
    },
    onboardingConfig: {
      welcomeTitle: localized('Instabooking'),
      welcomeCaption: localized('Make your own appointments app in minutes.'),
      walkthroughScreens: [
        {
          icon: require('../assets/icons/bookinglogo.png'),
          title: localized('Instabooking'),
          description: localized(
            'Log in and make appointments to specialists nearby.',
          ),
        },
        {
          icon: require('../assets/icons/appointment.png'),
          title: localized('Manage Appointments'),
          description: localized(
            'Keep track of your appointments with our custom calendar.',
          ),
        },
        {
          icon: require('../assets/icons/reserve.png'),
          title: localized('Custom Categories'),
          description: localized(
            'We support custom multi-vendor categories. Doctors, gyms, salons, barber shops, dentists, fitness trainers, etc. Anything you want.',
          ),
        },
        {
          icon: require('../assets/icons/chat-messages.png'),
          title: localized('Chat & Video Chat'),
          description: localized(
            'Chat with specialists via texts, audio or video calls. Remote meetings are also supported.',
          ),
        },
        {
          icon: require('../assets/icons/review.png'),
          title: localized('Ratings & Reviews'),
          description: localized(
            'Rate and add reviews to vendors and professionals.',
          ),
        },
        {
          icon: require('../assets/icons/map.png'),
          title: localized('Map View'),
          description: localized(
            'Find gyms, doctors, hair salons, or any custom categories directly on an interactive map.',
          ),
        },
      ],
    },
    drawerMenuConfig: {
      adminDrawerConfig: {
        upperMenu: [
          {
            title: localized('HOME'),
            icon: theme.icons.shop,
            navigationPath: 'Home',
          },
          {
            title: localized('PROFILE'),
            icon: theme.icons.profile,
            navigationPath: 'MyProfile',
          },
        ],
        lowerMenu: [
          {
            title: localized('LOG OUT'),
            icon: theme.icons.shutdown,
            action: 'logout',
          },
        ],
      },
      professionalDrawerConfig: {
        upperMenu: [
          {
            title: localized('HOME'),
            icon: theme.icons.shop,
            navigationPath: 'Home',
          },
          {
            title: localized('APPOINTMENTS'),
            icon: theme.icons.appointment,
            navigationPath: 'Appointments',
          },
          {
            title: localized('MESSAGES'),
            icon: theme.icons.chatMessages,
            navigationPath: 'Messages',
          },
          {
            title: localized('PROFILE'),
            icon: theme.icons.profile,
            navigationPath: 'MyProfile',
          },
        ],
        lowerMenu: [
          {
            title: localized('LOG OUT'),
            icon: theme.icons.shutdown,
            action: 'logout',
          },
        ],
      },
      vendorDrawerConfig: {
        upperMenu: [
          {
            title: localized('HOME'),
            icon: theme.icons.shop,
            navigationPath: 'Home',
          },
          {
            title: localized('SEARCH'),
            icon: theme.icons.search,
            navigationPath: 'Search',
          },
          {
            title: localized('PROFILE'),
            icon: theme.icons.profile,
            navigationPath: 'MyProfile',
          },
        ],
        lowerMenu: [
          {
            title: localized('LOG OUT'),
            icon: theme.icons.shutdown,
            action: 'logout',
          },
        ],
      },
      multiVendorCustomerDrawerConfig: {
        upperMenu: [
          {
            title: localized('HOME'),
            icon: theme.icons.shop,
            navigationPath: 'Home',
          },
          {
            title: localized('APPOINTMENTS'),
            icon: theme.icons.appointment,
            navigationPath: 'Appointments',
          },
          {
            title: localized('CATEGORIES'),
            icon: theme.icons.category,
            navigationPath: 'CategoryList',
          },
          {
            title: localized('SEARCH'),
            icon: theme.icons.search,
            navigationPath: 'Search',
          },
          {
            title: localized('MESSAGES'),
            icon: theme.icons.chatMessages,
            navigationPath: 'Messages',
          },
          {
            title: localized('PROFILE'),
            icon: theme.icons.profile,
            navigationPath: 'MyProfile',
          },
        ],
        lowerMenu: [
          {
            title: localized('LOG OUT'),
            icon: theme.icons.shutdown,
            action: 'logout',
          },
        ],
      },
      singleVendorCustomerDrawerConfig: {
        upperMenu: [
          {
            title: localized('HOME'),
            icon: theme.icons.shop,
            navigationPath: 'Home',
          },
          {
            title: localized('APPOINTMENTS'),
            icon: theme.icons.appointment,
            navigationPath: 'Appointments',
          },
          {
            title: localized('SEARCH'),
            icon: theme.icons.search,
            navigationPath: 'Search',
          },
          {
            title: localized('MESSAGES'),
            icon: theme.icons.chatMessages,
            navigationPath: 'Messages',
          },
          {
            title: localized('PROFILE'),
            icon: theme.icons.profile,
            navigationPath: 'MyProfile',
          },
        ],
        lowerMenu: [
          {
            title: localized('LOG OUT'),
            icon: theme.icons.shutdown,
            action: 'logout',
          },
        ],
      },
    },
    tosLink: 'https://www.instamobile.io/eula-instachatty/',
    isUsernameFieldEnabled: false,
    smsSignupFields: [
      {
        displayName: localized('First Name'),
        type: 'ascii-capable',
        editable: true,
        regex: regexForNames,
        key: 'firstName',
        placeholder: 'First Name',
      },
      {
        displayName: localized('Last Name'),
        type: 'ascii-capable',
        editable: true,
        regex: regexForNames,
        key: 'lastName',
        placeholder: 'Last Name',
      },
    ],
    signupFields: [
      {
        displayName: localized('First Name'),
        type: 'ascii-capable',
        editable: true,
        regex: regexForNames,
        key: 'firstName',
        placeholder: 'First Name',
      },
      {
        displayName: localized('Last Name'),
        type: 'ascii-capable',
        editable: true,
        regex: regexForNames,
        key: 'lastName',
        placeholder: 'Last Name',
      },
      {
        displayName: localized('E-mail Address'),
        type: 'email-address',
        editable: true,
        regex: regexForNames,
        key: 'email',
        placeholder: 'E-mail Address',
        autoCapitalize: 'none',
      },
      {
        displayName: localized('Password'),
        type: 'default',
        secureTextEntry: true,
        editable: true,
        regex: regexForNames,
        key: 'password',
        placeholder: 'Password',
        autoCapitalize: 'none',
      },
    ],
    editProfileFields: {
      sections: [
        {
          title: localized('PUBLIC PROFILE'),
          fields: [
            {
              displayName: localized('First Name'),
              type: 'text',
              editable: true,
              regex: regexForNames,
              key: 'firstName',
              placeholder: 'Your first name',
            },
            {
              displayName: localized('Last Name'),
              type: 'text',
              editable: true,
              regex: regexForNames,
              key: 'lastName',
              placeholder: 'Your last name',
            },
            {
              displayName: localized('Bio'),
              type: 'text',
              editable: true,
              key: 'bio',
              multiline: true,
              placeholder: 'Your bio',
            },
          ],
        },
        {
          title: localized('PRIVATE DETAILS'),
          fields: [
            {
              displayName: localized('E-mail Address'),
              type: 'text',
              editable: false,
              key: 'email',
              placeholder: 'Your email address',
            },
            {
              displayName: localized('Phone Number'),
              type: 'text',
              editable: true,
              regex: regexForPhoneNumber,
              key: 'phone',
              placeholder: 'Your phone number',
            },
          ],
        },
      ],
    },
    userSettingsFields: {
      sections: [
        {
          title: localized('SECURITY'),
          fields: [
            {
              displayName: localized('Allow Push Notifications'),
              type: 'switch',
              editable: true,
              key: 'push_notifications_enabled',
              value: true,
            },
            {
              ...(Platform.OS === 'ios'
                ? {
                    displayName: localized('Enable Face ID / Touch ID'),
                    type: 'switch',
                    editable: true,
                    key: 'face_id_enabled',
                    value: false,
                  }
                : {}),
            },
          ],
        },
        {
          title: localized('PUSH NOTIFICATIONS'),
          fields: [
            {
              displayName: localized('Messages'),
              type: 'switch',
              editable: true,
              key: 'messages',
              value: true,
            },
            {
              displayName: localized('Appointments confirmation'),
              type: 'switch',
              editable: true,
              key: 'appointments_confirmation',
              value: true,
            },
          ],
        },
        {
          title: localized('ACCOUNT'),
          fields: [
            {
              displayName: localized('Save'),
              type: 'button',
              key: 'savebutton',
            },
          ],
        },
      ],
    },
    contactUsFields: {
      sections: [
        {
          title: localized('CONTACT'),
          fields: [
            {
              displayName: localized('Address'),
              type: 'text',
              editable: false,
              key: 'contacus',
              value: '142 Steiner Street, San Francisco, CA, 94115',
            },
            {
              displayName: localized('E-mail us'),
              value: 'florian@instamobile.io',
              type: 'text',
              editable: false,
              key: 'email',
              placeholder: 'Your email address',
            },
          ],
        },
        {
          title: '',
          fields: [
            {
              displayName: localized('Call Us'),
              type: 'button',
              key: 'savebutton',
            },
          ],
        },
      ],
    },
    contactUsPhoneNumber: '+16504859694',
    initialMapRegion: {
      origin: {
        latitude: 37.78825,
        longitude: -122.4324,
      },
      delta: {
        latitude: 0.0422,
        longitude: 0.0221,
      },
    },
  }

  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  )
}

export const useConfig = () => useContext(ConfigContext)
