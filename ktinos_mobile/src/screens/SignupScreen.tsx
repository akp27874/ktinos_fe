import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../theme';
import { BASE_URL } from '../config/api';

export default function SignupScreen() {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    phone: '',
    address: '',
    emergency_contact: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignup = async () => {
    // Validate required fields
    if (!formData.username || !formData.email || !formData.password || !formData.first_name) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${BASE_URL}/api/v1/accounts/signup/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          role: 'OWNER', // Default role
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Signup failed');
      }

      Alert.alert(
        'Success!',
        'Account created successfully. Please login.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login' as never),
          },
        ]
      );
    } catch (err: any) {
      setError(err.message || 'Failed to create account. Please try again.');
      Alert.alert('Signup Failed', err.message || 'Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          {/* Brand */}
          <View style={styles.brandRow}>
            <Text style={styles.brandEmoji}>🐾</Text>
            <Text style={styles.brandText}>
              Ktinos<Text style={{ color: theme.colors.primary.healthGreen }}>kare</Text>
            </Text>
          </View>

          <Text style={styles.title}>Create Profile</Text>
          <Text style={styles.subtitle}>Join the pet care sanctuary community.</Text>

          {/* Username */}
          <Text style={styles.label}>Username *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter username"
            placeholderTextColor={theme.colors.neutral.gray[400]}
            value={formData.username}
            onChangeText={(val) => handleChange('username', val)}
            autoCapitalize="none"
          />

          {/* Email */}
          <Text style={styles.label}>Email Address *</Text>
          <TextInput
            style={styles.input}
            placeholder="your.email@example.com"
            placeholderTextColor={theme.colors.neutral.gray[400]}
            value={formData.email}
            onChangeText={(val) => handleChange('email', val)}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Password */}
          <Text style={styles.label}>Password *</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor={theme.colors.neutral.gray[400]}
            value={formData.password}
            onChangeText={(val) => handleChange('password', val)}
            secureTextEntry
          />

          {/* First Name */}
          <Text style={styles.label}>First Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="First name"
            placeholderTextColor={theme.colors.neutral.gray[400]}
            value={formData.first_name}
            onChangeText={(val) => handleChange('first_name', val)}
          />

          {/* Last Name */}
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Last name"
            placeholderTextColor={theme.colors.neutral.gray[400]}
            value={formData.last_name}
            onChangeText={(val) => handleChange('last_name', val)}
          />

          {/* Phone */}
          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            placeholder="Phone number"
            placeholderTextColor={theme.colors.neutral.gray[400]}
            value={formData.phone}
            onChangeText={(val) => handleChange('phone', val)}
            keyboardType="phone-pad"
          />

          {/* Address */}
          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Your address"
            placeholderTextColor={theme.colors.neutral.gray[400]}
            value={formData.address}
            onChangeText={(val) => handleChange('address', val)}
            multiline
          />

          {/* Emergency Contact */}
          <Text style={styles.label}>Emergency Contact</Text>
          <TextInput
            style={styles.input}
            placeholder="Emergency contact number"
            placeholderTextColor={theme.colors.neutral.gray[400]}
            value={formData.emergency_contact}
            onChangeText={(val) => handleChange('emergency_contact', val)}
            keyboardType="phone-pad"
          />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          {/* Submit */}
          <TouchableOpacity
            style={[styles.signupBtn, loading && { opacity: 0.7 }]}
            onPress={handleSignup}
            disabled={loading}
            activeOpacity={0.85}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.signupBtnText}>Create Account →</Text>
            )}
          </TouchableOpacity>

          <View style={styles.loginRow}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login' as never)}>
              <Text style={styles.loginLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fdf8ff',
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: theme.borderRadius['2xl'],
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  brandEmoji: { fontSize: 24 },
  brandText: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.primary.deepPurple,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: theme.colors.primary.deepPurple,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: theme.colors.neutral.gray[400],
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.neutral.gray[700],
    marginBottom: 6,
    marginTop: 4,
  },
  input: {
    backgroundColor: `${theme.colors.primary.softLavender}18`,
    borderRadius: theme.borderRadius.xl,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    color: theme.colors.neutral.gray[800],
    marginBottom: 10,
  },
  errorText: {
    fontSize: 12,
    color: '#ef4444',
    marginBottom: 8,
    marginTop: 4,
  },
  signupBtn: {
    backgroundColor: theme.colors.primary.healthGreen,
    borderRadius: theme.borderRadius['2xl'],
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  signupBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  loginText: {
    fontSize: 13,
    color: theme.colors.neutral.gray[400],
  },
  loginLink: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.primary.deepPurple,
  },
});
