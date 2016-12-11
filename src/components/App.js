import React, { Component } from 'react';
import Script from './../data/data.json';
import SearchForm from './SearchForm';
import Visualization from './Visualization';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: Script
    }
  }

  render() {
    return (
      <div>
        <div className="title">
          <h1> Julie &amp; Julia </h1>
        </div>
        <SearchForm />
        <Visualization data={this.state.data} />
      </div>
    );
  }
}

export default App;
