import React, { createContext, useState, useContext } from 'react';

/**
 * Context para gerenciamento de Pokémon favoritos
 * 
 * TODO (Grupo): Implementar RF04
 * - Criar estado para armazenar favoritos
 * - Implementar função addFavorite
 * - Implementar função removeFavorite
 * - Implementar função isFavorite (verificar se está favoritado)
 * - Opcionalmente: persistir favoritos com AsyncStorage
 */

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  // TODO: Implementar funções de gerenciamento
  const addFavorite = (pokemon) => {
    // Implementar lógica
  };

  const removeFavorite = (pokemonId) => {
    // Implementar lógica
  };

  const isFavorite = (pokemonId) => {
    // Implementar lógica
    return false;
  };

  const toggleFavorite = (pokemon) => {
    // Implementar lógica
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites deve ser usado dentro de FavoritesProvider');
  }
  return context;
}

/**
 * Exemplo de implementação completa (comentado):
 * 
 * const addFavorite = (pokemon) => {
 *   setFavorites(prev => {
 *     if (prev.find(p => p.id === pokemon.id)) {
 *       return prev;
 *     }
 *     return [...prev, pokemon];
 *   });
 * };
 * 
 * const removeFavorite = (pokemonId) => {
 *   setFavorites(prev => prev.filter(p => p.id !== pokemonId));
 * };
 * 
 * const isFavorite = (pokemonId) => {
 *   return favorites.some(p => p.id === pokemonId);
 * };
 * 
 * const toggleFavorite = (pokemon) => {
 *   if (isFavorite(pokemon.id)) {
 *     removeFavorite(pokemon.id);
 *   } else {
 *     addFavorite(pokemon);
 *   }
 * };
 */
