import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthVPJS } from '../contexts/AuthContextVPJS';
import { Egg, Thermometer, Droplets, Lightbulb } from 'lucide-react-native';

export default function LoginScreen() {
  const [isCadastroVPJS, setIsCadastroVPJS] = useState(false);
  const [nomeVPJS, setNomeVPJS] = useState('');
  const [emailVPJS, setEmailVPJS] = useState('');
  const [passwordVPJS, setPasswordVPJS] = useState('');
  const [confirmPasswordVPJS, setConfirmPasswordVPJS] = useState('');
  const [loadingVPJS, setLoadingVPJS] = useState(false);
  
  const { loginVPJS, cadastroVPJS } = useAuthVPJS();
  const routerVPJS = useRouter();

  const handleLoginVPJS = async () => {
    if (!emailVPJS || !passwordVPJS) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    setLoadingVPJS(true);
    try {
      await loginVPJS(emailVPJS, passwordVPJS);
      routerVPJS.replace('/dashboard');
    } catch (error: any) {
      Alert.alert('Erro de Login', error.message);
    } finally {
      setLoadingVPJS(false);
    }
  };

  const handleCadastroVPJS = async () => {
    if (!nomeVPJS || !emailVPJS || !passwordVPJS || !confirmPasswordVPJS) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    // >>> ALTERAÇÃO 1: Adicione esta validação de formato de email <<<
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailVPJS)) {
      Alert.alert('Erro', 'Por favor, insira um endereço de e-mail válido.');
      return;
    }

    if (passwordVPJS !== confirmPasswordVPJS) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    if (passwordVPJS.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres');
      return;
    }

    setLoadingVPJS(true);
    try {
      // >>> ALTERAÇÃO 2: Adicione a variável 'passwordVPJS' aqui <<<
      await cadastroVPJS(nomeVPJS, emailVPJS);
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!', [
        { text: 'OK', onPress: () => routerVPJS.replace('/dashboard') }
      ]);
    } catch (error: any) {
      Alert.alert('Erro de Cadastro', error.message);
    } finally {
      setLoadingVPJS(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.containerVPJS}>
        <View style={styles.headerVPJS}>
          <View style={styles.iconContainerVPJS}>
            <Egg size={64} color="#f97316" />
            <View style={styles.sensorIconsVPJS}>
              <Thermometer size={16} color="#ef4444" />
              <Droplets size={16} color="#3b82f6" />
              <Lightbulb size={16} color="#eab308" />
            </View>
          </View>
          <Text style={styles.titleVPJS}>Incubadora VPJS</Text>
          <Text style={styles.subtitleVPJS}>
            Sistema inteligente de incubação de ovos
          </Text>
        </View>

        <View style={styles.formContainerVPJS}>
          <Text style={styles.formTitleVPJS}>
            {isCadastroVPJS ? 'Criar Conta' : 'Acesso ao Sistema'}
          </Text>

          {isCadastroVPJS && (
            <View style={styles.inputContainerVPJS}>
              <Text style={styles.labelVPJS}>Nome Completo</Text>
              <TextInput
                style={styles.inputVPJS}
                value={nomeVPJS}
                onChangeText={setNomeVPJS}
                placeholder="Seu nome"
                autoCapitalize="words"
              />
            </View>
          )}

          <View style={styles.inputContainerVPJS}>
            <Text style={styles.labelVPJS}>Email</Text>
            <TextInput
              style={styles.inputVPJS}
              value={emailVPJS}
              onChangeText={setEmailVPJS}
              placeholder="seu@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainerVPJS}>
            <Text style={styles.labelVPJS}>Senha</Text>
            <TextInput
              style={styles.inputVPJS}
              value={passwordVPJS}
              onChangeText={setPasswordVPJS}
              placeholder={isCadastroVPJS ? "Mínimo 6 caracteres" : "••••••••"}
              secureTextEntry
            />
          </View>

          {isCadastroVPJS && (
            <View style={styles.inputContainerVPJS}>
              <Text style={styles.labelVPJS}>Confirmar Senha</Text>
              <TextInput
                style={styles.inputVPJS}
                value={confirmPasswordVPJS}
                onChangeText={setConfirmPasswordVPJS}
                placeholder="Confirme sua senha"
                secureTextEntry
              />
            </View>
          )}

          <TouchableOpacity
            style={[styles.buttonVPJS, loadingVPJS && styles.buttonDisabledVPJS]}
            onPress={isCadastroVPJS ? handleCadastroVPJS : handleLoginVPJS}
            disabled={loadingVPJS}
          >
            {loadingVPJS ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonTextVPJS}>
                {isCadastroVPJS ? 'Cadastrar' : 'Entrar'}
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.switchButtonVPJS}
            onPress={() => setIsCadastroVPJS(!isCadastroVPJS)}
          >
            <Text style={styles.switchButtonTextVPJS}>
              {isCadastroVPJS 
                ? 'Já tem uma conta? Faça login' 
                : 'Não tem uma conta? Cadastre-se'
              }
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.featuresVPJS}>
          <Text style={styles.featuresTitleVPJS}>Recursos do Sistema:</Text>
          <View style={styles.featureItemVPJS}>
            <Thermometer size={16} color="#ef4444" />
            <Text style={styles.featureTextVPJS}>Monitoramento de temperatura em tempo real</Text>
          </View>
          <View style={styles.featureItemVPJS}>
            <Droplets size={16} color="#3b82f6" />
            <Text style={styles.featureTextVPJS}>Controle de umidade automático</Text>
          </View>
          <View style={styles.featureItemVPJS}>
            <Lightbulb size={16} color="#eab308" />
            <Text style={styles.featureTextVPJS}>Sensor de luminosidade e presença</Text>
          </View>
          <View style={styles.featureItemVPJS}>
            <Egg size={16} color="#f97316" />
            <Text style={styles.featureTextVPJS}>Controle remoto de aquecedor e umidificador</Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  containerVPJS: {
    flex: 1,
    backgroundColor: '#fff7ed',
  },
  headerVPJS: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  iconContainerVPJS: {
    position: 'relative',
    marginBottom: 20,
  },
  sensorIconsVPJS: {
    position: 'absolute',
    top: -8,
    right: -8,
    flexDirection: 'row',
    gap: 2,
  },
  titleVPJS: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  subtitleVPJS: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  formContainerVPJS: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  formTitleVPJS: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainerVPJS: {
    marginBottom: 16,
  },
  labelVPJS: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
  },
  inputVPJS: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#f9fafb',
  },
  buttonVPJS: {
    backgroundColor: '#f97316',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabledVPJS: {
    backgroundColor: '#fed7aa',
  },
  buttonTextVPJS: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  switchButtonVPJS: {
    marginTop: 16,
    alignItems: 'center',
  },
  switchButtonTextVPJS: {
    color: '#f97316',
    fontSize: 14,
    fontWeight: '500',
  },
  featuresVPJS: {
    margin: 20,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  featuresTitleVPJS: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  featureItemVPJS: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  featureTextVPJS: {
    fontSize: 14,
    color: '#6b7280',
    flex: 1,
  },
});