import React from 'react'
import {Avatar, Button, Card, Steps, Typography} from 'antd'
import ProgressiveImage from "react-progressive-image";
import {
    CheckCircleOutlined,
    CheckOutlined,
    EnvironmentTwoTone,
    Loading3QuartersOutlined,
    PlayCircleFilled
} from "@ant-design/icons";
import {getToken} from "../../redux/Actions/Api";

const { Meta } = Card;
const {Text} = Typography;

function getMeta(quest) {
    const commonOptions = {
        month: 'numeric', day: 'numeric'
    };
    const startTime = new Intl.DateTimeFormat('default', commonOptions).format(new Date(quest.startDate)).toString();

    if (quest.status === "scheduled") {
        return (
            <>{startTime} | <Loading3QuartersOutlined style={{color: '#faad14'}}/> <Text style={{color: '#faad14'}}>идёт регистрация</Text></>
        )
    }
    else if (quest.status === "inprogress"){
        return (
            <>{startTime} | <PlayCircleFilled style={{color: '#52c41a'}}/> <Text style={{color: '#52c41a'}}>сейчас</Text></>
        )
    }
    else if (quest.status === "registrationover")
    {
        return (
            <>{startTime} | <CheckCircleOutlined style={{color: '#1890ff'}}/> <Text style={{color: '#1890ff'}}>регистрация завершена</Text></>
        )
    }
    else {
        return (
            <>{startTime} | <CheckCircleOutlined style={{color: '#8c8c8c'}}/> <Text style={{color: '#8c8c8c'}}>завершён</Text></>
        )
    }
}

function QuestCards (props) {

  return (
    <React.Fragment>
      <Card
        hoverable
        style ={{ margin: '10px 20px' }}
        cover={
            <ProgressiveImage src={props.quest.imageUrl} placeholder="tiny-image.jpg">
                {src => <img height={"200px"} style={{ objectFit: "cover"}}
                             alt={props.quest.name + ' картинка'}
                    src={src}
                />}
            </ProgressiveImage>
        }
      >
        <Meta
          title={props.quest.name}
        />
        {getMeta(props.quest)}
      </Card>
    </React.Fragment>
  )
}

export default QuestCards
