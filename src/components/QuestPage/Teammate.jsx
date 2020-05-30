import React from 'react'
import { Avatar } from 'antd';
import { UserOutlined, StarFilled } from '@ant-design/icons';
import './TeamList.css'

function Teammate(props) {
    const avatar = ()=> {
        if (props.member.avatarUrl !== null) {
            return(<Avatar src={props.member.avatarUrl} size={'default'} />)
        } else {
            return (<Avatar icon={<UserOutlined />} size={'default'} />)
        }
    }

    if (props.member.name === props.captainName) {
        return (
            <React.Fragment>
                    {avatar()}
                    &nbsp;
                    &nbsp;
                    {props.member.name + " "}
                    <div className='captain-icon'>
                        <StarFilled/>
                    </div>

            </React.Fragment>
        )
    } else {
        return (
            <React.Fragment>
                {avatar()}
                &nbsp;
                &nbsp;
                {props.member.name}
            </React.Fragment>
        )
    }
}

export default Teammate