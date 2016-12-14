import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import _ from 'underscore';
import renderHTML from 'react-render-html';
import secrets from './../constants/secrets.json';

const originalMsg = 'Find which lines of the scripts include what you type';

const Message = React.createClass({
  render() {
    return (
      <div>{renderHTML(this.props.message)}</div>
    );
  }
});

let isEntered = false;

function getSecretStory(str) {
  let story = '';
  for (const secret of secrets) {
    //check if it is same as password
    if (secret.password === str.toLowerCase().trim()) {
      story = (`@${secret.password}
        <div class="main">${secret.story}</div>
        <div class="signature">${secret.date}<br/>${secret.from}</div>`);
      break;
    }
  }
  return story;
}

const TextInput = React.createClass({

  handleSubmit(txt) {
    this.props.onTextEntered(txt);
  },

  handleChange(e) {
    this.handleSubmit(e.target.value);
  },

  onKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();

      //check secret code
      const story = getSecretStory(this.props.searchStr);
      this.props.onSecretStory(story);

      //if there's no story
      if (story === '' && !_.isEmpty(this.props.result)) { //send result
        this.props.onSendResult(this.props.result, this.props.searchStr);
      }
      document.activeElement.blur();
      isEntered = true;

    } else if (isEntered && e.key === 'Backspace') {
      //reset results when back space is pressed
      this.props.onSecretStory('');
      this.props.onReset();
    }
  },

  render() {
    return (
      <input className="search-input"
        type="text"
        placeholder="Enter word or phrase"
        onChange={this.handleChange}
        onKeyDown={this.onKeyDown}
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

  componentDidMount() {
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
        message: `<i>${result.length}</i> line${result.length > 1 ? 's': ''} ha${result.length === 1 ? 's': 've'} <i>${txt}</i>`,
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
      <div className="row search">
        <div className="col-xs-12 message">
          <Message message={this.state.message}/>
        </div>
        <div className="col-xs-12 col-sm-6 col-sm-offset-3 col-lg-4 col-lg-offset-4">
          <TextInput
            ref="searchInput"
            searchStr={this.state.searchStr}
            result={this.state.result}
            onTextEntered={this.textEntered}
            onSendResult={this.props.onReceiveResult}
            onReset={this.props.onResetResult}
            onSecretStory={this.props.onSecretStory}
          />
        </div>
      </div>
    );
  }
}

export default SearchForm;