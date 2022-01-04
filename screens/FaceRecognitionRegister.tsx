import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ImageBackground, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function FaceRecognitionRegister({ route }) {
  const navigation = useNavigation();

  const [hasPermission, setHasPermission] = useState(null);
  const [faces, setFaces] = useState([]);

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
    navigation.navigate('FinishRegistration', {
      Name: firstName,
      Surname: lastName,
      IdNumber: idNumber,
      Phone: phoneNumber,
      leftEyePositionX: faces[0].leftEyePosition.x,
      leftEyePositionY: faces[0].leftEyePosition.y,
      boundsX: faces[0].bounds.origin.x,
      boundsY: faces[0].bounds.origin.y,
      faceHeight: faces[0].bounds.size.height,
      faceWidth: faces[0].bounds.size.width,
    });
  };

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
          tracking: true,
        }}
      >
        <View style={styles.insideCamera}>
          <Image style={styles.frame} source={require('./images/frame.png')} />
        </View>
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
            Please align your eyes in the frame frame.
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
              Next
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
  frame: {
    alignSelf: 'center',
    width: 200,
    height: 250,
    marginTop: 200,
  },
  face: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  insideCamera: {
    height: 406,
    width: 300,
    padding: 12,
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
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
