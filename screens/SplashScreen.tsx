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
import { useNavigation } from '@react-navigation/native';

function SplashScreen() {
  const navigation = useNavigation();
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const delayFunc = async () => {
    await delay(5000);

    navigation.navigate('SignIn');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./images/splash.jpg')}
        resizeMode="cover"
        style={styles.image}
      ></ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});

export default SplashScreen;
