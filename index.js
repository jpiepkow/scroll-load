import React, { Component } from 'react';
import uuid from 'uuid';
import './ScrollLoad.css'
import classNames from 'classnames'
class ScrollLoad extends Component {
  constructor(props) {
        super(props);
        this.state={}
        this.localId = uuid.v1()
        this.state[this.localId] = {'isVis': false,id:this.localId}
        this.isInViewport = this.isInViewport.bind(this)
                this.modifyChildren = this.modifyChildren.bind(this);
    }
    componentDidMount() {
      window.addEventListener("scroll", this.isInViewport)
    }
    componentWillUnmount() {
      window.removeEventListener('scroll',this.isInViewport)
    }
    modifyChildren(child) {
        const className = classNames(
            child.props.className,
            this.state[this.localId].isVis ? 'vis' : 'hidden'
        );

        const props = {
            className
        };

        return React.cloneElement(child, props);
    }
    isInViewport() {
      console.log('happened')
      var rect = this.refs[this.state[this.localId].id].getBoundingClientRect();
      var html = document.documentElement;
    if( 
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.top <= (window.innerHeight || html.clientHeight) &&
      rect.right <= (window.innerWidth || html.clientWidth)) {
        this.setState({[this.localId]:{isVis:true,id:this.state[this.localId].id}})
      }
    }
    render() {

    return (
      <div ref={this.state[this.localId].id}>
      {React.Children.map(this.props.children,(c) => this.modifyChildren(c))}
      </div>
      );
  }
}

export default ScrollLoad;
