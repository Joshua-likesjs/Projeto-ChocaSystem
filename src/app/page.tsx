'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import Dashboard from '@/components/dashboard/Dashboard';
import AboutScreen from '@/components/dashboard/AboutScreen';

type ViewType = 'login' | 'register' | 'dashboard' | 'about';

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewType>('login');
  const { user, loading } = useAuth();

  // Redirecionar para dashboard se usuário já estiver logado
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  // Se usuário estiver logado, mostrar dashboard
  if (user) {
    if (currentView === 'about') {
      return <AboutScreen onBackClick={() => setCurrentView('dashboard')} />;
    }
    return <Dashboard onAboutClick={() => setCurrentView('about')} />;
  }

  // Se não estiver logado, mostrar tela de login ou registro
  const handleLoginClick = () => setCurrentView('login');
  const handleRegisterClick = () => setCurrentView('register');

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {currentView === 'login' ? (
        <LoginForm onRegisterClick={handleRegisterClick} />
      ) : (
        <RegisterForm onLoginClick={handleLoginClick} />
      )}
    </div>
  );
}