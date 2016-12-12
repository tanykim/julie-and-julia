import React, { Component } from 'react';
import _ from 'underscore';
import { select, selectAll } from 'd3-selection';

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
      className={`line-${i}`}
      strokeWidth={lineWidth * 0.6}
      stroke="black"
    />)
  );
  return (
    <g>{listItems}</g>
  );
}

//highlighht or dehighlight in sync with user type
function highlightLine(id) {
  select(`.line-${id}`).attr('stroke', 'white');
}

function dehighlightLine(id) {
  select(`.line-${id}`).attr('stroke', 'black');
}

//Save highlighted line indexes
let highlighted = [];

class Visualization extends Component {

  constructor(props) {
    super(props);
    this.state = getStrData(this.props.data);
  }

  componentWillUpdate(nextProps) {
    if (_.isEmpty(nextProps.highlighted)) {
      console.log('---dehighlight all lines');
      selectAll('line').attr('stroke', 'black');
    } else {
      //find newly added or removed lines then change the style separately
      const newHighs = _.difference(nextProps.highlighted, highlighted);
      const removedHighs = _.difference(highlighted, nextProps.highlighted);
      console.log('---highlight', newHighs.length, '--remove', removedHighs.length);
      newHighs.map((id) => highlightLine(id));
      removedHighs.map((id) => dehighlightLine(id));
    }
    //set new highlighted ones
    highlighted = nextProps.highlighted;
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

