import React, { Component } from 'react';
import _ from 'underscore';
import Lines from './Lines';
import { highlightLine, stopBlink, linkLine, dimLine, updateLines } from './LinesControl';
import { Dim } from './../constants/design';

function getStrData(data) {
  var strLenList = [];
  let letterCount = 0;
  let columnCount = 0;

  //set the doubled length of the longest line fill the Dim.h
  //at least 2 pixel for one character
  const maxLen = _.max(data.map(d => d.length));
  const pxPerLetter = Math.max(Dim.h / (maxLen * 2), 2);

  //distance between lines in a same vertical
  const pxBtwLines = 2;

  _.each(data, function (d) {
    //if the newly added line exceeds the Dim.h, move to the nexst column
    if (letterCount + d.length > Dim.h / pxPerLetter) {
      letterCount = 0;
      columnCount++;
    }
    strLenList.push([columnCount, letterCount, letterCount + d.length]);
    letterCount = letterCount + d.length + pxBtwLines / pxPerLetter;
  });

  return {
    strLenList: strLenList,
    lineWidth: Dim.w / columnCount,
    pxPerLetter: pxPerLetter
  };
}

//Save highlighted line indexes
let highlighted = [];
let linkedNo;

class Visualization extends Component {

  constructor(props) {
    super(props);
    this.state = getStrData(this.props.data);
  }

  blink() {

    const id = _.random(0, this.state.strLenList.length);
    linkLine(id);
    setTimeout(
      () => stopBlink(id),
      300
    );
  }

  componentDidMount() {
    this.timer = setInterval(
      () => this.blink(),
      1200
    );
  }

  componentWillUpdate(nextProps, nextState) {

    clearInterval(this.timer);

    //three props: highlighted, linkedLineNo, searchedLines
    //linkedLineNo is a single line linked by hovering ext
    const nextLineNo = nextProps.linkedLineNo;
    if(_.isNumber(nextProps.linkedLineNo) && nextLineNo !== this.props.linkedLineNo) {
      if (linkedNo) {
        //dim previously linked line
        dimLine(linkedNo);
      }
      //link newly selected line
      linkLine(nextLineNo);
      linkedNo = nextLineNo;
    } else { //highlight & dehighlight as typed
      highlighted = updateLines(nextProps.highlighted, highlighted);
    }

    //searchedLines are used to dim lines when enter is pressed
    //when search entered: show text results then dim lines
    const newsl = nextProps.searchedLines;
    const oldsl = this.props.searchedLines;
    if(!_.isEmpty(newsl) && _.isEmpty(oldsl)) {
      nextProps.highlighted.map((id) => dimLine(id));
    } else if (_.isEmpty(newsl) && !_.isEmpty(oldsl)) {
      nextProps.highlighted.map((id) => highlightLine(id));
    }
  }

  render() {
    return (
      <svg width={Dim.w} height={Dim.h}>
        <Lines {...this.state} />
      </svg>
    );
  }
}

export default Visualization;
