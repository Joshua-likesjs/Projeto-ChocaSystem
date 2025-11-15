# 🥚 Sistema de Monitoramento de Incubadora

Uma aplicação completa e moderna para monitoramento de incubadoras de ovos em tempo real, desenvolvida com Next.js, Firebase e tecnologias de ponta.

## 🎯 Funcionalidades Principais

### 🔐 Autenticação e Gestão de Usuários
- **Login Seguro**: Autenticação com e-mail e senha utilizando Firebase Authentication
- **Cadastro de Profissionais**: Registro completo com validação de dados
- **Sessão Persistente**: Mantém o usuário logado durante a navegação

### 📊 Monitoramento em Tempo Real
- **Temperatura**: Monitoramento contínuo (ideal: 37-38°C)
- **Umidade**: Controle de umidade relativa (ideal: 55-65%)
- **Presença**: Detecção de ovos na incubadora
- **Luminosidade**: Monitoramento de níveis de luz (ideal: 0-50 lux)
- **Atualização Automática**: Dados atualizados a cada 3 segundos via Firebase Realtime Database

### 📱 Interface Responsiva
- **Design Moderno**: Interface construída com shadcn/ui e Tailwind CSS
- **Dashboard Intuitivo**: Visualização clara dos dados com indicadores de status
- **Seção Institucional**: Página "Sobre Nós" com informações do projeto
- **Compatibilidade Mobile**: Funciona perfeitamente em dispositivos móveis e desktop

## 🛠️ Stack Tecnológico

### Frontend
- **⚡ Next.js 15** - Framework React com App Router
- **📘 TypeScript 5** - Tipagem segura e melhor DX
- **🎨 Tailwind CSS 4** - Framework CSS utility-first
- **🧩 shadcn/ui** - Componentes UI acessíveis e modernos
- **🎯 Lucide React** - Ícones consistentes e bonitos

### Backend & Serviços
- **🔥 Firebase** - Autenticação e banco de dados em tempo real
- **📡 Firebase Realtime Database** - Sincronização instantânea de dados
- **🔐 Firebase Authentication** - Sistema de autenticação seguro

### Simulação de Dados
- **🤖 Firebase Admin SDK** - Script para simulação de sensores
- **📊 Geração Automática** - Dados realistas atualizados a cada 3 segundos

## 🚀 Configuração e Instalação

### 🌐 Versão Web (Next.js)

#### 1. Instalação das Dependências

```bash
# Clonar o projeto
git clone <URL_DO_REPOSITORIO>
cd incubadora-monitoramento

# Instalar dependências
npm install
```

#### 2. Configuração do Firebase

O Firebase já está configurado com as credenciais fornecidas no arquivo `src/services/firebase.ts`.

#### 3. Configuração do Simulador de Sensores

⚠️ **PASSO OBRIGATÓRIO** para demonstração do sistema:

