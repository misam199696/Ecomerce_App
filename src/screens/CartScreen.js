import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useCart } from '../context/CartContext';

const CartScreen = ({ navigation }) => {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handlePlaceOrder = () => {
    setIsCheckingOut(true);
    // Simulate API call for order placement
    setTimeout(() => {
      clearCart();
      setIsCheckingOut(false);
      Alert.alert(
        'Order Placed!',
        'Your order has been placed successfully!',
        [
          { 
            text: 'OK', 
            onPress: () => navigation.navigate('Home')
          }
        ]
      );
    }, 1500);
  };

  if (cart.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Your cart is empty</Text>
        <TouchableOpacity 
          style={styles.continueShoppingButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.continueShoppingText}>Continue Shopping</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.itemsContainer}>
        {cart.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <Image source={item.image} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
              <Text style={styles.itemPrice}>${item.price}</Text>
              
              <View style={styles.quantityContainer}>
                <TouchableOpacity 
                  style={styles.quantityButton}
                  onPress={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                
                <Text style={styles.quantityText}>{item.quantity}</Text>
                
                <TouchableOpacity 
                  style={styles.quantityButton}
                  onPress={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.removeButton}
                  onPress={() => removeFromCart(item.id)}
                >
                  <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total Items:</Text>
          <Text style={styles.summaryValue}>{cart.length}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total Amount:</Text>
          <Text style={[styles.summaryValue, styles.totalAmount]}>${cartTotal.toFixed(2)}</Text>
        </View>
        
        <TouchableOpacity 
          style={[styles.checkoutButton, isCheckingOut && styles.checkoutButtonDisabled]}
          onPress={handlePlaceOrder}
          disabled={isCheckingOut}
        >
          <Text style={styles.checkoutButtonText}>
            {isCheckingOut ? 'Placing Order...' : 'Place Order'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0F0F0F',
    padding: 20,
  },
  emptyText: {
    color: '#FFF',
    fontSize: 18,
    marginBottom: 20,
  },
  continueShoppingButton: {
    backgroundColor: '#E7B866',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  continueShoppingText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 16,
  },
  itemsContainer: {
    flex: 1,
    padding: 16,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  itemPrice: {
    color: '#E7B866',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#333',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 20,
  },
  quantityText: {
    color: '#FFF',
    fontSize: 16,
    marginHorizontal: 15,
    minWidth: 20,
    textAlign: 'center',
  },
  removeButton: {
    marginLeft: 'auto',
    padding: 6,
  },
  removeButtonText: {
    color: '#FF4444',
    fontSize: 14,
    fontWeight: '600',
  },
  summaryContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#333',
    backgroundColor: '#0F0F0F',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    color: '#AAA',
    fontSize: 16,
  },
  summaryValue: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  totalAmount: {
    color: '#E7B866',
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#E7B866',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  checkoutButtonDisabled: {
    backgroundColor: '#E7B866AA',
  },
  checkoutButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CartScreen;
