import gql from 'graphql-tag'

export const UPDATE = gql`
    mutation updateAccountDetails($oldUsername: String!, $username: String!, $oldPassword: String!, $password: String!){
        updateAccountDetails(input: {oldUsername: $oldUsername, username: $username, oldPassword: $oldPassword, password: $password })
    }
` 
