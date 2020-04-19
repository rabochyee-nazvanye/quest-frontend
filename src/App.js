import React, {useEffect} from 'react'

import Header from './components/shared/Header/Header'
import About from './components/About/About'
import Home from './components/Quests/Home'
import QuestPage from './components/QuestPage/QuestPage'

import './App.css'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import { Provider } from 'react-redux'
import { store } from './redux/store'
import Auth from './components/Auth/Auth'
import Account from "./components/Account/Account";
import {login} from "./redux/Actions/Api";

function App () {
  useEffect(() => {
    login()
  })

  return (
    <Provider store={store}>
      <Router>
        <Header/>
        <div className={'container'}>
          <Switch>
            <Route path="/quests/:id" exact component={QuestPage}/>
            <Route exact path={'/'} component={Home}/>
            <Route exact path={'/about'} component={About}/>
            <Route exact path={'/auth'} component={Auth}/>
            <Route exact path={'/auth/:redirectTo'} component={Auth} />
            <Route exact path={'/account'} component={Account} />
          </Switch>
        </div>
      </Router>
    </Provider>
  )
}

export default App
