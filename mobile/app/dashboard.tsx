import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView,
  Alert,
  ActivityIndicator
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthVPJS } from '../contexts/AuthContextVPJS';

import { 
  ref, 
  onValue, 
  database, 
  update 
} from '../lib/firebaseMobile';

import { 
  Egg, 
  Thermometer, 
  Droplets, 
  Lightbulb, 
  Activity,
  Menu,
  LogOut,
  User,
  Power,
  Info
} from 'lucide-react-native';

interface SensorDataVPJS {
  luminosidadeVPJS: number;
  presencaVPJS: boolean;
  umidadeVPJS: number;
  temperaturaVPJS: number;
}

interface AtuadorDataVPJS {
  aquecedorVPJS: boolean;
  umidificadorVPJS: boolean;
}

export default function DashboardScreen() {
  const { userVPJS, logoutVPJS } = useAuthVPJS();
  const routerVPJS = useRouter();

  const [menuVisibleVPJS, setMenuVisibleVPJS] = useState(false);

  const [sensorDataVPJS, setSensorDataVPJS] = useState<SensorDataVPJS>({
    luminosidadeVPJS: 0,
    presencaVPJS: false,
    umidadeVPJS: 0,
    temperaturaVPJS: 0
  });

  const [atuadorDataVPJS, setAtuadorDataVPJS] = useState<AtuadorDataVPJS>({
    aquecedorVPJS: false,
    umidificadorVPJS: false
  });

  // Carregar dados do Firebase
  useEffect(() => {
    if (!userVPJS) {
      routerVPJS.replace('/login');
      return;
    }

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

        setAtuadorDataVPJS(dataVPJS.atuadoresVPJS || {
          aquecedorVPJS: false,
          umidificadorVPJS: false
        });
      }
    });

    return () => unsubscribeVPJS();
  }, [userVPJS]);

  // Logout
  const handleLogoutVPJS = async () => {
    Alert.alert(
      'Sair da Conta',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Sair', 
          style: 'destructive',
          onPress: async () => {
            await logoutVPJS();
            routerVPJS.replace('/login');
          }
        }
      ]
    );
  };

  // Atualizar atuadores
  const updateAtuadorVPJS = async (
    atuadorVPJS: 'aquecedorVPJS' | 'umidificadorVPJS',
    valorVPJS: boolean
  ) => {
    if (!userVPJS) return;

    try {
      await update(ref(database, `usuarios/${userVPJS.uid}/atuadoresVPJS`), {
        [atuadorVPJS]: valorVPJS
      });
    } catch (error) {
      console.error('Erro ao atualizar atuador:', error);
      Alert.alert('Erro', 'Não foi possível atualizar o atuador.');
    }
  };

  // COMPONENTE DE SENSOR
  const SensorCardVPJS = ({
    iconVPJS,
    titleVPJS,
    valueVPJS,
    unitVPJS,
    colorVPJS
  }: {
    iconVPJS: React.ReactNode;
    titleVPJS: string;
    valueVPJS: string | number;
    unitVPJS?: string;
    colorVPJS: string;
  }) => (
    <View style={[styles.sensorCardVPJS, { borderLeftColor: colorVPJS }]}>
      <View style={styles.sensorIconVPJS}>{iconVPJS}</View>
      <Text style={styles.sensorTitleVPJS}>{titleVPJS}</Text>
      <Text style={styles.sensorValueVPJS}>
        {valueVPJS}{unitVPJS}
      </Text>
    </View>
  );

  // MENU ITEM
  const MenuItemVPJS = ({
    iconVPJS,
    titleVPJS,
    onPressVPJS,
    isLastVPJS = false
  }: {
    iconVPJS: React.ReactNode;
    titleVPJS: string;
    onPressVPJS: () => void;
    isLastVPJS?: boolean;
  }) => (
    <TouchableOpacity
      style={[
        styles.menuItemVPJS,
        !isLastVPJS && styles.menuItemBorderVPJS
      ]}
      onPress={() => {
        setMenuVisibleVPJS(false);
        onPressVPJS();
      }}
    >
      <View style={styles.menuItemIconVPJS}>{iconVPJS}</View>
      <Text style={styles.menuItemTextVPJS}>{titleVPJS}</Text>
    </TouchableOpacity>
  );

  // CARREGANDO
  if (!userVPJS) {
    return (
      <View style={styles.loadingContainerVPJS}>
        <ActivityIndicator size="large" color="#f97316" />
      </View>
    );
  }

  return (
    <View style={styles.containerVPJS}>

      {/* HEADER */}
      <View style={styles.headerVPJS}>
        <View style={styles.headerLeftVPJS}>
          <TouchableOpacity
            style={styles.menuButtonVPJS}
            onPress={() => setMenuVisibleVPJS(!menuVisibleVPJS)}
          >
            <Menu size={24} color="#f97316" />
          </TouchableOpacity>

          <View style={styles.logoContainerVPJS}>
            <Egg size={28} color="#f97316" />
            <Text style={styles.headerTitleVPJS}>Incubadora VPJS</Text>
          </View>
        </View>

        <View style={styles.userContainerVPJS}>
          <View style={styles.userAvatarVPJS}>
            <User size={16} color="#f97316" />
          </View>
          <Text style={styles.userEmailVPJS} numberOfLines={1}>
            {userVPJS.email}
          </Text>
        </View>
      </View>

      {/* MENU LATERAL */}
      {menuVisibleVPJS && (
        <View style={styles.menuOverlayVPJS}>
          <TouchableOpacity
            style={styles.menuOverlayBgVPJS}
            onPress={() => setMenuVisibleVPJS(false)}
          />

          <View style={styles.menuVPJS}>
            <MenuItemVPJS
              iconVPJS={<Activity size={20} color="#f97316" />}
              titleVPJS="Sensores"
              onPressVPJS={() => routerVPJS.push('/sensores')}
            />

            <MenuItemVPJS
              iconVPJS={<Power size={20} color="#f97316" />}
              titleVPJS="Atuadores"
              onPressVPJS={() => routerVPJS.push('/atuadores')}
            />

            <MenuItemVPJS
              iconVPJS={<Info size={20} color="#f97316" />}
              titleVPJS="Sobre Nós"
              onPressVPJS={() => routerVPJS.push('/sobre-nos')}
            />

            <MenuItemVPJS
              iconVPJS={<LogOut size={20} color="#ef4444" />}
              titleVPJS="Sair da Conta"
              onPressVPJS={handleLogoutVPJS}
              isLastVPJS
            />
          </View>
        </View>
      )}

      {/* CONTEÚDO */}
      <ScrollView style={styles.contentVPJS}>

        {/* SENSORES */}
        <View style={styles.sensorGridVPJS}>
          <SensorCardVPJS
            iconVPJS={<Thermometer size={20} color="#ef4444" />}
            titleVPJS="Temperatura"
            valueVPJS={sensorDataVPJS.temperaturaVPJS.toFixed(1)}
            unitVPJS="°C"
            colorVPJS="#ef4444"
          />

          <SensorCardVPJS
            iconVPJS={<Droplets size={20} color="#3b82f6" />}
            titleVPJS="Umidade"
            valueVPJS={sensorDataVPJS.umidadeVPJS.toFixed(1)}
            unitVPJS="%"
            colorVPJS="#3b82f6"
          />

          <SensorCardVPJS
            iconVPJS={<Lightbulb size={20} color="#eab308" />}
            titleVPJS="Luminosidade"
            valueVPJS={sensorDataVPJS.luminosidadeVPJS.toFixed(0)}
            unitVPJS=" lux"
            colorVPJS="#eab308"
          />

          <SensorCardVPJS
            iconVPJS={<Activity size={20} color="#10b981" />}
            titleVPJS="Presença"
            valueVPJS={sensorDataVPJS.presencaVPJS ? 'Detectada' : 'Ausente'}
            colorVPJS="#10b981"
          />
        </View>

        {/* AÇÕES RÁPIDAS */}
        <View style={styles.quickActionsVPJS}>
          <Text style={styles.sectionTitleVPJS}>Controle Rápido</Text>

          <View style={styles.actionButtonsVPJS}>
            <TouchableOpacity
              style={[
                styles.actionButtonVPJS,
                atuadorDataVPJS.aquecedorVPJS && styles.actionButtonActiveVPJS
              ]}
              onPress={() => updateAtuadorVPJS(
                'aquecedorVPJS', 
                !atuadorDataVPJS.aquecedorVPJS
              )}
            >
              <Thermometer
                size={24}
                color={atuadorDataVPJS.aquecedorVPJS ? '#fff' : '#f97316'}
              />
              <Text style={[
                styles.actionButtonTextVPJS,
                atuadorDataVPJS.aquecedorVPJS && styles.actionButtonTextActiveVPJS
              ]}>
                Aquecedor
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.actionButtonVPJS,
                atuadorDataVPJS.umidificadorVPJS && styles.actionButtonActiveVPJS
              ]}
              onPress={() => updateAtuadorVPJS(
                'umidificadorVPJS', 
                !atuadorDataVPJS.umidificadorVPJS
              )}
            >
              <Droplets
                size={24}
                color={atuadorDataVPJS.umidificadorVPJS ? '#fff' : '#3b82f6'}
              />
              <Text style={[
                styles.actionButtonTextVPJS,
                atuadorDataVPJS.umidificadorVPJS && styles.actionButtonTextActiveVPJS
              ]}>
                Umidificador
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* STATUS */}
        <View style={styles.statusVPJS}>
          <Text style={styles.sectionTitleVPJS}>Status do Sistema</Text>

          <View style={styles.statusCardVPJS}>
            <View style={styles.statusItemVPJS}>
              <View style={styles.statusIndicatorVPJS}>
                <View style={[styles.statusDotVPJS, { backgroundColor: '#10b981' }]} />
              </View>
              <Text style={styles.statusTextVPJS}>Conexão: Ativa</Text>
            </View>

            <View style={styles.statusItemVPJS}>
              <View style={styles.statusIndicatorVPJS}>
                <View style={[styles.statusDotVPJS, { backgroundColor: '#10b981' }]} />
              </View>
              <Text style={styles.statusTextVPJS}>Sistema: Operacional</Text>
            </View>

            <View style={styles.statusItemVPJS}>
              <View style={styles.statusIndicatorVPJS}>
                <View style={[styles.statusDotVPJS, { backgroundColor: '#10b981' }]} />
              </View>
              <Text style={styles.statusTextVPJS}>Atualização: Tempo Real</Text>
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
  loadingContainerVPJS: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff7ed',
  },
  headerVPJS: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#ffffff',
    elevation: 4,
  },
  headerLeftVPJS: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuButtonVPJS: {
    padding: 8,
  },
  logoContainerVPJS: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitleVPJS: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  userContainerVPJS: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  userAvatarVPJS: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fed7aa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userEmailVPJS: {
    fontSize: 12,
    color: '#6b7280',
    maxWidth: 120,
  },
  menuOverlayVPJS: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  menuOverlayBgVPJS: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  menuVPJS: {
    position: 'absolute',
    top: 100,
    left: 20,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    elevation: 10,
    minWidth: 200,
  },
  menuItemVPJS: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  menuItemBorderVPJS: {
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  menuItemIconVPJS: {
    marginRight: 12,
  },
  menuItemTextVPJS: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
  },
  contentVPJS: {
    flex: 1,
    padding: 20,
  },
  sensorGridVPJS: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  sensorCardVPJS: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    elevation: 4,
  },
  sensorIconVPJS: {
    marginBottom: 8,
  },
  sensorTitleVPJS: {
    fontSize: 12,
    color: '#6b7280',
  },
  sensorValueVPJS: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  quickActionsVPJS: {
    marginBottom: 24,
  },
  sectionTitleVPJS: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
  },
  actionButtonsVPJS: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButtonVPJS: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    elevation: 4,
  },
  actionButtonActiveVPJS: {
    backgroundColor: '#f97316',
  },
  actionButtonTextVPJS: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginTop: 8,
  },
  actionButtonTextActiveVPJS: {
    color: '#ffffff',
  },
  statusVPJS: {
    marginBottom: 24,
  },
  statusCardVPJS: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    elevation: 4,
  },
  statusItemVPJS: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusIndicatorVPJS: {
    marginRight: 12,
  },
  statusDotVPJS: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusTextVPJS: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
  },
});
