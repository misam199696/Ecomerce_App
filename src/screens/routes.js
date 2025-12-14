import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';

// Import screens
import SplashScreen from './SplashScreen';
import GuideSlider from './GuideSlider';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import HomeScreen from './HomeScreen';
import ServicesScreen from './ServicesScreen';
import BookingsScreen from './BookingsScreen';
import ProfileScreen from './ProfileScreen';
import NotificationsScreen from './NotificationsScreen';
import ProductDetailsScreen from './ProductDetailsScreen';
import CartScreen from './CartScreen';

// Import assets utility
import { getIcon } from '../utils/assets';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const RootStack = createNativeStackNavigator();

// Home Stack Navigator
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ headerShown: false }}
      />
      <HomeStack.Screen 
        name="Notifications" 
        component={NotificationsScreen} 
        options={{ title: 'Notifications' }}
      />
    </HomeStack.Navigator>
  );
}

// Main Tab Navigator
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => {
          let iconName = route.name.toLowerCase();
          const iconSource = getIcon(iconName, focused);
          const iconStyle = { 
            width: size, 
            height: size,
            tintColor: focused ? '#E7B866' : 'white' 
          };

          return <Image source={iconSource} style={iconStyle} resizeMode="contain" />;
        },
        tabBarActiveTintColor: '#E7B866',
        tabBarInactiveTintColor: 'white',
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: '#1E1E1E',
          borderTopWidth: 0,
          height: 80,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarIconStyle: {
          marginTop: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 0,
          fontFamily: 'System',
          fontWeight: '500',
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Services" component={ServicesScreen} />
      <Tab.Screen name="Bookings" component={BookingsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Root Navigator
const AppNavigator = () => {
  return (
    <RootStack.Navigator 
      screenOptions={{ headerShown: false }}
      initialRouteName="Splash"
    >
      <RootStack.Screen name="Splash" component={SplashScreen} />
      <RootStack.Screen name="Guide" component={GuideSlider} />
      <RootStack.Screen name="Login" component={LoginScreen} />
      <RootStack.Screen name="SignUp" component={SignUpScreen} />
      <RootStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <RootStack.Screen 
        name="ProductDetails" 
        component={ProductDetailsScreen} 
        options={{
          headerShown: false,
          presentation: 'modal',
          animation: 'slide_from_bottom'
        }}
      />
      <RootStack.Screen 
        name="Cart" 
        component={CartScreen}
        options={{
          title: 'Shopping Cart',
          headerStyle: {
            backgroundColor: '#0F0F0F',
          },
          headerTintColor: '#FFF',
          headerTitleStyle: {
            fontWeight: '600',
          },
        }}
      />
      <RootStack.Screen 
        name="MainTabs" 
        component={MainTabs} 
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  );
};

// Main Routes Component
const Routes = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default Routes;
