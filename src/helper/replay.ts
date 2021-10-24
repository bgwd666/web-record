import { EActionType, IAction, ISerializationDom } from './publicType';
import virtualDom from './virtualDom';

class ReplayRecord extends virtualDom {
  public initDom: ISerializationDom | undefined;
  public actionList: IAction[] = [];

  constructor() {
    super();
  }

  /**
   * 初始化某个录屏
   * @param initDom 初始的序列化dom
   * @param actionList 动作记录
   */
  init(initDom: ISerializationDom, actionList: IAction[]) {
    console.log('replay init');
    this.initDom = initDom;
    this.actionList = actionList;
    this.createIframe().then(() => {
      this.replay();
    });
  }

  /**
   * 重置信息 等待新的录屏回放
   */
  reset() {
    this.id = 1;
    this.idMap.clear();
    this.initDom = undefined;
    this.actionList = [];
    // 清除iframe
    const replayIframe = document.querySelector('#replay-iframe');
    replayIframe && document.body.removeChild(replayIframe);
  }

  /**
   * 创建iframe 作为容器
   */
  createIframe() {
    return new Promise((re, rj) => {
      let iframe = document.createElement('iframe');
      iframe.setAttribute('sandbox', 'allow-same-origin');
      iframe.setAttribute('scrolling', 'no');
      iframe.setAttribute('style', 'border:0;');
      iframe.setAttribute('id', 'replay-iframe');
      iframe.width = `${window.innerWidth - 8}px`;
      iframe.height = `${window.innerHeight}px`;
      iframe.onload = () => {
        const doc = iframe.contentDocument!,
          root = doc.documentElement,
          html = this.deSerialization(this.initDom!); //反序列化
        //根元素属性附加
        for (const { name, value } of Array.from(html.attributes)) {
          root.setAttribute(name, value);
        }
        root.removeChild(root.firstElementChild!); //移除head
        root.removeChild(root.firstElementChild!); //移除body
        Array.from(html.children).forEach((child) => {
          root.appendChild(child);
        });
        //添加自定义鼠标
        const mouse = document.createElement('div');
        mouse.className = 'app-mouse';
        doc.body.appendChild(mouse);
        re(1);
      };
      document.body.appendChild(iframe);
    });
  }

  /**
   * 回放
   */
  replay() {
    if (this.actionList.length == 0) return;
    console.log('__________replay_________');
    console.log('all actionList', this.actionList);
    let appMouse: HTMLElement | null = null;
    const timeOffset = 16.7; //一帧的时间间隔大概为16.7ms
    let startTime = this.actionList[0].timestamp; //开始时间戳

    const state = () => {
      const action = this.actionList[0];
      let target = this.idMap.get(action.id);
      if (!target) {
        //取不到的元素 直接停止
        console.error(`dont's have this element`, action.id);
        return;
      }
      let element = target as Element;
      if (startTime >= action.timestamp) {
        console.log('=== current action', action, 'left:', this.actionList.length);
        this.actionList.shift();
        switch (action.type) {
          //属性
          case EActionType.ACTION_TYPE_ATTRIBUTE:
            console.log('action>>>>>> [attributes]', 'targetEl', element);
            for (const name in action.attributes) {
              //更新属性
              element.setAttribute(name, action.attributes[name]);
            }
            //触发defineProperty拦截，拆分成两个插件会避免该问题
            // action.value && (element.value = action.value);
            break;

          //节点修改
          case EActionType.ACTION_TYPE_ELEMENT:
            console.log('action>>>>>>> [element]', 'targetEl', element);
            //添加节点
            action.addedNodes?.forEach((ch) => {
              let el = this.createElement(ch);
              console.log('++add node', ch, el);
              element.appendChild(el);
            });
            //删除节点
            action.removedNodes?.forEach((id) => {
              let el = this.idMap.get(id) as Element;
              console.log('--remove node', id, el);
              element.removeChild(el);
            });
            break;

          //鼠标
          case EActionType.ACTION_TYPE_MOUSE:
            console.log('action>>>>>>> [mouse]', 'targetEl', element);
            !appMouse && (appMouse = element.querySelector('.app-mouse'));
            appMouse!.style.transform = `translate(${action.pageX}px,${action.pageY}px)`;
            break;
        }
      }
      startTime += timeOffset; //最大程度的模拟真实的时间差
      if (this.actionList.length > 0) {
        //当还有动作时，继续调用requestAnimationFrame()
        requestAnimationFrame(state);
      } else {
        // 没有动作了 播放结束
        console.log('replay end.');
      }
    };

    state();
  }
}

export default ReplayRecord;
