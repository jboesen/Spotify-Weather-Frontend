import gql from "graphql-tag"

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(input: {email: $email, password: $password}) {
      user {
          id
          email
          password
          location
      }
      token
    }
  }
`