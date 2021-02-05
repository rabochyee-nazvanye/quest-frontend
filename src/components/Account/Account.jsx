import React from 'react'
import connect from 'react-redux/es/connect/connect'
import { Redirect } from 'react-router-dom'
import AccountTemplate from './AccountTemplate/AccountTemplate';
import {CLIENT_URL} from "../../settings";
import MetaTags from "../shared/MetaTags/MetaTags";


function Account (props) {
  if (!props.loggedIn) {
    return (<Redirect to={'/auth'}/>)
  }

  return (
      <AccountTemplate user={props.user}/>
  )
};


const mapStateToProps = (store) => ({
  loggedIn: store.authReducer.user !== null,
  user: store.authReducer.user
})

export default connect(mapStateToProps, null)(Account)
