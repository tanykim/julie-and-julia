import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import _ from 'underscore';

const originalMsg = 'Find which lines of the scrips include what you type.';

const Message = React.createClass({
  render() {
    return (
      <div className="message">
        {this.props.message}
      </div>
    );
  }
});

const TextInput = React.createClass({

  handleSubmit(txt) {
    this.props.onTextEntered(txt);
  },

  handleChange(e) {
    this.handleSubmit(e.target.value);
  },

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      //send result
      this.props.onSendResult(this.props.result, this.props.searchStr);
    }
  },

  render() {
    return (
      <input
        type="text"
        placeholder="Enter word or phrase"
        onChange={this.handleChange}
        onKeyPress={this.handleKeyPress}
      />
    );
  }
});

class SearchForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: originalMsg,
      result: props.result
    };
    this.highlight = this.highlight.bind(this);
    this.textEntered = this.textEntered.bind(this);
  }

  componentDidMount(){
    ReactDOM.findDOMNode(this.refs.searchInput).focus();
  }

  highlight(tempResult) {
    this.props.onHighlight(tempResult);
  }

  textEntered(txt) {
    //show message at least 3 letters are types
    if (txt.length >= 3) {
      //search the typed text in the movie Script data
      const result = _.filter(_.map(this.props.data, function (d, i) {
        if (d.toLowerCase().indexOf(txt.toLowerCase()) > -1) {
          return i;
        } else {
          return -1;
        }
      }), function (d) {
        return d > -1;
      });
      this.setState({
        message: `${result.length} line${result.length > 1 ? 's': ''} have ${txt}`,
        result : result,
        searchStr: txt
      });
      this.highlight(result);
    } else {
      this.setState({message: originalMsg});
      //dehighlight all lines
      this.highlight([]);
    }
  }

  render() {
    return (
      <div className="search">
        <TextInput
          ref="searchInput"
          searchStr={this.state.searchStr}
          result={this.state.result}
          onTextEntered={this.textEntered}
          onSendResult={this.props.onReceiveResult}
        />
        <Message message={this.state.message}/>
      </div>
    );
  }
}

export default SearchForm;