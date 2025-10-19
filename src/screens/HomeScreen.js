import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
  ActivityIndicator,
  Alert
} from 'react-native';
import { fetchPokemonList, fetchPokemonByNameOrId } from '../services/api';

export default function HomeScreen({ navigation }) {
  // Estados
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  // Carrega lista inicial ao montar o componente
  useEffect(() => {
    loadPokemon();
  }, []);

  /**
   * Carrega a lista inicial de Pokémon
   */
  const loadPokemon = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchPokemonList(0, 20);
      setPokemonList(data.pokemon);
      setOffset(20);
    } catch (err) {
      setError(err.message);
      Alert.alert('Erro', err.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Carrega mais Pokémon (paginação)
   */
  const loadMorePokemon = async () => {
    try {
      setLoadingMore(true);
      setError(null);
      const data = await fetchPokemonList(offset, 20);
      setPokemonList(prev => [...prev, ...data.pokemon]);
      setOffset(prev => prev + 20);
    } catch (err) {
      setError(err.message);
      Alert.alert('Erro', err.message);
    } finally {
      setLoadingMore(false);
    }
  };

  /**
   * Busca um Pokémon específico
   */
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      Alert.alert('Atenção', 'Digite o nome ou número de um Pokémon');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const pokemon = await fetchPokemonByNameOrId(searchQuery);
    
      navigation.navigate('Details', { pokemonID : pokemon.id});     
      setSearchQuery('');
    } catch (err) {
      setError(err.message);
      Alert.alert('Erro', err.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Renderiza cada item da grade
   */
  const renderPokemonItem = ({ item }) => (
    <TouchableOpacity
      style={styles.pokemonCard}
      onPress={() => {

        navigation.navigate('Details', { pokemonID: item.id });
      }}
    >
      <Image source={{ uri: item.image }} style={styles.pokemonImage} />
      <Text style={styles.pokemonId}>#{item.id}</Text>
      <Text style={styles.pokemonName}>{item.name}</Text>
    </TouchableOpacity>
  );

  // Tela de carregamento inicial
  if (loading && pokemonList.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#EF5350" />
        <Text style={styles.loadingText}>Carregando Pokémon...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header com título e botão de favoritos */}
      <View style={styles.header}>
        <Text style={styles.title}>Pokédex Explorer</Text>
        <TouchableOpacity
          style={styles.favButton}
          onPress={() => navigation.navigate('Favorites')}
        >
          <Text style={styles.favButtonText}>⭐ Favoritos</Text>
        </TouchableOpacity>
      </View>

      {/* Campo de busca */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por nome ou número..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={handleSearch}
        >
          <Text style={styles.searchButtonText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      {/* Mensagem de erro */}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {/* Lista de Pokémon em grade */}
      <FlatList
        data={pokemonList}
        renderItem={renderPokemonItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        ListFooterComponent={() => (
          <View style={styles.footer}>
            {loadingMore ? (
              <ActivityIndicator size="small" color="#EF5350" />
            ) : (
              <TouchableOpacity
                style={styles.loadMoreButton}
                onPress={loadMorePokemon}
              >
                <Text style={styles.loadMoreButtonText}>Carregar Mais</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#EF5350',
    padding: 20,
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  favButton: {
    backgroundColor: '#FFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  favButtonText: {
    color: '#EF5350',
    fontWeight: 'bold',
    fontSize: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#FFF',
    gap: 10,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: '#EF5350',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    justifyContent: 'center',
  },
  searchButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorContainer: {
    backgroundColor: '#FFEBEE',
    padding: 10,
    margin: 10,
    borderRadius: 8,
  },
  errorText: {
    color: '#C62828',
    textAlign: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  listContainer: {
    padding: 10,
  },
  pokemonCard: {
    flex: 1,
    backgroundColor: '#FFF',
    margin: 5,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pokemonImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  pokemonId: {
    fontSize: 12,
    color: '#999',
    marginBottom: 5,
  },
  pokemonName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  loadMoreButton: {
    backgroundColor: '#EF5350',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
  },
  loadMoreButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
