import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { theme } from '../theme';
import { usePets } from '../context/PetsContext';
import axiosInstance from '../config/axiosInstance';
import { ENDPOINTS } from '../config/api';
import * as ImagePicker from 'expo-image-picker';

interface SpeciesOption {
  id: number;
  name: string;
}

interface BreedOption {
  id: number;
  name: string;
  species: number;
}

interface AddPetModalProps {
  visible: boolean;
  onClose: () => void;
}

const emptyForm = {
  petName: '',
  species: '',
  speciesId: '',
  breed: '',
  breedId: '',
  weight: '',
  gender: 'Male',
  dob: '',
  color: '',
  device: '',
};

export default function AddPetModal({ visible, onClose }: AddPetModalProps) {
  const { addPet, refetch } = usePets();
  const [form, setForm] = useState(emptyForm);
  const [speciesList, setSpeciesList] = useState<SpeciesOption[]>([]);
  const [breedList, setBreedList] = useState<BreedOption[]>([]);
  const [photoPreview, setPhotoPreview] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);
  const [apiError, setApiError] = useState('');
  const [saving, setSaving] = useState(false);

  const visibleBreedList = form.speciesId ? breedList : [];

  // Fetch species on mount
  useEffect(() => {
    if (visible) {
      axiosInstance
        .get(ENDPOINTS.species)
        .then((res) => setSpeciesList(res.data ?? []))
        .catch(() => setSpeciesList([]));
    }
  }, [visible]);

  // Fetch breeds when species changes
  useEffect(() => {
    if (!form.speciesId) return;
    axiosInstance
      .get(ENDPOINTS.breeds(form.speciesId))
      .then((res) => setBreedList(res.data ?? []))
      .catch(() => setBreedList([]));
  }, [form.speciesId]);

  const handlePhotoSelect = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('Permission Required', 'Please allow access to your photo library.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setPhotoPreview(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!form.petName || !form.speciesId || !form.breedId) {
      Alert.alert('Missing Fields', 'Please fill in pet name, species, and breed.');
      return;
    }

    setApiError('');
    setSaving(true);
    const today = new Date().toISOString().split('T')[0];
    const nextMonth = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0];

    const payload = {
      owner_id: 1,
      device: Number(form.device) || null,
      name: form.petName,
      breed_id: Number(form.breedId),
      species_id: Number(form.speciesId),
      gender: form.gender,
      dob: form.dob || today,
      age: 0,
      weight: Number(form.weight) || 0,
      color: form.color || '',
      vaccinated: false,
      lastCheckup: today,
      nextCheckup: nextMonth,
      healthStatus: 'Healthy',
      notes: '',
      avatar: photoPreview || '',
    };

    try {
      await axiosInstance.post(ENDPOINTS.addPet, payload);
      
      // Add to local state
      const newPet = {
        id: Date.now(),
        ownerName: '',
        ownerEmail: '',
        ownerPhone: '',
        petName: form.petName,
        species: form.species,
        speciesId: Number(form.speciesId),
        breed: form.breed,
        breedId: Number(form.breedId),
        age: 0,
        weight: form.weight,
        gender: form.gender,
        color: form.color,
        vaccinated: false,
        lastCheckup: today,
        nextCheckup: nextMonth,
        healthStatus: 'Healthy' as const,
        notes: '',
        avatar:
          photoPreview ||
          'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200&q=80',
        device: Number(form.device) || undefined,
      };
      addPet(newPet);
      refetch();
      setSubmitted(true);
      setTimeout(() => {
        handleClose();
      }, 1500);
    } catch (err: any) {
      const msg = err?.response?.data;
      setApiError(msg ? JSON.stringify(msg) : 'Failed to add pet. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleClose = () => {
    setForm(emptyForm);
    setPhotoPreview('');
    setSubmitted(false);
    setApiError('');
    setSaving(false);
    setBreedList([]);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={handleClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <View>
              <Text style={styles.modalTitle}>Add New Pet</Text>
              <Text style={styles.modalSubtitle}>Fill in the details to register a new pet</Text>
            </View>
            <TouchableOpacity onPress={handleClose} style={styles.closeBtn}>
              <Text style={styles.closeText}>×</Text>
            </TouchableOpacity>
          </View>

          {submitted ? (
            <View style={styles.successView}>
              <Text style={{ fontSize: 60 }}>🐾</Text>
              <Text style={styles.successTitle}>Pet Added Successfully!</Text>
              <Text style={styles.successText}>
                Your new pet has been registered to the sanctuary.
              </Text>
            </View>
          ) : (
            <ScrollView style={styles.formScroll} showsVerticalScrollIndicator={false}>
              {/* Pet Name */}
              <Text style={styles.fieldLabel}>Pet Name *</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Buddy"
                value={form.petName}
                onChangeText={(text) => setForm({ ...form, petName: text })}
              />

              {/* Species */}
              <Text style={styles.fieldLabel}>Species *</Text>
              <View style={styles.pickerContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {speciesList.map((s) => (
                    <TouchableOpacity
                      key={s.id}
                      style={[
                        styles.optionBtn,
                        form.speciesId === String(s.id) && styles.optionBtnActive,
                      ]}
                      onPress={() => {
                        setBreedList([]);
                        setForm({
                          ...form,
                          speciesId: String(s.id),
                          species: s.name,
                          breed: '',
                          breedId: '',
                        });
                      }}
                    >
                      <Text
                        style={[
                          styles.optionText,
                          form.speciesId === String(s.id) && styles.optionTextActive,
                        ]}
                      >
                        {s.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* Breed */}
              {form.speciesId && (
                <>
                  <Text style={styles.fieldLabel}>Breed *</Text>
                  <View style={styles.pickerContainer}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                      {visibleBreedList.map((b) => (
                        <TouchableOpacity
                          key={b.id}
                          style={[
                            styles.optionBtn,
                            form.breedId === String(b.id) && styles.optionBtnActive,
                          ]}
                          onPress={() =>
                            setForm({ ...form, breedId: String(b.id), breed: b.name })
                          }
                        >
                          <Text
                            style={[
                              styles.optionText,
                              form.breedId === String(b.id) && styles.optionTextActive,
                            ]}
                          >
                            {b.name}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                </>
              )}

              {/* Weight + Gender */}
              <View style={styles.row}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.fieldLabel}>Weight (kg)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="e.g. 10"
                    keyboardType="numeric"
                    value={form.weight}
                    onChangeText={(text) => setForm({ ...form, weight: text })}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.fieldLabel}>Gender</Text>
                  <View style={styles.genderRow}>
                    {['Male', 'Female'].map((g) => (
                      <TouchableOpacity
                        key={g}
                        style={[
                          styles.genderBtn,
                          form.gender === g && styles.genderBtnActive,
                        ]}
                        onPress={() => setForm({ ...form, gender: g })}
                      >
                        <Text
                          style={[
                            styles.genderText,
                            form.gender === g && styles.genderTextActive,
                          ]}
                        >
                          {g}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>

              {/* Color + Device */}
              <View style={styles.row}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.fieldLabel}>Color</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="e.g. Golden"
                    value={form.color}
                    onChangeText={(text) => setForm({ ...form, color: text })}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.fieldLabel}>Device ID</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="e.g. 10"
                    keyboardType="numeric"
                    value={form.device}
                    onChangeText={(text) => setForm({ ...form, device: text })}
                  />
                </View>
              </View>

              {/* DOB */}
              <Text style={styles.fieldLabel}>Date of Birth</Text>
              <TextInput
                style={styles.input}
                placeholder="YYYY-MM-DD"
                value={form.dob}
                onChangeText={(text) => setForm({ ...form, dob: text })}
              />

              {/* Photo Upload */}
              <Text style={styles.fieldLabel}>Pet Photo</Text>
              <View style={styles.photoRow}>
                <View style={styles.photoPreview}>
                  {photoPreview ? (
                    <Image source={{ uri: photoPreview }} style={styles.photoImage} />
                  ) : (
                    <Text style={{ fontSize: 32 }}>🐾</Text>
                  )}
                </View>
                <TouchableOpacity style={styles.uploadBtn} onPress={handlePhotoSelect}>
                  <Text style={styles.uploadText}>
                    📷 {photoPreview ? 'Change Photo' : 'Upload Photo'}
                  </Text>
                </TouchableOpacity>
              </View>

              {apiError ? <Text style={styles.errorText}>{apiError}</Text> : null}

              {/* Buttons */}
              <View style={styles.btnRow}>
                <TouchableOpacity style={styles.cancelBtn} onPress={handleClose}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.submitBtn, saving && { opacity: 0.6 }]}
                  onPress={handleSubmit}
                  disabled={saving}
                >
                  {saving ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.submitText}>Add Pet</Text>
                  )}
                </TouchableOpacity>
              </View>

              <View style={{ height: 20 }} />
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: theme.borderRadius['2xl'],
    borderTopRightRadius: theme.borderRadius['2xl'],
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.neutral.gray[100],
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.primary.deepPurple,
  },
  modalSubtitle: {
    fontSize: 12,
    color: theme.colors.neutral.gray[400],
    marginTop: 2,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.neutral.gray[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    fontSize: 24,
    color: theme.colors.neutral.gray[500],
  },
  successView: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.primary.deepPurple,
    marginTop: 16,
    marginBottom: 8,
  },
  successText: {
    fontSize: 14,
    color: theme.colors.neutral.gray[500],
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  formScroll: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.neutral.gray[600],
    marginBottom: 8,
    marginTop: 8,
  },
  input: {
    backgroundColor: theme.colors.neutral.lightBg,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: theme.colors.neutral.gray[800],
    borderWidth: 1,
    borderColor: theme.colors.neutral.gray[200],
  },
  pickerContainer: {
    marginBottom: 8,
  },
  optionBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.neutral.lightBg,
    marginRight: 8,
    borderWidth: 1,
    borderColor: theme.colors.neutral.gray[200],
  },
  optionBtnActive: {
    backgroundColor: theme.colors.primary.deepPurple,
    borderColor: theme.colors.primary.deepPurple,
  },
  optionText: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.neutral.gray[600],
  },
  optionTextActive: {
    color: '#fff',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  genderRow: {
    flexDirection: 'row',
    gap: 8,
  },
  genderBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.neutral.lightBg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.neutral.gray[200],
  },
  genderBtnActive: {
    backgroundColor: theme.colors.primary.deepPurple,
    borderColor: theme.colors.primary.deepPurple,
  },
  genderText: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.neutral.gray[600],
  },
  genderTextActive: {
    color: '#fff',
  },
  photoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 12,
  },
  photoPreview: {
    width: 60,
    height: 60,
    borderRadius: theme.borderRadius.xl,
    backgroundColor: theme.colors.neutral.lightBg,
    borderWidth: 1,
    borderColor: theme.colors.neutral.gray[200],
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  photoImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  uploadBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1.5,
    borderColor: theme.colors.primary.deepPurple,
    alignItems: 'center',
  },
  uploadText: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.primary.deepPurple,
  },
  errorText: {
    fontSize: 12,
    color: '#ef4444',
    marginTop: 8,
    textAlign: 'center',
  },
  btnRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: theme.borderRadius.xl,
    borderWidth: 1,
    borderColor: theme.colors.neutral.gray[300],
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.neutral.gray[600],
  },
  submitBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: theme.borderRadius.xl,
    backgroundColor: theme.colors.primary.healthGreen,
    alignItems: 'center',
  },
  submitText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
});
