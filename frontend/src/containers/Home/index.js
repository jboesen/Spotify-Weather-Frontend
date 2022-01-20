import React, { useState } from 'react'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { requestAuth, handleRender } from '../../api-auth'
import recommendations from './recommendations'
import ListView from '../ListView'

// album cover art url, track title, artist name

const Home = () => {
    const history = useHistory()
    const token = localStorage.getItem('token');
    // how to see if auth'd olr:
    // check if logged in in session --> consult makeratplay for this
    // if not logged in, check for code --> getCode
    // else, prompt login --> requestAuth
    const [loggedIn, setLoggedIn] = useState()
    useEffect(handleRender, [])
    // if (!token) {
    //     history.push('/');
    // }
    const recs = recommendations.tracks

    return (
        <>
        <ListView recs={recs}></ListView>
        <div>
            <p>Congrats, you are logged in!</p>
            <button onClick={requestAuth}>Login into Spotify</button>
        </div>
        </>
    )
}

export default Home
