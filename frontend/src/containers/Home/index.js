import React from 'react'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { requestAuth, handleRender } from '../../api-handlers'

const Home = () => {
    const history = useHistory()
    const token = localStorage.getItem('token');
    // how to see if auth'd olr:
    // check if logged in in session --> consult makeratplay for this
    // if not logged in, check for code --> getCode
    // else, prompt login --> requestAuth
    useEffect(handleRender, [])
    // if (!token) {
    //     history.push('/');
    // }

    return (
        <div>
            <p>Congrats, you are logged in!</p>
            <button onClick={requestAuth}>Login into Spotify</button>
        </div>
    )
}

export default Home
