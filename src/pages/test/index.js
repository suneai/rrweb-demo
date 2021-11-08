import React, { Component } from 'react'
import { Layout, Space, Card, Button, Input } from "antd";
import { RedditOutlined, UserDeleteOutlined } from "@ant-design/icons";

const { Sider, Content } = Layout;
const { Search } = Input;

let events = []
let timers
class TestPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listData: [],
        };
    }

    handleRecord = () => {
        timers = setInterval(() => {
            const docEl = document.documentElement.cloneNode(true);
            console.info(docEl, 'docel')
            events.push(docEl)
        },100)
    }

    handleReplay = () => { 
        clearInterval(timers)
        const len = events.length
        for (let i = 0; i < len; i++) {
            const docEl = events[i]
            setTimeout(() => {
                document.replaceChild(docEl, document.documentElement);
            },10)
        }

    }

    // 添加行
    handleAdd = (e) => {
        // e.stopPropagation()
        const { listData } = this.state;
        let tempList = listData;
        if (e) {
            tempList.push(e);
            this.setState({ listData: tempList });
        }
    };

    // 删除行
    deleteItem = (index) => {
        const { listData } = this.state;
        let tempList = listData;
        tempList.splice(index, 1);
        this.setState({ listData: tempList });
    };

    // 行view
    listView = () => {
        const { listData } = this.state;
        return listData.map((item, index) => (
            <Space
                key={index}
                style={{
                    margin: "10px 0",
                    textAlign: "center",
                    border: "1px dotted #AAA",
                }}
            >
                <RedditOutlined style={{ margin: "0 10px" }} />
                <span
                    style={{
                        display: "inline-block",
                        width: "45px",
                        height: "26px",
                        lineHeight: "26px",
                        fontSize: "12px",
                        overflow: "hidden",
                    }}
                >
                    {item}
                </span>
                <UserDeleteOutlined
                    onClick={() => this.deleteItem(index)}
                    style={{ marginLeft: 10, paddingRight: 10 }}
                />
            </Space>
        ));
    };

    render() {
        const { listData } = this.state;

        return (
            <Layout
                direction="vertical"
                className="site-layout-background"
                style={{
                    padding: 24,
                    width: "100%",
                    minHeight: "94vh",
                    background: "#Fff",
                }}
            >
                <Sider
                    width={300}
                    style={{ background: "#fff" }}
                    className="site-layout-background"
                >
                    <Space size={10} style={{ margin: "5px auto" }}>
                        <Button onClick={this.handleRecord} size="small" type="primary">录制</Button>
                        <Button onClick={this.handleReplay} size="small" type="primary">回放</Button>
                    </Space>
                    <Space size={8} direction="vertical" style={{ margin: "5px auto" }}>
                        <Card
                            title="编辑数据"
                            style={{
                                paddingBottom: "5px",
                                width: 240,
                            }}
                        >
                            <Search
                                placeholder="input search text"
                                allowClear
                                enterButton="添加"
                                size="samll"
                                onSearch={(e) => this.handleAdd(e)}
                            />
                            {listData.length > 0 ? (
                                this.listView()
                            ) : (
                                <p
                                    style={{
                                        margin: "10px 0",
                                        padding: "30px 0",
                                        textAlign: "center",
                                        border: "1px dotted #AAA",
                                    }}
                                >
                                    暂无数据
                                </p>
                            )}
                        </Card>
                    </Space>
                </Sider>
                <Content>
                    <div ref={(nodeRef) => (this.playRef = nodeRef)}></div>
                </Content>
            </Layout>
        )
    }
}

export default TestPage