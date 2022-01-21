import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const PrettyText = styled.div`
    font-weight: 300;
    color: white;
    display: block;
    font-family: Montserrat, sans-serif;
    font-size: 2em;
    margin: 0px auto;
    text-align: center;
`

export const FlexContainer = styled.div` 
    display: flex;
    flex-direction: row;
    margin: 0px auto;
    width: 50%;
    justify-content: space-between;
    align-items: center;
`

export const StyledButton = styled.button` 
    background-color: #1DB954;
    border-radius: 30px;
    border: none;
    color: white;
    cursor: pointer;
    display: block;
    font-family: Montserrat, sans-serif;
    font-size: 1.2em;
    margin: 20px auto;
    padding: 15px 20px;
    text-align: center;
    text-decoration: none;
    transition: all 200ms;
    width: 300px;

    :hover{
        color: #1DB954;
        background-color: white;
    }

    .red{
        background-color: red;
    }
`

export const StyledButtonLinked = styled.button` 
    background-color: white;
    border-radius: 30px;
    border: none;
    color: #1DB954;
    display: block;
    font-family: Montserrat, sans-serif;
    font-size: 1.2em;
    margin: 20px auto;
    padding: 15px 20px;
    text-align: center;
    text-decoration: none;
    width: 300px;
`

export const ProfileLink = styled(Link)`
    background-color: white;
    border-radius: 30px;
    border: none;
    color: #06c0c1;
    cursor: pointer;
    display: block;
    font-family: Montserrat, sans-serif;
    font-size: 0.9em;
    margin: 20px auto;
    padding: 15px 20px;
    text-align: center;
    text-decoration: none;
    transition: all 200ms;
    width: 120px;
    position: absolute;
    right: 75px;
    top: 15px;

    :hover{
        color: white;
        background-color: #06c0c1;
    }
`