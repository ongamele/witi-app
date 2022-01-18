import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  ImageBackground,
  TextInput,
} from 'react-native';
import { gql, useMutation } from '@apollo/client';
import { Title, Checkbox, Button } from 'react-native-paper';
import { UPDATE_USER } from '../Graphql/Mutation';

import { useNavigation } from '@react-navigation/native';
import { Snackbar, Avatar } from 'react-native-paper';

const UserDetails = ({ route }) => {
  const [visible, setVisible] = React.useState(false);
  const [showCamera, setShowCamera] = React.useState(true);

  const onDismissSnackBar = () => setVisible(false);

  const [updateUser, { data, error, loading }] = useMutation(UPDATE_USER);
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState(route.params.Name);
  const [lastName, setLastName] = useState(route.params.Surname);
  const [phoneNumber, setPhoneNo] = useState(route.params.Phone);
  const [idNumber, setIdNumber] = useState(route.params.IdNumber);
  const [faceImage, setFaceImage] = useState(route.params.faceImage);

  async function onSubmit() {
    setVisible(true);
    await updateUser({
      variables: {
        idNumber: idNumber,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
      },
    });
  }

  return (
    <View style={{ padding: 20 }}>
      <ImageBackground
        style={styles.header}
        source={require('./images/sign-up-header.jpg')}
      >
        <Title style={styles.headerText}>My Details</Title>
      </ImageBackground>
      <View style={styles.form}>
        <Avatar.Image
          style={{ alignSelf: 'center', marginBottom: 20 }}
          size={50}
          source={{
            uri: `https://vlxkgewzbkitgpipqpst.supabase.in/storage/v1/object/public/witi-bucket/users/${faceImage}`,
          }}
        />
        <Text style={styles.formText}>FIRST NAME</Text>
        <TextInput
          style={styles.formInput}
          placeholder="First Name"
          value={firstName}
          editable
          onChangeText={(text) => setFirstName(text)}
        />
        <Text style={styles.formText}>LAST NAME</Text>
        <TextInput
          style={styles.formInput}
          placeholder="Last Name"
          value={lastName}
          editable
          onChangeText={(text) => setLastName(text)}
        />
        <Text style={styles.formText}>ID NUMBER</Text>
        <TextInput
          style={styles.formInput}
          placeholder="ID Number"
          value={idNumber}
          editable
          onChangeText={(text) => setIdNumber(text)}
        />
        <Text style={styles.formText}>PHONE</Text>
        <TextInput
          style={styles.formInput}
          placeholder="Phone Number"
          value={phoneNumber}
          editable
          onChangeText={(text) => setPhoneNo(text)}
        />

        <Button
          color="#ffffff"
          style={{
            width: 200,
            backgroundColor: '#0F0F34',
            alignSelf: 'center',
            marginTop: 30,
            borderRadius: 22,
          }}
          onPress={onSubmit}
        >
          Save
        </Button>
      </View>

      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        duration={4000}
        action={{
          label: 'Ok',
          onPress: () => {},
        }}
        style={{ alignSelf: 'center', marginLeft: '8%' }}
      >
        Done!
      </Snackbar>
      <Text
        style={{
          color: '#0F0F34',
          fontSize: 16,
          alignSelf: 'center',
        }}
        onPress={() => {
          navigation.navigate('SignInScreen', { message: '' });
        }}
      >
        Logut
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 120,
    width: '120%',
    resizeMode: 'cover',
    alignSelf: 'center',
    marginTop: -20,
  },
  headerText: {
    color: '#ffffff',
    fontSize: 18,
    alignSelf: 'center',
    marginTop: 70,
  },
  form: {
    marginTop: 34,
    padding: 30,
  },
  formText: {
    marginTop: 12,
    color: '#A5C0E5',
    fontSize: 12,
  },
  formInput: {
    height: 40,
    backgroundColor: '#fff',
    borderColor: '#A5C0E5',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 4,
    paddingLeft: 8,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Checkbox: {},
});

export default UserDetails;
