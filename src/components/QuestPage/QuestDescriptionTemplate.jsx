import React from 'react'
import { Divider } from 'antd'
import './QuestBottom.css'


function QuestDescriptionTemplate(props) {
    return <React.Fragment>
        <p>&nbsp;</p>
        <Divider/>
        <div className={'about'}>
            {props.heading}
            <h3>
                <div className={'quest-descript'}>
                    {props.description}
                </div>
            </h3>
        </div>
        <p>&nbsp;</p>
        {props.results}
    </React.Fragment>
}

export default QuestDescriptionTemplate