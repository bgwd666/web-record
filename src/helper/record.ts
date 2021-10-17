class PageRecord {
  public eventsList:[] 

  constructor() {
    this.eventsList = [];
  }

  init (){
    console.log('record init');
    
    const options = {
      childList: true, // 是否观察子节点的变动
      subtree: true, // 是否观察所有后代节点的变动
      attributes: true, // 是否观察属性的变动
      attributeOldValue: true, // 是否观察属性的变动的旧值
      characterData: true, // 是否节点内容或节点文本的变动
      characterDataOldValue: true, // 是否节点内容或节点文本的变动的旧值
      // attributeFilter: ['class', 'src'] 在此数组中的属性变化时将被忽略
    };
    
    const observer = new MutationObserver((mutationList) => {
        console.log(mutationList);
        
    });
    observer.observe(document.documentElement, options);
  }
}

export default PageRecord