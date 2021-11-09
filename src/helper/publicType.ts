/**
 * 序列化 dom
 */
export interface ISerializationDom {
  children: ISerializationDom[];
  id: number;
  tagName: string;
  attributes: { [key: string]: string };
  textContent?: string;
  value?: string;
}

/**
 * 动作类型
 */

export enum EActionType {
  ACTION_TYPE_ATTRIBUTE = 1, // 修改元素属性
  ACTION_TYPE_ELEMENT = 2, // 元素增减
  ACTION_TYPE_TEXT = 3, // 文本变化
  ACTION_TYPE_MOUSE = 4, // 鼠标
  ACTION_TYPE_INPUT = 5, // 输入框
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
  newText?: string; // 新的文本
  inputValue?: string; // 输入框的值
}

/**
 *  保存的录屏记录
 */
export interface IRecordInfo {
  initDom: ISerializationDom;
  actionList: IAction[];
  time: string;
}
