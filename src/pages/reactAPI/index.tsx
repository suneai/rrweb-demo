import React, { Component } from "react";
import { Card } from 'antd';
import RefItem from './components/RefItem'
import ClassRefItem from './components/ClassRefItem'
import ForwardRefItem from './components/ForwardRefItem'

const ReactDemo = (props: { [x: string]: any; }) => {
    const { ...refProps } = props

    const fRef = React.createRef()

    return (
        <div>
            <Card size="small" title="ref 回调函数" extra={<a href="#">More</a>} style={{ width: 300 }}>
                <div>ref回调函数是为类设置一个属性来访问DOM元素的常见模式,接收一个基础的DOM元素作为其参数,来存储对DOM节点的引用</div>
                <RefItem/>
            </Card>
            <Card size="small" title="ref与class组件" extra={<a href="#">More</a>} style={{ width: 300 }}>
                <div>当 ref 被传递给 render 中的元素时，对该节点的引用可以在 ref 的 current 属性中被访问</div>
                <ClassRefItem/>
            </Card>
            <Card size="small" title="ref与函数组件" extra={<a href="#">More</a>} style={{ width: 300 }}>
                <div>Refs 是使用 React.createRef() 创建的，并通过 ref 属性附加到 React 元素</div>
                <div>当 ref 被传递给 render 中的元素时，对该节点的引用可以在 ref 的 current 属性中被访问</div>
                <ForwardRefItem ref={fRef}/>
            </Card>
        </div>
    )
}

export default ReactDemo