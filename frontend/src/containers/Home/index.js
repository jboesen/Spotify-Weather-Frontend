import React from 'react'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { requestAuth, refresh } from '../../api-handlers'

const Home = () => {
    const history = useHistory()
    const token = localStorage.getItem('token');
    // how to see if auth'd olr
    useEffect(refresh(), [])
    if (!token) {
        history.push('/');
    }

    return (
        <div>
            <p>Congrats, you are logged in!</p>
            <button onClick={requestAuth()}>Login into Spotify</button>
        </div>
    )
}

export default Home
