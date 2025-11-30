import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { getIcon } from '../utils/assets';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleGetCode = () => {
    console.log('Getting code:', email);
    // navigation.navigate('Verification');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* BACK BUTTON */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Image source={getIcon('back')} style={styles.backIcon} />
        </TouchableOpacity>

        {/* TITLE */}
        <Text style={styles.title}>Forgot Password</Text>

       

        {/* EMAIL INPUT */}
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>
           Enter Email address <Text style={styles.required}>*</Text>
          </Text>

          <TextInput
            style={styles.input}
            placeholder="e.g. sean@gmail.com"
            placeholderTextColor="#777"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* BUTTON */}
        <TouchableOpacity
          style={[styles.getCodeButton, !email && styles.buttonDisabled]}
          disabled={!email}
          onPress={handleGetCode}
        >
          <Text style={styles.getCodeText}>Get Code</Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#000',
    paddingHorizontal: 24,
    paddingTop: 50,
    
  },

  /* BACK BUTTON */
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  backIcon: {
    width: 22,
    height: 22,
    tintColor: '#fff',
  },

  /* TITLE */
  title: {
    color: '#fff',
    fontSize: 28,
    fontFamily: 'serif',
    textAlign: 'center',
    marginBottom: -4,
  },

  /* DESCRIPTION */
  description: {
    color: '#aaa',
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 35,
  },

  /* INPUT */
  inputWrapper: {
    marginBottom: 30,
    marginTop: 50,
  },
  label: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  required: {
    color: 'red',
  },
  input: {
    backgroundColor: '#121212',
    borderRadius: 10,
    padding: 16,
    color: '#fff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#c4c0c0ff',
  },

  /* BUTTON */
  getCodeButton: {
    backgroundColor: '#E7B866',
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#444',
    opacity: 0.6,
  },
  getCodeText: {
    color: '#000',
    fontSize: 17,
    fontWeight: '700',
  },
});

export default ForgotPasswordScreen;
