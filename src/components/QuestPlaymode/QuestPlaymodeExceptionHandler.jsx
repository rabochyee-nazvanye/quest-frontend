import React from 'react';
import PropTypes from 'prop-types';
import ErrorPage from '../shared/ErrorPage/ErrorPage';

export default function QuestPlaymodeExceptionHandler(props) {
    return (
        <ErrorPage
            code={props.exception.status}
            description={props.exception.title}
        />
    );
}

QuestPlaymodeExceptionHandler.propTypes = {
    exception: PropTypes.object,
};
