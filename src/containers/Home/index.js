import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import { credentials } from '../../credentials'
import { requestAuthorization, onPageLoad } from '../../api-functions'

const Home = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    // check token
    // spotify = credentials()
    useEffect({
        onPageLoad
    }, [])
    return (<button onClick={requestAuthorization}> Click to add spotify</ button>)
}

export default Settings