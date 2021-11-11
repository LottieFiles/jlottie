/*!
 * @lottiefiles/jlottie v1.1.1
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.jlottie = {}));
}(this, (function (exports) { 'use strict';

  function _asyncIterator(iterable) {
    var method,
        async,
        sync,
        retry = 2;

    if (typeof Symbol !== "undefined") {
      async = Symbol.asyncIterator;
      sync = Symbol.iterator;
    }

    while (retry--) {
      if (async && (method = iterable[async]) != null) {
        return method.call(iterable);
      }

      if (sync && (method = iterable[sync]) != null) {
        return new AsyncFromSyncIterator(method.call(iterable));
      }

      async = "@@asyncIterator";
      sync = "@@iterator";
    }

    throw new TypeError("Object is not async iterable");
  }

  function AsyncFromSyncIterator(s) {
    AsyncFromSyncIterator = function (s) {
      this.s = s;
      this.n = s.next;
    };

    AsyncFromSyncIterator.prototype = {
      s: null,
      n: null,
      next: function () {
        return AsyncFromSyncIteratorContinuation(this.n.apply(this.s, arguments));
      },
      return: function (value) {
        var ret = this.s.return;

        if (ret === undefined) {
          return Promise.resolve({
            value: value,
            done: true
          });
        }

        return AsyncFromSyncIteratorContinuation(ret.apply(this.s, arguments));
      },
      throw: function (value) {
        var thr = this.s.return;
        if (thr === undefined) return Promise.reject(value);
        return AsyncFromSyncIteratorContinuation(thr.apply(this.s, arguments));
      }
    };

    function AsyncFromSyncIteratorContinuation(r) {
      if (Object(r) !== r) {
        return Promise.reject(new TypeError(r + " is not an object."));
      }

      var done = r.done;
      return Promise.resolve(r.value).then(function (value) {
        return {
          value: value,
          done: done
        };
      });
    }

    return new AsyncFromSyncIterator(s);
  }

  var REACT_ELEMENT_TYPE;

  function _jsx(type, props, key, children) {
    if (!REACT_ELEMENT_TYPE) {
      REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol["for"] && Symbol["for"]("react.element") || 0xeac7;
    }

    var defaultProps = type && type.defaultProps;
    var childrenLength = arguments.length - 3;

    if (!props && childrenLength !== 0) {
      props = {
        children: void 0
      };
    }

    if (childrenLength === 1) {
      props.children = children;
    } else if (childrenLength > 1) {
      var childArray = new Array(childrenLength);

      for (var i = 0; i < childrenLength; i++) {
        childArray[i] = arguments[i + 3];
      }

      props.children = childArray;
    }

    if (props && defaultProps) {
      for (var propName in defaultProps) {
        if (props[propName] === void 0) {
          props[propName] = defaultProps[propName];
        }
      }
    } else if (!props) {
      props = defaultProps || {};
    }

    return {
      $$typeof: REACT_ELEMENT_TYPE,
      type: type,
      key: key === undefined ? null : "" + key,
      ref: null,
      props: props,
      _owner: null
    };
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);

      if (enumerableOnly) {
        symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
      }

      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _wrapRegExp() {
    _wrapRegExp = function (re, groups) {
      return new BabelRegExp(re, undefined, groups);
    };

    var _super = RegExp.prototype;

    var _groups = new WeakMap();

    function BabelRegExp(re, flags, groups) {
      var _this = new RegExp(re, flags);

      _groups.set(_this, groups || _groups.get(re));

      return _setPrototypeOf(_this, BabelRegExp.prototype);
    }

    _inherits(BabelRegExp, RegExp);

    BabelRegExp.prototype.exec = function (str) {
      var result = _super.exec.call(this, str);

      if (result) result.groups = buildGroups(result, this);
      return result;
    };

    BabelRegExp.prototype[Symbol.replace] = function (str, substitution) {
      if (typeof substitution === "string") {
        var groups = _groups.get(this);

        return _super[Symbol.replace].call(this, str, substitution.replace(/\$<([^>]+)>/g, function (_, name) {
          return "$" + groups[name];
        }));
      } else if (typeof substitution === "function") {
        var _this = this;

        return _super[Symbol.replace].call(this, str, function () {
          var args = arguments;

          if (typeof args[args.length - 1] !== "object") {
            args = [].slice.call(args);
            args.push(buildGroups(args, _this));
          }

          return substitution.apply(this, args);
        });
      } else {
        return _super[Symbol.replace].call(this, str, substitution);
      }
    };

    function buildGroups(result, re) {
      var g = _groups.get(re);

      return Object.keys(g).reduce(function (groups, name) {
        groups[name] = result[g[name]];
        return groups;
      }, Object.create(null));
    }

    return _wrapRegExp.apply(this, arguments);
  }

  function _AwaitValue(value) {
    this.wrapped = value;
  }

  function _AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;
        var wrappedAwait = value instanceof _AwaitValue;
        Promise.resolve(wrappedAwait ? value.wrapped : value).then(function (arg) {
          if (wrappedAwait) {
            resume(key === "return" ? "return" : "next", arg);
            return;
          }

          settle(result.done ? "return" : "normal", arg);
        }, function (err) {
          resume("throw", err);
        });
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  _AsyncGenerator.prototype[typeof Symbol === "function" && Symbol.asyncIterator || "@@asyncIterator"] = function () {
    return this;
  };

  _AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  _AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  _AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  function _wrapAsyncGenerator(fn) {
    return function () {
      return new _AsyncGenerator(fn.apply(this, arguments));
    };
  }

  function _awaitAsyncGenerator(value) {
    return new _AwaitValue(value);
  }

  function _asyncGeneratorDelegate(inner, awaitWrap) {
    var iter = {},
        waiting = false;

    function pump(key, value) {
      waiting = true;
      value = new Promise(function (resolve) {
        resolve(inner[key](value));
      });
      return {
        done: false,
        value: awaitWrap(value)
      };
    }

    ;

    iter[typeof Symbol !== "undefined" && Symbol.iterator || "@@iterator"] = function () {
      return this;
    };

    iter.next = function (value) {
      if (waiting) {
        waiting = false;
        return value;
      }

      return pump("next", value);
    };

    if (typeof inner.throw === "function") {
      iter.throw = function (value) {
        if (waiting) {
          waiting = false;
          throw value;
        }

        return pump("throw", value);
      };
    }

    if (typeof inner.return === "function") {
      iter.return = function (value) {
        if (waiting) {
          waiting = false;
          return value;
        }

        return pump("return", value);
      };
    }

    return iter;
  }

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineEnumerableProperties(obj, descs) {
    for (var key in descs) {
      var desc = descs[key];
      desc.configurable = desc.enumerable = true;
      if ("value" in desc) desc.writable = true;
      Object.defineProperty(obj, key, desc);
    }

    if (Object.getOwnPropertySymbols) {
      var objectSymbols = Object.getOwnPropertySymbols(descs);

      for (var i = 0; i < objectSymbols.length; i++) {
        var sym = objectSymbols[i];
        var desc = descs[sym];
        desc.configurable = desc.enumerable = true;
        if ("value" in desc) desc.writable = true;
        Object.defineProperty(obj, sym, desc);
      }
    }

    return obj;
  }

  function _defaults(obj, defaults) {
    var keys = Object.getOwnPropertyNames(defaults);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var value = Object.getOwnPropertyDescriptor(defaults, key);

      if (value && value.configurable && obj[key] === undefined) {
        Object.defineProperty(obj, key, value);
      }
    }

    return obj;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? Object(arguments[i]) : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys.push.apply(ownKeys, Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;

    _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !_isNativeFunction(Class)) return Class;

      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }

      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class);
    };

    return _wrapNativeSuper(Class);
  }

  function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
      return !!right[Symbol.hasInstance](left);
    } else {
      return left instanceof right;
    }
  }

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function (nodeInterop) {
      return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
  }

  function _interopRequireWildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
      return obj;
    }

    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
      return {
        default: obj
      };
    }

    var cache = _getRequireWildcardCache(nodeInterop);

    if (cache && cache.has(obj)) {
      return cache.get(obj);
    }

    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var key in obj) {
      if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

        if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }

    newObj.default = obj;

    if (cache) {
      cache.set(obj, newObj);
    }

    return newObj;
  }

  function _newArrowCheck(innerThis, boundThis) {
    if (innerThis !== boundThis) {
      throw new TypeError("Cannot instantiate an arrow function");
    }
  }

  function _objectDestructuringEmpty(obj) {
    if (obj == null) throw new TypeError("Cannot destructure undefined");
  }

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};

    var target = _objectWithoutPropertiesLoose(source, excluded);

    var key, i;

    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }

    return target;
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  function _get() {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(arguments.length < 3 ? target : receiver);
        }

        return desc.value;
      };
    }

    return _get.apply(this, arguments);
  }

  function set(target, property, value, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.set) {
      set = Reflect.set;
    } else {
      set = function set(target, property, value, receiver) {
        var base = _superPropBase(target, property);

        var desc;

        if (base) {
          desc = Object.getOwnPropertyDescriptor(base, property);

          if (desc.set) {
            desc.set.call(receiver, value);
            return true;
          } else if (!desc.writable) {
            return false;
          }
        }

        desc = Object.getOwnPropertyDescriptor(receiver, property);

        if (desc) {
          if (!desc.writable) {
            return false;
          }

          desc.value = value;
          Object.defineProperty(receiver, property, desc);
        } else {
          _defineProperty(receiver, property, value);
        }

        return true;
      };
    }

    return set(target, property, value, receiver);
  }

  function _set(target, property, value, receiver, isStrict) {
    var s = set(target, property, value, receiver || target);

    if (!s && isStrict) {
      throw new Error('failed to set property');
    }

    return value;
  }

  function _taggedTemplateLiteral(strings, raw) {
    if (!raw) {
      raw = strings.slice(0);
    }

    return Object.freeze(Object.defineProperties(strings, {
      raw: {
        value: Object.freeze(raw)
      }
    }));
  }

  function _taggedTemplateLiteralLoose(strings, raw) {
    if (!raw) {
      raw = strings.slice(0);
    }

    strings.raw = raw;
    return strings;
  }

  function _readOnlyError(name) {
    throw new TypeError("\"" + name + "\" is read-only");
  }

  function _writeOnlyError(name) {
    throw new TypeError("\"" + name + "\" is write-only");
  }

  function _classNameTDZError(name) {
    throw new Error("Class \"" + name + "\" cannot be referenced in computed property keys.");
  }

  function _temporalUndefined() {}

  function _tdz(name) {
    throw new ReferenceError(name + " is not defined - temporal dead zone");
  }

  function _temporalRef(val, name) {
    return val === _temporalUndefined ? _tdz(name) : val;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _slicedToArrayLoose(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimitLoose(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _toArray(arr) {
    return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest();
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _maybeArrayLike(next, arr, i) {
    if (arr && !Array.isArray(arr) && typeof arr.length === "number") {
      var len = arr.length;
      return _arrayLikeToArray(arr, i !== void 0 && i < len ? i : len);
    }

    return next(arr, i);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _iterableToArrayLimitLoose(arr, i) {
    var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]);

    if (_i == null) return;
    var _arr = [];

    for (_i = _i.call(arr), _step; !(_step = _i.next()).done;) {
      _arr.push(_step.value);

      if (i && _arr.length === i) break;
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;

        var F = function () {};

        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var normalCompletion = true,
        didErr = false,
        err;
    return {
      s: function () {
        it = it.call(o);
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  function _createForOfIteratorHelperLoose(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (it) return (it = it.call(o)).next.bind(it);

    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      return function () {
        if (i >= o.length) return {
          done: true
        };
        return {
          done: false,
          value: o[i++]
        };
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _skipFirstGeneratorNext(fn) {
    return function () {
      var it = fn.apply(this, arguments);
      it.next();
      return it;
    };
  }

  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];

    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }

    return (hint === "string" ? String : Number)(input);
  }

  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");

    return typeof key === "symbol" ? key : String(key);
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.');
  }

  function _initializerDefineProperty(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object.keys(descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object.defineProperty(target, property, desc);
      desc = null;
    }

    return desc;
  }

  var id = 0;

  function _classPrivateFieldLooseKey(name) {
    return "__private_" + id++ + "_" + name;
  }

  function _classPrivateFieldLooseBase(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
      throw new TypeError("attempted to use private field on non-instance");
    }

    return receiver;
  }

  function _classPrivateFieldGet(receiver, privateMap) {
    var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get");

    return _classApplyDescriptorGet(receiver, descriptor);
  }

  function _classPrivateFieldSet(receiver, privateMap, value) {
    var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set");

    _classApplyDescriptorSet(receiver, descriptor, value);

    return value;
  }

  function _classPrivateFieldDestructureSet(receiver, privateMap) {
    var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set");

    return _classApplyDescriptorDestructureSet(receiver, descriptor);
  }

  function _classExtractFieldDescriptor(receiver, privateMap, action) {
    if (!privateMap.has(receiver)) {
      throw new TypeError("attempted to " + action + " private field on non-instance");
    }

    return privateMap.get(receiver);
  }

  function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) {
    _classCheckPrivateStaticAccess(receiver, classConstructor);

    _classCheckPrivateStaticFieldDescriptor(descriptor, "get");

    return _classApplyDescriptorGet(receiver, descriptor);
  }

  function _classStaticPrivateFieldSpecSet(receiver, classConstructor, descriptor, value) {
    _classCheckPrivateStaticAccess(receiver, classConstructor);

    _classCheckPrivateStaticFieldDescriptor(descriptor, "set");

    _classApplyDescriptorSet(receiver, descriptor, value);

    return value;
  }

  function _classStaticPrivateMethodGet(receiver, classConstructor, method) {
    _classCheckPrivateStaticAccess(receiver, classConstructor);

    return method;
  }

  function _classStaticPrivateMethodSet() {
    throw new TypeError("attempted to set read only static private field");
  }

  function _classApplyDescriptorGet(receiver, descriptor) {
    if (descriptor.get) {
      return descriptor.get.call(receiver);
    }

    return descriptor.value;
  }

  function _classApplyDescriptorSet(receiver, descriptor, value) {
    if (descriptor.set) {
      descriptor.set.call(receiver, value);
    } else {
      if (!descriptor.writable) {
        throw new TypeError("attempted to set read only private field");
      }

      descriptor.value = value;
    }
  }

  function _classApplyDescriptorDestructureSet(receiver, descriptor) {
    if (descriptor.set) {
      if (!("__destrObj" in descriptor)) {
        descriptor.__destrObj = {
          set value(v) {
            descriptor.set.call(receiver, v);
          }

        };
      }

      return descriptor.__destrObj;
    } else {
      if (!descriptor.writable) {
        throw new TypeError("attempted to set read only private field");
      }

      return descriptor;
    }
  }

  function _classStaticPrivateFieldDestructureSet(receiver, classConstructor, descriptor) {
    _classCheckPrivateStaticAccess(receiver, classConstructor);

    _classCheckPrivateStaticFieldDescriptor(descriptor, "set");

    return _classApplyDescriptorDestructureSet(receiver, descriptor);
  }

  function _classCheckPrivateStaticAccess(receiver, classConstructor) {
    if (receiver !== classConstructor) {
      throw new TypeError("Private static access of wrong provenance");
    }
  }

  function _classCheckPrivateStaticFieldDescriptor(descriptor, action) {
    if (descriptor === undefined) {
      throw new TypeError("attempted to " + action + " private static field before its declaration");
    }
  }

  function _decorate(decorators, factory, superClass, mixins) {
    var api = _getDecoratorsApi();

    if (mixins) {
      for (var i = 0; i < mixins.length; i++) {
        api = mixins[i](api);
      }
    }

    var r = factory(function initialize(O) {
      api.initializeInstanceElements(O, decorated.elements);
    }, superClass);
    var decorated = api.decorateClass(_coalesceClassElements(r.d.map(_createElementDescriptor)), decorators);
    api.initializeClassElements(r.F, decorated.elements);
    return api.runClassFinishers(r.F, decorated.finishers);
  }

  function _getDecoratorsApi() {
    _getDecoratorsApi = function () {
      return api;
    };

    var api = {
      elementsDefinitionOrder: [["method"], ["field"]],
      initializeInstanceElements: function (O, elements) {
        ["method", "field"].forEach(function (kind) {
          elements.forEach(function (element) {
            if (element.kind === kind && element.placement === "own") {
              this.defineClassElement(O, element);
            }
          }, this);
        }, this);
      },
      initializeClassElements: function (F, elements) {
        var proto = F.prototype;
        ["method", "field"].forEach(function (kind) {
          elements.forEach(function (element) {
            var placement = element.placement;

            if (element.kind === kind && (placement === "static" || placement === "prototype")) {
              var receiver = placement === "static" ? F : proto;
              this.defineClassElement(receiver, element);
            }
          }, this);
        }, this);
      },
      defineClassElement: function (receiver, element) {
        var descriptor = element.descriptor;

        if (element.kind === "field") {
          var initializer = element.initializer;
          descriptor = {
            enumerable: descriptor.enumerable,
            writable: descriptor.writable,
            configurable: descriptor.configurable,
            value: initializer === void 0 ? void 0 : initializer.call(receiver)
          };
        }

        Object.defineProperty(receiver, element.key, descriptor);
      },
      decorateClass: function (elements, decorators) {
        var newElements = [];
        var finishers = [];
        var placements = {
          static: [],
          prototype: [],
          own: []
        };
        elements.forEach(function (element) {
          this.addElementPlacement(element, placements);
        }, this);
        elements.forEach(function (element) {
          if (!_hasDecorators(element)) return newElements.push(element);
          var elementFinishersExtras = this.decorateElement(element, placements);
          newElements.push(elementFinishersExtras.element);
          newElements.push.apply(newElements, elementFinishersExtras.extras);
          finishers.push.apply(finishers, elementFinishersExtras.finishers);
        }, this);

        if (!decorators) {
          return {
            elements: newElements,
            finishers: finishers
          };
        }

        var result = this.decorateConstructor(newElements, decorators);
        finishers.push.apply(finishers, result.finishers);
        result.finishers = finishers;
        return result;
      },
      addElementPlacement: function (element, placements, silent) {
        var keys = placements[element.placement];

        if (!silent && keys.indexOf(element.key) !== -1) {
          throw new TypeError("Duplicated element (" + element.key + ")");
        }

        keys.push(element.key);
      },
      decorateElement: function (element, placements) {
        var extras = [];
        var finishers = [];

        for (var decorators = element.decorators, i = decorators.length - 1; i >= 0; i--) {
          var keys = placements[element.placement];
          keys.splice(keys.indexOf(element.key), 1);
          var elementObject = this.fromElementDescriptor(element);
          var elementFinisherExtras = this.toElementFinisherExtras((0, decorators[i])(elementObject) || elementObject);
          element = elementFinisherExtras.element;
          this.addElementPlacement(element, placements);

          if (elementFinisherExtras.finisher) {
            finishers.push(elementFinisherExtras.finisher);
          }

          var newExtras = elementFinisherExtras.extras;

          if (newExtras) {
            for (var j = 0; j < newExtras.length; j++) {
              this.addElementPlacement(newExtras[j], placements);
            }

            extras.push.apply(extras, newExtras);
          }
        }

        return {
          element: element,
          finishers: finishers,
          extras: extras
        };
      },
      decorateConstructor: function (elements, decorators) {
        var finishers = [];

        for (var i = decorators.length - 1; i >= 0; i--) {
          var obj = this.fromClassDescriptor(elements);
          var elementsAndFinisher = this.toClassDescriptor((0, decorators[i])(obj) || obj);

          if (elementsAndFinisher.finisher !== undefined) {
            finishers.push(elementsAndFinisher.finisher);
          }

          if (elementsAndFinisher.elements !== undefined) {
            elements = elementsAndFinisher.elements;

            for (var j = 0; j < elements.length - 1; j++) {
              for (var k = j + 1; k < elements.length; k++) {
                if (elements[j].key === elements[k].key && elements[j].placement === elements[k].placement) {
                  throw new TypeError("Duplicated element (" + elements[j].key + ")");
                }
              }
            }
          }
        }

        return {
          elements: elements,
          finishers: finishers
        };
      },
      fromElementDescriptor: function (element) {
        var obj = {
          kind: element.kind,
          key: element.key,
          placement: element.placement,
          descriptor: element.descriptor
        };
        var desc = {
          value: "Descriptor",
          configurable: true
        };
        Object.defineProperty(obj, Symbol.toStringTag, desc);
        if (element.kind === "field") obj.initializer = element.initializer;
        return obj;
      },
      toElementDescriptors: function (elementObjects) {
        if (elementObjects === undefined) return;
        return _toArray(elementObjects).map(function (elementObject) {
          var element = this.toElementDescriptor(elementObject);
          this.disallowProperty(elementObject, "finisher", "An element descriptor");
          this.disallowProperty(elementObject, "extras", "An element descriptor");
          return element;
        }, this);
      },
      toElementDescriptor: function (elementObject) {
        var kind = String(elementObject.kind);

        if (kind !== "method" && kind !== "field") {
          throw new TypeError('An element descriptor\'s .kind property must be either "method" or' + ' "field", but a decorator created an element descriptor with' + ' .kind "' + kind + '"');
        }

        var key = _toPropertyKey(elementObject.key);

        var placement = String(elementObject.placement);

        if (placement !== "static" && placement !== "prototype" && placement !== "own") {
          throw new TypeError('An element descriptor\'s .placement property must be one of "static",' + ' "prototype" or "own", but a decorator created an element descriptor' + ' with .placement "' + placement + '"');
        }

        var descriptor = elementObject.descriptor;
        this.disallowProperty(elementObject, "elements", "An element descriptor");
        var element = {
          kind: kind,
          key: key,
          placement: placement,
          descriptor: Object.assign({}, descriptor)
        };

        if (kind !== "field") {
          this.disallowProperty(elementObject, "initializer", "A method descriptor");
        } else {
          this.disallowProperty(descriptor, "get", "The property descriptor of a field descriptor");
          this.disallowProperty(descriptor, "set", "The property descriptor of a field descriptor");
          this.disallowProperty(descriptor, "value", "The property descriptor of a field descriptor");
          element.initializer = elementObject.initializer;
        }

        return element;
      },
      toElementFinisherExtras: function (elementObject) {
        var element = this.toElementDescriptor(elementObject);

        var finisher = _optionalCallableProperty(elementObject, "finisher");

        var extras = this.toElementDescriptors(elementObject.extras);
        return {
          element: element,
          finisher: finisher,
          extras: extras
        };
      },
      fromClassDescriptor: function (elements) {
        var obj = {
          kind: "class",
          elements: elements.map(this.fromElementDescriptor, this)
        };
        var desc = {
          value: "Descriptor",
          configurable: true
        };
        Object.defineProperty(obj, Symbol.toStringTag, desc);
        return obj;
      },
      toClassDescriptor: function (obj) {
        var kind = String(obj.kind);

        if (kind !== "class") {
          throw new TypeError('A class descriptor\'s .kind property must be "class", but a decorator' + ' created a class descriptor with .kind "' + kind + '"');
        }

        this.disallowProperty(obj, "key", "A class descriptor");
        this.disallowProperty(obj, "placement", "A class descriptor");
        this.disallowProperty(obj, "descriptor", "A class descriptor");
        this.disallowProperty(obj, "initializer", "A class descriptor");
        this.disallowProperty(obj, "extras", "A class descriptor");

        var finisher = _optionalCallableProperty(obj, "finisher");

        var elements = this.toElementDescriptors(obj.elements);
        return {
          elements: elements,
          finisher: finisher
        };
      },
      runClassFinishers: function (constructor, finishers) {
        for (var i = 0; i < finishers.length; i++) {
          var newConstructor = (0, finishers[i])(constructor);

          if (newConstructor !== undefined) {
            if (typeof newConstructor !== "function") {
              throw new TypeError("Finishers must return a constructor.");
            }

            constructor = newConstructor;
          }
        }

        return constructor;
      },
      disallowProperty: function (obj, name, objectType) {
        if (obj[name] !== undefined) {
          throw new TypeError(objectType + " can't have a ." + name + " property.");
        }
      }
    };
    return api;
  }

  function _createElementDescriptor(def) {
    var key = _toPropertyKey(def.key);

    var descriptor;

    if (def.kind === "method") {
      descriptor = {
        value: def.value,
        writable: true,
        configurable: true,
        enumerable: false
      };
    } else if (def.kind === "get") {
      descriptor = {
        get: def.value,
        configurable: true,
        enumerable: false
      };
    } else if (def.kind === "set") {
      descriptor = {
        set: def.value,
        configurable: true,
        enumerable: false
      };
    } else if (def.kind === "field") {
      descriptor = {
        configurable: true,
        writable: true,
        enumerable: true
      };
    }

    var element = {
      kind: def.kind === "field" ? "field" : "method",
      key: key,
      placement: def.static ? "static" : def.kind === "field" ? "own" : "prototype",
      descriptor: descriptor
    };
    if (def.decorators) element.decorators = def.decorators;
    if (def.kind === "field") element.initializer = def.value;
    return element;
  }

  function _coalesceGetterSetter(element, other) {
    if (element.descriptor.get !== undefined) {
      other.descriptor.get = element.descriptor.get;
    } else {
      other.descriptor.set = element.descriptor.set;
    }
  }

  function _coalesceClassElements(elements) {
    var newElements = [];

    var isSameElement = function (other) {
      return other.kind === "method" && other.key === element.key && other.placement === element.placement;
    };

    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      var other;

      if (element.kind === "method" && (other = newElements.find(isSameElement))) {
        if (_isDataDescriptor(element.descriptor) || _isDataDescriptor(other.descriptor)) {
          if (_hasDecorators(element) || _hasDecorators(other)) {
            throw new ReferenceError("Duplicated methods (" + element.key + ") can't be decorated.");
          }

          other.descriptor = element.descriptor;
        } else {
          if (_hasDecorators(element)) {
            if (_hasDecorators(other)) {
              throw new ReferenceError("Decorators can't be placed on different accessors with for " + "the same property (" + element.key + ").");
            }

            other.decorators = element.decorators;
          }

          _coalesceGetterSetter(element, other);
        }
      } else {
        newElements.push(element);
      }
    }

    return newElements;
  }

  function _hasDecorators(element) {
    return element.decorators && element.decorators.length;
  }

  function _isDataDescriptor(desc) {
    return desc !== undefined && !(desc.value === undefined && desc.writable === undefined);
  }

  function _optionalCallableProperty(obj, name) {
    var value = obj[name];

    if (value !== undefined && typeof value !== "function") {
      throw new TypeError("Expected '" + name + "' to be a function");
    }

    return value;
  }

  function _classPrivateMethodGet(receiver, privateSet, fn) {
    if (!privateSet.has(receiver)) {
      throw new TypeError("attempted to get private field on non-instance");
    }

    return fn;
  }

  function _checkPrivateRedeclaration(obj, privateCollection) {
    if (privateCollection.has(obj)) {
      throw new TypeError("Cannot initialize the same private elements twice on an object");
    }
  }

  function _classPrivateFieldInitSpec(obj, privateMap, value) {
    _checkPrivateRedeclaration(obj, privateMap);

    privateMap.set(obj, value);
  }

  function _classPrivateMethodInitSpec(obj, privateSet) {
    _checkPrivateRedeclaration(obj, privateSet);

    privateSet.add(obj);
  }

  function _classPrivateMethodSet() {
    throw new TypeError("attempted to reassign private method");
  }

  var xmlns = 'http://www.w3.org/2000/svg';
  var animation = [];
  exports.frame = [];
  exports.animationCount = -1;
  var animationLength = 0;
  var animationLoading = 0;
  var frozen = false;
  var playStarted = false;
  var smallestFrameTime = 0;
  var smallestTimeBuffer = 0;
  var debugAnimation = false;
  var timeoutObj;
  /**
   * Exposes a near-zero cost console logger.
   *
   * @example debug(() => 'My logging statement'); // only prints if debugAnimation is set
   * @example debug(() => ['My logging statement', { state }]); // Prints the message and state if debugAnimation is set
   */

  function debug(loggerFn) {
    if (!debugAnimation) return;
    var loggingArgs = loggerFn();

    if (Array.isArray(loggingArgs)) {
      var _console;

      (_console = console).log.apply(_console, _toConsumableArray(loggingArgs));
    } else {
    }
  } /// ////////// BEZIER

  function arcLength(p1, p2) {
    var result = Math.sqrt(Math.pow(p2[0] - p1[0], 2) + Math.pow(p2[1] - p1[1], 2));
    return result;
  }
  function bezierCurve(p1, c1, c2, p2, fromT, toT, isLayer, animationId, refKey, addTransformation, objectId, depth, customFlag) {
    var newNodes = [];

    if (c1.hasOwnProperty('x')) {} else if (c1.length >= 1) {
      c1.x = c1[0];

      if (refKey == 'p' || refKey == 's') {
        c1.y = c1[1];
      }
    }

    if (c2.hasOwnProperty('x')) {} else if (c2.length >= 1) {
      c2.x = c1[0];

      if (refKey == 'p' || refKey == 's') {
        c2.y = c1[1];
      }
    }

    if (refKey == 's') {
      if (c1.x.length > 1) {
        c1.x = c1.x[0];
        c1.y = c1.y[0];
      }

      if (c2.x.length > 1) {
        c2.x = c2.x[0];
        c2.y = c2.y[0];
      }
    }

    var frames = toT - fromT;
    var timeTick;
    var oneMinusT;
    var currentFrame = fromT;

    for (var i = 1; i < frames; i++) {
      timeTick = i / frames;
      oneMinusT = 1 - timeTick;
      newNodes.push({
        _comp: 1,
        t: 0
      });
      currentFrame++;
      newNodes[newNodes.length - 1]._frame = parseInt(currentFrame);
      newNodes[newNodes.length - 1].t = parseInt(currentFrame);
      newNodes[newNodes.length - 1].s = [];

      if (refKey != 'ks') {
        if (p1.length > 4) {
          for (var m = 0; m < p1.length / 4; m++) {
            newNodes[newNodes.length - 1].s.push(Math.pow(oneMinusT, 3) * p1[m * 4] + 3 * Math.pow(oneMinusT, 2) * timeTick * (c1.x + p1[m * 4]) + 3 * oneMinusT * Math.pow(timeTick, 2) * (c2.x + p2[m * 4]) + Math.pow(timeTick, 3) * p2[m * 4]);

            for (var n = 1; n < 4; n++) {
              newNodes[newNodes.length - 1].s.push(Math.pow(oneMinusT, 3) * p1[m * 4 + n] + 3 * Math.pow(oneMinusT, 2) * timeTick * (c1.y + p1[m * 4 + n]) + 3 * oneMinusT * Math.pow(timeTick, 2) * (c2.y + p2[m * 4 + n]) + Math.pow(timeTick, 3) * p2[m * 4 + n]);
            }
          }
        } else {
          newNodes[newNodes.length - 1].s.push(Math.pow(oneMinusT, 3) * p1[0] + 3 * Math.pow(oneMinusT, 2) * timeTick * (c1.x + p1[0]) + 3 * oneMinusT * Math.pow(timeTick, 2) * (c2.x + p2[0]) + Math.pow(timeTick, 3) * p2[0]);

          if (refKey != 'x' && refKey != 'y') {
            if (refKey == 'p' || refKey == 's') {
              newNodes[newNodes.length - 1].s.push(Math.pow(oneMinusT, 3) * p1[1] + 3 * Math.pow(oneMinusT, 2) * timeTick * (c1.y + p1[1]) + 3 * oneMinusT * Math.pow(timeTick, 2) * (c2.y + p2[1]) + Math.pow(timeTick, 3) * p2[1]);
            }
          }
        }
      } else {
        newNodes[newNodes.length - 1].s.push({
          i: [],
          o: [],
          v: []
        });
        var j = 0;

        for (var k = 0; k < p1[j].i.length; k++) {
          newNodes[newNodes.length - 1].s[newNodes[newNodes.length - 1].s.length - 1].i.push([Math.pow(oneMinusT, 3) * p1[j].i[k][0] + 3 * Math.pow(oneMinusT, 2) * timeTick * (c1.x + p1[j].i[k][0]) + 3 * oneMinusT * Math.pow(timeTick, 2) * (c2.x + p2[j].i[k][0]) + Math.pow(timeTick, 3) * p2[j].i[k][0], Math.pow(oneMinusT, 3) * p1[j].i[k][1] + 3 * Math.pow(oneMinusT, 2) * timeTick * (c1.y + p1[j].i[k][1]) + 3 * oneMinusT * Math.pow(timeTick, 2) * (c2.y + p2[j].i[k][1]) + Math.pow(timeTick, 3) * p2[j].i[k][1]]);
          newNodes[newNodes.length - 1].s[newNodes[newNodes.length - 1].s.length - 1].o.push([Math.pow(oneMinusT, 3) * p1[j].o[k][0] + 3 * Math.pow(oneMinusT, 2) * timeTick * (c1.x + p1[j].o[k][0]) + 3 * oneMinusT * Math.pow(timeTick, 2) * (c2.x + p2[j].o[k][0]) + Math.pow(timeTick, 3) * p2[j].o[k][0], Math.pow(oneMinusT, 3) * p1[j].o[k][1] + 3 * Math.pow(oneMinusT, 2) * timeTick * (c1.y + p1[j].o[k][1]) + 3 * oneMinusT * Math.pow(timeTick, 2) * (c2.y + p2[j].o[k][1]) + Math.pow(timeTick, 3) * p2[j].o[k][1]]);
          newNodes[newNodes.length - 1].s[newNodes[newNodes.length - 1].s.length - 1].v.push([Math.pow(oneMinusT, 3) * p1[j].v[k][0] + 3 * Math.pow(oneMinusT, 2) * timeTick * (c1.x + p1[j].v[k][0]) + 3 * oneMinusT * Math.pow(timeTick, 2) * (c2.x + p2[j].v[k][0]) + Math.pow(timeTick, 3) * p2[j].v[k][0], Math.pow(oneMinusT, 3) * p1[j].v[k][1] + 3 * Math.pow(oneMinusT, 2) * timeTick * (c1.y + p1[j].v[k][1]) + 3 * oneMinusT * Math.pow(timeTick, 2) * (c2.y + p2[j].v[k][1]) + Math.pow(timeTick, 3) * p2[j].v[k][1]]);
        }
      }

      if (addTransformation > -1 && refKey != 'ks' && customFlag != 'length') {
        if (newNodes[newNodes.length - 1].hasOwnProperty('s')) {
          addGroupPositionTransform(currentFrame, newNodes[newNodes.length - 1].s, isLayer, animationId, refKey, addTransformation, objectId, depth);
        }
      }
    }

    return newNodes;
  } /// ////////// ANIMATOR

  function loadFrame(i, _currentFrame) {
    for (var ref = 0; ref < animation[i]._refObj.length; ref++) {
      var refObj = animation[i]._refObj[ref];
      var nextObj = false;

      for (var m = _currentFrame - 1; m >= 0; m--) {
        for (var n = 0; n < animation[i]._scene[m]._transform.length; n++) {
          /*
          if (animation[i]._scene[m]._transform[n].refObj == refObj) {
            currentObj = document.getElementById(animation[i]._scene[m]._transform[n].refObj);
            currentObjOther = document.getElementById(animation[i]._scene[m]._transform[n].refObjOther);
            if (
              animation[i]._scene[m]._transform[n].isTween ||
              animation[i]._scene[m]._transform[n].combined.length > 0
            ) {
              if (animation[i]._scene[m]._transform[n].isTween) {
                currentObj.setAttribute('d', animation[i]._scene[m]._transform[n].dataString);
              }
              currentObj.setAttribute('transform', animation[i]._scene[m]._transform[n].combined);
              currentObjOther.setAttribute('opacity', animation[i]._scene[m]._transform[n].opacity);
              nextObj = true;
              break;
            }
          }
          */
          if (animation[i]._scene[m]._transform[n].refObj == refObj) {
            if (animation[i]._scene[m]._transform[n].fillSet) {
              if (animation[i]._scene[m]._transform[n].isGradient) {
                var stops = document.getElementById(animation[i]._scene[m]._transform[n].fillObj).querySelectorAll("stop");

                for (var o = 0; o < stops.length; o++) {
                  stops[o].setAttribute("offset", animation[i]._scene[m]._transform[n].offsets[m]);
                  stops[o].setAttribute("style", animation[i]._scene[m]._transform[n].styles[m]);
                }
              } else {}
            } else {
              if (animation[i]._scene[m]._transform[n].refObjSet) {
                var currentObj = document.getElementById(animation[i]._scene[m]._transform[n].refObj);
                var currentObjOther = document.getElementById(animation[i]._scene[m]._transform[n].refObjOther);

                if (animation[i]._scene[m]._transform[n].isTween) {
                  currentObj.setAttribute('d', animation[i]._scene[m]._transform[n].dataString);
                }

                if (animation[i]._scene[m]._transform[n].combined.length > 0) {
                  currentObj.setAttribute('transform', animation[i]._scene[m]._transform[n].combined);
                }

                if (animation[i]._scene[m]._transform[n].fillSet) {
                  currentObj.setAttribute('fill', animation[i]._scene[m]._transform[n].fill);
                }

                if (animation[i]._scene[m]._transform[n].strokeWidth > -1) {
                  currentObj.setAttribute('stroke-width', animation[i]._scene[m]._transform[n].strokeWidth);
                }

                currentObjOther.setAttribute('opacity', animation[i]._scene[m]._transform[n].opacity);
                nextObj = true;
                break;
              }

              if (animation[i]._scene[m]._transform[n].hide && animation[i]._scene[m]._transform[n].stageEvent) {
                document.getElementById(animation[i]._scene[m]._transform[n].stageObj).style.display = 'none';
              }

              if (animation[i]._scene[m]._transform[n].show && animation[i]._scene[m]._transform[n].stageEvent) {
                document.getElementById(animation[i]._scene[m]._transform[n].stageObj).style.display = 'block';
              }
            }
          }

          if (nextObj) break;
        }

        if (nextObj) break;
      } //if (nextObj) continue;

    }
  }
  function lottiemate() {
    var currentDate = Date.now();

    for (var i = 0; i <= exports.animationCount; i++) {
      if (animation[i]._loaded && currentDate - animation[i]._lastTime >= animation[i]._frameTime - 20) {
        if (animation[i]._removed || animation[i]._paused) {
          continue; //return;
        }

        if (animation[i]._debugAnimation) {
          // DEBUG
          animation[i]._timeElapsed = animation[i]._timeElapsed + (currentDate - animation[i]._lastTime);
        } //animation[i]._lastFrame = animation[i]._currentFrame;


        animation[i]._currentFrame++;

        if (animation[i]._currentFrame >= animation[i]._totalFrames) {
          animation[i]._loopCount++;

          animation[i]._renderObj.dispatchEvent(new CustomEvent("onLoopComplete", {
            bubbles: true,
            detail: {
              "count": animation[i]._loopCount,
              "animation": i,
              "frame": animation[i]._currentFrame
            }
          }));

          animation[i]._renderObj.dispatchEvent(new CustomEvent("loopComplete", {
            bubbles: true,
            detail: {
              "count": animation[i]._loopCount,
              "animation": i,
              "frame": animation[i]._currentFrame
            }
          }));

          if (!animation[i]._loop) {
            animation[i]._currentFrame--;
            animation[i]._paused = true;
            goToAndStop(animation[i]._currentFrame, '', animation[i]._elementId);
            continue; //return;
          } else {
            animation[i]._currentFrame = 0;
          }
        } //setTimeout(function () {


        for (var j = 0; j < animation[i]._scene[animation[i]._currentFrame]._transform.length; j++) {
          if (animation[i]._scene[animation[i]._currentFrame]._transform[j].fillSet) {
            if (animation[i]._scene[animation[i]._currentFrame]._transform[j].isGradient) {
              var stops = document.getElementById(animation[i]._scene[animation[i]._currentFrame]._transform[j].fillObj).querySelectorAll("stop");

              for (var m = 0; m < stops.length; m++) {
                stops[m].setAttribute("offset", animation[i]._scene[animation[i]._currentFrame]._transform[j].offsets[m]);
                stops[m].setAttribute("style", animation[i]._scene[animation[i]._currentFrame]._transform[j].styles[m]);
              }
            } else {}
          } else {
            if (animation[i]._scene[animation[i]._currentFrame]._transform[j].refObjSet) {
              var currentObj = document.getElementById(animation[i]._scene[animation[i]._currentFrame]._transform[j].refObj);
              var currentObjOther = document.getElementById(animation[i]._scene[animation[i]._currentFrame]._transform[j].refObjOther);

              if (animation[i]._scene[animation[i]._currentFrame]._transform[j].isTween) {
                currentObj.setAttribute('d', animation[i]._scene[animation[i]._currentFrame]._transform[j].dataString);
              }

              if (animation[i]._scene[animation[i]._currentFrame]._transform[j].combined.length > 0) {
                currentObj.setAttribute('transform', animation[i]._scene[animation[i]._currentFrame]._transform[j].combined);
              }

              if (animation[i]._scene[animation[i]._currentFrame]._transform[j].fillSet) {
                currentObj.setAttribute('fill', animation[i]._scene[animation[i]._currentFrame]._transform[j].fill);
              }

              if (animation[i]._scene[animation[i]._currentFrame]._transform[j].strokeWidth > -1) {
                currentObj.setAttribute('stroke-width', animation[i]._scene[animation[i]._currentFrame]._transform[j].strokeWidth);
              }

              currentObjOther.setAttribute('opacity', animation[i]._scene[animation[i]._currentFrame]._transform[j].opacity);
            }

            if (animation[i]._scene[animation[i]._currentFrame]._transform[j].hide && animation[i]._scene[animation[i]._currentFrame]._transform[j].stageEvent) {
              document.getElementById(animation[i]._scene[animation[i]._currentFrame]._transform[j].stageObj).style.display = 'none';
            }

            if (animation[i]._scene[animation[i]._currentFrame]._transform[j].show && animation[i]._scene[animation[i]._currentFrame]._transform[j].stageEvent) {
              document.getElementById(animation[i]._scene[animation[i]._currentFrame]._transform[j].stageObj).style.display = 'block';
            }
          }
        } //}, 0);


        var postRender = Date.now();

        if (animation[i]._debugAnimation) {
          // DEBUG
          var debugDate = Date.now();
          animation[i]._timeElapsed = animation[i]._timeElapsed + (debugDate - currentDate); //animation[i]._debugObj.innerHTML = `required fps: ${animation[i].fr}, current fps: ${animation[i]._timeElapsed}`;

          if (animation[i]._timeElapsed >= 2000) {
            animation[i]._curFPS = 1000 / (currentDate - animation[i]._lastTime);
            animation[i]._debugObj.innerHTML = "required fps: ".concat(animation[i].fr, ", current fps: ").concat(animation[i]._curFPS);
            animation[i]._timeElapsed = 0;
          }
        }

        animation[i]._lastTime = currentDate;
      }
    }

    clearTimeout(timeoutObj);
    setTimeout(function () {
      requestAnimationFrame(lottiemate);
    }, smallestFrameTime - 8 - (postRender - currentDate));
  } /// ////////// BUILD SCENE GRAPH

  var lastRefObj;
  function getEmptyTransform() {
    var transforms = {};
    transforms.translateX = 0;
    transforms.translateY = 0;
    transforms.scaleFactorX = 0;
    transforms.scaleFactorY = 0;
    transforms.rotateAngle = 0;
    transforms.opacityFactor = 0;
    transforms.anchorX = 0;
    transforms.anchorY = 0;
    transforms.paddingX = 0;
    transforms.paddingY = 0;
    transforms.paddingAnchorX = 0;
    transforms.paddingAnchorY = 0;
    transforms.isTranslate = false;
    transforms.fillSet = false;
    transforms.dataString = '';
    transforms.isTween = false;
    transforms.tweenShape = '';
    transforms.refObj = '';
    transforms.combined = '';
    transforms.refObjOther = '';
    transforms.refObjSet = false;
    transforms.hide = false;
    transforms.show = false;
    transforms.stageEvent = false;
    transforms.translate = '';
    transforms.rotate = '';
    transforms.scale = '';
    transforms.opacity = 1;
    transforms.inPoint = -1;
    transforms.outPoint = -1;
    transforms.isLayer = true;
    transforms.stageObj = '';
    transforms.isSet = false; // related to strokes

    transforms.strokeWidth = -1;
    return transforms;
  }
  function getEmptyFillTransform() {
    var transforms = {};
    transforms.fillSet = true;
    transforms.isGradient = false;
    transforms.fill = '';
    transforms.gradientFill = [];
    transforms.fillObj = '';
    return transforms;
  }
  function getEmptyStageTransform() {
    var transforms = {};
    transforms.fillSet = false;
    transforms.stageObj = '';
    transforms.refObj = '';
    transforms.hide = false;
    transforms.show = false;
    return transforms;
  }
  function findExistingTransform(transforms, animationId, frame, forFill, getIndex) {
    var found = 0;

    if (animation[animationId]._scene[parseInt(frame)] === undefined) {
      //console.log(frame);
      if (getIndex) {
        return -1;
      }

      return transforms;
    }

    for (var i = 0; i < animation[animationId]._scene[parseInt(frame)]._transform.length; i++) {
      if (forFill) {
        if (animation[animationId]._scene[parseInt(frame)]._transform[i].fillObj == transforms.fillObj) {
          if (getIndex) {
            return i;
          }

          found = 1;
          break;
        }
      } else {
        if (animation[animationId]._scene[parseInt(frame)]._transform[i].refObj == transforms.refObj) {
          if (getIndex) {
            return i;
          }

          transforms = animation[animationId]._scene[parseInt(frame)]._transform[i];
          found = 1;
          break;
        }
      }
    }

    return transforms;
  }
  function updateTransform(transforms, animationId, frame, forFill) {
    var existing = findExistingTransform(transforms, animationId, frame, forFill, true);

    if (existing == -1) {
      animation[animationId]._scene[parseInt(frame)]._transform.push(transforms);
    } else {
      animation[animationId]._scene[parseInt(frame)]._transform[existing] = transforms;
    }
  }
  function stageSequence(animationId, stageObj, inPoint, outPoint) {
    if (outPoint > animation[animationId]._totalFrames) {
      outPoint = animation[animationId]._totalFrames;
    }

    if (inPoint < 0) {
      inPoint = 0;
    }

    if (inPoint > animation[animationId]._totalFrames) {
      inPoint = animation[animationId]._totalFrames;
    }

    var transforms = getEmptyStageTransform();
    var found = 0;

    if (inPoint > -1) {
      exports.frame = inPoint;

      for (var i = 0; i < animation[animationId]._scene[parseInt(exports.frame)]._transform.length; i++) {
        if (animation[animationId]._scene[parseInt(exports.frame)]._transform[i].stageObj == stageObj) {
          transforms = animation[animationId]._scene[parseInt(exports.frame)]._transform[i];
          found = 1;
          break;
        }
      }

      transforms.stageObj = stageObj;
      transforms.show = true;
      transforms.stageEvent = true;

      animation[animationId]._scene[parseInt(exports.frame)]._transform.push(transforms);
    }

    transforms = getEmptyStageTransform();
    found = 0;

    if (outPoint > -1) {
      exports.frame = outPoint;

      for (var i = 0; i < animation[animationId]._scene[parseInt(exports.frame)]._transform.length; i++) {
        if (animation[animationId]._scene[parseInt(exports.frame)]._transform[i].stageObj == stageObj) {
          transforms = animation[animationId]._scene[parseInt(exports.frame)]._transform[i];
          found = 1;
          break;
        }
      }

      transforms.stageObj = stageObj;
      transforms.hide = true;
      transforms.stageEvent = true;

      animation[animationId]._scene[parseInt(exports.frame)]._transform.push(transforms);
    } else {
      exports.frame = 0;
    }

    transforms = getEmptyStageTransform();
    found = 0;

    if (outPoint > -1 && inPoint > 0) {
      exports.frame = 0;

      for (var i = 0; i < animation[animationId]._scene[parseInt(exports.frame)]._transform.length; i++) {
        if (animation[animationId]._scene[parseInt(exports.frame)]._transform[i].stageObj == stageObj) {
          transforms = animation[animationId]._scene[parseInt(exports.frame)]._transform[i];
          found = 1;
          break;
        }
      }

      transforms.stageObj = stageObj;
      transforms.hide = true;
      transforms.stageEvent = true;

      animation[animationId]._scene[parseInt(exports.frame)]._transform.push(transforms);
    }

    var lastState = 0;

    if (exports.frame > 0) {
      for (var j = 0; j <= animation[animationId]._totalFrames; j++) {
        for (var i = 0; i < animation[animationId]._scene[j]._transform.length; i++) {
          if (animation[animationId]._scene[j]._transform[i].stageObj == stageObj) {
            if (animation[animationId]._scene[j]._transform[i].show) {
              lastState = 1;
            }

            if (animation[animationId]._scene[j]._transform[i].hide) {
              lastState = 0;
            }

            if (lastState == 1) {
              animation[animationId]._scene[j]._transform[i].show = true;
            } else {
              animation[animationId]._scene[j]._transform[i].hide = true;
            }
          }
        }
      }
    }
  }
  function addGroupPositionTransform(frame, position, isLayer, animationId, refKey, addTransformation, objectId, depth) {
    if (frame < 0 || addTransformation < 1) {
      return;
    }

    if (frame > animation[animationId]._totalFrames) {
      return;
    }

    var transforms = getEmptyTransform();
    var posX = 0;

    if (isLayer) {
      if (objectId.hasOwnProperty('_currentLayerGroup')) {
        //if (objectId._currentLayerGroup._layer > 0) {
        //console.log('inpoint');
        if (objectId._currentLayerGroup._inPoint >= 0) {
          //console.log('inpoint');
          transforms.inPoint = parseInt(objectId._currentLayerGroup._inPoint);
        }

        if (objectId._currentLayerGroup._outPoint > 0) {
          transforms.outPoint = parseInt(objectId._currentLayerGroup._outPoint);
        }
      } else {
        if (objectId.hasOwnProperty('_currentLayer')) {
          if (objectId._currentLayer._inPoint >= 0) {
            //console.log('inpoint');
            transforms.inPoint = parseInt(objectId._currentLayer._inPoint);
          }

          if (objectId._currentLayer._outPoint > 0) {
            transforms.outPoint = parseInt(objectId._currentLayer._outPoint);
          }
        }
      }
    } else {}

    if (transforms.inPoint < 0 && transforms.outPoint < 0) {
      if (frame != transforms.inPoint && frame != transforms.outPoint) {
        if (Array.isArray(position)) {
          posX = position[0];

          if (Number.isNaN(posX)) {
            return;
          }
        } else {
          posX = position;

          if (Number.isNaN(posX)) {
            posX = position[0];

            if (Number.isNaN(posX)) {
              return;
            }
          }
        }
      }
    }

    if (isLayer) {
      transforms.isLayer = true;

      if (objectId.td > 0) {
        transforms.refObj = "".concat(animationId, "_").concat(depth, "_layerGroup").concat(objectId._layer);
      } else {
        transforms.refObj = "".concat(animationId, "_").concat(depth, "_layerTranslate").concat(objectId._layer);
      }

      transforms.refObjOther = "".concat(animationId, "_").concat(depth, "_layerGroup").concat(objectId._layer);
    } else {
      transforms.isLayer = false;
      transforms.refObj = "".concat(animationId, "_group").concat(animation[animationId]._currentShapeGroup);
      transforms.refObjOther = "".concat(animationId, "_group").concat(animation[animationId]._currentShapeGroup);
    }

    transforms.anchorX = objectId._anchorX;
    transforms.anchorY = objectId._anchorY;
    transforms = findExistingTransform(transforms, animationId, frame);

    if (animation[animationId]._instated.hasOwnProperty(transforms.refObj)) {} else {
      animation[animationId]._refObj.push(transforms.refObj);

      animation[animationId]._objSize[transforms.refObj] = [];
      animation[animationId]._objSize[transforms.refObj][0] = document.getElementById(transforms.refObj).getBoundingClientRect().width;
      animation[animationId]._objSize[transforms.refObj][1] = document.getElementById(transforms.refObj).getBoundingClientRect().height;
    }

    var sizeObjFromTransform = animation[animationId]._objSize[transforms.refObj];

    if (objectId._layer == 3) {
      debug(function () {
        return ['GroupPositionTransform: Layer 3', [sizeObjFromTransform[0], sizeObjFromTransform[1]], [transforms.anchorX, transforms.anchorY]];
      });
    }

    transforms.refObjSet = true;
    var posY = 0;

    if (refKey == 'r') {
      transforms.rotateAngle += posX;

      if (objectId.hasOwnProperty('_anchorX') && objectId.hasOwnProperty('_anchorY')) {
        transforms.rotate = "rotate(".concat(transforms.rotateAngle, ",").concat(objectId._anchorX, ",").concat(objectId._anchorY, ") ");
      } else {
        transforms.rotate = "rotate(".concat(transforms.rotateAngle, ",").concat(document.getElementById(transforms.refObj).getBoundingClientRect().width / 2, ",").concat(document.getElementById(transforms.refObj).getBoundingClientRect().height / 2, ") ");
      }
    }

    var tempBoundingW;
    var tempBoundingH;

    if (refKey == 's') {
      transforms.scaleFactorX += posX;
      tempBoundingW = sizeObjFromTransform[0];
      tempBoundingH = sizeObjFromTransform[1];
      var currentScaleX;
      var currentScaleY;

      if (position.length > 1) {
        transforms.scaleFactorY += position[1];
        currentScaleX = 1 - transforms.scaleFactorX / 100;
        currentScaleY = 1 - transforms.scaleFactorY / 100;
      } else {
        currentScaleX = 1 - transforms.scaleFactorX / 100;
        currentScaleY = 1 - transforms.scaleFactorX / 100;
      }

      transforms.scale = "scale(".concat(transforms.scaleFactorX / 100, ",").concat(transforms.scaleFactorY / 100, ") ");
      transforms.paddingX = (transforms.anchorX - tempBoundingW) * currentScaleX + tempBoundingW * currentScaleX;
      transforms.paddingY = (transforms.anchorY - tempBoundingH) * currentScaleY + tempBoundingH * currentScaleY;
      transforms.paddingAnchorX = transforms.anchorX * currentScaleX;
      transforms.paddingAnchorY = transforms.anchorY * currentScaleY;
    }

    if (refKey == 'p') {
      posY = position[1];

      if (objectId.hasOwnProperty('_anchorX')) {
        transforms.translateX += posX;
      }

      if (objectId.hasOwnProperty('_anchorY')) {
        transforms.translateY += posY;
      }

      transforms.translate = "translate(".concat(transforms.translateX - transforms.anchorX, ",").concat(transforms.translateY - transforms.anchorY, ") ");
      transforms.isTranslate = true;
    }

    if (!transforms.isTranslate) {
      transforms.translate = "translate(".concat(transforms.paddingX, ",").concat(transforms.paddingY, ") ");
      transforms.isTranslate = true;
    }

    if (refKey == 'o') {
      transforms.opacityFactor += posX;
      transforms.opacity = transforms.opacityFactor / 100;
    }

    transforms.combined = transforms.translate + transforms.scale + transforms.rotate;
    transforms.isSet = true;

    animation[animationId]._scene[parseInt(frame)]._transform.push(transforms); // Add this transformation head to the root frame if no previous transformations for this refObj exists


    if (frame > 1) {
      var foundPrevious = false;

      for (var i = parseInt(frame) - 1; i > 0; i--) {
        if (animation[animationId]._scene[i]._transform.refObj == transforms.refObj) {
          if (animation[animationId]._scene[i]._transform.isTranslate) {
            foundPrevious = true;
            break;
          }
        }
      }

      if (!foundPrevious) {
        /*for (let i = parseInt(frame) - 1; i > 0; i--) {
          animation[animationId]._scene[i]._transform.push(transforms);
        }*/
      }
    }

    lastRefObj = transforms.refObj;

    if (animation[animationId]._instated.hasOwnProperty(transforms.refObj)) {} else {
      animation[animationId]._instated[transforms.refObj] = 1;

      animation[animationId]._scene[0]._transform.push(transforms);
    }
  } /// ////////// PREP JSON

  function extrapolateValueKeyframe(valueKeyframeObj) {
    return valueKeyframeObj;
  }
  function extrapolateOffsetKeyframe(offsetKeyframeObj, refKey, isLayer, animationId, addTransformation, objectId, depth) {
    var i = 0;
    var objLength = offsetKeyframeObj[refKey].k.length;
    var oldLength = objLength;
    var emptyPos = {
      x: 0,
      y: 0
    };
    var p2;
    var gotI;
    var gotO;

    while (i < objLength - 1) {
      gotI = true;
      gotO = true;

      if (offsetKeyframeObj[refKey].k[i].hasOwnProperty('_comp')) {} else {
        if (addTransformation > -1) {
          if (offsetKeyframeObj[refKey].k[i].hasOwnProperty('s')) {
            addGroupPositionTransform(offsetKeyframeObj[refKey].k[i].t, offsetKeyframeObj[refKey].k[i].s, isLayer, animationId, refKey, addTransformation, objectId, depth);
          } else {
            if (offsetKeyframeObj[refKey].k[i].hasOwnProperty('e')) {
              addGroupPositionTransform(offsetKeyframeObj[refKey].k[i].t, offsetKeyframeObj[refKey].k[i].e, isLayer, animationId, refKey, addTransformation, objectId, depth);
            }
          }
        }
        /*if (offsetKeyframeObj[refKey].k[i].hasOwnProperty('e')) {
          p2 = offsetKeyframeObj[refKey].k[i].e;
        } else if (offsetKeyframeObj[refKey].k[i + 1].hasOwnProperty('s')) {
          p2 = offsetKeyframeObj[refKey].k[i + 1].s;
        }*/


        p2 = offsetKeyframeObj[refKey].k[i + 1].s;

        if (offsetKeyframeObj[refKey].k[i + 1].hasOwnProperty('i') && refKey != 'ks' && addTransformation > -1) {
          if (offsetKeyframeObj[refKey].k[i + 1].i.x < 1) offsetKeyframeObj[refKey].k[i + 1].i.x = 0.0;
          if (offsetKeyframeObj[refKey].k[i + 1].i.y < 1) offsetKeyframeObj[refKey].k[i + 1].i.y = 0.0;
        }

        if (offsetKeyframeObj[refKey].k[i].hasOwnProperty('o') && refKey != 'ks' && addTransformation > -1) {
          if (offsetKeyframeObj[refKey].k[i].o.x < 1) offsetKeyframeObj[refKey].k[i].o.x = 0.0;
          if (offsetKeyframeObj[refKey].k[i].o.y < 1) offsetKeyframeObj[refKey].k[i].o.y = 0.0;
        }

        var returnedKeyframeObj;

        if (offsetKeyframeObj[refKey].k[i].hasOwnProperty('e') && offsetKeyframeObj[refKey].k[i].hasOwnProperty('s')) {
          returnedKeyframeObj = bezierCurve(offsetKeyframeObj[refKey].k[i].s, offsetKeyframeObj[refKey].k[i].o, offsetKeyframeObj[refKey].k[i].i, offsetKeyframeObj[refKey].k[i].e, offsetKeyframeObj[refKey].k[i].t, offsetKeyframeObj[refKey].k[i + 1].t, isLayer, animationId, refKey, addTransformation, objectId, depth);
        } else if (offsetKeyframeObj[refKey].k[i + 1].hasOwnProperty('i') && offsetKeyframeObj[refKey].k[i].hasOwnProperty('o') && gotI) {
          returnedKeyframeObj = bezierCurve(offsetKeyframeObj[refKey].k[i].s, offsetKeyframeObj[refKey].k[i].o, offsetKeyframeObj[refKey].k[i + 1].i, p2, offsetKeyframeObj[refKey].k[i].t, offsetKeyframeObj[refKey].k[i + 1].t, isLayer, animationId, refKey, addTransformation, objectId, depth);
        } else if (offsetKeyframeObj[refKey].k[i].hasOwnProperty('o') && gotO) {
          returnedKeyframeObj = bezierCurve(offsetKeyframeObj[refKey].k[i].s, offsetKeyframeObj[refKey].k[i].o, emptyPos, p2, offsetKeyframeObj[refKey].k[i].t, offsetKeyframeObj[refKey].k[i + 1].t, isLayer, animationId, refKey, addTransformation, objectId, depth);
        } else {
          returnedKeyframeObj = bezierCurve(offsetKeyframeObj[refKey].k[i].s, emptyPos, emptyPos, p2, offsetKeyframeObj[refKey].k[i].t, offsetKeyframeObj[refKey].k[i + 1].t, isLayer, animationId, refKey, addTransformation, objectId, depth);
        }

        for (var s = returnedKeyframeObj.length - 1; s >= 0; s--) {
          offsetKeyframeObj[refKey].k.splice(i + 1, 0, returnedKeyframeObj[s]);
        }

        objLength = offsetKeyframeObj[refKey].k.length;
        i += objLength - oldLength;
        oldLength = objLength;
      }

      i += 1;
    }

    return offsetKeyframeObj;
  }
  function extrapolatePathPosition(currentObj, parentObj, refKey, isLayer, animationId, addTransformation, objectId, depth) {
    currentObj[refKey].k = [];

    if (currentObj[refKey].x.k.length > 1) {
      currentObj[refKey] = extrapolateOffsetKeyframe(currentObj[refKey], 'x', isLayer, animationId, false, objectId, depth);
    } else {}

    if (currentObj[refKey].y.k.length > 1) {
      currentObj[refKey] = extrapolateOffsetKeyframe(currentObj[refKey], 'y', isLayer, animationId, false, objectId, depth);
    } else {}

    if (!Array.isArray(currentObj[refKey].x.k)) {
      for (var i = 0; i < currentObj[refKey].y.k.length; i++) {
        if (currentObj[refKey].y.k[i].hasOwnProperty('s')) {
          currentObj[refKey].k.push({
            i: [0, 0, 0],
            o: [0, 0, 0],
            s: [currentObj[refKey].x.k, currentObj[refKey].y.k[i].s[0], 0],
            t: currentObj[refKey].y.k[i].t
          });
        }
      }
      /*for (var i = 0; i < currentObj[refKey].k.length; i++) {
        if (currentObj[refKey].k[i].hasOwnProperty('s')) {
          addGroupPositionTransform(
            currentObj[refKey].k[i].t,
            currentObj[refKey].k[i].s,
            isLayer,
            animationId,
            refKey,
            addTransformation,
            objectId,
            depth,
          );
        } else {
          if (currentObj[refKey].k[i].hasOwnProperty('e')) {
            addGroupPositionTransform(
              currentObj[refKey].k[i].t,
              currentObj[refKey].k[i].e,
              isLayer,
              animationId,
              refKey,
              addTransformation,
              objectId,
              depth,
            );
          }
        }
      }
       return currentObj;*/

    }

    if (!currentObj[refKey].y.k.isArray) {
      for (var i = 0; i < currentObj[refKey].x.k.length; i++) {
        if (currentObj[refKey].x.k[i].hasOwnProperty('s')) {
          currentObj[refKey].k.push({
            i: [0, 0, 0],
            o: [0, 0, 0],
            s: [currentObj[refKey].x.k[i].s[0], currentObj[refKey].y.k, 0],
            t: currentObj[refKey].x.k[i].t
          });
        }
      }
      /*for (var i = 0; i < currentObj[refKey].k.length; i++) {
        if (currentObj[refKey].k[i].hasOwnProperty('s')) {
          addGroupPositionTransform(
            currentObj[refKey].k[i].t,
            currentObj[refKey].k[i].s,
            isLayer,
            animationId,
            refKey,
            addTransformation,
            objectId,
            depth,
          );
        } else {
          if (currentObj[refKey].k[i].hasOwnProperty('e')) {
            addGroupPositionTransform(
              currentObj[refKey].k[i].t,
              currentObj[refKey].k[i].e,
              isLayer,
              animationId,
              refKey,
              addTransformation,
              objectId,
              depth,
            );
          }
        }
      }
       return currentObj;*/

    }

    if (currentObj[refKey].x.k.length > currentObj[refKey].y.k.length) {
      for (var i = 0; i < currentObj[refKey].x.k.length; i++) {
        currentObj[refKey].k.push({
          i: [0, 0, 0],
          o: [0, 0, 0],
          s: [currentObj[refKey].x.k[i].s[0], 0, 0],
          t: currentObj[refKey].x.k[i].t
        });
      }

      for (var i = 0; i < currentObj[refKey].y.k.length; i++) {
        if (currentObj[refKey].k[0].t > currentObj[refKey].y.k[i].t) {
          currentObj[refKey].k.splice(i, 0, {
            i: [0, 0, 0],
            o: [0, 0, 0],
            s: [0, currentObj[refKey].y.k[i].s[0], 0],
            t: currentObj[refKey].y.k[i].t
          });
        } else if (currentObj[refKey].k[0].t < currentObj[refKey].y.k[i].t) {
          currentObj[refKey].k.push({
            i: [0, 0, 0],
            o: [0, 0, 0],
            s: [0, currentObj[refKey].y.k[i].s[0], 0],
            t: currentObj[refKey].y.k[i].t
          });
        } else if (currentObj[refKey].k[0].t == currentObj[refKey].y.k[i].t) {
          currentObj[refKey].k.s[1] = currentObj[refKey].y.k[i].s[0];
        }
      }
      /*for (var i = 0; i < currentObj[refKey].k.length; i++) {
        if (currentObj[refKey].k[i].hasOwnProperty('s')) {
          addGroupPositionTransform(
            currentObj[refKey].k[i].t,
            currentObj[refKey].k[i].s,
            isLayer,
            animationId,
            refKey,
            addTransformation,
            objectId,
          );
        } else {
          if (currentObj[refKey].k[i].hasOwnProperty('e')) {
            addGroupPositionTransform(
              currentObj[refKey].k[i].t,
              currentObj[refKey].k[i].e,
              isLayer,
              animationId,
              refKey,
              addTransformation,
              objectId,
              depth,
            );
          }
        }
      }
       return currentObj;*/

    }

    if (currentObj[refKey].x.k.length < currentObj[refKey].y.k.length) {
      for (var i = 0; i < currentObj[refKey].y.k.length; i++) {
        currentObj[refKey].k.push({
          i: [0, 0, 0],
          o: [0, 0, 0],
          s: [0, currentObj[refKey].y.k[i].s[0], 0],
          t: currentObj[refKey].y.k[i].t
        });
      }

      for (var i = 0; i < currentObj[refKey].x.k.length; i++) {
        if (currentObj[refKey].k[0].t > currentObj[refKey].x.k[i].t) {
          currentObj[refKey].k.splice(i, 0, {
            i: [0, 0, 0],
            o: [0, 0, 0],
            s: [currentObj[refKey].x.k[i].s[0], 0, 0],
            t: currentObj[refKey].x.k[i].t
          });
        } else if (currentObj[refKey].k[0].t < currentObj[refKey].x.k[i].t) {
          currentObj[refKey].k.push({
            i: [0, 0, 0],
            o: [0, 0, 0],
            s: [currentObj[refKey].x.k[i].s[0], 0, 0],
            t: currentObj[refKey].x.k[i].t
          });
        } else if (currentObj[refKey].k[0].t == currentObj[refKey].x.k[i].t) {
          currentObj[refKey].k.s[0] = currentObj[refKey].x.k[i].s[0];
        }
      }
      /*for (var i = 0; i < currentObj[refKey].k.length; i++) {
        if (currentObj[refKey].k[i].hasOwnProperty('s')) {
          addGroupPositionTransform(
            currentObj[refKey].k[i].t,
            currentObj[refKey].k[i].s,
            isLayer,
            animationId,
            refKey,
            addTransformation,
            objectId,
            depth,
          );
        } else {
          if (currentObj[refKey].k[i].hasOwnProperty('e')) {
            addGroupPositionTransform(
              currentObj[refKey].k[i].t,
              currentObj[refKey].k[i].e,
              isLayer,
              animationId,
              refKey,
              addTransformation,
              objectId,
              depth,
            );
          }
        }
      }
       return currentObj;*/

    }

    for (var i = 0; i < currentObj[refKey].k.length; i++) {
      if (currentObj[refKey].k[i].hasOwnProperty('s')) {
        addGroupPositionTransform(currentObj[refKey].k[i].t, currentObj[refKey].k[i].s, isLayer, animationId, refKey, addTransformation, objectId, depth);
      } else {
        if (currentObj[refKey].k[i].hasOwnProperty('e')) {
          addGroupPositionTransform(currentObj[refKey].k[i].t, currentObj[refKey].k[i].e, isLayer, animationId, refKey, addTransformation, objectId, depth);
        } else {
          if (currentObj[refKey].k[i - 1].hasOwnProperty('e')) {
            addGroupPositionTransform(currentObj[refKey].k[i].t, currentObj[refKey].k[i - 1].e, isLayer, animationId, refKey, addTransformation, objectId, depth);
          }
        }
      }
    }

    return currentObj;
  }
  function getPosition(currentObj, parentObj, refKey, isLayer, animationId, addTransformation, objectId, depth) {
    if (currentObj.hasOwnProperty(refKey)) {
      if (currentObj[refKey].hasOwnProperty('x') && currentObj[refKey].hasOwnProperty('y')) {
        currentObj = extrapolatePathPosition(currentObj, parentObj, refKey, isLayer, animationId, addTransformation, objectId, depth);
      }

      if (currentObj[refKey].hasOwnProperty('k')) {
        if (currentObj[refKey].k.length > 1) {
          if (currentObj[refKey].k[0].hasOwnProperty('s')) {
            currentObj = extrapolateOffsetKeyframe(currentObj, refKey, isLayer, animationId, addTransformation, objectId, depth);
          }
        }
      }
    }

    return currentObj;
  }
  function prepShapeEl(shapeObj, referrer, animationId, addTransformation, depth) {
    var newShape = document.createElementNS(xmlns, 'ellipse');
    newShape.setAttribute('cx', shapeObj.p.k[0]);
    newShape.setAttribute('cy', shapeObj.p.k[1]);
    newShape.setAttribute('rx', shapeObj.s.k[0]);
    newShape.setAttribute('ry', shapeObj.s.k[1]);
    newShape.setAttribute('fill', 'transparent');
    newShape.setAttribute('id', "".concat(animationId, "_shape").concat(shapeObj._shape));
    newShape.classList.add('ellipse');
    referrer.prepend(newShape);
    shapeObj._isShape = true;
    return shapeObj;
  }
  function prepShapeElKeyframe(shapeObj, referrer, animationId, addTransformation, depth) {
    return shapeObj;
  }
  function prepShapeSr(shapeObj, referrer, animationId, addTransformation, depth) {
    var newShape = document.createElementNS(xmlns, 'path');
    newShape.setAttribute('d', dataString);
    newShape.setAttribute('fill', 'transparent');
    newShape.setAttribute('id', "".concat(animationId, "_shape").concat(shapeObj._shape));
    newShape.classList.add('star');
    referrer.prepend(newShape);
    shapeObj._isShape = true;
    return shapeObj;
  }
  function prepShapeSrKeyframe(shapeObj, referrer, animationId, addTransformation, depth) {
    return shapeObj;
  }
  function prepShapeRc(shapeObj, referrer, animationId, addTransformation, depth) {
    var newShape = document.createElementNS(xmlns, 'rect');
    newShape.setAttribute('fill', 'transparent');
    newShape.setAttribute('width', shapeObj.s.k[0]);
    newShape.setAttribute('height', shapeObj.s.k[1]);

    if (shapeObj.p.k.length > 0) {
      newShape.setAttribute('x', shapeObj.p.k[0] + shapeObj.s.k[0] / 2);
      newShape.setAttribute('y', shapeObj.p.k[1] + shapeObj.s.k[1] / 2);
    }

    newShape.setAttribute('id', "".concat(animationId, "_shape").concat(shapeObj._shape));
    newShape.classList.add('rectangle');
    referrer.prepend(newShape);
    shapeObj._isShape = true;
    return shapeObj;
  }
  function prepShapeRcKeyframe(shapeObj, referrer, animationId, addTransformation, depth) {
    return shapeObj;
  }
  function prepDataString(sourceObject, closed) {
    var dataString = "M".concat(sourceObject.v[0][0], ",").concat(sourceObject.v[0][1]);

    for (var i = 1; i < sourceObject.v.length; i++) {
      dataString = "".concat(dataString, " C").concat(sourceObject.v[i - 1][0] + sourceObject.o[i - 1][0], ",").concat(sourceObject.v[i - 1][1] + sourceObject.o[i - 1][1], " ").concat(sourceObject.v[i][0] + sourceObject.i[i][0], ",").concat(sourceObject.v[i][1] + sourceObject.i[i][1], " ").concat(sourceObject.v[i][0], ",").concat(sourceObject.v[i][1]);
    }

    if (closed) {
      dataString = "".concat(dataString, " C").concat(sourceObject.v[sourceObject.v.length - 1][0] + sourceObject.o[sourceObject.v.length - 1][0], ",").concat(sourceObject.v[sourceObject.v.length - 1][1] + sourceObject.o[sourceObject.v.length - 1][1], " ").concat(sourceObject.v[0][0] + sourceObject.i[0][0], ",").concat(sourceObject.v[0][1] + sourceObject.i[0][1], " ").concat(sourceObject.v[0][0], ",").concat(sourceObject.v[0][1]);
      dataString += ' Z';
    }

    return dataString;
  }

  function setDataString(animationId, sourceObj, shapeId, pathClosed, frame, hideThis) {
    var transforms = getEmptyTransform();
    transforms.isLayer = false;

    if (!hideThis) {
      transforms.isTween = true;
    }

    transforms.refObj = "".concat(animationId, "_shape").concat(shapeId);
    transforms.refObjOther = "".concat(animationId, "_shape").concat(shapeId);
    transforms.refObjSet = true;
    transforms = findExistingTransform(transforms, animationId, frame);

    if (hideThis) {
      transforms.hide = true;
    } else {
      transforms.dataString = prepDataString(sourceObj, pathClosed);
    }

    return transforms;
  }

  function prepShapeSh(shapeObj, referrer, animationId, addTransformation, depth) {
    if (shapeObj.ks.k.hasOwnProperty('v')) {} else {
      if (shapeObj.ks.k[0].hasOwnProperty('s')) {
        shapeObj = extrapolateOffsetKeyframe(shapeObj, 'ks', false, animationId, -1, shapeObj, depth);
        var dataString = '';
        var totalK;

        if (shapeObj.ks.k[shapeObj.ks.k.length - 1].hasOwnProperty('s')) {
          totalK = shapeObj.ks.k.length;
        } else {
          totalK = shapeObj.ks.k.length - 1;
        }

        for (var kCount = 0; kCount < totalK; kCount++) {
          /*
          let transforms = getEmptyTransform();
          transforms.isLayer = false;
          transforms.isTween = true;
          transforms.refObj = `${animationId}_shape${shapeObj._shape}`;
          transforms.refObjOther = `${animationId}_shape${shapeObj._shape}`;
          transforms.refObjSet = true;
          transforms = findExistingTransform(transforms, animationId, shapeObj.ks.k[kCount].t);
          var dataString = `M${shapeObj.ks.k[kCount].s[0].v[0][0]},${shapeObj.ks.k[kCount].s[0].v[0][1]}`;
          for (var i = 1; i < shapeObj.ks.k[kCount].s[0].v.length; i++) {
            dataString = `${dataString} C${
              shapeObj.ks.k[kCount].s[0].v[i - 1][0] + shapeObj.ks.k[kCount].s[0].o[i - 1][0]
            },${shapeObj.ks.k[kCount].s[0].v[i - 1][1] + shapeObj.ks.k[kCount].s[0].o[i - 1][1]} ${
              shapeObj.ks.k[kCount].s[0].v[i][0] + shapeObj.ks.k[kCount].s[0].i[i][0]
            },${shapeObj.ks.k[kCount].s[0].v[i][1] + shapeObj.ks.k[kCount].s[0].i[i][1]} ${
              shapeObj.ks.k[kCount].s[0].v[i][0]
            },${shapeObj.ks.k[kCount].s[0].v[i][1]}`;
          }
          if (shapeObj.ks.k[0].s[0].c) {
            dataString = `${dataString} C${
              shapeObj.ks.k[kCount].s[0].v[shapeObj.ks.k[kCount].s[0].v.length - 1][0] +
              shapeObj.ks.k[kCount].s[0].o[shapeObj.ks.k[kCount].s[0].v.length - 1][0]
            },${
              shapeObj.ks.k[kCount].s[0].v[shapeObj.ks.k[kCount].s[0].v.length - 1][1] +
              shapeObj.ks.k[kCount].s[0].o[shapeObj.ks.k[kCount].s[0].v.length - 1][1]
            } ${shapeObj.ks.k[kCount].s[0].v[0][0] + shapeObj.ks.k[kCount].s[0].i[0][0]},${
              shapeObj.ks.k[kCount].s[0].v[0][1] + shapeObj.ks.k[kCount].s[0].i[0][1]
            } ${shapeObj.ks.k[kCount].s[0].v[0][0]},${shapeObj.ks.k[kCount].s[0].v[0][1]}`;
            dataString += ' Z';
          }
          */
          var transforms = setDataString(animationId, shapeObj.ks.k[kCount].s[0], shapeObj._shape, shapeObj.ks.k[0].s[0].c, shapeObj.ks.k[kCount].t, false);

          if (kCount == 0) {
            var newShape = document.createElementNS(xmlns, 'path');
            newShape.setAttribute('fill', 'transparent');
            newShape.setAttribute('id', "".concat(animationId, "_shape").concat(shapeObj._shape));
            newShape.setAttribute('d', dataString);
            newShape.classList.add('shape');
            referrer.prepend(newShape);
            shapeObj._isShape = true;
          }

          if (shapeObj.ks.k[kCount].t > animation[animationId]._totalFrames || shapeObj.ks.k[kCount].t < 0) {
            break;
          }

          animation[animationId]._scene[parseInt(shapeObj.ks.k[kCount].t)]._transform.push(transforms);

          if (kCount == 0) {
            animation[animationId]._scene[1]._transform.push(transforms);
          }
        }
      }

      return shapeObj;
    }

    var dataString = "M".concat(shapeObj.ks.k.v[0][0], ",").concat(shapeObj.ks.k.v[0][1]);

    for (var i = 1; i < shapeObj.ks.k.v.length; i++) {
      dataString = "".concat(dataString, " C").concat(shapeObj.ks.k.v[i - 1][0] + shapeObj.ks.k.o[i - 1][0], ",").concat(shapeObj.ks.k.v[i - 1][1] + shapeObj.ks.k.o[i - 1][1], " ").concat(shapeObj.ks.k.v[i][0] + shapeObj.ks.k.i[i][0], ",").concat(shapeObj.ks.k.v[i][1] + shapeObj.ks.k.i[i][1], " ").concat(shapeObj.ks.k.v[i][0], ",").concat(shapeObj.ks.k.v[i][1]);
    }

    if (shapeObj.ks.k.c) {
      dataString = "".concat(dataString, " C").concat(shapeObj.ks.k.v[shapeObj.ks.k.v.length - 1][0] + shapeObj.ks.k.o[shapeObj.ks.k.v.length - 1][0], ",").concat(shapeObj.ks.k.v[shapeObj.ks.k.v.length - 1][1] + shapeObj.ks.k.o[shapeObj.ks.k.v.length - 1][1], " ").concat(shapeObj.ks.k.v[0][0] + shapeObj.ks.k.i[0][0], ",").concat(shapeObj.ks.k.v[0][1] + shapeObj.ks.k.i[0][1], " ").concat(shapeObj.ks.k.v[0][0], ",").concat(shapeObj.ks.k.v[0][1]);
      dataString += ' Z';
    }

    shapeObj._data = dataString;
    var newShape = document.createElementNS(xmlns, 'path');
    newShape.setAttribute('fill', 'transparent');
    newShape.setAttribute('id', "".concat(animationId, "_shape").concat(shapeObj._shape));
    newShape.setAttribute('d', dataString);
    newShape.classList.add('shape');
    referrer.prepend(newShape);
    shapeObj._isShape = true;
    return shapeObj;
  }
  function prepShapeShKeyframe(shapeObj, referrer, animationId, depth) {
    return shapeObj;
  }
  function prepShape(shapeObj, referrer, animationId, isMasked, depth) {
    if (shapeObj.ty == 'fl') {
      if (shapeObj.c.k.hasOwnProperty('s')) {
        shapeObj = getPosition(shapeObj, null, 'c', false, animationId, 3, shapeObj, depth);
      }
    }

    if (shapeObj.ty == 'tr') {
      if (shapeObj.hasOwnProperty('a')) {
        if (shapeObj.a.k.hasOwnProperty('s')) {
          shapeObj = getPosition(shapeObj, null, 'a', false, animationId, 2, shapeObj, depth);

          if (shapeObj.a.k[0].t > 0) {
            shapeObj._startI = true;
          }
        }

        if (shapeObj.a.k.length > 1) {
          shapeObj._anchorX = shapeObj.a.k[0];
          shapeObj._anchorY = shapeObj.a.k[1];
        }
      }

      if (shapeObj.hasOwnProperty('p')) {
        if (shapeObj.p.k.hasOwnProperty('s')) {
          shapeObj = getPosition(shapeObj, null, 'p', false, animationId, 2, shapeObj, depth);

          if (shapeObj.p.k[0].t > 0) {
            shapeObj._startI = true;
          }
        }
      }
    }

    if (shapeObj.ty == 'sh') {
      if (shapeObj.hasOwnProperty('ks') && shapeObj.ks.k.length > 1) {
        shapeObj = prepShapeShKeyframe(shapeObj, referrer, animationId, depth);
      }

      shapeObj = prepShapeSh(shapeObj, referrer, animationId, depth);
    }

    if (shapeObj.ty == 'rc') {
      if (shapeObj.hasOwnProperty('ks') && shapeObj.ks.k.length > 1) {
        shapeObj = prepShapeRcKeyframe(shapeObj, referrer, animationId, depth);
      }

      shapeObj = prepShapeRc(shapeObj, referrer, animationId, depth);
    }

    if (shapeObj.ty == 'el') {
      if (shapeObj.hasOwnProperty('ks') && shapeObj.ks.k.length > 1) {
        shapeObj = prepShapeRcKeyframe(shapeObj, referrer, animationId, depth);
      }

      shapeObj = prepShapeEl(shapeObj, referrer, animationId, depth);
    }

    return shapeObj;
  }
  function createGradientDef(start, end, opacity, gradient, radial, animationId, depth) {
    animation[animationId].gradientCount++;
    var newDefId = "".concat(animationId, "_gradient").concat(animation[animationId].gradientCount);
    var newDef;

    if (radial == 2) {
      newDef = document.createElementNS(xmlns, 'radialGradient');

      if (gradient.k.k[0].hasOwnProperty('s')) {
        if (!Number.isNaN(start.k[0] != NaN)) {
          newDef.setAttribute('x1', start.k[0]);
        }

        if (!Number.isNaN(end.k[0])) {
          newDef.setAttribute('x2', end.k[0]);
        }

        if (!Number.isNaN(start.k[1])) {
          newDef.setAttribute('y1', start.k[1]);
        }

        if (!Number.isNaN(end.k[1])) {
          newDef.setAttribute('y2', end.k[1]);
        }
      }
    } else {
      newDef = document.createElementNS(xmlns, 'linearGradient');

      if (gradient.k.k[0].hasOwnProperty('s')) {
        newDef.setAttribute('spreadMethod', 'pad');
        newDef.setAttribute('gradientUnits', 'userSpaceOnUse');

        if (!Number.isNaN(start.k[0])) {
          newDef.setAttribute('x1', start.k[0]);
        }

        if (!Number.isNaN(end.k[0])) {
          newDef.setAttribute('x2', end.k[0]);
        }

        if (!Number.isNaN(start.k[1])) {
          newDef.setAttribute('y1', start.k[1]);
        }

        if (!Number.isNaN(end.k[1])) {
          newDef.setAttribute('y2', end.k[1]);
        }
      }
    }

    newDef.setAttribute('id', newDefId);
    animation[animationId].defs.prepend(newDef);

    if (gradient.k.k[0].hasOwnProperty('s')) {
      var firstRun = true;
      gradient = extrapolateOffsetKeyframe(gradient, 'k', false, animationId, -1, gradient, depth);

      for (var j = 0; j < gradient.k.k.length - 1; j++) {
        var offsets = [];
        var styles = [];
        var opacities = [];
        var transforms = getEmptyFillTransform();
        transforms.offsets = [];
        transforms.styles = [];

        if (gradient.k.k[j].hasOwnProperty('s')) {
          for (var i = 0; i < gradient.p; i++) {
            if (gradient.k.k[j].s[i * 4 + 0] == 0 || isNaN(gradient.k.k[j].s[i * 4 + 0])) {
              offsets.push("0%");
            } else {
              offsets.push("".concat(gradient.k.k[j].s[i * 4 + 0] * 100, "%"));
            }

            styles.push("stop-color:rgb(".concat(parseInt(gradient.k.k[j].s[i * 4 + 1] * 255), ",").concat(parseInt(gradient.k.k[j].s[i * 4 + 2] * 255), ",").concat(parseInt(gradient.k.k[j].s[i * 4 + 3] * 255), ");"));
            opacities.push('stop-opacity:1;');
          }

          if (gradient.k.k[j].s.length > gradient.p * 4) {
            for (var i = 0; i < gradient.p; i++) {
              opacities[i] = "stop-opacity:".concat(gradient.k.k[j].s[i * 2 + gradient.p * 4 + 1], ";");
            }
          }

          transforms.fillObj = newDefId;

          for (var i = 0; i < gradient.p; i++) {
            transforms.offsets.push(offsets[i]);
            transforms.styles.push(styles[i] + opacities[i]);
          }

          transforms.isGradient = true;

          animation[animationId]._scene[parseInt(gradient.k.k[j].t)]._transform.push(transforms);

          if (firstRun) {
            for (var i = 0; i < gradient.p; i++) {
              var newStop = document.createElementNS(xmlns, 'stop');
              newStop.setAttribute('offset', offsets[i]);
              newStop.setAttribute('style', styles[i] + opacities[i]);
              newDef.append(newStop);
            }

            firstRun = false;
          }
        }
      }
    } else {
      var _offsets = [];
      var _styles = [];
      var _opacities = [];

      for (var i = 0; i < gradient.p; i++) {
        if (gradient.k.k[i * 4 + 0] > 0) {
          _offsets.push("".concat(gradient.k.k[i * 4 + 0] * 100, "%"));
        } else {
          _offsets.push("0%");
        }

        _styles.push("stop-color:rgb(".concat(parseInt(gradient.k.k[i * 4 + 1] * 255), ",").concat(parseInt(gradient.k.k[i * 4 + 2] * 255), ",").concat(parseInt(gradient.k.k[i * 4 + 3] * 255), ");"));

        _opacities.push('stop-opacity:1;');
      }

      if (gradient.k.k.length > gradient.p * 4) {
        for (var i = 0; i < gradient.p; i++) {
          _opacities[i] = "stop-opacity:".concat(gradient.k.k[i * 2 + gradient.p * 4 + 1], ";");
        }
      }

      for (var i = 0; i < gradient.p; i++) {
        var _newStop = document.createElementNS(xmlns, 'stop');

        _newStop.setAttribute('offset', _offsets[i]);

        _newStop.setAttribute('style', _styles[i] + _opacities[i]);

        newDef.append(_newStop);
      }
    }

    return "url(#".concat(newDefId, ")");
  } // Enum for line cap types.

  var lcEnum = {
    1: 'butt',
    2: 'round',
    3: 'square'
  }; // Enum for line join options.

  var ljEnum = {
    1: 'miter',
    2: 'round',
    3: 'bevel'
  };
  /**
   * Create all the parameters for stroking a shape.
   * 
   * @param {JSON} color An object that holds the parameters for the color definition.
   * @param {JSON} opacity An object that holds the opacity parameter.
   * @param {JSON} width An object that describes the width of the stroke.
   * @param {integer} lineCap Enum key that describes the line cap type.
   * @param {integer} lineJoin Enum key that describes the line join type.
   * @param {integer} miterLimit The miter limit parameter.
   * @returns {JSON} strokeString An object that lists all the parameters needed for stroking.
   */

  function getStrokeString(shapeObj, animationId, depth, shapeGroup) {
    var strokeString = {
      color: '',
      opacity: 1,
      width: 1,
      lineCap: 'round',
      lineJoin: 'round',
      miterLimit: 0
    };
    strokeString.color = "rgb(".concat(shapeObj.c.k[0] * 255, ",").concat(shapeObj.c.k[1] * 255, ",").concat(shapeObj.c.k[2] * 255, ")");
    strokeString.opacity = shapeObj.o.k / 100;

    if (shapeObj.w.k.length > 1 && shapeObj.w.k[0].hasOwnProperty('s')) {
      var totalK;
      shapeObj = extrapolateOffsetKeyframe(shapeObj, 'w', false, animationId, -1, shapeObj, depth);

      if (shapeObj.w.k[shapeObj.w.k.length - 1].hasOwnProperty('s')) {
        totalK = shapeObj.w.k.length;
      } else {
        totalK = shapeObj.w.k.length - 1;
      }

      for (var sCount = 0; sCount < shapeGroup.length; sCount++) {
        if (shapeGroup[sCount]._isShape) {
          for (var kCount = 0; kCount < shapeObj.w.k.length; kCount++) {
            var transforms = getEmptyTransform();
            transforms.isLayer = false;
            transforms.isTween = false;
            transforms.refObj = "".concat(animationId, "_shape").concat(shapeGroup[sCount]._shape);
            transforms.refObjOther = "".concat(animationId, "_shape").concat(shapeGroup[sCount]._shape);
            transforms.refObjSet = true;
            transforms = findExistingTransform(transforms, animationId, shapeObj.w.k[kCount].t);
            transforms.strokeWidth = shapeObj.w.k[kCount].s;

            if (shapeObj.w.k[kCount].t > animation[animationId]._totalFrames || shapeObj.w.k[kCount].t < 0) {
              break;
            }

            animation[animationId]._scene[parseInt(shapeObj.w.k[kCount].t)]._transform.push(transforms);
          }
        }
      }

      strokeString.width = shapeObj.w.k[0].s;
    } else {
      strokeString.width = shapeObj.w.k;
    }

    strokeString.lineCap = lcEnum[shapeObj.lc];
    strokeString.lineJoin = lcEnum[shapeObj.lj];

    if (strokeString.lineJoin == 1) {
      strokeString.miterLimit = strokeString.lineJoin;
    }

    return strokeString;
  }
  /**
   * Generate a color string that conforms to the format for 'color' property defined by SVG 1.1.
   * 
   * @param {float} redVal The weight of red color as a fraction of 1.
   * @param {float} greenVal The weight of green color as a fraction of 1.
   * @param {float} blueVal The weight of blue color as a fraction of 1.
   * @returns {string} color A valid color value for the 'color' property defined by SVG 1.1.
   */

  function getColorString(redVal, greenVal, blueVal) {
    var color = "rgb(".concat(redVal * 255, ",").concat(greenVal * 255, ",").concat(blueVal * 255, ")");
    return color;
  }
  /**
   * Set the stroke for a group of shapes.
   * 
   * @param {JSON} shapesGroup An array of shapes.
   * @param {JSON} strokeToSet An object that has the parameters that describe styling for the stroke.
   * @param {integer} animationId The serial number of the current animation.
   * @param {boolean} isGradient If 'true', then this stroke has a gradient shading.
   */

  function setShapeStrokes(shapesGroup, strokeToSet, animationId, isGradient) {
    for (var i = 0; i < shapesGroup.length; i++) {
      if (shapesGroup[i]._isShape) {
        document.getElementById("".concat(animationId, "_shape").concat(shapesGroup[i]._shape)).setAttribute('stroke', strokeToSet.color);
        document.getElementById("".concat(animationId, "_shape").concat(shapesGroup[i]._shape)).setAttribute('stroke-width', strokeToSet.width);
        document.getElementById("".concat(animationId, "_shape").concat(shapesGroup[i]._shape)).setAttribute('stroke-linecap', strokeToSet.lineCap);
        document.getElementById("".concat(animationId, "_shape").concat(shapesGroup[i]._shape)).setAttribute('stroke-linejoin', strokeToSet.lineJoin);
        document.getElementById("".concat(animationId, "_shape").concat(shapesGroup[i]._shape)).setAttribute('stroke-opacity', strokeToSet.opacity);

        if (strokeToSet.lineJoin == 1) {
          document.getElementById("".concat(animationId, "_shape").concat(shapesGroup[i]._shape)).setAttribute('stroke-miterlimit', strokeToSet.miterLimit);
        }
      }
    }
  }
  /**
   * Set the color for a group of shapes.
   * 
   * @param {JSON} shapesGroup An array of shapes.
   * @param {string} colorToSet A valid color value for the 'color' property defined by SVG 1.1.
   * @param {integer} animationId The serial number of the current animation.
   * @param {boolean} isGradient If 'true', then the color defintion is for a gradient.
   * @param {boolean} isMasked If 'true', then the color attribute is for a mask.
   */

  function setShapeColors(shapesGroup, colorToSet, animationId, isGradient, isMasked) {
    for (var i = 0; i < shapesGroup.length; i++) {
      if (shapesGroup[i]._isShape && typeof colorToSet !== 'undefined') {
        document.getElementById("".concat(animationId, "_shape").concat(shapesGroup[i]._shape)).setAttribute('fill', colorToSet);
        document.getElementById("".concat(animationId, "_shape").concat(shapesGroup[i]._shape)).setAttribute('fill-opacity', 1);
      }
    }
  }

  function getTrim(shapeObj, animationId, depth, shapeGroup) {
    if (shapeObj.e.k.length > 1 && shapeObj.e.k[0].hasOwnProperty('s')) {
      for (var i = 0; i < shapeObj.e.k.length - 1; i++) {
        if (shapeObj.e.k[i].i.x < 1) {
          shapeObj.e.k[i].i.x = 0;
        }

        if (shapeObj.e.k[i].i.y < 1) {
          shapeObj.e.k[i].i.y = 0;
        }

        if (shapeObj.e.k[i].o.x < 1) {
          shapeObj.e.k[i].o.x = 0;
        }

        if (shapeObj.e.k[i].o.y < 1) {
          shapeObj.e.k[i].o.y = 0;
        }
      }

      shapeObj = extrapolateOffsetKeyframe(shapeObj, 'e', false, animationId, -1, shapeObj, depth);
    }

    if (shapeObj.s.k.length > 1 && shapeObj.s.k[0].hasOwnProperty('s')) {
      for (var _i = 0; _i < shapeObj.s.k.length - 1; _i++) {
        if (shapeObj.s.k[_i].i.x < 1) {
          shapeObj.s.k[_i].i.x = 0;
        }

        if (shapeObj.s.k[_i].i.y < 1) {
          shapeObj.s.k[_i].i.y = 0;
        }

        if (shapeObj.s.k[_i].o.x < 1) {
          shapeObj.s.k[_i].o.x = 0;
        }

        if (shapeObj.s.k[_i].o.y < 1) {
          shapeObj.s.k[_i].o.y = 0;
        }
      }

      shapeObj = extrapolateOffsetKeyframe(shapeObj, 's', false, animationId, -1, shapeObj, depth);
    }

    return shapeObj;
  }

  function getSegment(p1, c1, c2, p2, t0, t1) {
    var u0 = 1.0 - t0;
    var u1 = 1.0 - t1;
    var qxa = p1[0] * u0 * u0 + (c1[0] + p1[0]) * 2 * t0 * u0 + (c2[0] + p2[0]) * t0 * t0;
    var qxb = p1[0] * u1 * u1 + (c1[0] + p1[0]) * 2 * t1 * u1 + (c2[0] + p2[0]) * t1 * t1;
    var qxc = (c1[0] + p1[0]) * u0 * u0 + (c2[0] + p2[0]) * 2 * t0 * u0 + p2[0] * t0 * t0;
    var qxd = (c1[0] + p1[0]) * u1 * u1 + (c2[0] + p2[0]) * 2 * t1 * u1 + p2[0] * t1 * t1;
    var qya = p1[1] * u0 * u0 + (c1[1] + p1[1]) * 2 * t0 * u0 + (c2[1] + p2[1]) * t0 * t0;
    var qyb = p1[1] * u1 * u1 + (c1[1] + p1[1]) * 2 * t1 * u1 + (c2[1] + p2[1]) * t1 * t1;
    var qyc = (c1[1] + p1[1]) * u0 * u0 + (c2[1] + p2[1]) * 2 * t0 * u0 + p2[1] * t0 * t0;
    var qyd = (c1[1] + p1[1]) * u1 * u1 + (c2[1] + p2[1]) * 2 * t1 * u1 + p2[1] * t1 * t1;
    var segment = [];
    segment.push([qxa * u0 + qxc * t0, qya * u0 + qyc * t0]); // p1

    if (p1[0] == p2[0] && c1[0] == c2[0]) {
      segment[0][0] = p1[0];
    }

    if (p1[1] == p2[1] && c1[1] == c2[1]) {
      segment[0][1] = p1[1];
    }

    segment.push([qxa * u1 + qxc * t1, qya * u1 + qyc * t1]); // c1

    segment.push([qxb * u0 + qxd * t0, qyb * u0 + qyd * t0]); // c2

    segment.push([qxb * u1 + qxd * t1, qyb * u1 + qyd * t1]); // p2

    if (p1[0] == p2[0] && c1[0] == c2[0]) {
      segment[3][0] = p1[0];
    }

    if (p1[1] == p2[1] && c1[1] == c2[1]) {
      segment[3][1] = p1[1];
    }

    segment[1][0] -= segment[0][0];
    segment[1][1] -= segment[0][1];
    segment[2][0] -= segment[3][0];
    segment[2][1] -= segment[3][1];
    return segment;
  }

  function getLength(animationId, depth, shapesGroup, shapeIdx, startIdx, endIdx, returnedKeyframeObj, fullBezierLength) {
    var bezierLength = 0;
    returnedKeyframeObj = bezierCurve(shapesGroup[shapeIdx].ks.k.v[startIdx], shapesGroup[shapeIdx].ks.k.o[startIdx], shapesGroup[shapeIdx].ks.k.i[endIdx], shapesGroup[shapeIdx].ks.k.v[endIdx], 1, 50, false, animationId, 's', -1, shapesGroup[shapeIdx].ks.k, depth, 'length');

    for (var k = 0; k < returnedKeyframeObj.length - 1; k++) {
      bezierLength = bezierLength + arcLength(returnedKeyframeObj[k].s, returnedKeyframeObj[k + 1].s); //debug(() => ["blut", bezierLength]);
    }

    bezierLength = bezierLength + arcLength(shapesGroup[shapeIdx].ks.k.v[startIdx], returnedKeyframeObj[0].s); //debug(() => ["blut", bezierLength]);

    bezierLength = bezierLength + arcLength(returnedKeyframeObj[returnedKeyframeObj.length - 1].s, shapesGroup[shapeIdx].ks.k.v[endIdx]);
    fullBezierLength = fullBezierLength + bezierLength;
    shapesGroup[shapeIdx].ks.k.v[startIdx]._l = bezierLength;
    return [shapesGroup, returnedKeyframeObj, fullBezierLength];
  }

  function setTrim(shapesGroup, trimToSet, animationId, depth) {
    debug(function () {
      return ["entered------------------------------------------------------"];
    });

    var _loop2 = function _loop2(i) {
      if (shapesGroup[i].ty == 'gr') {
        //panda.log("entering group");
        setTrim(shapesGroup[i].it, trimToSet, animationId, depth);
      } else {
        if (shapesGroup[i]._isShape) {
          var _ret2 = function () {
            var minShapeT = -1;
            var fullBezierLength = 0;
            var returnedKeyframeObj = {};

            if (shapesGroup[i].ty == 'sh' && shapesGroup[i].ks.k.hasOwnProperty('v') && shapesGroup[i].ks.k.v.length > 1) {
              var _ret3 = function () {
                debug(function () {
                  return ["GLLL", shapesGroup[i].ks];
                });

                for (var j = 0; j < shapesGroup[i].ks.k.v.length - 1; j++) {
                  /*
                  let bezierLength = 0;
                  returnedKeyframeObj = bezierCurve(
                    shapesGroup[i].ks.k.v[j],
                    shapesGroup[i].ks.k.o[j],
                    shapesGroup[i].ks.k.i[j + 1],
                    shapesGroup[i].ks.k.v[j + 1],
                    1,
                    50,
                    false,
                    animationId,
                    's',
                    -1,
                    shapesGroup[i].ks.k,
                    depth,
                    'length',
                  );
                  for (let k = 0; k < returnedKeyframeObj.length - 1; k++) {
                    bezierLength = bezierLength + arcLength(returnedKeyframeObj[k].s, returnedKeyframeObj[k + 1].s);
                    debug(() => ["blut", bezierLength]);
                  }
                  bezierLength = bezierLength + arcLength(shapesGroup[i].ks.k.v[j], returnedKeyframeObj[0].s);
                  debug(() => ["blut", bezierLength]);
                  bezierLength = bezierLength + arcLength(returnedKeyframeObj[returnedKeyframeObj.length - 1].s, shapesGroup[i].ks.k.v[j + 1]);
                  fullBezierLength = fullBezierLength + bezierLength;
                  shapesGroup[i].ks.k.v[j]._l = bezierLength;
                  debug(() => ["blut", bezierLength]);
                  */
                  var _getLength = getLength(animationId, depth, shapesGroup, i, j, j + 1, returnedKeyframeObj, fullBezierLength);

                  var _getLength2 = _slicedToArray(_getLength, 3);

                  shapesGroup = _getLength2[0];
                  returnedKeyframeObj = _getLength2[1];
                  fullBezierLength = _getLength2[2];
                }

                if (shapesGroup[i].ks.k.c == true) {
                  var _getLength3 = getLength(animationId, depth, shapesGroup, i, shapesGroup[i].ks.k.v.length - 1, 0, returnedKeyframeObj, fullBezierLength);

                  var _getLength4 = _slicedToArray(_getLength3, 3);

                  shapesGroup = _getLength4[0];
                  returnedKeyframeObj = _getLength4[1];
                  fullBezierLength = _getLength4[2];
                }

                var minT = -1;
                var maxT = -1;

                if (trimToSet.s.k.length > 1 && trimToSet.s.k[0].t < minT) {
                  minT = trimToSet.s.k[0].t;
                }

                if (minT == -1 && trimToSet.s.k.length > 1) {
                  //debug(() => ['set minT', trimToSet.s.k[0].t]);
                  minT = trimToSet.s.k[0].t;
                }

                if (minT == -1 && trimToSet.e.k.length > 1) {
                  debug(function () {
                    return ['set minT at end', trimToSet.e.k[0].t];
                  });
                  minT = trimToSet.e.k[0].t;
                }

                if (trimToSet.s.k.length > 1 && trimToSet.s.k[trimToSet.s.k.length - 1].t > maxT) {
                  maxT = trimToSet.s.k[trimToSet.s.k.length - 1].t;
                }

                if (trimToSet.e.k.length > 1 && trimToSet.e.k[trimToSet.e.k.length - 1].t > maxT) {
                  maxT = trimToSet.e.k[trimToSet.e.k.length - 1].t;
                }

                if (minT == -1) {
                  if (minT == maxT) {
                    return {
                      v: {
                        v: "continue"
                      }
                    };
                  } else {
                    minT = 0;
                  }
                } //panda.log("maxmin ", minT, maxT);


                var sIndex = -1;
                var eIndex = -1;
                var tempK = Object.assign({}, shapesGroup[i].ks.k);
                debug(function () {
                  return ['stuff', i, minT, maxT, fullBezierLength, tempK, trimToSet];
                });
                minShapeT = minT;

                var _loop3 = function _loop3(t) {
                  var curSL = 0;
                  var curEL = 0;
                  var startShapeIndex = -1;
                  var endShapeIndex = -1;
                  var hideThis = false;
                  var currentS = -1;

                  if (trimToSet.s.k.length > 1 && sIndex < trimToSet.s.k.length - 1 && t >= trimToSet.s.k[0].t) {
                    sIndex++;
                  }

                  if (trimToSet.e.k.length > 1 && eIndex < trimToSet.e.k.length - 2 && t >= trimToSet.e.k[0].t) {
                    eIndex++; //debug(() => ['incr', trimToSet.e.k[eIndex].t, t, eIndex]);
                  }

                  var startSegment = [];
                  var endSegment = [];

                  if (sIndex >= 0 && trimToSet.s.k.length > 1 && trimToSet.s.k[sIndex].t == t && trimToSet.s.k[sIndex].hasOwnProperty('s')) {
                    (function () {
                      curSL = fullBezierLength - fullBezierLength * trimToSet.s.k[sIndex].s[0] / 100;
                      debug(function () {
                        return ['start', t, trimToSet, tempK, curSL];
                      });

                      if (trimToSet.s.k[sIndex].s[0] == 0) {
                        debug(function () {
                          return ['HIDE'];
                        });
                        hideThis = true;
                      }

                      currentS = trimToSet.s.k[sIndex].s[0];
                      var startIdx;
                      var initIdx = 1;

                      if (shapesGroup[i].ks.k.c == true) {//initIdx = 0;
                      }

                      var _loop4 = function _loop4(_j) {
                        if (_j == 0) {
                          startIdx = tempK.v.length - 1;
                        } else {
                          startIdx = _j - 1;
                        }

                        debug(function () {
                          return ['circling', curSL, tempK.v[startIdx]._l];
                        });

                        if (curSL < tempK.v[startIdx]._l) {
                          startShapeIndex = _j;
                          startSegment = getSegment(tempK.v[startIdx], tempK.o[startIdx], tempK.i[_j], tempK.v[_j], (tempK.v[startIdx]._l - curSL) / tempK.v[startIdx]._l, 0.999999);
                          debug(function () {
                            return ['hup', t, _j, tempK.v[_j]._l, startSegment, tempK.i.length - startShapeIndex, tempK, startShapeIndex];
                          });
                          return "break";
                        } else {
                          //if (tempK.v[startIdx].hasOwnProperty('_l')) {
                          curSL = curSL - tempK.v[startIdx]._l;
                          /*if (j == tempK.v.length - 1) {
                            startShapeIndex = j;
                          }*/
                          //}
                        }
                      };

                      for (var _j = initIdx; _j < tempK.v.length; _j++) {
                        var _ret5 = _loop4(_j);

                        if (_ret5 === "break") break;
                      }
                    })();
                  }

                  if (eIndex >= 0 && trimToSet.e.k.length > 1 && trimToSet.e.k[eIndex].t == t && trimToSet.e.k[eIndex].hasOwnProperty('s')) {
                    debug(function () {
                      return ['end', t, trimToSet.e.k[eIndex]];
                    });
                    curEL = fullBezierLength - fullBezierLength * (trimToSet.e.k[eIndex].s[0] / 100);

                    if (trimToSet.e.k[eIndex].s[0] == 0) {
                      hideThis = true;
                    }

                    debug(function () {
                      return ['delta', t, trimToSet.e.k[eIndex].t, trimToSet.e.k[eIndex + 1].t, fullBezierLength, curEL, tempK];
                    });
                    currentS = trimToSet.e.k[eIndex].s[0];
                    var endIdx;
                    var initIdx = tempK.v.length - 2;

                    if (shapesGroup[i].ks.k.c == true) {
                      initIdx = tempK.v.length - 1;
                    }

                    var _loop5 = function _loop5(_j2) {
                      debug(function () {
                        return ['circling'];
                      });

                      if (_j2 == tempK.v.length - 1) {
                        endIdx = 0;
                      } else {
                        endIdx = _j2 + 1;
                      }

                      if (curEL < tempK.v[_j2]._l) {
                        endShapeIndex = _j2;
                        endSegment = getSegment(tempK.v[_j2], tempK.o[_j2], tempK.i[endIdx], tempK.v[endIdx], 0.000001, (tempK.v[_j2]._l - curEL) / tempK.v[_j2]._l);
                        debug(function () {
                          return ['hup', t, _j2, (tempK.v[_j2]._l - curEL) / tempK.v[_j2]._l, endSegment, tempK.i.length - endShapeIndex, tempK, endShapeIndex];
                        });
                        return "break";
                      } else {
                        curEL = curEL - tempK.v[_j2]._l;
                      }
                    };

                    for (var _j2 = initIdx; _j2 >= 0; _j2--) {
                      var _ret6 = _loop5(_j2);

                      if (_ret6 === "break") break;
                    }
                  }

                  var sourceK = JSON.parse(JSON.stringify(tempK));
                  var startToTrim = sourceK.v.length;

                  if (endShapeIndex >= 0) {
                    startToTrim = startToTrim - (startToTrim - endShapeIndex);
                    sourceK.o[endShapeIndex] = endSegment[1];
                    sourceK.i.splice(endShapeIndex + 1, sourceK.i.length - 1 - endShapeIndex, endSegment[2]);
                    sourceK.o.splice(endShapeIndex + 1, sourceK.o.length - 1 - endShapeIndex, tempK.o[endShapeIndex]);
                    sourceK.v.splice(endShapeIndex + 1, sourceK.v.length - 1 - endShapeIndex, endSegment[3]);
                    debug(function () {
                      return ['etempK', t, sourceK];
                    });
                  }

                  if (startShapeIndex >= 0) {
                    /*sourceK.i.splice(startShapeIndex - 1, startToTrim - startShapeIndex, [0, 0]);
                    sourceK.o.splice(startShapeIndex - 1, startToTrim - startShapeIndex, startSegment[1]);
                    sourceK.v.splice(startShapeIndex - 1, startToTrim - startShapeIndex, startSegment[0]);*/
                    sourceK.i.splice(0, startShapeIndex, tempK.i[startShapeIndex]);
                    sourceK.o.splice(0, startShapeIndex, startSegment[1]);
                    sourceK.v.splice(0, startShapeIndex, startSegment[0]);
                    sourceK.i[1] = startSegment[2];
                    debug(function () {
                      return ['stempK', t, startShapeIndex, sourceK];
                    });
                  }

                  startShapeIndex = -1;
                  endShapeIndex = -1;
                  /*
                  let startInc = false;
                  let middleInc = false;
                  if (trimToSet.s.k.length > 1) {
                    startInc = true;
                    sourceK.i.push(tempK.i[startShapeIndex]);
                    sourceK.o.push(startSegment[1]);
                    sourceK.v.push(startSegment[0]);
                  }
                   if (endShapeIndex - startShapeIndex > 0 && startInc) {
                    middleInc = true;
                    for (let j = startShapeIndex + 1; j < endShapeIndex; j++) {
                      sourceK.i.push(tempK.i[j]);
                      sourceK.o.push(tempK.o[j]);
                      sourceK.v.push(tempK.v[j]);
                    }
                  }
                   if (trimToSet.e.k.length > 1) {
                    if (! startInc && ! middleInc) {
                      for (let j = startShapeIndex; j < endShapeIndex; j++) {
                        sourceK.i.push(tempK.i[j]);
                        sourceK.o.push(tempK.o[j]);
                        sourceK.v.push(tempK.v[j]);
                      }
                    }
                    sourceK.i.push(tempK.i[endShapeIndex]);
                    sourceK.o.push(endSegment[1]);
                    sourceK.v.push(endSegment[0]);
                  }
                  */

                  var transforms = void 0;

                  if (sourceK.v.length > 1 && !hideThis) {
                    //if (!(shapesGroup[i].ks.k.c && t >= maxT)) {
                    if (sIndex < 0) {
                      sourceK.i.unshift(tempK.i[tempK.i.length - 1]);
                      sourceK.o.unshift(tempK.o[tempK.o.length - 1]);
                      sourceK.v.unshift(tempK.v[tempK.v.length - 1]);
                    }

                    if (eIndex < 0) {
                      sourceK.i.push(tempK.i[0]);
                      sourceK.o.push(tempK.o[0]);
                      sourceK.v.push(tempK.v[0]);
                    } //}


                    if (shapesGroup[i].ks.k.c && t >= maxT) {
                      if (currentS == 0) {
                        transforms = setDataString(animationId, sourceK, shapesGroup[i]._shape, true, t, false);
                      } else {
                        transforms = setDataString(animationId, sourceK, shapesGroup[i]._shape, false, t, false);
                      }
                    } else {
                      transforms = setDataString(animationId, sourceK, shapesGroup[i]._shape, false, t, false);
                    }

                    debug(function () {
                      return ['setString', sourceK, t, sIndex, eIndex];
                    });

                    if (t > animation[animationId]._totalFrames || t < 0) {
                      return "break";
                    }

                    if (t == minT && t >= 0 && trimToSet.s.k.length > 1 && trimToSet.s.k[0].t == t) {
                      debug(function () {
                        return ['FIRST', sourceK];
                      });

                      for (var n = 0; n < t; n++) {
                        //animation[animationId]._scene[parseInt(n)]._transform.push(transforms);
                        updateTransform(transforms, animationId, n);
                      }
                    }

                    animation[animationId]._scene[parseInt(t)]._transform.push(transforms); //updateTransform(transforms, animationId, t);

                  } else {
                    debug(function () {
                      return ['hideit1', sourceK, t, sIndex, eIndex];
                    });

                    if (shapesGroup[i].ks.k.c && t >= maxT && currentS == 0) {
                      transforms = setDataString(animationId, sourceK, shapesGroup[i]._shape, true, t, true);
                    } else {
                      transforms = setDataString(animationId, sourceK, shapesGroup[i]._shape, false, t, true);
                    }

                    if (t == minT && t >= 0) {
                      debug(function () {
                        return ['hideit', sourceK, t];
                      });

                      for (var _n = 0; _n < t; _n++) {
                        //animation[animationId]._scene[parseInt(n)]._transform.push(transforms);
                        updateTransform(transforms, animationId, _n);
                        debug(function () {
                          return ['hiding'];
                        });
                      }
                    } //updateTransform(transforms, animationId, t);


                    animation[animationId]._scene[parseInt(t)]._transform.push(transforms);
                  }
                };

                for (var t = minT; t <= maxT; t++) {
                  var _ret4 = _loop3(t);

                  if (_ret4 === "break") break;
                }
              }();

              if (_typeof(_ret3) === "object") return _ret3.v;
            }
          }();

          if (_typeof(_ret2) === "object") return _ret2.v;
        }
      }
    };

    for (var i = 0; i < shapesGroup.length; i++) {
      var _ret = _loop2(i);

      if (_ret === "continue") continue;
    }
    /*
    let tempEnd = {length:{}};
    let tempStart = {length:{}};
    tempEnd.length = shapeObj.e;
    tempStart.length = shapeObj.s;
    tempEnd = extrapolateOffsetKeyframe(tempEnd, 'length', false, animationId, -1, tempEnd, depth);
    */

  }
  /**
   * Iterate through the shapes in a shape group ('gr') object, prepare the required DOM elements, and trigger the creation of shapes, attributes and transformations.
   * 
   * @param {string} elementId The 'id' attribute of the DOMElement 'elementObj'.
   * @param {integer} animationId The serial number of this animation.
   * @param {JSON} layerObj The JSON object whose root to be scoured for shape items.
   * @param {JSON} referrer The JSON object that contained the 'layerObj' passed in here.
   * @param {string} refGroup The 'id' of the <g> that corresponds to the calling JSON object (pointed to by the 'referrer').
   * @param {boolean} isMasked If 'true', then this group of shapes are masked.
   * @param {integer} depth The level of iteration of precompositions (1 if this is the root layers and their corresponding shape groups).
   * @returns 
   */


  function getShapesGr(elementId, animationId, layerObj, referrer, refLabel, refGroup, isMasked, depth, outer) {
    var currentColor;
    var currentStroke;
    layerObj.currentTrim;
    var stroked = false;
    layerObj.trimmed = false;

    if (outer.trimmed) {
      layerObj.trimmed = true;
      layerObj.currentTrim = outer.currentTrim;
    }

    for (var i = 0; i < layerObj.it.length; i++) {
      layerObj._isGradient = false;
      animation[animationId].shapeCount++;

      if (layerObj.tt > 0) {
        isMasked = layerObj.td;
      }

      if (layerObj.it[i].ty == 'gr') {
        // Shape group
        layerObj.it[i]._group = animation[animationId].shapeCount;
        var newGroup = document.createElementNS(xmlns, 'g');
        newGroup.setAttribute('id', "".concat(animationId, "_group").concat(animation[animationId].shapeCount));
        animation[animationId]._currentShapeGroup = animation[animationId].shapeCount;
        referrer.prepend(newGroup);
        layerObj.it[i] = getShapesGr(elementId, animationId, layerObj.it[i], newGroup, "".concat(animationId, "_group").concat(animation[animationId].shapeCount), refGroup, isMasked, depth, layerObj);
      } else {
        layerObj.it[i]._shape = animation[animationId].shapeCount;
        var tempK = JSON.parse(JSON.stringify(layerObj.it[i])); //debug(() => ['CO', tempK]);

        layerObj.it[i] = prepShape(layerObj.it[i], referrer, animationId, isMasked); //debug(() => ['FRICO', layerObj.it[i]]);

        if (layerObj.it[i].ty == 'tr') {
          // Transformations
          layerObj.it[i]._trIndex = i;

          if (layerObj.it[i].p.hasOwnProperty('k')) {
            if (layerObj.it[i].p.k.length > 1) {
              if (layerObj.it[i].hasOwnProperty('a')) {
                document.getElementById(refLabel).setAttribute('transform', "translate(".concat(layerObj.it[i].p.k[0] - layerObj.it[i].a.k[0], ",").concat(layerObj.it[i].p.k[1] - layerObj.it[i].a.k[1], ")"));
              } else {
                document.getElementById(refLabel).setAttribute('transform', "translate(".concat(layerObj.it[i].p.k[0], ",").concat(layerObj.it[i].p.k[1], ")"));
              }
            }
          }
        }

        if (layerObj.it[i].ty == 'fl') {
          // Fill shape
          if (layerObj.it[i].c.k.length > 1) {
            currentColor = getColorString(layerObj.it[i].c.k[0], layerObj.it[i].c.k[1], layerObj.it[i].c.k[2]);
          }
        }

        if (layerObj.it[i].ty == 'st') {
          // Stroke shape
          if (layerObj.it[i].c.k.length > 1) {
            currentStroke = getStrokeString(layerObj.it[i], animationId, depth, layerObj.it);
            stroked = true;
          }
        }

        if (layerObj.it[i].ty == 'tm') {
          // Stroke shape
          //if (layerObj.it[i].c.k.length > 1) {
          layerObj.currentTrim = getTrim(layerObj.it[i], animationId, depth, layerObj.it); //layerObj.it[i] = currentTrim;

          layerObj.trimmed = true; //}
        }

        if (layerObj.it[i].ty == 'gf') {
          // Gradient fill shape
          layerObj._isGradient = true;
          currentColor = createGradientDef(layerObj.it[i].s, layerObj.it[i].e, layerObj.it[i].o, layerObj.it[i].g, layerObj.it[i].r, animationId, depth);
        }
      }
    }

    setShapeColors(layerObj.it, currentColor, animationId, layerObj._isGradient, isMasked); // Set the color for this group of shapes.

    if (stroked) {
      setShapeStrokes(layerObj.it, currentStroke, animationId); // Set the stroke for this group of shapes.
    }

    if (layerObj.trimmed) {
      debug(function () {
        return ['CurrentTrim', layerObj.currentTrim];
      });
      setTrim(layerObj.it, layerObj.currentTrim, animationId, depth); // Set the trim for this group of shapes.
    }

    return layerObj;
  }
  /**
   * Iterate through the shapes in a layer object, prepare the required DOM elements, and trigger the creation of shapes, attributes and transformations.
   * 
   * @param {string} elementId The 'id' attribute of the DOMElement 'elementObj'.
   * @param {integer} animationId The serial number of this animation.
   * @param {JSON} layerObj The JSON object whose root to be scoured for shape items.
   * @param {JSON} referrer The JSON object that contained the 'layerObj' passed in here.
   * @param {string} refGroup The 'id' of the <g> that corresponds to the calling JSON object (pointed to by the 'referrer').
   * @param {boolean} isMasked If 'true', then this group of shapes are masked.
   * @param {integer} depth The level of iteration of precompositions (1 if this is the root layers and their corresponding shape groups).
   * @returns 
   */

  function getShapes(elementId, animationId, layerObj, referrer, refLabel, refGroup, isMasked, depth) {
    var currentColor;
    var currentStroke;
    layerObj.currentTrim = {};
    var stroked = false;
    layerObj.trimmed = false;

    for (var i = 0; i < layerObj.shapes.length; i++) {
      layerObj._isGradient = false;
      animation[animationId].shapeCount++;

      if (layerObj.tt > 0) {
        isMasked = layerObj.td;
      }

      if (layerObj.shapes[i].ty == 'gr') {
        // Shape group
        layerObj.shapes[i]._group = animation[animationId].shapeCount;
        var newGroup = document.createElementNS(xmlns, 'g');
        newGroup.setAttribute('id', "".concat(animationId, "_group").concat(animation[animationId].shapeCount));
        newGroup.setAttribute('opacity', 1);
        animation[animationId]._currentShapeGroup = animation[animationId].shapeCount;
        referrer.prepend(newGroup);
        layerObj.shapes[i] = getShapesGr(elementId, animationId, layerObj.shapes[i], newGroup, "".concat(animationId, "_group").concat(animation[animationId].shapeCount), refGroup, isMasked, depth, layerObj);
      } else {
        layerObj.shapes[i]._shape = animation[animationId].shapeCount; //debug(() => ['RICO', layerObj.shapes[i]]);

        layerObj.shapes[i] = prepShape(layerObj.shapes[i], referrer, animationId, isMasked); //debug(() => ['FRICO', layerObj.shapes[i]]);

        if (layerObj.shapes[i].ty == 'tr') {
          // Transformation
          layerObj.shapes[i]._trIndex = i;

          if (layerObj.shapes[i].p.hasOwnProperty('k')) {
            if (layerObj.shapes[i].p.k > 1) {
              document.getElementById("".concat(animationId, "_").concat(depth, "_layerGroup").concat(layerObj._layer)).setAttribute('transform', "translate(".concat(layerObj.shapes[i].p.k[0], ",").concat(layerObj.shapes[i].p.k[1], ")"));
            }
          }
        }

        if (layerObj.shapes[i].ty == 'fl') {
          // Fill shape
          if (layerObj.shapes[i].c.k.length > 1) {
            currentColor = getColorString(layerObj.shapes[i].c.k[0], layerObj.shapes[i].c.k[1], layerObj.shapes[i].c.k[2]);
          }
        }

        if (layerObj.shapes[i].ty == 'st') {
          // Stroke shape
          if (layerObj.shapes[i].c.k.length > 1) {
            currentStroke = getStrokeString(layerObj.shapes[i], animationId, depth, layerObj.shapes);
            stroked = true;
          }
        }

        if (layerObj.shapes[i].ty == 'tm') {
          // Stroke shape
          //if (layerObj.shapes[i].c.k.length > 1) {
          layerObj.currentTrim = getTrim(layerObj.shapes[i], animationId, depth, layerObj.shapes); //layerObj.shapes[i] = currentTrim;

          layerObj.trimmed = true; //}
        }

        if (layerObj.shapes[i].ty == 'gf') {
          // Gradient fill shape
          layerObj._isGradient = true;
          currentColor = createGradientDef(layerObj.shapes[i].s, layerObj.shapes[i].e, layerObj.shapes[i].o, layerObj.shapes[i].g, layerObj.shapes[i].r, animationId, depth);
        }
      }
    }

    setShapeColors(layerObj.shapes, currentColor, animationId, layerObj._isGradient, isMasked); // Set the color for this group of shapes.

    if (stroked) {
      setShapeStrokes(layerObj.shapes, currentStroke, animationId); // Set the stroke for this group of shapes.
    }

    if (layerObj.trimmed) {
      debug(function () {
        return ['CurrentTrim', layerObj.currentTrim];
      });
      setTrim(layerObj.shapes, layerObj.currentTrim, animationId, depth); // Set the trim for this group of shapes.
    }

    return layerObj;
  }
  function findChildren(passedObj) {}
  /**
   * Create forward-linking to children of the layer item passed to this function, and create the child containers within the parent's.
   * 
   * @param {integer} animationId The serial number of the current animation.
   * @param {integer} layerId The serial number of the current layer item to be processed.
   * @param {integer} lastMaskId The serial number of the last mask layer that was discovered.
   * @param {JSON} passedObj The JSON object that holds the group of layer items to peruse.
   * @param {string} passedKey The key that describes the array in 'passedObj' that holds a group of layer items.
   * @param {integer} depth An integer that describes the depth of the current layer group (1 for no iterations).
   * @returns 
   */

  function resolveParents(animationId, layerId, lastMaskId, passedObj, passedKey, depth, level, addArray, passedLevel) {
    var newGroup;
    var newTranslateGroup;
    var newLayer;

    for (var j = 0; j < passedObj[passedKey].length; j++) {
      if (passedObj[passedKey][j].ind == passedObj[passedKey][layerId].parent) {
        if (passedObj[passedKey][j].tt > 0) {
          for (var k = j - 1; k >= 0; k--) {
            if (passedObj[passedKey][k].td > 0) {
              passedObj[passedKey][j]._mask = "_".concat(animationId, "_").concat(depth, "_layerMask").concat(passedObj[passedKey][k].ind);
              passedObj[passedKey][j]._isMasked = true;
              break;
            }
          }
        }

        addArray.push({
          "item": layerId,
          "level": passedLevel
        });

        if (!passedObj[passedKey][j]._addedToDom) {
          resolveParents(animationId, j, lastMaskId, passedObj, passedKey, depth, level + 1, addArray, passedLevel + 1);
        }

        animation[animationId].layerCount++;
        passedObj[passedKey][layerId]._parent = passedObj[passedKey][j]._layer;
        passedObj[passedKey][layerId]._parentIdx = j; //if (!passedObj[passedKey][j]._addedToDom) {

        passedObj[passedKey][layerId].domObj = {};
        passedObj[passedKey][layerId].domObj.newLayer = document.createElementNS(xmlns, 'g');
        passedObj[passedKey][layerId].domObj.newLayer.setAttribute('id', "".concat(animationId, "_").concat(depth, "_layer").concat(passedObj[passedKey][layerId]._layer));
        passedObj[passedKey][layerId].domObj.newLayer.setAttribute('mask', lastMaskId);
        passedObj[passedKey][layerId].domObj.newLayer.setAttribute('opacity', 1); //document
        //  .getElementById(`${animationId}_${depth}_layerTranslate${passedObj[passedKey][layerId]._parent}`)
        //  .append(newLayer);
        //passedObj[passedKey][j].domObj.newTranslateGroup.prepend(newLayer);

        passedObj[passedKey][layerId].domObj.newTranslateGroup = document.createElementNS(xmlns, 'g');
        passedObj[passedKey][layerId].domObj.newTranslateGroup.setAttribute('id', "".concat(animationId, "_").concat(depth, "_layerTranslate").concat(passedObj[passedKey][layerId]._layer));
        passedObj[passedKey][layerId].domObj.newTranslateGroup.setAttribute('opacity', 1);
        passedObj[passedKey][layerId].domObj.newLayer.prepend(newTranslateGroup);

        if (passedObj[passedKey][layerId].w > 0) {
          passedObj[passedKey][layerId].domObj.newLayer.style.width = passedObj[passedKey][layerId].w;
        }

        if (passedObj[passedKey][layerId].h > 0) {
          passedObj[passedKey][layerId].domObj.newLayer.style.height = passedObj[passedKey][layerId].h;
        }

        passedObj[passedKey][layerId].domObj.newGroup = document.createElementNS(xmlns, 'g');
        passedObj[passedKey][layerId].domObj.newGroup.setAttribute('id', "".concat(animationId, "_").concat(depth, "_layerGroup").concat(passedObj[passedKey][layerId]._layer));
        passedObj[passedKey][layerId].domObj.newGroup.setAttribute('opacity', 1);
        passedObj[passedKey][layerId].domObj.newTranslateGroup.prepend(newGroup);
        passedObj[passedKey][layerId]._addedToDom = true;
        passedObj[passedKey][layerId].domObj.level = level;
        passedObj[passedKey][layerId].processed = false; // Push the child's 'id' into this item's ._child[] and the serial number of the child into ._childId[]

        passedObj[passedKey][j]._child.push("_layerGroup".concat(passedObj[passedKey][layerId].parent));

        passedObj[passedKey][j]._childId.push(layerId); //}


        return;
      }
    }
  }
  /**
   * Iterate through the layers of the animation, prepare the scaffolding needed to process the items in each one, and then trigger the respective functions to do the processing.
   * 
   * @param {string} elementId The 'id' attribute of the DOMElement 'elementObj'.
   * @param {integer} animationId The serial number of this animation.
   * @param {DOMElement} elementObj The DOMElement describing the first Lottie layer element in the animation.
   * @param {JSON} passedObj The object that has 'layers', shapes group ('gr'), or 'assets'.
   * @param {string} passedKey The name of the array, in 'passedObj', that lists the target layer objects.
   * @param {integer} depth The depth of the current iteration of layer objects.
   * @returns 
   */

  function getLayers(elementId, animationId, elementObj, passedObj, passedKey, depth) {
    if (passedObj[passedKey] === undefined || passedObj[passedKey].length < 1) {
      return;
    }

    animation[animationId].depth++;
    depth = animation[animationId].depth;
    var newLayer;
    var newGroup;
    var newMask;
    var newTranslateGroup;
    var posX;
    var posY;
    var lastMaskId = ''; //passedObj.myDepth = depth;
    //if (depth < 1) {

    for (var i = 0; i < passedObj[passedKey].length; i++) {
      if (passedObj[passedKey][i].w > animation[animationId].w) {
        animation[animationId]._maxWidth = passedObj[passedKey][i].w;
      }

      if (passedObj[passedKey][i].h > animation[animationId].h) {
        animation[animationId]._maxHeight = passedObj[passedKey][i].h;
      }

      passedObj.layerCount++;
      passedObj[passedKey][i]._layer = passedObj[passedKey][i].ind;
      passedObj[passedKey][i]._child = [];
      passedObj[passedKey][i]._childId = [];

      if (passedObj[passedKey][i].parent > 0) {} else {
        if (passedObj[passedKey][i].td > 0) {
          passedObj[passedKey][i]._isMask = true;
          newMask = document.createElementNS(xmlns, 'mask');
          lastMaskId = "_".concat(animationId, "_").concat(depth, "_layerMask").concat(passedObj[passedKey][i].ind);
          newMask.setAttribute('id', lastMaskId);
          newMask.setAttribute('mask-type', 'alpha');
          newMask.setAttribute('opacity', 1);
          animation[animationId].defs.prepend(newMask);
          newLayer = document.createElementNS(xmlns, 'g');
          newLayer.setAttribute('id', "".concat(animationId, "_").concat(depth, "_layer").concat(passedObj[passedKey][i].ind));
          newLayer.setAttribute('style', 'display: block;');
          newLayer.setAttribute('opacity', 1);
          newMask.prepend(newLayer);
        } else {
          newLayer = document.createElementNS(xmlns, 'g');
          newLayer.setAttribute('id', "".concat(animationId, "_").concat(depth, "_layer").concat(passedObj[passedKey][i].ind));
          newLayer.setAttribute('opacity', 1);
          elementObj.prepend(newLayer);

          if (passedObj[passedKey][i].tt > 0) {
            passedObj[passedKey][i]._mask = lastMaskId;
            passedObj[passedKey][i]._isMasked = true;
          }
        }

        passedObj[passedKey][i]._addedToDom = true;
        newTranslateGroup = document.createElementNS(xmlns, 'g');
        newTranslateGroup.setAttribute('id', "".concat(animationId, "_").concat(depth, "_layerTranslate").concat(passedObj[passedKey][i]._layer));
        newTranslateGroup.setAttribute('opacity', 1);
        newLayer.prepend(newTranslateGroup);

        if (passedObj[passedKey][i].w > 0) {
          newLayer.style.width = passedObj[passedKey][i].w;
        }

        if (passedObj[passedKey][i].h > 0) {
          newLayer.style.height = passedObj[passedKey][i].h;
        }

        newGroup = document.createElementNS(xmlns, 'g');
        newGroup.setAttribute('id', "".concat(animationId, "_").concat(depth, "_layerGroup").concat(passedObj[passedKey][i]._layer));
        newGroup.setAttribute('opacity', 1);
        newTranslateGroup.prepend(newGroup);
        passedObj[passedKey][i].processed = true;
      }
    }

    var addArray = [];
    var currentLevel = 1;

    for (var i = 0; i < passedObj[passedKey].length; i++) {
      passedObj.layerCount = passedObj[passedKey][i]._layer;

      if (passedObj[passedKey][i].parent > 0) {
        for (var j = 0; j < passedObj.layers.length; j++) {
          if (passedObj[passedKey][j].ind == passedObj[passedKey][i].parent) {
            if (passedObj[passedKey][i].tt > 0) {
              for (var k = i - 1; k >= 0; k--) {
                if (passedObj[passedKey][k].td > 0) {
                  passedObj[passedKey][i]._mask = "_".concat(animationId, "_").concat(depth, "_layerMask").concat(passedObj[passedKey][k].ind);
                  break;
                }
              }
            }

            passedObj.layerCount++;
            addArray.push({
              "item": i,
              "level": currentLevel
            });

            if (!passedObj[passedKey][j]._addedToDom) {
              resolveParents(animationId, j, lastMaskId, passedObj, passedKey, depth, 1, addArray, currentLevel + 1);
            }

            passedObj[passedKey][i]._parent = passedObj[passedKey][j]._layer;
            passedObj[passedKey][i]._parentIdx = j; //if (passedObj[passedKey][i]._addedToDom != true) {

            passedObj[passedKey][i].domObj = {};
            passedObj[passedKey][i].domObj.newLayer = document.createElementNS(xmlns, 'g');
            passedObj[passedKey][i].domObj.newLayer.setAttribute('id', "".concat(animationId, "_").concat(depth, "_layer").concat(passedObj[passedKey][i]._layer));
            passedObj[passedKey][i].domObj.newLayer.setAttribute('opacity', 1); //document
            //  .getElementById(`${animationId}_${depth}_layerTranslate${passedObj[passedKey][i]._parent}`)
            //  .prepend(newLayer);

            passedObj[passedKey][i].domObj.newTranslateGroup = document.createElementNS(xmlns, 'g');
            passedObj[passedKey][i].domObj.newTranslateGroup.setAttribute('id', "".concat(animationId, "_").concat(depth, "_layerTranslate").concat(passedObj[passedKey][i]._layer));
            passedObj[passedKey][i].domObj.newTranslateGroup.setAttribute('opacity', 1); //newLayer.prepend(newTranslateGroup);

            if (passedObj[passedKey][i].w > 0) {
              passedObj[passedKey][i].domObj.newLayer.style.width = passedObj[passedKey][i].w;
            }

            if (passedObj[passedKey][i].h > 0) {
              passedObj[passedKey][i].domObj.newLayer.style.height = passedObj[passedKey][i].h;
            }

            passedObj[passedKey][i].domObj.newGroup = document.createElementNS(xmlns, 'g');
            passedObj[passedKey][i].domObj.newGroup.setAttribute('id', "".concat(animationId, "_").concat(depth, "_layerGroup").concat(passedObj[passedKey][i]._layer));
            passedObj[passedKey][i].domObj.newGroup.setAttribute('opacity', 1); //newTranslateGroup.prepend(newGroup);

            passedObj[passedKey][i].domObj.newLayer.prepend(passedObj[passedKey][i].domObj.newTranslateGroup);
            passedObj[passedKey][i].domObj.newTranslateGroup.prepend(passedObj[passedKey][i].domObj.newGroup); //document
            //  .getElementById(`${animationId}_${depth}_layerTranslate${passedObj[passedKey][i]._parent}`)
            //  .prepend(passedObj[passedKey][i].domObj.newLayer);

            passedObj[passedKey][i]._addedToDom = true;
            passedObj[passedKey][i].domObj.level = 1;
            passedObj[passedKey][i].processed = false;

            passedObj[passedKey][j]._child.push("".concat(animationId, "_").concat(depth, "_layerGroup").concat(passedObj[passedKey][i].parent));

            passedObj[passedKey][j]._childId.push(i); //}

          }
        }
      }
    }

    var itemsThisLevel = 1;
    var tempLevel = 1;

    while (itemsThisLevel > 0) {
      itemsThisLevel = 0;
      var tempArray = [];

      for (var _j3 = 0; _j3 < addArray.length; _j3++) {
        if (addArray[_j3].level == tempLevel) {
          tempArray.push(addArray[_j3].item);
          itemsThisLevel++;
        }
      }

      tempLevel++;
      tempArray.sort(function (a, b) {
        return a - b;
      });
      /*
      let tempHalf1 = [];
      let tempHalf2 = [];
      for (let i = 0; i < tempArray.length; i++) {
        if (passedObj[passedKey][tempArray[i]].ind <= passedObj[passedKey][passedObj[passedKey][tempArray[i]]._parentIdx].ind) {
          tempHalf1.push(tempArray[i]);
        } else {
          tempHalf2.push(tempArray[i]);
        }
      }
      tempHalf2.sort(function(a, b){return b-a});
      tempArray = [];
      tempArray = tempArray.concat(tempHalf1, tempHalf2);
      //tempArray.concat(tempHalf2);
      */

      if (itemsThisLevel > 0) {
        tempArray.forEach(function (i) {
          if (passedObj[passedKey][passedObj[passedKey][i]._parentIdx].hasOwnProperty('domObj')) {
            if (passedObj[passedKey][i].ind > passedObj[passedKey][passedObj[passedKey][i]._parentIdx].ind) {
              passedObj[passedKey][passedObj[passedKey][i]._parentIdx].domObj.newTranslateGroup.prepend(passedObj[passedKey][i].domObj.newLayer);
            } else {
              passedObj[passedKey][passedObj[passedKey][i]._parentIdx].domObj.newTranslateGroup.append(passedObj[passedKey][i].domObj.newLayer);
            }
          } else {
            if (passedObj[passedKey][i].ind >= passedObj[passedKey][i]._parent) {
              document.getElementById("".concat(animationId, "_").concat(depth, "_layerTranslate").concat(passedObj[passedKey][i]._parent)).prepend(passedObj[passedKey][i].domObj.newLayer);
            } else {
              document.getElementById("".concat(animationId, "_").concat(depth, "_layerTranslate").concat(passedObj[passedKey][i]._parent)).append(passedObj[passedKey][i].domObj.newLayer);
            }
          }
        });
      }
    }

    for (var i = 0; i < passedObj[passedKey].length; i++) {
      if (passedObj[passedKey][i].hasOwnProperty('domObj')) {
        delete passedObj[passedKey][i].domObj;
      }
    } //}


    for (var i = 0; i < passedObj.layers.length; i++) {
      passedObj[passedKey][i]._inPoint = -1;
      passedObj[passedKey][i]._outPoint = -1;

      if (passedObj[passedKey][i].hasOwnProperty('ip') && passedObj[passedKey][i].ip >= 0) {
        passedObj[passedKey][i]._inPoint = passedObj[passedKey][i].ip;
      }

      if (passedObj[passedKey][i].hasOwnProperty('op') && passedObj[passedKey][i].op > 0) {
        passedObj[passedKey][i]._outPoint = passedObj[passedKey][i].op;

        if (passedObj[passedKey][i]._outPoint > passedObj._totalFrames) {
          passedObj[passedKey][i]._outPoint = passedObj._totalFrames;
        }
      } else {
        passedObj[passedKey][i]._outPoint = passedObj._totalFrames;
      }

      stageSequence(animationId, "".concat(animationId, "_").concat(depth, "_layerGroup").concat(passedObj[passedKey][i]._layer), passedObj[passedKey][i]._inPoint, passedObj[passedKey][i]._outPoint);
      passedObj.layerCount = passedObj[passedKey][i]._layer;
      newLayer = document.getElementById("".concat(animationId, "_").concat(depth, "_layer").concat(passedObj[passedKey][i]._layer));
      newGroup = document.getElementById("".concat(animationId, "_").concat(depth, "_layerGroup").concat(passedObj[passedKey][i]._layer));

      if (passedObj[passedKey][i].tt > 0) {
        document.getElementById("".concat(animationId, "_").concat(depth, "_layer").concat(passedObj[passedKey][i]._layer)).setAttribute('mask', "url(#".concat(passedObj[passedKey][i]._mask, ")"));
        document.getElementById("".concat(animationId, "_").concat(depth, "_layer").concat(passedObj[passedKey][i]._layer)).setAttribute('style', 'display: block;');
      }

      passedObj._currentLayer = {
        _layer: '',
        _inPoint: '',
        _outPoint: ''
      }; //passedObj._currentLayer = passedObj[passedKey][i]._layer;

      passedObj._currentLayer._layer = passedObj[passedKey][i]._layer;
      passedObj._currentLayer._inPoint = passedObj[passedKey][i]._inPoint;
      passedObj._currentLayer._outPoint = passedObj[passedKey][i]._outPoint;

      if (passedObj[passedKey][i].hasOwnProperty('refId')) {
        var tempRef = -1;

        for (var m = 0; m < animation[animationId].assets.length; m++) {
          if (typeof animation[animationId].assets[m] != 'undefined' && animation[animationId].assets[m].id == passedObj[passedKey][i].refId) {
            tempRef = m;
            break;
          }
        }

        if (tempRef >= 0) {
          var tempDepth = depth;
          animation[animationId].assets[tempRef] = getLayers(elementId, animationId, newGroup, animation[animationId].assets[tempRef], 'layers', depth); //animation[animationId].depth--;

          depth = tempDepth;
        }
      }

      if (passedObj[passedKey][i].hasOwnProperty('shapes')) {
        passedObj._currentLayerGroup = {
          _layer: 0,
          _inPoint: '',
          _outPoint: ''
        }; //passedObj._currentLayerGroup = passedObj[passedKey][i]._layer;

        passedObj._currentLayerGroup._layer = passedObj[passedKey][i]._layer;
        passedObj._currentLayerGroup._inPoint = passedObj[passedKey][i]._inPoint;
        passedObj._currentLayerGroup._outPoint = passedObj[passedKey][i]._outPoint;
        passedObj[passedKey][i] = getShapes(elementId, animationId, passedObj[passedKey][i], newGroup, "".concat(animationId, "_").concat(depth, "_layerGroup").concat(passedObj[passedKey][i]._layer), false, passedObj[passedKey][i].td, depth);

        if (passedObj[passedKey][i].hasOwnProperty('shapes')) {
          passedObj._boundingX = newGroup.getBoundingClientRect().width / 2;
          passedObj._boundingY = newGroup.getBoundingClientRect().height / 2;
        }
      } else if (passedObj[passedKey][i]._inPoint > 0) {// console.log("layer: " + i);
        // newLayer.style.display = 'none';
      }

      if (passedObj[passedKey][i].hasOwnProperty('ks')) {
        if (passedObj[passedKey][i].ks.hasOwnProperty('a')) {
          if (passedObj[passedKey][i].ks.a.hasOwnProperty('k')) {
            if (passedObj[passedKey][i].ks.a.k.length > 1) {
              passedObj[passedKey][i]._anchorX = passedObj[passedKey][i].ks.a.k[0];
              passedObj[passedKey][i]._anchorY = passedObj[passedKey][i].ks.a.k[1];
            }
          }
        }

        if (passedObj[passedKey][i].ks.hasOwnProperty('p')) {
          passedObj[passedKey][i].ks = getPosition(passedObj[passedKey][i].ks, null, 'p', true, animationId, 1, passedObj[passedKey][i], depth);

          if (passedObj[passedKey][i].ks.p.hasOwnProperty('k')) {
            if (passedObj[passedKey][i].ks.p.k.length > 1) {
              if (passedObj[passedKey][i].ks.p.k[0].hasOwnProperty('s')) {} else {
                if (passedObj[passedKey][i]._anchorX != 0) {
                  posX = passedObj[passedKey][i].ks.p.k[0] - passedObj[passedKey][i]._anchorX;
                } else {
                  posX = passedObj[passedKey][i].ks.p.k[0]; // passedObj._boundingX;
                }

                if (passedObj[passedKey][i]._anchorY != 0) {
                  posY = passedObj[passedKey][i].ks.p.k[1] - passedObj[passedKey][i]._anchorY;
                } else {
                  posY = passedObj[passedKey][i].ks.p.k[1]; // passedObj._boundingY;
                }

                if (passedObj[passedKey][i].td > 0) {
                  document.getElementById("".concat(animationId, "_").concat(depth, "_layerGroup").concat(passedObj[passedKey][i]._layer)).setAttribute('transform', "translate(".concat(posX, ",").concat(posY, ")")); //.setAttribute('transform', `matrix(1,0,0,1,${posX},${posY})`);
                } else {
                  document.getElementById("".concat(animationId, "_").concat(depth, "_layer").concat(passedObj[passedKey][i]._layer)).setAttribute('transform', "translate(".concat(posX, ",").concat(posY, ")")); //.setAttribute('transform', `matrix(1,0,0,1,${posX},${posY})`);
                }

                passedObj[passedKey][i]._posX = posX;
                passedObj[passedKey][i]._posY = posY;
              }
            }
          }
        }

        if (passedObj[passedKey][i].ks.hasOwnProperty('r')) {
          if (passedObj[passedKey][i].ks.r.k.length > 1) {
            if (passedObj[passedKey][i].ks.r.k[0].hasOwnProperty('s')) {
              passedObj[passedKey][i].ks = getPosition(passedObj[passedKey][i].ks, null, 'r', true, animationId, 1, passedObj[passedKey][i], depth);
            }
          }
        }

        if (passedObj[passedKey][i].ks.hasOwnProperty('s')) {
          if (passedObj[passedKey][i].ks.s.k.length > 1) {
            if (passedObj[passedKey][i].ks.s.k[0].hasOwnProperty('s')) {
              passedObj[passedKey][i].ks = getPosition(passedObj[passedKey][i].ks, null, 's', true, animationId, 1, passedObj[passedKey][i], depth);
            }
          }
        }

        if (passedObj[passedKey][i].ks.hasOwnProperty('o')) {
          if (passedObj[passedKey][i].ks.o.k.length > 1) {
            if (passedObj[passedKey][i].ks.o.k[0].hasOwnProperty('s')) {
              passedObj[passedKey][i].ks = getPosition(passedObj[passedKey][i].ks, null, 'o', true, animationId, 1, passedObj[passedKey][i], depth);
            }
          }
        }
      }
    }

    return passedObj;
  }
  /**
   * Scale layer objects relative to the animation window size - needed because some layers have much bigger defined window dimensions.
   * 
   * @param {string} elementId The 'id' attribute of the DOMElement 'elementObj'.
   * @param {integer} animationId The serial number of this animation.
   * @param {DOMElement} elementObj The DOMElement describing the first Lottie layer element in the animation.
   * @param {JSON} passedObj The object that has 'layers', shapes group ('gr'), or 'assets'.
   * @param {string} passedKey The name of the array, in 'passedObj', that lists the target layer objects.
   * @param {integer} depth The depth of the current iteration of layer objects.
   */

  function scaleLayers(elementId, animationId, elementObj, passedObj, passedKey, depth) {
    var currentObj; //alert(animation[animationId].currScale);

    for (var i = 0; i < passedObj[passedKey].length; i++) {
      if (passedObj[passedKey][i].parent > 0) {} else {
        if (passedObj[passedKey][i].td > 0) {} else {
          if (passedObj[passedKey][i].hasOwnProperty("parent")) {} else {
            //alert(animationId + "_" + depth + "_layer" + passedObj[passedKey][i]._layer);
            currentObj = document.getElementById(animationId + "_" + depth + "_layer" + passedObj[passedKey][i]._layer); //currentObj.setAttributeNS(null, 'viewBox', `0 0 ${animation[animationId]._maxWidth} ${animation[animationId]._maxHeight}`);

            currentObj.setAttribute("transform", "scale(" + animation[animationId]._currScale + ")");
          }
        }
      }
    }
  }
  /**
   * Initializes all the parameters for animation[animationId], which will contain the scene graph for this Lottie animation, before and after calling getLayers().
   * 
   * @param {*} elementId The 'id' attribute of the DOMElement 'elementObj'.
   * @param {*} animationId The serial number of this animation.
   * @param {*} elementObj The DOMElement in which the animation should be rendered.
   * @param {*} autoplay If 'true', then start playing the animation upon being loaded.
   * @param {*} loop If 'true', then the animation keeps looping.
   * @param {*} customName A custom name given to this Lottie animation - for future use.
   */

  function buildGraph(elementId, animationId, elementObj, autoplay, loop, customName) {
    animation[animationId]._loaded = false;
    animation[animationId]._renderObj = elementObj;

    try {
      animation[animationId].depth = 0;
      animation[animationId].shapeCount = 0;
      animation[animationId].layerCount = 0;
      animation[animationId]._removed = false;
      animation[animationId]._totalFrames = parseInt(animation[animationId].op - animation[animationId].ip);
      animation[animationId]._framesPerSec = animation[animationId]._totalFrames / animation[animationId].fr;
      animation[animationId]._frameTime = 1 / animation[animationId].fr * 1000;
      animation[animationId]._currentFrame = -1;
      animation[animationId]._lastTime = Date.now();
      animation[animationId]._autoplay = autoplay;
      animation[animationId]._loop = loop;
      animation[animationId]._customName = customName;

      if (autoplay) {
        animation[animationId]._paused = false;
      } else {
        animation[animationId]._paused = true;
      }

      animation[animationId]._maxWidth = 0;
      animation[animationId]._maxHeight = 0;
      animation[animationId]._skewW = 0;
      animation[animationId]._skewH = 0;
      animation[animationId]._currScale = 1;
      animation[animationId]._lastFrame = 0;
      animation[animationId]._loopCount = 0; //animation[animationId]._nextInterval = animation[animationId]._frameTime;
      //animation[animationId]._timeout = 0;

      if (smallestFrameTime > animation[animationId]._frameTime) {
        smallestFrameTime = animation[animationId]._frameTime;
      } //for debugging


      animation[animationId]._debugTimeElapsed = 0;
      animation[animationId]._debugContainer = ''; //////
      //elementObj.style.width = animation[animationId].w;
      //elementObj.style.height = animation[animationId].h;
      //elementObj.setAttribute('width', animation[animationId].w);
      //elementObj.setAttribute('height', animation[animationId].h);

      var newSVG = document.createElementNS(xmlns, 'svg');
      newSVG.setAttribute('xmlns', xmlns); // newSVG.setAttributeNS(null, 'width', animation[animationId].w);
      // newSVG.setAttributeNS(null, 'height', animation[animationId].h);

      newSVG.setAttributeNS(null, 'viewBox', "0 0 ".concat(animation[animationId].w, " ").concat(animation[animationId].h));
      newSVG.setAttributeNS(null, 'preserveAspectRatio', 'xMidYMid meet');
      newSVG.style.contain = 'strict';
      newSVG.style.width = '100%';
      newSVG.style.height = '100%';
      newSVG.setAttributeNS(null, 'id', "_svg".concat(animationId));
      elementObj.prepend(newSVG);
      animation[animationId].defs = document.createElementNS(xmlns, 'defs');
      animation[animationId].defs.setAttributeNS(null, 'id', "_defs".concat(animationId));
      animation[animationId].gradientCount = 0;
      animation[animationId].maskCount = 0;
      newSVG.prepend(animation[animationId].defs);
      var newLayer = document.createElementNS(xmlns, 'g');
      newLayer.setAttributeNS(null, 'id', "_lanim".concat(animationId));
      newSVG.append(newLayer);
      var newCompute = document.createElementNS(xmlns, 'g');
      newCompute.setAttributeNS(null, 'id', "_compute".concat(animationId));
      newCompute.style.display = 'none';
      newLayer.prepend(newCompute);
      animation[animationId]._scene = new Array(animation[animationId]._totalFrames + 10).fill(null).map(function () {
        return {
          _transform: []
        };
      });
      animation[animationId]._instated = {};
      animation[animationId]._refObj = [];
      animation[animationId]._objSize = {};
      var clipPath = document.createElementNS(xmlns, 'clipPath');
      clipPath.setAttributeNS(null, 'id', "_clip".concat(animationId));
      animation[animationId].defs.prepend(clipPath);
      var clipPathRect = document.createElementNS(xmlns, 'rect');
      clipPathRect.setAttribute('x', 0);
      clipPathRect.setAttribute('y', 0);
      clipPathRect.setAttribute('width', animation[animationId].w);
      clipPathRect.setAttribute('height', animation[animationId].h);
      clipPath.append(clipPathRect);
      animation[animationId] = getLayers(elementId, animationId, newLayer, animation[animationId], 'layers', 0);

      if (animation[animationId]._maxWidth > 0 || animation[animationId]._maxHeight > 0) {
        var scaleW = animation[animationId].w / animation[animationId]._maxWidth;
        var scaleH = animation[animationId].h / animation[animationId]._maxHeight; //animation[animationId]._skewW = animation[animationId]
        //clipPathRect.setAttribute('x', 0);
        //clipPathRect.setAttribute('y', 0);
        //clipPathRect.setAttribute('width', animation[animationId]._maxWidth);
        //clipPathRect.setAttribute('height', animation[animationId]._maxHeight);

        if (scaleW > scaleH) {
          animation[animationId]._currScale = scaleW;
        } else {
          animation[animationId]._currScale = scaleH;
        } //newSVG.setAttributeNS(null, 'viewBox', `0 0 ${animation[animationId]._maxWidth} ${animation[animationId]._maxHeight}`);
        //newLayer.setAttribute("transform", "scale(" + animation[animationId]._currScale + ")");


        scaleLayers(elementId, animationId, newLayer, animation[animationId], 'layers', 1);
      }

      newLayer.setAttributeNS(null, 'clip-path', "url(#_clip".concat(animationId, ")"));
      animation[animationId]._buildDone = true;
      animationLoading -= 1;
      animation[animationId]._loaded = true;

      if (!animation[animationId]._autoplay) {
        goToAndStop(1, '', animation[animationId]._elementId);
      } else {
        loadFrame(animationId, 1);
      }

      animation[animationId]._renderObj.dispatchEvent(new CustomEvent("DOMLoaded", {
        bubbles: true,
        detail: {
          "animation": animationId
        }
      }));
    } catch (e) {
      //console.error(`Failed to load animation.${e}`);
      //elementObj.style.height = 0;
      //elementObj.style.width = 0;
      animation[animationId]._renderObj.dispatchEvent(new CustomEvent("onLoadError", {
        bubbles: true,
        detail: {
          "error": e,
          "animation": animationId
        }
      }));

      animation[animationId]._renderObj.dispatchEvent(new CustomEvent("loadError", {
        bubbles: true,
        detail: {
          "error": e,
          "animation": animationId
        }
      }));

      exports.animationCount = exports.animationCount - 1;
      elementObj.innerHTML = e;
      animation.splice(animationId, 1);
    }
  }
  /**
   * Load a Lottie JSON file from a URL and then pass to buildGraph().
   * 
   * @param {string} src A URL that points to a Lottie JSON file.
   * @param {DOMElement} domElement The DOMElement object in which the Lottie animation will be animated.
   * @param {string} elementId The 'id' of the DOMElement pointed to by 'domElement'.
   * @param {boolean} _autoplay If 'true', then start playing the animation upon being loaded.
   * @param {boolean} _loop If 'true', then the animation keeps looping.
   * @param {boolean} _debugAnimation If 'true', then display debug information.
   * @param {DOMElement} _debugContainer The DOMElement in which debug information is to be displayed.
   */

  function getJson(src, domElement, elementId, _autoplay, _loop, _debugAnimation, _debugContainer, animationId) {
    var http = new XMLHttpRequest();
    http.withCredentials = false;
    http.open('GET', src, true); //http.setRequestHeader('Access-Control-Allow-Origin', '*');

    http.onreadystatechange = function () {
      if (http.readyState == 4 && http.status == 200) {
        var received = http.responseText;

        if (received.search(/(^("|'))|(("|')$)/g) > -1) {
          received = received.replace(/(^("|'))|(("|')$)/g, "");
          received = received.replace(/\\"/g, '"');
        } //animationCount += 1;
        //const currentAnimation = animationCount;


        var currentAnimation = animationId;
        animation[currentAnimation] = JSON.parse(received);
        animation[currentAnimation]._elementId = elementId;

        if (_debugAnimation && _typeof(_debugContainer) == 'object') {
          animation[currentAnimation]._debugAnimation = _debugAnimation;
          animation[currentAnimation]._debugContainer = _debugContainer;
          animation[currentAnimation]._curFPS = 0;
          animation[currentAnimation]._timeElapsed = 0;
          animation[currentAnimation]._debugObj = document.createElement('div');

          animation[currentAnimation]._debugObj.setAttribute('id', "__dbg__".concat(currentAnimation));

          animation[currentAnimation]._debugObj.style.display = 'block';

          _debugContainer.prepend(animation[currentAnimation]._debugObj);
        }

        buildGraph(elementId, currentAnimation, domElement, _autoplay, _loop);
      }
    };

    http.send();
  } /// ////////// CONTROL
  // var animationManager = (function () {

  var jlottie = {};
  /**
   * Destroys and unloads the animation indicated by 'name'.
   * 
   * @param {string} name The 'id' value of the container of this Lottie animation.
   */

  function destroy(name) {
    if (exports.animationCount < 0) {
      return;
    }

    if (name === undefined) {
      return;
      /*const elements = [];
      for (var i = 0; i <= animationCount; i++) {
        elements.push(animation[i]._elementId);
      }
      animation = [];
      for (var i = 0; i <= elements; i++) {
        document.getElementById(elements[i]).innerHTML = '';
        animationCount -= 1;
      }*/
    } else {
      name.toString();
      name = name.replace(/#/g, '');

      if (name.length > 0) {
        for (var i = 0; i <= exports.animationCount; i++) {
          if (animation[i]._elementId == name || animation[i]._customName == name) {
            pause(name);
            exports.animationCount -= 1;
            animation.splice(i, 1);
            document.getElementById(name).innerHTML = '';
            break;
          }
        }
      }
    }
  }
  /**
   * Plays the animation indicated by 'name'.
   * 
   * @param {string} name The 'id' value of the container of this Lottie animation.
   */

  function play(name) {
    if (exports.animationCount < 0) {
      return;
    }

    if (name === undefined) {
      for (var i = 0; i <= exports.animationCount; i++) {
        animation[i]._paused = false;
      }
    } else {
      name.toString();
      name = name.replace(/#/g, '');

      for (var i = 0; i <= exports.animationCount; i++) {
        if (animation[i]._elementId == name || animation[i]._customName == name) {
          animation[i]._paused = false;
          break;
        }
      }
    }
  }
  /**
   * Pauses the animation indicated by 'name'.
   * 
   * @param {string} name The 'id' value of the container of this Lottie animation.
   */

  function pause(name) {
    if (name === undefined) {
      for (var i = 0; i <= exports.animationCount; i++) {
        animation[i]._paused = true;
      }
    } else {
      name.toString();
      name = name.replace(/#/g, '');

      for (var i = 0; i <= exports.animationCount; i++) {
        if (animation[i]._elementId == name || animation[i]._customName == name) {
          animation[i]._paused = true;
          break;
        }
      }
    }
  }
  /**
   * Stops the animation indicated by 'name'.
   * 
   * @param {string} name The 'id' value of the container of this Lottie animation.
   */

  function stop(name) {
    goToAndStop(1, false, name);
  }
  /**
   * Stops the animation, goes to the specified frame and freezes there.
   * 
   * @param {integer} _frame The frame number.
   * @param {boolean} isFrame Indicates whether '_frame' represents time in number of frames (true) or milliseconds (false) - this is currently not implemented.
   * @param {string} name The 'id' value of the container of this Lottie animation.
   * 
   */

  function goToAndStop(_frame, isFrame, name) {
    if (typeof isFrame === 'string') {
      name = isFrame;
    }

    if (exports.animationCount < 0) {
      return;
    }

    if (name === undefined) {
      for (var i = 0; i <= exports.animationCount; i++) {
        animation[i]._paused = true;
        animation[i]._currentFrame = _frame;
        loadFrame(i, _frame);
      }
    } else {
      name.toString();
      name = name.replace(/#/g, '');

      for (var i = 0; i <= exports.animationCount; i++) {
        if (animation[i]._elementId == name || animation[i]._customName == name) {
          animation[i]._paused = true;
          animation[i]._currentFrame = _frame; //console.log(`${name} == ${_frame}`);

          loadFrame(i, _frame);
          break;
        }
      }
    }
  }
  /** 
    * Lottie animation loader for jlottie.
    *
    * @param {JSON} obj Includes parameters that dictate how a Lottie is loaded.
    * @param {DOMElement} obj.container A DOMElement object that will be used as the container for the Lottie animation.
    * @param {boolean} obj.autoplay Instructs jlottie to immediately play the Lottie after it is loaded.
    * @param {boolean} obj.loop Instructs jlottie to keep looping this animation.
    * @param {boolean} obj.debugAnimation Instructs jlottie to display debug information (currently limited to just FPS data).
    * @param {DOMElement} obj.debugContainer A DOMElement in which the debug data will be displayed.
    *
    */

  function loadAnimation(obj) {
    if (obj.container === undefined && obj.path === undefined && obj.animationData === undefined) {
      return;
    }

    var autoplay = true;
    var loop = true;
    var debugContainer;

    if (!(obj.autoplay === undefined)) {
      if (obj.autoplay === true || obj.autoplay === false) {
        autoplay = obj.autoplay;
      }
    }

    if (!(obj.loop === undefined)) {
      if (obj.loop === true || obj.loop === false) {
        loop = obj.loop;
      }
    }

    if (!(obj.debug === undefined)) {
      if (obj.debug === true) {
        if (typeof obj.debugContainer != 'undefined') {
          debugContainer = obj.debugContainer;
        }
      }
    }

    if (!(obj.debugAnimation === undefined)) {
      if (obj.debugAnimation === true) {
        debugAnimation = true;
      }
    }

    exports.animationCount += 1;
    var currentAnimation = exports.animationCount;
    animation[currentAnimation] = {};
    animation[currentAnimation]._loaded = false;

    if (!(obj.animationData === undefined) && obj.animationData.length > 0) {
      //currentAnimation = animationCount;
      animation[currentAnimation] = JSON.parse(obj.animationData);
      animation[currentAnimation]._elementId = obj.container.id;
      animation[currentAnimation]._debugContainer = obj.debugContainer;
      animation[currentAnimation]._debugAnimation = obj.debug;
      buildGraph(obj.container.id, currentAnimation, obj.container, autoplay, loop);
    } else if (!(obj.path === undefined) && obj.path) {
      getJson(obj.path, obj.container, obj.container.id, autoplay, loop, obj.debug, obj.debugContainer, currentAnimation);
    }

    if (!playStarted) {
      playStarted = true;
      timeoutObj = setTimeout(window.requestAnimationFrame(lottiemate), 0);
    }

    animation[currentAnimation]._elementId = obj.container.id;

    animation[currentAnimation].destroy = function () {
      destroy(animation[currentAnimation]._elementId);
    };

    animation[currentAnimation].play = function () {
      play(animation[currentAnimation]._elementId);
    };

    animation[currentAnimation].pause = function () {
      pause(animation[currentAnimation]._elementId);
    };

    animation[currentAnimation].stop = function () {
      stop(animation[currentAnimation]._elementId);
    };

    animation[currentAnimation].goToAndStop = function (frame) {
      goToAndStop(frame, animation[currentAnimation]._elementId);
    };

    return animation[currentAnimation];
  }

  exports.addGroupPositionTransform = addGroupPositionTransform;
  exports.animation = animation;
  exports.arcLength = arcLength;
  exports.bezierCurve = bezierCurve;
  exports.buildGraph = buildGraph;
  exports.createGradientDef = createGradientDef;
  exports.debug = debug;
  exports.destroy = destroy;
  exports.extrapolateOffsetKeyframe = extrapolateOffsetKeyframe;
  exports.extrapolatePathPosition = extrapolatePathPosition;
  exports.extrapolateValueKeyframe = extrapolateValueKeyframe;
  exports.findChildren = findChildren;
  exports.findExistingTransform = findExistingTransform;
  exports.getColorString = getColorString;
  exports.getEmptyFillTransform = getEmptyFillTransform;
  exports.getEmptyStageTransform = getEmptyStageTransform;
  exports.getEmptyTransform = getEmptyTransform;
  exports.getJson = getJson;
  exports.getLayers = getLayers;
  exports.getPosition = getPosition;
  exports.getShapes = getShapes;
  exports.getShapesGr = getShapesGr;
  exports.getStrokeString = getStrokeString;
  exports.goToAndStop = goToAndStop;
  exports.loadAnimation = loadAnimation;
  exports.loadFrame = loadFrame;
  exports.lottiemate = lottiemate;
  exports.pause = pause;
  exports.play = play;
  exports.prepDataString = prepDataString;
  exports.prepShape = prepShape;
  exports.prepShapeEl = prepShapeEl;
  exports.prepShapeElKeyframe = prepShapeElKeyframe;
  exports.prepShapeRc = prepShapeRc;
  exports.prepShapeRcKeyframe = prepShapeRcKeyframe;
  exports.prepShapeSh = prepShapeSh;
  exports.prepShapeShKeyframe = prepShapeShKeyframe;
  exports.prepShapeSr = prepShapeSr;
  exports.prepShapeSrKeyframe = prepShapeSrKeyframe;
  exports.resolveParents = resolveParents;
  exports.scaleLayers = scaleLayers;
  exports.setShapeColors = setShapeColors;
  exports.setShapeStrokes = setShapeStrokes;
  exports.stageSequence = stageSequence;
  exports.stop = stop;
  exports.updateTransform = updateTransform;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=jlottie.js.map
