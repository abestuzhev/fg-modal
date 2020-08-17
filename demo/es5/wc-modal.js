"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Modal = /*#__PURE__*/function (_HTMLElement) {
  _inherits(Modal, _HTMLElement);

  var _super = _createSuper(Modal);

  function Modal() {
    _classCallCheck(this, Modal);

    return _super.call(this);
  }

  _createClass(Modal, [{
    key: "makeEvent",
    value: function makeEvent(evtName) {
      try {
        new CustomEvent(evtName, {
          bubbles: true,
          cancelable: false
        });
      } catch (e) {
        return document.createEvent('CustomEvent');
      }
    }
  }, {
    key: "connectedCallback",
    value: function connectedCallback() {
      this.closetext = "Close dialog";
      this.closeclass = "modal_close";
      this.closed = true;
      this.initEvent = this.makeEvent("init");
      this.beforeOpenEvent = this.makeEvent("beforeopen");
      this.openEvent = this.makeEvent("open");
      this.closeEvent = this.makeEvent("close");
      this.beforeCloseEvent = this.makeEvent("beforeclose");
      this.closeBtn = this.querySelector("." + this.closeclass) || this.appendCloseBtn();
      this.titleElem = this.querySelector(".modal_title");
      this.enhanceMarkup();
      this.bindEvents();
      this.dispatchEvent(this.initEvent);
    }
  }, {
    key: "appendCloseBtn",
    value: function appendCloseBtn() {
      var btn = document.createElement("button");
      btn.className = this.closeclass;
      btn.innerHTML = this.closetext;
      this.appendChild(btn);
      return btn;
    }
  }, {
    key: "enhanceMarkup",
    value: function enhanceMarkup() {
      this.setAttribute("role", "dialog");
      this.id = this.id || "modal_" + new Date().getTime();

      if (this.titleElem) {
        this.titleElem.id = this.titleElem.id || "modal_title_" + new Date().getTime();
        this.setAttribute("aria-labelledby", this.titleElem.id);
      }

      this.classList.add("modal");
      this.setAttribute("tabindex", "-1");
      this.overlay = document.createElement("div");
      this.overlay.className = "modal_screen";
      this.parentNode.insertBefore(this.overlay, this.nextSibling);
      this.modalLinks = "a.modal_link[href='#" + this.id + "']";
      this.changeAssocLinkRoles();
    }
  }, {
    key: "inert",
    value: function inert() {
      var self = this;

      function inertSiblings(node) {
        if (node.parentNode) {
          for (var elem in node.parentNode.childNodes) {
            if (elem !== node && elem.nodeType === 1 && elem !== self.overlay) {
              elem.inert = true;
            }
          }

          if (node.parentNode !== document.body) {
            inertSiblings(node.parentNode);
          }
        }
      }

      inertSiblings(this);
    }
  }, {
    key: "unert",
    value: function unert() {
      for (var elem in document.querySelectorAll("[inert]")) {
        elem.inert = false;
      }
    }
  }, {
    key: "open",
    value: function open(programmedOpen) {
      var self = this;
      this.dispatchEvent(this.beforeOpenEvent);
      this.classList.add("modal-open");

      if (!programmedOpen) {
        this.focusedElem = document.activeElement;
      }

      this.closed = false;
      this.focus();
      self.inert();
      this.dispatchEvent(this.openEvent);
    }
  }, {
    key: "close",
    value: function close(programmedClose) {
      var self = this;
      this.dispatchEvent(this.beforeCloseEvent);
      this.classList.remove("modal-open");
      this.closed = true;
      self.unert();
      var focusedElemModal = this.focusedElem.closest(".modal");

      if (focusedElemModal) {
        focusedElemModal.open(true);
      }

      if (!programmedClose) {
        this.focusedElem.focus();
      }

      this.dispatchEvent(this.closeEvent);
    }
  }, {
    key: "changeAssocLinkRoles",
    value: function changeAssocLinkRoles() {
      for (var elem in document.querySelectorAll(this.modalLinks)) {
        elem.setAttribute("role", "button");
      }
    }
  }, {
    key: "bindEvents",
    value: function bindEvents() {
      var self = this; // close btn click

      this.closeBtn.addEventListener('click', function (event) {
        return self.close();
      }); // open dialog if click is on link to dialog

      window.addEventListener('click', function (e) {
        var assocLink = e.target.closest(self.modalLinks);

        if (assocLink) {
          e.preventDefault();
          self.open();
        }
      }); // click on the screen itself closes it

      this.overlay.addEventListener('mouseup', function (e) {
        if (!self.closed) {
          self.close();
        }
      }); // click on anything outside dialog closes it too (if screen is not shown maybe?)

      window.addEventListener('mouseup', function (e) {
        if (!self.closed && !e.target.closest("#" + self.id)) {
          e.preventDefault();
          self.close();
        }
      }); // close on escape

      window.addEventListener('keydown', function (e) {
        if (e.keyCode === 27 && !self.closed) {
          e.preventDefault();
          self.close();
        }
      }); // close on other dialog open

      window.addEventListener('beforeopen', function (e) {
        if (!self.closed && e.target !== this) {
          self.close(true);
        }
      });
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      // remove screen when elem is removed
      this.overlay.remove();
    }
  }]);

  return Modal;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

if ('customElements' in window) {
  customElements.define('fg-modal', Modal);
}