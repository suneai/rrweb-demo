
# rrweb 打开web页面录制与回放的黑盒

#### `web` 录制回放基础库`rrweb`，它是将页面中的DOM以及用户操作保存为可序列化的数据，用以实现远程回放。用于前端的异常监控以及对应数据的收集

### rrweb应用场景

1. 记录用户使用产品的方式并加以分析，进一步优化产品
2. 采集用户遇到的bug操作路径，予以复现
3. 记录CI环境中的e2e测试的执行情况。
4. 录制体积更小、清晰无损的产品演示。

### rrweb回放的基础：DOM快照

页面中的视图状态可以通过 DOM 树的形式描述，所以当我们尝试录制⼀个⻚⾯时，我们实际上是在记录 DOM 树在各个时间点上的状态，在 rrweb 中我们称⼀次这样的状态记录为⼀个快照。

### rrweb的序列化

如果仅仅需要在本地录制和回放，那么我们可以简单地深拷⻉ DOM。例如以下的代码：
```
// deep clone document element
const docEl = document.documentElement.cloneNode(true);
// replay later
document.replaceChild(docEl, document.documentElement);
```

以上效果可以在拉取 [github链接](https://github.com/suneai/rrweb-demo) 代码查看`http://localhost:3000/test`下面的demo，这里我们称之为`本地录制和回放的demo`，后面我们会结合这个demo讲到关于快照diff优化。

我们通过将 DOM 对象深克隆在内存中就实现了快照。

但是这个快照对象本⾝并不是可序列化的，因此我们不能将其保存为特定的⽂本格式（例如 JSON）进⾏传输，也就⽆法做到远程录制。所谓不可序列化是指虽然我们可以通过 innerHTML 等⽅式获取到描述 DOM 的⽂本格式，但其中会丢失⼀些视图状态，例如 `<input/> `元素的 value 就不⼀定会记录在 HTML 中。

#### `rrweb的 非标准的序列化`
其实序列化最终的目的是为了对象可以跨平台存储，和进行网络传输。rrweb实现了⼀个“⾮标准”的序列化⽅法。此部分代码需要运⾏在被录制的⻚⾯中，要尽可能的控制代码量，只保留必要功能。所以该方法会做如下处理：

1. 去脚本化，被录制⻚⾯中的所有 JavaScript 都不应该被执⾏。

2. 记录没有反映在 HTML 中的视图状态。例如 `<input type="text" />` 输⼊后的值不会反映在其 HTML中，我们需要读取其 value 值并加以记录。

3. 相对路径转换为绝对路径。回放时⻚⾯ URL为重放⻚⾯的地址，如果被录制⻚⾯中有⼀些相对路径就会产⽣错误。

4. 尽量记录 CSS 样式表的内容。如果被录制⻚⾯加载了⼀些同源的样式表，我们则可以获取到解析好的 CSS rules，录制时将能获取到的样式都 inline 化，这样可以让⼀些内⽹环境（如 localhost）的录制也有⽐较好的回放效果。

### 基于快照diff的优化思路
我们查看`本地录制和回放的demo`，会发现如果我们设置的时间间隔很短，就会产生大量重复的快照，这样子会导致视频文件很大，如果很长，又可能会遗漏重要的视图变更，所以优化快照主要有两个点；
1. 应该基于导致视图的变更制作快照。
2. 要控制录制结果的体积。
#### 录制

```
npm install --save rrweb

import { record } from "rrweb";

```

#### 回放 使用 rrweb-player

```
npm install --save rrweb-player

import rrwebPlayer from 'rrweb-player';
import 'rrweb-player/dist/style.css';
```

###### 使用

> 通过 props 传入 events 数据及配置项

```
new rrwebPlayer({
  target: document.body, // 可以自定义 DOM 元素
  // 配置项
  props: {
    events,
  },
});

```

###### rrweb 使用demo

[github链接](https://github.com/suneai/rrweb-demo)

###### 参考文档

[rrweb文档链接](https://github.com/rrweb-io/rrweb/blob/master/guide.zh_CN.md)
[参考文档](https://juejin.cn/post/7011320139366793253)
[参考文档](https://zhuanlan.zhihu.com/p/60639266)
[参考文档](https://juejin.cn/post/6844903925213036552)
[react的路由配置](https://blog.csdn.net/hbiao68/article/details/98736501)
[favicon的制作](https://tool.lu/favicon/)
