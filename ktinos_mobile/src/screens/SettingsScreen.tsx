import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { theme } from '../theme';
import { useAuth } from '../context/AuthContext';

export default function SettingsScreen() {
  const { logout, user } = useAuth();
  const [alerts, setAlerts] = useState({ health: true, expert: true, community: false });

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await logout();
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>⚙️ Settings</Text>
        <Text style={styles.headerSub}>Manage your account and preferences</Text>
      </View>

      {/* Profile Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profile</Text>
        <View style={styles.card}>
          <View style={styles.avatarCircle}>
            <Text style={{ fontSize: 32 }}>👤</Text>
          </View>
          <View style={{ flex: 1, marginLeft: 16 }}>
            <Text style={styles.userName}>{user?.name || 'User'}</Text>
            <Text style={styles.userEmail}>{user?.email || 'email@example.com'}</Text>
            <View style={styles.accountBadge}>
              <Text style={styles.accountBadgeText}>PREMIUM ACTIVE</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Vital Alerts */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔔 Vital Alerts</Text>
        <View style={styles.card}>
          {[
            { key: 'health', label: 'Health Milestones', sub: 'Vaccines and check-ups' },
            { key: 'expert', label: 'Expert Advice', sub: 'Weekly editorial content' },
            { key: 'community', label: 'Community Chat', sub: 'Direct messages and tags' },
          ].map((item) => (
            <View key={item.key} style={styles.alertRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.alertLabel}>{item.label}</Text>
                <Text style={styles.alertSub}>{item.sub}</Text>
              </View>
              <TouchableOpacity
                style={[
                  styles.toggle,
                  {
                    backgroundColor: alerts[item.key as keyof typeof alerts]
                      ? theme.colors.primary.healthGreen
                      : theme.colors.neutral.gray[200],
                  },
                ]}
                onPress={() =>
                  setAlerts({ ...alerts, [item.key]: !alerts[item.key as keyof typeof alerts] })
                }
                activeOpacity={0.8}
              >
                <View
                  style={[
                    styles.toggleThumb,
                    { left: alerts[item.key as keyof typeof alerts] ? 26 : 4 },
                  ]}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      {/* Security */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔒 Security & Access</Text>
        <View style={styles.card}>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuIcon}>🔑</Text>
            <Text style={styles.menuText}>Change Password</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuIcon}>🛡️</Text>
            <Text style={styles.menuText}>Manage 2FA</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Privacy */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔕 Privacy Portal</Text>
        <View style={styles.card}>
          <Text style={styles.privacyText}>
            ✅ Pet records are encrypted and visible only to you and your vet.
          </Text>
          <Text style={styles.privacyText}>
            ✅ GPS data is deleted every 24 hours automatically.
          </Text>
          <TouchableOpacity style={styles.exportBtn}>
            <Text style={styles.exportBtnText}>⬇️ Export My Data</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Danger Zone */}
      <View style={styles.section}>
        <View style={styles.dangerCard}>
          <Text style={styles.dangerTitle}>Danger Zone</Text>
          <Text style={styles.dangerText}>
            Deleting your account will permanently erase all pet health history.
          </Text>
          <TouchableOpacity style={styles.dangerBtn}>
            <Text style={styles.dangerBtnText}>Close Account</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Logout */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © 2024 Ktinoskare. A Sanctuary for Every Companion
        </Text>
      </View>

      <View style={{ height: 32 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.neutral.lightBg },
  header: {
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 16,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: theme.colors.primary.deepPurple,
  },
  headerSub: {
    fontSize: 13,
    color: theme.colors.neutral.gray[500],
    marginTop: 2,
  },
  section: { paddingHorizontal: 20, marginTop: 20 },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.primary.deepPurple,
    marginBottom: 10,
  },
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
  avatarCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: theme.colors.neutral.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.neutral.gray[900],
  },
  userEmail: {
    fontSize: 13,
    color: theme.colors.neutral.gray[500],
    marginTop: 2,
  },
  accountBadge: {
    backgroundColor: theme.colors.primary.healthGreen,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    marginTop: 8,
  },
  accountBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
  alertRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  alertLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.neutral.gray[800],
  },
  alertSub: {
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
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.neutral.gray[100],
  },
  menuIcon: { fontSize: 20, marginRight: 12 },
  menuText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.neutral.gray[700],
  },
  menuArrow: {
    fontSize: 20,
    color: theme.colors.neutral.gray[400],
  },
  privacyText: {
    fontSize: 12,
    color: theme.colors.neutral.gray[600],
    lineHeight: 18,
    marginBottom: 10,
  },
  exportBtn: {
    backgroundColor: theme.colors.primary.deepPurple,
    borderRadius: theme.borderRadius.xl,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 6,
  },
  exportBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  dangerCard: {
    backgroundColor: '#fff',
    borderRadius: theme.borderRadius.xl,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#fecaca',
  },
  dangerTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#dc2626',
    marginBottom: 6,
  },
  dangerText: {
    fontSize: 12,
    color: theme.colors.neutral.gray[500],
    lineHeight: 18,
    marginBottom: 12,
  },
  dangerBtn: {
    borderWidth: 1.5,
    borderColor: '#dc2626',
    borderRadius: theme.borderRadius.lg,
    paddingVertical: 10,
    alignItems: 'center',
  },
  dangerBtnText: {
    color: '#dc2626',
    fontSize: 13,
    fontWeight: '700',
  },
  logoutBtn: {
    backgroundColor: theme.colors.neutral.gray[800],
    borderRadius: theme.borderRadius.xl,
    paddingVertical: 16,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 11,
    color: theme.colors.neutral.gray[400],
    textAlign: 'center',
  },
});
