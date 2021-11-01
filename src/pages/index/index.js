import React , { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { ComponentsRouter } from '../../config/routerConfig';
import { headerNavList , subMenuList } from './schame'
import './index.css';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;


const IndexPage = () => {

    const [currentNav,setCurrentNav] = useState(['sune'])
    const [currentSubMenuItem,setCurrentSubMenuItem] = useState(['rrweb'])
    const navView = () => {
        return headerNavList.map((item) => (
            <Menu.Item key={item.name} onClick={() => setCurrentNav([item.name])}>{item.name}</Menu.Item>
        ))
    }
    const navsubMenuView = () => {
        return subMenuList.map((item) => (
            <Menu.Item key={item.name} onClick={() => setCurrentSubMenuItem([item.name])}>{item.name}</Menu.Item>
        ))
    }

    const routerView = () => {
        return ComponentsRouter.map((item, index) => (
            <Route key={index} path={item.path} component={item.component} />
        ))
    }

    return (
        <Layout>
            <Header className="header">
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={currentNav}>
                    {navView()}
                </Menu>
            </Header>
            <Content style={{ padding: '0 30px' }}>
                <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
                    <Sider className="site-layout-background" width={200}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['rrweb']}
                            defaultOpenKeys={currentSubMenuItem}
                            style={{ height: '100%' }}
                        >
                            <SubMenu key="sub1" icon={<UserOutlined />} title="关于rrweb的demo">
                                {navsubMenuView()}
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Content style={{ padding: '0 24px', minHeight: 280 }}>
                        <Switch>
                            {routerView()}
                            <Redirect to='/' />
                        </Switch>
                    </Content>
                </Layout>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    )

}

export default IndexPage;