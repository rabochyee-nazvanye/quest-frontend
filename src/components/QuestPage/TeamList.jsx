import React, { Component } from 'react'
import Teammate from "./Teammate";
import {Col, Row, Divider} from "antd";

function MapTeammatesToTemplate(teammates) {
    return teammates.map((obj) =>
        <Col key={'quest:' + obj.name} span={6}>
            <Teammate name={obj.name} />
        </Col>
    )
}

function TeamList(props) {
    return (
        <React.Fragment>
            <Divider />
            <h2>Твоя команда: team.name</h2>
            <Row>
                {MapTeammatesToTemplate([{name: 'lalka_anka'}, {name: 'tramakarov'}, {name: 'toplenboren'}, {name: 'usernamedt'}])}
            </Row>
        </React.Fragment>
    )
}

export default TeamList