import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DetailsScreen({ route, navigation }) {
  // const { pokemon } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela de Detalhes</Text>
      <Text style={styles.subtitle}>
        Esta tela será implementada pelo grupo!
      </Text>
      <Text style={styles.instructions}>
        {'\n'}Requisitos a implementar:{'\n\n'}
        ✅ Receber Pokémon selecionado{'\n'}
        ✅ Buscar detalhes completos da API{'\n'}
        ✅ Exibir imagem, nome, número, tipos{'\n'}
        ✅ Exibir lista de habilidades{'\n'}
        ✅ Botão de favoritar/desfavoritar{'\n'}
        ✅ Integrar com Context API (favoritos){'\n'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  instructions: {
    fontSize: 14,
    color: '#999',
    textAlign: 'left',
    marginTop: 20,
    lineHeight: 22,
  },
});
