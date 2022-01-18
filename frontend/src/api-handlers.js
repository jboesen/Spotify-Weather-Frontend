let id = '4aa2e2d16efe46e198d444f232e96695'; // client id
let sec = '42147b97f5254fc1b06949d1cc3f0694'; // secret
const redirect_uri = 'http://localhost:3000/home'; // feel free to edit
const request = require('request'); // "Request" library


let access_token = null;
let refresh_token = null;
let currentPlaylist = "";

// Endpoints
const AUTHORIZE = "https://accounts.spotify.com/authorize"
const TOKEN = "https://accounts.spotify.com/api/token";
const PLAYLISTS = "https://api.spotify.com/v1/me/playlists";
const DEVICES = "https://api.spotify.com/v1/me/player/devices";
const PLAY = "https://api.spotify.com/v1/me/player/play";
const PAUSE = "https://api.spotify.com/v1/me/player/pause";
const NEXT = "https://api.spotify.com/v1/me/player/next";
const PREVIOUS = "https://api.spotify.com/v1/me/player/previous";
const PLAYER = "https://api.spotify.com/v1/me/player";
const TRACKS = "https://api.spotify.com/v1/playlists/{{PlaylistId}}/tracks";
const CURRENTLYPLAYING = "https://api.spotify.com/v1/me/player/currently-playing";
const SHUFFLE = "https://api.spotify.com/v1/me/player/shuffle";


const randString = (length) => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

export const requestAuth = () => {
    // TODO: get id's from backend
    let url = AUTHORIZE;
    url += "?client_id=" + id;
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURI(redirect_uri);
    url += "&show_dialog=true";
    url += "&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private";
    window.location.href = url; // Show Spotify's authorization screen
}


const getCode = () => {
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

const fetchAccessToken = (code) => {
    console.log("fetchAccessToken")
    let body = "grant_type=authorization_code";
    body += "&code=" + code;
    body += "&redirect_uri=" + encodeURI(redirect_uri);
    body += "&id=" + id;
    body += "&sec=" + sec;
    callAuthorizationApi(body);
}

export const callAuthorizationApi = (body) => {
    console.log("callAuthorizationApi")
    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
            code: code,
            redirect_uri: redirect_uri,
            grant_type: 'authorization_code'
        },
        headers: {
            'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
        },
        json: true
    };

    request.post(authOptions, (error, response, body) => {
        if (!error && response.statusCode === 200) {

            const access_token = body.access_token,
                refresh_token = body.refresh_token;

            const options = {
                url: 'https://api.spotify.com/v1/me',
                headers: { 'Authorization': 'Bearer ' + access_token },
                json: true
            }
        }
    })
}


export const handleRender = () => {
    // check in url
    let code;
    const uriCode = getCode()
    if (uriCode) {
        code = uriCode;
    }
    // check in local storage
    else if (localStorage.getItem('sptCode')) {
        // idk if this will work with the code over and over
        code = localStorage.getItem('sptCode')
    }
    if (code) {
        fetchAccessToken(code);
        window.history.pushState("", "", redirect_uri); // remove param from url    
    }
    else {
        requestAuth()
        return
    }
}