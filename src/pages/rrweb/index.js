import React, { Component } from 'react'
import { Space, Card, Button, Input } from 'antd';
import { RedditOutlined, UserDeleteOutlined } from '@ant-design/icons';
import { record , Replayer } from 'rrweb'
import rrwebPlayer from 'rrweb-player'
import luImg from '../../images/lu.webp'
import './index.css'

const { Search } = Input;

let stopFun = null
let eventsList = []
class RRWebPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listData: [],
        }
        this.playRef = null
    }

    // [录制与回放](https://github.com/rrweb-io/rrweb/blob/master/docs/recipes/record-and-replay.zh_CN.md)
    // 录制
    handleRecord = () => {
        let tempEvents = []
        stopFun = record({
            emit(event) {
                console.info(event,'记录 DOM 树在各个时间点上的状态')
                // 保存获取到的 event 数据
                tempEvents.push(event)
                eventsList = tempEvents
            }
        })
    }

    // 回放
    handleReplay = () => {
        // 停止录制
        stopFun && stopFun()
        const self = this
        console.log(eventsList)
        new rrwebPlayer({
            target: self.playRef,
            props: {
                events: eventsList,
                showController: false,
            },
          })
    }

    // 添加行
    handleAdd = (e) => {
        // e.stopPropagation()
        const { listData } = this.state
        let tempList = listData
        if (e) {
            tempList.push(e)
            this.setState({ listData: tempList })
        }
    }

    // 删除行
    deleteItem = (index) => {
        const { listData } = this.state
        let tempList = listData
        tempList.splice(index, 1)
        this.setState({ listData: tempList })
    }

    // 行view
    listView = () => {
        const { listData } = this.state
        return listData.map((item, index) => (
            <Space key={index} style={{ margin: '10px 0', textAlign: 'center', border: '1px dotted #AAA' }}>
                <RedditOutlined style={{ margin: '0 10px' }} />
                <span style={{ display: 'inline-block', width: '25px', overflow: 'hidden' }}>{item}</span>
                <UserDeleteOutlined onClick={() => this.deleteItem(index)} style={{ marginLeft: 160, paddingRight: 10 }} />
            </Space>
        ))
    }

    render() {
        const { listData } = this.state
        return (
            <Space direction="vertical" className="site-layout-background" style={{ padding: 24, width:'100%', minHeight: '82vh', background: '#Fff' }}>
                <Space size={10}>
                    <Button onClick={this.handleRecord} type="primary">录制</Button>
                    <Button onClick={this.handleReplay}>回放</Button>
                </Space>
                <Space size={8}>
                    <Card title="edit" style={{ width: 300 }}>
                        <Search
                            placeholder="input search text"
                            allowClear
                            enterButton="添加"
                            size="samll"
                            onSearch={(e) => this.handleAdd(e)}
                        />
                        {
                            (listData.length > 0) ?
                                this.listView() :
                                <p style={{ margin: '10px 0', padding: '30px 0', textAlign: 'center', border: '1px dotted #AAA' }}>暂无数据</p>
                        }
                    </Card>
                    <Card title="replay" style={{ Width: 300 }}>
                        <img src={luImg} style={{ Width: 300 }} alt='lu'/>
                    </Card>
                </Space>
                <Space size={8}>
                    <Card title="replay" style={{ minWidth: 300 }}>
                        <div ref={ nodeRef => this.playRef = nodeRef }></div>
                    </Card>
                </Space>
            </Space>
        )
    }
}

export default RRWebPage