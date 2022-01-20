import styled from 'styled-components'
import background from './background-dark.png'
import { Link } from 'react-router-dom'

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

export const StyledInput = styled.input` 
    background-color: white;
    border-radius: 30px;
    border: none;
    display: block;
    font-family: Montserrat, sans-serif;
    font-size: 1.2em;
    margin: 10px auto;
    padding: 15px 20px;
    width: 350px;

    :first-child{
      margin: 170px auto 25px;
    }
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
    width: 90px;

    :hover{
        color: white;
        background-color: #06c0c1;
    }
`