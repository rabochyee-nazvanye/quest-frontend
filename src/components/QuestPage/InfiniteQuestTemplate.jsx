import React from 'react'
import {Button} from 'antd'
import "./QuestTimeline.css"
import {useHistory} from 'react-router-dom'

function InfiniteQuestTemplate(props) {
    const history = useHistory();
        return <Button type="primary" htmlType="submit" className="button" onClick={() => {history.push("/quests/" + props.quest.id + "/play")}}>Открыть задания</Button>
}

export default InfiniteQuestTemplate
