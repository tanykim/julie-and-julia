import React, { Component } from 'react';
import _ from 'underscore';
import { select, selectAll } from 'd3-selection';
import { Size, Colors } from './../constants/design';

//svg size
const width = window.innerWidth;
const height = window.innerHeight - Size.footerH;
console.log(width, height);

function getStrData(data) {
  var strLenList = [];
  let letterCount = 0;
  let columnCount = 0;

  //set the doubled length of the longest line fill the height
  //at least 2 pixel for one character
  const maxLen = _.max(data.map(d => d.length));
  const pxPerLetter = Math.max(height / (maxLen * 2), 2);

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
      className={`line-${i}`}
      strokeWidth={lineWidth * 0.6}
      stroke={Colors.black}
    />)
  );
  return (
    <g>{listItems}</g>
  );
}

//Save highlighted line indexes
let highlighted = [];
let linkedNo;

//highlighht or dehighlight in sync with user type
function highlightLine(id) {
  select(`.line-${id}`).attr('stroke', Colors.main);
}

function dehighlightLine(id) {
  select(`.line-${id}`).attr('stroke', Colors.black);
}

//highlight the line that is linked from the text result
function linkLine(id) {
  select(`.line-${id}`).attr('stroke', Colors.golden);
}

function updateLines(newVals) {
  //higlight as typed
  if (_.isEmpty(newVals)) {
    selectAll('line').attr('stroke', Colors.black);
  } else if (newVals !== highlighted) {
    //find newly added or removed lines then change the style separately
    const newHighs = _.difference(newVals, highlighted);
    const removedHighs = _.difference(highlighted, newVals);
    newHighs.map((id) => highlightLine(id));
    removedHighs.map((id) => dehighlightLine(id));
  }
  //set new highlighted ones
  highlighted = newVals;
}

class Visualization extends Component {

  constructor(props) {
    super(props);
    this.state = getStrData(this.props.data);
  }

  componentWillUpdate(nextProps) {

    //two props: linkedLineNo and highlighted
    //linkedLineNo is a single line linked by hovering ext
    //highlighted is for toggle multiple lines by as typed

    if(_.isNumber(nextProps.linkedLineNo) &&
      nextProps.linkedLineNo !== this.props.linkedLineNo) {
      if (linkedNo) {
        highlightLine(linkedNo);
      }
      linkLine(nextProps.linkedLineNo);
      linkedNo = nextProps.linkedLineNo;
    } else {
      updateLines(nextProps.highlighted);
    }
  }

  render() {
    return (
      <svg width={width} height={height}>
        <Lines {...this.state} />
      </svg>
    );
  }
}

export default Visualization;
