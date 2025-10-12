# Pokédex Explorer - React Native

Um aplicativo de catálogo de Pokémon interativo desenvolvido com React Native e Expo.

## 🚀 Como executar

1. Instale as dependências:
```bash
npm install
```

2. Inicie o projeto:
```bash
npm start
```

3. Execute no dispositivo/emulador:
- Pressione `a` para Android
- Pressione `i` para iOS
- Ou escaneie o QR code com o app Expo Go

## 📋 Funcionalidades Implementadas (Parte 1)

- ✅ Tela Principal com lista de Pokémon em grade
- ✅ Carregamento inicial da PokéAPI
- ✅ Botão "Carregar Mais" para paginação
- ✅ Campo de busca por nome ou número
- ✅ Indicador de carregamento
- ✅ Tratamento de erros
- ✅ Estrutura de navegação preparada

## 🛠️ Tecnologias

- React Native
- Expo
- React Navigation
- Axios
- PokéAPI

## 📁 Estrutura do Projeto

```
pokedex-explorer/
├── src/
│   ├── screens/
│   │   ├── HomeScreen.js          # Tela principal com lista
│   │   ├── DetailsScreen.js       # (A implementar)
│   │   └── FavoritesScreen.js     # (A implementar)
│   ├── contexts/
│   │   └── FavoritesContext.js    # (A implementar)
│   └── services/
│       └── api.js                 # Serviço de comunicação com API
├── App.js
└── package.json
```

## 🎯 Próximos Passos (Para o Grupo)

1. Implementar `DetailsScreen.js` (RF03)
2. Criar `FavoritesContext.js` para gerenciamento de favoritos (RF04)
3. Implementar `FavoritesScreen.js` (RF05)
4. Conectar navegação completa entre telas
5. Adicionar funcionalidade de favoritar/desfavoritar
