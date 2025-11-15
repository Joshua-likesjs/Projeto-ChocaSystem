'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Egg, Thermometer, Droplets, Shield, Users, Target } from 'lucide-react';

interface AboutScreenProps {
  onBackClick: () => void;
}

export default function AboutScreen({ onBackClick }: AboutScreenProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={onBackClick}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
            <h1 className="text-2xl font-bold">Sobre Nós</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Hero Section */}
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="p-4 bg-primary/10 rounded-full">
                    <Egg className="h-12 w-12 text-primary" />
                  </div>
                </div>
                <h2 className="text-3xl font-bold">Sistema de Monitoramento de Incubadora</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Uma solução moderna e eficiente para o monitoramento em tempo real de incubadoras de ovos, 
                  garantindo as condições ideais para o desenvolvimento embrionário.
                </p>
                <Badge variant="secondary" className="text-sm">
                  Versão 2.0
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Features Section */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Thermometer className="h-5 w-5 text-primary" />
                  Monitoramento de Temperatura
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Controle preciso da temperatura entre 37-38°C, mantendo as condições ideais 
                  para o desenvolvimento dos embriões.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Droplets className="h-5 w-5 text-primary" />
                  Controle de Umidade
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Monitoramento contínuo da umidade relativa do ar, mantendo-a na faixa ideal 
                  de 55-65% para evitar a desidratação.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Detecção de Presença
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Sensores avançados detectam a presença dos ovos na incubadora, 
                  garantindo que o sistema funcione apenas quando necessário.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Controle de Luminosidade
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Monitoramento dos níveis de luz para simular o ambiente natural, 
                  com recomendação de manter baixa luminosidade (0-50 lux).
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Technology Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Tecnologia e Inovação
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Plataforma Web e Mobile</h3>
                <p className="text-muted-foreground">
                  Desenvolvido com tecnologias modernas como React, Next.js e Firebase, 
                  oferecendo uma experiência fluida tanto em dispositivos móveis quanto em desktop.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Atualizações em Tempo Real</h3>
                <p className="text-muted-foreground">
                  Sistema de atualização instantânea utilizando Firebase Realtime Database, 
                  permitindo o monitoramento contínuo sem necessidade de recarregar a página.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Segurança e Autenticação</h3>
                <p className="text-muted-foreground">
                  Sistema de login seguro com Firebase Authentication, garantindo que apenas 
                  profissionais autorizados tenham acesso ao monitoramento.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Section */}
          <Card>
            <CardHeader>
              <CardTitle>Entre em Contato</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-2">
                <p className="text-muted-foreground">
                  Para mais informações sobre nosso sistema de monitoramento de incubadoras,
                  entre em contato conosco.
                </p>
                <div className="flex justify-center gap-4 text-sm text-muted-foreground">
                  <span>Email: contato@incubadora.com</span>
                  <span>Telefone: (11) 1234-5678</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}