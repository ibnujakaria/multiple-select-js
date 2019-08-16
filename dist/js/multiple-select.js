/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/MultipleSelect.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function $getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return $getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = $getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  var args = [];
  for (var i = 0; i < arguments.length; i++) args.push(arguments[i]);
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    ReflectApply(this.listener, this.target, args);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      if (typeof listener !== 'function') {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
      }
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      if (typeof listener !== 'function') {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
      }

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}


/***/ }),

/***/ "./src/MultipleSelect.js":
/*!*******************************!*\
  !*** ./src/MultipleSelect.js ***!
  \*******************************/
/*! exports provided: default */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_Container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/Container */ "./src/components/Container.js");
/* harmony import */ var _store_Store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./store/Store */ "./src/store/Store.js");
/* harmony import */ var _scss_multiple_select_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scss/multiple-select.scss */ "./src/scss/multiple-select.scss");
/* harmony import */ var _scss_multiple_select_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_scss_multiple_select_scss__WEBPACK_IMPORTED_MODULE_2__);




var selectMultipleContainerId = 0

class MultipleSelect {

  
  constructor(elId, options) {
    selectMultipleContainerId++

    this.$store = new _store_Store__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"]()

    let { el, select, isMultiple, items, selectedItems } = this._buildRootElement(elId)

    this.$el = el
    this.$select = select
    this.$options = options
    this.$store.isMultiple = isMultiple
    this.$store.items = items
    this.$store.selectedItems = selectedItems

    this.$container = new _components_Container__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]({
      root: this
    })

    // syncing with the actual select
    this.$store.on('selectedItemsChange', (selectedItems) => {
      this.$select.querySelectorAll('option').forEach(option => {
        if (selectedItems.find(item => item.value === option.value)) {
          option.setAttribute('selected', true)
        } else {
          option.removeAttribute('selected')
        }
      })
    })

    // when the container is done rendered, the dropdown
    // will automatically focused
    let observer = new MutationObserver(() => {
      if (this.$el.classList.contains('opened')) {
        this.$container.$dropdownSelect.$input.focus()
      }
    })

    observer.observe(this.$el, { attributes: true, childList: true });
  }

  _buildRootElement (elId) {
    let select = document.querySelector(elId)
    let root = document.createElement('div')
    let items = []
    let selectedItems = []

    root.setAttribute('id', `multiple-select-container-${selectMultipleContainerId}`)
    root.style.position = 'relative'
    
    select.querySelectorAll('option:not([disabled])').forEach(option => {
      items.push({ value: option.value, label: option.innerText })
    })

    // get the already selected items
    select.querySelectorAll('option[selected]').forEach(option => {
      selectedItems.push({ value: option.value, label: option.innerText })
    })

    let isMultiple = select.getAttribute('multiple') !== null
    
    select.insertAdjacentElement('afterend', root)
    select.hidden = true

    return {
      select, el: root, isMultiple, items, selectedItems
    }
  }
}

window.MultipleSelect = MultipleSelect

/* harmony default export */ __webpack_exports__["default"] = (MultipleSelect);

/***/ }),

/***/ "./src/components/Container.js":
/*!*************************************!*\
  !*** ./src/components/Container.js ***!
  \*************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _DropdownSelect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DropdownSelect */ "./src/components/DropdownSelect.js");


class Container {

  constructor ({ root }) {
    this.$root = root

    this._buildButton()
    this._buildDropdownSelect()
    this._rerenderButton()
    this._keyupEventListeners()

    this.$root.$store.on('selectedItemsChange', () => {
      this._rerenderButton()
    })

    this.$root.$store.on('isOpenedChange', (isOpened) => {
      this._rerenderButton()
    })
    
    // exit on outside click
    document.addEventListener('click', (e) => {
      if (!this.$root.$el.contains(e.target)) {
        this.$root.$store.isOpened = false
      }
    })
  }

  _buildButton () {
    this.$button = document.createElement('button')
    this.$button.classList.add(
      'form-control', 'd-flex', 'justify-content-between', 'align-items-center'
    )

    let content = document.createElement('span')
    content.setAttribute('class', 'content')
    content.innerText = this.$root.$options.placeholder || 'Select'

    let caret = document.createElement('span')
    caret.classList.add('caret')
    caret.innerHTML = '&#9662;'
    caret.style.fontSize = '70%'

    this.$button.addEventListener('click', (e) => {
      this.$root.$store.isOpened = !this.$root.$store.isOpened
    })

    this.$button.appendChild(content)
    this.$button.appendChild(caret)
    this.$root.$el.appendChild(this.$button)
  }

  _buildDropdownSelect () {
    this.$dropdownSelect = new _DropdownSelect__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]({
      container: this
    })
  }

  _rerenderButton () {
    let selectedItems = this.$root.$store.selectedItems
    let buttonText = null

    if (this.$root.$store.isMultiple) {
      buttonText = `${selectedItems.length} selected`
    } else {
      buttonText = selectedItems.length ?
        selectedItems[0].label : (this.$root.$options.placeholder || 'Select')
    }

    this.$button
      .querySelector('span.content')
      .innerText = buttonText

    if (this.$root.$store.isOpened) {
      this.$button
        .querySelector('span.caret')
        .innerHTML = '&#9652;'
      
      this.$root.$el.classList.add('opened')
    } else {
      this.$button
        .querySelector('span.caret')
        .innerHTML = '&#9662;'
      
      this.$root.$el.classList.remove('opened')
    }
  }

  _keyupEventListeners () {
    this.$root.$el.addEventListener('keyup', (e) => {
      if (e.code === 'Escape') {
        this.$root.$store.isOpened = false
      }
    })
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Container);

