// COLE O CÓDIGO FORNECIDO PELO USUÁRIO AQUI
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  GithubAuthProvider,
  FacebookAuthProvider 
} from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCukXPmBWZY9P5jF7FKA0hvn-mucUVvCQg",
  authDomain: "projeto-firewar.firebaseapp.com",
  databaseURL: "https://projeto-firewar-default-rtdb.firebaseio.com",
  projectId: "projeto-firewar",
  storageBucket: "projeto-firewar.firebasestorage.app",
  messagingSenderId: "318694180161",
  appId: "1:318694180161:web:a250bf176003c550510dc0",
  measurementId: "G-08FQ5ZG2DW"
};

// ✅ INICIALIZAÇÃO SEGURA - EVITA ERRO DE IMPORT
const app = initializeApp(firebaseConfig);

// ✅ INICIALIZAÇÃO CONDICIONAL DO AUTH (resolve o erro)
let auth: any = null;
let db: any = null;

try {
  auth = getAuth(app);
  db = getDatabase(app);
  console.log("✅ Firebase Auth e Database inicializados com sucesso");
} catch (error) {
  console.warn("⚠️  Firebase Auth inicialização adiada:", error);
}

// Provedores de Autenticação Social (mantidos iguais)
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

// Configurações adicionais dos provedores (mantidas iguais)
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

githubProvider.setCustomParameters({
  allow_signup: 'false'
});

// ✅ EXPORTAÇÕES SEGURAS
export { app, firebaseConfig };

// ✅ FUNÇÃO PARA OBTER AUTH (resolve o erro de importação circular)
export const getFirebaseAuth = () => {
  if (!auth) {
    auth = getAuth(app);
  }
  return auth;
};

// ✅ FUNÇÃO PARA OBTER DATABASE
export const getFirebaseDatabase = () => {
  if (!db) {
    db = getDatabase(app);
  }
  return db;
};

// ✅ EXPORTAÇÃO DIRETA (para compatibilidade)
export { auth, db };