// Validation
var _ = require('underscore')
  , util = require('./util')

module.exports = validate

// Validate the entire board by validating each "bunch" (row, col, area)
// Return a list of invalid bunches
// Each bunch is an object with {selector: '[data-xxx=i]'} for easy display
function validate($board) {
  return validateBunches($board, util.makeAttrSelector('data-row'))
    .concat(validateBunches($board, util.makeAttrSelector('data-col')))
    .concat(validateBunches($board, util.makeAttrSelector('data-area')))
}

// Validate all 9 bunches of a selector (rows, cols, and areas)
// This returns an array of erroring bunches
function validateBunches($board, selector) {
  return _.reject(util.getBunches($board, selector), isValidBunch)
}

// Validate a bunch ({numbers: [1,2,5]}) is valid
// - No duplicates
function isValidBunch(bunch) {
  return _.uniq(bunch.numbers).length === bunch.numbers.length
}