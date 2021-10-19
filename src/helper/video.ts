//@ts-nocheck
const ACTION_TYPE_ATTRIBUTE = 1; //动作类型 修改元素属性
const ACTION_TYPE_ELEMENT = 2; //动作类型 元素增减
const ACTION_TYPE_MOUSE = 3; //动作类型 元素增减

/**
 * dom和actions可JSON.stringify()序列化后传递到后台
 */
function JSVideo() {
  this.id = 1;
  this.idMap = new Map(); //唯一标识和元素之间的映射
  this.dom = this.serialization(document.documentElement);
  console.log("序列化", this.dom);
  console.log("map", this.idMap);
  this.currentObserve = null;
  this.actions = []; //动作日志
  this.mouseTimer = null; //鼠标timer
  this.observer();
  this.observerInput();
  this.observerMouse();
}

JSVideo.prototype = {
  /**
   * DOM序列化
   */
  serialization(parent) {
    if (parent.tagName === "SCRIPT") {
      return null;
    }
    let element = this.parseElement(parent);
    if (parent.children.length == 0) {
      parent.textContent && (element.textContent = parent.textContent);
      return element;
    }
    Array.from(parent.children, (child) => {
      element.children.push(this.serialization(child));
    });
    return element;
  },
  /**
   * 将元素解析成可序列化的对象
   */
  parseElement(element, id) {
    if (!element) {
      return null;
    }
    let attributes = {};
    for (const { name, value } of Array.from(element.attributes)) {
      attributes[name] = value;
    }
    if (!id) {
      //解析新元素才做映射
      id = this.getID();
      console.log("getID", element, id);
      this.idMap.set(element, id); //元素为键，ID为值
    }
    return {
      children: [],
      id: id,
      tagName: element.tagName.toLowerCase(),
      attributes: attributes,
    };
  },
  /**
   * DOM反序列化
   */
  deserialization(obj) {
    if (!obj) {
      return null;
    }
    let element = this.createElement(obj);
    if (obj.children.length == 0) {
      return element;
    }
    obj.children.forEach((child) => {
      const el = this.deserialization(child);
      if (el) {
        element.appendChild(el);
      }
    });
    return element;
  },
  /**
   * 将对象解析成元素
   */
  createElement(obj) {
    if (!obj) {
      return null;
    }
    let element = document.createElement(obj.tagName);
    if (obj.id) {
      this.idMap.set(obj.id, element); //ID为键，元素为值
    }
    for (const name in obj.attributes) {
      element.setAttribute(name, obj.attributes[name]);
    }
    obj.textContent && (element.textContent = obj.textContent);
    return element;
  },
  /**
   * 唯一标识
   */
  getID() {
    return this.id++;
  },
  /**
   * 序列化后的DOM
   */
  getDOM() {
    return this.dom;
  },
  /**
   * 监控元素变化
   */
  observer() {
    this.currentObserve = new MutationObserver((mutations) => {
      console.log(mutations);
      mutations.forEach((mutation) => {
        const { type, target, oldValue, attributeName, addedNodes, removedNodes } = mutation;
        console.log(type);

        switch (type) {
          case "attributes":
            const value = target.getAttribute(attributeName);
            console.log("attributes", value);
            this.setAttributeAction(target);
            break;
          case "childList":
            this.setAttributeAction(target, {
              type: ACTION_TYPE_ELEMENT,
              //新增的node 保存的是序列化的dom
              addedNodes: Array.from(addedNodes, (el) =>
                this.serialization(el)
              ),
              //删除的node 保存的是node 对应的id
              removedNodes: Array.from(removedNodes, (el) =>
                this.idMap.get(el)
              ),
            });
        }
      });
    });
    this.currentObserve.observe(document, {
      childList: true, // 是否观察子节点的变动
      subtree: true, // 是否观察所有后代节点的变动
      attributes: true, // 是否观察属性的变动
      attributeOldValue: true, // 是否观察属性的变动的旧值
      characterData: true, // 是否节点内容或节点文本的变动
      characterDataOldValue: true, // 是否节点内容或节点文本的变动的旧值
      // attributeFilter: ['class', 'src'] 在此数组中的属性变化时将被忽略
    });
    //this.currentObserve.disconnect();
  },
  // 监听鼠标
  observerMouse() {
    const mouse = document.createElement('div')
      mouse.className = 'app-mouse';
      doc.body.appendChild(mouse)
    this.mouseTimer = setInterval(() => {
      console.log('add ACTION_TYPE_MOUSE',);

      this.actions.push({
        type: ACTION_TYPE_MOUSE,
        timestamp: Date.now(),
        pageX: Math.round(Math.random() * 800),
        pageY: Math.round(Math.random() * 800)
      })
    }, 2000)
  },
  /**
   * 监控文本框的变化
   */
  observerInput() {
    const original = Object.getOwnPropertyDescriptor(
      HTMLInputElement.prototype,
      "value"
    ),
      _this = this;
    //监控通过代码更新的value属性
    Object.defineProperty(HTMLInputElement.prototype, "value", {
      set(value) {
        console.log("defineProperty", value);
        setTimeout(() => {
          _this.setAttributeAction(this); //异步调用，避免阻塞页面
        }, 0);
        original.set.call(this, value); //执行原来的set逻辑
      },
    });
    //捕获input事件
    document.addEventListener(
      "input",
      (event) => {
        const { target } = event;
        let text = target.value;
        console.log("input", text);
        this.setAttributeAction(target);
      },
      {
        capture: true, //捕获
      }
    );
  },
  /**
   * 配置修改属性的动作
   */
  setAttributeAction(element, otherParam = {}) {
    let attributes = {
      type: ACTION_TYPE_ATTRIBUTE,
      ...otherParam,
    };
    element.value && (attributes.value = element.value);
    console.log("setAttributeAction", attributes);
    this.setAction(element, attributes);
  },
  /**
   * 配置修改动作
   */
  setAction(element, otherParam = {}) {
    //由于element是对象，因此Map中的key会自动更新
    const id = this.idMap.get(element);
    console.log("idMap", "tagId", id, element);
    const action = Object.assign(
      this.parseElement(element, id),
      { timestamp: Date.now() },
      otherParam
    );
    this.actions.push(action);
    console.log("actions", this.actions);
    console.log("idMap", this.idMap);
  },
  getActions() {
    return this.actions;
  },
  /**
   * 回放
   */
  replay() {
    if (this.actions.length == 0) return;
    console.log("new idMap", this.idMap);
    console.log("all actions", this.actions);

    const timeOffset = 16.7; //一帧的时间间隔大概为16.7ms
    let startTime = this.actions[0].timestamp; //开始时间戳
    const state = () => {
      const action = this.actions[0];
      console.log("action", action);

      let element = this.idMap.get(action.id);
      if (!element && action.type !== ACTION_TYPE_MOUSE) {
        //取不到的元素 且不是鼠标动作 直接停止动画
        return;
      }
      //console.log("state action", action, this.actions.length);
      if (startTime >= action.timestamp) {
        this.actions.shift();
        switch (action.type) {
          //属性
          case ACTION_TYPE_ATTRIBUTE:
            console.log("action>>>>>> attributes", action.id, element);
            for (const name in action.attributes) {
              //更新属性
              element.setAttribute(name, action.attributes[name]);
            }
            //触发defineProperty拦截，拆分成两个插件会避免该问题
            action.value && (element.value = action.value);
            break;

          //节点修改
          case ACTION_TYPE_ELEMENT:
            console.log("action>>>>>>> element", action.id, element);
            //添加节点
            action.addedNodes.forEach((ch) => {
              let el = this.createElement(ch);
              console.log('++添加节点', ch, el);
              element.appendChild(el);
            });
            //删除节点
            action.removedNodes.forEach((id) => {
              let el = this.idMap.get(id);
              console.log('--删除节点', id, el);
              element.removeChild(el);
            });
            break;

          //鼠标
          case ACTION_TYPE_MOUSE:
            console.log("action>>>>>>> mouse", action);
            break;
        }
      }
      startTime += timeOffset; //最大程度的模拟真实的时间差
      console.log(
        ">>>>>剩余动作:",
        this.actions.length,
        "tagId:",
        action.id,
        "startTime:",
        startTime
      );
      if (this.actions.length > 0) {
        //当还有动作时，继续调用requestAnimationFrame()
        requestAnimationFrame(state);
      }
    };
    state();
  },
  /**
   * 创建iframe还原页面
   */
  createIframe() {
    //停止监听
    this.currentObserve.disconnect();
    window.clearInterval(this.mouseTimer)

    let iframe = document.createElement("iframe");
    iframe.setAttribute("sandbox", "allow-same-origin");
    iframe.setAttribute("scrolling", "no");
    iframe.setAttribute("style", "pointer-events:none; border:0;");
    iframe.width = `${window.innerWidth}px`;
    iframe.height = `${document.documentElement.scrollHeight}px`;
    iframe.onload = () => {
      const doc = iframe.contentDocument,
        root = doc.documentElement,
        html = this.deserialization(this.dom); //反序列化
      //根元素属性附加
      for (const { name, value } of Array.from(html.attributes)) {
        root.setAttribute(name, value);
      }
      root.removeChild(root.firstElementChild); //移除head
      root.removeChild(root.firstElementChild); //移除body
      Array.from(html.children).forEach((child) => {
        root.appendChild(child);
      });
      //加个定时器只是为了查看方便
      setTimeout(() => {
        this.replay();
      }, 2000);
    };
    document.body.appendChild(iframe);
  },
};

export default JSVideo;
