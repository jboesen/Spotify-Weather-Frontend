import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { requestAuth, handleRender, findAccess } from '../../api-auth'
import ListView from '../../components/ListView'
import { Background } from '../Login/styles'
import { Container, StyledH1 } from '../Welcome/styles'
import { PrettyText, FlexContainer, StyledButton, ProfileLink, StyledButtonLinked } from './styles'
import FadeIn from 'react-fade-in';

import { check } from '../../api-playlists'

// album cover art url, track title, artist name

const Home = () => {
    // weather API implementation
    const [weather, setWeather] = useState({});
    const [recs, setRecs] = useState({});
  
    let location = {
        lon: 0,
        lat: 0
    };

    useEffect(() => {
        const fetchData = async () => {
            const getCoords = async () => {
                const pos = await new Promise((resolve, reject) => {
                  navigator.geolocation.getCurrentPosition(resolve, reject);
                });
            
                return {
                  lon: pos.coords.longitude,
                  lat: pos.coords.latitude,
                };
            };
            location = await getCoords();
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=886705b4c1182eb1c69f28eb8c520e20`)
            const data = await res.json()
            setWeather(data)
        }
        fetchData()
    }, []);

    const isLoaded = Object.keys(weather).length !== 0;
    const convertTemp = (k) => {
        return Math.round((parseFloat(k) - 273.15) * 9 / 5 + 32).toString();
    };
    
    // how to see if auth'd olr:
    // check if logged in in session --> consult makeratplay for this
    // if not logged in, check for code --> getCode
    // else, prompt login --> requestAuth
    useEffect(handleRender, [])

    const getRecommendations = async () => {
        let newRecs = await check(localStorage.getItem('access_token'), weather)
        setRecs(newRecs.tracks)
    }

    // const linkSpotifyButton = () => {
    //     if (!findAccess()) {
    //         return <StyledButton onClick={requestAuth}> Link your spotify! <i className="fa fa-spotify"></i> </ StyledButton>
    //     }
    //     return <StyledButtonLinked> Spotify linked! <i className="fa fa-spotify"></i> </ StyledButtonLinked>
    // }

    if (isLoaded) {
        console.log(convertTemp(weather.main.temp))
        return (
            <Background>
                <FadeIn>
                    <Container>
                        <ProfileLink to="/settings">Your Profile</ProfileLink>
                        <StyledH1>
                            The weather for today is:
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
                        <StyledButton onClick={requestAuth}> Link your spotify! <i className="fa fa-spotify"></i> </ StyledButton>
                        <StyledButton onClick={getRecommendations}>Get recommendations!</StyledButton>
                        {
                            Object.keys(recs).length !== 0
                            ? <ListView recs={recs}></ListView>
                            : null
                        }
                    </Container>
                </FadeIn>
            </Background >
        )
    }
    return <Background></Background>

}

export default Home