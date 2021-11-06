# web record 页面录屏
#### 运行:
1, npm i 或者 yarn

2, npm run start 或者 yarn start

## 实现原理:

### 录屏:

1, 记录页面初次快照(把初始dom 序列化解析成虚拟dom, 对象结构).

2, 通过 Map 数据结构 建立关联, 录屏时候, map.set(element, id); //元素为键，ID为值, 可用于关联元素增量动作, 或者记录id (可用于回放时候删除节点). 

3, 通过 MutationObserver api 监听 dom 变化, 通过事件监听 记录鼠标, 输入框, 等事件, 然后把处理成增量action动作(加上时间戳, 队列结构, 先进先出).

4, 结束时候, 停止监听, 解绑一些监听事件.


### 回放:

1, 在沙箱模式回放, 创建一个 iframe.

2, 把页面快照反序列化 创建刚开始录屏时候的页面, (过滤一些元素，如 script), 反序列化时也使用map, 这个时候是map.set(id, element), 动作记录里包含id, 可用于执行动作找到对应元素.

3, requestAnimationFrame 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行.

4, 用一个time变量保存第一个动作时间戳, 累加屏幕刷新率 约1000/60, 当时间大于当前动作时候, 队列前面的动作出队, 根据类型执行该动作, 随着time时间增加, 动作队列也逐渐减少, 没有剩余动作时候结束回放.

## 演示:

![录屏2](https://user-images.githubusercontent.com/42299982/140603659-f6d229eb-de89-45fe-81ec-a0820084492c.gif)


**录屏页面**:

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d727a8f5ba7b45cea0513c8f4e4793f4~tplv-k3u1fbpfcp-watermark.image?)

**回放页面**:

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e1bf5393ca3f409a8850f91755748d61~tplv-k3u1fbpfcp-watermark.image?)
