import React from 'react'
import { Avatar, Button, Divider } from 'antd'
import { UserOutlined, PlusOutlined } from '@ant-design/icons'
import QuestsList from './QuestsList'
import { CLIENT_URL } from '../../../settings'
import MetaTags from '../../shared/MetaTags/MetaTags'
import './AccountTemplate.css'

function getAvatar(avatarUrl) {
  if (avatarUrl === null) {
    return <Avatar size={128} icon={<UserOutlined />} />
  } else {
    return <Avatar size={128} src={avatarUrl} />
  }
}

function AccountTemplate(props) {
  const metaData = {
    title: 'Мой профиль',
    description: '',
    keywords: 'квест',
    robots: '',
    canonicalUrl: CLIENT_URL,
  }
  return (
    <React.Fragment>
      <MetaTags metaData={metaData} />
      <section className={'account__avatar-container'}>
        {getAvatar(props.user.avatarUrl)}
        <div className='avatar-container__greetings'>
          <p> Привет, &#160;@{props.user.name}! </p>
          <Button
            onClick={props.admin}
            type='primary'
            icon={<PlusOutlined style={{ color: '#ffffff' }} />}
          >
            Создать квест
          </Button>
        </div>
      </section>
      <Divider />
      <QuestsList />
    </React.Fragment>
  )
}

export default AccountTemplate
