import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { theme } from '../theme';
import { usePets } from '../context/PetsContext';
import { RootStackParamList } from '../navigation/RootNavigator';
import axiosInstance from '../config/axiosInstance';
import { ENDPOINTS } from '../config/api';

type PetDetailsRouteProp = RouteProp<RootStackParamList, 'PetDetails'>;
type NavProp = NativeStackNavigationProp<RootStackParamList>;

const statusColor = (status: string) => {
  if (status === 'Healthy') return { bg: '#d1fae5', text: '#065f46' };
  if (status === 'Needs Attention') return { bg: '#fef3c7', text: '#92400e' };
  return { bg: '#fee2e2', text: '#991b1b' };
};

export default function PetDetailsScreen() {
  const route = useRoute<PetDetailsRouteProp>();
  const navigation = useNavigation<NavProp>();
  const { pets, updatePet, refetch } = usePets();
  const pet = pets.find((p) => p.id === route.params.id);

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(pet || {});
  const [saving, setSaving] = useState(false);

  if (!pet) {
    return (
      <View style={styles.centered}>
        <Text style={{ fontSize: 16, color: theme.colors.neutral.gray[500] }}>
          Pet not found.
        </Text>
      </View>
    );
  }

  const handleSave = async () => {
    if (!form) return;
    setSaving(true);
    try {
      await axiosInstance.patch(ENDPOINTS.updatePet(form.id, 1), {
        name: form.petName,
        breed: form.breed,
        gender: form.gender,
        weight: Number(form.weight) || 0,
        color: form.color,
        vaccinated: form.vaccinated,
        lastCheckup: form.lastCheckup || null,
        nextCheckup: form.nextCheckup || null,
        healthStatus: form.healthStatus,
        notes: form.notes,
      });
      updatePet(form);
      refetch();
      setEditing(false);
      Alert.alert('Success', 'Pet details updated!');
    } catch {
      Alert.alert('Error', 'Failed to save. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const sc = statusColor(pet.healthStatus);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
      </View>

      {/* Banner */}
      <View style={styles.banner} />

      {/* Avatar & Info */}
      <View style={styles.avatarSection}>
        <Image source={{ uri: pet.avatar }} style={styles.avatar} />
        <View style={{ flex: 1, marginLeft: 16 }}>
          {editing ? (
            <TextInput
              style={styles.nameInput}
              value={form.petName}
              onChangeText={(text) => setForm({ ...form, petName: text })}
            />
          ) : (
            <Text style={styles.petName}>{pet.petName}</Text>
          )}
          <Text style={styles.petBreed}>{pet.breed}</Text>
          <View style={[styles.statusBadge, { backgroundColor: sc.bg }]}>
            <Text style={[styles.statusText, { color: sc.text }]}>
              {pet.healthStatus}
            </Text>
          </View>
        </View>
        {editing ? (
          <View style={styles.editBtns}>
            <TouchableOpacity
              style={[styles.saveBtn, saving && { opacity: 0.6 }]}
              onPress={handleSave}
              disabled={saving}
            >
              <Text style={styles.saveBtnText}>{saving ? 'Saving...' : 'Save'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => {
                setForm(pet);
                setEditing(false);
              }}
            >
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => {
              setForm(pet);
              setEditing(true);
            }}
          >
            <Text style={styles.editBtnText}>✏️ Edit</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Info Sections */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🐾 Pet Information</Text>
        {[
          { label: 'Species', value: form.species },
          { label: 'Breed', value: form.breed },
          { label: 'Weight', value: `${form.weight} kg` },
          { label: 'Gender', value: form.gender },
          { label: 'Color', value: form.color },
        ].map((field) => (
          <View key={field.label} style={styles.field}>
            <Text style={styles.fieldLabel}>{field.label}</Text>
            {editing && field.label !== 'Species' && field.label !== 'Breed' ? (
              <TextInput
                style={styles.fieldInput}
                value={String(field.value)}
                onChangeText={(text) => {
                  const key = field.label.toLowerCase();
                  setForm({ ...form, [key]: text });
                }}
              />
            ) : (
              <Text style={styles.fieldValue}>{field.value}</Text>
            )}
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🏥 Health Records</Text>
        {[
          { label: 'Health Status', value: form.healthStatus },
          { label: 'Last Checkup', value: form.lastCheckup },
          { label: 'Next Checkup', value: form.nextCheckup },
          { label: 'Vaccinated', value: form.vaccinated ? 'Yes' : 'No' },
        ].map((field) => (
          <View key={field.label} style={styles.field}>
            <Text style={styles.fieldLabel}>{field.label}</Text>
            <Text style={styles.fieldValue}>{field.value}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📝 Notes</Text>
        {editing ? (
          <TextInput
            style={styles.notesInput}
            value={form.notes}
            onChangeText={(text) => setForm({ ...form, notes: text })}
            multiline
            numberOfLines={4}
          />
        ) : (
          <Text style={styles.notesText}>{pet.notes || '—'}</Text>
        )}
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
    paddingBottom: 12,
  },
  backBtn: {
    alignSelf: 'flex-start',
  },
  backText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.primary.deepPurple,
  },
  banner: {
    height: 120,
    backgroundColor: theme.colors.primary.deepPurple,
  },
  avatarSection: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    marginTop: -40,
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#fff',
  },
  petName: {
    fontSize: 22,
    fontWeight: '800',
    color: theme.colors.primary.deepPurple,
  },
  petBreed: {
    fontSize: 13,
    color: theme.colors.neutral.gray[500],
    marginVertical: 4,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    alignSelf: 'flex-start',
  },
  statusText: { fontSize: 10, fontWeight: '700' },
  editBtn: {
    backgroundColor: theme.colors.primary.deepPurple,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: theme.borderRadius.full,
  },
  editBtnText: { color: '#fff', fontSize: 13, fontWeight: '700' },
  editBtns: { gap: 6 },
  saveBtn: {
    backgroundColor: theme.colors.primary.healthGreen,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: theme.borderRadius.full,
  },
  saveBtnText: { color: '#fff', fontSize: 13, fontWeight: '700' },
  cancelBtn: {
    borderWidth: 1.5,
    borderColor: theme.colors.neutral.gray[300],
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: theme.borderRadius.full,
  },
  cancelBtnText: {
    color: theme.colors.neutral.gray[600],
    fontSize: 13,
    fontWeight: '700',
  },
  nameInput: {
    fontSize: 22,
    fontWeight: '800',
    color: theme.colors.primary.deepPurple,
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.primary.deepPurple,
    paddingVertical: 4,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.primary.deepPurple,
    marginBottom: 12,
  },
  field: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.neutral.gray[100],
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.neutral.gray[500],
    flex: 1,
  },
  fieldValue: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.neutral.gray[800],
    flex: 1,
    textAlign: 'right',
  },
  fieldInput: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.neutral.gray[800],
    flex: 1,
    textAlign: 'right',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.primary.deepPurple,
    paddingVertical: 4,
  },
  notesInput: {
    backgroundColor: '#fff',
    borderRadius: theme.borderRadius.lg,
    padding: 14,
    fontSize: 13,
    color: theme.colors.neutral.gray[700],
    minHeight: 100,
    textAlignVertical: 'top',
  },
  notesText: {
    fontSize: 13,
    color: theme.colors.neutral.gray[700],
    lineHeight: 20,
  },
});
