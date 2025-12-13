import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { getIcon } from '../utils/assets';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainTabs' }],
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.innerContainer}>

        {/* TITLE */}
        <Text style={styles.titleTop}>Welcome to</Text>
        <Text style={styles.titleBottom}>Xihawks Tech Shop</Text>

        {/* EMAIL FIELD */}
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Email address <Text style={{ color: 'red' }}>*</Text></Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. sean@gmail."
            placeholderTextColor="#6c6c6c"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* PASSWORD FIELD */}
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Password <Text style={{ color: 'red' }}>*</Text></Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#6c6c6c"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity 
            style={{ alignSelf: 'flex-end', marginTop: 6 }}
            onPress={() => navigation.navigate('ForgotPassword')}
          >
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/* LOGIN BUTTON */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity>

        {/* OR DIVIDER */}
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.divider} />
        </View>

        {/* SOCIAL LOGIN */}
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Image source={getIcon('facebook')} style={styles.socialIcon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton}>
            <Image source={getIcon('google')} style={styles.socialIcon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton}>
            <Image source={getIcon('apple')} style={styles.socialIcon} />
          </TouchableOpacity>
        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.footerLink}>Create an account</Text>
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#000',
    paddingHorizontal: 10,
    paddingTop: 20,
  },

  innerContainer: {
    paddingTop: 40,
  },

  // TITLES
  titleTop: {
    color: '#fff',
    fontSize: 28,
    fontFamily: 'serif',
    textAlign: 'center',
    marginBottom: -4,
  },
  titleBottom: {
    color: '#fff',
    fontSize: 32,
    fontFamily: 'serif',
    textAlign: 'center',
    marginBottom: 40,
  },

  // INPUT FIELDS
  inputWrapper: {
    marginBottom: 22,
  },
  label: {
    color: '#fff',
    marginBottom: 8,
    fontSize: 16,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#161616',
    borderRadius: 12,
    padding: 16,
    color: '#ffffffff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#c4c0c0ff',
  },
  forgotPassword: {
    color: '#c4c0c0ff',
    fontSize: 14,
  },

  // LOGIN BUTTON
  loginButton: {
    backgroundColor: '#E7B866',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#000',
    fontSize: 17,
    fontWeight: 'bold',
  },

  // DIVIDER
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#333',
  },
  orText: {
    color: '#aaa',
    paddingHorizontal: 12,
    fontSize: 16,
  },

  // SOCIAL ICON BUTTONS
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
  },
  socialButton: {
    width: 54,
    height: 54,
    borderRadius: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  socialIcon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },

  // FOOTER
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerText: {
    color: '#999',
    fontSize: 14,
  },
  footerLink: {
    color: '#E7B866',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default LoginScreen;
