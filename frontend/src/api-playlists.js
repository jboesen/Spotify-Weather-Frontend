const request = require('request'); // "Request" library

// acct info
let id = '4aa2e2d16efe46e198d444f232e96695'; // client id
let sec = '42147b97f5254fc1b06949d1cc3f0694'; // secret
let access_token = ''
let user_id = ''
const redirect_uri = 'http://localhost:3000/home'; // feel free to edit

// Constants
const PLAYLISTS = 'https://api.spotify.com/v1/me/playlists'
const ARTISTS = 'https://api.spotify.com/v1/me/top/artists'
const TRACKS = 'https://api.spotify.com/v1/me/top/tracks'
const WEATHER = 'https://api.openweathermap.org/data/2.5/weather'
const RECOMMENDATIONS = 'https://api.spotify.com/v1/recommendations'
const wKey = 'db5bbba816b58757082ce2230c7754a6'

const legend = {
    rain: {
        danceability: .2,
        valence: .2,
        energy: .2,
        tempo: .2,
        acousticness: .8
    },
    thunderstorm: {
        danceability: .8,
        valence: .2,
        energy: .8,
        tempo: .8,
        acousticness: .5
    },
    clear: {
        danceability: .8,
        valence: .8,
        energy: .8,
        tempo: .8,
    },
    cloudy: {
        danceability: .5,
        valence: .2,
        energy: .5,
        tempo: .5,
    },
    night: {
        danceability: .8,
        valence: .2,
        energy: .2,
        tempo: .2,
        acousticness: .2
    }
}

// Global Vars
const topTracksArr = []
const topArtistsArr = []
let weatherId = ''


const topArtists = () => {
    const options = {
        url: ARTISTS,
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
    };
    //this is because of a stupid promises thing and it resolves in the wrong order
    request.get(options, (error, response, body) => {
        intoArray(body)
    })
    // rsp.items.forEach(e => { topArtistsArr.push(e.id) })
    console.log(topArtistsArr.length)
    // topArtistsArr.forEach(e => console.log(e.id))
    return topArtistsArr
}

const intoArray = (data) => {
    data.items.forEach(e => { topArtistsArr.push(e.id) })
}

const topTracks = (rsp) => {
    const options = {
        url: TRACKS,
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
    };
    request.get(options, (error, response, body) => {
        body.items.forEach(e => topTracksArr.push(e.id))
    })
    console.log(topTracksArr.length)
    topTracksArr.forEach(e => console.log(e.id))
    return topTracksArr
}

const weatherRecs = () => {
    const cityName = "Malcolm"
    const stateAbbr = "US-NE"
    try {
        fetch(`${WEATHER}?q=${cityName},${stateAbbr}&appid=${wKey}&units=imperial`)
            .then(response => response.json())
            //should I put await here?
            // will return work here?
            .then(response => { return getCondition(response.weather[0].id.toString()) })
    }
    catch (err) {
        console.log(err)
    }
}

const getCondition = (weatherCode) => {
    // code to condition key
    const first = weatherCode[0]
    if (first === '8') {
        // todo: implement for various types of clear/mostly clear in the 800s
        return getTargets('clear')
    }
    if (first === '5' || first === '3' || first === '6') {
        return getTargets('rain')
    }
    if (first === '2') {
        return getTargets('thunderstorm')
    }
}

const getTargets = (condition) => {
    // condition to mood params
    if (!condition) {
        return
    }
    const targs = legend[condition]
    let rsp = []
    for (const k in targs) {
        rsp.push(`target_${k}=${targs[k]}`)
    }
    // rsp.forEach(e => { console.log(e) })
    return rsp.join('&')
}

const getRecommendations = (artists, tracks) => {
    const seedArtists = artists.join(',')
    const seedTracks = tracks.join(',')
    const options = {
        url: `${RECOMMENDATIONS}?${weatherRecs()}`,
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
    };
    request.get(options, (error, response, body) => {
        // TODO: parse response and convert list of tracks to array
        // 
        writeTracks()
    })
}

const writeTracks = () => {
    // Get weather playlist
    // if no weather playlist, create one
    // if weatherplaylist.length > 0, delete songs
    // write new songs to playlist
    // present play button
}

export const generatePlaylist = (acc, disp_nm) => {
    // HIGH-LEVEL function gets songs correlated with weather and makes playlist from them
    access_token = acc
    // console.log(acc)
    user_id = disp_nm
    console.log(user_id)
    getRecommendations(topArtists(), topTracks())
}

console.log(getTargets('clear'))