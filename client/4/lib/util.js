// Utilties
// Used to be in board.js or validate.js
// Now here because used in board.js
var $ = require('jquery')
  , _ = require('underscore')

// Fill the board with the state
// Warning: DOM Side Effects
exports.forEachBox = forEachBox
function forEachBox($board, f) {
  _.each(_.range(9), function (i) {
    _.each(_.range(9), function (j) {
      f($board.find('[data-row='+i+'][data-col='+j+']'), i, j)
    })
  })
}

// Run forEachBox and convert i,j to state value
exports.forEachStateBox = forEachStateBox
function forEachStateBox($board, state, f) {
  forEachBox($board, function ($box, i, j) {
    f($box, state[i][j], i, j)
  })
}

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

_.mixin({
  // A naive solution
  findIndex: function (arr, test) {
    var val = _.find(arr, test)
    if (!val) return -1
    return _.indexOf(arr, val)
  },

  // Partition into parts of size n
  partitionn: function (arr, n) {
    var groups = _.groupBy(arr, function (x, i) {
      return Math.floor(i / n)
    })

    return _.map(_.range(n), function (i) {
      return groups[i]
    })
  },

  concat: function () {
    return _.reduce(Array.prototype.slice.call(arguments), function (memo, arr) {
      return memo.concat(arr)
    }, [])
  },

  // map and concat
  mapcat: function (coll, f) {
    return _.concat.apply(_, _.map(coll, f))
  }
})