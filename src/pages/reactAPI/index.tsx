import React, { Component } from "react";
import { Card, Space } from 'antd';
import RefItem from './components/RefItem'
import ClassRefItem from './components/ClassRefItem'
import ForwardRefItem from './components/ForwardRefItem'

const ReactDemo = (props: { [x: string]: any; }) => {
    const { ...refProps } = props

    const fRef = React.createRef()

    return (
        <Space direction="vertical">
            <div>关于ref</div>
            <Space size={8}>
                <Card size="small" title="ref 回调函数" style={{ width: 300 }}>
                    <div>ref回调函数是为类设置一个属性来访问DOM元素的常见模式,这个函数中接受 React 组件实例或 HTML DOM 元素作为参数，以使它们能在其他地方被存储和访问.</div>
                    <div>如果是组件作为参数，可以直接调用组件上的方法，或取其参数，如果是在函数组件里面，可以在current上访问方法或属性</div>
                    <RefItem />
                </Card>
                <Card size="small" title="ref与class组件" style={{ width: 300 }}>
                    <div>当 ref 被传递给 render 中的元素时，对该节点的引用可以在 ref 的 current 属性中被访问</div>
                    <ClassRefItem />
                </Card>
                <Card size="small" title="ref与函数组件" style={{ width: 300 }}>
                    <div>Refs 是使用 React.createRef() 创建的，并通过 ref 属性附加到 React 元素</div>
                    <div>当 ref 被传递给 render 中的元素时，对该节点的引用可以在 ref 的 current 属性中被访问</div>
                    <ForwardRefItem ref={fRef} />
                </Card>
            </Space>
        </Space>
    )
}

export default ReactDemo