import React, { useEffect } from 'react'

import Header from './components/shared/Header/Header'
import Footer from './components/shared/Footer/Footer'
import About from './components/About/About'
import Home from './components/Quests/Home'
import QuestPage from './components/QuestPage/QuestPage'
import './add-space.css'

import './App.css'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import { Provider } from 'react-redux'
import { store } from './redux/store'
import Auth from './components/Auth/Auth'
import Account from './components/Account/Account'
import { login } from './redux/Actions/Api'
import NoMatch from './components/NoMatch/NoMatch'
import QuestPlaymode from "./components/QuestPlaymode/QuestPlaymode";

function App () {
  useEffect(() => {
    login()
  })

  return (
    <Provider store={store}>
      <Router>
        <div className={'container'}>
          <Header/>
          <div className={'add-space'}>
            <Switch>
              <Route path="/quests/:id" exact component={QuestPage}/>
              <Route excat path={'/quests/:id/play'} component={QuestPlaymode}/>
              <Route exact path={'/'} component={Home}/>
              <Route exact path={'/about'} component={About}/>
              <Route exact path={'/auth'} component={Auth}/>
              <Route path={'/auth/:redirectTo'} component={Auth} />
              <Route exact path={'/account'} component={Account} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </div>
        <Footer/>
      </Router>
    </Provider>
  )
}

export default App
