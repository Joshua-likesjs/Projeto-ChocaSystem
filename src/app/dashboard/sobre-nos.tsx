'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Code, 
  Palette, 
  Cpu, 
  Wrench,
  Mail,
  Github,
  Linkedin,
  Award,
  Target,
  Lightbulb,
  CheckCircle
} from 'lucide-react';

interface TeamMemberVPJS {
  nomeVPJS: string;
  papelVPJS: string;
  descricaoVPJS: string;
  habilidadesVPJS: string[];
  iconeVPJS: React.ReactElement;
  corVPJS: string;
}

interface ProjectGoalVPJS {
  tituloVPJS: string;
  descricaoVPJS: string;
  iconeVPJS: React.ReactElement;
}

export default function SobreNosPage() {
  const teamMembersVPJS: TeamMemberVPJS[] = [
    {
      nomeVPJS: "Josue",
      papelVPJS: "Desenvolvedor Full Stack & Integração",
      descricaoVPJS: "Responsável por toda a arquitetura web e mobile, implementando a comunicação entre frontend e backend. Desenvolveu a integração das tecnologias Firebase, Next.js e Expo, garantindo uma experiência unificada entre plataformas. Criou a estrutura de autenticação, sistema de rotas e a lógica de sincronização de dados em tempo real.",
      habilidadesVPJS: ["Next.js", "React Native", "Firebase", "TypeScript", "API Integration"],
      iconeVPJS: <Code className="w-6 h-6" />,
      corVPJS: "text-blue-600"
    },
    {
      nomeVPJS: "Suelen",
      papelVPJS: "UI/UX Designer & Frontend",
      descricaoVPJS: "Responsável por toda a parte de design visual e experiência do usuário. Criou uma interface intuitiva e moderna com foco na usabilidade para agricultores e criadores de aves. Desenvolveu o sistema de cores, tipografia e layout responsivo, além de criar animações e transições que melhoram a experiência do usuário.",
      habilidadesVPJS: ["UI Design", "UX Research", "Tailwind CSS", "Figma", "Design Systems"],
      iconeVPJS: <Palette className="w-6 h-6" />,
      corVPJS: "text-purple-600"
    },
    {
      nomeVPJS: "Pedro",
      papelVPJS: "Programador de Sistemas Embarcados",
      descricaoVPJS: "Especialista na programação do circuito eletrônico da incubadora. Desenvolveu o firmware para microcontroladores que gerencia os sensores de temperatura, umidade, luminosidade e presença. Implementou algoritmos de controle PID para manter as condições ideais de incubação e criou protocolos de comunicação com o sistema web.",
      habilidadesVPJS: ["ESP32", "C++", "Sensor Integration", "IoT", "PID Control"],
      iconeVPJS: <Cpu className="w-6 h-6" />,
      corVPJS: "text-green-600"
    },
    {
      nomeVPJS: "Vinicius",
      papelVPJS: "Engenheiro Eletrônico & Hardware",
      descricaoVPJS: "Responsável pela montagem e projeto do circuito eletrônico. Selecionou os componentes adequados para cada sensor e atuador, e garantiu a segurança elétrica do sistema. Implementou proteções contra sobrecorrente e criou a fonte de alimentação robusta para operação contínua.",
      habilidadesVPJS: ["PCB Design", "Circuit Analysis", "Power Systems", "Hardware Testing", "Safety Protocols"],
      iconeVPJS: <Wrench className="w-6 h-6" />,
      corVPJS: "text-orange-600"
    }
  ];

  const projectGoalsVPJS: ProjectGoalVPJS[] = [
    {
      tituloVPJS: "Precisão no Controle Ambiental",
      descricaoVPJS: "Manter temperatura e umidade dentro dos parâmetros ideais para máxima taxa de eclosão",
      iconeVPJS: <Target className="w-8 h-8" />
    },
    {
      tituloVPJS: "Monitoramento em Tempo Real",
      descricaoVPJS: "Acompanhamento contínuo de todas as variáveis ambientais via interface web e mobile",
      iconeVPJS: <Lightbulb className="w-8 h-8" />
    },
    {
      tituloVPJS: "Automação Inteligente",
      descricaoVPJS: "Sistema automático que ajusta aquecedor e umidificador baseado nas leituras dos sensores",
      iconeVPJS: <CheckCircle className="w-8 h-8" />
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Sobre Nós</h2>
        <p className="text-lg text-gray-600 max-w-3xl">
          Somos uma equipe dedicada de profissionais apaixonados por tecnologia e inovação na agricultura. 
          Nosso projeto de incubadora inteligente representa o compromisso em unir hardware e software 
          para criar soluções práticas que melhorem a produtividade avícola.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-500" />
            Visão do Projeto
          </CardTitle>
          <CardDescription>
            Nossa missão é democratizar o acesso à tecnologia de incubação de alta precisão
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projectGoalsVPJS.map((goalVPJS, indexVPJS) => (
              <div key={indexVPJS} className="text-center space-y-3">
                <div className="w-16 h-16 mx-auto bg-orange-100 rounded-full flex items-center justify-center">
                  {goalVPJS.iconeVPJS}
                </div>
                <h3 className="font-semibold text-gray-900">{goalVPJS.tituloVPJS}</h3>
                <p className="text-sm text-gray-600">{goalVPJS.descricaoVPJS}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Users className="w-6 h-6 text-orange-500" />
          Nossa Equipe
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {teamMembersVPJS.map((memberVPJS, indexVPJS) => (
            <Card key={indexVPJS} className="relative overflow-hidden">
              <div className={`absolute top-0 left-0 w-1 h-full ${
                memberVPJS.corVPJS === 'text-blue-600' ? 'bg-blue-500' :
                memberVPJS.corVPJS === 'text-purple-600' ? 'bg-purple-500' :
                memberVPJS.corVPJS === 'text-green-600' ? 'bg-green-500' :
                'bg-orange-500'
              }`}></div>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    memberVPJS.corVPJS === 'text-blue-600' ? 'bg-blue-100' :
                    memberVPJS.corVPJS === 'text-purple-600' ? 'bg-purple-100' :
                    memberVPJS.corVPJS === 'text-green-600' ? 'bg-green-100' :
                    'bg-orange-100'
                  }`}>
                    <div className={memberVPJS.corVPJS}>
                      {memberVPJS.iconeVPJS}
                    </div>
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{memberVPJS.nomeVPJS}</CardTitle>
                    <CardDescription className="text-sm font-medium text-gray-700">
                      {memberVPJS.papelVPJS}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  {memberVPJS.descricaoVPJS}
                </p>
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Principais Habilidades
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {memberVPJS.habilidadesVPJS.map((skillVPJS, skillIndexVPJS) => (
                      <Badge 
                        key={skillIndexVPJS} 
                        variant="secondary" 
                        className="text-xs"
                      >
                        {skillVPJS}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-orange-500" />
            Impacto e Resultados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-2">
              <p className="text-3xl font-bold text-orange-600">95%</p>
              <p className="text-sm text-gray-600">Taxa de Eclosão Esperada</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-blue-600">24/7</p>
              <p className="text-sm text-gray-600">Monitoramento Contínuo</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-green-600">50%</p>
              <p className="text-sm text-gray-600">Redução de Mortalidade</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-purple-600">100%</p>
              <p className="text-sm text-gray-600">Automação</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tecnologias Utilizadas</CardTitle>
          <CardDescription>
            Stack tecnológico que impulsiona nossa solução
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
                <Code className="w-6 h-6 text-gray-600" />
              </div>
              <p className="text-sm font-medium">Next.js</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 mx-auto bg-yellow-100 rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-yellow-400 rounded"></div>
              </div>
              <p className="text-sm font-medium">JavaScript</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 mx-auto bg-orange-100 rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-orange-500 rounded-full"></div>
              </div>
              <p className="text-sm font-medium">Firebase</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 mx-auto bg-blue-100 rounded-lg flex items-center justify-center">
                <Cpu className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-sm font-medium">Arduino</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-orange-500" />
            Entre em Contato
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">
            Quer saber mais sobre nosso projeto ou colaborar conosco? 
            Estamos sempre abertos a novas parcerias e oportunidades.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="w-4 h-4 text-gray-500" />
              <span>contato@incubadora-vpjs.com</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Github className="w-4 h-4 text-gray-500" />
              <span>github.com/vpjs-incubadora</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Linkedin className="w-4 h-4 text-gray-500" />
              <span>linkedin.com/company/vpjs</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}