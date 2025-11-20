'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { 
  Power, 
  Thermometer, 
  Droplets, 
  Zap,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

interface AtuadorDataVPJS {
  aquecedorVPJS: boolean;
  umidificadorVPJS: boolean;
}

interface AtuadoresPageProps {
  atuadorDataVPJS: AtuadorDataVPJS;
  onUpdateAtuadorVPJS: (atuadorVPJS: 'aquecedorVPJS' | 'umidificadorVPJS', valorVPJS: boolean) => void;
}

export default function AtuadoresPage({ atuadorDataVPJS, onUpdateAtuadorVPJS }: AtuadoresPageProps) {
  const handleAquecedorChangeVPJS = (checkedVPJS: boolean) => {
    onUpdateAtuadorVPJS('aquecedorVPJS', checkedVPJS);
  };

  const handleUmidificadorChangeVPJS = (checkedVPJS: boolean) => {
    onUpdateAtuadorVPJS('umidificadorVPJS', checkedVPJS);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Controle de Atuadores</h2>
        <p className="text-gray-600">
          Gerencie os sistemas de aquecimento e umidificação da sua incubadora
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className={`relative overflow-hidden transition-all duration-300 ${
          atuadorDataVPJS.aquecedorVPJS 
            ? 'bg-gradient-to-br from-red-50 to-orange-50 border-red-200' 
            : 'bg-gray-50 border-gray-200'
        }`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                atuadorDataVPJS.aquecedorVPJS 
                  ? 'bg-red-100 text-red-600' 
                  : 'bg-gray-200 text-gray-400'
              }`}>
                <Thermometer className="w-5 h-5" />
              </div>
              Aquecedor
            </CardTitle>
            <CardDescription>
              Sistema de controle térmico para manutenção da temperatura ideal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold text-gray-900">Status do Aquecedor</p>
                  <p className="text-sm text-gray-600">
                    {atuadorDataVPJS.aquecedorVPJS ? 'Ligado e aquecendo' : 'Desligado'}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="aquecedor-switch"
                    checked={atuadorDataVPJS.aquecedorVPJS}
                    onCheckedChange={handleAquecedorChangeVPJS}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <p className="text-gray-500">Temperatura Alvo</p>
                  <p className="font-medium">38.0°C</p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-500">Potência</p>
                  <p className="font-medium">{atuadorDataVPJS.aquecedorVPJS ? '100%' : '0%'}</p>
                </div>
              </div>

              <div className={`p-4 rounded-lg border ${
                atuadorDataVPJS.aquecedorVPJS 
                  ? 'bg-red-100 border-red-200 text-red-800' 
                  : 'bg-gray-100 border-gray-200 text-gray-600'
              }`}>
                <div className="flex items-center gap-2">
                  {atuadorDataVPJS.aquecedorVPJS ? (
                    <>
                      <Zap className="w-4 h-4" />
                      <span className="text-sm font-medium">Sistema Ativo</span>
                    </>
                  ) : (
                    <>
                      <Power className="w-4 h-4" />
                      <span className="text-sm font-medium">Sistema Inativo</span>
                    </>
                  )}
                </div>
              </div>

              <div className="text-xs text-gray-500 space-y-1">
                <p>• O aquecedor mantém a temperatura ideal para incubação</p>
                <p>• Temperatura recomendada: 37-39°C</p>
                <p>• Consumo: {atuadorDataVPJS.aquecedorVPJS ? 'Alto' : 'Mínimo'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={`relative overflow-hidden transition-all duration-300 ${
          atuadorDataVPJS.umidificadorVPJS 
            ? 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200' 
            : 'bg-gray-50 border-gray-200'
        }`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                atuadorDataVPJS.umidificadorVPJS 
                  ? 'bg-blue-100 text-blue-600' 
                  : 'bg-gray-200 text-gray-400'
              }`}>
                <Droplets className="w-5 h-5" />
              </div>
              Umidificador
            </CardTitle>
            <CardDescription>
              Sistema de controle de umidade para prevenção da desidratação
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold text-gray-900">Status do Umidificador</p>
                  <p className="text-sm text-gray-600">
                    {atuadorDataVPJS.umidificadorVPJS ? 'Ligado e umidificando' : 'Desligado'}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="umidificador-switch"
                    checked={atuadorDataVPJS.umidificadorVPJS}
                    onCheckedChange={handleUmidificadorChangeVPJS}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <p className="text-gray-500">Umidade Alvo</p>
                  <p className="font-medium">60%</p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-500">Vazão</p>
                  <p className="font-medium">{atuadorDataVPJS.umidificadorVPJS ? 'Alta' : 'Desligada'}</p>
                </div>
              </div>

              <div className={`p-4 rounded-lg border ${
                atuadorDataVPJS.umidificadorVPJS 
                  ? 'bg-blue-100 border-blue-200 text-blue-800' 
                  : 'bg-gray-100 border-gray-200 text-gray-600'
              }`}>
                <div className="flex items-center gap-2">
                  {atuadorDataVPJS.umidificadorVPJS ? (
                    <>
                      <Droplets className="w-4 h-4" />
                      <span className="text-sm font-medium">Umidificando</span>
                    </>
                  ) : (
                    <>
                      <Power className="w-4 h-4" />
                      <span className="text-sm font-medium">Desligado</span>
                    </>
                  )}
                </div>
              </div>

              <div className="text-xs text-gray-500 space-y-1">
                <p>• O umidificador previne a desidratação dos ovos</p>
                <p>• Umidade recomendada: 55-65%</p>
                <p>• Consumo: {atuadorDataVPJS.umidificadorVPJS ? 'Médio' : 'Mínimo'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            Informações de Controle
          </CardTitle>
          <CardDescription>
            Status dos sistemas e recomendações de operação
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${
                atuadorDataVPJS.aquecedorVPJS || atuadorDataVPJS.umidificadorVPJS
                  ? 'bg-green-100 text-green-600'
                  : 'bg-gray-100 text-gray-400'
              }`}>
                <Power className="w-8 h-8" />
              </div>
              <p className="font-medium">Sistema Principal</p>
              <p className="text-sm text-gray-600">
                {atuadorDataVPJS.aquecedorVPJS || atuadorDataVPJS.umidificadorVPJS 
                  ? 'Ativo' 
                  : 'Standby'}
              </p>
            </div>

            <div className="text-center space-y-2">
              <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${
                atuadorDataVPJS.aquecedorVPJS && atuadorDataVPJS.umidificadorVPJS
                  ? 'bg-orange-100 text-orange-600'
                  : 'bg-blue-100 text-blue-600'
              }`}>
                <Zap className="w-8 h-8" />
              </div>
              <p className="font-medium">Consumo Energético</p>
              <p className="text-sm text-gray-600">
                {atuadorDataVPJS.aquecedorVPJS && atuadorDataVPJS.umidificadorVPJS 
                  ? 'Alto' 
                  : atuadorDataVPJS.aquecedorVPJS || atuadorDataVPJS.umidificadorVPJS
                  ? 'Médio'
                  : 'Mínimo'}
              </p>
            </div>

            <div className="text-center space-y-2">
              <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${
                atuadorDataVPJS.aquecedorVPJS || atuadorDataVPJS.umidificadorVPJS
                  ? 'bg-green-100 text-green-600'
                  : 'bg-yellow-100 text-yellow-600'
              }`}>
                {atuadorDataVPJS.aquecedorVPJS || atuadorDataVPJS.umidificadorVPJS ? (
                  <CheckCircle2 className="w-8 h-8" />
                ) : (
                  <AlertCircle className="w-8 h-8" />
                )}
              </div>
              <p className="font-medium">Modo Operação</p>
              <p className="text-sm text-gray-600">
                {atuadorDataVPJS.aquecedorVPJS || atuadorDataVPJS.umidificadorVPJS 
                  ? 'Automático' 
                  : 'Manual'}
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              <strong>Recomendação:</strong> Mantenha ambos os sistemas ativos durante o período de incubação 
              para garantir condições ideais de desenvolvimento embrionário.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}