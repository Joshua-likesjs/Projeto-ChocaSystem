import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';

interface AboutScreenProps {
  onBackClick: () => void;
}

export default function AboutScreen({ onBackClick }: AboutScreenProps) {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBackClick}>
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sobre Nós</Text>
      </View>

      {/* Hero Section */}
      <View style={styles.heroSection}>
        <View style={styles.iconContainer}>
          <Text style={styles.eggIcon}>🥚</Text>
        </View>
        <Text style={styles.heroTitle}>Sistema de Monitoramento de Incubadora</Text>
        <Text style={styles.heroSubtitle}>
          Uma solução moderna e eficiente para o monitoramento em tempo real de incubadoras de ovos, 
          garantindo as condições ideais para o desenvolvimento embrionário.
        </Text>
        <View style={styles.versionBadge}>
          <Text style={styles.versionText}>Versão 2.0</Text>
        </View>
      </View>

      {/* Features Section */}
      <View style={styles.featuresSection}>
        <Text style={styles.sectionTitle}>Funcionalidades Principais</Text>
        
        <View style={styles.featureCard}>
          <Text style={styles.featureTitle}>🌡️ Monitoramento de Temperatura</Text>
          <Text style={styles.featureDescription}>
            Controle preciso da temperatura entre 37-38°C, mantendo as condições ideais 
            para o desenvolvimento dos embriões.
          </Text>
        </View>

        <View style={styles.featureCard}>
          <Text style={styles.featureTitle}>💧 Controle de Umidade</Text>
          <Text style={styles.featureDescription}>
            Monitoramento contínuo da umidade relativa do ar, mantendo-a na faixa ideal 
            de 55-65% para evitar a desidratação.
          </Text>
        </View>

        <View style={styles.featureCard}>
          <Text style={styles.featureTitle}>🛡️ Detecção de Presença</Text>
          <Text style={styles.featureDescription}>
            Sensores avançados detectam a presença dos ovos na incubadora, 
            garantindo que o sistema funcione apenas quando necessário.
          </Text>
        </View>

        <View style={styles.featureCard}>
          <Text style={styles.featureTitle}>🎯 Controle de Luminosidade</Text>
          <Text style={styles.featureDescription}>
            Monitoramento dos níveis de luz para simular o ambiente natural, 
            com recomendação de manter baixa luminosidade (0-50 lux).
          </Text>
        </View>
      </View>

      {/* Technology Section */}
      <View style={styles.technologySection}>
        <Text style={styles.sectionTitle}>Tecnologia e Inovação</Text>
        
        <View style={styles.technologyCard}>
          <Text style={styles.technologyTitle}>📱 Plataforma Mobile</Text>
          <Text style={styles.technologyDescription}>
            Desenvolvido com React Native e Expo, oferecendo uma experiência nativa 
            e fluida em dispositivos iOS e Android.
          </Text>
        </View>

        <View style={styles.technologyCard}>
          <Text style={styles.technologyTitle}>⚡ Atualizações em Tempo Real</Text>
          <Text style={styles.technologyDescription}>
            Sistema de atualização instantânea utilizando Firebase Realtime Database, 
            permitindo o monitoramento contínuo sem necessidade de recarregar.
          </Text>
        </View>

        <View style={styles.technologyCard}>
          <Text style={styles.technologyTitle}>🔐 Segurança e Autenticação</Text>
          <Text style={styles.technologyDescription}>
            Sistema de login seguro com Firebase Authentication, garantindo que apenas 
            profissionais autorizados tenham acesso ao monitoramento.
          </Text>
        </View>
      </View>

      {/* Contact Section */}
      <View style={styles.contactSection}>
        <Text style={styles.sectionTitle}>Entre em Contato</Text>
        <View style={styles.contactCard}>
          <Text style={styles.contactText}>
            Para mais informações sobre nosso sistema de monitoramento de incubadoras,
            entre em contato conosco.
          </Text>
          <View style={styles.contactInfo}>
            <Text style={styles.contactDetail}>📧 contato@incubadora.com</Text>
            <Text style={styles.contactDetail}>📞 (11) 1234-5678</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  backButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#f1f5f9',
  },
  backButtonText: {
    fontSize: 14,
    color: '#475569',
    fontWeight: '500',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  heroSection: {
    backgroundColor: '#ffffff',
    margin: 16,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#dbeafe',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  eggIcon: {
    fontSize: 40,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 12,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 16,
  },
  versionBadge: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  versionText: {
    fontSize: 14,
    color: '#475569',
    fontWeight: '500',
  },
  featuresSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  featureCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  technologySection: {
    padding: 16,
  },
  technologyCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  technologyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  technologyDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  contactSection: {
    padding: 16,
    paddingBottom: 32,
  },
  contactCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  contactText: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  contactInfo: {
    gap: 8,
  },
  contactDetail: {
    fontSize: 14,
    color: '#374151',
    textAlign: 'center',
  },
});