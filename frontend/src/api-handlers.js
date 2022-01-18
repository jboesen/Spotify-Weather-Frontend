const SpotifyWebApi = require('spotify-web-api-node');

// why is this being ignored???
export const api = new SpotifyWebApi({
    clientId: '4aa2e2d16efe46e198d444f232e96695',
    clientSecret: '42147b97f5254fc1b06949d1cc3f0694',
    redirectUri: 'http://localhost:3000'
});

const randString = (length) => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

export const requestAuth = () => {
    const scopes = ['user-read-private', 'playlist-read-private', 'playlist-modify-private'],
        redirectUri = 'http://localhost:3000/home',
        clientId = '5fe01282e44241328a84e7c5cc169165',
        state = randString(16);
    // Create the authorization URL
    const authorizeURL = api.createAuthorizeURL(scopes, state)
    window.location.href = authorizeURL
}

const handleRedirect = () => {

    // The code that's returned as a query parameter to the redirect URI
    var code = getCode();

    // Retrieve an access token and a refresh token
    api.authorizationCodeGrant(code).then(
        function (data) {
            console.log('The token expires in ' + data.body['expires_in']);
            console.log('The access token is ' + data.body['access_token']);
            console.log('The refresh token is ' + data.body['refresh_token']);

            // Set the access token on the API object to use it in later calls
            api.setAccessToken(data.body['access_token']);
            api.setRefreshToken(data.body['refresh_token']);
        },
        function (err) {
            console.log('Something went wrong!', err);
        }
    );
}

const getCode = () => {
    let code = null;
    const queryString = window.location.search;
    if (queryString.length > 0) {
        const urlParams = new URLSearchParams(queryString);
        code = urlParams.get('code')
    }
    return code;
}

export const refresh = () => {
    api.refreshAccessToken().then(
        (data) => {
            console.log('The access token has been refreshed!');

            // Save the access token so that it's used in future calls
            api.setAccessToken(data.body['access_token']);
        },
        (err) => {
            console.log('Could not refresh access token', err);
        }
    );
}
