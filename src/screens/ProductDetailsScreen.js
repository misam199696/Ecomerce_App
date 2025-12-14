import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useCart } from '../context/CartContext';

const { width } = Dimensions.get('window');

export default function ProductDetailsScreen({ route, navigation }) {
  const { product } = route.params;
  const { addToCart, cart, cartCount } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    // Check if product is already in cart
    const cartItem = cart.find(item => item.id === product.id);
    setIsInCart(!!cartItem);
    if (cartItem) {
      setQuantity(cartItem.quantity);
    }
  }, [cart, product.id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  // Set header options
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity 
          onPress={() => navigation.navigate('Cart')}
          style={styles.cartIconContainer}
        >
          <Image 
            source={require('../assets/icons/services.png')} 
            style={styles.cartIcon} 
          />
          {cartCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      ),
    });
  }, [navigation, cartCount]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Details</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.imageContainer}>
        <Image source={product.image} style={styles.productImage} />
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{product.category}</Text>
        </View>
        
        <Text style={styles.productName}>{product.name}</Text>
        
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>⭐ {product.rating}</Text>
          <Text style={styles.reviews}>(24 reviews)</Text>
        </View>
        
        <Text style={styles.price}>${product.price}</Text>
        
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>
          This is a detailed description of the {product.name}. It includes all the features and specifications 
          that you would need to know before making a purchase decision.
        </Text>
        
        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🔋</Text>
            <Text style={styles.featureText}>1 Year Warranty</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🚚</Text>
            <Text style={styles.featureText}>Free Shipping</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🔄</Text>
            <Text style={styles.featureText}>7-Day Returns</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity 
            style={styles.quantityButton}
            onPress={decrementQuantity}
            disabled={isInCart}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity 
            style={styles.quantityButton}
            onPress={incrementQuantity}
            disabled={isInCart}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity 
          style={[styles.addToCartButton, isInCart && styles.inCartButton]}
          onPress={isInCart ? () => navigation.navigate('Cart') : handleAddToCart}
        >
          <Text style={styles.addToCartText}>
            {isInCart ? 'View Cart' : 'Add to Cart'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cartIconContainer: {
    marginRight: 16,
    position: 'relative',
  },
  cartIcon: {
    width: 24,
    height: 24,
    tintColor: '#FFF',
  },
  cartBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#E7B866',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1E1E1E',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#FFF',
    fontSize: 20,
    marginTop: -2,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
  imageContainer: {
    width: '100%',
    height: width * 0.8,
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  detailsContainer: {
    padding: 20,
  },
  categoryBadge: {
    backgroundColor: '#E7B86622',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  categoryText: {
    color: '#E7B866',
    fontSize: 12,
    fontWeight: '600',
  },
  productName: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  rating: {
    color: '#E7B866',
    fontSize: 16,
    marginRight: 8,
  },
  reviews: {
    color: '#666',
    fontSize: 14,
  },
  price: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  description: {
    color: '#AAA',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 24,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    padding: 12,
    marginRight: 12,
    marginBottom: 12,
  },
  featureIcon: {
    marginRight: 8,
  },
  featureText: {
    color: '#FFF',
    fontSize: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#1E1E1E',
    backgroundColor: '#0F0F0F',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    padding: 8,
  },
  quantityButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 16,
  },
  addToCartButton: {
    backgroundColor: '#E7B866',
    borderRadius: 8,
    padding: 16,
    marginLeft: 12,
    alignItems: 'center',
    flex: 1,
  },
  inCartButton: {
    backgroundColor: '#4CAF50',
  },
  addToCartText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
});
