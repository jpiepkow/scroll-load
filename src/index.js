'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

require('./ScrollLoad.css');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScrollLoad = function (_Component) {
  _inherits(ScrollLoad, _Component);

  function ScrollLoad(props) {
    _classCallCheck(this, ScrollLoad);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {};
    _this.scroll = 0;
    _this.localId = _uuid2.default.v1();
    _this.state[_this.localId] = { isVis: false, id: _this.localId };
    _this.isInViewport = _this.isInViewport.bind(_this);
    _this.setPos = _this.setPos.bind(_this);
    _this.modifyChildren = _this.modifyChildren.bind(_this);
    return _this;
  }

  ScrollLoad.prototype.componentDidMount = function componentDidMount() {
    window.addEventListener('scroll', this.isInViewport);
  };

  ScrollLoad.prototype.componentWillUnmount = function componentWillUnmount() {
    window.removeEventListener('scroll', this.isInViewport);
  };

  ScrollLoad.prototype.setPos = function setPos(setDir) {
    this.scroll = setDir;
  };

  ScrollLoad.prototype.modifyChildren = function modifyChildren(child) {
    var className = (0, _classnames2.default)(child.props.className, this.state[this.localId].isVis ? 'vis' : 'hidden');

    var props = { className: className };

    return _react2.default.cloneElement(child, props);
  };

  ScrollLoad.prototype.isInViewport = function isInViewport(e) {
    var st = window.pageYOffset || document.documentElement.scrollTop;
    // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
    if (st > this.scroll) {
      var rect = this.refs[this.state[this.localId].id].getBoundingClientRect();
      var html = document.documentElement;
      if (rect.top >= 0 && rect.left >= 0 && rect.top <= (window.innerHeight || html.clientHeight) && rect.right <= (window.innerWidth || html.clientWidth)) {
        var _setState;

        this.setState((_setState = {}, _setState[this.localId] = { isVis: true, id: this.state[this.localId].id }, _setState));
      }
    }
    this.setPos(st);
  };

  ScrollLoad.prototype.render = function render() {
    var _this2 = this;

    return _react2.default.createElement(
      'div',
      { ref: this.state[this.localId].id },
      _react2.default.Children.map(this.props.children, function (c) {
        return _this2.modifyChildren(c);
      })
    );
  };

  return ScrollLoad;
}(_react.Component);

exports.default = ScrollLoad;
module.exports = exports['default'];