// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/pages/home/index.less":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/helper/record.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var webRecord = /*#__PURE__*/function () {
  function webRecord() {
    _classCallCheck(this, webRecord);

    _defineProperty(this, "eventsList", void 0);

    this.eventsList = [];
  }

  _createClass(webRecord, [{
    key: "init",
    value: function init() {
      console.log('record init');
      var options = {
        childList: true,
        subtree: true,
        attributes: true,
        attributeOldValue: true,
        characterData: true,
        characterDataOldValue: true // 是否节点内容或节点文本的变动的旧值
        // attributeFilter: ['class', 'src'] 在此数组中的属性变化时将被忽略

      };
      var observer = new MutationObserver(function (mutationList) {
        console.log(mutationList);
      });
      observer.observe(document.documentElement, options);
    }
  }]);

  return webRecord;
}();

var _default = webRecord;
exports.default = _default;
},{}],"src/helper/video.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//@ts-nocheck
var ACTION_TYPE_ATTRIBUTE = 1; //动作类型 修改元素属性

var ACTION_TYPE_ELEMENT = 2; //动作类型 元素增减

var ACTION_TYPE_MOUSE = 3; //动作类型 元素增减

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

  this.mouseTimer = 0; //鼠标timer

  this.observer();
  this.observerInput();
  this.observerMouseFun = this.observerMouse.bind(this);
  window.addEventListener("mousemove", this.observerMouseFun);
}

