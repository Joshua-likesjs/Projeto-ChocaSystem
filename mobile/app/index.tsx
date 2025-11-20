import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuthVPJS } from '../contexts/AuthContextVPJS';

export default function IndexScreen() {
  const { userVPJS, loadingVPJS } = useAuthVPJS();
  const router = useRouter();

  useEffect(() => {
    if (!loadingVPJS) {
      if (userVPJS) {
        console.log("Usuário logado:", userVPJS.email);
        router.replace('/dashboard');
      } else {
        console.log("Usuário não logado → indo pro login");
        router.replace('/login');
      }
    }
  }, [loadingVPJS, userVPJS]);

  if (loadingVPJS) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#f97316" />
        <Text style={styles.text}>Carregando...</Text>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center'
  },
  text: { marginTop: 10 }
});
