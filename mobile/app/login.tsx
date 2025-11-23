import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
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
  const [errorVPJS, setErrorVPJS] = useState('');
  const [successVPJS, setSuccessVPJS] = useState('');
  
  const { userVPJS, loginVPJS, cadastroVPJS } = useAuthVPJS();
  const routerVPJS = useRouter();

  // <<< MELHORIA 1: Redirecionamento automático e seguro >>>
  useEffect(() => {
    if (userVPJS) {
      routerVPJS.replace('/dashboard');
    }
  }, [userVPJS, routerVPJS]);

  const handleLoginVPJS = async () => {
    if (!emailVPJS || !passwordVPJS) {
      setErrorVPJS('Preencha todos os campos');
      return;
    }

    setLoadingVPJS(true);
    setErrorVPJS('');
    try {
      await loginVPJS(emailVPJS, passwordVPJS);
      // O redirecionamento agora é feito pelo useEffect
    } catch (error: any) {
      setErrorVPJS('Erro ao fazer login. Verifique suas credenciais.');
    } finally {
      setLoadingVPJS(false);
    }
  };

  const handleCadastroVPJS = async () => {
    if (!nomeVPJS || !emailVPJS || !passwordVPJS || !confirmPasswordVPJS) {
      setErrorVPJS('Preencha todos os campos');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailVPJS)) {
      setErrorVPJS('Por favor, insira um endereço de e-mail válido.');
      return;
    }

    if (passwordVPJS !== confirmPasswordVPJS) {
      setErrorVPJS('As senhas não coincidem');
      return;
    }

    if (passwordVPJS.length < 6) {
      setErrorVPJS('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    setLoadingVPJS(true);
    setErrorVPJS('');
    setSuccessVPJS('');

    try {
      await cadastroVPJS(nomeVPJS, emailVPJS, passwordVPJS);
      // <<< MELHORIA 2: Feedback de sucesso e redirecionamento com delay >>>
      setSuccessVPJS('Cadastro realizado com sucesso! Redirecionando...');
      setTimeout(() => {
        routerVPJS.replace('/dashboard');
      }, 2000);
    } catch (error: any) {
      // <<< MELHORIA 3: Tratamento de erros específicos do Firebase >>>
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
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.containerVPJS}>
        <View style={styles.headerVPJS}>
          <View style={styles.iconContainerVPJS}>
            <Egg size={64} color="#f97316" />
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
                editable={!loadingVPJS} // <<< MELHORIA 4: Campo desabilitado no carregamento
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
              editable={!loadingVPJS}
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
              editable={!loadingVPJS}
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
                editable={!loadingVPJS}
              />
            </View>
          )}

          {/* <<< MELHORIA 5: Exibe erros e sucessos na tela em vez de Alert >>> */}
          {errorVPJS ? <Text style={styles.errorTextVPJS}>{errorVPJS}</Text> : null}
          {successVPJS ? <Text style={styles.successTextVPJS}>{successVPJS}</Text> : null}

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
            disabled={loadingVPJS}
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

// Adicione os novos estilos para erro e sucesso
const styles = StyleSheet.create({
  // ... (seus estilos existentes)
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
  errorTextVPJS: {
    color: '#dc2626',
    marginBottom: 12,
    textAlign: 'center',
    fontSize: 14,
  },
  successTextVPJS: {
    color: '#16a34a',
    marginBottom: 12,
    textAlign: 'center',
    fontSize: 14,
  },
});