import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      // Navigate to Guide screen instead of MainTabs
      navigation.replace('Guide');
    }, 2000); // Reduced time for better UX

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.welcomeText}>Xihawks</Text>
      <Text style={styles.titleText}>Tech Shop</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  line: {
    width: 40,
    height: 1,
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'serif',
    marginBottom: 8,
  },
  titleText: {
    fontSize: 24,
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'serif',
    fontWeight: 'bold',
  },
});

export default SplashScreen;
