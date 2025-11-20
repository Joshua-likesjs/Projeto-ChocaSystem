import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet,
  ScrollView,
  Dimensions
} from 'react-native';
import { useAuthVPJS } from '../contexts/AuthContextVPJS';
import { ref, onValue, database, update } from '../lib/firebaseMobile';
import { 
  Thermometer, 
  Droplets, 
  Power,
  Zap,
  CheckCircle2
} from 'lucide-react-native';

const { width: screenWidthVPJS } = Dimensions.get('window');

interface AtuadorDataVPJS {
  aquecedorVPJS: boolean;
  umidificadorVPJS: boolean;
}

export default function AtuadoresScreen() {
  const { userVPJS } = useAuthVPJS();
  const [atuadorDataVPJS, setAtuadorDataVPJS] = useState<AtuadorDataVPJS>({
    aquecedorVPJS: false,
    umidificadorVPJS: false
  });

  useEffect(() => {
    if (!userVPJS) return;

    const userRefVPJS = ref(database, `usuarios/${userVPJS.uid}`);
    
    const unsubscribeVPJS = onValue(userRefVPJS, (snapshot) => {
      const dataVPJS = snapshot.val();
      if (dataVPJS) {
        setAtuadorDataVPJS(dataVPJS.atuadoresVPJS || {
          aquecedorVPJS: false,
          umidificadorVPJS: false
        });
      }
    });

    return () => unsubscribeVPJS();
  }, [userVPJS]);

  const updateAtuadorVPJS = async (atuadorVPJS: 'aquecedorVPJS' | 'umidificadorVPJS', valorVPJS: boolean) => {
    if (!userVPJS) return;

    try {
      await update(ref(database, `usuarios/${userVPJS.uid}/atuadoresVPJS`), {
        [atuadorVPJS]: valorVPJS
      });
    } catch (error) {
      console.error('Erro ao atualizar atuador:', error);
    }
  };

  const AtuadorCardVPJS = ({ 
    iconVPJS, 
    titleVPJS, 
    descriptionVPJS,
    isOnVPJS,
    onToggleVPJS,
    targetValueVPJS,
    unitVPJS,
    powerVPJS,
    colorVPJS
  }: {
    iconVPJS: React.ReactNode;
    titleVPJS: string;
    descriptionVPJS: string;
    isOnVPJS: boolean;
    onToggleVPJS: () => void;
    targetValueVPJS: string;
    unitVPJS: string;
    powerVPJS: string;
    colorVPJS: string;
  }) => (
    <View style={[
      styles.atuadorCardVPJS,
      isOnVPJS && { backgroundColor: colorVPJS === '#ef4444' ? '#fef2f2' : '#eff6ff' }
    ]}>
      <View style={styles.atuadorHeaderVPJS}>
        <View style={[
          styles.atuadorIconVPJS,
          { backgroundColor: isOnVPJS ? colorVPJS : '#f3f4f6' }
        ]}>
          {iconVPJS}
        </View>
        <View style={styles.atuadorTitleContainerVPJS}>
          <Text style={styles.atuadorTitleVPJS}>{titleVPJS}</Text>
          <Text style={styles.atuadorDescriptionVPJS}>{descriptionVPJS}</Text>
        </View>
      </View>

      <View style={styles.atuadorStatusVPJS}>
        <Text style={styles.atuadorStatusTextVPJS}>
          Status: {isOnVPJS ? 'Ligado' : 'Desligado'}
        </Text>
        <Text style={styles.atuadorStatusDetailVPJS}>
          {isOnVPJS ? 'Sistema ativo' : 'Sistema inativo'}
        </Text>
      </View>

      <View style={styles.atuadorInfoVPJS}>
        <View style={styles.atuadorInfoItemVPJS}>
          <Text style={styles.atuadorInfoLabelVPJS}>Alvo</Text>
          <Text style={styles.atuadorInfoValueVPJS}>{targetValueVPJS}</Text>
        </View>
        <View style={styles.atuadorInfoItemVPJS}>
          <Text style={styles.atuadorInfoLabelVPJS}>Potência</Text>
          <Text style={styles.atuadorInfoValueVPJS}>{powerVPJS}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.toggleButtonVPJS,
          { backgroundColor: isOnVPJS ? colorVPJS : '#f3f4f6' }
        ]}
        onPress={onToggleVPJS}
      >
        <Power 
          size={20} 
          color={isOnVPJS ? '#ffffff' : '#6b7280'} 
        />
        <Text style={[
          styles.toggleButtonTextVPJS,
          { color: isOnVPJS ? '#ffffff' : '#6b7280' }
        ]}>
          {isOnVPJS ? 'Desligar' : 'Ligar'}
        </Text>
      </TouchableOpacity>

      <View style={styles.atuadorDetailsVPJS}>
        <Text style={styles.atuadorDetailsTitleVPJS}>Informações Importantes:</Text>
        <Text style={styles.atuadorDetailsTextVPJS}>
          {titleVPJS === 'Aquecedor' && 'Mantém a temperatura ideal para incubação. Temperatura recomendada: 37-39°C. Consumo varia conforme necessidade.'}
          {titleVPJS === 'Umidificador' && 'Previne a desidratação dos ovos. Umidade recomendada: 55-65%. Consumo médio durante operação.'}
        </Text>
      </View>
    </View>
  );

  const SystemStatusCardVPJS = () => {
    const isSystemActiveVPJS = atuadorDataVPJS.aquecedorVPJS || atuadorDataVPJS.umidificadorVPJS;
    const consumptionLevelVPJS = atuadorDataVPJS.aquecedorVPJS && atuadorDataVPJS.umidificadorVPJS ? 'Alto' :
                               atuadorDataVPJS.aquecedorVPJS || atuadorDataVPJS.umidificadorVPJS ? 'Médio' : 'Mínimo';

    return (
      <View style={styles.systemStatusCardVPJS}>
        <Text style={styles.systemStatusTitleVPJS}>Status do Sistema</Text>
        
        <View style={styles.systemStatusGridVPJS}>
          <View style={styles.systemStatusItemVPJS}>
            <View style={[
              styles.systemStatusIconVPJS,
              { backgroundColor: isSystemActiveVPJS ? '#10b981' : '#f3f4f6' }
            ]}>
              <Power 
                size={24} 
                color={isSystemActiveVPJS ? '#ffffff' : '#6b7280'} 
              />
            </View>
            <Text style={styles.systemStatusItemTitleVPJS}>Sistema Principal</Text>
            <Text style={styles.systemStatusItemValueVPJS}>
              {isSystemActiveVPJS ? 'Ativo' : 'Standby'}
            </Text>
          </View>

          <View style={styles.systemStatusItemVPJS}>
            <View style={[
              styles.systemStatusIconVPJS,
              { backgroundColor: consumptionLevelVPJS === 'Alto' ? '#f97316' : 
                               consumptionLevelVPJS === 'Médio' ? '#3b82f6' : '#f3f4f6' }
            ]}>
              <Zap 
                size={24} 
                color={consumptionLevelVPJS !== 'Mínimo' ? '#ffffff' : '#6b7280'} 
              />
            </View>
            <Text style={styles.systemStatusItemTitleVPJS}>Consumo Energético</Text>
            <Text style={styles.systemStatusItemValueVPJS}>{consumptionLevelVPJS}</Text>
          </View>

          <View style={styles.systemStatusItemVPJS}>
            <View style={[
              styles.systemStatusIconVPJS,
              { backgroundColor: '#10b981' }
            ]}>
              <CheckCircle2 size={24} color="#ffffff" />
            </View>
            <Text style={styles.systemStatusItemTitleVPJS}>Modo Operação</Text>
            <Text style={styles.systemStatusItemValueVPJS}>
              {isSystemActiveVPJS ? 'Automático' : 'Manual'}
            </Text>
          </View>
        </View>

        <View style={styles.recommendationVPJS}>
          <Text style={styles.recommendationTitleVPJS}>Recomendação</Text>
          <Text style={styles.recommendationTextVPJS}>
            Mantenha ambos os sistemas ativos durante o período de incubação para garantir condições ideais de desenvolvimento embrionário.
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.containerVPJS}>
      <View style={styles.headerVPJS}>
        <Text style={styles.headerTitleVPJS}>Controle de Atuadores</Text>
        <Text style={styles.headerSubtitleVPJS}>
          Gerencie os sistemas de aquecimento e umidificação
        </Text>
      </View>

      <ScrollView style={styles.contentVPJS} showsVerticalScrollIndicator={false}>
        <AtuadorCardVPJS
          iconVPJS={<Thermometer size={24} color="#ffffff" />}
          titleVPJS="Aquecedor"
          descriptionVPJS="Sistema de controle térmico"
          isOnVPJS={atuadorDataVPJS.aquecedorVPJS}
          onToggleVPJS={() => updateAtuadorVPJS('aquecedorVPJS', !atuadorDataVPJS.aquecedorVPJS)}
          targetValueVPJS="38.0°C"
          unitVPJS="°C"
          powerVPJS={atuadorDataVPJS.aquecedorVPJS ? '100%' : '0%'}
          colorVPJS="#ef4444"
        />

        <AtuadorCardVPJS
          iconVPJS={<Droplets size={24} color="#ffffff" />}
          titleVPJS="Umidificador"
          descriptionVPJS="Sistema de controle de umidade"
          isOnVPJS={atuadorDataVPJS.umidificadorVPJS}
          onToggleVPJS={() => updateAtuadorVPJS('umidificadorVPJS', !atuadorDataVPJS.umidificadorVPJS)}
          targetValueVPJS="60%"
          unitVPJS="%"
          powerVPJS={atuadorDataVPJS.umidificadorVPJS ? 'Alta' : 'Desligada'}
          colorVPJS="#3b82f6"
        />

        <SystemStatusCardVPJS />
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
  atuadorCardVPJS: {
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
  atuadorHeaderVPJS: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  atuadorIconVPJS: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  atuadorTitleContainerVPJS: {
    flex: 1,
  },
  atuadorTitleVPJS: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  atuadorDescriptionVPJS: {
    fontSize: 14,
    color: '#6b7280',
  },
  atuadorStatusVPJS: {
    marginBottom: 16,
  },
  atuadorStatusTextVPJS: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  atuadorStatusDetailVPJS: {
    fontSize: 14,
    color: '#6b7280',
  },
  atuadorInfoVPJS: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 16,
  },
  atuadorInfoItemVPJS: {
    flex: 1,
  },
  atuadorInfoLabelVPJS: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  atuadorInfoValueVPJS: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  toggleButtonVPJS: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
    gap: 8,
  },
  toggleButtonTextVPJS: {
    fontSize: 16,
    fontWeight: '600',
  },
  atuadorDetailsVPJS: {
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    padding: 12,
  },
  atuadorDetailsTitleVPJS: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  atuadorDetailsTextVPJS: {
    fontSize: 12,
    color: '#6b7280',
    lineHeight: 16,
  },
  systemStatusCardVPJS: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  systemStatusTitleVPJS: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  systemStatusGridVPJS: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 16,
  },
  systemStatusItemVPJS: {
    width: (screenWidthVPJS - 80) / 3,
    alignItems: 'center',
  },
  systemStatusIconVPJS: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  systemStatusItemTitleVPJS: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 4,
  },
  systemStatusItemValueVPJS: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'center',
  },
  recommendationVPJS: {
    backgroundColor: '#f0f9ff',
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },
  recommendationTitleVPJS: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  recommendationTextVPJS: {
    fontSize: 12,
    color: '#6b7280',
    lineHeight: 16,
  },
});