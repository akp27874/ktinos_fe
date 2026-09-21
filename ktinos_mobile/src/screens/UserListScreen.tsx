import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { theme } from '../theme';
import { usePets } from '../context/PetsContext';
import { RootStackParamList } from '../navigation/RootNavigator';

type NavProp = NativeStackNavigationProp<RootStackParamList>;

const statusColor = (status: string) => {
  if (status === 'Healthy') return { bg: '#d1fae5', text: '#065f46' };
  if (status === 'Needs Attention') return { bg: '#fef3c7', text: '#92400e' };
  return { bg: '#fee2e2', text: '#991b1b' };
};

export default function UserListScreen() {
  const [tab, setTab] = useState<'card' | 'list'>('card');
  const navigation = useNavigation<NavProp>();
  const { pets } = usePets();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🐶 Pet Users</Text>
        <Text style={styles.headerSub}>All registered pets and owners</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tabBtn, tab === 'card' && styles.tabBtnActive]}
          onPress={() => setTab('card')}
        >
          <Text style={[styles.tabBtnText, tab === 'card' && styles.tabBtnTextActive]}>
            🃏 Card View
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabBtn, tab === 'list' && styles.tabBtnActive]}
          onPress={() => setTab('list')}
        >
          <Text style={[styles.tabBtnText, tab === 'list' && styles.tabBtnTextActive]}>
            📋 List View
          </Text>
        </TouchableOpacity>
      </View>

      {tab === 'card' ? (
        <FlatList
          data={pets}
          numColumns={2}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.cardGrid}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: pet }) => {
            const sc = statusColor(pet.healthStatus);
            return (
              <TouchableOpacity
                style={styles.petCard}
                onPress={() => navigation.navigate('PetDetails', { id: pet.id })}
                activeOpacity={0.8}
              >
                <Image source={{ uri: pet.avatar }} style={styles.petCardImage} />
                <Text style={styles.petCardName} numberOfLines={1}>{pet.petName}</Text>
                <Text style={styles.petCardBreed} numberOfLines={1}>{pet.breed} · {pet.age} yrs</Text>
                <Text style={styles.petCardOwner} numberOfLines={1}>Owner: {pet.ownerName}</Text>
                <View style={[styles.statusBadge, { backgroundColor: sc.bg }]}>
                  <Text style={[styles.statusText, { color: sc.text }]}>{pet.healthStatus}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.listContainer}>
            {pets.map((pet) => {
              const sc = statusColor(pet.healthStatus);
              return (
                <TouchableOpacity
                  key={pet.id}
                  style={styles.listItem}
                  onPress={() => navigation.navigate('PetDetails', { id: pet.id })}
                  activeOpacity={0.8}
                >
                  <Image source={{ uri: pet.avatar }} style={styles.listItemImage} />
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text style={styles.listItemName}>{pet.petName}</Text>
                    <Text style={styles.listItemBreed}>{pet.breed}</Text>
                    <Text style={styles.listItemOwner}>{pet.ownerName}</Text>
                  </View>
                  <View style={{ alignItems: 'flex-end', gap: 6 }}>
                    <View style={[styles.statusBadge, { backgroundColor: sc.bg }]}>
                      <Text style={[styles.statusText, { color: sc.text }]}>{pet.healthStatus}</Text>
                    </View>
                    <Text style={styles.listItemAge}>{pet.age} yrs</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={{ height: 24 }} />
        </ScrollView>
      )}
    </View>
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
  tabs: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.neutral.gray[100],
  },
  tabBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 2,
    borderColor: theme.colors.primary.deepPurple,
  },
  tabBtnActive: {
    backgroundColor: theme.colors.primary.deepPurple,
  },
  tabBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.primary.deepPurple,
  },
  tabBtnTextActive: {
    color: '#fff',
  },
  cardGrid: {
    padding: 12,
    gap: 12,
  },
  petCard: {
    flex: 1,
    margin: 6,
    backgroundColor: '#fff',
    borderRadius: theme.borderRadius.xl,
    padding: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  petCardImage: {
    width: '100%',
    height: 110,
    borderRadius: theme.borderRadius.lg,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  petCardName: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.primary.deepPurple,
    marginBottom: 2,
    textAlign: 'center',
  },
  petCardBreed: {
    fontSize: 11,
    color: theme.colors.neutral.gray[500],
    marginBottom: 2,
    textAlign: 'center',
  },
  petCardOwner: {
    fontSize: 11,
    color: theme.colors.neutral.gray[400],
    marginBottom: 8,
    textAlign: 'center',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    alignSelf: 'center',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
  },
  listContainer: {
    padding: 16,
    gap: 10,
  },
  listItem: {
    backgroundColor: '#fff',
    borderRadius: theme.borderRadius.xl,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    marginBottom: 10,
  },
  listItemImage: {
    width: 52,
    height: 52,
    borderRadius: 26,
    resizeMode: 'cover',
  },
  listItemName: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.primary.deepPurple,
  },
  listItemBreed: {
    fontSize: 12,
    color: theme.colors.neutral.gray[500],
    marginTop: 1,
  },
  listItemOwner: {
    fontSize: 11,
    color: theme.colors.neutral.gray[400],
    marginTop: 1,
  },
  listItemAge: {
    fontSize: 11,
    color: theme.colors.neutral.gray[500],
  },
});
