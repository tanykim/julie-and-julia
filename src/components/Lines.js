import React, { Component } from 'react';
import { Colors } from './../constants/design';

class Lines extends Component {

  render() {
    const strLenList = this.props.strLenList;
    const lineWidth = this.props.lineWidth;
    const pxPerLetter = this.props.pxPerLetter;

    const listItems = strLenList.map((vals, i) =>
      (<line
        x1={vals[0] * lineWidth}
        x2={vals[0] * lineWidth}
        y1={vals[1] * pxPerLetter}
        y2={vals[2] * pxPerLetter}
        key={i}
        className={`line-${i}`}
        strokeWidth={lineWidth * 0.6}
        stroke={Colors.black}
      />)
    );

    return (
      <g>{listItems}</g>
    );
  }
}

export default Lines;