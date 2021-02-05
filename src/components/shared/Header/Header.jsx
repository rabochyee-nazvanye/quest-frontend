import React from 'react'
import { useHistory } from 'react-router-dom'
import { Divider, PageHeader } from 'antd'
import { connect } from 'react-redux'
import { logout } from '../../../application/api/BackendApi/AuthApi'
import UserButton from './UserButton/UserButton'
import QuestspaceIcon from '../Icons/QuestspaceIcon'
import './Header.css'

import { Api } from '../../../application/app'
import {useThemeSwitcher} from "react-css-theme-switcher";

function Header (props) {
  const history = useHistory()

  const { currentTheme } = useThemeSwitcher();

  const _resolveQuestSpaceIconColor = () => {
      if (currentTheme === 'light') {
          return 'dark'
      } else {
          return 'light'
      }
  }

  return (
    <React.Fragment>
      <PageHeader
        ghost={false}
        className={'header__padding-zero'}
        title={ <QuestspaceIcon color={_resolveQuestSpaceIconColor()} /> }
        extra={[
          <div className={'header__addition'}>
            <UserButton/>
          </div>
        ]}
      />
      <Divider className={"header__divider"}/>
    </React.Fragment>
  )
}

const mapStateToProps = (store) => ({
  loggedIn: store.authReducer.user !== null
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(Api.Auth.logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
