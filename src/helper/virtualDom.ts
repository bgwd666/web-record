import { ISerializationDom } from "./publicType";

class virtualDom {
  public id: number = 1;
  public idMap: Map<Element | Number, Element | Number> = new Map();
  constructor() {}

  /**
   * 唯一标识
   */
  getNewID() {
    return this.id++;
  }

  /**
   * DOM序列化
   */
  serialization(parent: Element) {
    let element = this.parseElement(parent);
    if (parent.children.length == 0) {
      parent.textContent && (element.textContent = parent.textContent);
      return element;
    }
    Array.from(parent.children, (child) => {
      element.children.push(this.serialization(child));
    });
    return element;
  }

  /**
   * 将元素解析成可序列化的对象
   */
  parseElement(element: Element, id?: number): ISerializationDom {
    let attributes: { [key: string]: string } = {};
    for (const { name, value } of Array.from(element.attributes)) {
      attributes[name] = value;
    }
    if (!id) {
      //解析新元素才做映射
      id = this.getNewID();
      // console.log("getID", element, id);
      this.idMap.set(element, id); //元素为键，ID为值
    }
    return {
      children: [] as ISerializationDom[],
      id: id,
      tagName: element.tagName.toLowerCase(),
      attributes: attributes,
    };
  }

  isFilterNode(el: Element): boolean {
    return ["SCRIPT"].includes(el.tagName);
  }

  /**
   * DOM反序列化
   */
  deSerialization(obj: ISerializationDom) {
    let element = this.createElement(obj);
    if (obj.children.length == 0) {
      return element;
    }
    obj.children.forEach((child) => {
      const el = this.deSerialization(child);
      if (!this.isFilterNode(el)) {
        element.appendChild(el);
      }
    });
    return element;
  }

  /**
   * 将对象解析成元素
   */
  createElement(obj: ISerializationDom): Element {
    let element = document.createElement(obj.tagName);
    if (obj.id) {
      this.idMap.set(obj.id, element); //ID为键，元素为值
    }
    for (const name in obj.attributes) {
      element.setAttribute(name, obj.attributes[name]);
    }
    obj.textContent && (element.textContent = obj.textContent);
    return element;
  }
}

export default virtualDom;
