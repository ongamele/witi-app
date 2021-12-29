import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation createUser(
    $firstName: String!
    $lastName: String!
    $idNumber: String!
    $phoneNumber: String!
    $bottomMouthPositionX: Float!
    $bottomMouthPositionY: Float!
    $boundsX: Float!
    $boundsY: Float!
    $faceHeight: Float!
    $faceWidth: Float!
  ) {
    createUser(
      registerInput: {
        firstName: $firstName
        lastName: $lastName
        idNumber: $idNumber
        phoneNumber: $phoneNumber
        bottomMouthPositionX: $bottomMouthPositionX
        bottomMouthPositionY: $bottomMouthPositionY
        boundsX: $boundsX
        boundsY: $boundsY
        faceHeight: $faceHeight
        faceWidth: $faceWidth
      }
    ) {
      firstName
      lastName
      idNumber
      phoneNumber
      bottomMouthPositionX
      bottomMouthPositionY
      boundsX
      boundsY
      faceHeight
      faceWidth
    }
  }
`;

export const SIGN_UP = gql`
  mutation login($faceHeight: Float!, $faceWidth: Float!) {
    login(faceHeight: $faceHeight, faceWidth: $faceWidth) {
      firstName
      lastName
      idNumber
      phoneNumber
      bottomMouthPositionX
      bottomMouthPositionY
      boundsX
      boundsY
      faceHeight
      faceWidth
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser(
    $firstName: String!
    $lastName: String!
    $phoneNumber: String!
    $idNumber: String!
  ) {
    updateUser(
      firstName: $firstName
      lastName: $lastName
      phoneNumber: $phoneNumber
      idNumber: $idNumber
    ) {
      firstName
      lastName
      phoneNumber
      idNumber
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
