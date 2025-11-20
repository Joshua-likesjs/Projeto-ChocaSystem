'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthVPJS } from '@/contexts/AuthContextVPJS';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const { userVPJS, loadingVPJS } = useAuthVPJS();
  const routerVPJS = useRouter();

  useEffect(() => {
    if (!loadingVPJS) {
      if (userVPJS) {
        routerVPJS.push('/dashboard');
      } else {
        routerVPJS.push('/login');
      }
    }
  }, [userVPJS, loadingVPJS, routerVPJS]);

  if (loadingVPJS) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-8 p-4">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
        <p className="text-lg text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  return null;
}