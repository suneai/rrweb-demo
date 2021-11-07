import React , { } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import { ComponentsRouter } from '../../config/routerConfig';
import './index.css';

const { Content } = Layout;


const IndexPage = () => {

    const routerView = () => {
        return ComponentsRouter.map((item, index) => (
            <Route key={index} path={item.path} component={item.component} />
        ))
    }

    return (
        <Layout>
            <Content style={{ padding: '24px', minHeight: 280 }}>
                <Switch>
                    {routerView()}
                    <Redirect to='/' />
                </Switch>
            </Content>
        </Layout>
    )

}

export default IndexPage;