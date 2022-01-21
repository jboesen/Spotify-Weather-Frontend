import React, { useState } from 'react'
import { useMutation} from "@apollo/react-hooks"
import { useHistory } from 'react-router-dom'
import { Background, StyledButton, StyledInput} from './styles'
import { Container } from '../Welcome/styles'
import { LOGIN } from './graphql'

const Login = (props) => {
    const token = localStorage.getItem('token');
    if (token) {
        props.history.push("/home");    
    }
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [login, { loading, error }] = useMutation(LOGIN, {
        variables: {
            email,
            password
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
                <StyledInput placeholder='Enter your email' type='email' value={email} onChange={(e) => setEmail(e.target.value)}></StyledInput>
                <StyledInput placeholder='Enter your password' type='password' value={password} onChange={(e) => setPassword(e.target.value)}></StyledInput>
                <StyledButton onClick={() => login()}>Log in</StyledButton>
            </Container>
        </Background>
    );
}

export default Login
