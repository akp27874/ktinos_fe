import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { theme } from '../theme';
import { pets } from '../data/pets';

const { width, height } = Dimensions.get('window');
const featured = pets[0];

const safeZones = [
  { name: 'Home Sweet Home', radius: '500M RADIUS', active: true, icon: '🏠', alert: 'Entry & Exit Alerts active' },
  { name: 'Central Park', radius: '1.2KM RADIUS', active: false, icon: '🌲', alert: null },
];

export default function GpsTrackingScreen() {
  const [zones, setZones] = useState(safeZones);

  const toggleZone = (idx: number) =>
    setZones((prev) => prev.map((z, i) => (i === idx ? { ...z, active: !z.active } : z)));

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerLabel}>📍 Live Tracking</Text>
          <Text style={styles.headerTitle}>GPS Tracking</Text>
        </View>
        <View style={styles.liveBadge}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>LIVE</Text>
        </View>
      </View>

      {/* Map */}
      <View style={styles.mapContainer}>
        <WebView
          source={{
            uri: 'https://www.openstreetmap.org/export/embed.html?bbox=-0.1276%2C51.5074%2C-0.1076%2C51.5174&layer=mapnik',
          }}
          style={styles.map}
          scrollEnabled={false}
        />

        {/* Geofence overlay visual indicator */}
        <View style={styles.geofenceOverlay} pointerEvents="none">
          <View style={styles.geofenceCircle}>
            <View style={styles.petMarker}>
              <Text style={{ fontSize: 22 }}>🐾</Text>
            </View>
          </View>
        </View>

        {/* Pet popup */}
        <View style={styles.petPopup}>
          <Image source={{ uri: featured.avatar }} style={styles.petPopupImage} />
          <View>
            <Text style={styles.petPopupName}>{featured.petName} is Safe ✅</Text>
            <Text style={styles.petPopupSub}>Last updated: Just now</Text>
          </View>
        </View>

        {/* Stats bar */}
        <View style={styles.statsBar}>
          <View style={[styles.statPill, { backgroundColor: theme.colors.primary.healthGreen }]}>
            <Text style={{ fontSize: 16 }}>❤️</Text>
            <View>
              <Text style={styles.statPillLabel}>HEART RATE</Text>
              <Text style={styles.statPillValue}>84 BPM</Text>
            </View>
          </View>
          <View style={[styles.statPill, { backgroundColor: '#fff' }]}>
            <Text style={{ fontSize: 16 }}>🔋</Text>
            <View>
              <Text style={[styles.statPillLabel, { color: theme.colors.neutral.gray[500] }]}>TRACKER</Text>
              <Text style={[styles.statPillValue, { color: theme.colors.primary.deepPurple }]}>68%</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Bottom Panel */}
      <ScrollView style={styles.panel} showsVerticalScrollIndicator={false}>
        {/* Status */}
        <View style={styles.statusCard}>
          <View style={[styles.statusIcon, { backgroundColor: theme.colors.primary.healthGreen }]}>
            <Text style={{ fontSize: 20 }}>🛡️</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.statusTitle}>Status: Within Zone</Text>
            <Text style={styles.statusSub}>Currently in "Home Sweet Home"</Text>
          </View>
        </View>

        {/* Safe Zones */}
        <View style={styles.zonesSection}>
          <View style={styles.zonesHeader}>
            <Text style={styles.zonesTitle}>Active Safe Zones</Text>
            <TouchableOpacity>
              <Text style={styles.manageBtn}>Manage All</Text>
            </TouchableOpacity>
          </View>
          {zones.map((zone, idx) => (
            <View key={idx} style={styles.zoneCard}>
              <View style={styles.zoneLeft}>
                <View style={styles.zoneIconBox}>
                  <Text style={{ fontSize: 20 }}>{zone.icon}</Text>
                </View>
                <View>
                  <Text style={styles.zoneName}>{zone.name}</Text>
                  <Text style={styles.zoneRadius}>{zone.radius}</Text>
                  {zone.alert && <Text style={styles.zoneAlert}>🔔 {zone.alert}</Text>}
                </View>
              </View>
              {/* Toggle */}
              <TouchableOpacity
                style={[styles.toggle, { backgroundColor: zone.active ? theme.colors.primary.healthGreen : theme.colors.neutral.gray[200] }]}
                onPress={() => toggleZone(idx)}
                activeOpacity={0.8}
              >
                <View style={[styles.toggleThumb, { left: zone.active ? 26 : 4 }]} />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Notification Prefs */}
        <View style={styles.notifSection}>
          <Text style={styles.notifTitle}>Notification Preferences</Text>
          <View style={styles.notifRow}>
            {[
              { icon: '📱', title: 'Push Alerts', sub: 'Immediate mobile ping' },
              { icon: '📞', title: 'Emergency Call', sub: 'On exit after 5m' },
            ].map((pref, i) => (
              <View key={i} style={styles.notifCard}>
                <Text style={{ fontSize: 28 }}>{pref.icon}</Text>
                <Text style={styles.notifCardTitle}>{pref.title}</Text>
                <Text style={styles.notifCardSub}>{pref.sub}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* CTA */}
        <TouchableOpacity style={styles.createZoneBtn}>
          <Text style={styles.createZoneBtnText}>📍 Create New Safe Zone</Text>
        </TouchableOpacity>

        <View style={{ height: 24 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.neutral.lightBg },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 12,
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
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: theme.colors.primary.healthGreen,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.full,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  liveText: { color: '#fff', fontWeight: '700', fontSize: 12 },
  mapContainer: {
    height: height * 0.3,
    position: 'relative',
    margin: 16,
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
  },
  map: { flex: 1 },
  geofenceOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  geofenceCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: `${theme.colors.primary.tealWellness}88`,
    backgroundColor: `${theme.colors.primary.tealWellness}18`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  petMarker: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.primary.deepPurple,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  petPopup: {
    position: 'absolute',
    top: 10,
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: theme.borderRadius.xl,
    paddingHorizontal: 14,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  petPopupImage: { width: 32, height: 32, borderRadius: 16 },
  petPopupName: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.primary.deepPurple,
  },
  petPopupSub: { fontSize: 10, color: theme.colors.neutral.gray[400] },
  statsBar: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    gap: 10,
    alignSelf: 'center',
  },
  statPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: theme.borderRadius.full,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  statPillLabel: {
    fontSize: 9,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '700',
  },
  statPillValue: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '800',
  },
  panel: {
    flex: 1,
    paddingHorizontal: 20,
  },
  statusCard: {
    backgroundColor: '#fff',
    borderRadius: theme.borderRadius.xl,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  statusIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.neutral.gray[800],
  },
  statusSub: { fontSize: 12, color: theme.colors.neutral.gray[400] },
  zonesSection: { marginBottom: 16 },
  zonesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  zonesTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.primary.deepPurple,
  },
  manageBtn: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.primary.healthGreen,
  },
  zoneCard: {
    backgroundColor: '#fff',
    borderRadius: theme.borderRadius.xl,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  zoneLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  zoneIconBox: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: theme.colors.neutral.lightBg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  zoneName: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.neutral.gray[800],
  },
  zoneRadius: {
    fontSize: 11,
    fontWeight: '600',
    color: theme.colors.neutral.gray[400],
  },
  zoneAlert: {
    fontSize: 11,
    color: theme.colors.neutral.gray[400],
    marginTop: 2,
  },
  toggle: {
    width: 48,
    height: 24,
    borderRadius: 12,
    position: 'relative',
  },
  toggleThumb: {
    position: 'absolute',
    top: 4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  notifSection: { marginBottom: 16 },
  notifTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.primary.deepPurple,
    marginBottom: 10,
  },
  notifRow: { flexDirection: 'row', gap: 12 },
  notifCard: {
    flex: 1,
    backgroundColor: theme.colors.neutral.lightBg,
    borderRadius: theme.borderRadius.xl,
    padding: 14,
  },
  notifCardTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.neutral.gray[800],
    marginTop: 8,
    marginBottom: 4,
  },
  notifCardSub: {
    fontSize: 11,
    color: theme.colors.neutral.gray[400],
  },
  createZoneBtn: {
    backgroundColor: theme.colors.primary.deepPurple,
    borderRadius: theme.borderRadius.xl,
    paddingVertical: 16,
    alignItems: 'center',
  },
  createZoneBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
});
