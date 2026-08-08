import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Linking,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { theme } from '../theme';
import { RootStackParamList } from '../navigation/RootNavigator';

const { width, height } = Dimensions.get('window');

type NavProp = NativeStackNavigationProp<RootStackParamList>;

const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80',
    heading: 'Know before they show',
    subheading: 'Proactive and predictive animal care for healthier, happier lives',
  },
  {
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80',
    heading: 'Your Pet Deserves the Best',
    subheading: 'Real-time health monitoring so you never miss a moment that matters.',
  },
  {
    image: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=800&q=80',
    heading: 'Health Insights, Anytime',
    subheading: 'AI-powered alerts and wellness scores delivered straight to your phone.',
  },
];

const features = [
  {
    icon: '🔍',
    title: 'Pet Safety & Geo-Fencing',
    description: 'Advanced GPS tracking with geo-fencing technology to keep your pet safe.',
    color: '#22c55e',
  },
  {
    icon: '💚',
    title: 'Health Monitoring',
    description: 'Real-time health monitoring with vital data tracking.',
    color: '#3b82f6',
  },
  {
    icon: '📊',
    title: 'Data-Driven Insights',
    description: "Comprehensive data about your pet's activity, nutrition, and wellbeing.",
    color: '#f59e0b',
  },
  {
    icon: '🎯',
    title: 'Holistic Pet Care',
    description: 'Track activity levels, nutrition, playtime, and overall wellness.',
    color: '#ec4899',
  },
];

