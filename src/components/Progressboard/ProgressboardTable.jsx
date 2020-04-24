import React, { Component } from 'react'
import { Table } from 'antd';

export default function ProgressboardTable(props) {
    return (<Table columns={props.columns} dataSource={props.data} size="middle" scroll={{ x:2000, y: 700 }} bordered pagination={false} />)
}