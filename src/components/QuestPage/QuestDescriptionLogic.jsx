import React, {Component} from 'react'
import './QuestDescription.css'
import ReactMarkdown from 'react-markdown'
import QuestDescriptionTemplate from './QuestDescriptionTemplate'
import AboutQuestIcon from '../shared/Icons/AboutQuestIcon'

class GuestDescription extends Component {
    getRepresentationByState () {
        let heading;
        let description;
        let results;
        heading = <AboutQuestIcon/>;
        description = <ReactMarkdown source={this.props.quest.description}/>;

        return <QuestDescriptionTemplate heading={heading}
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
