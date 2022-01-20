let id = '4aa2e2d16efe46e198d444f232e96695'; // client id
let sec = '42147b97f5254fc1b06949d1cc3f0694'; // secret
const redirect_uri = 'http://localhost:3000/home'; // feel free to edit
const request = require('request'); // "Request" library --> if I had more time, I would swap this out to uniform libraries
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
    const code = getUriCode()
    const authOptions = {
        url: TOKEN,
        form: {
            code: code,
            redirect_uri: redirect_uri,
            grant_type: 'authorization_code'
        },
        headers: {
            'Authorization': 'Basic ' + (Buffer(id + ':' + sec).toString('base64'))
        },
        json: true
    };

    request.post(authOptions, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            const access_token = body.access_token,
                refresh_token = body.refresh_token;
            // TODO: change this to backend
            localStorage.setItem('access_token', access_token)
            localStorage.setItem('refresh_token', refresh_token)
            generatePlaylist()
        }
    });
}

const refreshAccessToken = () => {
    const refresh_token = localStorage.getItem('refresh_token')
    const authOptions = {
        url: TOKEN,
        headers: { 'Authorization': 'Basic ' + (new Buffer(id + ':' + sec).toString('base64')) },
        form: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        },
        json: true
    };

    request.post(authOptions, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            localStorage.setItem('access_token', body.access_token)
            localStorage.setItem('refresh_token', refresh_token)
        }
    });
}

const handleAuthorizationResponse = () => {
    if (this.status === 200) {
        const data = JSON.parse(this.responseText);
        // get access and refresh tokens
        if (data.access_token !== undefined) {
            access_token = data.access_token;
            localStorage.setItem("access_token", access_token);
        }
        if (data.refresh_token !== undefined) {
            refresh_token = data.refresh_token;
            localStorage.setItem("refresh_token", refresh_token);
        }
    }
}

const getUriCode = () => {
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
        return uriCode
    }
    // check in local storage
    else if (localStorage.getItem('sptCode')) {
        // idk if this will work with the code over and over
        code = localStorage.getItem('sptCode')
        return code
    }
    return null;
}

const findAccess = () => {
    // change to suit backend
    access_token = localStorage.getItem('access_token')
    return access_token
}

const updateAccess = () => {
    const options = {
        url: PROFILE,
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
    };
    request.get(options, (error, response, body) => {
        // if this attribute does not exist
        try {
            if (body.error) {
                if (body.error.status === 401) {
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
    });
}

export const handleRender = () => {
    // if we have an access token stored
    if (findAccess()) {
        updateAccess()
    }
    else {
        const code = findCode()
        if (code) {
            fetchAccessToken(code)
            window.history.pushState("", "", redirect_uri); // remove param from url 
        }
    }
}

