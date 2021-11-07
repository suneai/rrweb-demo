import React, { Component } from "react";
import { Layout, Space, Card, Button, Input } from "antd";
import { RedditOutlined, UserDeleteOutlined } from "@ant-design/icons";
import { record } from "rrweb";
import rrwebPlayer from "rrweb-player";
import "rrweb-player/dist/style.css";
import "./index.css";
const { Sider, Content } = Layout;
const { Search } = Input;

let stopFun = null;
let eventsList = [];
class RRWebPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
    };
    this.playRef = null;
  }

  // [录制与回放](https://github.com/rrweb-io/rrweb/blob/master/docs/recipes/record-and-replay.zh_CN.md)
  // 录制
  handleRecord = () => {
    let tempEvents = [];
    stopFun = record({
      emit(event) {
        console.info(event, "记录 DOM 树在各个时间点上的状态");
        // 保存获取到的 event 数据
        tempEvents.push(event);
        eventsList = tempEvents;
      },
    });
  };

  // 回放
  handleReplay = () => {
    // 停止录制
    stopFun && stopFun();
    const self = this;
    // console.log(eventsList);
    new rrwebPlayer({
      target: self.playRef,
      width: 250,
      height: 576,
      speedOption: [1, 2, 4, 8],
      props: {
        events: eventsList,
        showController: false,
      },
    });
  };

  // 重置
  handleReset = () => {
    this.playRef = null;
    stopFun = null;
    eventsList = [];
  };

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
            <Button onClick={this.handleRecord} type="primary">
              录制
            </Button>
            <Button onClick={this.handleReplay}>回放</Button>
            <Button onClick={this.handleReset}>重置</Button>
          </Space>
          <Space size={8} direction="vertical" style={{ margin: "5px auto" }}>
            <Card
              title="编辑数据"
              style={{
                paddingBottom: "5px",
                width: 240,
                height: 240,
                overflowX: "hidden",
                overflowY: "scroll",
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
            <Card hoverable title="回放配置" style={{ width: 240 }}>
              <Card.Meta
                title="播放器宽度*高度"
                description={<div>1024*576</div>}
              />
              <Card.Meta
                title="是否自动播放"
                description={
                  <>
                    <div>是</div>
                    <div>否</div>
                  </>
                }
              />
              <Card.Meta
                title="倍速播放可选值"
                description={<div>[1, 2, 4, 8]</div>}
              />
            </Card>
          </Space>
        </Sider>
        <Content>
          <div ref={(nodeRef) => (this.playRef = nodeRef)}></div>
        </Content>
      </Layout>
    );
  }
}

export default RRWebPage;
