import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function FavoritesScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela de Favoritos</Text>
      <Text style={styles.subtitle}>
        Esta tela será implementada pelo grupo!
      </Text>
      <Text style={styles.instructions}>
        {'\n'}Requisitos a implementar:{'\n\n'}
        ✅ Usar useContext para obter favoritos{'\n'}
        ✅ Exibir lista em FlatList{'\n'}
        ✅ Navegar para detalhes ao tocar{'\n'}
        ✅ Atualizar quando favoritos mudarem{'\n'}
        ✅ Mensagem quando lista vazia{'\n'}
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
