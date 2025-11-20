import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet,
  Dimensions
} from 'react-native';
import { useAuthVPJS } from '../contexts/AuthContextVPJS';
import { ref, onValue, database } from '../lib/firebaseMobile';
import { 
  Thermometer, 
  Droplets, 
  Lightbulb, 
  Activity,
  AlertTriangle,
  CheckCircle
} from 'lucide-react-native';

const { width: screenWidthVPJS } = Dimensions.get('window');

interface SensorDataVPJS {
  luminosidadeVPJS: number;
  presencaVPJS: boolean;
  umidadeVPJS: number;
  temperaturaVPJS: number;
}

export default function SensoresScreen() {
  const { userVPJS } = useAuthVPJS();
  const [sensorDataVPJS, setSensorDataVPJS] = useState<SensorDataVPJS>({
    luminosidadeVPJS: 0,
    presencaVPJS: false,
    umidadeVPJS: 0,
    temperaturaVPJS: 0
  });

  useEffect(() => {
    if (!userVPJS) return;

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
      }
    });

    return () => unsubscribeVPJS();
  }, [userVPJS]);

  const getTemperaturaStatusVPJS = (tempVPJS: number) => {
    if (tempVPJS >= 37 && tempVPJS <= 39) {
      return { status: 'Ideal', color: '#10b981', icon: CheckCircle };
    } else if (tempVPJS < 35 || tempVPJS > 41) {
      return { status: 'Crítico', color: '#ef4444', icon: AlertTriangle };
    } else {
      return { status: 'Atenção', color: '#f59e0b', icon: AlertTriangle };
    }
  };

  const getUmidadeStatusVPJS = (umidadeVPJS: number) => {
    if (umidadeVPJS >= 55 && umidadeVPJS <= 65) {
      return { status: 'Ideal', color: '#10b981', icon: CheckCircle };
    } else if (umidadeVPJS < 45 || umidadeVPJS > 75) {
      return { status: 'Crítico', color: '#ef4444', icon: AlertTriangle };
    } else {
      return { status: 'Atenção', color: '#f59e0b', icon: AlertTriangle };
    }
  };

  const getLuminosidadeStatusVPJS = (luminosidadeVPJS: number) => {
    if (luminosidadeVPJS >= 100 && luminosidadeVPJS <= 500) {
      return { status: 'Ideal', color: '#10b981', icon: CheckCircle };
    } else if (luminosidadeVPJS > 1000) {
      return { status: 'Excesso', color: '#ef4444', icon: AlertTriangle };
    } else {
      return { status: 'Baixa', color: '#f59e0b', icon: AlertTriangle };
    }
  };

  const temperaturaStatusVPJS = getTemperaturaStatusVPJS(sensorDataVPJS.temperaturaVPJS);
  const umidadeStatusVPJS = getUmidadeStatusVPJS(sensorDataVPJS.umidadeVPJS);
  const luminosidadeStatusVPJS = getLuminosidadeStatusVPJS(sensorDataVPJS.luminosidadeVPJS);

  const SensorCardVPJS = ({ 
    iconVPJS, 
    titleVPJS, 
    valueVPJS, 
    unitVPJS, 
    statusVPJS,
    descriptionVPJS,
    rangeVPJS
  }: {
    iconVPJS: React.ReactNode;
    titleVPJS: string;
    valueVPJS: string | number;
    unitVPJS?: string;
    statusVPJS: { status: string; color: string; icon: React.ReactNode };
    descriptionVPJS: string;
    rangeVPJS: string;
  }) => (
    <View style={styles.sensorCardVPJS}>
      <View style={styles.sensorHeaderVPJS}>
        <View style={styles.sensorIconVPJS}>
          {iconVPJS}
        </View>
        <View style={styles.sensorTitleContainerVPJS}>
          <Text style={styles.sensorTitleVPJS}>{titleVPJS}</Text>
          <Text style={styles.sensorDescriptionVPJS}>{descriptionVPJS}</Text>
        </View>
      </View>
      
      <View style={styles.sensorValueContainerVPJS}>
        <Text style={styles.sensorValueVPJS}>
          {valueVPJS}{unitVPJS}
        </Text>
        <View style={styles.statusContainerVPJS}>
          <statusVPJS.icon size={16} color={statusVPJS.color} />
          <Text style={[styles.statusTextVPJS, { color: statusVPJS.color }]}>
            {statusVPJS.status}
          </Text>
        </View>
      </View>

      <View style={styles.rangeContainerVPJS}>
        <Text style={styles.rangeTextVPJS}>Faixa Ideal: {rangeVPJS}</Text>
      </View>

      <View style={styles.progressContainerVPJS}>
        <View style={styles.progressBarVPJS}>
          <View 
            style={[
              styles.progressFillVPJS, 
              { 
                backgroundColor: statusVPJS.color,
                width: `${Math.min(100, Math.max(0, 
                  titleVPJS === 'Temperatura' ? ((sensorDataVPJS.temperaturaVPJS - 35) * 25) :
                  titleVPJS === 'Umidade' ? sensorDataVPJS.umidadeVPJS :
                  Math.min(100, sensorDataVPJS.luminosidadeVPJS / 10)
                ))}%` 
              }
            ]} 
          />
        </View>
      </View>

      <View style={styles.infoContainerVPJS}>
        <Text style={styles.infoTitleVPJS}>Informações Importantes:</Text>
        <Text style={styles.infoTextVPJS}>
          {titleVPJS === 'Temperatura' && 'Temperatura ideal para desenvolvimento embrionário. Variações bruscas podem afetar a eclosão.'}
          {titleVPJS === 'Umidade' && 'Controla a perda de água dos ovos. Umidade inadequada pode causar problemas na incubação.'}
          {titleVPJS === 'Luminosidade' && 'Influencia no ciclo dia/noite e desenvolvimento dos embriões.'}
          {titleVPJS === 'Presença' && 'Detecta movimentação no ambiente, útil para monitoramento de acesso.'}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.containerVPJS}>
      <View style={styles.headerVPJS}>
        <Text style={styles.headerTitleVPJS}>Monitoramento de Sensores</Text>
        <Text style={styles.headerSubtitleVPJS}>
          Acompanhe em tempo real todas as variáveis ambientais
        </Text>
      </View>

      <ScrollView style={styles.contentVPJS} showsVerticalScrollIndicator={false}>
        <SensorCardVPJS
          iconVPJS={<Thermometer size={24} color="#ef4444" />}
          titleVPJS="Temperatura"
          valueVPJS={sensorDataVPJS.temperaturaVPJS.toFixed(1)}
          unitVPJS="°C"
          statusVPJS={temperaturaStatusVPJS}
          descriptionVPJS="Controle térmico para desenvolvimento embrionário"
          rangeVPJS="37-39°C"
        />

        <SensorCardVPJS
          iconVPJS={<Droplets size={24} color="#3b82f6" />}
          titleVPJS="Umidade"
          valueVPJS={sensorDataVPJS.umidadeVPJS.toFixed(1)}
          unitVPJS="%"
          statusVPJS={umidadeStatusVPJS}
          descriptionVPJS="Nível de umidade relativa do ar"
          rangeVPJS="55-65%"
        />

        <SensorCardVPJS
          iconVPJS={<Lightbulb size={24} color="#eab308" />}
          titleVPJS="Luminosidade"
          valueVPJS={sensorDataVPJS.luminosidadeVPJS.toFixed(0)}
          unitVPJS=" lux"
          statusVPJS={luminosidadeStatusVPJS}
          descriptionVPJS="Intensidade de luz no ambiente"
          rangeVPJS="100-500 lux"
        />

        <SensorCardVPJS
          iconVPJS={<Activity size={24} color="#10b981" />}
          titleVPJS="Presença"
          valueVPJS={sensorDataVPJS.presencaVPJS ? 'Detectada' : 'Ausente'}
          statusVPJS={{
            status: sensorDataVPJS.presencaVPJS ? 'Ativo' : 'Inativo',
            color: sensorDataVPJS.presencaVPJS ? '#10b981' : '#6b7280',
            icon: Activity
          }}
          descriptionVPJS="Detecção de movimento no ambiente"
          rangeVPJS="Detectado/Ausente"
        />
        <View style={styles.systemInfoVPJS}>
          <Text style={styles.systemInfoTitleVPJS}>Informações do Sistema</Text>
          <View style={styles.systemInfoGridVPJS}>
            <View style={styles.systemInfoItemVPJS}>
              <Text style={styles.systemInfoLabelVPJS}>Taxa de Atualização</Text>
              <Text style={styles.systemInfoValueVPJS}>Tempo Real</Text>
            </View>
            <View style={styles.systemInfoItemVPJS}>
              <Text style={styles.systemInfoLabelVPJS}>Conexão</Text>
              <Text style={[styles.systemInfoValueVPJS, { color: '#10b981' }]}>Ativa</Text>
            </View>
            <View style={styles.systemInfoItemVPJS}>
              <Text style={styles.systemInfoLabelVPJS}>Latência</Text>
              <Text style={styles.systemInfoValueVPJS}>&lt;100ms</Text>

            </View>
            <View style={styles.systemInfoItemVPJS}>
              <Text style={styles.systemInfoLabelVPJS}>Status Geral</Text>
              <Text style={[styles.systemInfoValueVPJS, { color: '#10b981' }]}>Operacional</Text>
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
  sensorCardVPJS: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sensorHeaderVPJS: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sensorIconVPJS: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  sensorTitleContainerVPJS: {
    flex: 1,
  },
  sensorTitleVPJS: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  sensorDescriptionVPJS: {
    fontSize: 12,
    color: '#6b7280',
  },
  sensorValueContainerVPJS: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sensorValueVPJS: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  statusContainerVPJS: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusTextVPJS: {
    fontSize: 14,
    fontWeight: '600',
  },
  rangeContainerVPJS: {
    marginBottom: 12,
  },
  rangeTextVPJS: {
    fontSize: 12,
    color: '#6b7280',
  },
  progressContainerVPJS: {
    marginBottom: 16,
  },
  progressBarVPJS: {
    height: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFillVPJS: {
    height: '100%',
    borderRadius: 4,
    transition: 'width 0.3s ease',
  },
  infoContainerVPJS: {
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    padding: 12,
  },
  infoTitleVPJS: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  infoTextVPJS: {
    fontSize: 12,
    color: '#6b7280',
    lineHeight: 16,
  },
  systemInfoVPJS: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  systemInfoTitleVPJS: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  systemInfoGridVPJS: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  systemInfoItemVPJS: {
    width: (screenWidthVPJS - 80) / 2,
  },
  systemInfoLabelVPJS: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  systemInfoValueVPJS: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
});