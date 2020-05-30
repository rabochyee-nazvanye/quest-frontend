import React from 'react'
import { Divider, Row } from 'antd'
import './QuestResults.css'


function QuestResultsTemplate(props) {
    return <React.Fragment>
        <p>&nbsp;</p>
        <Divider/>
        <div className={'about'}>
            {props.heading}
        </div>
        <h3>
            <div className={'quest-description'}>
                {props.description}
            </div>
        </h3>
        <Row gutter={[16, 16]} type="flex">
            {props.col1}
            {props.col2}
        </Row>;
    </React.Fragment>
}

export default QuestResultsTemplate
