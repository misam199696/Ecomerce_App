import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  FlatList, 
  SafeAreaView,
  StatusBar,
  Dimensions,
  Animated
} from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 32; // Screen width minus padding

// --- Mock Data ---

const HERO_BANNERS = [
  { 
    id: '1', 
    title: 'Your Luxury Night Starts Here', 
    img: require('../assets/icons/guide1.png') 
  },
  { 
    id: '2', 
    title: 'Exclusive VIP Experiences', 
    img: require('../assets/icons/guide2.png') 
  },
  { 
    id: '3', 
    title: 'Unforgettable Memories', 
    img: require('../assets/icons/guide3.png') 
  },
];

const SERVICES = [
  { id: '1', title: 'Birthday Queens', sub: 'Birthday Celebration', img: require('../assets/icons/guide1.png')  },
  { id: '2', title: 'Bachelor Party', sub: 'Party Celebration', img: require('../assets/icons/guide2.png') },
  { id: '3', title: 'Girls Trip', sub: 'Birthday Celebration', img: require('../assets/icons/guide3.png') },
];

const EXPERIENCES = [
  { id: '1', title: 'Birthday Party', loc: 'Las Vegas', img: require('../assets/icons/guide1.png') },
  { id: '2', title: 'Bachelor Party', loc: 'Chicago', img: require('../assets/icons/guide2.png') },
  { id: '3', title: 'Mixed Group', loc: 'New York', img: require('../assets/icons/guide3.png') },
];

const PARTNERS = [
  { id: '1', img: require('../assets/icons/services.png') }, 
  { id: '2', img: require('../assets/icons/services.png') },
  { id: '3', img: require('../assets/icons/services.png') },
];

const TESTIMONIALS = [
  { 
    id: '1', 
    text: "We came to Miami for a girls trip with no plan... after getting in contact with Leon and his team we were set with a full itinerary!",
    name: 'Katya K', 
    detail: 'Birthday Party, Las Vegas',
    avatar: require('../assets/icons/guide1.png')
  },
  { 
    id: '2', 
    text: "Absolutely the best service imaginable. The yacht was pristine and the staff was incredibly attentive.",
    name: 'Sarah M', 
    detail: 'Bachelorette, Miami',
    avatar: require('../assets/icons/guide1.png')
  },
];

// --- Components ---

const SectionHeader = ({ title }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <Image 
      source={{ uri: 'https://img.icons8.com/ios-glyphs/30/ffffff/chevron-right.png' }} 
      style={styles.arrowIcon} 
    />
  </View>
);

