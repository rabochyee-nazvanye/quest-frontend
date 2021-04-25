import React from 'react'
import {Alert} from "antd";
import PropTypes from 'prop-types'

/** Draws the alert with time to complete in hours */
export default function QuestWithDeadlineAlert({timeToCompleteInMinutes}) {

    /** Resolves form of word hours using Russian Language Rules! */
    function _resolve_hours_word(value, words=['час','часа','часов']){
        value = Math.abs(value) % 100;
        const num = value % 10;
        if(value > 10 && value < 20) return words[2];
        if(num > 1 && num < 5) return words[1];
        if(num === 1) return words[0];
        return words[2];
    }

    if (typeof timeToCompleteInMinutes === 'number' && timeToCompleteInMinutes !== 0) {

        const questTimeToCompleteInHours = Math.floor(timeToCompleteInMinutes / 60)

        return <Alert
            type={'warning'}
            showIcon={true}
            message={
                <><b>Время на прохождение квеста ограничено</b></>
            }
            description={<>У вас будет <b>{questTimeToCompleteInHours} {_resolve_hours_word(questTimeToCompleteInHours)}</b> на все задания</>}
            style={{margin: '30px 0'}}
        />
    }
    return null
}

QuestWithDeadlineAlert.propTypes = {
    timeToCompleteInMinutes: PropTypes.number.isRequired
}

QuestWithDeadlineAlert.defaultProps = {
    timeToCompleteInMinutes: 0
}