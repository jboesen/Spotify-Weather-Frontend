import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import { credentials } from '../../credentials'
import { requestAuthorization } from '../../api-functions'

const Settings = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    // check token
    // spotify = credentials()
    useEffect({
        // check for token (backend or frontend)
        // if no token, display login button 
        // if token, display "logged in as"
    }, [])
    return (<button onClick={requestAuthorization}> Click to add spotify</ button>)
}

export default Settings