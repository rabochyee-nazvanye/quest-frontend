import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Avatar, Typography, Button, Modal, Input } from 'antd'
import { ArrowLeftOutlined, DeleteOutlined } from '@ant-design/icons'
import './QuestMinimalInfo.css'
import CoverPicture from '../shared/CoverPicture/CoverPicture'
import { deleteWithToken } from '../../application/api/BackendApi/CommonApi'
import { BASE_URL } from '../../settings'

const { Title } = Typography

function QuestMinimalInfo(props) {
  const [visible, setVisible] = useState(false)
  const [deleteQuest, setDeleteQuest] = useState(false)
  const [disabled, setDisabled] = useState(true)

  const history = useHistory()

  const handleDeleteQuest = () => {
    deleteWithToken(BASE_URL + '/Quests/' + props.quest.id).then((r) => {
      if (r.status === 200) {
        history.push('/')
      } else {
        console.log('Произошла ошибка, попробуйте еще раз')
      }
    })
  }

  const handleChange = (e) => {
    if (e.target.value === props.quest.name) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }

  // TODO: на бэке и здесь в некоторых местах поменять imageUrl » image
  return (
    <React.Fragment>
      {!props.isEditable &&
        (props.quest.imageUrl ? (
          <CoverPicture url={props.quest.imageUrl} />
        ) : (
          <div className='default-img' />
        ))}
      <div>&#160;</div>
      <div className='header'>
        <Title>{props.quest.name}</Title>
        {props.user && props.quest && props.user.id === props.quest.author.id && (
          <Button
            type='primary'
            danger
            ghost
            icon={<DeleteOutlined />}
            onClick={() => setVisible(true)}
          >
            Удалить квест
          </Button>
        )}
      </div>
      <Modal
        visible={visible}
        footer={null}
        title={null}
        onCancel={() => setVisible(false)}
        centered
        className='delete-modal'
      >
        <h1>Удалить {props.quest.name}?</h1>
        <Button type='primary' onClick={() => setVisible(false)}>
          Нет, вернуться к квесту
        </Button>
        <Button
          type='primary'
          danger
          ghost
          onClick={() => setDeleteQuest(true)}
        >
          Да, я хочу удалить квест
        </Button>
      </Modal>
      <Modal
        visible={deleteQuest}
        footer={null}
        title={null}
        onCancel={() => setDeleteQuest(false)}
        centered
        className='confirm-delete-modal'
      >
        <h1>Вы точно уверены?</h1>
        <p>
          Это действие будет невозможно отменить. Это привёдет к безвозвратному
          удалению квеста {props.quest.name} вместе с описанием, списком
          участников и заданиями. <br /> <br />
          Чтобы подтвердить удаление введите <b>{props.quest.name}</b>:
        </p>
        <Input onChange={handleChange} />
        <Button
          type='primary'
          danger
          ghost
          onClick={handleDeleteQuest}
          disabled={disabled}
        >
          Я понимаю последствия и хочу удалить этот квест
        </Button>
      </Modal>
      {props.isEditable && (
        <Link to={'/quests/' + props.quest.id}>
          <Button
            type={'default'}
            size={'small'}
            style={{ borderColor: '#ffffff', color: '#1890ff' }}
            icon={<ArrowLeftOutlined />}
          >
            Вернуться к квесту
          </Button>
        </Link>
      )}
      <h4 className='issuer-info'>
        Организатор: {props.quest.author.name}{' '}
        <Avatar src={props.quest.author.avatarUrl} size={'small'} />{' '}
      </h4>
    </React.Fragment>
  )
}

export default QuestMinimalInfo
