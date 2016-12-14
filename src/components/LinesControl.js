import _ from 'underscore';
import { select, selectAll } from 'd3-selection';
import { Colors } from './../constants/design';

//highlighht in sync with user type
function highlightLine(id) {
  select(`.line-${id}`).style('stroke', Colors.main);
}

//dehigliht in sync with user type
function dehighlightLine(id) {
  select(`.line-${id}`).style('stroke', Colors.black);
}

function stopBlink(id) {
  select(`.line-${id}`).select('animate').remove();
}

//highlight the line that is linked from the text result
function linkLine(id) {
  select(`.line-${id}`).append('animate')
    .attr('attributeType', 'XML')
    .attr('attributeName', 'stroke')
    .attr('values', `${Colors.golden};${Colors.dimmed};${Colors.golden};`)
    .attr('dur', '0.6s')
    .attr('repeatCount', 'indefinite');
}

//dim lines when user pressed enter > text result seen
function dimLine(id) {
  select(`.line-${id}`).style('stroke', Colors.dimmed);
  //remove the animation effect
  selectAll('animate').remove();
}

//check if highlight or dehighlight lines
function updateLines(newVals, highlighted) {
  //higlight as typed
  if (_.isEmpty(newVals)) {
    selectAll('line').style('stroke', Colors.black);
  } else if (newVals !== highlighted) {
    //find newly added or removed lines then change the style separately
    const newHighs = _.difference(newVals, highlighted);
    const removedHighs = _.difference(highlighted, newVals);
    newHighs.map((id) => highlightLine(id));
    removedHighs.map((id) => dehighlightLine(id));
  }
  //set new highlighted ones
  return newVals;
}

export { highlightLine, stopBlink, linkLine, dimLine, updateLines };