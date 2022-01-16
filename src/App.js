import React from 'react'
import Greeting from './Containers/Greeting/index.js'
import Reminders from './Containers/Reminders/index.js'
import { Switch, Route, BrowserRouter } from "react-router-dom";


const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/reminders">
        <Reminders />
      </Route>
      <Route path="/">
        <Greeting />
      </Route>
    </Switch>
  </BrowserRouter>
)

// const App = () => (
//   <Greeting />
// )



export default App
