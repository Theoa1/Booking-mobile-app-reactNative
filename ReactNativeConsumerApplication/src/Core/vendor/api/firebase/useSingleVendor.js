import { useState, useEffect } from 'react'
import { subscribeToSingleVendor as subscribeToSingleVendorAPI } from './FirebaseVendorClient'

const useSingleVendor = (vendorsTableName, vendorId) => {
  const [loading, setLoading] = useState(false)
  const [vendor, setVendor] = useState()

  useEffect(() => {
    if (!vendorId) {
      return
    }
    setLoading(true)
    const unsubscribeVendor = subscribeToSingleVendorAPI(
      vendorsTableName,
      vendorId,
      onVendorUpdate,
    )
    return unsubscribeVendor
  }, [])

  const onVendorUpdate = item => {
    setVendor(item)
    setLoading(false)
  }

  return { loading, vendor }
}

export default useSingleVendor
