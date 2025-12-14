import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrdersContext';

const OrderConfirmationScreen = ({ route, navigation }) => {
  const { address, paymentMethod, orderTotal, cartItems } = route.params || {};
  const { clearCart } = useCart();
  const { addOrder } = useOrders();
  
  // Process order when component mounts
  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      // Add order to orders history
      addOrder({
        items: cartItems,
        total: orderTotal,
        address,
        paymentMethod,
        orderNumber,
        status: 'Processing',
        orderDate: new Date().toISOString()
      });
      
      // Clear the cart
      clearCart();
    }
  }, []);
  
  // Generate order number
  const orderNumber = '#' + Math.random().toString(36).substr(2, 9).toUpperCase();
  
  // Calculate delivery date (3-5 days from now)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + Math.floor(Math.random() * 3) + 3);
  const formattedDate = deliveryDate.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Image 
              source={require('../assets/icons/services.png')} 
              style={styles.successIcon} 
            />
          </View>
          
          <Text style={styles.title}>Order Placed Successfully!</Text>
          <Text style={styles.orderNumber}>Order #{orderNumber}</Text>
          
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Delivery Address</Text>
            <Text style={styles.infoText}>{address?.fullName}</Text>
            <Text style={styles.infoText}>{address?.addressLine1}</Text>
            {address?.addressLine2 ? <Text style={styles.infoText}>{address.addressLine2}</Text> : null}
            <Text style={styles.infoText}>
              {[address?.city, address?.state, address?.postalCode].filter(Boolean).join(', ')}
            </Text>
            <Text style={styles.infoText}>Phone: {address?.phone}</Text>
          </View>
          
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Payment Method</Text>
            <Text style={styles.infoText}>
              {paymentMethod === 'cash' ? 'Cash on Delivery' : 
               paymentMethod === 'credit_card' ? 'Credit/Debit Card' : 
               paymentMethod === 'paypal' ? 'PayPal' : 'N/A'}
            </Text>
            <Text style={[styles.infoText, { marginTop: 8 }]}>
              <Text style={{ fontWeight: 'bold' }}>Order Total: </Text>
              ${orderTotal?.toFixed(2) || '0.00'}
            </Text>
          </View>
          
          <View style={styles.deliveryInfo}>
            <Text style={styles.deliveryText}>Estimated Delivery:</Text>
            <Text style={styles.deliveryDate}>{formattedDate}</Text>
          </View>
          
          <Text style={styles.thankYouText}>
            Thank you for shopping with us! We'll send you a confirmation email with your order details.
          </Text>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.continueShoppingBtn}
          onPress={() => {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'MainTabs' }],
              })
            );
          }}
        >
          <Text style={styles.continueShoppingText}>Continue Shopping</Text>
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
  },
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    paddingBottom: 100, // Add padding to account for fixed footer
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 20,
  },
  successIcon: {
    width: 50,
    height: 50,
    tintColor: '#4CAF50',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: '#333',
  },
  orderNumber: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  infoCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    marginBottom: 16,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 6,
    lineHeight: 20,
  },
  deliveryInfo: {
    backgroundColor: '#F0F7FF',
    padding: 16,
    borderRadius: 8,
    width: '100%',
    marginBottom: 16,
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#4A90E2',
  },
  deliveryText: {
    fontSize: 14,
    color: '#4A90E2',
    marginBottom: 4,
    fontWeight: '500',
  },
  deliveryDate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A5F7A',
  },
  thankYouText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  continueShoppingBtn: {
    backgroundColor: '#E7B866',
    paddingVertical: 14,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
  },
  continueShoppingText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '600',
  },
  trackOrderBtn: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E7B866',
    paddingVertical: 14,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
  },
  trackOrderText: {
    color: '#E7B866',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '600',
  },
});

export default OrderConfirmationScreen;
