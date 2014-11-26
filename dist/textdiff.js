!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.createWs=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"textdiff":[function(require,module,exports){
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

    // window.diffPos = diffPos
    // window.textdiff = textdiff
    try { module.exports = {diffPos: diffPos, textdiff: textdiff} } catch(e) {}
})();

},{}]},{},["textdiff"])("textdiff")
});