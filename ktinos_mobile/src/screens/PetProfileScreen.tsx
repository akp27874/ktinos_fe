import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { theme } from '../theme';
import { usePets } from '../context/PetsContext';
import { RootStackParamList } from '../navigation/RootNavigator';
import axiosInstance from '../config/axiosInstance';
import { ENDPOINTS } from '../config/api';

type PetProfileRouteProp = RouteProp<RootStackParamList, 'PetProfile'>;
type NavProp = NativeStackNavigationProp<RootStackParamList>;

interface TelemetryData {
  heart: { avg_heart_rate: number; date: string }[];
  spo2: { avg_spo2: number; date: string }[];
  temperature: { avg_temp: number; date: string }[];
}

export default function PetProfileScreen() {
  const route = useRoute<PetProfileRouteProp>();
  const navigation = useNavigation<NavProp>();
  const { pets } = usePets();
  const pet = pets.find((p) => p.id === route.params.id);
  const [telemetry, setTelemetry] = useState<TelemetryData | null>(null);
  const [loadingVitals, setLoadingVitals] = useState(false);

  // Fetch telemetry data
  useEffect(() => {
    if (pet?.device) {
      setLoadingVitals(true);
      axiosInstance
        .get(ENDPOINTS.telemetry(pet.device))
        .then((res) => setTelemetry(res.data.data))
        .catch(() => setTelemetry(null))
        .finally(() => setLoadingVitals(false));
    }
  }, [pet?.device]);

  if (!pet) {
    return (
      <View style={styles.centered}>
        <Text style={{ fontSize: 16, color: theme.colors.neutral.gray[500] }}>
          Pet not found.
        </Text>
      </View>
    );
  }

  // Get latest vitals from telemetry or use defaults
  const mockVitals = {
    heartRate: telemetry?.heart[telemetry.heart.length - 1]?.avg_heart_rate ?? 82,
    temperature: telemetry?.temperature[telemetry.temperature.length - 1]?.avg_temp ?? 38.2,
    spo2: telemetry?.spo2[telemetry.spo2.length - 1]?.avg_spo2 ?? 97,
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Vital Sanctuary</Text>
      </View>

      {/* Pet Info Card */}
      <View style={styles.section}>
        <View style={styles.infoCard}>
          <View style={styles.statusRow}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>{pet.healthStatus.toUpperCase()}</Text>
          </View>
          <Text style={styles.petName}>{pet.petName}</Text>
          <Text style={styles.petDesc}>
            {pet.breed} · {pet.gender} · {pet.color}.
          </Text>
          <View style={styles.divider} />
          {[
            { label: 'Weight', value: `${pet.weight} kg` },
            { label: 'Gender', value: pet.gender },
            { label: 'Vaccinated', value: pet.vaccinated ? '✅ Yes' : '❌ No' },
            {
              label: 'Next Vet Visit',
              value: pet.nextCheckup
                ? new Date(pet.nextCheckup).toLocaleDateString()
                : 'Not scheduled',
            },
          ].map((field) => (
            <View key={field.label} style={styles.infoRow}>
              <Text style={styles.infoLabel}>{field.label}</Text>
              <Text style={styles.infoValue}>{field.value}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Vitals */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Live Vitals</Text>
        {loadingVitals ? (
          <View style={styles.vitalsLoading}>
            <ActivityIndicator size="small" color={theme.colors.primary.deepPurple} />
            <Text style={styles.loadingText}>Loading vitals data...</Text>
          </View>
        ) : telemetry === null && pet.device ? (
          <View style={styles.vitalsLoading}>
            <Text style={styles.noDataText}>No telemetry data available</Text>
          </View>
        ) : (
          <View style={styles.vitalsRow}>
            {[
              { label: 'Heart Rate', value: mockVitals.heartRate, unit: 'BPM', icon: '📈' },
              {
                label: 'Temperature',
                value: mockVitals.temperature,
                unit: '°C',
                icon: '🌡️',
              },
              { label: 'SpO2', value: mockVitals.spo2, unit: '%', icon: '💨' },
            ].map((vital, i) => (
              <View key={i} style={styles.vitalCard}>
                <Text style={{ fontSize: 24, marginBottom: 8 }}>{vital.icon}</Text>
                <Text style={styles.vitalLabel}>{vital.label}</Text>
                <Text style={styles.vitalValue}>
                  {vital.value}
                  <Text style={styles.vitalUnit}> {vital.unit}</Text>
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Health Insight */}
      <View style={styles.section}>
        <View style={styles.insightCard}>
          <Text style={{ fontSize: 28, marginBottom: 12 }}>💡</Text>
          <Text style={styles.insightTitle}>Health Insight</Text>
          <Text style={styles.insightText}>
            {pet.petName}'s vitals are being monitored. Health status is currently{' '}
            <Text style={{ fontWeight: '700' }}>{pet.healthStatus}</Text>.
            {pet.vaccinated
              ? ' Vaccinations are up to date.'
              : ' Vaccination may be overdue — please consult your vet.'}
          </Text>
          <TouchableOpacity style={styles.insightBtn}>
            <Text style={styles.insightBtnText}>View Full Health Report</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ height: 32 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.neutral.lightBg },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.neutral.lightBg,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 16,
    backgroundColor: '#fff',
  },
  backBtn: { marginBottom: 8 },
  backText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.primary.deepPurple,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: theme.colors.primary.deepPurple,
  },
  section: { paddingHorizontal: 20, marginTop: 20 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.primary.deepPurple,
    marginBottom: 12,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: theme.borderRadius.xl,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.primary.healthGreen,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
    color: theme.colors.primary.healthGreen,
    letterSpacing: 1,
  },
  petName: {
    fontSize: 26,
    fontWeight: '800',
    color: theme.colors.primary.deepPurple,
    marginBottom: 4,
  },
  petDesc: {
    fontSize: 13,
    color: theme.colors.neutral.gray[500],
    marginBottom: 16,
    lineHeight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.neutral.gray[100],
    marginVertical: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  infoLabel: {
    fontSize: 13,
    color: theme.colors.neutral.gray[400],
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.neutral.gray[800],
  },
  vitalsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  vitalsLoading: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    fontSize: 13,
    color: theme.colors.neutral.gray[500],
    marginTop: 8,
  },
  noDataText: {
    fontSize: 13,
    color: theme.colors.neutral.gray[500],
  },
  vitalCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: theme.borderRadius.xl,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  vitalLabel: {
    fontSize: 11,
    color: theme.colors.neutral.gray[500],
    marginBottom: 6,
    textAlign: 'center',
  },
  vitalValue: {
    fontSize: 22,
    fontWeight: '800',
    color: theme.colors.primary.deepPurple,
  },
  vitalUnit: {
    fontSize: 13,
    color: theme.colors.neutral.gray[400],
  },
  insightCard: {
    backgroundColor: theme.colors.primary.deepPurple,
    borderRadius: theme.borderRadius.xl,
    padding: 20,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
  },
  insightText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 20,
    marginBottom: 16,
  },
  insightBtn: {
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.4)',
    borderRadius: theme.borderRadius.xl,
    paddingVertical: 12,
    alignItems: 'center',
  },
  insightBtnText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
});
