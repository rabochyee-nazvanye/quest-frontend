import React from 'react'
import './QuestCreatorControls.css'
import { ToolOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'

import { Button, Divider } from 'antd'

export default function QuestCreatorControls({ quest, user }) {
  const history = useHistory()

  if (user && quest && user.id === quest.author.id) {
    return (
      <>
        <div className={'quest-creator-controls__container'}>
          <Button
            icon={<ToolOutlined />}
            type='primary'
            onClick={() => history.push(`${quest.id}/edit`)}
            ghost
          >
            Управление квестом
          </Button>
        </div>
        <Divider />
      </>
    )
  }
  return null
}
