import React, { Component } from 'react';
import _ from 'underscore';

//svg size
const width = 1600;
const height = 300;

function getStrData(data) {
  var strLenList = [];
  let letterCount = 0;
  let columnCount = 0;

  //set the longest line fill the height;
  const maxLen = _.max(data.map(d => d.length));
  const pxPerLetter = height / maxLen;

  //distance between lines in a same vertical
  const pxBtwLines = 2;

  _.each(data, function (d) {
    //if the newly added line exceeds the height, move to the nexst column
    if (letterCount + d.length > height / pxPerLetter) {
      letterCount = 0;
      columnCount++;
    }
    strLenList.push([columnCount, letterCount, letterCount + d.length]);
    letterCount = letterCount + d.length + pxBtwLines / pxPerLetter;
  });

  return {
    strLenList: strLenList,
    lineWidth: width / columnCount,
    pxPerLetter: pxPerLetter
  };
}

function Lines(lineData) {

  const strLenList = lineData.strLenList;
  const lineWidth = lineData.lineWidth;
  const pxPerLetter = lineData.pxPerLetter;

  const listItems = strLenList.map((vals, i) =>
    (<line
      x1={vals[0] * lineWidth}
      x2={vals[0] * lineWidth}
      y1={vals[1] * pxPerLetter}
      y2={vals[2] * pxPerLetter}
      key={i}
      strokeWidth={lineWidth * 0.6}
    />)
  );
  return (
    <g>{listItems}</g>
  );
}

class Visualization extends Component {

  constructor(props) {
    super(props);
    this.state = getStrData(this.props.data);

  }
  render() {
    return (
      <div className="vis">
        <svg width={width} height={height}>
          <Lines {...this.state} />
        </svg>
      </div>
    );
  }
}

export default Visualization;

