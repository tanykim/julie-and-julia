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
      <div className="container-fluid">
        {/* visualization */}
        <div className="row vis-container" id="vis-width">
          <div className="col-xs-12 vis">
            <Visualization
              data={this.state.data}
              highlighted={this.state.highlighted}
              linkedLineNo={this.state.linkedLineNo}
            />
          </div>
        </div>
        {/* result */}
        <div className="row result-container">
          <div className="col-xs-12 col-md-10 col-md-offset-1 col-lg-6 col-lg-offset-3 result">
            <TextLineList
              searchedLines={this.state.searchedLines}
              searchStr={this.state.searchStr}
              onHovered={this.textHovered}
            />
          </div>
        </div>
        {/* title */}
        <div className="row title-container">
          <div className="col-xs-12 title">
            Julie <span className="amp">&amp;</span> Julia
          </div>
        </div>
        {/* search */}
        <div className="row search-container">
          <div className="col-xs-12 search">
            <SearchForm
              data={this.state.data}
              onHighlight={this.onHighlight}
              onReceiveResult={this.onReceiveResult}
              onResetResult={this.onResetResult}
            />
          </div>
        </div>
        {/* footer */}
        <div className="row footer-container">
          <div className="col-xs-12 footer">
            <ul>
              <li>Inspired by <a href="https://twitter.com/pencilpenbrush/status/803756815225909248" target="_blacnk">@pencilpenbrush</a></li>
              <li>View on <a href="https://github.com/tanykim/julie-and-julia" target="_blacnk">GitHub</a></li>
              <li><a href="http://www.script-o-rama.com/movie_scripts/j/julie-and-julia-script-transcript.html" target="_blacnk">Original Script</a></li>
              <li>Made by <a href="http://tany.kim" target="_blank">@tanykim</a></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
