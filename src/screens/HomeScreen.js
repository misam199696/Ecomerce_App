import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';

const { width } = Dimensions.get('window');
const BANNER_WIDTH = width;

/* =======================
   SAMPLE DATA
======================= */

const BANNERS = [
  { id: '1', image: require('../assets/icons/guide1.png') },
  { id: '2', image: require('../assets/icons/guide2.png') },
  { id: '3', image: require('../assets/icons/guide3.png') },
];


const CATEGORIES = [
  'All',
  'Laptops',
  'Gaming',
  'Accessories',
  'Audio',
  'Storage',
];

const PRODUCTS = [
  {
    id: '1',
    name: 'MacBook Pro M2 14-inch',
    category: 'Laptops',
    price: 2499,
    rating: 4.8,
    image: require('../assets/icons/m2.png'),
  },
  {
    id: '2',
    name: 'Gaming Mechanical Keyboard RGB',
    category: 'Gaming',
    price: 179,
    rating: 4.5,
    image: require('../assets/icons/keyboard.png'),
  },
  {
    id: '3',
    name: 'Sony WH-1000XM5 Headphones',
    category: 'Audio',
    price: 399,
    rating: 4.9,
    image: require('../assets/icons/headphone.png'),
  },
  {
    id: '4',
    name: 'Logitech MX Master 3 Mouse',
    category: 'Accessories',
    price: 129,
    rating: 4.7,
    image: require('../assets/icons/m.png'),
  },
  {
    id: '5',
    name: 'Samsung 2TB Portable SSD',
    category: 'Storage',
    price: 299,
    rating: 4.6,
    image: require('../assets/icons/samsung.png'),
  },
  {
    id: '6',
    name: 'ASUS ROG Gaming Laptop',
    category: 'Gaming',
    price: 1899,
    rating: 4.4,
    image: require('../assets/icons/asus.png'),
  },
  {
    id: '7',
    name: 'USB-C Hub Multiport Adapter',
    category: 'Accessories',
    price: 89,
    rating: 4.3,
    image: require('../assets/icons/hub.png'),
  },
  {
    id: '8',
    name: 'AirPods Pro 2nd Gen',
    category: 'Audio',
    price: 249,
    rating: 4.8,
    image: require('../assets/icons/ipod.png'),
  },
];

const PARTNERS = [
  require('../assets/icons/guide1.png'),
  require('../assets/icons/guide2.png'),
  require('../assets/icons/guide3.png'),
];

const TESTIMONIALS = [
  {
    id: '1',
    name: 'Alex Johnson',
    text: 'Amazing quality products and super fast delivery.',
    date: 'Aug 2025',
    avatar: require('../assets/icons/guide1.png'),
  },
  {
    id: '2',
    name: 'Emily Carter',
    text: 'Customer support was very helpful. Highly recommended!',
    date: 'Jul 2025',
    avatar: require('../assets/icons/guide1.png'),
  },
  {
    id: '3',
    name: 'Michael Lee',
    text: 'Best tech store I’ve used so far.',
    date: 'Jun 2025',
    avatar: require('../assets/icons/guide1.png'),
  },
];

/* =======================
   MAIN COMPONENT
======================= */

