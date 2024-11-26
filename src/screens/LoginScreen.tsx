import { StackNavigationProp } from '@react-navigation/stack';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { login } from '../utils/auth';
import Toast from 'react-native-root-toast';
import Layout from '../components/Layout';
import ScreenTitle from '../components/ScreenTitle';

type LoginScreenProps = {
  navigation: StackNavigationProp<any>;
};

const ERROR_MESSAGES: Record<string, string> = {
  'auth/invalid-email': 'Aucun utilisateur trouvé.',
  'auth/invalid-credential': 'Aucun utilisateur trouvé.',
};

const showToast = (message: string) => {
  Toast.show(message, {
    duration: Toast.durations.SHORT,
    position: Toast.positions.TOP,
    animation: true,
    hideOnPress: true,
    delay: 0,
  });
};

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const isButtonDisabled =
    loading || formData.email.length < 5 || formData.password.length <= 11;

  const handleInputChange =
    (field: keyof typeof formData) => (text: string) => {
      setFormData((prev) => ({ ...prev, [field]: text }));
    };

  const handleLogin = async () => {
    setLoading(true);

    try {
      const { email, password } = formData;
      await login({ email, password });
    } catch (error: any) {
      if (error.code in ERROR_MESSAGES) {
        showToast(ERROR_MESSAGES[error.code]);
      } else {
        showToast('Une erreur est survenue');
      }
    }

    setLoading(false);
  };

  return (
    <Layout>
      <ScreenTitle title="Se connecter" />

      <View style={styles.inputs}>
        <TextInput
          label="Email"
          value={formData.email}
          autoCapitalize="none"
          onChangeText={handleInputChange('email')}
        />
        <TextInput
          label="Mot de passe"
          secureTextEntry
          value={formData.password}
          onChangeText={handleInputChange('password')}
        />
      </View>

      <View>
        <Button
          mode="contained"
          loading={loading}
          disabled={isButtonDisabled}
          style={styles.button}
          onPress={handleLogin}
        >
          Me connecter
        </Button>
        <Button
          mode="outlined"
          disabled={loading}
          style={styles.button}
          onPress={() => navigation.replace('Register')}
        >
          Créer un compte
        </Button>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  inputs: {
    marginTop: 20,
    gap: 10,
  },
  button: {
    margin: 5,
  },
});

export default LoginScreen;
