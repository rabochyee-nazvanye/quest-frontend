import React, { Component } from 'react'
import ProgressboardTable from "./ProgressboardTable";
import {Button, Spin, Typography, Result, Divider} from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import {BASE_URL, CLIENT_URL} from '../../settings'
import { getToken } from '../../application/api/BackendApi/CommonApi.js';
import {Link} from "react-router-dom";
import QuestMinimalInfo from "../QuestPage/QuestMinimalInfo";
import MetaTags from "../shared/MetaTags/MetaTags";


const { Title, } = Typography

class Progressboard extends Component {
    constructor (props) {
        super(props)
        this.state = {
            dataReady: false,
            success: null,
            quest: null,
            data: null
        }
    }

    componentDidMount () {
        // eslint-disable-next-line react/prop-types
        const token = getToken();

        fetch(BASE_URL + '/quests/' + this.props.match.params.id)
            .then(response => response.json())
            .then(readResponse => {this.setState({ dataReady: false, quest: readResponse})})

        let response = fetch(BASE_URL + '/quests/' + this.props.match.params.id + '/progressboard', {
            method: 'GET',
            headers: {
                'Authorization': 'bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    response.json().then(data => this.setState({data: data, dataReady: true, success: true}));
                } else {
                    response.json().then(data => this.setState({ data: { status: data.status, errorText: data.title }, dataReady: true, success: false}))
                }
            })


    }

    getRepresentationByState () {

        if (!this.state.dataReady) {
            return <Spin/>
        } else if(this.state.success && this.state.dataReady) {
            const metaData = {
                title: this.state.quest.name + " — лидерборд",
                description: "",
                keywords: "квест",
                robots:"",
                canonicalUrl: CLIENT_URL
            };
            return (
                <React.Fragment>
                    <MetaTags metaData={metaData} />
                    <QuestMinimalInfo quest={this.state.quest}/>
                    <Link to ={'/quests/' + this.state.quest.id} >
                        <Button type={'default'}
                                size={'small'}
                                style={{"border-color": "#ffffff", "color": "#1890ff"}}
                                icon={<ArrowLeftOutlined />}
                        >
                            Вернуться к квесту
                        </Button>
                    </Link>
                    <Divider><Title level={3}>Лидерборд</Title></Divider>
                    {ProgressboardTable(this.state.data)}
                </React.Fragment>
                )
        } else {
            return (<Result
                status="warning"
                title={this.state.data.errorText}
                extra={[
                    <React.Fragment>
                        <Link to ='/' >
                            <Button type={'primary'} size={'large'} >ОК</Button>
                        </Link>
                    </React.Fragment>
                ]}
            />)
        }
    }

    render () {
        return (
            <React.Fragment>
                {this.getRepresentationByState()}
            </React.Fragment>
        )
    }
}

export default Progressboard