const HomeScreen = ({ navigation }) => {
  const bannerRef = useRef(null);

  const [activeBanner, setActiveBanner] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = PRODUCTS.filter(item => {
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#E7B866" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
       

        <TextInput
          placeholder="Search products..."
          placeholderTextColor="#999"
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />

      
      </View>

      <FlatList
        ListHeaderComponent={
          <>
            {/* HERO CAROUSEL */}
            <FlatList
              ref={bannerRef}
              data={BANNERS}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id}
              onMomentumScrollEnd={e =>
                setActiveBanner(
                  Math.round(e.nativeEvent.contentOffset.x / BANNER_WIDTH)
                )
              }
              renderItem={({ item }) => (
                <Image source={item.image} style={styles.banner} />
              )}
            />

            {/* DOTS */}
            <View style={styles.dotsRow}>
              {BANNERS.map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.dot,
                    activeBanner === i && styles.activeDot,
                  ]}
                />
              ))}
            </View>

            {/* CATEGORIES */}
            <FlatList
              data={CATEGORIES}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item}
              style={styles.categoryList}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => setSelectedCategory(item)}
                  style={[
                    styles.categoryChip,
                    selectedCategory === item &&
                      styles.categoryChipActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      selectedCategory === item &&
                        styles.categoryTextActive,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </>
        }
        data={filteredProducts}
        numColumns={2}
        keyExtractor={item => item.id}
        columnWrapperStyle={styles.productRow}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.productCard}
            onPress={() =>
              navigation.navigate('ProductDetails', { product: item })
            }
          >
            <Image source={item.image} style={styles.productImage} />

            <Text style={styles.productCategory}>{item.category}</Text>

            <Text style={styles.productName} numberOfLines={2}>
              {item.name}
            </Text>

            <Text style={styles.rating}>⭐ {item.rating}</Text>

            <View style={styles.priceRow}>
              <Text style={styles.price}>${item.price}</Text>
              <TouchableOpacity
                onPress={() => setCartCount(prev => prev + 1)}
              >
                <Text style={styles.addBtn}>＋</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
  )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No products found</Text>
        }
        ListFooterComponent={
        <>

            {/* TESTIMONIALS */}
            <Text style={styles.sectionTitle}>Testimonials</Text>
            <FlatList
              data={TESTIMONIALS}
              horizontal
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <View style={styles.testimonialCard}>
                  <Text style={styles.rating}>⭐⭐⭐⭐⭐</Text>
                  <Text style={styles.testimonialText}>
                    {item.text}
                  </Text>
                  <View style={styles.userRow}>
                    <Image
                      source={item.avatar}
                      style={styles.avatar}
                    />
                    <View>
                      <Text style={styles.userName}>
                        {item.name}
                      </Text>
                      <Text style={styles.date}>
                        {item.date}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            />
          </>
        }
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

/* =======================
   STYLES
======================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  searchInput: {
    flex: 1,
    marginHorizontal: 12,
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    paddingHorizontal: 12,
    color: '#FFF',
    height: 40,
  },
  cartBtn: {
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
    paddingHorizontal: 6,
  },
  cartBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  banner: {
    width,
    height: 200,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 8,
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: '#555',
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#E7B866',
  },
  categoryList: {
    paddingHorizontal: 16,
    marginVertical: 12,
  },
  categoryChip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#1E1E1E',
    borderRadius: 20,
    marginRight: 8,
  },
  categoryChipActive: {
    backgroundColor: '#E7B866',
  },
  categoryText: {
    color: '#AAA',
  },
  categoryTextActive: {
    color: '#000',
    fontWeight: '600',
  },
  productRow: {
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  productCard: {
    backgroundColor: '#1A1A1A',
    width: '48%',
    borderRadius: 12,
    padding: 10,
    marginBottom: 16,
  },
  productImage: {
    width: '100%',
    height: 120,
    resizeMode: 'contain',
  },
  productCategory: {
    color: '#999',
    fontSize: 11,
    marginTop: 6,
  },
  productName: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
    marginVertical: 4,
  },
  rating: {
    color: '#E7B866',
    fontSize: 12,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  price: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  addBtn: {
    fontSize: 20,
    color: '#E7B866',
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 40,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    margin: 16,
  },
  partnerLogo: {
    width: 80,
    height: 40,
    marginHorizontal: 12,
    resizeMode: 'contain',
  },
  testimonialCard: {
    backgroundColor: '#1E1E1E',
    width: 260,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 8,
  },
  testimonialText: {
    color: '#DDD',
    fontSize: 13,
    marginVertical: 8,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
  },
  userName: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '600',
  },
  date: {
    color: '#888',
    fontSize: 11,
  },
});
