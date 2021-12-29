import { gql } from '@apollo/client';

export const GET_ALL_USERS = gql`
  query getAllUsers {
    getAllUsers {
      id
      name
      username
    }
  }
`;

export const GET_USER = gql`
  query ($conversationId: String!) {
    getUser(faceWidth: $faceWidth) {
      id
      firstName
      lastName
      phoneNumber
      idNumber
    }
  }
`;
