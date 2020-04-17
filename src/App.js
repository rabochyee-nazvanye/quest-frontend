import React, { useEffect } from 'react'

import Header from './components/shared/Header/Header'
import About from './components/About/About'
import Home from './components/Quests/Home'
import Auth from './components/Auth/Auth'
import Account from './components/Account/Account'

import './App.css'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import { Provider } from 'react-redux'
import { store } from './redux/store'
import { login } from './redux/Actions/Api'

export default function App () {
  useEffect(() => {
    login()
  })

  return (
    <Provider store={store}>
      <Router>
        <Header/>
        <div className={'container'}>
          <Switch>
            <Route exact path={'/'} component={Home} />
            <Route exact path={'/about'} component={About} />
            <Route exact path={'/auth'} component={Auth} />
            <Route exact path={'/auth/:redirectTo'} component={Auth} />
            <Route exact path={'/account'} component={Account} />
          </Switch>
        </div>
      </Router>
    </Provider>
  )
}