JSVideo.prototype = {
  /**
   * DOM序列化
   */
  serialization: function serialization(parent) {
    var _this2 = this;

    if (parent.tagName === "SCRIPT") {
      return;
    }

    var element = this.parseElement(parent);

    if (parent.children.length == 0) {
      parent.textContent && (element.textContent = parent.textContent);
      return element;
    }

    Array.from(parent.children, function (child) {
      var childEl = _this2.serialization(child);

      if (childEl) {
        element.children.push(childEl);
      }
    });
    return element;
  },

  /**
   * 将元素解析成可序列化的对象
   */
  parseElement: function parseElement(element, id) {
    if (!element) {
      return;
    }

    var attributes = {};

    for (var _i = 0, _Array$from = Array.from(element.attributes); _i < _Array$from.length; _i++) {
      var _Array$from$_i = _Array$from[_i],
          name = _Array$from$_i.name,
          value = _Array$from$_i.value;
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
      attributes: attributes
    };
  },

  /**
   * DOM反序列化
   */
  deserialization: function deserialization(obj) {
    var _this3 = this;

    if (!obj) {
      return;
    }

    var element = this.createElement(obj);

    if (obj.children.length == 0) {
      return element;
    }

    obj.children.forEach(function (child) {
      var el = _this3.deserialization(child);

      if (el) {
        element.appendChild(el);
      }
    });
    return element;
  },

  /**
   * 将对象解析成元素
   */
  createElement: function createElement(obj) {
    if (!obj) {
      return;
    }

    var element = document.createElement(obj.tagName);

    if (obj.id) {
      this.idMap.set(obj.id, element); //ID为键，元素为值
    }

    for (var name in obj.attributes) {
      element.setAttribute(name, obj.attributes[name]);
    }

    obj.textContent && (element.textContent = obj.textContent);
    return element;
  },

  /**
   * 唯一标识
   */
  getID: function getID() {
    return this.id++;
  },

  /**
   * 序列化后的DOM
   */
  getDOM: function getDOM() {
    return this.dom;
  },

  /**
   * 监控元素变化
   */
  observer: function observer() {
    var _this4 = this;

    this.currentObserve = new MutationObserver(function (mutations) {
      console.log(mutations);
      mutations.forEach(function (mutation) {
        var type = mutation.type,
            target = mutation.target,
            oldValue = mutation.oldValue,
            attributeName = mutation.attributeName,
            addedNodes = mutation.addedNodes,
            removedNodes = mutation.removedNodes;
        console.log(type);

        switch (type) {
          case "attributes":
            var value = target.getAttribute(attributeName);
            console.log("attributes", value);

            _this4.setAttributeAction(target);

            break;

          case "childList":
            _this4.setAttributeAction(target, {
              type: ACTION_TYPE_ELEMENT,
              //新增的node 保存的是序列化的dom
              addedNodes: Array.from(addedNodes, function (el) {
                return _this4.serialization(el);
              }),
              //删除的node 保存的是node 对应的id
              removedNodes: Array.from(removedNodes, function (el) {
                return _this4.idMap.get(el);
              })
            });

        }
      });
    });
    this.currentObserve.observe(document, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeOldValue: true,
      characterData: true,
      characterDataOldValue: true // 是否节点内容或节点文本的变动的旧值
      // attributeFilter: ['class', 'src'] 在此数组中的属性变化时将被忽略

    }); //this.currentObserve.disconnect();
  },
  // 监听鼠标
  observerMouse: function observerMouse(e) {
    if (new Date() - this.mouseTimer > 100) {
      console.log(e);
      this.mouseTimer = new Date();
      console.log("add ACTION_TYPE_MOUSE");
      this.setAction(document.body, {
        type: ACTION_TYPE_MOUSE,
        timestamp: Date.now(),
        pageX: e.clientX,
        pageY: e.clientY
      });
    }
  },

  /**
   * 监控文本框的变化
   */
  observerInput: function observerInput() {
    var _this6 = this;

    var original = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value"),
        _this = this; //监控通过代码更新的value属性


    Object.defineProperty(HTMLInputElement.prototype, "value", {
      set: function set(value) {
        var _this5 = this;

        console.log("defineProperty", value);
        setTimeout(function () {
          _this.setAttributeAction(_this5); //异步调用，避免阻塞页面

        }, 0);
        original.set.call(this, value); //执行原来的set逻辑
      }
    }); //捕获input事件

    document.addEventListener("input", function (event) {
      var target = event.target;
      var text = target.value;
      console.log("input", text);

      _this6.setAttributeAction(target);
    }, {
      capture: true //捕获

    });
  },

  /**
   * 配置修改属性的动作
   */
  setAttributeAction: function setAttributeAction(element) {
    var otherParam = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var attributes = _objectSpread({
      type: ACTION_TYPE_ATTRIBUTE
    }, otherParam);

    element.value && (attributes.value = element.value);
    console.log("setAttributeAction", attributes);
    this.setAction(element, attributes);
  },

  /**
   * 配置修改动作
   */
  setAction: function setAction(element) {
    var otherParam = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    //由于element是对象，因此Map中的key会自动更新
    var id = this.idMap.get(element);
    console.log("+++++++setAction+++++", otherParam, "tagId", id, element);
    var action = Object.assign(this.parseElement(element, id), {
      timestamp: Date.now()
    }, otherParam);
    this.actions.push(action);
    console.log("all__actions", this.actions);
    console.log("all__idMap", this.idMap);
  },
  getActions: function getActions() {
    return this.actions;
  },

  /**
   * 回放
   */
  replay: function replay() {
    var _this7 = this;

    if (this.actions.length == 0) return;
    console.log("__________replay_________");
    console.log("new idMap", this.idMap);
    console.log("all actions", this.actions);
    var appMouse = null;
    var timeOffset = 16.7; //一帧的时间间隔大概为16.7ms

    var startTime = this.actions[0].timestamp; //开始时间戳

    var state = function state() {
      var action = _this7.actions[0];

      var element = _this7.idMap.get(action.id);

      if (!element) {
        //取不到的元素 且不是鼠标动作 直接停止动画
        console.error("dont's have this element");
        return;
      } //console.log("state action", action, this.actions.length);


      if (startTime >= action.timestamp) {
        console.log("========== current action", action, 'actions left:', _this7.actions.length);

        _this7.actions.shift();

        switch (action.type) {
          //属性
          case ACTION_TYPE_ATTRIBUTE:
            console.log("action>>>>>> [attributes]", 'targetEl', element);

            for (var name in action.attributes) {
              //更新属性
              element.setAttribute(name, action.attributes[name]);
            } //触发defineProperty拦截，拆分成两个插件会避免该问题


            action.value && (element.value = action.value);
            break;
          //节点修改

          case ACTION_TYPE_ELEMENT:
            console.log("action>>>>>>> [element]", 'targetEl', element); //添加节点

            action.addedNodes.forEach(function (ch) {
              var el = _this7.createElement(ch);

              console.log("++add node", ch, el);
              element.appendChild(el);
            }); //删除节点

            action.removedNodes.forEach(function (id) {
              var el = _this7.idMap.get(id);

              console.log("--remove node", id, el);
              element.removeChild(el);
            });
            break;
          //鼠标

          case ACTION_TYPE_MOUSE:
            console.log("action>>>>>>> [mouse]", 'targetEl', element);
            !appMouse && (appMouse = element.querySelector(".app-mouse"));
            appMouse.style.transform = "translate(".concat(action.pageX, "px,").concat(action.pageY, "px)");
            break;
        }
      }

      startTime += timeOffset; //最大程度的模拟真实的时间差

      if (_this7.actions.length > 0) {
        //当还有动作时，继续调用requestAnimationFrame()
        requestAnimationFrame(state);
      } else {
        // 没有动作了 播放结束
        console.log("replay end.");
        setTimeout(function () {
          document.querySelector("#root").style.display = "block";
        }, 2000);
      }
    };

    state();
  },

  /**
   * 创建iframe还原页面
   */
  createIframe: function createIframe() {
    var _this8 = this;

    //停止监听
    this.currentObserve.disconnect();
    window.removeEventListener("mousemove", this.observerMouseFun);
    document.querySelector("#root").style.display = "none";
    var iframe = document.createElement("iframe");
    iframe.setAttribute("sandbox", "allow-same-origin");
    iframe.setAttribute("scrolling", "no");
    iframe.setAttribute("style", "pointer-events:none; border:0;");
    iframe.width = "".concat(window.innerWidth, "px");
    iframe.height = "".concat(document.documentElement.scrollHeight, "px");

    iframe.onload = function () {
      var doc = iframe.contentDocument,
          root = doc.documentElement,
          html = _this8.deserialization(_this8.dom); //反序列化
      //根元素属性附加


      for (var _i2 = 0, _Array$from2 = Array.from(html.attributes); _i2 < _Array$from2.length; _i2++) {
        var _Array$from2$_i = _Array$from2[_i2],
            name = _Array$from2$_i.name,
            value = _Array$from2$_i.value;
        root.setAttribute(name, value);
      }

      root.removeChild(root.firstElementChild); //移除head

      root.removeChild(root.firstElementChild); //移除body

      Array.from(html.children).forEach(function (child) {
        root.appendChild(child);
      }); //添加鼠标

      var mouse = document.createElement("div");
      mouse.className = "app-mouse";
      doc.body.appendChild(mouse); //加个定时器只是为了查看方便

      setTimeout(function () {
        _this8.replay();
      }, 2000);
    };

    document.body.appendChild(iframe);
  }
};
var _default = JSVideo;
exports.default = _default;
},{}],"src/pages/home/index.tsx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

