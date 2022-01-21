import React, { useState } from 'react'
import { useMutation } from "@apollo/react-hooks"
import { Background, StyledInput, StyledButton } from './styles'
import { Container } from '../Welcome/styles'
import { REGISTER } from './graphql'

const Register = (props) => {
    const token = localStorage.getItem('token');
    if (token) {
        props.history.push("/home");    
    }
    
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [location, setLocation] = useState('')

    const [register, { loading, error }] = useMutation(REGISTER, {
        variables: {
            email,
            password,
            confirmPassword,
            username,
            location
        },
        onCompleted: ({ register: { token } }) => {
            localStorage.setItem('token', token);
            props.history.push("/home");
        },
        onError: error => console.log(error)
    });
    return (
        <Background>
            <Container>
                <StyledInput placeholder='Enter your email' type='email' value={email} onChange={e => setEmail(e.target.value)}></StyledInput>
                <StyledInput placeholder='Enter your username' type='text' value={username} onChange={e => setUsername(e.target.value)}></StyledInput>
                <StyledInput placeholder='Enter your password' type='password' value={password} onChange={e => setPassword(e.target.value)}></StyledInput>
                <StyledInput placeholder='Confirm your password' type='password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}></StyledInput>
                <StyledInput placeholder='Enter your location' type='text' value={location} onChange={e => setLocation(e.target.value)}></StyledInput>
                <StyledButton onClick={() => register()}>Create an account</StyledButton>
            </Container>
        </Background>
    );
}

export default Register
