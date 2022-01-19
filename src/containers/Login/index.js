import React from 'react'
import { Background, StyledInput, StyledLink } from './styles'
import { Container } from '../Welcome/styles'

const Login = () => {
    return (
        <Background>
            <Container>
                <StyledInput placeholder='Enter your email' type='email'></StyledInput>
                <StyledInput placeholder='Enter your password' type='password'></StyledInput>
                <StyledLink>Log in</StyledLink>
            </Container>
        </Background>
    )
}

export default Login
