// Utilties
// Used to be in validate.js
// Now here because used in solve.js
var $ = require('jquery')
  , _ = require('underscore')

// Return a selector function for an attribute
exports.makeAttrSelector = makeAttrSelector
function makeAttrSelector(attr) {
  return function (val) {
    return '[' + attr + '=' + val + ']'
  }
}

// Get the list of numbers for a given selector function
// selector will be called with an index 0 - 9
exports.getBunches = getBunches
function getBunches($board, selector) {
  return _.map(getNumbers($board, selector), function (nums, i) {
    return { selector: selector(i), numbers: filterTruthy(nums) }
  })
}

exports.getNumbers = getNumbers
function getNumbers($board, selector) {
  return map9(function (i) {
    return $board.find(selector(i))
      // Note different jquery.map style
      .map(function () { return parseInt($(this).attr('data-val') || 0) })
      .toArray()
  })
}

// Filter out any values that aren't truthy
exports.filterTruthy = filterTruthy
function filterTruthy(coll) {
  return _.filter(coll, _.identity)
}

// Map over [0,1,2,3,4,5,6,7,8]
exports.map9 = map9
function map9(f) {
  return _.map(_.range(9), f)
}