import React from 'react'

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

function App () {
  return (
    <Provider store={store}>
      <Router>
        <Header/>
        <div className={'container'}>
          <Switch>
            <Route path="/quests/:id" exact component={QuestPage}/>
            <Route exact path={'/'}>
              <Home/>
            </Route>
            <Route exact path={'/about'}>
              <About/>
            </Route>
            <Route exact path={'/auth'}>
              <Auth/>
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  )
}

export default App
