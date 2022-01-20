import React, { useState } from 'react'
import { useMutation, useQuery } from "@apollo/react-hooks"
import { useHistory } from 'react-router-dom'
import { Background, StyledInput, StyledLink } from './styles'
import { Container } from '../Welcome/styles'
import { LOGIN } from './graphql'

const Login = () => {
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
                <StyledInput placeholder='Enter your password' type='password'></StyledInput>
                <StyledLink to='/home'>Log in</StyledLink>
            </Container>
        </Background>
    );
}

export default Login
