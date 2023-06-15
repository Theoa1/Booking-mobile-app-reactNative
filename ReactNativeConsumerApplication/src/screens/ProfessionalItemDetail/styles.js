import { StyleSheet } from 'react-native'
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from 'react-native-responsive-screen'

const dynamicStyles = (theme, appearance) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors[appearance].primaryBackground,
    },
    scrollViewContent: {
      paddingBottom: 70,
    },
    iconContainer: {
      paddingHorizontal: 15,
    },
    navIcon: {
      height: 25,
      width: 25,
      tintColor: theme.colors[appearance].primaryForeground,
    },
    bodyContainer: {
      flex: 1,
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 20,
      marginRight: 10,
    },
    messageIconContainer: {
      position: 'absolute',
      right: 10,
      top: '50%',
      transform: [{ translateY: -12 }],
    },
    bioContainer: {
      // height: '20%', 
    },
    bioContainerWithImage: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderRadius: 20,
      borderColor: theme.colors[appearance].grey0,
      height: 130,     
      backgroundColor: theme.colors[appearance].primaryBackgroundCardHome,
      shadowColor: theme.colors[appearance].primaryBackgroundCardHome,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.37,
      shadowRadius: 20,
      elevation: 5, 
      flex: 1,
      borderWidth: 2,
      marginTop: 20,
      marginLeft: 10,
      marginRight: 10,  
    },
    bioDetailContainer: {
      width: '100%',
      paddingLeft: 10,
      marginVertical: 5,
      flexDirection: 'row',
      alignItems: 'center',
    },
    titleContainer: {
      width: '100%',
      marginTop: 20,
      marginBottom: 10,
      paddingLeft: 20,
    },
    infotitleContainer: {
      width: '100%',
      paddingLeft: 20,
    },
    title: {
      color: theme.colors[appearance].primaryText,
      fontWeight: '700',
      fontSize: 18,
    },
    skillsContainer: {
      // height: '15%',
      width: '100%',
    },
    skillsDetailContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: '100%',
      paddingLeft: 20,
      marginVertical: 5,
    },
    skillsDetail: {
      color: theme.colors[appearance].secondaryText,
      marginRight: 10,
      marginLeft: 10,
    },
    skillCard: {
      // backgroundColor: theme.backgroundColor,
      padding: 10,
      borderRadius: 20,
      marginBottom: 10,
      borderWidth: 2,
      borderColor: theme.colors[appearance].grey0,
      alignItems: 'center',
      justifyContent: 'center',
      margin: 5, // Add some margin to create spacing between cards
    },
    skillsWrapper: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start', // optional
    },

    locationContainer: {
      height: '17%',
      width: '100%',
      marginTop: 20,
      marginBottom: 20,
    },
    vendorLocationContainer: {
      width: '100%',
      height: '100%',
      flexDirection: 'row',
    },
    locationIconContainer: {
      flex: 0.8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    locationIconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 55,
    width: 55,
    borderRadius: 27.5, // Make it rounded
    overflow: 'hidden',
    backgroundColor: theme.colors[appearance].grey3,
    },
    locationIcon: {
      height: '40%',
      width: '40%',
    },
    locationDetailContainer: {
      flex: 2.2,
      justifyContent: 'center',
    },
    locationName: {
      color: theme.colors[appearance].primaryText,
      paddingBottom: 5,
      fontWeight: '400',
    },
    locationAddress: {
      color: theme.colors[appearance].secondaryText,
    },
    footerContainer: {
      position: 'absolute',
      width: '100%',
      bottom: 1,
      backgroundColor: theme.colors[appearance].primaryBackground,
      marginTop: 10,  
      elevation: 4,
      shadowTopColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.37, 
      borderTopColor: theme.colors[appearance].grey0,
    },
    priceContainer: {
      flexDirection: 'row',
      height: h(6),
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 10,
    },
    priceTitle: {
      color: theme.colors[appearance].secondaryText,
      fontWeight: '400',
      fontSize: h(1.8),
    },
    price: {
      color: theme.colors[appearance].primaryText,
      fontWeight: '600',
      fontSize: h(1.8),
    },
    buttonContainer: {
      height: h(6),
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      height: '90%',
      width: '95%',
      borderRadius: 25, // Round the corners
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors[appearance].primaryForeground,
      elevation: 3, // Add elevation to make it more modern
    },
    buttonTitle: {
      color: '#fff',
      fontWeight: '600',
      fontSize: h(1.8),
    },

    reviewSecContainer: {
      width: '100%',
      marginVertical: 5,
      marginTop: 40,         
      borderBottomColor: theme.colors[appearance].grey0,
      shadowTopColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.37, 
      elevation: 4,     
    },

    ReviewDetailContainer: {
      marginBottom: 50,
      // marginTop: 16,
      flex: 1,
      alignItems: 'center',
      height: 80,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors[appearance].grey0,
      backgroundColor: theme.colors[appearance].primaryBackground,
      shadowBottomColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.37,
      elevation: 5,
      
      
    },
    Reviewtitle: {
      color: theme.colors[appearance].primaryText,
      fontWeight: '800',
      fontSize: 20, // Increase font size
      textAlign: 'center',
    },
    noReviewsText: {
      color: theme.colors[appearance].primaryText,
      fontWeight: '800',
      fontSize: 18,
      textAlign: 'center',
    },
  })

export default dynamicStyles
