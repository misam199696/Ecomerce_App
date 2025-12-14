import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  SafeAreaView,
  StatusBar,
} from 'react-native';

const CheckoutScreen = ({ navigation, route }) => {
  const { cartTotal } = route.params || { cartTotal: 0 };
  
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState({
    fullName: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
  });
  
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  
  const handleNext = () => {
    if (step === 1) {
      // Basic validation for address
      if (!address.fullName || !address.phone || !address.addressLine1 || !address.city || !address.state || !address.postalCode) {
        Alert.alert('Missing Information', 'Please fill in all required fields');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      // Proceed to order confirmation
      navigation.navigate('OrderConfirmation', { 
        address,
        paymentMethod,
        orderTotal: cartTotal,
        cartItems: route.params?.cartItems || []
      });
    }
  };

  const renderAddressForm = () => (
    <View style={styles.formContainer}>
      <Text style={styles.sectionTitle}>Shipping Address</Text>
      
      <Text style={styles.label}>Full Name *</Text>
      <TextInput
        style={styles.input}
        value={address.fullName}
        onChangeText={(text) => setAddress({...address, fullName: text})}
        placeholder="Enter your full name"
      />
      
      <Text style={styles.label}>Phone Number *</Text>
      <TextInput
        style={styles.input}
        value={address.phone}
        onChangeText={(text) => setAddress({...address, phone: text})}
        placeholder="Enter your phone number"
        keyboardType="phone-pad"
      />
      
      <Text style={styles.label}>Address Line 1 *</Text>
      <TextInput
        style={styles.input}
        value={address.addressLine1}
        onChangeText={(text) => setAddress({...address, addressLine1: text})}
        placeholder="Street address"
      />
      
      <Text style={styles.label}>Address Line 2</Text>
      <TextInput
        style={styles.input}
        value={address.addressLine2}
        onChangeText={(text) => setAddress({...address, addressLine2: text})}
        placeholder="Apartment, suite, etc. (optional)"
      />
      
      <View style={styles.row}>
        <View style={[styles.column, { marginRight: 10 }]}>
          <Text style={styles.label}>City *</Text>
          <TextInput
            style={styles.input}
            value={address.city}
            onChangeText={(text) => setAddress({...address, city: text})}
            placeholder="City"
          />
        </View>
        
        <View style={[styles.column, { marginLeft: 10 }]}>
          <Text style={styles.label}>State *</Text>
          <TextInput
            style={styles.input}
            value={address.state}
            onChangeText={(text) => setAddress({...address, state: text})}
            placeholder="State"
          />
        </View>
      </View>
      
      <Text style={styles.label}>Postal Code *</Text>
      <TextInput
        style={styles.input}
        value={address.postalCode}
        onChangeText={(text) => setAddress({...address, postalCode: text})}
        placeholder="Postal code"
        keyboardType="number-pad"
      />
    </View>
  );

  const renderPaymentMethod = () => (
    <View style={styles.formContainer}>
      <Text style={styles.sectionTitle}>Payment Method</Text>
      
      <TouchableOpacity 
        style={[styles.paymentOption, paymentMethod === 'credit_card' && styles.paymentOptionSelected]}
        onPress={() => setPaymentMethod('credit_card')}
      >
        <Text style={styles.paymentText}>💳 Credit/Debit Card</Text>
        {paymentMethod === 'credit_card' && <View style={styles.radioSelected} />}
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.paymentOption, paymentMethod === 'cash' && styles.paymentOptionSelected]}
        onPress={() => setPaymentMethod('cash')}
      >
        <Text style={styles.paymentText}>💰 Cash on Delivery</Text>
        {paymentMethod === 'cash' && <View style={styles.radioSelected} />}
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.paymentOption, paymentMethod === 'paypal' && styles.paymentOptionSelected]}
        onPress={() => setPaymentMethod('paypal')}
      >
        <Text style={styles.paymentText}>🔵 PayPal</Text>
        {paymentMethod === 'paypal' && <View style={styles.radioSelected} />}
      </TouchableOpacity>
      
      <View style={styles.orderSummary}>
        <Text style={styles.summaryTitle}>Order Summary</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>Subtotal</Text>
          <Text style={styles.summaryAmount}>${cartTotal.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>Shipping</Text>
          <Text style={styles.summaryAmount}>$0.00</Text>
        </View>
        <View style={[styles.summaryRow, { marginTop: 10, borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 10 }]}>
          <Text style={[styles.summaryText, { fontWeight: 'bold' }]}>Total</Text>
          <Text style={[styles.summaryAmount, { fontWeight: 'bold' }]}>${cartTotal.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.steps}>
          <View style={[styles.step, step >= 1 && styles.activeStep]}>
            <Text style={[styles.stepText, step >= 1 && styles.activeStepText]}>1</Text>
            <Text style={[styles.stepLabel, step >= 1 && styles.activeStepLabel]}>Address</Text>
          </View>
          <View style={[styles.connector, step >= 2 && styles.activeConnector]} />
          <View style={[styles.step, step >= 2 && styles.activeStep]}>
            <Text style={[styles.stepText, step >= 2 && styles.activeStepText]}>2</Text>
            <Text style={[styles.stepLabel, step >= 2 && styles.activeStepLabel]}>Payment</Text>
          </View>
        </View>
        
        {step === 1 ? renderAddressForm() : renderPaymentMethod()}
      </ScrollView>
      
      <View style={styles.footer}>
        {step > 1 && (
          <TouchableOpacity 
            style={[styles.button, styles.backButton]}
            onPress={() => setStep(step - 1)}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity 
          style={[styles.button, styles.nextButton]}
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>
            {step === 2 ? 'Confirm Order' : 'Continue to Payment'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  steps: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  step: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeStep: {
    backgroundColor: '#E7B866',
  },
  stepText: {
    fontSize: 16,
    color: '#999',
    fontWeight: 'bold',
  },
  activeStepText: {
    color: '#fff',
  },
  stepLabel: {
    position: 'absolute',
    bottom: -24,
    fontSize: 12,
    color: '#999',
    width: 80,
    textAlign: 'center',
  },
  activeStepLabel: {
    color: '#E7B866',
    fontWeight: '600',
  },
  connector: {
    height: 2,
    width: 80,
    backgroundColor: '#f0f0f0',
  },
  activeConnector: {
    backgroundColor: '#E7B866',
  },
  formContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  paymentOptionSelected: {
    borderColor: '#E7B866',
    backgroundColor: 'rgba(231, 184, 102, 0.1)',
  },
  paymentText: {
    fontSize: 16,
    color: '#333',
  },
  radioSelected: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#E7B866',
  },
  orderSummary: {
    marginTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 16,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 14,
    color: '#666',
  },
  summaryAmount: {
    fontSize: 14,
    color: '#333',
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    backgroundColor: '#f5f5f5',
    marginRight: 10,
  },
  nextButton: {
    backgroundColor: '#E7B866',
  },
  backButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CheckoutScreen;
