import React, { useState, useEffect } from 'react';
import { getFirebaseAuth } from '../services/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { AuthState } from '../types';

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    const auth = getFirebaseAuth();
    const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
      setAuthState({
        user: user ? {
          uid: user.uid,
          email: user.email || '',
          displayName: user.displayName || '',
          name: user.displayName || ''
        } : null,
        loading: false,
        error: null
      });
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const auth = getFirebaseAuth();
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      setAuthState(prev => ({
        ...prev,
        error: error.message || 'Erro ao fazer login'
      }));
      throw error;
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      const auth = getFirebaseAuth();
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Atualizar o displayName do usuário
      if (result.user) {
        await result.user.updateProfile({ displayName: name });
      }
    } catch (error: any) {
      setAuthState(prev => ({
        ...prev,
        error: error.message || 'Erro ao criar conta'
      }));
      throw error;
    }
  };

  const logout = async () => {
    try {
      const auth = getFirebaseAuth();
      await signOut(auth);
    } catch (error: any) {
      setAuthState(prev => ({
        ...prev,
        error: error.message || 'Erro ao sair'
      }));
      throw error;
    }
  };

  return {
    ...authState,
    login,
    register,
    logout
  };
};