const Home = ({ navigation }) => {
  // State for the slider
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);

  // Logic to calculate which slide is active
  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / CARD_WIDTH);
    setActiveBannerIndex(index);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      
      {/* Top Header Label */}
      <View style={styles.topLabelContainer}>
        <Text style={styles.topLabel}>Home</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Navigation Bar */}
        <View style={styles.navBar}>
          <View>
            <Image 
                 source={require('../assets/icons/splash.png')} 
                 style={styles.image}
                 resizeMode="contain"
               />
          </View>
          
          <View style={styles.iconRow}>
            {/* These are still URLs, so we keep { uri: ... } here */}
            <Image source={{ uri: 'https://img.icons8.com/ios/50/e5c265/search--v1.png' }} style={styles.navIcon} />
            <Image source={{ uri: 'https://img.icons8.com/ios/50/e5c265/appointment-reminders.png' }} style={styles.navIcon} />
            <Image source={{ uri: 'https://img.icons8.com/ios/50/e5c265/user--v1.png' }} style={styles.navIcon} />
          </View>
        </View>

        {/* --- HERO SLIDER SECTION START --- */}
        <View style={styles.heroWrapper}>
          <FlatList
            data={HERO_BANNERS}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            onScroll={handleScroll}
            scrollEventThrottle={16} 
            renderItem={({ item }) => (
              <View style={styles.heroContainer}>
                {/* FIXED: Removed {uri: ...} */}
                <Image 
                  source={item.img} 
                  style={styles.heroImage} 
                  resizeMode="cover"
                />
                <View style={styles.heroOverlay}>
                  <Text style={styles.heroText}>{item.title}</Text>
                </View>
              </View>
            )}
          />

          {/* Dynamic Pagination Dots */}
          <View style={styles.paginationRow}>
            {HERO_BANNERS.map((_, index) => (
              <View 
                key={index} 
                style={[
                  styles.dot, 
                  activeBannerIndex === index ? styles.activeDot : null
                ]} 
              />
            ))}
          </View>
        </View>
        {/* --- HERO SLIDER SECTION END --- */}

        {/* Section 1: Our Services */}
        <SectionHeader title="Our Services" />
        <FlatList
          horizontal
          data={SERVICES}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <View style={styles.cardContainer}>
              {/* FIXED: Removed {uri: ...} */}
              <Image source={item.img} style={styles.serviceImage} />
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardSub}>{item.sub}</Text>
            </View>
          )}
        />

        {/* Section 2: Our Experiences */}
        <SectionHeader title="Our Experiences" />
        <FlatList
          horizontal
          data={EXPERIENCES}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <View style={styles.experienceCardContainer}>
              {/* FIXED: Removed {uri: ...} */}
              <Image source={item.img} style={styles.experienceImage} />
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardSub}>{item.loc}</Text>
            </View>
          )}
        />

        {/* Section 3: Partners/Services Logos */}
        <SectionHeader title="Our Services" />
        <FlatList
          horizontal
          data={PARTNERS}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
           
              <Image 
                source={item.img} 
                style={styles.partnerLogo} 
                resizeMode="contain" 
              />
            // </View>
          )}
        />

        {/* Section 4: Testimonials */}
        <SectionHeader title="Testimonials" />
        <FlatList
          horizontal
          data={TESTIMONIALS}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <View style={styles.testimonialCard}>
              <Text style={styles.testimonialText} numberOfLines={6}>
                "{item.text}"
              </Text>
              <View style={styles.testimonialUserRow}>
                {/* FIXED: Removed {uri: ...} */}
                <Image source={item.avatar} style={styles.avatar} />
                <View>
                  <Text style={styles.userName}>{item.name}</Text>
                  <Text style={styles.userDetail}>{item.detail}</Text>
                </View>
              </View>
            </View>
          )}
        />

        <View style={{ height: 50 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
  topLabelContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 5,
  },
  topLabel: {
    color: '#888',
    fontSize: 24,
    fontWeight: '600',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
   image: {
    width: 150,
    height: 30,
  },
  logoText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  logoSubText: {
    color: '#888',
    fontSize: 8,
  },
  iconRow: {
    flexDirection: 'row',
  },
  navIcon: {
    width: 22,
    height: 22,
    marginLeft: 15,
    tintColor: '#CFB53B', 
  },
  
  // --- HERO SLIDER STYLES ---
  heroWrapper: {
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 10,
  },
  heroContainer: {
    width: CARD_WIDTH, // Fixed width for paging
    height: 200,
    marginHorizontal: 16, // Center the card visually within paging logic
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.3)' 
  },
  heroText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'serif', 
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  paginationRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#444',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#CFB53B',
  },

  // Headers
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  arrowIcon: {
    width: 15,
    height: 15,
    tintColor: 'white',
  },
  listContainer: {
    paddingLeft: 16,
  },

  // Services Cards
  cardContainer: {
    marginRight: 15,
    width: 130,
  },
  serviceImage: {
    width: 130,
    height: 130,
    borderRadius: 12,
    marginBottom: 8,
  },
  cardTitle: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  cardSub: {
    color: '#888',
    fontSize: 11,
    marginTop: 2,
  },

  // Experience Cards
  experienceCardContainer: {
    marginRight: 15,
    width: 130,
  },
  experienceImage: {
    width: 130,
    height: 160,
    borderRadius: 12,
    marginBottom: 8,
  },

  // Partner Logos
  partnerContainer: {
    // marginRight: 10,
    // alignItems: "flex-start",
    // justifyContent: "flex-start",
    backgroundColor: '#1A1A1A',
    // padding: 10,
    borderRadius: 10,
    // width: 120,
    // height: 60,
  },
  partnerLogo: {
    width: 160,
    height: 150,
    // tintColor: '#CFB53B', 
  },

  // Testimonials
  testimonialCard: {
    backgroundColor: '#1E1E1E',
    width: 280,
    borderRadius: 12,
    padding: 16,
    marginRight: 15,
  },
  testimonialText: {
    color: '#DDD',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 15,
  },
  testimonialUserRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  userName: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
  },
  userDetail: {
    color: '#888',
    fontSize: 11,
  },
});

export default Home;