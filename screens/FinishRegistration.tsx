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
import { supabase } from '../supabase-service';

function FinishRegistration({ route }) {
  const [createUser, { data: verifiedData, error, loading }] =
    useMutation(CREATE_USER);
  const [showFinish, setShowFinish] = React.useState(true);
  const navigation = useNavigation();

  const firstName = route.params.Name;
  const lastName = route.params.Surname;
  const phoneNumber = route.params.Phone;
  const idNumber = route.params.IdNumber;
  const faceFileName = route.params.faceFileName;
  const faceFormData = route.params.faceFormData;
  const idFormData = route.params.idFormData;
  const idFileName = route.params.idFileName;

  const onSubmit = async () => {
    setShowFinish(false);
    const { data, error } = await supabase.storage
      .from('witi-bucket/users')
      .upload(faceFileName, faceFormData);
    if (error) {
      console.log(error);
    } else {
      // console.log(data);
    }

    await supabase.storage
      .from('witi-bucket/ids')
      .upload(idFileName, idFormData);

    createUser({
      variables: {
        firstName: firstName,
        lastName: lastName,
        idNumber: idNumber,
        phoneNumber: phoneNumber,
        faceFileName: faceFileName,
        idFileName: idFileName,
      },
    });

    if (
      !firstName ||
      !lastName ||
      !idNumber ||
      !phoneNumber ||
      !faceFileName ||
      !idFileName
    ) {
      alert('SOME DATA IS MISSING');
    }

    //return { ...photo, imageData: data };
  };

  {
    verifiedData
      ? navigation.navigate('UserDetails', {
          Name: firstName,
          Surname: lastName,
          IdNumber: idNumber,
          Phone: phoneNumber,
          faceFileName: faceFileName,
        })
      : loading;
  }

  return (
    <View style={styles.container}>
      {showFinish ? (
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
      ) : (
        <ImageBackground
          source={require('./images/background.jpg')}
          resizeMode="cover"
          style={styles.image}
        >
          <Image style={styles.logo} source={require('./images/logo.png')} />
          <View style={{ marginBottom: 100 }}>
            <View style={styles.bottomSection}>
              <Image
                style={styles.pricessing}
                source={require('./images/processing.gif')}
              />
              <Text
                style={{
                  fontSize: 14,
                  color: '#2E3361',
                  alignSelf: 'center',
                  marginTop: 14,
                }}
              >
                Finishing your registration...
              </Text>
            </View>
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
      )}
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
  bottomSection: {
    paddingTop: 12,
  },
  pricessing: {
    width: 30,
    height: 30,
    zIndex: 10,
    alignSelf: 'center',
  },
});

export default FinishRegistration;