/***/ }),

/***/ "./src/components/DropdownSelect.js":
/*!******************************************!*\
  !*** ./src/components/DropdownSelect.js ***!
  \******************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class DropdownSelect {
  constructor ({ container }) {
    this.$container = container
    this.$dropdownSelect = null
    this.$input = null
    this.$optionItems = []
    this.keyword = null

    this._buildDropdownSelect()
    this._buildSearchInput()
    this._buildOptionItems()
    this._rerenderOptionsItems()
  }

  _buildDropdownSelect () {
    this.$dropdownSelect = document.createElement('div')
    this.$dropdownSelect.classList.add(
      'dropdown-select',
      'bg-white',
      'shadow'
    )

    this.$container.$root.$el.appendChild(this.$dropdownSelect)
  }

  _buildSearchInput () {
    this.$input = document.createElement('input')
    this.$input.classList.add('form-control')
    this.$input.setAttribute('placeholder', 'Search')
    this.$input.setAttribute('type', 'text')
    this.$input.setAttribute('autofocus', true)

    // prevent default action if arrow up and down is pressed
    this.$input.addEventListener('keydown', (e) => {
      if (e.code === 'ArrowUp' || e.code === 'ArrowDown') {
        e.preventDefault()
        return false
      }
    })

    this.$input.addEventListener('keyup', (e) => {
      this.keyword = this.$input.value
      this._buildOptionItems()
      this._rerenderOptionsItems()
    })

    let inputContainer = document.createElement('div')
    inputContainer.classList.add('p-2')
    inputContainer.appendChild(this.$input)
    
    this.$dropdownSelect.appendChild(inputContainer)
  }

  _buildOptionItems () {
    let store = this.$container.$root.$store
    let listGroup = this.$dropdownSelect.querySelector('.list-group')
    
    this.$optionItems = []
    
    if (!listGroup) {
      listGroup = document.createElement('ul')
      listGroup.classList.add('list-group', 'mt-0')
  
      this.$dropdownSelect.appendChild(listGroup)
    }

    // clear option
    while (listGroup.lastChild) {
      listGroup.removeChild(listGroup.lastChild)
    }

    this.filteredItems.forEach(item => {
      let itemDom = document.createElement('li')
      itemDom.classList.add(
        'list-group-item', 'd-flex', 'flex-row',
        'justify-content-between', 'p-2', 'rounded-0'
      )
      itemDom.setAttribute('value', item.value)
      itemDom.innerText = item.label
      itemDom.addEventListener('click', (e) => {
        let selectedItems = store.selectedItems
        let currentTarget = e.currentTarget
        let index = selectedItems.findIndex(item => item.value === currentTarget.getAttribute('value'))

        if (index > -1) {
          selectedItems.splice(index, 1)
        } else {
          if (store.isMultiple) {
            selectedItems.push({
              value: currentTarget.getAttribute('value'),
              label: currentTarget.innerText
            })
          } else {
            selectedItems = [{
              value: currentTarget.getAttribute('value'),
              label: currentTarget.innerText
            }]

            // close this dropdown
            this.$container.$root.$store.isOpened = false
          }
        }

        store.selectedItems = selectedItems
        this._rerenderOptionsItems()
      })

      this.$optionItems.push(itemDom)
      listGroup.appendChild(itemDom)
    })

    // if no result
    if (this.filteredItems.length < 1) {
      let itemDom = document.createElement('li')
      itemDom.classList.add(
        'list-group-item', 'd-flex', 'flex-row',
        'justify-content-between', 'p-2', 'rounded-0',
        'list-group-item-secondary'
      )
      itemDom.innerText = 'No items.'
      listGroup.appendChild(itemDom)
    }
  }

  _rerenderOptionsItems () {
    let store = this.$container.$root.$store

    this.$optionItems.forEach(itemDom => {
      // is selected
      if (store.selectedItems.find(item => item.value === itemDom.getAttribute('value'))) {
        itemDom.classList.add('list-group-item-primary')
      } else {
        itemDom.classList.remove('list-group-item-primary')
      }
    })
  }

  get filteredItems () {
    return this.$container.$root.$store.items.filter(item => {
      if (this.keyword) {
        return item.label.toLowerCase().includes(this.keyword.toLowerCase())
      }

      return true
    })
  }
}

/* harmony default export */ __webpack_exports__["a"] = (DropdownSelect);

/***/ }),

/***/ "./src/scss/multiple-select.scss":
/*!***************************************!*\
  !*** ./src/scss/multiple-select.scss ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/store/Store.js":
/*!****************************!*\
  !*** ./src/store/Store.js ***!
  \****************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! events */ "./node_modules/events/events.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_0__);


class Store extends events__WEBPACK_IMPORTED_MODULE_0___default.a {
  
  get isMultiple () {
    return this._isMultiple || false
  }

  set isMultiple (isMultiple) {
    this._isMultiple = isMultiple
  }

  get isOpened () {
    return this._isOpened || false
  }

  set isOpened (isOpened) {
    this._isOpened = isOpened
    this.emit('isOpenedChange', isOpened)
  }

  get items () {
    return this._items || []
  }

  set items (items) {
    this._items = items
    this.emit('itemsChange', items)
  }

  get selectedItems () {
    return this._selectedItems || []
  }

  set selectedItems (selectedItems) {
    this._selectedItems = selectedItems
    this.emit('selectedItemsChange', selectedItems)
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Store);

/***/ })

/******/ });
//# sourceMappingURL=multiple-select.js.map