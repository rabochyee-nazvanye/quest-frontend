import React, { useEffect } from 'react'

import Header from './components/shared/Header/Header'
import Footer from './components/shared/Footer/Footer'
import QuestPage from './components/QuestPage/QuestPage'
import InvitePage from './components/InvitePage/InvitePage'
import Progressboard from "./components/Progressboard/Progressboard";
import EditableTaskList from "./components/Admin/EditableTasksList/EditableTasksList";
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
import { login } from './application/api/BackendApi/AuthApi'
import NoMatch from './components/NoMatch/NoMatch'
import QuestPlaymode from './components/QuestPlaymode/QuestPlaymode'

import { Api } from './application/app'
import HomeSpace from "./components/Admin/AdminHomspace/Homespace";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";

const themes = {
  dark: `${process.env.PUBLIC_URL}/dark-theme.css`,
  light: `${process.env.PUBLIC_URL}/light-theme.css`,
};

function App () {
  useEffect(() => {
    Api.Auth.login()
  })

  return (
    <Provider store={store}>
      <ThemeSwitcherProvider themeMap={themes} defaultTheme="light" insertionPoint="styles-insertion-point">
        <Router>
          <div className={'container'}>
            <Header/>
            <div className={'add-space'}>
              <Switch>
                <Route path="/invites/:id" exact component={InvitePage}/>
                <Route path="/quests/:id" exact component={QuestPage}/>
                <Route path="/quests/:id/edit-Tasks" exact component={EditableTaskList}/>
                <Route exact path={'/quests/:id/play'} component={QuestPlaymode}/>
                <Route path="/quests/:id/progressboard" exact component={Progressboard}/>
                <Route path="/adminspace" exact component={HomeSpace}/>
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
      </ThemeSwitcherProvider>
    </Provider>
  )
}

export default App

