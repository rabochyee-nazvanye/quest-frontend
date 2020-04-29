import React from 'react'
import QuestTimelineInfo from './QuestTimelineInfo'
import {Col, Row, Steps} from 'antd'
import "./QuestTimeline.css"
const {Step} = Steps;

function RegDescription(props) {
    return <div className={"description"}>{props}</div>
}
function QuestTimelineDrawing(props) {
    let buttons = QuestTimelineInfo(props)["buttons"];
    let statusDescripts = QuestTimelineInfo(props)["elements"];
    let regDeadline = QuestTimelineInfo(props)["reg"];
    let startTime = QuestTimelineInfo(props)["start"];
    let endTime = QuestTimelineInfo(props)["end"];
    let status = props.quest.status;
    return(
            <React.Fragment>
                <Row style={{marginTop: "15px"}} gutter={[16, 16]}>
                    <Col span={6}>
                        <div style={{width: "100%"}}>
                            <div className={'status-layout'} style={{"color": statusDescripts[status]["color"]}}>{statusDescripts[status]["pin"]} &#160;{statusDescripts[status]["comment"]}
                            </div>
                            <div className={'button-layout'}>
                                {buttons[status]}
                            </div>
                        </div>
                    </Col>
                    <Col span={16}>
                        <Steps current={statusDescripts[status]["step"]}>
                            <Step title="Регистрация" subTitle="" description={RegDescription(regDeadline)}/>
                            <Step title="Старт" subTitle={statusDescripts[status]["subtitle"]} description={startTime}/>
                            <Step title="Завершение" description={endTime}/>
                        </Steps>
                    </Col>
                </Row>
            </React.Fragment>
    )
}

export default QuestTimelineDrawing
