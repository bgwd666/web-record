import { EActionType, IAction, ISerializationDom } from './publicType';
import virtualDom from './virtualDom';

class WebRecord extends virtualDom {
  public initDom: ISerializationDom | undefined;
  public currentObserve: MutationObserver | null = null;
  public actionList: IAction[] = []; //动作
  public mouseTimer: number = 0; //鼠标timer;
  public observerMouseBindFun: (e: MouseEvent) => void; //监听鼠标函数;
  public observerInputBindFun: (e: Event) => void; //监听鼠标函数;

  constructor() {
    super();
    // 解决 addEventListener 里面this指向问题, 及解除绑定
    this.observerMouseBindFun = this.observerMouse.bind(this);
    this.observerInputBindFun = this.observerInput.bind(this);
  }

  /**
   * 开始录制
   */
  start() {
    // 监听dom
    this.observer();
    //记录首次屏幕快照
    this.initDom = this.serialization(document.documentElement);
    // 监听鼠标
    window.addEventListener('mousemove', this.observerMouseBindFun);
    // 监听输入框
    window.addEventListener('input', this.observerInputBindFun, {
      capture: true, //捕获
    });
    console.log('序列化', this.initDom);
    console.log('map', this.idMap);
  }

  /**
   * 结束录制
   */
  end() {
    //停止监听
    this.currentObserve?.disconnect();
    // 停止鼠标监听
    window.removeEventListener('mousemove', this.observerMouseBindFun);
    //停止监听输入框
    window.removeEventListener('input', this.observerInputBindFun, {
      capture: true, //捕获
    });
    // 保存本地
    const recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]');
    recordList.push({
      initDom: this.initDom,
      actionList: this.actionList,
      time: new Date().toLocaleString(),
    });
    window.localStorage.setItem('recordList', JSON.stringify(recordList));
    // 重置
    this.reset();
  }

  /**
   * 重置信息 可录制新的
   */
  reset() {
    this.id = 1;
    this.idMap.clear();
    this.initDom = undefined;
    this.actionList = [];
  }

  /**
   * 监控元素变化
   */
  observer() {
    this.currentObserve = new MutationObserver((mutations) => {
      console.log(mutations);
      mutations.forEach((mutation) => {
        const { type, target, oldValue, attributeName, addedNodes, removedNodes } = mutation;
        console.log(type);
        const targetNode = target as Element;

        switch (type) {
          case 'attributes':
            const value = targetNode.getAttribute(attributeName!);
            console.log('attributes', value);
            this.setAction(targetNode, { type: EActionType.ACTION_TYPE_ATTRIBUTE });
            break;

          case 'childList':
            this.setAction(targetNode, {
              type: EActionType.ACTION_TYPE_ELEMENT,
              //新增的node 保存的是序列化的dom
              addedNodes: Array.from(addedNodes, (el) => this.serialization(el as Element)),
              //删除的node 保存的是node 对应的id
              removedNodes: Array.from(removedNodes, (el) => this.idMap.get(el as Element)),
            });
            break;

          case 'characterData':
            // 文本变化 target 是文本, parentNode是容器
            this.setAction(targetNode.parentNode as Element, {
              type: EActionType.ACTION_TYPE_TEXT,
              //@ts-ignore
              newText: targetNode.parentNode.textContent,
            });
            break;
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
  }

  /**
   * 监听鼠标
   * @param e MouseEvent
   */
  observerMouse(e: MouseEvent) {
    if (Date.now() - this.mouseTimer > 100) {
      console.log(e);
      this.mouseTimer = Date.now();
      this.setAction(document.body, {
        type: EActionType.ACTION_TYPE_MOUSE,
        timestamp: Date.now(),
        pageX: e.clientX,
        pageY: e.clientY,
      });
    }
  }

  /**
   * 监听输入框
   */
  observerInput(e: Event) {
    this.setAction(e.target as HTMLInputElement, {
      type: EActionType.ACTION_TYPE_INPUT,
      inputValue: (e.target as HTMLInputElement).value
    });
  }

  /**
   * 配置修改动作
   */
  setAction(element: Element, otherParam: { type: EActionType; [key: string]: any }) {
    //由于element是对象，因此Map中的key会自动更新
    const id = this.idMap.get(element) as number;
    console.log(
      '+++++++setAction+++++',
      'type:',
      EActionType[otherParam.type],
      otherParam,
      'target',
      element,
    );
    const action = Object.assign(
      this.parseElement(element, id),
      { timestamp: Date.now() },
      otherParam,
    );
    this.actionList.push(action);
    console.log('all__actions', this.actionList);
    console.log('all__idMap', this.idMap);
  }
}

export default WebRecord;
