import React from 'react'

import Header from './components/shared/Header/Header'
import About from './components/About/About'
import Home from './components/Quests/Home'

import './App.css'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import { Provider } from 'react-redux'
import { store } from './redux/store'
import Auth from './components/Auth/Auth'

function App () {
  return (
    <Provider store={store}>
      <Router>
        <Header/>
        <div className={'container'}>
          <Switch>
            <Route exact path={'/'} component={Home} />
            <Route exact path={'/about'} component={About} />
            <Route exact path={'/auth'} component={Auth} />
          </Switch>
        </div>
      </Router>
    </Provider>
  )
}

export default App
