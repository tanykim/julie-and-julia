import React, { Component } from 'react';
import markStr from './markSearchedStr';
import renderHTML from 'react-render-html';

function TextLine(props) {
  const listItems = props.searchedLines.map((vals, i) =>
    (<li key={i}>line no. {vals[0]}- {renderHTML(markStr(vals[1], props.searchStr))}</li>)
  );
  return (
    <ul>{listItems}</ul>
  );
}

class TextLineList extends Component {
  render() {
    return (
      <TextLine searchedLines={this.props.searchedLines}/>
    );
  }
}

export default TextLineList;
