import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar, useColorScheme } from 'react-native';
import { OrdersProvider } from './src/context/OrdersContext';
import { CartProvider } from './src/context/CartContext';
import Routes from './src/screens/routes';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <CartProvider>
        <OrdersProvider>
          <Routes />
        </OrdersProvider>
      </CartProvider>
    </SafeAreaProvider>
  );
}

export default App;
