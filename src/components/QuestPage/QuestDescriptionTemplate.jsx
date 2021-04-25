import React from 'react'
import { Divider } from 'antd'
import ReactMarkdown from 'react-markdown'
// import './QuestDescription.css'


function QuestDescriptionTemplate(props) {
    return <React.Fragment>
        <Divider />
        <h2 className={'about'}>{props.heading}</h2>
        <ReactMarkdown className={'quest-descript'}>{props.description}</ReactMarkdown>
    </React.Fragment>
}

export default QuestDescriptionTemplate