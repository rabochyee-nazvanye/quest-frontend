import React from 'react';
import CoverPicture from '../../../shared/CoverPicture/CoverPicture';
import { Tooltip } from 'antd';
import PropTypes from 'prop-types';
import './MetaInfoPlaymode.css';

function TooltipBotTemplate() {
    return (
        <span>
            Нужен для авторизации в боте:{' '}
            <a href={'https://tglink.ru/questspacebot'}>@questspacebot</a>
        </span>
    );
}

export default function MetaInfoPlaymode(props) {
    return (
        <React.Fragment>
            <CoverPicture url={props.quest.imageUrl} />
            <h1 className={'title__main'}>
                {props.quest.name}
                <span className={'title__low-opacity'}> /Задания</span>
            </h1>
            <h2 className={'title__subtitle title__blue title__close '}>
                Команда: {props.team.name}{' '}
                <span className={'title__black title__low-opacity'}> | </span>
                <Tooltip title={<TooltipBotTemplate />}>
                    <span className={'title__underscored'}>
                        {props.team.inviteCode}
                    </span>
                </Tooltip>
            </h2>
        </React.Fragment>
    );
}

MetaInfoPlaymode.propTypes = {
    quest: PropTypes.object,
    team: PropTypes.object,
};
