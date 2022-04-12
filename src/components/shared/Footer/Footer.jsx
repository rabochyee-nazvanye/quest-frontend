import React from 'react'
import Image from './images/footerImg.png'
import './Footer.css'
import { Header } from '../Header/Header.jsx'
import QuestspaceIcon from '../Icons/QuestspaceIcon'

function Footer(props) {
  return (
    <React.Fragment>
      <div
        className={'footer'}
        style={{ backgroundImage: 'url(' + Image + ')' }}
      >
        <div className={'container'}>
          <div className={'main-text'}>
            <QuestspaceIcon color='light' width='296' height='37' />
          </div>
          <div className={'mini-text'}>
            сделано с ❤️ в 2020 году ребятами с матмеха урфу
          </div>
          <div className={'link'}>
            <a href='https://github.com/lalka-anka'> Аня </a>{' '}
          </div>
          <div className={'link'}>
            <a href='https://github.com/tramakarov'> Егор </a>{' '}
          </div>
          <div className={'link'}>
            <a href='https://github.com/usernamedt'> Даниил </a>{' '}
          </div>
          <div className={'link'}>
            <a href='https://github.com/toplenboren'> Миша </a>{' '}
          </div>
          <div className={'link'}>
            <a href='https://github.com/pornoiya'> Таня </a>{' '}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
export default Footer
