import React, { Component } from 'react';
import markStr from './markSearchedStr';
import renderHTML from 'react-render-html';

const Item = React.createClass({

  getInitialState: function(){
    return {
      active: false
    }
  },

  isActive() {
    return this.state.active? 'item-active': 'item';
  },

  onMouseOver() {
    this.setState({active: true});
    this.props.onHovered(this.props.lineNo);
  },

  onMouseOut() {
    this.setState({active: false});
  },

  render() {
    return (
      <li
        className={this.isActive()}
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
      >
        line {this.props.lineNo} -
        {renderHTML(markStr(this.props.txt, this.props.searchStr))}
      </li>
    );
  }
});

const TextLine = React.createClass({
  render() {
    const listItems = this.props.searchedLines.map((vals, i) => (
      <Item key={i}
        lineNo={vals[0]}
        txt={vals[1]}
        searchStr={this.props.searchStr}
        onHovered={this.props.onHovered}
      />
    ));
    return (<ul className="result-list">{listItems}</ul>);
  }
});

class TextLineList extends Component {
  render() {
    return (
      <TextLine {...this.props}/>
    );
  }
};

export default TextLineList;
