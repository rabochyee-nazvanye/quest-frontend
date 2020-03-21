import React from "react";
import { Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const { Meta } = Card;

function QuestCard(props) {
    return (
        <React.Fragment>
            <Card
                style={{ width: 300 }}
                cover={
                    <img
                        alt={props.quest.name + ' картинка'}
                        src={props.quest.imageUrl}
                    />
                }
            >
                <Meta
                    title={props.quest.name}
                    description={props.quest.description}
                />
            </Card>,
        </React.Fragment>
    );
}

export default QuestCard;
