import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, ImageBackground, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function FaceRecognitionRegister({ route }) {
  const cam = useRef<Camera | null>();
  const navigation = useNavigation();

  const [hasPermission, setHasPermission] = useState(null);
  const [faces, setFaces] = useState([]);

  const faceDetected = ({ faces }) => {
    setFaces(faces); // instead of setFaces({faces})
    //console.log({ faces });
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission !== true) {
    return <Text>No access to camera</Text>;
  }

  const firstName = route.params.Name;
  const lastName = route.params.Surname;
  const phoneNumber = route.params.Phone;
  const idNumber = route.params.IdNumber;

  const onSubmit = async () => {
    if (cam.current) {
      const options = { quality: 0.5, base64: true, skipProcessing: true };
      let photo = await cam.current.takePictureAsync(options);
      const source = photo.uri;
      //console.log(source);
      const fileName = source.replace(/^.*[\\\/]/, '');
      const ext = source.substring(source.lastIndexOf('.') + 1);
      var formData = new FormData();
      formData.append('file', {
        uri: source,
        name: fileName,
        type: `image/${ext}`,
      });

      /*const response = await fetch(source);
      const blob = await response.blob();
      //console.log(blob);
      const { data, error } = await supabase.storage
        .from('witi-bucket')
        .upload(fileName, formData);
      if (error) {
        console.log(error);
      } else {
        // console.log(data);
      }*/

      //return { ...photo, imageData: data };

      navigation.navigate('FinishRegistration', {
        Name: firstName,
        Surname: lastName,
        IdNumber: idNumber,
        Phone: phoneNumber,
        fileName: fileName,
        formData: formData,
        faceImage: fileName,
      });
    }
  };

  return (
    <View style={{ flex: 1 }}>
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
            minDetectionInterval: 125,
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
  },
  frame: {
    alignSelf: 'center',
    width: 200,
    height: 250,
    marginTop: '35%',
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
