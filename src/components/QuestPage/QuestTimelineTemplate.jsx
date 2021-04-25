import React from 'react'
import {Col, Row, Steps} from 'antd'
import "./QuestTimeline.css"
const {Step} = Steps;

function RegDescription(props) {
    return <div className={"description"}>{props}</div>
}
function QuestTimelineTemplate(props) {
    const isMobile = window.innerWidth <= 600;
    let currentDirection = isMobile ? "vertical" : undefined;

    return (
        <React.Fragment>
            <div className='row-style'> <Row gutter={[16, 16]} type="flex">
                <Col span={6} xs={12} md={6}>
                    <div className='col-style'>
                        <div className={'status-layout'}
                             style={{"color": props.color}}>{props.pin} &#160;{props.comment}
                        </div>
                        <div className={'button-layout'}>
                            {props.buttons}
                        </div>
                    </div>
                </Col>
                <Col span={16}>
                    <Steps current={props.step} direction={ currentDirection }>
                        <Step title="Регистрация" subTitle="" description={RegDescription(props.reg)}/>
                        <Step title="Старт" subTitle={props.subtitle} description={props.start}/>
                        <Step title="Завершение" description={props.end}/>
                    </Steps>
                </Col>
            </Row></div>
        </React.Fragment>
    )
}

export default QuestTimelineTemplate