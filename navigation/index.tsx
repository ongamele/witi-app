import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import SplashScreen from '../screens/SplashScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import FaceRecorgnitionRegister from '../screens/FaceRecognitionRegister';
import FaceRecorgnitionLogin from '../screens/FaceRecognitionLogin';
import FaceRecorgnition from '../screens/FaceRecognition';
import UserDetails from '../screens/UserDetails';
import { RootStackParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="SignInScreen"
        component={SignInScreen}
        options={{ title: 'Sign In' }}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{ title: 'Sign Up' }}
      />
      <Stack.Screen
        name="FaceRecorgnitionRegister"
        component={FaceRecorgnitionRegister}
        options={{ title: 'Register' }}
      />

      <Stack.Screen
        name="FaceRecorgnitionLogin"
        component={FaceRecorgnitionLogin}
        options={{ title: 'Sign In' }}
      />

      <Stack.Screen
        name="UserDetails"
        component={UserDetails}
        options={{ title: 'UserDetails' }}
      />

      <Stack.Screen
        name="FaceRecorgnition"
        component={FaceRecorgnition}
        options={{ title: 'Face Recorgnition' }}
      />

      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ title: 'Hello' }}
      />

      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
    </Stack.Navigator>
  );
}
