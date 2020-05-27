import React, { useEffect } from 'react'

import Header from './components/shared/Header/Header'
import Footer from './components/shared/Footer/Footer'
import About from './components/About/About'
import QuestsList from './components/Account/AccountTemplate/QuestsList'
import QuestPage from './components/QuestPage/QuestPage'
import InvitePage from './components/InvitePage/InvitePage'
import Progressboard from "./components/Progressboard/Progressboard";
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
import { login } from './api/AuthApi'
import NoMatch from './components/NoMatch/NoMatch'
import QuestPlaymode from './components/QuestPlaymode/QuestPlaymode'

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
              <Route path="/invites/:id" exact component={InvitePage}/>
              <Route path="/quests/:id" exact component={QuestPage}/>
              <Route path="/quests/:id/progressboard" exact component={Progressboard}/>
              <Route exact path={'/quests/:id/play'} component={QuestPlaymode}/>
              <Route exact path={'/'} component={Account}/>
              <Route exact path={'/auth'} component={Auth}/>
              <Route exact path={'/auth/:redirectTo'} component={Auth} />
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
