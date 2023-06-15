import { useState, useEffect } from 'react'
import { useVendorConfig } from '../../hooks/useVendorConfig'
import { subscribeVendors as subscribeVendorsAPI } from './FirebaseVendorClient'

const useVendors = () => {
  const { config } = useVendorConfig()

  const [vendors, setVendors] = useState([])

  useEffect(() => {
    if (!config.isMultiVendorEnabled) {
      return
    }

    const unsubscribeVendors = subscribeVendorsAPI(
      config.tables?.vendorsTableName,
      onVendorsUpdate,
    )
    return unsubscribeVendors
  }, [])

  const onVendorsUpdate = list => {
    setVendors(list)
  }

  return { vendors }
}

export default useVendors
