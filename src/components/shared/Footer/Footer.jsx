import React from 'react'
import Image from './images/footerImg.png'
import IconImage from './images/iconWhite.svg'
import './Footer.css'
import { Header } from '../Header/Header.jsx'
import { Layout, Breadcrumb } from 'antd'
import QuestspaceIcon from "../Icons/QuestspaceIcon";

function Footer (props) {
  return (
    <React.Fragment>
      <div className={'footer'} style={ { backgroundImage: 'url(' + Image + ')' } }>
        <div className={'container'}>
          <div className={'main-text'}>
            <QuestspaceIcon color="#000000" width="416" height="37"/>
          </div>
          <div className={'mini-text'}>
              лучший банк для предпринимателей × лучший сервис для квестов = ❤
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
export default Footer
