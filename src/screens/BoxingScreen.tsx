import { Button, Text } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import Layout from '../components/Layout';
import ScreenTitle from '../components/ScreenTitle';

const BoxingScreen = ({
  navigation,
}: {
  navigation: StackNavigationProp<any>;
}) => {
  return (
    <Layout>
      <ScreenTitle title="Boxe" />
      <Button onPress={() => navigation.navigate('Timer')}>Minuteur</Button>
    </Layout>
  );
};

export default BoxingScreen;
