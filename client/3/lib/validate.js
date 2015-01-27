// Validation
var _ = require('underscore')
  , $ = require('jquery')

module.exports = validate

// Validate the entire board by validating each "bunch" (row, col, area)
// Return a list of invalid bunches
// Each bunch is an object with {selector: '[data-xxx=i]'} for easy display
function validate($board) {
  return validateBunches($board, makeAttrSelector('data-row'))
    .concat(validateBunches($board, makeAttrSelector('data-col')))
    .concat(validateBunches($board, makeAttrSelector('data-area')))
}

// Return a selector function for an attribute
function makeAttrSelector(attr) {
  return function (val) {
    return '[' + attr + '=' + val + ']'
  }
}

// Validate all 9 bunches of a selector (rows, cols, and areas)
// This returns an array of erroring bunches
function validateBunches($board, selector) {
  return _.reject(getBunches($board, selector), isValidBunch)
}

// Validate a bunch ({numbers: [1,2,5]}) is valid
// - No duplicates
function isValidBunch(bunch) {
  return _.uniq(bunch.numbers).length === bunch.numbers.length
}

// Get the list of numbers for a given selector function
// selector will be called with an index 0 - 9
function getBunches($board, selector) {
  return map9(function (i) {
    var nums = filterTruthy(
      $board.find(selector(i))
        // Note different jquery.map style
        .map(function () { return parseInt($(this).attr('data-val') || 0) })
    )

    return { selector: selector(i), numbers: nums }
  })
}

// Filter out any values that aren't truthy
function filterTruthy(coll) {
  return _.filter(coll, _.identity)
}

// Map over [0,1,2,3,4,5,6,7,8]
function map9(f) {
  return _.map(_.range(9), f)
}