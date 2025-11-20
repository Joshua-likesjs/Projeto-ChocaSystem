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
  User 
} from 'firebase/auth';

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

// Previne inicialização dupla
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// -------------------------------------------------

interface AuthContextVPJS {
  userVPJS: User | null;
  loadingVPJS: boolean;

  emailVPJS: string;
  passwordVPJS: string;

  setEmailVPJS: (email: string) => void;
  setPasswordVPJS: (senha: string) => void;

  loginVPJS: (email: string, senha: string) => Promise<void>;
  cadastroVPJS: (email: string, senha: string) => Promise<void>;
  logoutVPJS: () => Promise<void>;
}

const AuthContextVPJS = createContext<AuthContextVPJS>({
  userVPJS: null,
  loadingVPJS: true,

  emailVPJS: "",
  passwordVPJS: "",

  setEmailVPJS: () => {},
  setPasswordVPJS: () => {},

  loginVPJS: async () => {},
  cadastroVPJS: async () => {},
  logoutVPJS: async () => {},
});

export function AuthProviderVPJS({ children }: { children: ReactNode }) {
  const [userVPJS, setUserVPJS] = useState<User | null>(null);
  const [loadingVPJS, setLoadingVPJS] = useState(true);

  const [emailVPJS, setEmailVPJS] = useState("");
  const [passwordVPJS, setPasswordVPJS] = useState("");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUserVPJS(user);
      setLoadingVPJS(false);
    });

    return () => unsub();
  }, []);

  // --- LOGIN ---
  const loginVPJS = async (email: string, senha: string) => {
    await signInWithEmailAndPassword(auth, email, senha);
  };

  // --- CADASTRO ---
  const cadastroVPJS = async (email: string, senha: string) => {
    await createUserWithEmailAndPassword(auth, email, senha);
  };

  // --- LOGOUT ---
  const logoutVPJS = async () => {
    await signOut(auth);
    setUserVPJS(null);
  };

  return (
    <AuthContextVPJS.Provider value={{ 
      userVPJS, 
      loadingVPJS,

      emailVPJS,
      passwordVPJS,

      setEmailVPJS,
      setPasswordVPJS,

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
