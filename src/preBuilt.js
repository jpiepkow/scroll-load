import React, { Component } from 'react';
import uuid from 'uuid';
import './ScrollLoad.css';
import classNames from 'classnames';
class ScrollLoad extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.scroll = 0;
    this.localId = uuid.v1();
    this.state[this.localId] = { isVis: false, id: this.localId };
    this.isInViewport = this.isInViewport.bind(this);
    this.setPos = this.setPos.bind(this);
    this.modifyChildren = this.modifyChildren.bind(this);
  }
  componentDidMount() {
    window.addEventListener('scroll', this.isInViewport);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.isInViewport);
  }
  setPos(setDir) {
    this.scroll = setDir;
  }
  modifyChildren(child) {
    const className = classNames(
      child.props.className,
      this.state[this.localId].isVis ? 'vis' : 'hidden'
    );

    const props = { className };

    return React.cloneElement(child, props);
  }
  isInViewport(e) {
    var st = window.pageYOffset || document.documentElement.scrollTop;
    // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
    if (st > this.scroll) {
      var rect = this.refs[this.state[this.localId].id].getBoundingClientRect();
      var html = document.documentElement;
      if (
        rect.top >= 0 &&
          rect.left >= 0 &&
          rect.top <= (window.innerHeight || html.clientHeight) &&
          rect.right <= (window.innerWidth || html.clientWidth)
      ) {
        this.setState({
          [this.localId]: { isVis: true, id: this.state[this.localId].id }
        });
      }
    }
    this.setPos(st);
  }
  render() {
    return (
      <div ref={this.state[this.localId].id}>
        {React.Children.map(this.props.children, c => this.modifyChildren(c))}
      </div>
    );
  }
}

export default ScrollLoad;