1. **Obter a Chave de Serviço do Firebase**:
   - Acesse o [Console do Firebase](https://console.firebase.google.com/)
   - Selecione o projeto "projeto-firewar"
   - Vá para **Configurações do projeto** > **Contas de serviço**
   - Clique em **"Gerar nova chave privada"**
   - Faça o download do arquivo JSON

2. **Configurar a Chave**:
   ```bash
   # Renomeie o arquivo baixado para:
   mv serviceAccountKey.json serviceAccountKey.json
   
   # Ou copie o conteúdo para o arquivo de exemplo:
   cp serviceAccountKey.example.json serviceAccountKey.json
   # Edite o arquivo serviceAccountKey.json com suas credenciais reais
   ```

3. **Instalar Dependência do Simulador**:
   ```bash
   npm install firebase-admin
   ```

#### 4. Executar a Aplicação Web

##### Iniciar o Servidor Web:
```bash
npm run dev
```
Acesse [http://localhost:3000](http://localhost:3000)

##### Iniciar o Simulador de Sensores (em terminal separado):
```bash
node simulator.js
```

### 📱 Versão Mobile (React Native + Expo)

#### 1. Navegar para o Projeto Mobile
```bash
cd mobile
```

#### 2. Instalar Dependências
```bash
npm install
```

#### 3. Iniciar o Expo
```bash
npm start
```

#### 4. Executar em Dispositivo
- **Android**: Pressione `a` no terminal ou escaneie o QR code com o app Expo Go
- **iOS**: Pressione `i` no terminal ou escaneie o QR code com o app Expo Go
- **Web**: Pressione `w` no terminal

#### 5. Pré-requisitos Mobile
- Node.js 16+
- Expo CLI: `npm install -g expo-cli`
- App Expo Go instalado no dispositivo

### 🔄 Compartilhamento de Dados

Ambas as versões (Web e Mobile) utilizam o mesmo Firebase Realtime Database, 
portanto os dados dos sensores são compartilhados em tempo real entre as plataformas.

## 📱 Como Usar a Aplicação

### 1. Criar Conta
- Acesse a aplicação web
- Clique em "Não tem uma conta? Cadastre-se"
- Preencha nome, e-mail e senha (mínimo 6 caracteres)
- Faça login com suas credenciais

### 2. Monitoramento
- Após o login, você verá o dashboard com 4 cards principais:
  - **Temperatura**: Valor atual com indicador de status (Verde: Ideal, Amarelo: Atenção, Vermelho: Crítico)
  - **Umidade**: Percentual com status correspondente
  - **Presença**: Detecção de ovos na incubadora
  - **Luminosidade**: Nível de luz em lux

### 3. Status Geral
- Na seção "Status Geral" você encontra:
  - Condições ideais para cada parâmetro
  - Status de conexão com os sensores
  - Timestamp da última atualização

### 4. Seção Sobre Nós
- Clique em "Sobre Nós" no header para conhecer mais sobre o projeto
- Visualize informações sobre tecnologias e funcionalidades

## 🔧 Estrutura do Projeto

```
├── src/                              # Versão Web (Next.js)
│   ├── app/
│   │   ├── page.tsx                  # Página principal com gerenciamento de rotas
│   │   ├── layout.tsx                # Layout da aplicação
│   │   └── globals.css               # Estilos globais
│   ├── components/
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx         # Formulário de login
│   │   │   └── RegisterForm.tsx      # Formulário de registro
│   │   ├── dashboard/
│   │   │   ├── Dashboard.tsx         # Dashboard principal
│   │   │   └── AboutScreen.tsx       # Página Sobre Nós
│   │   └── ui/                       # Componentes shadcn/ui
│   ├── hooks/
│   │   ├── useAuth.ts                # Hook de autenticação
│   │   └── useSensorData.ts          # Hook para dados dos sensores
│   ├── services/
│   │   └── firebase.ts               # Configuração do Firebase
│   └── types/
│       └── index.ts                  # Definições de tipos TypeScript
├── mobile/                           # Versão Mobile (React Native + Expo)
│   ├── src/
│   │   ├── screens/
│   │   │   ├── LoginScreen.tsx       # Tela de login
│   │   │   ├── RegisterScreen.tsx    # Tela de registro
│   │   │   ├── DashboardScreen.tsx   # Dashboard principal
│   │   │   └── AboutScreen.tsx       # Tela Sobre Nós
│   │   ├── hooks/
│   │   │   ├── useAuth.ts            # Hook de autenticação
│   │   │   └── useSensorData.ts      # Hook para dados dos sensores
│   │   ├── services/
│   │   │   └── firebase.ts           # Configuração do Firebase
│   │   └── types/
│   │       └── index.ts              # Definições de tipos TypeScript
│   ├── App.tsx                       # Componente principal do app
│   ├── package.json                  # Dependências mobile
│   └── app.json                      # Configuração Expo
├── simulator.js                      # Script de simulação de sensores
├── serviceAccountKey.json            # Chave de serviço do Firebase (não versionar)
└── package.json                      # Dependências web
```

### 🔄 Compartilhamento de Código

- **Serviços Firebase**: Ambas as plataformas compartilham a mesma configuração
- **Hooks**: Lógica de autenticação e dados reutilizada
- **Tipos TypeScript**: Definições compartilhadas entre plataformas
- **Dados em Tempo Real**: Mesmo Firebase Realtime Database para ambas

## 📊 Parâmetros Monitorados

### Temperatura
- **Ideal**: 37-38°C
- **Abaixo**: 36-36.9°C (Indicador amarelo)
- **Crítico**: <36°C ou >38°C (Indicador vermelho)

### Umidade
- **Ideal**: 55-65%
- **Baixa**: 45-54% (Indicador amarelo)
- **Crítica**: <45% ou >65% (Indicador vermelho)

### Luminosidade
- **Ideal**: 0-50 lux (Escuro - indicador verde)
- **Moderado**: 51-100 lux (Indicador amarelo)
- **Claro**: >100 lux (Indicador vermelho)

### Presença
- **Detectado**: Ovos presentes na incubadora
- **Vazio**: Incubadora sem ovos

## 🔒 Segurança

- **Autenticação Firebase**: Login seguro com tokens JWT
- **Regras de Database**: Acesso controlado aos dados dos sensores
- **Validação Client-side**: Validação de formulários no frontend
- **Tipagem TypeScript**: Prevenção de erros em tempo de desenvolvimento

## 🚀 Deploy

### Para Produção:

1. **Build da Aplicação**:
   ```bash
   npm run build
   ```

2. **Iniciar Servidor de Produção**:
   ```bash
   npm start
   ```

3. **Configurar Variáveis de Ambiente** (se necessário):
   - Firebase config já está embutida no código
   - Para produção, considere usar variáveis de ambiente

## 🐛 Troubleshooting

### Problemas Comuns:

1. **Erro de Autenticação Firebase**:
   - Verifique se as credenciais no `firebase.ts` estão corretas
   - Confirme se o Authentication está ativado no console Firebase

2. **Simulador Não Funciona**:
   - Verifique se o arquivo `serviceAccountKey.json` foi configurado corretamente
   - Confirme se o Firebase Admin SDK foi instalado: `npm install firebase-admin`

3. **Dados Não Atualizam**:
   - Certifique-se de que o simulador está rodando em terminal separado
   - Verifique o console do navegador por erros de conexão

4. **Problemas de Permissão**:
   - No console Firebase, verifique as regras do Realtime Database
   - Regras recomendadas para desenvolvimento:
     ```json
     {
       "rules": {
         ".read": "auth != null",
         ".write": "auth != null"
       }
     }
     ```

## 🤝 Contribuição

Este projeto foi desenvolvido como parte de um sistema de monitoramento para incubadoras. Contribuições são bem-vindas!

## 📄 Licença

Este projeto está sob licença MIT.

---

**Desenvolvido com ❤️ para monitoramento de incubadoras de ovos**
