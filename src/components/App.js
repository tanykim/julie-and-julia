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
      highlighted: []
    };
    this.onHighlight = this.onHighlight.bind(this);
    this.onReceiveResult = this.onReceiveResult.bind(this);
  }

  //highlight lines in sync with text enter
  //this state also helps to show/hide text list
  onHighlight(tempResult) {
    this.setState({highlighted: tempResult});
    // this.onReceiveResult(tempResult);
  }

  //when text input submitted (return key pressed)
  onReceiveResult(result, searchStr) {
    // let searchStr;
    // if (typedStr) {
    //   searchStr = typedStr;
    // }
    //get actual script from the result (array index)
    //return [line number, the actual text]
    let searchedLines = result.map((id) => [id, this.state.data[id]]);
    this.setState({
      searchedLines: searchedLines,
      searchStr: searchStr
    });
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
        />
        <TextLineList searchedLines={this.state.searchedLines} />
        <Visualization data={this.state.data} highlighted={this.state.highlighted} />
      </div>
    );
  }
}

export default App;
