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
import { useMutation } from '@apollo/client';
import { Title, Checkbox, Button } from 'react-native-paper';
import { UPDATE_USER } from '../Graphql/Mutation';

import { useNavigation } from '@react-navigation/native';

const UserDetails = ({ route }) => {
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNo] = useState('');
  const [idNumber, setIdNumber] = useState('');

  const faceWidth = route.params.faceWidth;

  const [updateUser, { data, error, loading }] = useMutation(UPDATE_USER, {
    variables: {
      firstName,
      lastName,
      idNumber,
      phoneNumber,
    },
  });
  {
    data ? console.log(data.updateUser) : console.log('No data');
  }

  const onSubmit = () => {
    updateUser({
      variables: {
        firstName: firstName,
        lastName: lastName,
        idNumber: idNumber,
        phoneNumber: phoneNumber,
      },
    });
  };

  return (
    <View style={{ padding: 20 }}>
      <ImageBackground
        style={styles.header}
        source={require('./images/sign-up-header.jpg')}
      >
        <Title style={styles.headerText}>My Details</Title>
      </ImageBackground>
      <View style={styles.form}>
        <Text style={styles.formText}>FIRST NAME</Text>
        <TextInput
          style={styles.formInput}
          placeholder="First Name"
          value={route.params.Name}
          onChangeText={(text) => setFirstName(text)}
        />
        <Text style={styles.formText}>LAST NAME</Text>
        <TextInput
          style={styles.formInput}
          placeholder="Last Name"
          value={route.params.Surname}
          onChangeText={(text) => setLastName(text)}
        />
        <Text style={styles.formText}>ID NUMBER</Text>
        <TextInput
          style={styles.formInput}
          placeholder="ID Number"
          value={route.params.IdNumber}
          onChangeText={(text) => setIdNumber(text)}
        />
        <Text style={styles.formText}>PHONE</Text>
        <TextInput
          style={styles.formInput}
          placeholder="Phone Number"
          value={route.params.Phone}
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
        >
          Save
        </Button>
      </View>
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
    marginTop: 16,
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
