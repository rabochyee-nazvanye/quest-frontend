import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import { SendOutlined } from '@ant-design/icons';

export default function AnswerInput(props) {
    const ANSWER_ACCEPTED_STATUS = 'accepted';
    const [disabled, setDisabled] = useState(false)

    if (props.answerStatus === ANSWER_ACCEPTED_STATUS) {
        return (
            <div className={'quest-answer-input__container '}>
                <Input.Search
                    disabled={true}
                    enterButton=<SendOutlined />
                onSearch={(value) => value}
                placeholder={props.lastSubmittedAnswer}
                />
            </div>
        );
    }
    return (
        <div className={'quest-answer-input__container'}>
            <Input.Search
                disabled={disabled}
                loading={disabled}
                enterButton=<SendOutlined />
            onSearch={(value) => {
            if (value !== '') {
                props.sendAnswer(value);
                setDisabled(true)
                setTimeout(() => setDisabled(false), 5000)
            }
        }}
            placeholder={props.lastSubmittedAnswer}
            />
        </div>
    );
}

AnswerInput.propTypes = {
    sendAnswer: PropTypes.func,
    answerStatus: PropTypes.string,
    manualVerificationEnabled: PropTypes.bool,
    lastSubmittedAnswer: PropTypes.string
};