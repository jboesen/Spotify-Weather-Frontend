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
    margin: 50px 0 600px;
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
    margin: 0px auto;
    padding: 15px 20px;
    text-align: center;
    text-decoration: none;
    transition: all 200ms;
    width: 350px;

    :hover{
        color: white;
        background-color: #06c0c1;
    }
`
// export const StyledIcon = styled(FontAwesomeIcon)`
//     color: white;
//     position: absolute;
// `
