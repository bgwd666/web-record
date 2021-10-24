/**
 * 序列化 dom
 */
export interface ISerializationDom {
  children: ISerializationDom[];
  id: number;
  tagName: string;
  attributes: { [key: string]: string };
  textContent?: string;
}

/**
 * 动作类型
 */

export enum EActionType {
  ACTION_TYPE_ATTRIBUTE = 1, // 修改元素属性
  ACTION_TYPE_ELEMENT = 2, // 元素增减
  ACTION_TYPE_MOUSE = 3, // 鼠标
}

/**
 * 动作记录
 */
export interface IAction extends ISerializationDom {
  type: EActionType;
  timestamp: number; //时间戳
  pageX?: number; //鼠标X
  pageY?: number; //鼠标y
  addedNodes?: ISerializationDom[]; // 新增node
  removedNodes?: number[]; // 删除node 已经被转为 元素在map中的id
}

/**
 *  保存的录屏记录
 */
export interface IRecordInfo {
  initDom: ISerializationDom;
  actionList: IAction[];
  time: string;
}
