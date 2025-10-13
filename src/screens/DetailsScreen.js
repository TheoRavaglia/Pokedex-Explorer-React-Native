import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
  TouchableOpacity
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { fetchPokemonByNameOrId } from '../services/api';

export default function DetailsScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const pokemonID = route?.params?.pokemonID;

  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!pokemonID) {
      setError('ID do Pokémon não fornecido.');
      setLoading(false);
      return;
    }

    const loadPokemonDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchPokemonByNameOrId(pokemonID);
        setPokemon(data);
      } catch (err) {
        setError(err.message);
        Alert.alert('Erro', err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPokemonDetails();
  }, [pokemonID]);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#EF5350" />
        <Text style={styles.loadingText}>Carregando detalhes...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!pokemon) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Nenhum dado do Pokémon disponível.</Text>
      </View>
    );
  }

  // Função utilitária para extrair stats no formato esperado
  const renderStats = (stats = []) => {
    return stats.map((s, idx) => {
      const name = s.stat?.name || s.name || 'stat';
      const value = s.base_stat ?? s.value ?? 0;
      return (
        <View key={idx} style={styles.statRow}>
          <Text style={styles.statName}>{name}</Text>
          <Text style={styles.statValue}>{value}</Text>
        </View>
      );
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{pokemon.name}</Text>
        <Text style={styles.pokemonId}>#{pokemon.id}</Text>
      </View>

      <View style={styles.imageWrap}>
        <Image source={{ uri: pokemon.image }} style={styles.pokemonImage} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tipos</Text>
        <View style={styles.badgesRow}>
          {(pokemon.types || []).map((t, i) => (
            <View key={i} style={styles.badge}>
              <Text style={styles.badgeText}>{t}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Habilidades</Text>
        {(pokemon.abilities || []).map((a, i) => (
          <Text key={i} style={styles.itemText}>- {a}</Text>
        ))}
      </View>

      <View style={styles.rowInfo}>
        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>Altura</Text>
          <Text style={styles.infoValue}>{pokemon.height}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>Peso</Text>
          <Text style={styles.infoValue}>{pokemon.weight}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Status</Text>
        {renderStats(pokemon.stats)}
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5'
  },
  content: {
    padding: 16,
    paddingBottom: 40
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    marginTop: 8,
    color: '#666'
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },
  pokemonId: {
    fontSize: 14,
    color: '#666'
  },
  imageWrap: {
    alignItems: 'center',
    marginVertical: 16
  },
  pokemonImage: {
    width: 200,
    height: 200
  },
  section: {
    marginVertical: 10,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8
  },
  badgesRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap'
  },
  badge: {
    backgroundColor: '#EF5350',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8
  },
  badgeText: {
    color: '#fff',
    textTransform: 'capitalize'
  },
  itemText: {
    fontSize: 14,
    marginBottom: 4
  },
  rowInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8
  },
  infoBox: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginRight: 8,
    alignItems: 'center'
  },
  infoLabel: {
    color: '#666',
    fontSize: 12
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomColor: '#eee',
    borderBottomWidth: 1
  },
  statName: {
    textTransform: 'capitalize'
  },
  statValue: {
    fontWeight: 'bold'
  },
  errorText: {
    color: '#C62828',
    textAlign: 'center'
  },
  backButton: {
    marginTop: 12,
    backgroundColor: '#EF5350',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});