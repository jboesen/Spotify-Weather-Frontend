import styled from 'styled-components'
import { Link } from 'react-router-dom'
import background from './background.png'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export const Background = styled.div`
  background-color: lightgray;
  background-image: url(${background});
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover; /* Resize the background image to cover the entire container */
  height: 100vh;
  height: auto;
  min-height: 100vh;
  width: 100%;
`

export const Container = styled.div`
    padding: 4% 8%;
`

export const StyledH1 = styled.h1` 
    color: white;
    display: block;
    font-family: Montserrat, sans-serif;
    font-size: 4em;
    margin: 0px auto;
    text-align: center;
    margin: 50px 0 60px;
`

export const StyledLink = styled(Link)`
    background-color: white;
    border-radius: 30px;
    border: none;
    color: #06c0c1;
    cursor: pointer;
    display: block;
    font-family: Montserrat, sans-serif;
    font-size: 1.2em;
    margin: 20px auto;
    padding: 15px 20px;
    text-align: center;
    text-decoration: none;
    transition: all 200ms;
    width: 200px;

    :hover{
        color: white;
        background-color: #06c0c1;
    }
`

export const Logo = styled.img`
    width: 300px;
    display: block;
    margin: 0px auto;
`

export const Subtitle = styled.p`
    font-family: Montserrat, sans-serif;
    width: 550px;
    color: #06c0c1;
    font-size: 1.2em;
    font-weight: lighter;
    display: block;
    margin: 0px auto;
    text-align: center;
    margin-bottom: 18px;
`

export const Credits = styled.p`
    font-family: Montserrat, sans-serif;
    color: lightgray;
    font-size: 0.9em;
    font-weight: lighter;
    display: block;
    margin: 0px auto;
    text-align: center;
    margin-top: 150px;
`
// export const StyledIcon = styled(FontAwesomeIcon)`
//     color: white;
//     position: absolute;
// `
