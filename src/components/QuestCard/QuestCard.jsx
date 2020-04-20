import React from 'react'
import { Card } from 'antd'

const { Meta } = Card

function QuestCards (props) {
  return (
    <React.Fragment>
      <Card
        hoverable
        style ={{ margin: '10px 20px' }}
        cover={
          <img
            alt={props.quest.name + ' картинка'}
            src={props.quest.imageUrl}
          />
        }
      >
        <Meta
          title={props.quest.name}
        />
        <p>
          {props.quest.description}
        </p>
      </Card>
    </React.Fragment>
  )
}

export default QuestCards
