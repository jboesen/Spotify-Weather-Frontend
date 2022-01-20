import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { requestAuth, handleRender } from '../../api-auth'
import recommendations from './recommendations'
import ListView from '../ListView'
import { Background } from '../Login/styles'
import { Container, StyledH1 } from '../Welcome/styles'
import { PrettyText, FlexContainer, StyledButton, ProfileLink } from './styles'

// album cover art url, track title, artist name

const Home = () => {
    // weather API implementation
    const [weather, setWeather] = useState({});
    let location = "Boston"

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=886705b4c1182eb1c69f28eb8c520e20`)
            const data = await res.json()
            setWeather(data)
        }
        fetchData()
    }, []);

    const isLoaded = Object.keys(weather).length !== 0;
    const convertTemp = (k) => {
        return Math.round((parseFloat(k) - 273.15) * 9 / 5 + 32).toString();
    };
    // 
    const history = useHistory()
    const token = localStorage.getItem('token');
    // how to see if auth'd olr:
    // check if logged in in session --> consult makeratplay for this
    // if not logged in, check for code --> getCode
    // else, prompt login --> requestAuth
    const [loggedIn, setLoggedIn] = useState()
    useEffect(handleRender, [])
    // if (!token) {
    //     history.push('/');
    // }
    const recs = recommendations.tracks

    if (isLoaded) {
        console.log(convertTemp(weather.main.temp))
        return (
            <Background>
                <Container>
                    <ProfileLink to="/settings">Your Profile</ProfileLink>
                    <StyledH1>
                        The weather for today in {location} is:
                    </StyledH1>
                    <FlexContainer>
                        <PrettyText>
                            {weather.weather[0].description.toUpperCase()}
                        </PrettyText>
                        <PrettyText>
                            {convertTemp(weather.main.temp)}&deg;
                        </PrettyText>
                        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon"></img>
                    </FlexContainer>
                    <StyledButton onClick={requestAuth}> Link your spotify! <i class="fa fa-spotify"></i> </ StyledButton>
                    <ListView recs={recs}></ListView>
                </Container>
            </Background >
        )
    }
    return <Background></Background>

}

export default Home

// {
//     "coord": { "lon": -71.0598, "lat": 42.3584 },
//     "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04d" }],
//         "base": "stations",
//             "main": { "temp": 274.85, "feels_like": 272.93, "temp_min": 273.36, "temp_max": 275.93, "pressure": 1019, "humidity": 84 },
//     "visibility": 10000,
//         "wind": { "speed": 1.79, "deg": 313, "gust": 4.92 },
//     "clouds": { "all": 100 },
//     "dt": 1642700752,
//         "sys": { "type": 2, "id": 2013408, "country": "US", "sunrise": 1642680476, "sunset": 1642714934 },
//     "timezone": -18000,
//         "id": 4930956,
//             "name": "Boston",
//                 "cod": 200,
// }