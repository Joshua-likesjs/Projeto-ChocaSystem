#!/bin/bash

echo "🚀 Iniciando Sistema Incubadora VPJS - Web + Mobile"
echo "=================================================="

# Verificar se estamos no diretório correto
if [ ! -f "package.json" ]; then
    echo "❌ Erro: Navegue até o diretório raiz do projeto"
    exit 1
fi

# Iniciar o servidor web em background
echo "📡 Iniciando servidor web (Next.js)..."
npm run dev &
WEB_PID=$!

# Aguardar o servidor web iniciar
echo "⏳ Aguardando servidor web iniciar..."
sleep 10

# Verificar se o servidor web está rodando
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ Servidor web iniciado com sucesso!"
else
    echo "❌ Erro ao iniciar servidor web"
    kill $WEB_PID 2>/dev/null
    exit 1
fi

# Navegar para o diretório mobile
echo "📱 Iniciando aplicativo mobile (Expo)..."
cd mobile

# Instalar dependências se necessário
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependências mobile..."
    npm install
fi

# Iniciar o Expo com tunnel
echo "🌐 Iniciando Expo com tunnel..."
echo "📋 URL do tunnel será gerada em instantes..."
echo "📋 Use o QR Code no app Expo Go do seu celular"
echo ""

npm start --tunnel &
MOBILE_PID=$!

# Função para limpar os processos ao sair
cleanup() {
    echo ""
    echo "🛑 Encerrando processos..."
    kill $WEB_PID 2>/dev/null
    kill $MOBILE_PID 2>/dev/null
    echo "✅ Sistema encerrado com sucesso!"
    exit 0
}

# Capturar sinais de saída
trap cleanup SIGINT SIGTERM

echo ""
echo "🎉 Sistema VPJS iniciado!"
echo "📡 Web: http://localhost:3000"
echo "📱 Mobile: Aguarde URL do tunnel..."
echo ""
echo "🛑 Pressione Ctrl+C para encerrar ambos os sistemas"
echo ""

# Manter o script rodando
wait