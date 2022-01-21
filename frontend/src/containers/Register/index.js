import React, { useState } from 'react'
import { useMutation, useQuery } from "@apollo/react-hooks"
import { useHistory } from 'react-router-dom'
import { Background, StyledInput, StyledLink } from './styles'
import { Container } from '../Welcome/styles'
import { LOGIN } from './graphql'

const Register = () => {
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    const [login, { loading, error }] = useMutation(LOGIN, {
        variables: {
            email,
            password: pass
        },
        onCompleted: ({ login: { token } }) => {
            localStorage.setItem('token', token);
            // redirect to homepage
            history.push('/home');
        },
    });
    return (
        <Background>
            <Container>
                <StyledInput placeholder='Enter your email' type='email'></StyledInput>
                <StyledInput placeholder='Enter your username' type='text'></StyledInput>
                <StyledInput placeholder='Enter your password' type='password'></StyledInput>
                <StyledInput placeholder='Confirm your password' type='password'></StyledInput>
                <StyledLink to='/home'>Create an account</StyledLink>
            </Container>
        </Background>
    );
}

export default Register
