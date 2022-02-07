import React, { useState } from 'react';
import {
  ImageBackground,
  StyleSheet,
  TextInput,
  Pressable,
  Text,
  View,
  Image,
  Keyboard,
  Alert,
} from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import * as SMS from 'expo-sms';
import { OTP } from 'react-native-otp-form';

function OTPScreen({ route }) {
  const navigation = useNavigation();
  const [otp, setOtp] = useState('');
  const [ver, setVer] = useState('');

  const firstName = route.params.firstName;
  const lastName = route.params.lastName;
  const phoneNumber = route.params.phoneNumber;
  const idNumber = route.params.idNumber;
  //console.log(formData);
  const numbers = Math.floor(1000 + Math.random() * 9000);
  const getOtp = async () => {
    const isAvailable = SMS.isAvailableAsync();
    if (isAvailable) {
      console.log('You can send sms on this device.');
      SMS.sendSMSAsync([phoneNumber], 'Hello your OTP is ' + numbers, {});
      setVer(numbers);
    } else {
      console.log('You can not send sms on this device.');
    }
  };

  const onSubmit = async () => {
    console.log(ver);
    console.log(otp);
    if (ver == otp) {
      navigation.navigate('FaceRecognitionRegister', {
        Name: firstName,
        Surname: lastName,
        IdNumber: idNumber,
        Phone: phoneNumber,
      });
    } else {
      Alert.alert(
        'Make sure that the cellphone number you entered is correct!'
      );
    }
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
          <Text style={{ color: '#ffffff', alignSelf: 'center', fontSize: 16 }}>
            Verify Mobile Number
          </Text>
          <OTP
            codeCount={4}
            containerStyle={{ marginTop: 50 }}
            onTyping={setOtp}
            otpStyles={{ backgroundColor: '#eee' }}
          />
          <Text
            style={{
              color: '#717171',
              fontSize: 16,
              alignSelf: 'center',
              marginTop: 18,
            }}
            onPress={getOtp}
          >
            Get OTP
          </Text>
          <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
            <Button
              color="#ffffff"
              onPress={() => navigation.navigate('SignInScreen')}
              style={{
                width: 134,
                backgroundColor: '#135A8C',
                alignSelf: 'center',
                marginTop: 40,
                marginRight: 8,
                borderRadius: 22,
              }}
            >
              Change No
            </Button>
            <Button
              color="#135A8C"
              style={{
                width: 134,
                backgroundColor: '#ffffff',
                alignSelf: 'center',
                marginTop: 40,
                borderRadius: 22,
                borderColor: '#135A8C',
                borderWidth: 2,
                borderStyle: 'solid',
              }}
              onPress={onSubmit}
            >
              Verify
            </Button>
          </View>
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
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    width: 40,
    height: 45,
    borderWidth: 0,
    backgroundColor: '#90C8DD',
    color: '#151515',
  },

  underlineStyleHighLighted: {
    borderColor: '#040017',
  },
});

export default OTPScreen;
