import React from 'react'
import QuestTimelineInfo from './QuestTimelineInfo'
import {Button, Col, Row, Steps} from 'antd'
import "./QuestTimeline.css"
import {useHistory} from 'react-router-dom'
const {Step} = Steps;


function RegDescription(props) {
    return <div className={"description"}>{props}</div>
}
function QuestTimelineDrawing(props) {
    const history = useHistory();
    let buttons = QuestTimelineInfo(props)["buttons"];
    let statusDescripts = QuestTimelineInfo(props)["elements"];
    let regDeadline = QuestTimelineInfo(props)["reg"];
    let startTime = QuestTimelineInfo(props)["start"];
    let endTime = QuestTimelineInfo(props)["end"];
    let status = props.quest.status;
    if (props.timeFlag !== "isInfinite") {
        return (
            <React.Fragment>
                <Row style={{marginTop: "15px"}} gutter={[16, 16]}>
                    <Col span={6}>
                        <div style={{width: "100%"}}>
                            <div className={'status-layout'}
                                 style={{"color": statusDescripts[status]["color"]}}>{statusDescripts[status]["pin"]} &#160;{statusDescripts[status]["comment"]}
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
    else {
        //это так не останется, но пока что тут сделано через ass
        return <Button type="primary" htmlType="submit" className="button" onClick={() => {history.push("/quests/" + props.quest.id + "/play")}}>Открыть задания</Button>
    }
}

export default QuestTimelineDrawing
