import gql from 'graphql-tag'

export const REGISTER = gql`
    mutation register($email: String!, $password: String!, $confirmPassword: String!, $username: String!, $location: String!){
        register(input: {email: $email, password: $password, confirmPassword: $confirmPassword, username: $username, location: $location}){
            user{
                id
                email
                password
                location
            }
            token
        }
    }
` 
