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
      searchedLines: []
    };
    this.showResult = this.showResult.bind(this);
  }

  showResult(searchStr, result) {

    //get actual script from the result (array index)
    let searchedLines = result.map(id => this.state.data[id]);

    this.setState({
      searchStr: searchStr,
      searchedLines: searchedLines
    });
  }

  render() {
    return (
      <div>
        <div className="title">
          <h1> Julie &amp; Julia </h1>
        </div>
        <SearchForm data={this.state.data} onReceiveResult={this.showResult}/>
        <TextLineList {...this.state} />
        <Visualization data={this.state.data} />
      </div>
    );
  }
}

export default App;
