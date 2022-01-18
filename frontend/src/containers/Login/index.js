import React, { useState } from 'react'
import { useMutation, useQuery } from "@apollo/react-hooks"
import { useHistory } from 'react-router-dom'
import { LOGIN } from './graphql'

const Login = () => {
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    const [login, { loading, error } ] = useMutation(LOGIN, {
        variables: {
            email,
            password: pass
        },
        onCompleted: ({ login: { token }}) => {
            localStorage.setItem('token', token);
            // redirect to homepage
            history.push('/home');
        },
    });

    return (
        <div>
            <h2>Log in</h2>
            <p>Email</p>
            <input name='email' type='text' value={email} onChange={(e) => setEmail(e.target.value)}></input>
            <p>Password</p>
            <input name='password' type='password' value={pass} onChange={(e) => setPass(e.target.value)}></input>
            <button onClick={() => login()}>Login</button>
        </div>

    );
}

export default Login
