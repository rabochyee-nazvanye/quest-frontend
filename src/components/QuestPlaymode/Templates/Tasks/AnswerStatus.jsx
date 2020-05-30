import React from 'react';
import PropTypes from 'prop-types';

export default function AnswerStatus(props) {
    const TASK_ATTEMPT_COLORS = {
        Yellow: '#e0c538',
        Red: '#ff4f33',
        Green: '#4bb735'
    };

    const TASK_ATTEMPT_STATUSES = {
        Error: 'error',
        OnReview: 'onreview',
        Accepted: 'accepted'
    };

    const getAdminComment = () => {
        if (props.adminComment === null || props.adminComment === '') {
            return <React.Fragment />;
        }
        return (
            <span>
                {' / Комментарий: '}
                {props.adminComment}
            </span>
        );
    };

    const getStatusString = () => {
        switch (props.status) {
            case TASK_ATTEMPT_STATUSES.Error:
                return (
                    <span style={{ color: TASK_ATTEMPT_COLORS.Red }}>
                        Неправильный ответ
                    </span>
                );
            case TASK_ATTEMPT_STATUSES.OnReview:
                return (
                    <span style={{ color: TASK_ATTEMPT_COLORS.Yellow }}>
                        Ответ проверяется модератором. Это займёт некоторое
                        время
                    </span>
                );
            case TASK_ATTEMPT_STATUSES.Accepted:
                return (
                    <span style={{ color: TASK_ATTEMPT_COLORS.Green }}>
                        Зачтено
                    </span>
                );
            default:
                return <React.Fragment />;
        }
    };

    return (
        <React.Fragment>
            {getStatusString()}
            {getAdminComment()}
        </React.Fragment>
    );
}

AnswerStatus.propTypes = {
    lastSubmittedAnswer: PropTypes.string,
    manualVerificationEnabled: PropTypes.bool,
    status: PropTypes.string,
    adminComment: PropTypes.string
};
