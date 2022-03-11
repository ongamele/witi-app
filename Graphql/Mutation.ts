import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation createUser(
    $firstName: String!
    $lastName: String!
    $idNumber: String!
    $phoneNumber: String!
    $faceFileName: String!
    $idFileName: String!
  ) {
    createUser(
      registerInput: {
        firstName: $firstName
        lastName: $lastName
        idNumber: $idNumber
        phoneNumber: $phoneNumber
        faceFileName: $faceFileName
        idFileName: $idFileName
      }
    ) {
      firstName
      lastName
      idNumber
      phoneNumber
      faceFileName
      idFileName
    }
  }
`;

export const SIGN_IN = gql`
  mutation login($faceImage: String!) {
    login(faceImage: $faceImage) {
      firstName
      lastName
      idNumber
      phoneNumber
      faceImage
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser(
    $idNumber: String!
    $firstName: String!
    $lastName: String!
    $phoneNumber: String!
  ) {
    updateUser(
      updateInput: {
        idNumber: $idNumber
        firstName: $firstName
        lastName: $lastName
        phoneNumber: $phoneNumber
      }
    ) {
      idNumber
      firstName
      lastName
      phoneNumber
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      message
    }
  }
`;
