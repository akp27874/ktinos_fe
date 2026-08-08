import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { theme } from '../theme';
import { usePets } from '../context/PetsContext';
import axiosInstance from '../config/axiosInstance';
import { ENDPOINTS } from '../config/api';

const { width } = Dimensions.get('window');

interface TelemetryData {
  heart: { avg_heart_rate: number; date: string }[];
  spo2: { avg_spo2: number; date: string }[];
  temperature: { avg_temp: number; date: string }[];
}

const activityData = {
  Daily: [40, 65, 50, 80, 55, 30, 20],
  Weekly: [60, 75, 55, 85, 70, 35, 25],
};
const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

const weeklyTrends = [
  { icon: '📈', label: 'Social Engagement', value: '+24%', color: theme.colors.primary.healthGreen, barW: 0.6 },
  { icon: '🍽️', label: 'Calorie Burn', value: '1,240', color: theme.colors.primary.softLavender, barW: 0.75 },
  { icon: '💧', label: 'Hydration Index', value: 'Optimal', color: theme.colors.primary.tealWellness, barW: 0.85 },
  { icon: '😌', label: 'Stress Levels', value: 'Low', color: theme.colors.neutral.gray[300], barW: 0.2 },
];

const CHART_HEIGHT = 100;
const BAR_WIDTH = (width - 80) / 7;

