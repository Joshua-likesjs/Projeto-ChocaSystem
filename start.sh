#!/bin/bash

echo "🥚 Sistema de Monitoramento de Incubadora - Script de Teste"
echo "=========================================================="

# Verificar se o Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não está instalado. Por favor, instale o Node.js primeiro."
    exit 1
fi

# Verificar se o npm está instalado
if ! command -v npm &> /dev/null; then
    echo "❌ npm não está instalado. Por favor, instale o npm primeiro."
    exit 1
fi

echo "✅ Node.js e npm estão instalados"

# Verificar se as dependências estão instaladas
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependências..."
    npm install
else
    echo "✅ Dependências já estão instaladas"
fi

# Verificar se o arquivo de chave de serviço existe
if [ ! -f "serviceAccountKey.json" ]; then
    echo "⚠️  ATENÇÃO: Arquivo serviceAccountKey.json não encontrado!"
    echo "   Para demonstração completa do sistema:"
    echo "   1. Acesse https://console.firebase.google.com/"
    echo "   2. Selecione o projeto 'projeto-firewar'"
    echo "   3. Vá para Configurações > Contas de serviço"
    echo "   4. Clique em 'Gerar nova chave privada'"
    echo "   5. Salve o arquivo como 'serviceAccountKey.json' neste diretório"
    echo ""
    echo "   Deseja continuar sem o simulador? (s/n)"
    read -r response
    if [[ "$response" != "s" && "$response" != "S" ]]; then
        echo "❌ Operação cancelada. Configure o serviceAccountKey.json e tente novamente."
        exit 1
    fi
else
    echo "✅ Chave de serviço do Firebase encontrada"
fi

echo ""
echo "🚀 Iniciando aplicação..."
echo "   A aplicação estará disponível em: http://localhost:3000"
echo ""
echo "   Use Ctrl+C para parar o servidor"
echo ""

# Iniciar o servidor de desenvolvimento
npm run dev &

# Guardar o PID do servidor
DEV_PID=$!

# Esperar um pouco para o servidor iniciar
sleep 3

# Se o arquivo de chave existe, iniciar o simulador
if [ -f "serviceAccountKey.json" ]; then
    echo ""
    echo "🤖 Iniciando simulador de sensores em novo terminal..."
    
    # Verificar se estamos em um ambiente com suporte a múltiplos terminais
    if command -v gnome-terminal &> /dev/null; then
        gnome-terminal -- bash -c "node simulator.js; exec bash"
    elif command -v xterm &> /dev/null; then
        xterm -e "node simulator.js; exec bash"
    else
        echo "   Iniciando simulador em background (novo terminal não disponível)..."
        node simulator.js &
        SIM_PID=$!
        echo "   PID do simulador: $SIM_PID"
        echo "   Use 'kill $SIM_PID' para parar o simulador"
    fi
fi

echo ""
echo "📱 Pronto! Use a aplicação em http://localhost:3000"
echo ""
echo "   Passos para usar:"
echo "   1. Crie uma conta na aplicação"
echo "   2. Faça login"
echo "   3. Acompanhe os dados dos sensores em tempo real"
echo ""

# Esperar o usuário pressionar Ctrl+C
wait $DEV_PID