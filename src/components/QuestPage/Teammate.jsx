import React from 'react'
import { Avatar } from 'antd';
import { UserOutlined, StarFilled } from '@ant-design/icons';

function Teammate(props) {
    if (props.name === props.captainName) {
        return (
            <React.Fragment>

                    <Avatar icon={<UserOutlined />} size={'default'} />
                    &nbsp;
                    &nbsp;
                    {props.name + " "}
                    <StarFilled style = {{color: "#91d5ff"}}/>

            </React.Fragment>
        )
    } else {
        return (
            <React.Fragment>
                <Avatar icon={<UserOutlined />} size={'default'} />
                &nbsp;
                &nbsp;
                {props.name}
            </React.Fragment>
        )
    }
}

export default Teammate