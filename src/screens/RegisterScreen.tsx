import { StackNavigationProp } from '@react-navigation/stack';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { login, signup } from '../utils/auth';
import Toast from 'react-native-root-toast';
import Layout from '../components/Layout';
import ScreenTitle from '../components/ScreenTitle';

type RegisterScreenProps = {
  navigation: StackNavigationProp<any>;
};

const ERROR_MESSAGES: Record<string, string> = {
  'auth/invalid-email': 'Aucun utilisateur trouvé.',
  'auth/missing-password': 'Mot de passe requis.',
  'auth/password-does-not-meet-requirements': 'Mot de passe trop faible.',
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

const RegisterScreen = ({ navigation }: RegisterScreenProps) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const isButtonDisabled =
    loading ||
    formData.email.length < 5 ||
    formData.password.length <= 11 ||
    formData.confirmPassword.length <= 11;

  const handleInputChange =
    (field: keyof typeof formData) => (text: string) => {
      setFormData((prev) => ({ ...prev, [field]: text }));
    };

  const handleSignup = async () => {
    setLoading(true);

    const { email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      showToast('Les mots de passe ne correspondent pas.');
      setLoading(false);
      return;
    }

    try {
      await signup({ email, password });
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        await login({ email, password });
      } else if (error.code in ERROR_MESSAGES) {
        showToast(ERROR_MESSAGES[error.code]);
      } else {
        showToast('Une erreur est survenue.');
      }
    }

    setLoading(false);
  };

  return (
    <Layout>
      <ScreenTitle title="Créer mon compte" />

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
          textContentType="oneTimeCode"
          value={formData.password}
          onChangeText={handleInputChange('password')}
        />
        <TextInput
          label="Confirmer le mot de passe"
          secureTextEntry
          textContentType="oneTimeCode"
          value={formData.confirmPassword}
          onChangeText={handleInputChange('confirmPassword')}
        />
      </View>

      <View>
        <Button
          mode="contained"
          loading={loading}
          disabled={isButtonDisabled}
          style={styles.button}
          onPress={handleSignup}
        >
          Créer mon compte
        </Button>
        <Button
          mode="outlined"
          disabled={loading}
          style={styles.button}
          onPress={() => navigation.replace('Login')}
        >
          Me connecter
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

export default RegisterScreen;
