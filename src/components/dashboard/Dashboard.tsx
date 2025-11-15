'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Thermometer, Droplets, Sun, Users, LogOut, Info } from 'lucide-react';
import { useSensorData } from '@/hooks/useSensorData';
import { useAuth } from '@/hooks/useAuth';

interface DashboardProps {
  onAboutClick: () => void;
}

export default function Dashboard({ onAboutClick }: DashboardProps) {
  const { sensorData, loading, error } = useSensorData();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Erro ao sair:', error);
    }
  };

  const getStatusColor = (type: string, value: string) => {
    switch (type) {
      case 'temperature':
        const temp = parseFloat(value);
        if (temp >= 37 && temp <= 38) return 'bg-green-500';
        if (temp >= 36 && temp < 37) return 'bg-yellow-500';
        return 'bg-red-500';
      
      case 'humidity':
        const humidity = parseInt(value);
        if (humidity >= 55 && humidity <= 65) return 'bg-green-500';
        if (humidity >= 45 && humidity < 55) return 'bg-yellow-500';
        return 'bg-red-500';
      
      case 'presence':
        return value === 'Detectado' ? 'bg-green-500' : 'bg-gray-500';
      
      case 'luminosity':
        const lux = parseInt(value);
        if (lux <= 50) return 'bg-green-500';
        if (lux <= 100) return 'bg-yellow-500';
        return 'bg-red-500';
      
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (type: string, value: string) => {
    switch (type) {
      case 'temperature':
        const temp = parseFloat(value);
        if (temp >= 37 && temp <= 38) return 'Ideal';
        if (temp >= 36 && temp < 37) return 'Abaixo';
        return 'Crítico';
      
      case 'humidity':
        const humidity = parseInt(value);
        if (humidity >= 55 && humidity <= 65) return 'Ideal';
        if (humidity >= 45 && humidity < 55) return 'Baixa';
        return 'Crítica';
      
      case 'presence':
        return value === 'Detectado' ? 'Presente' : 'Ausente';
      
      case 'luminosity':
        const lux = parseInt(value);
        if (lux <= 50) return 'Escuro';
        if (lux <= 100) return 'Moderado';
        return 'Claro';
      
      default:
        return 'Desconhecido';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando dados dos sensores...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-destructive mb-4">Erro ao carregar dados dos sensores</p>
              <p className="text-muted-foreground text-sm">{error}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Monitoramento de Incubadora</h1>
              <p className="text-muted-foreground">
                Bem-vindo, {user?.displayName || user?.email}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onAboutClick}>
                <Info className="mr-2 h-4 w-4" />
                Sobre Nós
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Temperature Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Temperatura</CardTitle>
              <Thermometer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {sensorData?.temperature || '--'}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <div className={`w-2 h-2 rounded-full ${getStatusColor('temperature', sensorData?.temperature || '')}`}></div>
                <p className="text-xs text-muted-foreground">
                  {getStatusText('temperature', sensorData?.temperature || '')}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Humidity Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Umidade</CardTitle>
              <Droplets className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {sensorData?.humidity || '--'}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <div className={`w-2 h-2 rounded-full ${getStatusColor('humidity', sensorData?.humidity || '')}`}></div>
                <p className="text-xs text-muted-foreground">
                  {getStatusText('humidity', sensorData?.humidity || '')}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Presence Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Presença</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {sensorData?.presence || '--'}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <div className={`w-2 h-2 rounded-full ${getStatusColor('presence', sensorData?.presence || '')}`}></div>
                <p className="text-xs text-muted-foreground">
                  {getStatusText('presence', sensorData?.presence || '')}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Luminosity Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Luminosidade</CardTitle>
              <Sun className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {sensorData?.luminosity || '--'}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <div className={`w-2 h-2 rounded-full ${getStatusColor('luminosity', sensorData?.luminosity || '')}`}></div>
                <p className="text-xs text-muted-foreground">
                  {getStatusText('luminosity', sensorData?.luminosity || '')}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Status Overview */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Status Geral da Incubadora</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="font-medium mb-2">Condições Ideais</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Temperatura:</span>
                    <span className="font-medium">37-38°C</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Umidade:</span>
                    <span className="font-medium">55-65%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Luminosidade:</span>
                    <span className="font-medium">0-50 lux</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-2">Status Atual</h3>
                <div className="space-y-2">
                  <Badge 
                    variant={sensorData ? 'default' : 'secondary'}
                    className="w-full justify-center"
                  >
                    {sensorData ? 'Conectado' : 'Aguardando dados...'}
                  </Badge>
                  {sensorData?.timestamp && (
                    <p className="text-xs text-muted-foreground text-center">
                      Última atualização: {new Date(sensorData.timestamp).toLocaleString('pt-BR')}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}