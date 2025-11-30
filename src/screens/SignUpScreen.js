import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { getIcon } from '../utils/assets';

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainTabs' }],
    });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* TITLE */}
        <Text style={styles.title}>Sign Up</Text>

        {/* EMAIL */}
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>
            Email address <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. sean@gmail."
            placeholderTextColor="#777"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* PASSWORD */}
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>
            Password <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#777"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* CONFIRM PASSWORD */}
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>
            Confirm Password <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#777"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        {/* SIGN UP BUTTON */}
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity>

        {/* OR DIVIDER */}
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.or}>OR</Text>
          <View style={styles.divider} />
        </View>

        {/* SOCIAL ICONS */}
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

        {/* TERMS FOOTER */}
        <Text style={styles.termsText}>
          By signing up, you agree to the{' '}
          <Text style={styles.link}>Terms of Service</Text> and{' '}
          <Text style={styles.link}>Privacy Policy</Text>, including{' '}
          <Text style={styles.link}>Cookie Use</Text>.
        </Text>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#000',
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 40,
  },

  /* TITLE */
  title: {
    color: '#fff',
    fontSize: 32,
    fontFamily: 'serif',
    textAlign: 'center',
    marginBottom: 40,
    fontWeight: '600',
  },

  /* INPUT FIELDS */
  inputWrapper: {
    marginBottom: 20,
  },
  label: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  required: {
    color: 'red',
  },
  input: {
    backgroundColor: '#121212',
    borderRadius: 10,
    padding: 16,
    fontSize: 16,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#c4c0c0ff',
  },

  /* SIGN UP BUTTON */
  signUpButton: {
    backgroundColor: '#E7B866',
    borderRadius: 10,
    paddingVertical: 15,
    marginTop: 10,
    marginBottom: 25,
    alignItems: 'center',
  },
  signUpText: {
    color: '#000',
    fontSize: 17,
    fontWeight: '700',
  },

  /* OR DIVIDER */
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 25,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#333',
  },
  or: {
    color: '#ccc',
    fontSize: 14,
    marginHorizontal: 10,
    backgroundColor: '#000',
    paddingHorizontal: 6,
  },

  /* SOCIAL ICONS */
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  socialButton: {
    width: 56,
    height: 56,
    backgroundColor: '#fff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  socialIcon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },

  /* TERMS FOOTER */
  termsText: {
    color: '#999',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 21,
    paddingHorizontal: 10,
  },
  link: {
    color: '#E7B866',
    textDecorationLine: 'underline',
  },
});

export default SignUpScreen;
