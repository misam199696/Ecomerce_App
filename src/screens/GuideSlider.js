import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: 1,
    title: 'Welcome to 1Royale',
    description: '1Royale brings you elite nightlife, events, and concierge services—all in one app.',
    image: require('../assets/icons/guide1.png')
  },
  {
    id: 2,
    title: 'Custom Experiences, Just for You',
    description: 'From bachelorettes to yacht cruises, choose your vibe—1Royale handles the rest.',
    image: require('../assets/icons/guide2.png')
  },
  {
    id: 3,
    title: 'Book with Confidence',
    description: 'Browse, book, and manage events with 24/7 support from our expert team.',
    image: require('../assets/icons/guide3.png')
  }
];

const GuideSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigation = useNavigation();

  const goToNextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      // Navigate to home when on last slide
      navigation.replace('Login');
    }
  };

  const goToPreviousSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const skipToHome = () => {
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
       
        <Text style={styles.slideNumber}>
          {currentSlide + 1}/{slides.length}
        </Text>
         <TouchableOpacity onPress={skipToHome}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.slideContainer}>
        <Image
          source={slides[currentSlide].image}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>{slides[currentSlide].title}</Text>
        <Text style={styles.description}>{slides[currentSlide].description}</Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.navigationContainer}>
          {currentSlide > 0 ? (
            <TouchableOpacity
              style={styles.prevButton}
              onPress={goToPreviousSlide}
            >
              <Text style={styles.prevButtonText}>Prev</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.prevButtonPlaceholder} />
          )}
          
          <View style={styles.dotsContainer}>
            {slides.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  currentSlide === index ? styles.activeDot : styles.inactiveDot
                ]}
              />
            ))}
          </View>
          
          <TouchableOpacity
            style={[styles.nextButton, currentSlide === slides.length - 1 && styles.getStartedButton]}
            onPress={goToNextSlide}
          >
            <Text style={styles.nextButtonText}>
              {'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 10,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 30,
    width: '100%',
  },
  skipText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',

  },
  slideNumber: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
  slideContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: width * 1,
    height: height * 0.4,
    marginBottom: 30,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  description: {
    color: '#999',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 24,
  },
  footer: {
    marginBottom: 30,
    paddingHorizontal: 16,
  },
  navigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  prevButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  prevButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
  prevButtonPlaceholder: {
    width: 80, // Same width as prevButton for consistent spacing
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#E7B866',
    width: 24,
  },
  inactiveDot: {
    backgroundColor: '#333',
    width: 8,
  },
  nextButton: {
    // backgroundColor: '#E7B866',
    paddingVertical: 12,
    // paddingHorizontal: 32,
    // borderRadius: 25,
    // minWidth: 150,
    alignItems: 'center',
  },
  getStartedButton: {
    // minWidth: 180,
  },
  nextButtonText: {
    color: '#ffffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  pagination: {
    display: 'none', // Hide the top pagination dots
  },
});

export default GuideSlider;
