import React, { useState, useEffect } from 'react';
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

  setTimeout(function () {
    navigation.navigate('SignInScreen');
  }, 5000);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./images/splash.png')}
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
