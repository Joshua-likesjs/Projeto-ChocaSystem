'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthVPJS } from '@/contexts/AuthContextVPJS';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  ref,
  set,
  get,
  database,
  auth
} from '@/lib/firebase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Egg, Thermometer, Droplets, Lightbulb } from 'lucide-react';

export default function LoginPage() {
  const [loadingVPJS, setLoadingVPJS] = useState(false);
  const [errorVPJS, setErrorVPJS] = useState('');
  const [successVPJS, setSuccessVPJS] = useState('');
  const { userVPJS } = useAuthVPJS();
  const routerVPJS = useRouter();

  useEffect(() => {
    if (userVPJS) {
      routerVPJS.push('/dashboard');
    }
  }, [userVPJS, routerVPJS]);

  const handleLoginVPJS = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingVPJS(true);
    setErrorVPJS('');

    const formDataVPJS = new FormData(e.currentTarget);
    const emailVPJS = formDataVPJS.get('email') as string;
    const passwordVPJS = formDataVPJS.get('password') as string;

    try {
      await signInWithEmailAndPassword(auth, emailVPJS, passwordVPJS);
      routerVPJS.push('/dashboard');
    } catch (error: any) {
      setErrorVPJS('Erro ao fazer login. Verifique suas credenciais.');
    } finally {
      setLoadingVPJS(false);
    }
  };

  const handleCadastroVPJS = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingVPJS(true);
    setErrorVPJS('');
    setSuccessVPJS('');

    const formDataVPJS = new FormData(e.currentTarget);
    const nomeVPJS = formDataVPJS.get('nome') as string;
    const emailVPJS = formDataVPJS.get('email') as string;
    const passwordVPJS = formDataVPJS.get('password') as string;
    const confirmPasswordVPJS = formDataVPJS.get('confirmPassword') as string;

    if (passwordVPJS !== confirmPasswordVPJS) {
      setErrorVPJS('As senhas não coincidem.');
      setLoadingVPJS(false);
      return;
    }

    if (passwordVPJS.length < 6) {
      setErrorVPJS('A senha deve ter pelo menos 6 caracteres.');
      setLoadingVPJS(false);
      return;
    }

    try {
      const userCredentialVPJS = await createUserWithEmailAndPassword(auth, emailVPJS, passwordVPJS);
      const userVPJS = userCredentialVPJS.user;

      await set(ref(database, `usuarios/${userVPJS.uid}`), {
        nomeVPJS: nomeVPJS,
        emailVPJS: emailVPJS,
        dataCriacaoVPJS: new Date().toISOString(),
        sensoresVPJS: {
          luminosidadeVPJS: 0,
          presencaVPJS: false,
          umidadeVPJS: 0,
          temperaturaVPJS: 0
        },
        atuadoresVPJS: {
          aquecedorVPJS: false,
          umidificadorVPJS: false
        }
      });

      setSuccessVPJS('Cadastro realizado com sucesso! Redirecionando...');
      setTimeout(() => {
        routerVPJS.push('/dashboard');
      }, 2000);
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        setErrorVPJS('Este email já está em uso. Tente fazer login.');
      } else if (error.code === 'auth/weak-password') {
        setErrorVPJS('A senha é muito fraca. Use pelo menos 6 caracteres.');
      } else {
        setErrorVPJS('Erro ao criar conta. Tente novamente.');
      }
    } finally {
      setLoadingVPJS(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8">
        <div className="flex flex-col justify-center space-y-6">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="relative">
                <Egg className="w-16 h-16 text-orange-500" />
               
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Incubadora de Ovos VPJS</h1>
            <p className="text-gray-600">
              Sistema inteligente de monitoramento e controle para incubação de ovos
            </p>
          </div>
          
          <div className="space-y-4 bg-white/80 backdrop-blur rounded-lg p-6">
            <h2 className="font-semibold text-gray-900">Recursos do Sistema:</h2>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-red-500" />
                <span>Monitoramento de temperatura em tempo real</span>
              </div>
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-blue-500" />
                <span>Controle de umidade automático</span>
              </div>
              <div className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-yellow-500" />
                <span>Sensor de luminosidade e presença</span>
              </div>
              <div className="flex items-center gap-2">
                <Egg className="w-4 h-4 text-orange-500" />
                <span>Controle remoto de aquecedor e umidificador</span>
              </div>
            </div>
          </div>
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Acesso ao Sistema</CardTitle>
            <CardDescription>
              Entre ou cadastre-se para acessar sua incubadora
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="cadastro">Cadastro</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLoginVPJS} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="seu@email.com"
                      required
                      disabled={loadingVPJS}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Senha</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      required
                      disabled={loadingVPJS}
                    />
                  </div>
                  {errorVPJS && (
                    <Alert variant="destructive">
                      <AlertDescription>{errorVPJS}</AlertDescription>
                    </Alert>
                  )}
                  <Button type="submit" className="w-full" disabled={loadingVPJS}>
                    {loadingVPJS ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Entrando...
                      </>
                    ) : (
                      'Entrar'
                    )}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="cadastro">
                <form onSubmit={handleCadastroVPJS} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome Completo</Label>
                    <Input
                      id="nome"
                      name="nome"
                      type="text"
                      placeholder="Seu nome"
                      required
                      disabled={loadingVPJS}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-cadastro">Email</Label>
                    <Input
                      id="email-cadastro"
                      name="email"
                      type="email"
                      placeholder="seu@email.com"
                      required
                      disabled={loadingVPJS}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-cadastro">Senha</Label>
                    <Input
                      id="password-cadastro"
                      name="password"
                      type="password"
                      placeholder="Mínimo 6 caracteres"
                      required
                      disabled={loadingVPJS}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirme sua senha"
                      required
                      disabled={loadingVPJS}
                    />
                  </div>
                  {errorVPJS && (
                    <Alert variant="destructive">
                      <AlertDescription>{errorVPJS}</AlertDescription>
                    </Alert>
                  )}
                  {successVPJS && (
                    <Alert className="border-green-200 bg-green-50 text-green-800">
                      <AlertDescription>{successVPJS}</AlertDescription>
                    </Alert>
                  )}
                  <Button type="submit" className="w-full" disabled={loadingVPJS}>
                    {loadingVPJS ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Cadastrando...
                      </>
                    ) : (
                      'Cadastrar'
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}