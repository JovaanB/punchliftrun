import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootSiblingParent } from 'react-native-root-siblings';
import HomeScreen from './src/screens/HomeScreen';
import BoxingScreen from './src/screens/BoxingScreen';
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
  Text,
} from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import customColors from './src/constants/colors';
import './gesture-handler';
import TimerScreen from './src/screens/TimerScreen';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import { app } from './firebaseConfig';
import SettingsScreen from './src/screens/SettingsScreen';
import SettingTimerScreen from './src/screens/SettingTimerScreen';

export type RootStackParamList = {
  Boxing: undefined;
  Timer: undefined;
  SettingTimer: undefined;
  Login: undefined;
  Register: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const tabBarIcons: Record<
  string,
  keyof typeof MaterialCommunityIcons.glyphMap
> = {
  Home: 'home',
  Boxing: 'boxing-glove',
  Settings: 'account-box-outline',
};

export default function App() {
  const theme = {
    ...DefaultTheme,
    colors: customColors,
  };

  const Tab = createBottomTabNavigator();

  const auth = getAuth(app);

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  const onAuthStateChangedHandler = (user: any) => {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, onAuthStateChangedHandler);

    return unsubscribe;
  }, []);

  if (initializing) {
    return (
      <View>
        <Text>Chargement...</Text>
      </View>
    );
  }

  const NativeStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Boxing" component={BoxingScreen} />
        <Stack.Screen name="Timer" component={TimerScreen} />
        <Stack.Screen name="SettingTimer" component={SettingTimerScreen} />
      </Stack.Navigator>
    );
  };

  const UnauthenticatedStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    );
  };

  const MainTabStack = () => {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => {
              return (
                <MaterialCommunityIcons
                  name={tabBarIcons.Home}
                  color={color}
                  size={size}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="NativeStack"
          component={NativeStack}
          options={{
            tabBarIcon: ({ color, size }) => {
              return (
                <MaterialCommunityIcons
                  name={tabBarIcons.Boxing}
                  color={color}
                  size={size}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ color, size }) => {
              return (
                <MaterialCommunityIcons
                  name={tabBarIcons.Settings}
                  color={color}
                  size={size}
                />
              );
            },
          }}
        />
      </Tab.Navigator>
    );
  };

  return (
    <PaperProvider theme={theme}>
      <RootSiblingParent>
        <NavigationContainer>
          {user ? <MainTabStack /> : <UnauthenticatedStack />}
        </NavigationContainer>
      </RootSiblingParent>
    </PaperProvider>
  );
}
