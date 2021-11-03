
# rrweb 打开web页面录制与回放的黑盒
#### `web` 录制回放基础库`rrweb`，它是将页面中的DOM以及用户操作保存为可序列化的数据，用以实现远程回放。用于前端的异常监控以及对应数据的收集。

[rrweb](https://github.com/rrweb-io/rrweb/blob/master/guide.zh_CN.md)
#### 基于`LogRocket`一个像素级的录制与回放工具，做的二次封装。

[LogRocket](https://logrocket.com/)

### 应用场景
1. 记录用户使用产品的方式并加以分析，进一步优化产品
2. 采集用户遇到的bug操作路径，予以复现
3. 记录CI环境中的e2e测试的执行情况。
4. 录制体积更小、清晰无损的产品演示。

### 回放的基础：DOM快照
页面中的视图状态可以通过 DOM 树的形式描述，所以当我们尝试录制⼀个⻚⾯时，我们实际上是在记录 DOM 树在各个时间点上的状态，在 rrweb 中我们称⼀次这样的状态记录为⼀个快照。

### 序列化
`非标准的序列化`
1. 去脚本化，被录制⻚⾯中的所有 JavaScript 都不应该被执⾏。

2. 记录没有反映在 HTML 中的视图状态。例如 <input type="text" /> 输⼊后的值不会反映在其 HTML中，我们需要读取其 value 值并加以记录。

3. 相对路径转换为绝对路径。回放时⻚⾯ URL为重放⻚⾯的地址，如果被录制⻚⾯中有⼀些相对路径就会产⽣错误。

4. 尽量记录 CSS 样式表的内容。如果被录制⻚⾯加载了⼀些同源的样式表，我们则可以获取到解析好的 CSS rules，录制时将能获取到的样式都 inline 化，这样可以让⼀些内⽹环境（如 localhost）的录制也有⽐较好的回放效果。















# rrweb 使用demo
[参考文档](https://zhuanlan.zhihu.com/p/60639266)
[参考文档](https://juejin.cn/post/6844903925213036552)

[react的路由配置](https://blog.csdn.net/hbiao68/article/details/98736501)

[favicon的制作](https://tool.lu/favicon/)