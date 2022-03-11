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
import FaceRecognitionRegister from '../screens/FaceRecognitionRegister';
import OTPScreen from '../screens/OTPScreen';
import FinishRegistration from '../screens/FinishRegistration';
import FaceRecorgnitionLogin from '../screens/FaceRecognitionLogin';
import IdRecognition from '../screens/IdRecognition';
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
        name="SplashScreen"
        component={SplashScreen}
        options={{ title: 'Hello' }}
      />

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
        name="OTPScreen"
        component={OTPScreen}
        options={{ title: 'OTP' }}
      />

      <Stack.Screen
        name="FaceRecognitionRegister"
        component={FaceRecognitionRegister}
        options={{ title: 'Register' }}
      />

      <Stack.Screen
        name="IdRecognition"
        component={IdRecognition}
        options={{ title: 'ID Photo' }}
      />

      <Stack.Screen
        name="FinishRegistration"
        component={FinishRegistration}
        options={{ title: 'FInish' }}
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
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
    </Stack.Navigator>
  );
}
