import { EActionType, IAction, ISerializationDom } from './publicType';
import virtualDom from './virtualDom';

class WebRecord extends virtualDom {
  public initDom: ISerializationDom | undefined;
  public currentObserve: MutationObserver | null = null;
  public actionList: IAction[] = []; //动作
  public mouseTimer: number = 0; //鼠标timer;
  public observerMouseBindFun: (e: MouseEvent) => void; //监听鼠标函数;

  constructor() {
    super();
    // 解决 addEventListener 里面this指向问题, 及解除绑定
    this.observerMouseBindFun = this.observerMouse.bind(this);
  }

  /**
   * 开始录制
   */
  start() {
    this.observer();
    this.initDom = this.serialization(document.documentElement);
    // 监听鼠标
    window.addEventListener('mousemove', this.observerMouseBindFun);
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

        switch (type) {
          case 'attributes':
            const value = (target as Element).getAttribute(attributeName!);
            console.log('attributes', value);
            this.setAttributeAction(target as Element);
            break;
          case 'childList':
            this.setAttributeAction(target as Element, {
              type: EActionType.ACTION_TYPE_ELEMENT,
              //新增的node 保存的是序列化的dom
              addedNodes: Array.from(addedNodes, (el) => this.serialization(el as Element)),
              //删除的node 保存的是node 对应的id
              removedNodes: Array.from(removedNodes, (el) => this.idMap.get(el as Element)),
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
  }

  // 监听鼠标
  observerMouse(e: MouseEvent) {
    if (Date.now() - this.mouseTimer > 100) {
      console.log(e);
      this.mouseTimer = Date.now();
      console.log('add ACTION_TYPE_MOUSE');
      this.setAction(document.body, {
        type: EActionType.ACTION_TYPE_MOUSE,
        timestamp: Date.now(),
        pageX: e.clientX,
        pageY: e.clientY,
      });
    }
  }

  /**
   * 配置修改属性的动作
   */
  setAttributeAction(element: Element, otherParam = {}) {
    let attributes = {
      type: EActionType.ACTION_TYPE_ATTRIBUTE,
      ...otherParam,
    };
    // element.value && (attributes.value = element.value);
    console.log('setAttributeAction', attributes);
    this.setAction(element, attributes);
  }

  /**
   * 配置修改动作
   */
  setAction(element: Element, otherParam: { type: EActionType; [key: string]: any }) {
    //由于element是对象，因此Map中的key会自动更新
    const id = this.idMap.get(element) as number;
    console.log('+++++++setAction+++++', otherParam, 'tagId', id, element);
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
