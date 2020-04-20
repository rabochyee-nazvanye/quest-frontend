import React from 'react'
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

function Teammate(props) {
    return (
        <React.Fragment>
            <h3><Avatar icon={<UserOutlined />} size={'default'} /> {props.name}</h3>
        </React.Fragment>
    )
}

export default Teammate