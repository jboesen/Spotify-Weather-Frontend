let id = '4aa2e2d16efe46e198d444f232e96695'; // client id
let sec = '42147b97f5254fc1b06949d1cc3f0694'; // secret
let access_token = ''
let user_id = ''
const redirect_uri = 'http://localhost:3000/home'; // feel free to edit
const request = require('request'); // "Request" library
let topArtistsArr = []
let topTracksArr = []
const PLAYLISTS = 'https://api.spotify.com/v1/me/playlists';
const ARTISTS = 'https://api.spotify.com/v1/me/top/artists'

const topArtists = () => {
    const options = {
        url: 'https://api.spotify.com/v1/me/top/artists',
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
    };
    request.get(options, (error, response, body) => {
        body.items.forEach(e => topArtistsArr.push(e.id))
    })
    topArtistsArr.forEach(e => console.log(e))
}

const topTracks = (rsp) => {
    const options = {
        url: 'https://api.spotify.com/v1/me/top/tracks',
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
    };
    request.get(options, (error, response, body) => {
        body.items.forEach(e => topTracksArr.push(e.id))
    })
    topTracksArr.forEach(e => console.log(e))
}

const getRecommendations = () => {
    // const topTracksStr = topTracksArr.toString()
    const topTracksStr = topTracksArr.join(',')
    // const topArtistsStr = topArtistsArr.toString()
    const topArtistsStr = topArtistsArr.join(',')
    console.log(topArtistsStr)
}

export const generatePlaylist = (acc, disp_nm) => {
    access_token = acc
    // console.log(acc)
    user_id = disp_nm
    console.log(user_id)
    topArtists()
    topTracks()
    getRecommendations()
}