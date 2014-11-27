(function() {
/*
  if no diff return {s:-1, delta:0}
*/
function diffPos(oldText, newText) { 
  var td = textdiff(oldText, newText)
  if(td.from == undefined) {
    return {s: -1, delta: 0}
  }
  return {s:td.from, delta:td.newFragment.length -  td.oldFragment.length }
} 


function textdiff(oldText, newText) {
    if (oldText === newText) return {}

    var oL = oldText.length
    var nL = newText.length
    trace('oldLength: ' + oL + '. newLength: ' + nL)
    // assume addition
    if (nL > oL) {
        if (newText.substr(0, oL) === oldText){
            trace('some characters was added to the end')
            return {
                from: oL,
                to: oL,
                oldFragment: '',
                newFragment: newText.substr(oL)
            }
        }
        if (newText.substr(nL - oL) === oldText){
            trace('some characters was added to the start')
            return {
                from: 0,
                to: 0,
                oldFragment: '',
                newFragment: newText.substr(0, nL - oL)
            }
        }
    }
    if (nL < oL) {
        if (oldText.substr(oL - nL) === newText){
            trace('some characters was removed from the end')
            return {
                from: 0,
                to: oL - nL,
                oldFragment: oldText.substr(0, oL - nL),
                newFragment: ''
            }
        }
        if (oldText.substr(0, nL) === newText){
            trace('some characters was removed from the start')
            return {
                from: nL,
                to: oL,
                oldFragment: oldText.substr(nL),
                newFragment: ''
            };
        }
    }
    var minL = nL < oL ? nL : oL
    var front = calculateFront(oldText, newText, minL),
        back = calculateBack(oldText, newText, oL, nL, minL)
    trace('front: ' + front)
    trace('back: ' + back)
    if(front + back > oL){ //same character included to the start and to the end
        back -= (front + back) - oL
    }
    if(front + back > nL){ //same character removed to the start and to the end
                           //see: 'should correctly detect removing arcticle'
        back -= (front + back) - nL
    }
    return {
        from: front,
        to: oL - back,
        oldFragment: oldText.substr(front, oL - back - front),
        newFragment: newText.substr(front, nL - back - front)
    }
}

function calculateFront(oldText, newText, minL){
    var front = 0
    while (oldText[front] === newText[front] && front < minL){
        front += 1
    }
    return front
}

function calculateBack(oldText, newText, oL, nL, minL){
    var back = 0
    while (oldText[oL - back - 1] === newText[nL - back - 1] && (minL - back) >= 0){
        back += 1
    }
    return back
}

function trace() {}


if(typeof module == "undefined") {
    window.diffPos = diffPos
    window.textdiff = textdiff
}
try { module.exports = {diffPos: diffPos, textdiff: textdiff} } catch(e) {}
})()
