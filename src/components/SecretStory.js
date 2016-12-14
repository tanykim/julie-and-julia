import React, { Component } from 'react';
import renderHTML from 'react-render-html';

class SecretStory extends Component {
  render() {
    return (
      <div>{renderHTML(this.props.story)}</div>
    );
  }
};

export default SecretStory;