require("./index.less");

var _record = _interopRequireDefault(require("/src/helper/record"));

var _video = _interopRequireDefault(require("/src/helper/video"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Home = function Home() {
  var _useState = (0, _react.useState)([1]),
      _useState2 = _slicedToArray(_useState, 2),
      cardList = _useState2[0],
      setCardList = _useState2[1];

  var pageRecord = new _record.default();
  var video = (0, _react.useRef)();
  (0, _react.useEffect)(function () {// pageRecord.init()
    //@ts-ignore
    // video.current = new JSVideo();
  }, []); //开始录制

  var handleStartRecord = function handleStartRecord() {
    //@ts-ignore
    video.current = new _video.default();
  }; //结束录制并回放


  var handleReplayRecord = function handleReplayRecord() {
    //@ts-ignore
    video.current.createIframe();
  }; //添加卡片


  var handleAddCard = function handleAddCard() {
    setCardList([].concat(_toConsumableArray(cardList), [cardList.length + 1]));
    document.querySelector(".card-item").style.backgroundColor = "#".concat(Math.random().toString(16).slice(-6));
  }; //重置卡片


  var handleResetCard = function handleResetCard() {
    setCardList([1]);
  };

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("header", {
    className: "font-size-32 text-center mt-24"
  }, "web record"), _react.default.createElement("section", {
    className: "box-cont mt-24"
  }, _react.default.createElement("div", {
    className: "flex-center mt-24"
  }, _react.default.createElement("button", {
    className: "theme-btn",
    onClick: handleStartRecord
  }, "Start Record"), _react.default.createElement("button", {
    className: "theme-btn ml-16",
    onClick: handleReplayRecord
  }, "Replay Record"), _react.default.createElement("button", {
    className: "theme-btn ml-16",
    onClick: handleAddCard
  }, "Add Card"), _react.default.createElement("button", {
    className: "theme-btn ml-16",
    onClick: handleResetCard
  }, "Reset")), _react.default.createElement("ul", {
    className: "mt-24 flex flex-wrap card-cont"
  }, cardList.map(function (it) {
    return _react.default.createElement("li", {
      className: "flex-center card-item",
      key: it
    }, it);
  }))));
};

var _default = Home;
exports.default = _default;
},{"react":"node_modules/react/index.js","./index.less":"src/pages/home/index.less","/src/helper/record":"src/helper/record.ts","/src/helper/video":"src/helper/video.ts"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49207" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js"], null)
//# sourceMappingURL=/home.377836a1.js.map