// Uncomment these if you want to remove firebase and add your own custom backend:
// export { default as categoriesAPIManager } from './local/Categories'
// export { default as appointmentAPIManager } from './local/Appointments'
// export { default as professionalsAPIManager } from './local/professionals'

// Remove these lines if you want to remove firebase and add your own custom backend:
export { default as categoriesAPIManager } from './firebase/Categories'
export { default as appointmentAPIManager } from './firebase/Appointments'
export { default as professionalsAPIManager } from './firebase/Professionals'
