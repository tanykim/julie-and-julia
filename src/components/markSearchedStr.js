function markStr(str, searchStr) {

  //i: case insensitive, g: find global (doesn't stop at the first find)
  const reg = new RegExp(searchStr, 'gi');
  const matches = str.match(reg);

  //indexOf starting point
  let nextIndex = 0;

  for (let i = 0; i < matches.length; i++) {
    let strDup = str;
    let m = matches[i]; //match part
    let index = strDup.indexOf(m, nextIndex); //find the matching part
    let head = strDup.slice(0, index); //slice the part before the matching part
    let converted = `<i>${m}</i>`; //convert the matching pat
    let tail = strDup.slice(index + m.length); //slice the part after the matching part
    str = head + converted + tail; //concat all parts into new string
    nextIndex = index + m.length + 7; //new indexing start point 7 = <i></i>
  }

  return str;
}

export default markStr;