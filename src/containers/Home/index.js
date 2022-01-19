import React, { useState, useEffect } from 'react'
import { Background } from '../Login/styles'
import { Container, StyledH1 } from '../Welcome/styles'
import axios from 'axios'
// import { credentials } from '../../credentials'
import { requestAuthorization, onPageLoad } from '../../api-functions'

const Home = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    // check token
    // spotify = credentials()
    useEffect({
        onPageLoad
    }, [])
    const [weather, setWeather] = useState('')
    let location = "Boston"

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=886705b4c1182eb1c69f28eb8c520e20`)
            const data = await res.json()
            setWeather(data.weather[0].description.toUpperCase())
        }
        fetchData()
    }, [])

    return (
        <Background>
            <Container>
                <StyledH1>
                    The weather for today in {location} is: {weather}
                </StyledH1>
                return (<button onClick={requestAuthorization}> Click to add spotify</ button>)
            </Container>
        </Background>
    )
}

export default Home