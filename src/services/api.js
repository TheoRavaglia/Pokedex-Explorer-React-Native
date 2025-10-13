import axios from 'axios';

const API_BASE_URL = 'https://pokeapi.co/api/v2';

/**
 * Busca uma lista paginada de Pokémon
 * @param {number} offset - Offset para paginação
 * @param {number} limit - Quantidade de Pokémon por página
 * @returns {Promise} Lista de Pokémon com detalhes básicos
 */
export const fetchPokemonList = async (offset = 0, limit = 20) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/pokemon`, {
      params: { offset, limit }
    });

    // Para cada Pokémon, buscar detalhes adicionais (imagem, id)
    const pokemonWithDetails = await Promise.all(
      response.data.results.map(async (pokemon) => {
        const details = await axios.get(pokemon.url);
        return {
          id: details.data.id,
          name: details.data.name,
          image: details.data.sprites.front_default,
          url: pokemon.url
        };
      })
    );

    return {
      pokemon: pokemonWithDetails,
      next: response.data.next,
      previous: response.data.previous,
      count: response.data.count
    };
  } catch (error) {
    console.error('Erro ao buscar lista de Pokémon:', error);
    throw new Error('Falha ao carregar Pokémon. Verifique sua conexão.');
  }
};

/**
 * Busca um Pokémon específico por nome ou ID
 * @param {string|number} nameOrId - Nome ou ID do Pokémon
 * @returns {Promise} Detalhes do Pokémon
 */
export const fetchPokemonByNameOrId = async (nameOrId) => {
  try {
    // Garantir que nameOrId seja uma string válida (aceitar números também)
    if (nameOrId === undefined || nameOrId === null) {
      throw new Error('Nome ou ID inválido');
    }

    const query = String(nameOrId).trim().toLowerCase();
    if (!query) {
      throw new Error('Nome ou ID inválido');
    }

    const response = await axios.get(`${API_BASE_URL}/pokemon/${encodeURIComponent(query)}`);
    return {
      id: response.data.id,
      name: response.data.name,
      image: response.data.sprites.front_default,
      types: response.data.types.map(t => t.type.name),
      abilities: response.data.abilities.map(a => a.ability.name),
      height: response.data.height,
      weight: response.data.weight,
      stats: response.data.stats
    };
  } catch (error) {
    console.error('Erro ao buscar Pokémon:', error);
    // Se a API retornou 404, informar que não encontrou; senão propagar mensagem mais descritiva
    if (error.response && error.response.status === 404) {
      throw new Error('Pokémon não encontrado. Verifique o nome ou número.');
    }
    throw new Error(error.message || 'Pokémon não encontrado. Verifique o nome ou número.');
  }
};

/**
 * Busca detalhes completos de um Pokémon (para tela de detalhes)
 * @param {string} url - URL do Pokémon
 * @returns {Promise} Detalhes completos do Pokémon
 */
export const fetchPokemonDetails = async (url) => {
  try {
    const response = await axios.get(url);
    return {
      id: response.data.id,
      name: response.data.name,
      image: response.data.sprites.other['official-artwork'].front_default || response.data.sprites.front_default,
      types: response.data.types.map(t => t.type.name),
      abilities: response.data.abilities.map(a => a.ability.name),
      height: response.data.height,
      weight: response.data.weight,
      stats: response.data.stats.map(s => ({
        name: s.stat.name,
        value: s.base_stat
      }))
    };
  } catch (error) {
    console.error('Erro ao buscar detalhes do Pokémon:', error);
    throw new Error('Falha ao carregar detalhes do Pokémon.');
  }
};
