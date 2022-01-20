const request = require('request'); // "Request" library

// Constants
const ARTISTS = 'https://api.spotify.com/v1/me/top/artists'
const PLAYLIST = 'https://api.spotify.com/v1/users'
const RECOMMENDATIONS = 'https://api.spotify.com/v1/recommendations'
const TRACKS = 'https://api.spotify.com/v1/me/top/tracks'
const USERS = 'https://api.spotify.com/v1/users'
const WEATHER = 'https://api.openweathermap.org/data/2.5/weather'
const wKey = 'db5bbba816b58757082ce2230c7754a6'

// acct info
let access_token = ''
let user_id = ''

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
    // convert weatherCode to condition key
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
    // add json-sequence?
    fetch(`${weatherRecs()}&seed_artists=${seedArtists}&seed_tracks=${seedTracks}`, {
        headers: { 'Authorization': 'Bearer ' + access_token },
        body: {
            Accept: 'application/json',
            Content_Type: 'application/json'
        },
        // is json a prop here?
        json: true
    }).then(
        rsp => {
            const recTracks = [];
            rsp.tracks.forEach(e => recTracks.push(e.tracks.linked_from.uri));
            for (let i = 0; i < recTracks.length; i++) {
                recTracks[i] = "spotify:track:" + recTracks[i]
            }
            writeTracks(recTracks.join(','))
        })
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
