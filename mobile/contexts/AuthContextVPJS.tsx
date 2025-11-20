// contexts/AuthContextVPJS.tsx
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  initializeApp 
} from 'firebase/app';
import { 
  getAuth, 
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  User 
} from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';

// --- CONFIG DO FIREBASE ---
const firebaseConfig = {
  apiKey: "AIzaSyAGo1bkCM35LjT1DQSNSSANH4T1sVvYLSo",
  authDomain: "vpjs-2385b.firebaseapp.com",
  databaseURL: "https://vpjs-2385b-default-rtdb.firebaseio.com",
  projectId: "vpjs-2385b",
  storageBucket: "vpjs-2385b.firebasestorage.app",
  messagingSenderId: "754370441306",
  appId: "1:754370441306:web:c9daf5a44cd9fd964ae863",
  measurementId: "G-DCZMN9TRME"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const database = getDatabase(app);

// --- INTERFACE DO CONTEXT ---
interface AuthContextVPJS {
  userVPJS: User | null;
  loadingVPJS: boolean;
  loginVPJS: (email: string, senha: string) => Promise<void>;
  cadastroVPJS: (nome: string, email: string, senha: string) => Promise<void>;
  logoutVPJS: () => Promise<void>;
}

const AuthContextVPJS = createContext<AuthContextVPJS>({
  userVPJS: null,
  loadingVPJS: true,
  loginVPJS: async () => {},
  cadastroVPJS: async () => {},
  logoutVPJS: async () => {},
});

export function AuthProviderVPJS({ children }: { children: ReactNode }) {
  const [userVPJS, setUserVPJS] = useState<User | null>(null);
  const [loadingVPJS, setLoadingVPJS] = useState(true);

  useEffect(() => {
    const unsubscribeVPJS = onAuthStateChanged(auth, (user) => {
      setUserVPJS(user);
      setLoadingVPJS(false);
    });

    return () => unsubscribeVPJS();
  }, []);

  // --- FUNÇÕES DE AUTENTICAÇÃO ---
  const loginVPJS = async (email: string, senha: string) => {
    await signInWithEmailAndPassword(auth, email, senha);
  };

  const cadastroVPJS = async (nome: string, email: string, senha: string) => {
    try {
      // <<< CORREÇÃO 1: Usar os parâmetros da função corretamente >>>
      const userCredentialVPJS = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredentialVPJS.user;
      
      // <<< CORREÇÃO 2: Usar a variável 'nome' recebida no parâmetro >>>
      await updateProfile(user, { displayName: nome });

      // Cria a estrutura inicial no banco ao cadastrar
      // <<< CORREÇÃO 3: Usar as variáveis 'nome' e 'email' recebidas nos parâmetros >>>
      await set(ref(database, `usuarios/${user.uid}`), {
        nomeVPJS: nome,
        emailVPJS: email,
        dataCriacaoVPJS: new Date().toISOString(),
        sensoresVPJS: {
          luminosidadeVPJS: 0,
          presencaVPJS: false,
          umidadeVPJS: 0,
          temperaturaVPJS: 0
        },
        atuadoresVPJS: {
          aquecedorVPJS: false,
          umidificadorVPJS: false
        }
      });
    } catch (error) {
      console.error("Erro no cadastro:", error);
      throw error; 
    }
  };

  const logoutVPJS = async () => {
    await signOut(auth);
  };

  return (
    <AuthContextVPJS.Provider value={{ 
      userVPJS, 
      loadingVPJS,
      loginVPJS, 
      cadastroVPJS, 
      logoutVPJS 
    }}>
      {children}
    </AuthContextVPJS.Provider>
  );
}

export function useAuthVPJS() {
  return useContext(AuthContextVPJS);
}