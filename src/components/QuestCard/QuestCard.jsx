import React from 'react'
import { Card } from 'antd'
import ProgressiveImage from "react-progressive-image";

const { Meta } = Card

function QuestCards (props) {
  return (
    <React.Fragment>
      <Card
        hoverable
        style ={{ margin: '10px 20px' }}
        cover={
            <ProgressiveImage src={props.quest.imageUrl} placeholder="tiny-image.jpg">
                {src => <img
                    alt={props.quest.name + ' картинка'}
                    src={src}
                />}
            </ProgressiveImage>
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
