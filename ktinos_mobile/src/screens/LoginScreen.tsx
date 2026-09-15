import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { theme } from '../theme';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    setError('');
    const success = await login(email, password);
    setLoading(false);
    if (!success) {
      Alert.alert('Login Failed', 'Invalid credentials. Please try again.');
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
        {/* Hero Image */}
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=500&q=80' }}
          style={styles.heroImage}
        />

        {/* Overlay gradient effect */}
        <View style={styles.card}>
          {/* Brand */}
          <View style={styles.brandRow}>
            <Text style={styles.brandEmoji}>🐾</Text>
            <Text style={styles.brandText}>
              Ktinos<Text style={{ color: theme.colors.primary.healthGreen }}>kare</Text>
            </Text>
          </View>

          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to manage your pet sanctuary.</Text>

          {/* Vitality Badge */}
          <View style={styles.vitalityBadge}>
            <View style={styles.greenDot} />
            <Text style={styles.vitalityText}>98.4% Health Vitality</Text>
          </View>

          {/* Email */}
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder="care@petcare.com"
            placeholderTextColor={theme.colors.neutral.gray[400]}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Password */}
          <View style={styles.passwordHeader}>
            <Text style={styles.label}>Password</Text>
            <TouchableOpacity>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor={theme.colors.neutral.gray[400]}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          {/* Submit */}
          <TouchableOpacity
            style={[styles.loginBtn, loading && { opacity: 0.7 }]}
            onPress={handleLogin}
            disabled={loading}
            activeOpacity={0.85}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.loginBtnText}>Sign In to Dashboard →</Text>
            )}
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>SOCIAL CONNECT</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social */}
          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialBtn}>
              <Text style={styles.socialBtnText}>G  Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn}>
              <Text style={styles.socialBtnText}>  Apple</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.signupRow}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <TouchableOpacity>
              <Text style={styles.signupLink}>Create Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer links */}
        <View style={styles.footerLinks}>
          {['Privacy Policy', 'Terms of Care', 'Help Center'].map((link) => (
            <TouchableOpacity key={link}>
              <Text style={styles.footerLink}>{link}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fdf8ff',
  },
  heroImage: {
    width: '100%',
    height: 220,
    resizeMode: 'cover',
  },
  card: {
    margin: 16,
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
    marginBottom: 12,
  },
  vitalityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: theme.colors.neutral.gray[100],
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.full,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.primary.healthGreen,
  },
  vitalityText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.primary.deepPurple,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.neutral.gray[700],
    marginBottom: 6,
  },
  input: {
    backgroundColor: `${theme.colors.primary.softLavender}18`,
    borderRadius: theme.borderRadius.xl,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    color: theme.colors.neutral.gray[800],
    marginBottom: 14,
  },
  passwordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  forgotText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.primary.deepPurple,
    marginBottom: 6,
  },
  errorText: {
    fontSize: 12,
    color: '#ef4444',
    marginBottom: 8,
  },
  loginBtn: {
    backgroundColor: theme.colors.primary.healthGreen,
    borderRadius: theme.borderRadius['2xl'],
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 4,
  },
  loginBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.neutral.gray[200],
  },
  dividerText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: theme.colors.neutral.gray[400],
  },
  socialRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  socialBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: theme.borderRadius.xl,
    backgroundColor: `${theme.colors.primary.softLavender}18`,
    alignItems: 'center',
  },
  socialBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.neutral.gray[600],
  },
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    fontSize: 13,
    color: theme.colors.neutral.gray[400],
  },
  signupLink: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.primary.deepPurple,
  },
  footerLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  footerLink: {
    fontSize: 11,
    color: theme.colors.neutral.gray[400],
    textDecorationLine: 'underline',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
