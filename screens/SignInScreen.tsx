import React, { useState } from 'react';
import {
  ImageBackground,
  StyleSheet,
  TextInput,
  Pressable,
  Text,
  View,
  Image,
} from 'react-native';
import { Button } from 'react-native-paper';
import { RootTabScreenProps } from '../types';
import { useNavigation } from '@react-navigation/native';
import FaceRecognitionLogin from './FaceRecognitionLogin';

function SignInScreen() {
  const navigation = useNavigation();

  const onSubmit = () => {
    //Sign user in
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./images/background.jpg')}
        resizeMode="cover"
        style={styles.image}
      >
        <Image style={styles.logo} source={require('./images/logo.png')} />
        <View style={{ marginBottom: 100 }}>
          <Button
            icon="login"
            color="#ffffff"
            onPress={() => {
              navigation.navigate('SignUpScreen', { message: '' });
            }}
            style={{
              width: 260,
              height: 50,
              backgroundColor: '#0F0F34',
              alignSelf: 'center',
              borderRadius: 30,
              paddingTop: 6,
            }}
          >
            Verify
          </Button>
          <Text
            style={{
              color: '#0F0F34',
              fontSize: 16,
              alignSelf: 'center',
              marginTop: 13,
            }}
          >
            Identity Verification
          </Text>
        </View>
        <Image style={styles.curve} source={require('./images/curves.png')} />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000a0',
  },
  logo: {
    flex: 1,
    resizeMode: 'contain',
    width: 200,
    alignSelf: 'center',
  },
  curve: {
    flex: 1,
    resizeMode: 'contain',
    width: '100%',
    alignSelf: 'center',
    marginBottom: -120,
  },
});

export default SignInScreen;
