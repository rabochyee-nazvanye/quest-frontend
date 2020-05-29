import React from 'react'
import { Divider } from 'antd'
import './QuestDescription.css'


function QuestDescriptionTemplate(props) {
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
    </React.Fragment>
}

export default QuestDescriptionTemplate