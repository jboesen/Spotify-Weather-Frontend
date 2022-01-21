import React, { useState, useEffect } from 'react'
import { useMutation } from "@apollo/react-hooks"
// import axios from 'axios'
// import { credentials } from '../../credentials'
// import { requestAuthorization, onPageLoad } from '../../api-functions'
import { Background, Container } from '../Welcome/styles'
import { StyledButton, PrettyText } from '../Home/styles'
import { StyledInput } from '../Register/styles'
import { UPDATE } from './graphql'
const jwt = require('jsonwebtoken')

const Settings = (props) => {
    const decodeToken = token => {
        if (!token) {
            props.history.push("/")
        }
        try {
            return jwt.verify(token, 'reughdjsasdkpmasipkmsdfadf')
        } catch(err) {
            props.history.push("/");
        }
    }

    const token = localStorage.getItem('token');
    decodeToken(token)

    const CLIENT_ID = "4aa2e2d16efe46e198d444f232e96695"
    const CLIENT_SECRET = "42147b97f5254fc1b06949d1cc3f0694"
    const REDIRECT_URI = "http://localhost:3000"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "code"

    const TOKEN = "https://accounts.spotify.com/api/token"

    // const history = useHistory()

    // const [loggedIn, setLoggedIn] = useState(false)
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"))
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refreshToken"))
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [oldUsername, setOldUsername] = useState('')
    const [oldPassword, setOldPassword] = useState('')

    const [updateAccountDetails, { loading, error }] = useMutation(UPDATE, {
        variables: {
            oldUsername,
            username,
            oldPassword,
            password
        },
        onCompleted: () => {
            props.history.push("/home");
        },
        onError: error => console.log(error)
    });

    const requestAuthorization = () => {
        let url = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`
        window.location = url
    }

    useEffect(() => {
        const login = async () => {
            const search = window.location.search

            if (!accessToken && search) {
                let code = new URLSearchParams(search).get('code')

                const data = await fetchAccessToken(code)

                let newAccess = data.access_token
                let newRefresh = data.refresh_token

                if (newAccess) {
                    localStorage.setItem("accessToken", newAccess)
                }

                if (newRefresh) {
                    localStorage.setItem("refreshToken", newRefresh)
                }
            }
        };

        login()

        // window.history.pushState("", "", REDIRECT_URI)
    }, [])

    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            setAccessToken(localStorage.getItem("accessToken"))
        }
        if (localStorage.getItem("refreshToken")) {
            setRefreshToken(localStorage.getItem("refreshToken"))
        }
    }, [])

    const fetchAccessToken = async (code) => {
        try {
            const options = {
                headers: {
                    'Authorization': `Basic ${btoa(CLIENT_ID + ":" + CLIENT_SECRET)}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            }
            // const { data } = await axios.post(TOKEN, new URLSearchParams({
            //     "grant_type": 'authorization_code',
            //     "code": code,
            //     "redirect_uri": REDIRECT_URI,
            // }), options);
            // console.log(data.access_token)
            // return await data;
        }
        catch (err) {
            console.log(err)
        }
    }

    const logout = async () => {
        window.localStorage.clear()
        props.history.push("/login")
        setAccessToken(null)
    }

    const exampleEmail = 'rakeshkhurana@college.harvard.edu'
    const exampleUsername = 'deanKhurana'
    const examplePassword = '\u2022\u2022\u2022\u2022\u2022\u2022\u2022'

    return (<div>

        <Background>
            <Container>
                <StyledInput placeholder='Old username' type='text' value={oldUsername} onChange={e => setOldUsername(e.target.value)}></StyledInput>
                <StyledInput placeholder='New username' type='text' value={username} onChange={e => setUsername(e.target.value)}></StyledInput>
                <StyledInput placeholder='Old password' type='text' value={oldPassword} onChange={e => setOldPassword(e.target.value)}></StyledInput>
                <StyledInput placeholder='New password' type='password' value={password} onChange={e => setPassword(e.target.value)}></StyledInput>
                <StyledButton onClick={() => updateAccountDetails()}>Change account details</StyledButton>
                <StyledButton onClick={logout}>Logout</StyledButton> :
            </Container>
        </Background>


    </div>)
}

export default Settings