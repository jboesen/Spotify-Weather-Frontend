import { request } from 'express';

let id = '4aa2e2d16efe46e198d444f232e96695'; // client id
let sec = '42147b97f5254fc1b06949d1cc3f0694'; // secret
const redirect_uri = 'http://localhost:3000/home'; // feel free to edit
const { generatePlaylist } = require('./api-playlists')

let access_token = null;
let refresh_token = null;

// Endpoints
const AUTHORIZE = "https://accounts.spotify.com/authorize"
const TOKEN = "https://accounts.spotify.com/api/token";
const PROFILE = "https://api.spotify.com/v1/me"


export const requestAuth = () => {
    // TODO: get id's from backend
    let url = AUTHORIZE;
    url += "?client_id=" + id;
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURI(redirect_uri);
    url += "&show_dialog=true";
    url += "&scope=user-read-private user-modify-playback-state user-library-read streaming playlist-read-private playlist-modify-private user-top-read";
    window.location.href = url; // Show Spotify's authorization screen
}


const fetchAccessToken = () => {
    console.log('fetchAccessToken')
    const code = getUriCode()
    fetch(TOKEN, {
        method: 'POST',
        headers: { 'Authorization': 'Basic ' + (Buffer(id + ':' + sec).toString('base64')) },
        body: JSON.stringify({
            code: code,
            redirect_uri: redirect_uri,
            grant_type: 'authorization_code',
            Accept: 'application/json',
            Content_Type: 'application/json'
        })
    }).then(body => {
        const access_token = body.access_token,
            refresh_token = body.refresh_token;

        // TODO: change this to backend
        localStorage.setItem('access_token', access_token)
        localStorage.setItem('refresh_token', refresh_token)

        // const options = {
        //     url: PROFILE,
        //     headers: { 'Authorization': 'Bearer ' + access_token },
        //     json: true
        // };
        // request.get(options, (error, response, body) => {
        //     console.log(body);
        //     console.log(Object.keys(body))
        // });

        console.log("Successfully auth'd")
        generatePlaylist()
    })

}

const refreshAccessToken = () => {
    console.log('refreshAccessToken')
    const refresh_token = localStorage.getItem('refresh_token')
    const authOptions = {
        url: TOKEN,
        headers: { 'Authorization': 'Basic ' + (new Buffer(id + ':' + sec).toString('base64')) },
        form: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token,
        },
        json: true
    };
    fetch(TOKEN, {
        method: 'POST',
        headers: { 'Authorization': 'Basic ' + (Buffer(id + ':' + sec).toString('base64')) },
        body: JSON.stringify({
            grant_type: 'refresh_token',
            refresh_token: refresh_token,
            Accept: 'application/json',
            Content_Type: 'application/json',
        })
    }).then(body => {
        localStorage.setItem('access_token', body.access_token)
        localStorage.setItem('refresh_token', refresh_token)
    })
}

const handleAuthorizationResponse = () => {
    console.log("handleAuthorizationResponse")
    // if (this.status === 200) {
    const data = JSON.parse(this.responseText);
    console.log(`data: ${data}`);
    // get access and refresh tokens
    if (data.access_token !== undefined) {
        access_token = data.access_token;
        localStorage.setItem("access_token", access_token);
    }
    if (data.refresh_token !== undefined) {
        refresh_token = data.refresh_token;
        localStorage.setItem("refresh_token", refresh_token);
    }
    console.log("SUCCESS!!!!!")
    // }
    // else {
    //     console.log(`rsp: ${this.responseText}`);
    //     alert(this.responseText);
    // }
}

const getUriCode = () => {
    console.log('getUriCode')
    let code = null;
    const queryString = window.location.search;
    if (!queryString) {
        return null;
    }
    if (queryString.length > 0) {
        const urlParams = new URLSearchParams(queryString);
        code = urlParams.get('code')
    }
    localStorage.setItem('sptCode', code)
    return code;
}

const findCode = () => {
    let code;
    const uriCode = getUriCode()
    if (uriCode) {
        console.log(`uriCode: ${uriCode}`)
        return uriCode
    }
    // check in local storage
    else if (localStorage.getItem('sptCode')) {
        // idk if this will work with the code over and over
        code = localStorage.getItem('sptCode')
        console.log(`Code: ${code}`)
        return code
    }
    return null;
}

const findAccess = () => {
    // change to suit backend
    console.log(`access token :${localStorage.getItem('access_token')}`)
    access_token = localStorage.getItem('access_token')
    return access_token
}

const updateAccess = () => {
    console.log('updating access')
    console.log(`access token: ${access_token}`)
    const options = {
        url: PROFILE,
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
    };
    fetch(PROFILE, {
        headers: { 'Authorization': 'Bearer ' + access_token },
        body: JSON.stringify({
            Accept: 'application/json',
            Content_Type: 'application/json'
        })
    }).then(body => {
        try {
            if (body.error) {
                if (body.error.status === 401) {
                    console.log('refreshing...')
                    refreshAccessToken()
                }
                // we have some problematic error
                // TODO: handle this error on frontend
                else {
                    return
                }
            }
        }
        finally {
            generatePlaylist(access_token, body.id);
        }
    })
}

export const handleRender = () => {
    console.log('handleRender')
    // if we have an access token stored
    if (findAccess()) {
        updateAccess()
    }
    else {
        const code = findCode()
        console.log(`Code: ${code}`)
        if (code) {
            fetchAccessToken(code)
            window.history.pushState("", "", redirect_uri); // remove param from url 
        }
    }
    // return values determine whether we need to alert user that he needs to update playlist
}

