import React, { useState } from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import theme from './theme'
import client from './client'
import Home from './containers/Home'
import Login from './containers/Login'
import Welcome from './containers/Welcome'
import Settings from './containers/Settings'

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false)

  return (<Router>
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <div className="App">
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/home" component={Home} />
            <Route path="/settings" component={Settings} />
            <Route path="/" component={Welcome} />
          </Switch>
        </div>
      </ApolloProvider>
    </ThemeProvider>
  </Router>
)
}

export default App
