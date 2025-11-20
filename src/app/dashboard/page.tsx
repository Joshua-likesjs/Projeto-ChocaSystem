'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthVPJS } from '@/contexts/AuthContextVPJS';
import { signOut, ref, onValue, database, update, auth } from '@/lib/firebase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Menu, 
  Activity, 
  Power, 
  Info, 
  LogOut, 
  Thermometer, 
  Droplets, 
  Lightbulb, 
  Egg,
  User
} from 'lucide-react';
import SensoresPage from './sensores';
import AtuadoresPage from './atuadores';
import SobreNosPage from './sobre-nos';

type PageTypeVPJS = 'sensores' | 'atuadores' | 'sobre-nos';

interface SensorDataVPJS {
  luminosidadeVPJS: number;
  presencaVPJS: boolean;
  umidadeVPJS: number;
  temperaturaVPJS: number;
}

interface AtuadorDataVPJS {
  aquecedorVPJS: boolean;
  umidificadorVPJS: boolean;
}

export default function DashboardPage() {
  const { userVPJS } = useAuthVPJS();
  const routerVPJS = useRouter();
  const [currentPageVPJS, setCurrentPageVPJS] = useState<PageTypeVPJS>('sensores');
  const [sensorDataVPJS, setSensorDataVPJS] = useState<SensorDataVPJS>({
    luminosidadeVPJS: 0,
    presencaVPJS: false,
    umidadeVPJS: 0,
    temperaturaVPJS: 0
  });
  const [atuadorDataVPJS, setAtuadorDataVPJS] = useState<AtuadorDataVPJS>({
    aquecedorVPJS: false,
    umidificadorVPJS: false
  });

  useEffect(() => {
    if (!userVPJS) {
      routerVPJS.push('/login');
      return;
    }

    const userRefVPJS = ref(database, `usuarios/${userVPJS.uid}`);
    
    const unsubscribeVPJS = onValue(userRefVPJS, (snapshot) => {
      const dataVPJS = snapshot.val();
      if (dataVPJS) {
        setSensorDataVPJS(dataVPJS.sensoresVPJS || {
          luminosidadeVPJS: 0,
          presencaVPJS: false,
          umidadeVPJS: 0,
          temperaturaVPJS: 0
        });
        setAtuadorDataVPJS(dataVPJS.atuadoresVPJS || {
          aquecedorVPJS: false,
          umidificadorVPJS: false
        });
      }
    });

    return () => unsubscribeVPJS();
  }, [userVPJS, routerVPJS]);

  const handleLogoutVPJS = async () => {
    try {
      await signOut(auth);
      routerVPJS.push('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const updateAtuadorVPJS = async (atuadorVPJS: 'aquecedorVPJS' | 'umidificadorVPJS', valorVPJS: boolean) => {
    if (!userVPJS) return;

    try {
      await update(ref(database, `usuarios/${userVPJS.uid}/atuadoresVPJS`), {
        [atuadorVPJS]: valorVPJS
      });
    } catch (error) {
      console.error('Erro ao atualizar atuador:', error);
    }
  };

  const renderPageVPJS = () => {
    switch (currentPageVPJS) {
      case 'sensores':
        return <SensoresPage sensorDataVPJS={sensorDataVPJS} />;
      case 'atuadores':
        return (
          <AtuadoresPage 
            atuadorDataVPJS={atuadorDataVPJS} 
            onUpdateAtuadorVPJS={updateAtuadorVPJS} 
          />
        );
      case 'sobre-nos':
        return <SobreNosPage />;
      default:
        return <SensoresPage sensorDataVPJS={sensorDataVPJS} />;
    }
  };

  if (!userVPJS) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Egg className="w-8 h-8 text-orange-500" />
                <h1 className="text-xl font-bold text-gray-900">Incubadora VPJS</h1>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="hover:bg-orange-50">
                    <Menu className="w-4 h-4 mr-2" />
                    Menu
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  <DropdownMenuItem 
                    onClick={() => setCurrentPageVPJS('sensores')}
                    className="cursor-pointer"
                  >
                    <Activity className="w-4 h-4 mr-2" />
                    Sensores
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setCurrentPageVPJS('atuadores')}
                    className="cursor-pointer"
                  >
                    <Power className="w-4 h-4 mr-2" />
                    Atuadores
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setCurrentPageVPJS('sobre-nos')}
                    className="cursor-pointer"
                  >
                    <Info className="w-4 h-4 mr-2" />
                    Sobre Nós
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={handleLogoutVPJS}
                    className="cursor-pointer text-red-600 focus:text-red-600"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair da Conta
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{userVPJS.email}</p>
                <p className="text-xs text-gray-500">Usuário Logado</p>
              </div>
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-orange-600" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-white/80 backdrop-blur">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Thermometer className="w-5 h-5 text-red-500" />
                  <div>
                    <p className="text-xs text-gray-500">Temperatura</p>
                    <p className="text-lg font-bold text-gray-900">
                      {sensorDataVPJS.temperaturaVPJS.toFixed(1)}°C
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-xs text-gray-500">Umidade</p>
                    <p className="text-lg font-bold text-gray-900">
                      {sensorDataVPJS.umidadeVPJS.toFixed(1)}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-500" />
                  <div>
                    <p className="text-xs text-gray-500">Luminosidade</p>
                    <p className="text-lg font-bold text-gray-900">
                      {sensorDataVPJS.luminosidadeVPJS.toFixed(0)} lux
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-xs text-gray-500">Presença</p>
                    <p className="text-lg font-bold text-gray-900">
                      {sensorDataVPJS.presencaVPJS ? 'Detectada' : 'Ausente'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {renderPageVPJS()}
      </main>
    </div>
  );
}