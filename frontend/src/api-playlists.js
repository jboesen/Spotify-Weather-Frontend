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

const getWeather = () => {
    const xhr = new XMLHttpRequest()
    const cityName = "Malcolm"
    const stateAbbr = "US-NE"
    try {
        fetch(`${WEATHER}?q=${cityName},${stateAbbr}&appid=${wKey}&units=imperial`)
            .then(response => response.json())
            .then(r => weatherId = r.weather[0].id.toString())
    }
    catch (err) {
        console.log(err)
    }

}

const getRecommendations = (artists, tracks) => {
    // const topTracksStr = topTracksArr.toString()
    const topTracksStr = tracks.join(',')
    // const topArtistsStr = topArtistsArr.toString()
    const topArtistsStr = artists.join(',')
    console.log(topArtistsStr)
}

export const generatePlaylist = (acc, disp_nm) => {
    access_token = acc
    // console.log(acc)
    user_id = disp_nm
    console.log(user_id)
    getWeather()
    // getRecommendations(topArtists(), topTracks())
}