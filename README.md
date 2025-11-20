# Incubadora VPJS - Sistema Inteligente de Incubação

Um sistema completo de monitoramento e controle para incubação de ovos, desenvolvido com Next.js, Firebase e integração com hardware IoT.

## 🚀 Funcionalidades

### 🔐 Autenticação e Gestão de Usuários
- Cadastro e login profissional
- Persistência de sessão com Firebase Authentication
- Dados sincronizados por usuário no Realtime Database

### 📊 Monitoramento de Sensores (Tempo Real)
- **Temperatura**: Monitoramento térmico para desenvolvimento embrionário
- **Umidade**: Controle de umidade relativa do ar
- **Luminosidade**: Sensor de intensidade de luz no ambiente
- **Presença**: Detecção de movimento no ambiente

### ⚙️ Controle de Atuadores
- **Aquecedor**: Sistema de controle térmico
- **Umidificador**: Sistema de controle de umidade
- Controle via interface web com switches interativos

### 📱 Interface Responsiva
- Dashboard moderno com shadcn/ui
- Menu de navegação intuitivo
- Cards informativos em tempo real
- Design mobile-first

### 👥 Sobre a Equipe VPJS
- **Josue**: Desenvolvimento Full Stack & Integração de Tecnologias
- **Suelen**: UI/UX Design & Frontend
- **Pedro**: Programação de Circuitos Embarcados
- **Vinicius**: Engenharia Eletrônica & Hardware

## 🛠️ Stack Tecnológico

### Frontend
- **Next.js 15** com App Router
- **TypeScript** para tipagem segura
- **Tailwind CSS** para estilização
- **shadcn/ui** para componentes UI
- **Lucide React** para ícones

### Backend & Database
- **Firebase Authentication** para autenticação
- **Firebase Realtime Database** para sincronização
- **Next.js API Routes** para backend

### Hardware Integration
- **API REST** para comunicação com hardware
- **Arduino/ESP32** compatível
- Protocolos JSON para troca de dados

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── api/                 # API Routes
│   │   ├── sensores/       # Endpoint para dados dos sensores
│   │   ├── atuadores/      # Endpoint para controle dos atuadores
│   │   └── hardware/       # Endpoint para integração com hardware
│   ├── dashboard/          # Páginas do dashboard
│   │   ├── page.tsx        # Dashboard principal
│   │   ├── sensores.tsx    # Página de sensores
│   │   ├── atuadores.tsx   # Página de atuadores
│   │   └── sobre-nos.tsx   # Página sobre nós
│   ├── login/              # Página de login/cadastro
│   └── page.tsx            # Página inicial (redirecionamento)
├── contexts/
│   └── AuthContextVPJS.tsx # Contexto de autenticação
├── lib/
│   └── firebase.ts         # Configuração do Firebase
└── components/ui/           # Componentes shadcn/ui
```

## 🔧 Configuração

### Variáveis de Ambiente
O projeto usa as credenciais do Firebase já configuradas em `src/lib/firebase.ts`.

### Instalação
```bash
npm install
npm run dev
```

O projeto estará disponível em `http://localhost:3000`.

## 📡 API Endpoints

### Sensores
- `POST /api/sensores` - Atualizar dados dos sensores
- `GET /api/sensores?userId=<id>` - Obter dados dos sensores

### Atuadores
- `POST /api/atuadores` - Controlar atuadores
- `GET /api/atuadores?userId=<id>` - Obter status dos atuadores

### Hardware
- `POST /api/hardware` - Comandos para hardware
- `GET /api/hardware?action=status&userId=<id>` - Status do sistema

## 🔄 Fluxo de Dados

1. **Hardware** envia dados dos sensores para `/api/sensores`
2. **API** armazena dados no Firebase Realtime Database
3. **Frontend** escuta mudanças em tempo real via Firebase listeners
4. **Usuário** controla atuadores via interface web
5. **Frontend** envia comandos para `/api/atuadores`
6. **Hardware** pode consultar status via `/api/hardware`

## 🎨 Padrão de Nomenclatura

Todas as variáveis no código utilizam a sigla **VPJS** no final:
- `userVPJS` - Variável de usuário
- `sensorDataVPJS` - Dados dos sensores
- `atuadorDataVPJS` - Dados dos atuadores
- `loadingVPJS` - Estado de carregamento

## 🌐 Deploy

O projeto está pronto para deploy em plataformas como:
- **Vercel** (recomendado para Next.js)
- **Netlify**
- **Firebase Hosting**

## 📱 Mobile

Para versão mobile, utilize **Expo** com React Native:
- Compartilhe a mesma API REST
- Use as mesmas credenciais do Firebase
- Implemente interface mobile-first

## 🔒 Segurança

- Autenticação via Firebase Authentication
- Validação de dados nas API routes
- Sanitização de inputs
- CORS configurado para desenvolvimento

## 📊 Monitoramento

O sistema inclui:
- Cards em tempo real no dashboard
- Indicadores visuais de status
- Logs de atividade no console
- Métricas de performance

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Abra um Pull Request

## 📄 Licença

Este projeto é desenvolvido pela equipe VPJS para fins educacionais e comerciais.

---

**Equipe VPJS** - Transformando tecnologia em soluções para avicultura 🥚🔥💧