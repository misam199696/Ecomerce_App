import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar, useColorScheme } from 'react-native';
import { CartProvider } from './src/context/CartContext';
import Routes from './src/screens/routes';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <CartProvider>
        <Routes />
      </CartProvider>
    </SafeAreaProvider>
  );
}

export default App;
