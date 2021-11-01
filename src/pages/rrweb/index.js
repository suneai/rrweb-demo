import React, { Component } from 'react'
import { Space, Card, Button, Input } from 'antd';
import { RedditOutlined, UserDeleteOutlined } from '@ant-design/icons';
import { record , Replayer } from 'rrweb'
import rrwebPlayer from 'rrweb-player'

const { Search } = Input;

let stopFun = null
class RRWebPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listData: [],
            eventsList: []
        }
        this.playRef = null
    }

    // [录制与回放](https://github.com/rrweb-io/rrweb/blob/master/docs/recipes/record-and-replay.zh_CN.md)
    // 录制
    handleRecord = () => {
        let tempEvents = []
        const self = this
        stopFun = record({
            emit(event) {
                // 保存获取到的 event 数据
                tempEvents.push(event)
                self.setState({ eventsList: tempEvents })
            }
        })
    }

    // 回放
    handleReplay = () => {
        // 停止录制
        stopFun && stopFun()
        const self = this
        const { eventsList } = this.state
        console.log(eventsList)
        new rrwebPlayer({
            target: self.playRef,
            props: {
                events: eventsList,
                showController: false,
            },
          })
        // const events = eventsList
        // const replayer = new Replayer(events);
        // replayer.play();

    }

    // 添加行
    handleAdd = (e) => {
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
                <span style={{ display: 'inline-block', width: '35px', overflow: 'hidden' }}>{item}</span>
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
                <Space size={8} direction="vertical">
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
                    <Card title="replay" style={{ width: 300 }}>
                        <p ref={ nodeRef => this.playRef = nodeRef }></p>
                    </Card>
                </Space>
            </Space>
        )
    }
}

export default RRWebPage