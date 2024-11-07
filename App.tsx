import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import BoxingScreen from './src/screens/BoxingScreen';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import customColors from "./src/constants/colors";

const Tab = createBottomTabNavigator();

export default function App() {
  const theme = {
    ...DefaultTheme,
    ...customColors
  };

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Boxing" component={BoxingScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
