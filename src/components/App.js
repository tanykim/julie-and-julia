import React, { Component } from 'react';
import Script from './../data/data.json';
import SearchForm from './SearchForm';
import Visualization from './Visualization';
import SecretStory from './SecretStory';
import TextLineList from './TextLineList';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: Script,
      searchedLines: [],
      highlighted: [],
      lineNo: null,
      story: ''
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.onHighlight = this.onHighlight.bind(this);
    this.onReceiveResult = this.onReceiveResult.bind(this);
    this.onResetResult = this.onResetResult.bind(this);
    this.showSecretStory = this.showSecretStory.bind(this);
    this.textHovered = this.textHovered.bind(this);
  }

  //scroll
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll(event) {
    const scrollTop = event.srcElement.body.scrollTop;
    const resultH = document.getElementById('result-container').clientHeight;

    //220 is roughly the height of the bottom part, with some buffer
    //show the default when scoll is over
    if (scrollTop > 220 && window.innerHeight - resultH < -scrollTop) {
      this.setState({isHidden: true});
    } else {
      this.setState({isHidden: false});
    }
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
      story: ''
    });
  }

  //secret message
  showSecretStory(story) {
    this.setState({story: story});
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
          <div className="col-xs-12 hidden-xs hidden-sm vis">
            <Visualization
              data={this.state.data}
              highlighted={this.state.highlighted}
              linkedLineNo={this.state.linkedLineNo}
              searchedLines={this.state.searchedLines}
            />
          </div>
        </div>
        {/* result */}
        <div className="row result-container" id="result-container">
          <div className="col-xs-12 col-md-6 col-md-offset-3 story">
            <SecretStory story={this.state.story} />
          </div>
          <div className="col-xs-12 col-md-10 col-md-offset-1 col-lg-6 col-lg-offset-3 result">
            <TextLineList
              searchedLines={this.state.searchedLines}
              searchStr={this.state.searchStr}
              onHovered={this.textHovered}
            />
          </div>
        </div>
        {/* default bottom */}
        <div className="default-container">
          <div className="row">
            <div className={this.state.isHidden ? 'col-xs-12 title small' : 'col-xs-12 title'}>
              Julie <span className="amp">&amp;</span> Julia
            </div>
          </div>
          <div className={this.state.isHidden ? 'hide' : 'show'}>
            <SearchForm
              data={this.state.data}
              onHighlight={this.onHighlight}
              onReceiveResult={this.onReceiveResult}
              onResetResult={this.onResetResult}
              onSecretStory={this.showSecretStory}
            />
            <div className="row">
              <div className="col-xs-12 footer">
                <ul>
                  <li>Inspired by <a href="https://twitter.com/pencilpenbrush/status/803756815225909248" target="_blacnk">@pencilpenbrush</a></li>
                  <li>View on <a href="https://github.com/tanykim/julie-and-julia" target="_blacnk">GitHub</a></li>
                  <li><a href="http://www.script-o-rama.com/movie_scripts/j/julie-and-julia-script-transcript.html" target="_blacnk">Original Script</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
