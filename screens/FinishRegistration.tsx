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
import { gql, useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { CREATE_USER } from '../Graphql/Mutation';

function FinishRegistration({ route }) {
  const [createUser, { data, error, loading }] = useMutation(CREATE_USER);
  const navigation = useNavigation();

  const firstName = route.params.Name;
  const lastName = route.params.Surname;
  const phoneNumber = route.params.Phone;
  const idNumber = route.params.IdNumber;
  const leftEyePositionX = route.params.leftEyePositionX;
  const constleftEyePositionY = route.params.leftEyePositionY;
  const boundsX = route.params.boundsX;
  const boundsY = route.params.boundsY;
  const faceHeight = route.params.faceHeight;
  const faceWidth = route.params.faceWidth;

  const onSubmit = () => {
    createUser({
      variables: {
        firstName: firstName,
        lastName: lastName,
        idNumber: idNumber,
        phoneNumber: phoneNumber,
        leftEyePositionX: leftEyePositionX,
        leftEyePositionY: constleftEyePositionY,
        boundsX: boundsX,
        boundsY: boundsY,
        faceHeight: faceHeight,
        faceWidth: faceWidth,
      },
    });

    navigation.navigate('UserDetails', {
      Name: firstName,
      Surname: lastName,
      IdNumber: idNumber,
      Phone: phoneNumber,
    });
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
            color="#ffffff"
            onPress={onSubmit}
            style={{
              width: 260,
              height: 50,
              backgroundColor: '#0F0F34',
              alignSelf: 'center',
              borderRadius: 30,
              paddingTop: 6,
            }}
          >
            Finish
          </Button>
          <Text
            style={{
              color: '#0F0F34',
              fontSize: 16,
              alignSelf: 'center',
              marginTop: 13,
            }}
            onPress={() => {
              navigation.navigate('SignInScreen');
            }}
          >
            Cancel Registration
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

export default FinishRegistration;
