import React, {Component} from 'react'
import './QuestDescription.css'
import QuestDescriptionTemplate from './QuestDescriptionTemplate'

class GuestDescription extends Component {
    getRepresentationByState () {
        let description;
        description = this.props.quest.description

        return <QuestDescriptionTemplate heading='Про квест'
                                         description={description}/>
    }
    render () {
        return (
            <React.Fragment>
                {this.getRepresentationByState()}
            </React.Fragment>)
    }
}

export default GuestDescription