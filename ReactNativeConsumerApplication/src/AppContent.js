import React, { useEffect } from 'react'
import { StatusBar } from 'react-native'
import Geocoder from 'react-native-geocoding'
import { OnboardingConfigProvider } from './Core/onboarding/hooks/useOnboardingConfig'
import { AppNavigator } from './navigations/AppNavigation'
import { useConfig } from './config'
import { ProfileConfigProvider } from './Core/profile/hooks/useProfileConfig'
import { ReviewsConfigProvider } from './Core/review/hooks/useReviewsConfig'
import { VendorAdminConfigProvider } from './Core/vendor/admin/hooks/useVendorAdminConfig'
import { VendorConfigProvider } from './Core/vendor/hooks/useVendorConfig'

const MainNavigator =
    AppNavigator

export default AppContent = () => {
  const config = useConfig()

  useEffect(() => {
    Geocoder.init(config.googleAPIKey)
  }, [])

  return (
    <VendorAdminConfigProvider config={config}>
      <VendorConfigProvider config={config}>
        <ReviewsConfigProvider config={config}>
          <ProfileConfigProvider config={config}>
            <OnboardingConfigProvider config={config}>
              <StatusBar />
              <MainNavigator />
            </OnboardingConfigProvider>
          </ProfileConfigProvider>
        </ReviewsConfigProvider>
      </VendorConfigProvider>
    </VendorAdminConfigProvider>
  )
}
