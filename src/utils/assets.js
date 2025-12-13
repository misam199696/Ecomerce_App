const assets = {
  // Tab Icons
  icons: {
    home: require('../assets/icons/home.png'),
    homeFilled: require('../assets/icons/home.png'),
    services: require('../assets/icons/list.png'),
    servicesFilled: require('../assets/icons/list.png'),
    bookings: require('../assets/icons/calendar.png'),
    bookingsFilled: require('../assets/icons/calendar.png'),
    profile: require('../assets/icons/user.png'),
    profileFilled: require('../assets/icons/user.png'),
    splashPicture: require('../assets/icons/splash.png'),
  },
  
  // Add other assets here (images, fonts, etc.) in the future
  // Example:
  // images: {
  //   logo: require('../assets/images/logo.png'),
  //   background: require('../assets/images/background.jpg'),
  // },
  // fonts: {
  //   regular: require('../assets/fonts/YourFont-Regular.ttf'),
  //   bold: require('../assets/fonts/YourFont-Bold.ttf'),
  // },
};

export const getIcon = (name, isFilled = false) => {
  if (isFilled) {
    return assets.icons[`${name}Filled`] || assets.icons[name];
  }
  return assets.icons[name];
};

export default assets;
