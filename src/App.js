import React from 'react'
import Settings from './containers/Settings'
// import { ApolloProvider } from '@apollo/react-hooks'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
// import { ThemeProvider } from 'styled-components'
// import theme from './theme'
// import client from './client'
import Welcome from './containers/Welcome'
import Login from './containers/Login'
import Home from './containers/Home'

// I commented out things that were in the web-starter repo they gave us 
// but not in this one (mostly backend)

const App = () => (
  <Router>
    {/* <ThemeProvider theme={theme}> */}
    {/* <ApolloProvider client={client}> */}
    <div className="App">
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/" component={Welcome} />
        <Route path="/settings" component={Settings} />
      </Switch>
    </div>
    {/* </ApolloProvider> */}
    {/* </ThemeProvider> */}
  </Router>
)

export default App