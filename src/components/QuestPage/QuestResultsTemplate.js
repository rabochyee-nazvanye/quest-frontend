import React from 'react'
import { Divider } from 'antd'
import './QuestResults.css'


function QuestResultsTemplate(props) {
    return <React.Fragment>
        <p>&nbsp;</p>
        <Divider/>
        <div className={'about'}>
            {props.heading}
        </div>
        <h3>
            <div className={'quest-descript'}>
                {props.description}
            </div>
        </h3>
        <div className={'first-col'}></div>
        <div className={'second-col'}></div>
        {props.results}
    </React.Fragment>
    //TODO(lalka-anka): soon I will add here paddings for 2 table columns
}

export default QuestResultsTemplate
