// simulator.js
const admin = require('firebase-admin');

// !! IMPORTANTE: Você precisa baixar a chave de serviço do seu projeto Firebase !!
// 1. Vá para o Console do Firebase > Configurações do projeto > Contas de serviço.
// 2. Clique em "Gerar nova chave privada" e faça o download do arquivo JSON.
// 3. Salve o arquivo como 'serviceAccountKey.json' na mesma pasta que este script.
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://projeto-firewar-default-rtdb.firebaseio.com" // Use a mesma URL do firebaseConfig
});

const db = admin.database();
const sensorRef = db.ref('/incubator/sensorData');

console.log('🚀 Iniciando simulador de sensores...');

function generateRandomSensorData() {
  // Gera valores comuns para uma incubadora de ovos
  const temperature = (36.5 + Math.random() * 2).toFixed(1); // Entre 36.5°C e 38.5°C
  const humidity = Math.floor(55 + Math.random() * 15); // Entre 55% e 70%
  const luminosity = Math.floor(Math.random() * 100); // Geralmente escuro, entre 0 e 100 lux
let presence = Math.random() > 0.5;
  return {
    temperature: `${temperature}°C`,
    humidity: `${humidity}%`,
    luminosity: `${luminosity} lux`,
    presence: presence ? 'Detectado' : 'Vazio',
    timestamp: admin.database.ServerValue.TIMESTAMP // Adiciona um timestamp do servidor
  };
}

// Atualiza os dados no Firebase a cada 3 segundos
setInterval(() => {
  const data = generateRandomSensorData();
  sensorRef.set(data)
    .then(() => {
      console.log('✅ Dados enviados com sucesso:', data);
    })
    .catch((error) => {
      console.error('❌ Erro ao enviar dados:', error);
    });
}, 3000); // 3000ms = 3 segundos