import React from 'react'
import {Button} from 'antd'
import "./QuestTimeline.css"
import {useHistory} from 'react-router-dom'
import {getToken} from "../../api/CommonApi";
import {UserAddOutlined} from "@ant-design/icons";

function InfiniteQuestTemplate(props) {
    const history = useHistory();
    // TODO(tramakarov) add default registration to solo quest
    // TODO(lalka-anka) same shit
    //ниже просто копипаст обчной формы для реги, можно это убрать
    let registration = <Button type="primary"
            htmlType="submit"
            className="button"
            style={{ "background-color": "#52c41a", "border-color": "#52c41a" }}
            onClick={
                () => {
                    if (getToken() === '') {
                        history.push("/auth/" + encodeURIComponent(props.url))
                    } else {
                        props.openForm()
                    }
                }
            }
    >
        <UserAddOutlined />
        Зарегистрироваться
    </Button>;
    let open = <Button type="primary"
                       htmlType="submit"
                       className="button"
                       onClick={
                           () => {
                               history.push("/quests/" + props.quest.id + "/play")
                           }
                       }>
        Открыть задания
    </Button>;
    if (props.registered === true)
        return open;
    else return registration
}

export default InfiniteQuestTemplate
