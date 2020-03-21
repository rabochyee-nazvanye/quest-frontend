import React from "react";
import { Timeline } from 'antd';

function QuestTimeline(props) {
    return (
        <React.Fragment>
            <Timeline>

                <Timeline.Item>Окончание регистрации {props.quest.registrationDeadline}</Timeline.Item>
                <Timeline.Item>Старт квеста {props.quest.startDate}</Timeline.Item>
                <Timeline.Item>Завершение квеста 2015-09-01</Timeline.Item>
            </Timeline>
        </React.Fragment>
    );
}

export default QuestTimeline