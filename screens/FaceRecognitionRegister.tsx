import React, { useState, useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Text, View, StyleSheet, ImageBackground } from 'react-native';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { CREATE_USER } from '../Graphql/Mutation';

export default function FaceRecognitionRegister({ route }) {
  const [createUser, { data, error, loading }] = useMutation(CREATE_USER);
  const navigation = useNavigation();

  const [hasPermission, setHasPermission] = useState(null);
  const [faces, setFaces] = useState([]);

  if (data) {
    navigation.navigate('Home');
  }

  const faceDetected = ({ faces }) => {
    setFaces(faces); // instead of setFaces({faces})
    console.log({ faces });
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission !== true) {
    return <Text>No access to camera</Text>;
  }

  const firstName = route.params.firstName;
  const lastName = route.params.lastName;
  const phoneNumber = route.params.phoneNumber;
  const idNumber = route.params.idNumber;

  const onSubmit = () => {
    createUser({
      variables: {
        firstName: firstName,
        lastName: lastName,
        idNumber: idNumber,
        phoneNumber: phoneNumber,
        bottomMouthPositionX: faces[0].bottomMouthPosition.x,
        bottomMouthPositionY: faces[0].bottomMouthPosition.y,
        boundsX: faces[0].bounds.origin.x,
        boundsY: faces[0].bounds.origin.y,
        faceHeight: faces[0].bounds.size.height,
        faceWidth: faces[0].bounds.size.width,
      },
    });

    navigation.navigate('UserDetails', {
      Name: firstName,
      Surname: lastName,
      IdNumber: idNumber,
      Phone: phoneNumber,
    });
  };

  if (error) {
    alert(error);
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={styles.camera}
        type="front"
        onFacesDetected={faceDetected}
        faceDetectorSettings={{
          mode: FaceDetector.FaceDetectorMode.fast,
          detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
          runClassifications: FaceDetector.FaceDetectorClassifications.all,
          minDetectionInterval: 125,
          tracking: false,
        }}
      >
        <View style={styles.insideCamera}></View>
      </Camera>
      <ImageBackground
        source={require('./images/bottom-section.jpg')}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.bottomSection}>
          <Text
            style={{
              fontSize: 20,
              color: '#2E3361',
              alignSelf: 'center',
              fontWeight: 'bold',
              marginTop: 40,
            }}
          >
            FIT YOUR FACE IN THE FRAME
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: 'grey',
              alignSelf: 'center',
              fontWeight: 'bold',
              marginTop: 20,
            }}
          >
            Your chin should be aligned to the bottom border of the frame.
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
              Cancel
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
              Register
            </Button>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  camera: {
    height: 550,
    borderColor: '#B4CFEC',
    borderWidth: 6,
    borderStyle: 'solid',
  },
  face: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  insideCamera: {
    height: 330,
    width: '58%',
    alignSelf: 'center',
    borderColor: '#B4CFEC',
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 1,
    marginTop: 140,
  },
  bottomSection: {
    height: '100%',
  },

  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});
