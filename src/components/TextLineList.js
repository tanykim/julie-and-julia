import React, { Component } from 'react';
import markStr from './markSearchedStr';
import renderHTML from 'react-render-html';

function TextLine(props) {

  console.log(props);

  const listItems = props.searchedLines.map((str, i) =>
    (<li key={i}>{renderHTML(markStr(str, props.searchStr))}</li>)
  );
  return (
    <ul>{listItems}</ul>
  );
}

class TextLineList extends Component {
  render() {
    return (
      <TextLine {...this.props} />
    );
  }
}

export default TextLineList;
