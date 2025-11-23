'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  auth, 
  onAuthStateChanged, 
} from '@/lib/firebase';
import type { User } from 'firebase/auth';

interface AuthContextVPJS {
  userVPJS: User | null;
  loadingVPJS: boolean;
}

const AuthContextVPJS = createContext<AuthContextVPJS>({
  userVPJS: null,
  loadingVPJS: true,
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

  return (
    <AuthContextVPJS.Provider value={{ userVPJS, loadingVPJS }}>
      {children}
    </AuthContextVPJS.Provider>
  );
}

export function useAuthVPJS() {
  return useContext(AuthContextVPJS);
}