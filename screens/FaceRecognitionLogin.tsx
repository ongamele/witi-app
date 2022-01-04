import React, { useState, useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Alert,
  Image,
} from 'react-native';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { SIGN_IN } from '../Graphql/Mutation';
import { Snackbar } from 'react-native-paper';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

export default function FaceRecognitionLogin() {
  const [refreshPage, setRefreshPage] = useState('');
  const [visible, setVisible] = React.useState(false);

  const onDismissSnackBar = () => setVisible(false);
  const [login, { data, error, loading }] = useMutation(SIGN_IN);
  const navigation = useNavigation();

  const [hasPermission, setHasPermission] = useState(null);
  const [faces, setFaces] = useState([]);
  async function faceDetected({ faces }) {
    setFaces(faces); // instead of setFaces({faces})
    console.log({ faces });

    if (faces[0].leftEyePosition.x && faces[0].leftEyePosition.y) {
      await login({
        variables: {
          leftEyePositionX: faces[0].leftEyePosition.x,
          leftEyePositionY: faces[0].leftEyePosition.y,
        },
      });

      if (data) {
        navigation.navigate('UserDetails', {
          Name: data.login.firstName,
          Surname: data.login.lastName,
          Phone: data.login.phoneNumber,
          IdNumber: data.login.idNumber,
        });
      }
    } else {
      Alert.alert('Align your into the frame.');
    }
  }

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission !== true) {
    return <Text>No access to camera</Text>;
  }

  /*async function onSubmit() {
    if (faces[0].leftEyePosition.x && faces[0].leftEyePosition.y) {
      await login({
        variables: {
          leftEyePositionX: faces[0].leftEyePosition.x,
          leftEyePositionY: faces[0].leftEyePosition.y,
        },
      });

      if (data) {
        navigation.navigate('UserDetails', {
          Name: data.login.firstName,
          Surname: data.login.lastName,
          Phone: data.login.phoneNumber,
          IdNumber: data.login.idNumber,
        });
      } else {
        setVisible(true);
        //navigation.navigate('SignUpScreen');
      }
    } else {
      Alert.alert('Align your into the frame.');
    }

    if (!data) {
      setVisible(true);
    }
  }*/

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
          minDetectionInterval: 300,
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
          {faces[0] ? (
            <Image
              style={styles.pricessing}
              source={require('./images/processing.gif')}
            />
          ) : (
            <Text style={{ alignSelf: 'center' }}>No Face Detected</Text>
          )}
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
              fontStyle: 'italic',
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
            >
              Sign In
            </Button>
          </View>
        </View>

        <Snackbar
          visible={visible}
          onDismiss={onDismissSnackBar}
          duration={4000}
          action={{
            label: 'Ok',
            onPress: () => {
              setRefreshPage('refresh');
            },
          }}
        >
          Not detected. Please try again!
        </Snackbar>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  camera: {
    height: 550,
  },
  frame: {
    alignSelf: 'center',
    width: 200,
    height: 250,
    marginTop: 200,
  },

  pricessing: {
    width: 30,
    height: 30,
    zIndex: 10,
    alignSelf: 'center',
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
    paddingTop: 12,
    height: '100%',
  },

  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});
