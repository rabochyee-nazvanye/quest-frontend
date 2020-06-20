import React from 'react'
import { Button, Alert, message } from 'antd'
import "./QuestTimeline.css"
import {useHistory} from 'react-router-dom'
import {getToken} from "../../api/CommonApi";
import {closeErrorMessage} from "../../redux/Actions/QuestRegistrationActions";
import {handleSoloQuestSubscription} from "../../api/QuestRegistrationApi";
import {connect} from "react-redux";

function InfiniteQuestTemplate(props) {
    const history = useHistory();

    const error = () => {
        if (props.statusText !== '') {
            message.error(props.statusText);
        }

    };

    return (
        <React.Fragment>
            { error() }
            <Button type="primary"
                    htmlType="submit"
                    className="button"
                    onClick={
                        () => {
                            if (getToken() === '') {
                                history.push("/auth/" + encodeURIComponent(props.url))
                            }
                            if (props.userSubscribed) {
                                    history.push("/quests/" + props.quest.id + "/play")
                            } else {
                                props.handleSoloQuestSubscription(props.quest.id)
                                history.push("/quests/" + props.quest.id + "/play")
                            }
                        }
                    }>
                Открыть задания
            </Button>
        </React.Fragment>
    )
}

const mapStateToProps = (store) => ({
    userSubscribed: store.questRegistrationReducer.userSubscribed,
    statusText: store.questRegistrationReducer.statusText,
    redirectToTasks: store.questRegistrationReducer.redirectToTasks
})

const mapDispatchToProps = dispatch => ({
    closeErrorMessage: () => dispatch(closeErrorMessage()),
    handleSoloQuestSubscription: (questId) => dispatch(handleSoloQuestSubscription(questId))
})

export default connect(mapStateToProps, mapDispatchToProps)(InfiniteQuestTemplate)