export default function LandingScreen() {
  const navigation = useNavigation<NavProp>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const goToNextSlide = () => {
    const next = (currentSlide + 1) % heroSlides.length;
    setCurrentSlide(next);
    scrollViewRef.current?.scrollTo({ x: next * width, animated: true });
  };

  const goToPrevSlide = () => {
    const prev = (currentSlide - 1 + heroSlides.length) % heroSlides.length;
    setCurrentSlide(prev);
    scrollViewRef.current?.scrollTo({ x: prev * width, animated: true });
  };

  const handleScroll = (event: any) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentSlide(slideIndex);
  };

  const openYouTube = () => {
    Linking.openURL('https://www.youtube.com/watch?v=J9BG0Ea3ccY');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <View style={styles.heroContainer}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScroll}
          style={styles.heroScroll}
        >
          {heroSlides.map((slide, index) => (
            <View key={index} style={[styles.heroSlide, { width }]}>
              <Image source={{ uri: slide.image }} style={styles.heroImage} />
              <View style={styles.heroOverlay} />
              <View style={styles.heroContent}>
                <View style={styles.logoContainer}>
                  <Text style={styles.logoText}>
                    <Text style={{ color: '#fff' }}>Ktinos</Text>
                    <Text style={{ color: theme.colors.primary.healthGreen }}>kare</Text>
                  </Text>
                </View>
                <Text style={styles.heroHeading}>{slide.heading}</Text>
                <Text style={styles.heroSubheading}>{slide.subheading}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Navigation Arrows */}
        <TouchableOpacity style={styles.arrowLeft} onPress={goToPrevSlide}>
          <Text style={styles.arrowText}>‹</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.arrowRight} onPress={goToNextSlide}>
          <Text style={styles.arrowText}>›</Text>
        </TouchableOpacity>

        {/* Dot Indicators */}
        <View style={styles.dotContainer}>
          {heroSlides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentSlide && styles.dotActive,
                { backgroundColor: index === currentSlide ? theme.colors.primary.healthGreen : 'rgba(255,255,255,0.5)' },
              ]}
            />
          ))}
        </View>

        {/* CTA Buttons on Hero */}
        <View style={styles.heroButtons}>
          <TouchableOpacity
            style={styles.btnPrimary}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.btnPrimaryText}>Get Started</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnSecondary} onPress={openYouTube}>
            <Text style={styles.btnSecondaryText}>▶ Watch Video</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Key Features Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>PROACTIVE ANIMAL CARE</Text>
        <Text style={styles.sectionSubtitle}>
          Pets naturally hide their pain until it worsens.
        </Text>
        <Text style={styles.sectionSubtitle}>
          Spot issues early — to prevent needless suffering & pain.
        </Text>

        <View style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureCard}>
              <View style={[styles.featureIconContainer, { backgroundColor: `${feature.color}20` }]}>
                <Text style={styles.featureIcon}>{feature.icon}</Text>
              </View>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>{feature.description}</Text>
              <View style={[styles.featureAccent, { backgroundColor: feature.color }]} />
            </View>
          ))}
        </View>
      </View>

      {/* Testimonials Section */}
      <View style={[styles.section, styles.testimonialsSection]}>
        <Text style={styles.sectionTitle}>What Pet Owners Say</Text>
        <View style={styles.testimonialCard}>
          <Text style={styles.testimonialQuote}>
            "Ktinoskare has given me peace of mind knowing my dog is safe and healthy. The
            real-time alerts are lifesaving!"
          </Text>
          <Text style={styles.testimonialAuthor}>— Sarah M., Dog Owner</Text>
        </View>
        <View style={styles.testimonialCard}>
          <Text style={styles.testimonialQuote}>
            "The health monitoring features caught an issue before it became serious. Worth
            every penny!"
          </Text>
          <Text style={styles.testimonialAuthor}>— James L., Cat Owner</Text>
        </View>
      </View>

      {/* FAQ Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        {[
          {
            q: 'How does GPS tracking work?',
            a: 'Our advanced GPS collar tracks your pet in real-time with geo-fencing alerts.',
          },
          {
            q: 'Is health monitoring accurate?',
            a: 'Yes! We use clinical-grade sensors to monitor vital signs with precision.',
          },
          {
            q: 'Can I manage multiple pets?',
            a: 'Absolutely! Create profiles for all your pets in one dashboard.',
          },
        ].map((faq, index) => (
          <View key={index} style={styles.faqCard}>
            <Text style={styles.faqQuestion}>Q: {faq.q}</Text>
            <Text style={styles.faqAnswer}>A: {faq.a}</Text>
          </View>
        ))}
      </View>

      {/* Smart Bands Section */}
      <View style={[styles.section, styles.bandsSection]}>
        <Text style={styles.sectionTag}>Why Choose Us</Text>
        <Text style={styles.sectionTitle}>Everything your pet needs,{'\n'}in one smart platform</Text>
        <Text style={styles.sectionSubtitle}>
          From real-time GPS tracking to AI-powered health insights
        </Text>

        <View style={styles.bandsGrid}>
          {/* Dog Band */}
          <View style={styles.bandCard}>
            <Image
              source={{ uri: 'https://i.pcmag.com/imagery/roundup-products/06CEGEDw7Ftp0TrfK1D7I2Z.fit_lim.size_919x518.v1758747468.jpg' }}
              style={styles.bandImage}
            />
            <View style={styles.bandContent}>
              <Text style={styles.bandSubtitle}>Know More, Worry Less</Text>
              <View style={styles.bandTitleRow}>
                <Text style={styles.bandTitle}>DOG BAND</Text>
                <TouchableOpacity style={styles.bandButton}>
                  <Text style={styles.bandButtonText}>Buy Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Cat Band */}
          <View style={styles.bandCard}>
            <Image
              source={{ uri: 'https://beardpet.com/wp-content/uploads/2024/11/DSC2587-scaled.jpg' }}
              style={styles.bandImage}
            />
            <View style={styles.bandContent}>
              <Text style={styles.bandSubtitle}>Track, Protect, Pamper</Text>
              <View style={styles.bandTitleRow}>
                <Text style={styles.bandTitle}>CAT BAND</Text>
                <TouchableOpacity style={styles.bandButton}>
                  <Text style={styles.bandButtonText}>Buy Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Plans & Pricing Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTag}>Premium Plans</Text>
        <Text style={styles.sectionTitle}>Smart Care Plans for a Healthier Pet</Text>
        <Text style={styles.sectionSubtitle}>
          Choose the subscription plan that works best for you
        </Text>

        {/* Plans */}
        {[
          { name: 'MONTHLY', price: '₹399', period: 'per month', popular: false },
          { name: 'QUARTERLY', price: '₹999', period: 'for 3 months', popular: true },
          { name: '6 MONTHS', price: '₹1,999', period: 'for 6 months', popular: false },
          { name: 'ANNUAL', price: '₹3,999', period: 'per year', popular: false },
        ].map((plan, index) => (
          <View key={index} style={[styles.planCard, plan.popular && styles.planCardPopular]}>
            {plan.popular && (
              <View style={styles.popularBadge}>
                <Text style={styles.popularBadgeText}>MOST POPULAR</Text>
              </View>
            )}
            <Text style={styles.planName}>{plan.name} PLAN</Text>
            <Text style={styles.planPrice}>{plan.price}/-</Text>
            <Text style={styles.planPeriod}>{plan.period}</Text>
            <View style={styles.planFeatures}>
              {['24×7 Live Tracking', 'Health Alerts', 'Activity Monitoring', 'AI Wellness Insights', 'Dashboard Access'].map((feature, i) => (
                <View key={i} style={styles.planFeature}>
                  <Text style={styles.planFeatureIcon}>✓</Text>
                  <Text style={styles.planFeatureText}>{feature}</Text>
                </View>
              ))}
            </View>
            <TouchableOpacity style={[styles.planButton, plan.popular && styles.planButtonPopular]}>
              <Text style={[styles.planButtonText, plan.popular && styles.planButtonTextPopular]}>Choose Plan</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Contact Section */}
      <View style={[styles.section, styles.contactSection]}>
        <Text style={styles.sectionTitle}>Get In Touch</Text>
        <Text style={styles.sectionSubtitle}>
          Have questions about Ktinoskare? We're here to help you.
        </Text>

        {/* Contact Info */}
        <View style={styles.contactInfoCard}>
          <View style={styles.contactItem}>
            <Text style={styles.contactIcon}>📍</Text>
            <Text style={styles.contactText}>
              #70/4, 5th Cross, SLN Layout, Munnekolala, Marathahalli, Bengaluru, Karnataka
            </Text>
          </View>
          <View style={styles.contactItem}>
            <Text style={styles.contactIcon}>📞</Text>
            <Text style={styles.contactText}>+91 6006077119</Text>
          </View>
          <View style={styles.contactItem}>
            <Text style={styles.contactIcon}>✉️</Text>
            <Text style={styles.contactText}>info@ktinoskare.com</Text>
          </View>
          <View style={styles.contactItem}>
            <Text style={styles.contactIcon}>🌐</Text>
            <Text style={styles.contactText}>www.ktinoskare.com</Text>
          </View>
        </View>

        {/* Contact Form */}
        <View style={styles.contactForm}>
          <TextInput
            style={styles.contactInput}
            placeholder="Your Name"
            placeholderTextColor={theme.colors.neutral.gray[400]}
          />
          <TextInput
            style={styles.contactInput}
            placeholder="Your Email"
            placeholderTextColor={theme.colors.neutral.gray[400]}
            keyboardType="email-address"
          />
          <TextInput
            style={[styles.contactInput, styles.contactTextarea]}
            placeholder="Your Message"
            placeholderTextColor={theme.colors.neutral.gray[400]}
            multiline
            numberOfLines={4}
          />
          <TouchableOpacity style={styles.contactButton}>
            <Text style={styles.contactButtonText}>Send Message</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* CTA Section */}
      <View style={[styles.section, styles.ctaSection]}>
        <Text style={styles.ctaTitle}>Ready to Transform Pet Care?</Text>
        <Text style={styles.ctaSubtitle}>Join thousands of pet owners who trust Ktinoskare</Text>
        <TouchableOpacity
          style={styles.ctaButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.ctaBtnText}>Start Your Journey</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.footerLogo}>
          <Text style={styles.footerLogoText}>
            <Text style={{ color: theme.colors.primary.deepPurple }}>Ktinos</Text>
            <Text style={{ color: theme.colors.primary.healthGreen }}>kare</Text>
          </Text>
        </View>
        <Text style={styles.footerText}>
          Proactive and predictive animal care for healthier, happier lives.
        </Text>
        <View style={styles.footerLinks}>
          <Text style={styles.footerLink}>Privacy Policy</Text>
          <Text style={styles.footerDot}>•</Text>
          <Text style={styles.footerLink}>Terms of Service</Text>
          <Text style={styles.footerDot}>•</Text>
          <Text style={styles.footerLink}>Contact</Text>
        </View>
        <Text style={styles.footerCopyright}>© 2024 Ktinoskare. All rights reserved.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  heroContainer: {
    height: height * 0.7,
    position: 'relative',
  },
  heroScroll: {
    flex: 1,
  },
  heroSlide: {
    height: '100%',
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  heroContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logoText: {
    fontSize: 32,
    fontWeight: '700',
  },
  heroHeading: {
    fontSize: 36,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 12,
  },
  heroSubheading: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 26,
  },
  arrowLeft: {
    position: 'absolute',
    left: 16,
    top: '50%',
    marginTop: -24,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderWidth: 2,
    borderColor: theme.colors.primary.healthGreen,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  arrowRight: {
    position: 'absolute',
    right: 16,
    top: '50%',
    marginTop: -24,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderWidth: 2,
    borderColor: theme.colors.primary.healthGreen,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  arrowText: {
    fontSize: 32,
    color: '#fff',
    fontWeight: '600',
  },
  dotContainer: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    zIndex: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  dotActive: {
    width: 28,
  },
  heroButtons: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    flexDirection: 'row',
    gap: 12,
    zIndex: 10,
  },
  btnPrimary: {
    flex: 1,
    backgroundColor: theme.colors.primary.healthGreen,
    paddingVertical: 14,
    borderRadius: theme.borderRadius['2xl'],
    alignItems: 'center',
  },
  btnPrimaryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  btnSecondary: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 14,
    borderRadius: theme.borderRadius['2xl'],
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  btnSecondaryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: theme.colors.primary.deepPurple,
    textAlign: 'center',
    marginBottom: 12,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: theme.colors.neutral.gray[600],
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 8,
  },
  featuresGrid: {
    marginTop: 24,
    gap: 16,
  },
  featureCard: {
    backgroundColor: '#fff',
    borderRadius: theme.borderRadius.xl,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    position: 'relative',
  },
  featureIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureIcon: {
    fontSize: 32,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.neutral.gray[800],
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    color: theme.colors.neutral.gray[600],
    lineHeight: 22,
  },
  featureAccent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    borderBottomLeftRadius: theme.borderRadius.xl,
    borderBottomRightRadius: theme.borderRadius.xl,
  },
  testimonialsSection: {
    backgroundColor: theme.colors.neutral.lightBg,
  },
  testimonialCard: {
    backgroundColor: '#fff',
    borderRadius: theme.borderRadius.xl,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  testimonialQuote: {
    fontSize: 15,
    fontStyle: 'italic',
    color: theme.colors.neutral.gray[700],
    lineHeight: 24,
    marginBottom: 12,
  },
  testimonialAuthor: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.primary.deepPurple,
  },
  faqCard: {
    backgroundColor: theme.colors.neutral.lightBg,
    borderRadius: theme.borderRadius.lg,
    padding: 16,
    marginBottom: 12,
  },
  faqQuestion: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.primary.deepPurple,
    marginBottom: 8,
  },
  faqAnswer: {
    fontSize: 14,
    color: theme.colors.neutral.gray[600],
    lineHeight: 22,
  },
  ctaSection: {
    backgroundColor: theme.colors.primary.deepPurple,
    marginHorizontal: 0,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 12,
  },
  ctaSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginBottom: 24,
  },
  ctaButton: {
    backgroundColor: theme.colors.primary.healthGreen,
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: theme.borderRadius['2xl'],
  },
  ctaBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  footer: {
    backgroundColor: theme.colors.neutral.gray[100],
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  footerLogo: {
    marginBottom: 12,
  },
  footerLogoText: {
    fontSize: 24,
    fontWeight: '700',
  },
  footerText: {
    fontSize: 14,
    color: theme.colors.neutral.gray[600],
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 22,
  },
  footerLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  footerLink: {
    fontSize: 12,
    color: theme.colors.primary.deepPurple,
    fontWeight: '600',
  },
  footerDot: {
    fontSize: 12,
    color: theme.colors.neutral.gray[400],
  },
  footerCopyright: {
    fontSize: 12,
    color: theme.colors.neutral.gray[500],
  },
  sectionTag: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: theme.colors.primary.healthGreen,
    backgroundColor: '#dcfce7',
    borderRadius: theme.borderRadius.full,
    paddingHorizontal: 14,
    paddingVertical: 5,
    alignSelf: 'center',
    marginBottom: 16,
  },
  bandsSection: {
    backgroundColor: '#f0f7f4',
  },
  bandsGrid: {
    marginTop: 24,
    gap: 16,
  },
  bandCard: {
    backgroundColor: '#fff',
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  bandImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  bandContent: {
    padding: 16,
  },
  bandSubtitle: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.neutral.gray[600],
    marginBottom: 8,
  },
  bandTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bandTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: theme.colors.primary.deepPurple,
  },
  bandButton: {
    backgroundColor: theme.colors.primary.deepPurple,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: theme.borderRadius.full,
  },
  bandButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
  planCard: {
    backgroundColor: '#fff',
    borderRadius: theme.borderRadius.xl,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: theme.colors.neutral.gray[200],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    position: 'relative',
  },
  planCardPopular: {
    borderColor: theme.colors.primary.healthGreen,
    transform: [{ scale: 1.02 }],
    shadowOpacity: 0.15,
  },
  popularBadge: {
    position: 'absolute',
    top: -12,
    left: '50%',
    transform: [{ translateX: -60 }],
    backgroundColor: theme.colors.primary.healthGreen,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    zIndex: 10,
  },
  popularBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '800',
  },
  planName: {
    fontSize: 11,
    fontWeight: '700',
    color: theme.colors.neutral.gray[500],
    marginBottom: 8,
    letterSpacing: 1,
  },
  planPrice: {
    fontSize: 32,
    fontWeight: '800',
    color: theme.colors.neutral.gray[900],
    marginBottom: 4,
  },
  planPeriod: {
    fontSize: 13,
    color: theme.colors.neutral.gray[500],
    marginBottom: 16,
  },
  planFeatures: {
    marginBottom: 20,
    gap: 10,
  },
  planFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  planFeatureIcon: {
    fontSize: 14,
    color: theme.colors.primary.healthGreen,
    fontWeight: '800',
  },
  planFeatureText: {
    fontSize: 13,
    color: theme.colors.neutral.gray[700],
  },
  planButton: {
    borderWidth: 2,
    borderColor: theme.colors.primary.healthGreen,
    paddingVertical: 12,
    borderRadius: theme.borderRadius.xl,
    alignItems: 'center',
  },
  planButtonPopular: {
    backgroundColor: theme.colors.primary.healthGreen,
  },
  planButtonText: {
    color: theme.colors.primary.healthGreen,
    fontSize: 14,
    fontWeight: '700',
  },
  planButtonTextPopular: {
    color: '#fff',
  },
  contactSection: {
    backgroundColor: theme.colors.neutral.lightBg,
  },
  contactInfoCard: {
    backgroundColor: theme.colors.primary.deepPurple,
    borderRadius: theme.borderRadius.xl,
    padding: 20,
    marginBottom: 24,
    gap: 16,
  },
  contactItem: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  contactIcon: {
    fontSize: 20,
  },
  contactText: {
    flex: 1,
    fontSize: 14,
    color: '#fff',
    lineHeight: 22,
  },
  contactForm: {
    gap: 12,
  },
  contactInput: {
    backgroundColor: '#fff',
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    color: theme.colors.neutral.gray[800],
    borderWidth: 1,
    borderColor: theme.colors.neutral.gray[200],
  },
  contactTextarea: {
    height: 120,
    textAlignVertical: 'top',
  },
  contactButton: {
    backgroundColor: theme.colors.primary.healthGreen,
    paddingVertical: 14,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
