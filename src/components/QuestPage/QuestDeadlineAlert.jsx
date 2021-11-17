import React from 'react'
import {Alert} from "antd";
import PropTypes from 'prop-types'

/** Draws the alert with time to complete in hours */
export default function QuestDeadlineAlert({deadline}) {

    /**
     * Appends a leading zero if needed
     * @param {Any} value
     * @returns {string}
     * @private
     */
    function _appendLeadingZero(value) {
        const needToAppendLeadingZero = value.toString().length === 1
        if (needToAppendLeadingZero) {
            return '0' + value.toString()
        }
        return value
    }

    function _processDeadline(deadline) {
        const result = new Date(deadline);
        return `${_appendLeadingZero(result.getDate())}.${_appendLeadingZero(result.getMonth() + 1)}.${result.getFullYear()}, ${_appendLeadingZero(result.getHours())}:${_appendLeadingZero(result.getMinutes())}`
    }

    if (Date.now() > Date.parse(deadline)) {
        return <Alert
            type={'error'}
            showIcon={true}
            message={
                <><b>Ответы на задания больше не принимаются</b></>
            }
            style={{margin: '30px 0'}}
        />
    } else {
        return <Alert
            type={'warning'}
            showIcon={true}
            message={
                <><b>Дедлайн отправки ответов — {_processDeadline(deadline)}</b></>
            }
            style={{margin: '30px 0'}}
        />
    }
}

QuestDeadlineAlert.propTypes = {
    deadline: PropTypes.string.isRequired // ISO formatted string
}

QuestDeadlineAlert.defaultProps = {
    deadline: 0
}