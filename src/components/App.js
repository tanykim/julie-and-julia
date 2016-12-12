import React, { Component } from 'react';
import Script from './../data/data.json';
import SearchForm from './SearchForm';
import Visualization from './Visualization';
import TextLineList from './TextLineList';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: Script,
      searchedLines: [],
      highlighted: [],
      lineNo: null
    };
    this.onHighlight = this.onHighlight.bind(this);
    this.onReceiveResult = this.onReceiveResult.bind(this);
    this.onResetResult = this.onResetResult.bind(this);
    this.textHovered = this.textHovered.bind(this);
  }

  //highlight lines in sync with text enter
  onHighlight(tempResult) {
    this.setState({highlighted: tempResult});
  }

  //when text input submitted (return key pressed)
  onReceiveResult(result, searchStr) {
    let searchedLines = result.map((id) => [id, this.state.data[id]]);

    this.setState({
      searchedLines: searchedLines,
      searchStr: searchStr,
      //highlight the first line (linkedLineNO)
      linkedLineNo: result[0]
    });
  }

  //when Backspace is pressed after results are shown
  onResetResult() {
    this.setState({
      searchedLines: []
    })
  }

  textHovered(lineNo) {
    this.setState({linkedLineNo: lineNo});
  }

  render() {
    return (
      <div>
        <div className="title">
          <h1> Julie &amp; Julia </h1>
        </div>
        <SearchForm
          data={this.state.data}
          onHighlight={this.onHighlight}
          onReceiveResult={this.onReceiveResult}
          onResetResult={this.onResetResult}
        />
        <TextLineList
          searchedLines={this.state.searchedLines}
          searchStr={this.state.searchStr}
          onHovered={this.textHovered}
        />
        <Visualization
          data={this.state.data}
          highlighted={this.state.highlighted}
          linkedLineNo={this.state.linkedLineNo}
        />
      </div>
    );
  }
}

export default App;
