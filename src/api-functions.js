const requestAuthorization = () => {
    // TODO: get id's from backend
    const id = '4aa2e2d16efe46e198d444f232e96695'; // client id
    const sec = '42147b97f5254fc1b06949d1cc3f0694'; // secret
    const redirect_uri = 'http://localhost:3000'; // feel free to edit
    url += "?client_id=" + id;
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURI(redirect_uri);
    url += "&show_dialog=true";
    url += "&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private";
    window.location.href = url; // Show Spotify's authorization screen
}
