const request = require('request'); // "Request" library

// acct info
let id = '4aa2e2d16efe46e198d444f232e96695'; // client id
let sec = '42147b97f5254fc1b06949d1cc3f0694'; // secret
let access_token = ''
let user_id = ''
const redirect_uri = 'http://localhost:3000/home'; // feel free to edit

// Constants
const USER_PLAYLISTS = 'https://api.spotify.com/v1/me/playlists'
const ARTISTS = 'https://api.spotify.com/v1/me/top/artists'
const TRACKS = 'https://api.spotify.com/v1/me/top/tracks'
const WEATHER = 'https://api.openweathermap.org/data/2.5/weather'
const RECOMMENDATIONS = 'https://api.spotify.com/v1/recommendations'
const USERS = 'https://api.spotify.com/v1/users'
const PLAYLIST = 'https://api.spotify.com/v1/users'
const wKey = 'db5bbba816b58757082ce2230c7754a6'

const legend = {
    rain: {
        danceability: .2,
        valence: .2,
        energy: .2,
        tempo: 90,
        acousticness: .8
    },
    thunderstorm: {
        danceability: .8,
        valence: .2,
        energy: .8,
        tempo: 150,
        acousticness: .5
    },
    clear: {
        danceability: .8,
        valence: .8,
        energy: .8,
        tempo: 150,
    },
    cloudy: {
        danceability: .5,
        valence: .2,
        energy: .5,
        tempo: 120,
    },
}

// Globals
// let weatherParams = ''


const topArtists = async (topTracksArr) => {

    const topArtistsArr = []

    fetch(ARTISTS, {
        headers: {
            'Authorization': 'Bearer ' + access_token,
            'Content-Type': 'application/json'
        }
    }).then(rsp => { return rsp.json() })
        .then(rsp => rsp.items.forEach(e => { topArtistsArr.push(e.id) }))
        .then(() => { getRecommendations(topTracksArr, topArtistsArr) })
}

const topTracks = async (rsp) => {

    const topTracksArr = []

    fetch(TRACKS, {
        headers: {
            'Authorization': 'Bearer ' + access_token,
            'Content-Type': 'application/json'
        }
    }).then(rsp => { return rsp.json() })
        .then(rsp => rsp.items.forEach(e => topTracksArr.push(e.id)))
        // todo: make sure this is correct style
        .then(() => { topArtists(topTracksArr) })
}


export const weatherRecs = () => {
    const cityName = "Malcolm"
    const stateAbbr = "US-NE"
    try {
        fetch(`${WEATHER}?q=${cityName},${stateAbbr}&appid=${wKey}&units=imperial`)
            .then(response => response.json())
            .then(response => { getCondition(response.weather[0].id.toString()) })
    }
    catch (err) {
        console.log(err)
    }
}

const getCondition = (weatherCode) => {
    // code to condition key
    const first = weatherCode[0]
    if (first === '8') {
        if (weatherCode[2] === '0') {
            getTargets('clear')
        }
        getTargets('cloudy')
    }
    if (first === '5' || first === '3' || first === '6') {
        getTargets('rain')
    }
    if (first === '2') {
        getTargets('thunderstorm')
    }
}

const getTargets = (condition) => {
    // condition to mood params
    if (!condition) {
        return ''
    }
    const targs = legend[condition]
    let rsp = []
    for (const k in targs) {
        rsp.push(`target_${k}=${targs[k]}`)
    }
    console.log(`RSP Length: ${rsp.length}`)
    console.log(`RSP: ${rsp}`)
    return `${RECOMMENDATIONS}?${rsp.join(',')}`
}

const getRecommendations = (artists, tracks) => {
    const seedArtists = artists.join(',')
    const seedTracks = tracks.join(',')
    console.log(weatherRecs())
    // const options = {
    //     url: `${weatherRecs()}&seed_artists=${seedArtists}&seed_tracks=${seedTracks}`,
    //     headers: { 'Authorization': 'Bearer ' + access_token },
    //     json: true
    // };
    fetch(`${weatherRecs()}&seed_artists=${seedArtists}&seed_tracks=${seedTracks}`, {
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
    }).then(
        rsp => {
            const recTracks = [];
            rsp.tracks.forEach(e => recTracs.push(e.tracks.linked_from.uri));
            for (let i = 0; i < recTracks.length; i++) {
                recTracks[i] = "spotify:track:" + recTracks[i]
            }
            writeTracks(recTracs.join(','))
        })
    // request.get(options, (error, response, body) => {
    //     // TODO: parse response and convert list of tracks to array
    //     // 
    //     writeTracks()
    // })
}

const createPlaylist = () => {
    fetch(`${USERS}/${user_id}/playlists`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + access_token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: "Spotify Weather Playlist",
            description: "Created By the folks at Spotify Weather--tune your day!",
            public: "false"
        })
    }).then(rsp => {
        console.log(rsp.id);
        localStorage.setItem('playlistId', rsp.id)
    })
}

const addSongs = (tracks) => {
    fetch(`${PLAYLIST}/${localStorage.getItem('playlistId')}/tracks`, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + access_token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            uris: tracks,
        })
    })
}

const writeTracks = (tracks) => {
    const playId = localStorage.getItem('playlist')
    if (!playId) {
        createPlaylist()
    }
    // if weatherplaylist.length > 0, delete songs
    // write new songs to playlist
    addSongs(tracks)
    // present play button
}


export const generatePlaylist = async (acc, disp_nm) => {
    // HIGH-LEVEL function gets songs correlated with weather and makes playlist from them
    access_token = acc
    user_id = disp_nm
    topTracks()
}

export const check = () => {
    console.log(weatherRecs())
}
