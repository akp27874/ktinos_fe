import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { theme } from '../theme';
import { usePets } from '../context/PetsContext';
import { RootStackParamList } from '../navigation/RootNavigator';
import AddPetModal from '../components/AddPetModal';

const { width } = Dimensions.get('window');

type NavProp = NativeStackNavigationProp<RootStackParamList>;

const statusColor = (status: string) => {
  if (status === 'Healthy') return { bg: '#d1fae5', text: '#065f46' };
  if (status === 'Needs Attention') return { bg: '#fef3c7', text: '#92400e' };
  return { bg: '#fee2e2', text: '#991b1b' };
};

export default function DashboardScreen() {
  const navigation = useNavigation<NavProp>();
  const { pets, loading } = usePets();
  const featured = pets[0];
  const [showAddPetModal, setShowAddPetModal] = useState(false);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={theme.colors.primary.deepPurple} />
        <Text style={styles.loadingText}>Loading your sanctuary…</Text>
      </View>
    );
  }

  if (!featured) {
    return (
      <View style={styles.centered}>
        <Text style={{ fontSize: 40 }}>🐾</Text>
        <Text style={styles.noDataText}>No pets yet. Add your first pet!</Text>
        <TouchableOpacity
          style={styles.addFirstPetBtn}
          onPress={() => setShowAddPetModal(true)}
        >
          <Text style={styles.addFirstPetText}>+ Add Your First Pet</Text>
        </TouchableOpacity>
        <AddPetModal visible={showAddPetModal} onClose={() => setShowAddPetModal(false)} />
      </View>
    );
  }

  const healthCounts = {
    total: pets.length,
    healthy: pets.filter((p) => p.healthStatus === 'Healthy').length,
    attention: pets.filter((p) => p.healthStatus === 'Needs Attention').length,
    critical: pets.filter((p) => p.healthStatus === 'Critical').length,
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerLabel}>🐾 Ktinoskare</Text>
          <Text style={styles.headerTitle}>Dashboard</Text>
        </View>
        <View style={styles.headerRight}>
          <Text style={{ fontSize: 22 }}>🔔</Text>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&q=80' }}
            style={styles.avatar}
          />
        </View>
      </View>

      {/* Welcome Text */}
      <View style={styles.section}>
        <Text style={styles.welcomeTitle}>Welcome home,</Text>
        <Text style={styles.welcomeSubtitle}>The Ktinoskare awaits.</Text>
        <Text style={styles.welcomeDesc}>
          Everything is calm. Your companions are resting comfortably.
        </Text>
      </View>

      {/* Featured Pet Card */}
      <View style={styles.section}>
        <View style={styles.featuredCard}>
          <Image source={{ uri: featured.avatar }} style={styles.featuredImage} />
          <View style={{ flex: 1 }}>
            <View style={styles.petNameRow}>
              <Text style={styles.petName}>{featured.petName}</Text>
              <View style={styles.vitalityBadge}>
                <Text style={styles.vitalityText}>● OPTIMAL</Text>
              </View>
            </View>
            <Text style={styles.petBreed}>{featured.breed}</Text>
            <Text style={styles.petQuote} numberOfLines={2}>
              "{featured.petName} has been active today."
            </Text>
            <View style={styles.btnRow}>
              <TouchableOpacity
                style={styles.primaryBtn}
                onPress={() => navigation.navigate('PetProfile', { id: featured.id })}
              >
                <Text style={styles.primaryBtnText}>View Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.outlineBtn}
                onPress={() => navigation.navigate('PetDetails', { id: featured.id })}
              >
                <Text style={styles.outlineBtnText}>Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* Feature Cards Row */}
      <View style={[styles.section, styles.featureRow]}>
        <TouchableOpacity
          style={[styles.featureCard, { backgroundColor: theme.colors.primary.deepPurple }]}
          onPress={() => navigation.navigate('DashboardNavigator' as never)}
        >
          <Text style={styles.featureCardTitle}>💊 Health Monitoring</Text>
          <Text style={styles.featureCardDesc}>Clinical-grade analytics for vitals.</Text>
          <Text style={styles.featureCardLink}>Analyze Data →</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.featureCard, { backgroundColor: theme.colors.primary.tealWellness }]}
          onPress={() => navigation.navigate('DashboardNavigator' as never)}
        >
          <Text style={styles.featureCardTitle}>📍 GPS Tracking</Text>
          <Text style={styles.featureCardDesc}>{featured.petName} is in the Safe Zone.</Text>
          <Text style={[styles.featureCardLink, { color: '#fff' }]}>Live Map →</Text>
        </TouchableOpacity>
      </View>

      {/* Quick Stats */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Stats</Text>
        <View style={styles.statsRow}>
          {[
            { label: 'Total Pets', value: healthCounts.total, color: theme.colors.primary.deepPurple },
            { label: 'Healthy', value: healthCounts.healthy, color: theme.colors.primary.healthGreen },
            { label: 'Attention', value: healthCounts.attention, color: '#f59e0b' },
            { label: 'Critical', value: healthCounts.critical, color: '#ef4444' },
          ].map((stat) => (
            <View key={stat.label} style={styles.statItem}>
              <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Health Alerts */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📊 Health Alerts</Text>
        <View style={styles.alertsCard}>
          {[
            {
              title: 'Disturbed Sleep',
              desc: 'Detected 3 interruptions between 02:00–04:00 AM.',
              tag: 'NEEDS REVIEW',
              tagColor: theme.colors.primary.softLavender,
            },
            {
              title: 'Lower Activity',
              desc: 'Morning activity is 22% lower than 7-day average.',
              tag: 'OBSERVING',
              tagColor: theme.colors.primary.tealWellness,
            },
          ].map((alert, i) => (
            <View key={i} style={[styles.alertItem, i > 0 && { borderTopWidth: 1, borderTopColor: theme.colors.neutral.gray[100], paddingTop: 12, marginTop: 12 }]}>
              <View style={styles.alertBorder} />
              <View style={{ flex: 1, paddingLeft: 12 }}>
                <Text style={styles.alertTitle}>{alert.title}</Text>
                <Text style={styles.alertDesc}>{alert.desc}</Text>
                <View style={[styles.alertTag, { backgroundColor: alert.tagColor }]}>
                  <Text style={styles.alertTagText}>{alert.tag}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* All Pets */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>All Pets</Text>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.viewAllText}>View All →</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={pets}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item: pet }) => {
            const sc = statusColor(pet.healthStatus);
            return (
              <View style={styles.petCard}>
                <Image source={{ uri: pet.avatar }} style={styles.petCardImage} />
                <Text style={styles.petCardName}>{pet.petName}</Text>
                <Text style={styles.petCardBreed} numberOfLines={1}>{pet.breed}</Text>
                <View style={[styles.statusBadge, { backgroundColor: sc.bg }]}>
                  <Text style={[styles.statusText, { color: sc.text }]}>{pet.healthStatus}</Text>
                </View>
                <View style={styles.petCardBtns}>
                  <TouchableOpacity
                    style={styles.petCardBtnPrimary}
                    onPress={() => navigation.navigate('PetProfile', { id: pet.id })}
                  >
                    <Text style={styles.petCardBtnTextWhite}>Profile</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.petCardBtnOutline}
                    onPress={() => navigation.navigate('PetDetails', { id: pet.id })}
                  >
                    <Text style={styles.petCardBtnTextGreen}>Details</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
          contentContainerStyle={{ paddingHorizontal: 4, gap: 12 }}
        />
      </View>

      {/* Upcoming Care */}
      <View style={[styles.section, { marginBottom: 32 }]}>
        <Text style={styles.sectionTitle}>📅 Upcoming Care</Text>
        <View style={styles.upcomingCard}>
          <View style={styles.dateBox}>
            <Text style={styles.dateBoxMonth}>OCT</Text>
            <Text style={styles.dateBoxDay}>12</Text>
          </View>
          <View style={{ flex: 1, marginLeft: 16 }}>
            <Text style={styles.upcomingTitle}>Veterinary Wellness Check</Text>
            <Text style={styles.upcomingSubtitle}>Central Pet Clinic · 14:30</Text>
          </View>
        </View>
      </View>

      {/* Floating Add Pet Button */}
      <TouchableOpacity
        style={styles.floatingAddBtn}
        onPress={() => setShowAddPetModal(true)}
        activeOpacity={0.8}
      >
        <Text style={styles.floatingAddText}>+ Add New Pet</Text>
      </TouchableOpacity>

      {/* Add Pet Modal */}
      <AddPetModal visible={showAddPetModal} onClose={() => setShowAddPetModal(false)} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.neutral.lightBg,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.neutral.lightBg,
    gap: 12,
  },
  loadingText: {
    color: theme.colors.neutral.gray[500],
    fontSize: 14,
  },
  noDataText: {
    fontSize: 16,
    color: theme.colors.primary.deepPurple,
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 16,
    backgroundColor: '#fff',
  },
  headerLabel: {
    fontSize: 12,
    color: theme.colors.primary.tealWellness,
    fontWeight: '700',
    letterSpacing: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: theme.colors.primary.deepPurple,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.primary.deepPurple,
    marginBottom: 12,
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.primary.healthGreen,
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: theme.colors.primary.deepPurple,
  },
  welcomeSubtitle: {
    fontSize: 28,
    fontWeight: '700',
    color: theme.colors.neutral.gray[300],
    marginBottom: 8,
  },
  welcomeDesc: {
    fontSize: 13,
    color: theme.colors.neutral.gray[500],
    lineHeight: 20,
  },
  featuredCard: {
    backgroundColor: '#fff',
    borderRadius: theme.borderRadius.xl,
    padding: 16,
    flexDirection: 'row',
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  featuredImage: {
    width: 90,
    height: 90,
    borderRadius: theme.borderRadius.lg,
  },
  petNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
    marginBottom: 2,
  },
  petName: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.primary.deepPurple,
  },
  vitalityBadge: {
    backgroundColor: `${theme.colors.primary.healthGreen}22`,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: theme.borderRadius.full,
  },
  vitalityText: {
    fontSize: 9,
    fontWeight: '700',
    color: theme.colors.primary.tealWellness,
  },
  petBreed: {
    fontSize: 12,
    color: theme.colors.neutral.gray[400],
    marginBottom: 4,
  },
  petQuote: {
    fontSize: 11,
    fontStyle: 'italic',
    color: theme.colors.neutral.gray[500],
    marginBottom: 10,
  },
  btnRow: {
    flexDirection: 'row',
    gap: 8,
  },
  primaryBtn: {
    backgroundColor: theme.colors.primary.deepPurple,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: theme.borderRadius.full,
  },
  primaryBtnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  outlineBtn: {
    borderWidth: 1.5,
    borderColor: theme.colors.primary.healthGreen,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: theme.borderRadius.full,
  },
  outlineBtnText: {
    color: theme.colors.primary.healthGreen,
    fontSize: 12,
    fontWeight: '600',
  },
  featureRow: {
    flexDirection: 'row',
    gap: 12,
  },
  featureCard: {
    flex: 1,
    borderRadius: theme.borderRadius.xl,
    padding: 16,
  },
  featureCardTitle: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
    marginBottom: 6,
  },
  featureCardDesc: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 11,
    marginBottom: 10,
    lineHeight: 16,
  },
  featureCardLink: {
    color: theme.colors.primary.healthGreen,
    fontSize: 12,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: theme.borderRadius.xl,
    padding: 16,
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  statItem: { alignItems: 'center' },
  statValue: { fontSize: 22, fontWeight: '800' },
  statLabel: {
    fontSize: 11,
    color: theme.colors.neutral.gray[500],
    marginTop: 2,
    textAlign: 'center',
  },
  alertsCard: {
    backgroundColor: '#fff',
    borderRadius: theme.borderRadius.xl,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  alertBorder: {
    width: 4,
    borderRadius: 2,
    backgroundColor: theme.colors.primary.deepPurple,
    alignSelf: 'stretch',
  },
  alertTitle: {
    fontWeight: '700',
    fontSize: 13,
    color: theme.colors.neutral.gray[800],
    marginBottom: 4,
  },
  alertDesc: {
    fontSize: 12,
    color: theme.colors.neutral.gray[500],
    marginBottom: 6,
    lineHeight: 17,
  },
  alertTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: theme.borderRadius.full,
  },
  alertTagText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
  petCard: {
    width: 130,
    backgroundColor: '#fff',
    borderRadius: theme.borderRadius.xl,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  petCardImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginBottom: 8,
  },
  petCardName: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.primary.deepPurple,
    marginBottom: 2,
  },
  petCardBreed: {
    fontSize: 10,
    color: theme.colors.neutral.gray[400],
    marginBottom: 6,
    textAlign: 'center',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: theme.borderRadius.full,
    marginBottom: 8,
  },
  statusText: {
    fontSize: 9,
    fontWeight: '700',
  },
  petCardBtns: {
    flexDirection: 'row',
    gap: 4,
  },
  petCardBtnPrimary: {
    backgroundColor: theme.colors.primary.deepPurple,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: theme.borderRadius.full,
  },
  petCardBtnTextWhite: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  petCardBtnOutline: {
    borderWidth: 1,
    borderColor: theme.colors.primary.healthGreen,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: theme.borderRadius.full,
  },
  petCardBtnTextGreen: {
    color: theme.colors.primary.healthGreen,
    fontSize: 10,
    fontWeight: '600',
  },
  upcomingCard: {
    backgroundColor: '#fff',
    borderRadius: theme.borderRadius.xl,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  dateBox: {
    backgroundColor: theme.colors.primary.softLavender,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
    minWidth: 52,
  },
  dateBoxMonth: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
  dateBoxDay: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '800',
  },
  upcomingTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.neutral.gray[800],
    marginBottom: 4,
  },
  upcomingSubtitle: {
    fontSize: 12,
    color: theme.colors.neutral.gray[400],
  },
  addFirstPetBtn: {
    backgroundColor: theme.colors.primary.healthGreen,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: theme.borderRadius['2xl'],
    marginTop: 16,
  },
  addFirstPetText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  floatingAddBtn: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: theme.colors.primary.healthGreen,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: theme.borderRadius.full,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  floatingAddText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
});
