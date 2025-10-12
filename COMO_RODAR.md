# GUIA DEFINITIVO - Como Rodar o App (FUNCIONA!)

## ⚠️ IMPORTANTE: Você PRECISA estar na pasta correta!

Sempre execute os comandos a partir da pasta `pokedex-explorer`!

---

## MÉTODO 1: COMANDO ÚNICO (MAIS FÁCIL)

Abra o terminal no VS Code (`Ctrl + '`) e cole este comando completo:

```powershell
cd "c:\Users\Theo\Documents\PUC BSI - 6 periodo\mobile framework\react-native\pokedex-explorer"; $env:ANDROID_HOME = "$env:LOCALAPPDATA\Android\Sdk"; Start-Process "$env:ANDROID_HOME\emulator\emulator.exe" -ArgumentList "-avd","Small_Phone"; Start-Sleep -Seconds 40; npm start
```

Este comando faz TUDO:
1. Vai para pasta correta
2. Abre o emulador Small_Phone
3. Aguarda 40 segundos
4. Inicia o Expo

Depois de 40 segundos, quando aparecer o menu do Expo, pressione **`a`**

---

## MÉTODO 2: PASSO A PASSO (Se o método 1 não funcionar)

### Passo 1: Ir para pasta correta
```powershell
cd "c:\Users\Theo\Documents\PUC BSI - 6 periodo\mobile framework\react-native\pokedex-explorer"
```

### Passo 2: Abrir o Emulador
```powershell
$env:ANDROID_HOME = "$env:LOCALAPPDATA\Android\Sdk"; Start-Process "$env:ANDROID_HOME\emulator\emulator.exe" -ArgumentList "-avd","Small_Phone"
```

**AGUARDE** a janela do emulador abrir completamente (30-60 segundos)

---

## Passo 2: Iniciar o Expo

Quando o emulador estiver pronto, execute:

```bash
npm start
```

---

## Passo 3: Abrir o App

Quando aparecer o QR code no terminal, pressione a tecla:

```
a
```

PRONTO! O app vai abrir no emulador! 🎉

---

## ATALHO - Tudo em um arquivo

Criei um arquivo `run.ps1` que faz tudo automaticamente.

Execute:
```powershell
.\run.ps1
```

E depois pressione `a` quando o Expo iniciar.

---

## Usando o Celular (MAIS FÁCIL)

1. Instale o **Expo Go** no seu celular
2. Execute `npm start`
3. Escaneie o QR code com o app Expo Go
4. Pronto!

---

## Comandos do Expo

Quando `npm start` estiver rodando:
- `a` - Abrir no Android
- `r` - Recarregar app
- `w` - Abrir no navegador
- `?` - Ver todos comandos
