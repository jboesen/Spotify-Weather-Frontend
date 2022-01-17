import React from 'react'
import Settings from './containers/Settings'
import { Switch, Route, BrowserRouter } from "react-router-dom";


const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/">
        <Settings />
      </Route>
    </Switch>
  </BrowserRouter>
)

// const App = () => (
//   <Greeting />
// )



export default App
