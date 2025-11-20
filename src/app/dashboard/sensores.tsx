'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Thermometer, 
  Droplets, 
  Lightbulb, 
  Activity,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

interface SensorDataVPJS {
  luminosidadeVPJS: number;
  presencaVPJS: boolean;
  umidadeVPJS: number;
  temperaturaVPJS: number;
}

interface SensoresPageProps {
  sensorDataVPJS: SensorDataVPJS;
}

export default function SensoresPage({ sensorDataVPJS }: SensoresPageProps) {
  const getTemperaturaStatusVPJS = (tempVPJS: number) => {
    if (tempVPJS >= 37 && tempVPJS <= 39) {
      return { status: 'Ideal', color: 'text-green-600', icon: CheckCircle };
    } else if (tempVPJS < 35 || tempVPJS > 41) {
      return { status: 'Crítico', color: 'text-red-600', icon: AlertTriangle };
    } else {
      return { status: 'Atenção', color: 'text-yellow-600', icon: AlertTriangle };
    }
  };

  const getUmidadeStatusVPJS = (umidadeVPJS: number) => {
    if (umidadeVPJS >= 55 && umidadeVPJS <= 65) {
      return { status: 'Ideal', color: 'text-green-600', icon: CheckCircle };
    } else if (umidadeVPJS < 45 || umidadeVPJS > 75) {
      return { status: 'Crítico', color: 'text-red-600', icon: AlertTriangle };
    } else {
      return { status: 'Atenção', color: 'text-yellow-600', icon: AlertTriangle };
    }
  };

  const getLuminosidadeStatusVPJS = (luminosidadeVPJS: number) => {
    if (luminosidadeVPJS >= 100 && luminosidadeVPJS <= 500) {
      return { status: 'Ideal', color: 'text-green-600', icon: CheckCircle };
    } else if (luminosidadeVPJS > 1000) {
      return { status: 'Excesso', color: 'text-red-600', icon: AlertTriangle };
    } else {
      return { status: 'Baixa', color: 'text-yellow-600', icon: AlertTriangle };
    }
  };

  const temperaturaStatusVPJS = getTemperaturaStatusVPJS(sensorDataVPJS.temperaturaVPJS);
  const umidadeStatusVPJS = getUmidadeStatusVPJS(sensorDataVPJS.umidadeVPJS);
  const luminosidadeStatusVPJS = getLuminosidadeStatusVPJS(sensorDataVPJS.luminosidadeVPJS);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Monitoramento de Sensores</h2>
        <p className="text-gray-600">
          Acompanhe em tempo real todas as variáveis ambientais da sua incubadora
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="relative overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Thermometer className="w-5 h-5 text-red-500" />
              Temperatura
            </CardTitle>
            <CardDescription>
              Controle térmico para desenvolvimento embrionário
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900">
                  {sensorDataVPJS.temperaturaVPJS.toFixed(1)}°C
                </span>
                <div className={`flex items-center gap-1 ${temperaturaStatusVPJS.color}`}>
                  <temperaturaStatusVPJS.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{temperaturaStatusVPJS.status}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progresso Ideal</span>
                  <span>37-39°C</span>
                </div>
                <Progress 
                  value={Math.min(100, Math.max(0, (sensorDataVPJS.temperaturaVPJS - 35) * 25))} 
                  className="h-2"
                />
              </div>
              <div className="text-xs text-gray-500 space-y-1">
                <p>• Ideal: 37-39°C (ótimo para incubação)</p>
                <p>• Atenção: 35-37°C ou 39-41°C</p>
                <p>• Crítico: &lt;35°C ou &gt;41°C</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplets className="w-5 h-5 text-blue-500" />
              Umidade
            </CardTitle>
            <CardDescription>
              Nível de umidade relativa do ar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900">
                  {sensorDataVPJS.umidadeVPJS.toFixed(1)}%
                </span>
                <div className={`flex items-center gap-1 ${umidadeStatusVPJS.color}`}>
                  <umidadeStatusVPJS.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{umidadeStatusVPJS.status}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progresso Ideal</span>
                  <span>55-65%</span>
                </div>
                <Progress 
                  value={sensorDataVPJS.umidadeVPJS} 
                  className="h-2"
                />
              </div>
              <div className="text-xs text-gray-500 space-y-1">
                <p>• Ideal: 55-65% (prevenção da desidratação)</p>
                <p>• Atenção: 45-55% ou 65-75%</p>
                <p>• Crítico: &lt;45% ou &gt;75%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              Luminosidade
            </CardTitle>
            <CardDescription>
              Intensidade de luz no ambiente
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900">
                  {sensorDataVPJS.luminosidadeVPJS.toFixed(0)} lux
                </span>
                <div className={`flex items-center gap-1 ${luminosidadeStatusVPJS.color}`}>
                  <luminosidadeStatusVPJS.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{luminosidadeStatusVPJS.status}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Intensidade</span>
                  <span>{sensorDataVPJS.luminosidadeVPJS < 100 ? 'Baixa' : 
                            sensorDataVPJS.luminosidadeVPJS > 1000 ? 'Alta' : 'Moderada'}</span>
                </div>
                <Progress 
                  value={Math.min(100, sensorDataVPJS.luminosidadeVPJS / 10)} 
                  className="h-2"
                />
              </div>
              <div className="text-xs text-gray-500 space-y-1">
                <p>• Ideal: 100-500 lux (período claro)</p>
                <p>• Baixa: &lt;100 lux (período escuro)</p>
                <p>• Excesso: &gt;1000 lux (estresse)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-500" />
              Presença
            </CardTitle>
            <CardDescription>
              Detecção de movimento no ambiente
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900">
                  {sensorDataVPJS.presencaVPJS ? 'Detectada' : 'Ausente'}
                </span>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  sensorDataVPJS.presencaVPJS 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  <Activity className="w-6 h-6" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Status do Sensor</span>
                  <span className={sensorDataVPJS.presencaVPJS ? 'text-green-600' : 'text-gray-500'}>
                    {sensorDataVPJS.presencaVPJS ? 'Ativo' : 'Inativo'}
                  </span>
                </div>
                <Progress 
                  value={sensorDataVPJS.presencaVPJS ? 100 : 0} 
                  className="h-2"
                />
              </div>
              <div className="text-xs text-gray-500 space-y-1">
                <p>• Detectada: Movimento identificado</p>
                <p>• Ausente: Nenhum movimento detectado</p>
                <p>• Útil para monitoramento de acesso</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações do Sistema</CardTitle>
          <CardDescription>
            Dados atualizados em tempo real via Firebase Realtime Database
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Taxa de Atualização</p>
              <p className="font-medium">Tempo Real</p>
            </div>
            <div>
              <p className="text-gray-500">Conexão</p>
              <p className="font-medium text-green-600">Ativa</p>
            </div>
            <div>
              <p className="text-gray-500">Latência</p>
              <p className="font-medium">&lt;100ms</p>
            </div>
            <div>
              <p className="text-gray-500">Status Geral</p>
              <p className="font-medium text-green-600">Operacional</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}