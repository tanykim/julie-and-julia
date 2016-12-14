import React, { Component } from 'react';
import markStr from './markSearchedStr';
import renderHTML from 'react-render-html';

const Item = React.createClass({

  getInitialState() {
    return this.state = {isHovered: false};
  },

  onMouseOver() {
    this.props.onHovered(this.props.lineNo);
    this.setState({isHovered: true});
  },

  onMouseOut() {
    this.props.onHovered(-1);
    this.setState({isHovered: false});
  },

  render() {
    return (
      <li
        className={this.state.isHovered ? 'item-over' : 'item'}
        onMouseOver={this.onMouseOver}
        onTouchStart={this.onMouseOver}
        onMouseOut={this.onMouseOut}
        onTouchEnd={this.onMouseOut}
      >
        <span className="index-no">{this.props.id + 1}.</span>
        <span className="line-no">line {this.props.lineNo}</span>
        {renderHTML(markStr(this.props.txt, this.props.searchStr))}
      </li>
    );
  }
});

class TextLineList extends Component {

  render() {
    const listItems = this.props.searchedLines.map((vals, i) => (
      <Item key={i}
        lineNo={vals[0]}
        txt={vals[1]}
        searchStr={this.props.searchStr}
        onHovered={this.props.onHovered}
        id={i}
      />
    ));
    return (
      <ul className="result-list">
        {listItems}
      </ul>
    );
  }
};

export default TextLineList;
