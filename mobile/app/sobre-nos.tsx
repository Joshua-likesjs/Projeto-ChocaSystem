import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet,
  Dimensions
} from 'react-native';
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
} from 'lucide-react-native';

const { width: screenWidthVPJS } = Dimensions.get('window');

interface TeamMemberVPJS {
  nomeVPJS: string;
  papelVPJS: string;
  descricaoVPJS: string;
  habilidadesVPJS: string[];
  iconeVPJS: React.ReactNode;
  corVPJS: string;
}

export default function SobreNosScreen() {
  const teamMembersVPJS: TeamMemberVPJS[] = [
    {
      nomeVPJS: "Josue",
      papelVPJS: "Desenvolvedor Full Stack & Integração",
      descricaoVPJS: "Responsável por toda a arquitetura web e mobile, implementando a comunicação entre frontend e backend. Desenvolveu a integração das tecnologias Firebase, Next.js e Expo, garantindo uma experiência unificada entre plataformas.",
      habilidadesVPJS: ["Next.js", "React Native", "Firebase", "TypeScript", "API Integration"],
      iconeVPJS: <Code size={24} color="#3b82f6" />,
      corVPJS: "#3b82f6"
    },
    {
      nomeVPJS: "Suelen",
      papelVPJS: "UI/UX Designer & Frontend",
      descricaoVPJS: "Responsável por toda a parte de design visual e experiência do usuário. Criou uma interface intuitiva e moderna com foco na usabilidade para agricultores e criadores de aves.",
      habilidadesVPJS: ["UI Design", "UX Research", "Tailwind CSS", "Figma", "Design Systems"],
      iconeVPJS: <Palette size={24} color="#8b5cf6" />,
      corVPJS: "#8b5cf6"
    },
    {
      nomeVPJS: "Pedro",
      papelVPJS: "Programador de Sistemas Embarcados",
      descricaoVPJS: "Especialista na programação do circuito eletrônico da incubadora. Desenvolveu o firmware para microcontroladores que gerencia os sensores e atuadores do sistema.",
      habilidadesVPJS: ["ESP32", "C++", "Sensor Integration", "IoT", "PID Control"],
      iconeVPJS: <Cpu size={24} color="#10b981" />,
      corVPJS: "#10b981"
    },
    {
      nomeVPJS: "Vinicius",
      papelVPJS: "Engenheiro Eletrônico & Hardware",
      descricaoVPJS: "Responsável pela montagem e projeto do circuito eletrônico.Garantiu a segurança elétrica do sistema.",
      habilidadesVPJS: ["PCB Design", "Circuit Analysis", "Power Systems", "Hardware Testing"],
      iconeVPJS: <Wrench size={24} color="#f97316" />,
      corVPJS: "#f97316"
    }
  ];

  const projectGoalsVPJS = [
    {
      tituloVPJS: "Precisão no Controle",
      descricaoVPJS: "Manter temperatura e umidade dentro dos parâmetros ideais",
      iconeVPJS: <Target size={24} color="#f97316" />
    },
    {
      tituloVPJS: "Monitoramento em Tempo Real",
      descricaoVPJS: "Acompanhamento contínuo de todas as variáveis ambientais",
      iconeVPJS: <Lightbulb size={24} color="#eab308" />
    },
    {
      tituloVPJS: "Automação Inteligente",
      descricaoVPJS: "Sistema automático que ajusta aquecedor e umidificador",
      iconeVPJS: <CheckCircle size={24} color="#10b981" />
    }
  ];

  const TeamMemberCardVPJS = ({ memberVPJS }: { memberVPJS: TeamMemberVPJS }) => (
    <View style={styles.memberCardVPJS}>
      <View style={styles.memberHeaderVPJS}>
        <View style={[styles.memberIconVPJS, { backgroundColor: `${memberVPJS.corVPJS}20` }]}>
          {memberVPJS.iconeVPJS}
        </View>
        <View style={styles.memberInfoVPJS}>
          <Text style={styles.memberNameVPJS}>{memberVPJS.nomeVPJS}</Text>
          <Text style={styles.memberRoleVPJS}>{memberVPJS.papelVPJS}</Text>
        </View>
      </View>
      
      <Text style={styles.memberDescriptionVPJS}>{memberVPJS.descricaoVPJS}</Text>
      
      <View style={styles.skillsContainerVPJS}>
        <Text style={styles.skillsTitleVPJS}>Principais Habilidades:</Text>
        <View style={styles.skillsGridVPJS}>
          {memberVPJS.habilidadesVPJS.map((skillVPJS, indexVPJS) => (
            <View key={indexVPJS} style={styles.skillBadgeVPJS}>
              <Text style={styles.skillTextVPJS}>{skillVPJS}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  const GoalCardVPJS = ({ goalVPJS, indexVPJS }: { goalVPJS: any; indexVPJS: number }) => (
    <View style={styles.goalCardVPJS}>
      <View style={styles.goalIconVPJS}>
        {goalVPJS.iconeVPJS}
      </View>
      <Text style={styles.goalTitleVPJS}>{goalVPJS.tituloVPJS}</Text>
      <Text style={styles.goalDescriptionVPJS}>{goalVPJS.descricaoVPJS}</Text>
    </View>
  );

  return (
    <View style={styles.containerVPJS}>
      <View style={styles.headerVPJS}>
        <Text style={styles.headerTitleVPJS}>Sobre Nós</Text>
        <Text style={styles.headerSubtitleVPJS}>
          Equipe VPJS - Transformando tecnologia em soluções para avicultura
        </Text>
      </View>

      <ScrollView style={styles.contentVPJS} showsVerticalScrollIndicator={false}>
        <View style={styles.introVPJS}>
          <Text style={styles.introTextVPJS}>
            Somos uma equipe dedicada de profissionais apaixonados por tecnologia e inovação na agricultura. 
            Nosso projeto de incubadora inteligente representa o compromisso em unir hardware e software 
            para criar soluções práticas que melhorem a produtividade avícola.
          </Text>
        </View>

        <View style={styles.sectionVPJS}>
          <View style={styles.sectionHeaderVPJS}>
            <Award size={24} color="#f97316" />
            <Text style={styles.sectionTitleVPJS}>Visão do Projeto</Text>
          </View>
          <Text style={styles.sectionDescriptionVPJS}>
            Nossa missão é democratizar o acesso à tecnologia de incubação de alta precisão
          </Text>
          <View style={styles.goalsGridVPJS}>
            {projectGoalsVPJS.map((goalVPJS, indexVPJS) => (
              <GoalCardVPJS goalVPJS={goalVPJS} indexVPJS={indexVPJS} />
            ))}
          </View>
        </View>

        <View style={styles.sectionVPJS}>
          <View style={styles.sectionHeaderVPJS}>
            <Users size={24} color="#f97316" />
            <Text style={styles.sectionTitleVPJS}>Nossa Equipe</Text>
          </View>
          {teamMembersVPJS.map((memberVPJS, indexVPJS) => (
            <TeamMemberCardVPJS memberVPJS={memberVPJS} />
          ))}
        </View>

        <View style={styles.sectionVPJS}>
          <View style={styles.sectionHeaderVPJS}>
            <Target size={24} color="#f97316" />
            <Text style={styles.sectionTitleVPJS}>Impacto e Resultados</Text>
          </View>
          <View style={styles.impactGridVPJS}>
            <View style={styles.impactItemVPJS}>
              <Text style={styles.impactValueVPJS}>95%</Text>
              <Text style={styles.impactLabelVPJS}>Taxa de Eclosão Esperada</Text>
            </View>
            <View style={styles.impactItemVPJS}>
              <Text style={styles.impactValueVPJS}>24/7</Text>
              <Text style={styles.impactLabelVPJS}>Monitoramento Contínuo</Text>
            </View>
            <View style={styles.impactItemVPJS}>
              <Text style={styles.impactValueVPJS}>50%</Text>
              <Text style={styles.impactLabelVPJS}>Redução de Mortalidade</Text>
            </View>
            <View style={styles.impactItemVPJS}>
              <Text style={styles.impactValueVPJS}>100%</Text>
              <Text style={styles.impactLabelVPJS}>Automação</Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionVPJS}>
          <View style={styles.sectionHeaderVPJS}>
            <Code size={24} color="#f97316" />
            <Text style={styles.sectionTitleVPJS}>Tecnologias Utilizadas</Text>
          </View>
          <Text style={styles.sectionDescriptionVPJS}>
            Stack tecnológico que impulsiona nossa solução
          </Text>
          <View style={styles.techGridVPJS}>
            <View style={styles.techItemVPJS}>
              <View style={styles.techIconVPJS}>
                <Code size={20} color="#6b7280" />
              </View>
              <Text style={styles.techNameVPJS}>Next.js</Text>
            </View>
            <View style={styles.techItemVPJS}>
              <View style={styles.techIconVPJS}>
                <View style={styles.jsIconVPJS} />
              </View>
              <Text style={styles.techNameVPJS}>JS</Text>
            </View>
            <View style={styles.techItemVPJS}>
              <View style={styles.techIconVPJS}>
                <View style={styles.firebaseIconVPJS} />
              </View>
              <Text style={styles.techNameVPJS}>Firebase</Text>
            </View>
            <View style={styles.techItemVPJS}>
              <View style={styles.techIconVPJS}>
                <Cpu size={20} color="#3b82f6" />
              </View>
              <Text style={styles.techNameVPJS}>Arduino</Text>
            </View>
          </View>
        </View>

        <View style={styles.contactVPJS}>
          <View style={styles.sectionHeaderVPJS}>
            <Mail size={24} color="#f97316" />
            <Text style={styles.sectionTitleVPJS}>Entre em Contato</Text>
          </View>
          <Text style={styles.contactTextVPJS}>
            Quer saber mais sobre nosso projeto ou colaborar conosco? 
            Estamos sempre abertos a novas parcerias e oportunidades.
          </Text>
          <View style={styles.contactItemsVPJS}>
            <View style={styles.contactItemVPJS}>
              <Mail size={16} color="#6b7280" />
              <Text style={styles.contactItemTextVPJS}>contato@incubadora-vpjs.com</Text>
            </View>
            <View style={styles.contactItemVPJS}>
              <Github size={16} color="#6b7280" />
              <Text style={styles.contactItemTextVPJS}>github.com/vpjs-incubadora</Text>
            </View>
            <View style={styles.contactItemVPJS}>
              <Linkedin size={16} color="#6b7280" />
              <Text style={styles.contactItemTextVPJS}>linkedin.com/company/vpjs</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  containerVPJS: {
    flex: 1,
    backgroundColor: '#fff7ed',
  },
  headerVPJS: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  headerTitleVPJS: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  headerSubtitleVPJS: {
    fontSize: 14,
    color: '#6b7280',
  },
  contentVPJS: {
    flex: 1,
    padding: 20,
  },
  introVPJS: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  introTextVPJS: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
  },
  sectionVPJS: {
    marginBottom: 20,
  },
  sectionHeaderVPJS: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sectionTitleVPJS: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  sectionDescriptionVPJS: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
  },
  goalsGridVPJS: {
    flexDirection: 'row',
    gap: 12,
  },
  goalCardVPJS: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  goalIconVPJS: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fed7aa',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  goalTitleVPJS: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  goalDescriptionVPJS: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 16,
  },
  memberCardVPJS: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderLeftWidth: 4,
  },
  memberHeaderVPJS: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  memberIconVPJS: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  memberInfoVPJS: {
    flex: 1,
  },
  memberNameVPJS: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  memberRoleVPJS: {
    fontSize: 14,
    color: '#6b7280',
  },
  memberDescriptionVPJS: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 16,
  },
  skillsContainerVPJS: {
    marginBottom: 8,
  },
  skillsTitleVPJS: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  skillsGridVPJS: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillBadgeVPJS: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  skillTextVPJS: {
    fontSize: 12,
    color: '#374151',
  },
  impactGridVPJS: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  impactItemVPJS: {
    flex: 1,
    minWidth: (screenWidthVPJS - 80) / 2,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  impactValueVPJS: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f97316',
    marginBottom: 8,
  },
  impactLabelVPJS: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  techGridVPJS: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  techItemVPJS: {
    flex: 1,
    minWidth: (screenWidthVPJS - 80) / 4,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  techIconVPJS: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  jsIconVPJS: {
    width: 20,
    height: 20,
    backgroundColor: '#f7df1e',
    borderRadius: 4,
  },
  firebaseIconVPJS: {
    width: 20,
    height: 20,
    backgroundColor: '#f97316',
    borderRadius: 4,
  },
  techNameVPJS: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
    textAlign: 'center',
  },
  contactVPJS: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  contactTextVPJS: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 16,
  },
  contactItemsVPJS: {
    gap: 12,
  },
  contactItemVPJS: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  contactItemTextVPJS: {
    fontSize: 14,
    color: '#6b7280',
  },
});