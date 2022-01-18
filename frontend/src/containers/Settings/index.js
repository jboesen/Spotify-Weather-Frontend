import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import { credentials } from '../../credentials'
import { requestAuthorization, onPageLoad } from '../../api-functions'

const Settings = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    // check token
    // spotify = credentials()
    useEffect(
        () => { setLoggedIn(onPageLoad) }
        , []);

    return (<div>
        {loggedIn ?
            <p>logged in</p>
            :
            <button onClick={requestAuthorization}>click to login to spotify</button>}
    </div>)
}


export default Settings