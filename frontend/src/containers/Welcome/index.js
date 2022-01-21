import React from 'react'
import {
  Background, Container, StyledH1, StyledLink, Logo, Subtitle, Credits
} from './styles'
import logo from './logo.png'
import { PrettyText } from '../Home/styles'

const Welcome = (props) => {
  const token = localStorage.getItem('token');
  if (token) {
    props.history.push("/home");
  }

  return (
    <Background>
      <Container>
        <StyledH1>Weatherify</StyledH1>
        <Subtitle>Get personalized recommendations that take into account the weather in your area to fit your mood!</Subtitle>
        <Logo src={logo} alt='logo'></Logo>
        <StyledLink to="/login">Log in</StyledLink>
        <StyledLink to="/register">Create an account</StyledLink>
        <Credits> Developed by Natnael Teshome, Ricardo Linares, Hoon Shin, John Boesen, and Jota Chamorro</Credits>
      </Container>
    </Background>
  )
}
export default Welcome