export default function HealthMonitoringScreen() {
  const { pets } = usePets();
  const featured = pets[0]; // Get first pet
  const [activityTab, setActivityTab] = useState<'Daily' | 'Weekly'>('Weekly');
  const [telemetry, setTelemetry] = useState<TelemetryData | null>(null);
  const [loading, setLoading] = useState(false);
  
  const data = activityData[activityTab];
  const maxActivity = Math.max(...data);

  // Fetch telemetry data
  useEffect(() => {
    if (featured?.device) {
      setLoading(true);
      axiosInstance
        .get(ENDPOINTS.telemetry(featured.device))
        .then((res) => setTelemetry(res.data.data))
        .catch(() => setTelemetry(null))
        .finally(() => setLoading(false));
    }
  }, [featured?.device]);

  if (!featured) {
    return (
      <View style={styles.centered}>
        <Text style={{ fontSize: 16, color: theme.colors.neutral.gray[500] }}>
          No pets available for health monitoring.
        </Text>
      </View>
    );
  }

  // Get heart rate data from telemetry or use mock
  const heartRateData = telemetry?.heart.map(h => h.avg_heart_rate) ?? [72, 68, 75, 70, 82, 78, 74];
  const latestHR = heartRateData[heartRateData.length - 1] ?? null;
  const latestTemp = telemetry?.temperature[telemetry.temperature.length - 1]?.avg_temp ?? null;
  const latestSpo2 = telemetry?.spo2[telemetry.spo2.length - 1]?.avg_spo2 ?? null;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.breadcrumb}>Dashboard › Health</Text>
          <Text style={styles.headerTitle}>{featured.petName}'s Vitality</Text>
          <Text style={styles.headerSub}>Analysis for this week</Text>
        </View>
        <View style={[styles.optimalBadge]}>
          <Text style={styles.optimalText}>⚡ Optimal</Text>
        </View>
      </View>

      {/* Health Alerts */}
      <View style={styles.section}>
        <View style={styles.alertsCard}>
          <View style={styles.alertsHeader}>
            <Text style={styles.alertsTitle}>🔔 Health Alerts</Text>
            {loading ? (
              <ActivityIndicator size="small" color="#dc2626" />
            ) : (
              <Text style={{ fontSize: 20 }}>⚠️</Text>
            )}
          </View>
          {loading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Loading health data...</Text>
            </View>
          ) : (
            <>
              {[
                { icon: '🌙', title: 'Disturbed Sleep', desc: `${featured.petName} woke up 4 times last night.` },
                { icon: '🏃', title: 'Lower Activity', desc: 'Movement is 15% below weekly average today.' },
              ].map((alert, i) => (
                <View key={i} style={styles.alertItem}>
                  <Text style={{ fontSize: 20 }}>{alert.icon}</Text>
                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={styles.alertItemTitle}>{alert.title}</Text>
                    <Text style={styles.alertItemDesc}>{alert.desc}</Text>
                  </View>
                </View>
              ))}
            </>
          )}
        </View>
      </View>

      {/* Activity Monitoring */}
      <View style={styles.section}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.cardTitle}>Activity Monitoring</Text>
              <Text style={styles.cardSub}>Step count and active minutes</Text>
            </View>
            <View style={styles.tabRow}>
              {(['Daily', 'Weekly'] as const).map((t) => (
                <TouchableOpacity
                  key={t}
                  style={[styles.tabBtn, activityTab === t && styles.tabBtnActive]}
                  onPress={() => setActivityTab(t)}
                >
                  <Text style={[styles.tabBtnText, activityTab === t && styles.tabBtnTextActive]}>
                    {t}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Bar Chart */}
          <View style={styles.chartContainer}>
            {data.map((val, i) => {
              const barHeight = (val / maxActivity) * CHART_HEIGHT;
              const isSat = i === 5;
              const isSun = i === 6;
              return (
                <View key={i} style={styles.barWrapper}>
                  {isSun && (
                    <View style={styles.lowLabel}>
                      <Text style={styles.lowLabelText}>Low</Text>
                    </View>
                  )}
                  <View
                    style={[
                      styles.bar,
                      {
                        height: barHeight,
                        backgroundColor: isSun
                          ? '#ef4444'
                          : isSat
                          ? theme.colors.primary.healthGreen
                          : `${theme.colors.primary.softLavender}55`,
                      },
                    ]}
                  />
                  <Text style={styles.dayLabel}>{days[i].slice(0, 1)}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>

      {/* Daily Insights */}
      <View style={styles.section}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>✨ Daily Insights</Text>
          <Text style={styles.insightQuote}>
            "{featured.petName}'s restless night correlates with the drop in daytime activity. Consider a shorter, more engaging walk this evening."
          </Text>
          <View style={styles.insightTags}>
            <View style={styles.insightTag}><Text style={styles.insightTagText}><Text style={{ fontWeight: '700' }}>Hydration:</Text> Normal</Text></View>
            <View style={styles.insightTag}><Text style={styles.insightTagText}><Text style={{ fontWeight: '700' }}>Mood:</Text> Calm</Text></View>
          </View>
        </View>
      </View>

      {/* Sleep Monitoring */}
      <View style={styles.section}>
        <View style={styles.card}>
          <View style={styles.sleepHeader}>
            <Text style={styles.cardTitle}>Sleep Monitoring</Text>
            <View>
              <Text style={styles.sleepTime}>8h 42m</Text>
              <Text style={styles.sleepLabel}>AVERAGE REST</Text>
            </View>
          </View>

          {/* Sleep bar */}
          <View style={styles.sleepBar}>
            {[
              { width: 0.15, color: theme.colors.primary.softLavender },
              { width: 0.45, color: theme.colors.primary.deepPurple },
              { width: 0.05, color: '#ef4444' },
              { width: 0.25, color: theme.colors.primary.deepPurple },
              { width: 0.05, color: '#ef4444' },
              { width: 0.05, color: theme.colors.primary.softLavender },
            ].map((seg, i) => (
              <View
                key={i}
                style={{ flex: seg.width, backgroundColor: seg.color, height: '100%' }}
              />
            ))}
          </View>

          {/* Legend */}
          <View style={styles.sleepLegend}>
            {[
              { color: theme.colors.primary.deepPurple, label: 'Deep Sleep' },
              { color: theme.colors.primary.softLavender, label: 'Light Sleep' },
              { color: '#ef4444', label: 'Awake' },
            ].map((l) => (
              <View key={l.label} style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: l.color }]} />
                <Text style={styles.legendText}>{l.label}</Text>
              </View>
            ))}
          </View>

          {/* Sleep stats */}
          <View style={styles.sleepStats}>
            {[
              { label: 'Efficiency', value: '92%', color: theme.colors.primary.healthGreen },
              { label: 'Interruptions', value: '4 Times', color: '#ef4444' },
              { label: 'Heart Rate', value: '54 BPM', color: theme.colors.neutral.gray[700] },
            ].map((stat) => (
              <View key={stat.label} style={styles.sleepStatItem}>
                <Text style={styles.sleepStatLabel}>{stat.label}</Text>
                <Text style={[styles.sleepStatValue, { color: stat.color }]}>{stat.value}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Weekly Trend Analysis */}
      <View style={styles.section}>
        <Text style={styles.trendTitle}>Weekly Trend Analysis</Text>
        {weeklyTrends.map((trend, i) => (
          <View key={i} style={styles.trendCard}>
            <Text style={{ fontSize: 28 }}>{trend.icon}</Text>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.trendLabel}>{trend.label}</Text>
              <Text style={[styles.trendValue, { color: theme.colors.primary.deepPurple }]}>{trend.value}</Text>
              <View style={styles.trendBarBg}>
                <View style={[styles.trendBar, { width: `${trend.barW * 100}%`, backgroundColor: trend.color }]} />
              </View>
            </View>
          </View>
        ))}
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
  loadingContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 13,
    color: theme.colors.neutral.gray[500],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 16,
    backgroundColor: '#fff',
  },
  breadcrumb: {
    fontSize: 12,
    color: theme.colors.neutral.gray[400],
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: theme.colors.primary.deepPurple,
  },
  headerSub: {
    fontSize: 12,
    color: theme.colors.neutral.gray[400],
    marginTop: 2,
  },
  optimalBadge: {
    backgroundColor: theme.colors.primary.healthGreen,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: theme.borderRadius.full,
  },
  optimalText: { color: '#fff', fontWeight: '700', fontSize: 12 },
  section: { paddingHorizontal: 20, marginTop: 16 },
  card: {
    backgroundColor: '#fff',
    borderRadius: theme.borderRadius.xl,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.neutral.gray[800],
    marginBottom: 4,
  },
  cardSub: { fontSize: 11, color: theme.colors.neutral.gray[400] },
  tabRow: { flexDirection: 'row', gap: 6 },
  tabBtn: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.neutral.lightBg,
  },
  tabBtnActive: { backgroundColor: theme.colors.primary.deepPurple },
  tabBtnText: { fontSize: 11, fontWeight: '600', color: theme.colors.neutral.gray[500] },
  tabBtnTextActive: { color: '#fff' },
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: CHART_HEIGHT + 30,
    gap: 4,
    paddingTop: 20,
  },
  barWrapper: { flex: 1, alignItems: 'center', justifyContent: 'flex-end' },
  bar: { width: '80%', borderRadius: 4, minHeight: 4 },
  dayLabel: {
    fontSize: 9,
    color: theme.colors.neutral.gray[400],
    marginTop: 4,
    fontWeight: '600',
  },
  lowLabel: {
    position: 'absolute',
    top: -18,
    backgroundColor: '#ef4444',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
  },
  lowLabelText: { color: '#fff', fontSize: 8, fontWeight: '700' },
  alertsCard: {
    backgroundColor: '#fff5f5',
    borderWidth: 1,
    borderColor: '#fecaca',
    borderRadius: theme.borderRadius.xl,
    padding: 16,
  },
  alertsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  alertsTitle: { fontSize: 16, fontWeight: '700', color: '#dc2626' },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: theme.borderRadius.lg,
    padding: 12,
    marginBottom: 8,
  },
  alertItemTitle: { fontSize: 13, fontWeight: '700', color: theme.colors.neutral.gray[800], marginBottom: 3 },
  alertItemDesc: { fontSize: 11, color: theme.colors.neutral.gray[500], lineHeight: 16 },
  insightQuote: {
    fontSize: 13,
    fontStyle: 'italic',
    color: theme.colors.neutral.gray[600],
    lineHeight: 20,
    marginTop: 8,
    marginBottom: 14,
  },
  insightTags: { flexDirection: 'row', gap: 10 },
  insightTag: {
    backgroundColor: theme.colors.neutral.lightBg,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: theme.borderRadius.full,
  },
  insightTagText: { fontSize: 12, color: theme.colors.neutral.gray[600] },
  sleepHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  sleepTime: {
    fontSize: 22,
    fontWeight: '800',
    color: theme.colors.primary.deepPurple,
    textAlign: 'right',
  },
  sleepLabel: {
    fontSize: 9,
    color: theme.colors.neutral.gray[400],
    fontWeight: '700',
    textAlign: 'right',
  },
  sleepBar: {
    flexDirection: 'row',
    height: 20,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    marginBottom: 12,
  },
  sleepLegend: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 14,
  },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 10, height: 10, borderRadius: 5 },
  legendText: { fontSize: 11, color: theme.colors.neutral.gray[500] },
  sleepStats: {
    flexDirection: 'row',
    gap: 10,
  },
  sleepStatItem: {
    flex: 1,
    backgroundColor: theme.colors.neutral.lightBg,
    borderRadius: theme.borderRadius.lg,
    padding: 10,
    alignItems: 'center',
  },
  sleepStatLabel: { fontSize: 10, color: theme.colors.neutral.gray[400], marginBottom: 4 },
  sleepStatValue: { fontSize: 13, fontWeight: '700' },
  trendTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.primary.deepPurple,
    marginBottom: 14,
  },
  trendCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: theme.borderRadius.xl,
    padding: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 5,
    elevation: 2,
  },
  trendLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.neutral.gray[800],
    marginBottom: 4,
  },
  trendValue: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 6,
  },
  trendBarBg: {
    height: 6,
    backgroundColor: theme.colors.neutral.gray[100],
    borderRadius: 3,
    overflow: 'hidden',
  },
  trendBar: {
    height: 6,
    borderRadius: 3,
  },
});
