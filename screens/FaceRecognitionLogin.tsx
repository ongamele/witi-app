import React, { useState, useEffect, useRef } from 'react';
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
import * as FileSystem from 'expo-file-system';
import * as FaceDetector from 'expo-face-detector';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { SIGN_IN } from '../Graphql/Mutation';
import { Snackbar } from 'react-native-paper';
import { LogBox } from 'react-native';
import { supabase } from '../supabase-service';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

export default function FaceRecognitionLogin() {
  const cam = useRef<Camera | null>();
  const [visible, setVisible] = React.useState(false);
  const [showCamera, setShowCamera] = React.useState(true);

  const onDismissSnackBar = () => setVisible(false);
  const [login, { data, error, loading }] = useMutation(SIGN_IN);
  const navigation = useNavigation();

  const [hasPermission, setHasPermission] = useState(null);
  const [faces, setFaces] = useState([]);

  async function faceDetected({ faces }) {
    setFaces(faces);
  }

  const _takePicture = async () => {
    if (cam.current) {
      const options = { quality: 0.5, base64: true, skipProcessing: true };
      let photo = await cam.current.takePictureAsync(options);
      const source = photo.uri;
      console.log(source);
      const fileName = source.replace(/^.*[\\\/]/, '');
      const ext = source.substring(source.lastIndexOf('.') + 1);
      var formData = new FormData();
      formData.append('file', {
        uri: source,
        name: fileName,
        type: `image/${ext}`,
      });

      setShowCamera(false);

      const { faceData, error: ete } = await supabase.storage
        .from('witi-bucket/logins')
        .upload(fileName, formData);
      if (error) {
        console.log(ete);
      } else {
        // console.log(data);
      }

      // console.log(fd);

      await login({
        variables: {
          faceImage: fileName,
        },
      });
    }
  };

  {
    data
      ? navigation.navigate('UserDetails', {
          Name: data.login.firstName,
          Surname: data.login.lastName,
          Phone: data.login.phoneNumber,
          IdNumber: data.login.idNumber,
          faceImage: data.login.faceImage,
        })
      : loading;
  }

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission !== true) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      {showCamera ? (
        <ImageBackground
          source={require('./images/bottom-section.jpg')}
          resizeMode="cover"
          style={styles.image}
        >
          <Camera
            style={styles.camera}
            type="front"
            ref={cam}
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
              <Image
                style={styles.frame}
                source={require('./images/frame.png')}
              />
            </View>
          </Camera>
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
                onPress={_takePicture}
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
      ) : (
        <ImageBackground
          source={require('./images/bottom-section.jpg')}
          resizeMode="cover"
          style={styles.image}
        >
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
              Trying to log you in...
            </Text>
          </View>
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
              WE ARE VERIFYING YOUR FACE
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
      )}
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
    marginTop: '35%',
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
    width: '100%',
    padding: 12,
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  bottomSection: {
    paddingTop: 12,
  },

  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});
