import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation createUser(
    $firstName: String!
    $lastName: String!
    $idNumber: String!
    $phoneNumber: String!
    $leftEyePositionX: Float!
    $leftEyePositionY: Float!
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
        leftEyePositionX: $leftEyePositionX
        leftEyePositionY: $leftEyePositionY
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
      leftEyePositionX
      leftEyePositionY
      boundsX
      boundsY
      faceHeight
      faceWidth
    }
  }
`;

export const SIGN_IN = gql`
  mutation login($leftEyePositionX: Float!, $leftEyePositionY: Float!) {
    login(
      leftEyePositionX: $leftEyePositionX
      leftEyePositionY: $leftEyePositionY
    ) {
      firstName
      lastName
      idNumber
      phoneNumber
      leftEyePositionX
      leftEyePositionY
      boundsX
      boundsY
      faceHeight
      faceWidth
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
