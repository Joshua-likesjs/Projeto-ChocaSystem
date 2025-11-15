import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  RefreshControl
} from 'react-native';
import { useSensorData } from '../hooks/useSensorData';
import { useAuth } from '../hooks/useAuth';

interface DashboardScreenProps {
  onAboutClick: () => void;
}

export default function DashboardScreen({ onAboutClick }: DashboardScreenProps) {
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
        if (temp >= 37 && temp <= 38) return '#10b981'; // green
        if (temp >= 36 && temp < 37) return '#f59e0b'; // yellow
        return '#ef4444'; // red
      
      case 'humidity':
        const humidity = parseInt(value);
        if (humidity >= 55 && humidity <= 65) return '#10b981';
        if (humidity >= 45 && humidity < 55) return '#f59e0b';
        return '#ef4444';
      
      case 'presence':
        return value === 'Detectado' ? '#10b981' : '#6b7280';
      
      case 'luminosity':
        const lux = parseInt(value);
        if (lux <= 50) return '#10b981';
        if (lux <= 100) return '#f59e0b';
        return '#ef4444';
      
      default:
        return '#6b7280';
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
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando dados dos sensores...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>Erro ao carregar dados</Text>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={() => {}} />
      }
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Monitoramento de Incubadora</Text>
          <Text style={styles.headerSubtitle}>
            Bem-vindo, {user?.displayName || user?.email}
          </Text>
        </View>
      </View>

      {/* Sensor Cards */}
      <View style={styles.cardsContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Temperatura</Text>
          <Text style={styles.cardValue}>
            {sensorData?.temperature || '--'}
          </Text>
          <View style={styles.statusContainer}>
            <View style={[
              styles.statusDot, 
              { backgroundColor: getStatusColor('temperature', sensorData?.temperature || '') }
            ]} />
            <Text style={styles.statusText}>
              {getStatusText('temperature', sensorData?.temperature || '')}
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Umidade</Text>
          <Text style={styles.cardValue}>
            {sensorData?.humidity || '--'}
          </Text>
          <View style={styles.statusContainer}>
            <View style={[
              styles.statusDot, 
              { backgroundColor: getStatusColor('humidity', sensorData?.humidity || '') }
            ]} />
            <Text style={styles.statusText}>
              {getStatusText('humidity', sensorData?.humidity || '')}
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Presença</Text>
          <Text style={styles.cardValue}>
            {sensorData?.presence || '--'}
          </Text>
          <View style={styles.statusContainer}>
            <View style={[
              styles.statusDot, 
              { backgroundColor: getStatusColor('presence', sensorData?.presence || '') }
            ]} />
            <Text style={styles.statusText}>
              {getStatusText('presence', sensorData?.presence || '')}
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Luminosidade</Text>
          <Text style={styles.cardValue}>
            {sensorData?.luminosity || '--'}
          </Text>
          <View style={styles.statusContainer}>
            <View style={[
              styles.statusDot, 
              { backgroundColor: getStatusColor('luminosity', sensorData?.luminosity || '') }
            ]} />
            <Text style={styles.statusText}>
              {getStatusText('luminosity', sensorData?.luminosity || '')}
            </Text>
          </View>
        </View>
      </View>

      {/* Status Overview */}
      <View style={styles.overviewCard}>
        <Text style={styles.overviewTitle}>Status Geral da Incubadora</Text>
        
        <View style={styles.overviewSection}>
          <Text style={styles.overviewSectionTitle}>Condições Ideais</Text>
          <View style={styles.conditionItem}>
            <Text style={styles.conditionLabel}>Temperatura:</Text>
            <Text style={styles.conditionValue}>37-38°C</Text>
          </View>
          <View style={styles.conditionItem}>
            <Text style={styles.conditionLabel}>Umidade:</Text>
            <Text style={styles.conditionValue}>55-65%</Text>
          </View>
          <View style={styles.conditionItem}>
            <Text style={styles.conditionLabel}>Luminosidade:</Text>
            <Text style={styles.conditionValue}>0-50 lux</Text>
          </View>
        </View>

        <View style={styles.overviewSection}>
          <Text style={styles.overviewSectionTitle}>Status Atual</Text>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>
              {sensorData ? 'Conectado' : 'Aguardando dados...'}
            </Text>
          </View>
          {sensorData?.timestamp && (
            <Text style={styles.timestamp}>
              Última atualização: {new Date(sensorData.timestamp).toLocaleString('pt-BR')}
            </Text>
          )}
        </View>
      </View>

      {/* Botões no Rodapé */}
      <View style={styles.footer}>
        <View style={styles.footerButtons}>
          <TouchableOpacity style={styles.footerButton} onPress={onAboutClick}>
            <Text style={styles.footerButtonText}>Sobre</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton} onPress={handleLogout}>
            <Text style={styles.footerButtonText}>Sair</Text>
          </TouchableOpacity>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  loadingText: {
    fontSize: 16,
    color: '#64748b',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8fafc',
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#dc2626',
    marginBottom: 8,
  },
  errorText: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
  },
  header: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  cardsContainer: {
    padding: 16,
    gap: 12,
  },
  card: {
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
  cardTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    color: '#64748b',
  },
  overviewCard: {
    backgroundColor: '#ffffff',
    margin: 16,
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
  overviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  overviewSection: {
    marginBottom: 16,
  },
  overviewSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  conditionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  conditionLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  conditionValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  statusBadge: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 8,
  },
  timestamp: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
  },
  footer: {
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    padding: 16,
  },
  footerButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  footerButton: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  footerButtonText: {
    fontSize: 14,
    color: '#475569',
    fontWeight: '500',
  },
});