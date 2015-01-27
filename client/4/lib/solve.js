// Solve the sudoku!
// We'll solve slowly, so that we can show it on screen
var _ = require('underscore')

module.exports = solveState

function solveState(state) {
  var loc = nextEmpty(state)

  if (!loc)
    solved(state)

  var avail = getAvailableValues(state, loc)

  if (!avail.length)
    throw new Error('deadend')

  _.each(avail, function (val) {
    try {
      solveState(assocState(state, loc, val))
    } catch (e) {
      if (e.message == 'deadend')
        return
      else
        throw e
    }
  })

  throw new Error('deadend')
}

function getAvailableValues(state, loc) {
  var i = loc[0], j = loc[1]

  // Use set difference to find available values
  return _.difference(allValues(), rowValues(), colValues(), areaValues())

  function allValues() {
    return _.range(1, 10)
  }

  function rowValues() {
    var row = state[i]
    return withoutIndex(state[i], j)
  }

  function colValues() {
    return withoutIndex(toColumns(state)[j], i)
  }

  function areaValues() {
    return withoutIndex(toAreas(state)[areaIndex(i,j)], indexInArea(i,j))
  }
}

// Find next empty spot in state
function nextEmpty(state) {
  var i = _.findIndex(state, function (row) {
    return _.indexOf(row, 0) > -1
  })

  var j = i>-1 ? _.indexOf(state[i], 0) : -1

  return j>-1 && [i, j]
}

// Return a copy of state with val set at loc
// Read "associate state"
function assocState(state, loc, val) {
  var cstate = cloneState(state)
  cstate[loc[0]][loc[1]] = val
  return cstate
}

function cloneState(state) {
  return _.map(state, function (substate) {
    return _.clone(substate)
  })
}

// Throw the "Solved" error
function solved(state) {
  var err = new Error('solved')
  err.state = state
  throw err
}

// Remove the value at index i with a slice
// Kinda like splice without side-effect
function withoutIndex(arr, i) {
  return arr.slice(0, i).concat(arr.slice(i+1))
}

// Transpose state to an array of columns
function toColumns(state) {
  return _.zip.apply(_, state)
}

// Calculate the area that a box is in
function areaIndex(i, j) {
  return Math.floor(i / 3) * 3 + Math.floor(j / 3)
}

// Calculate the index of the area array for a box
function indexInArea(i, j) {
  return (i % 3) * 3 + (j % 3)
}

// Convert an array of rows to an array of areas
// This is pretty high level stuff with mapcat and partitionn
// Can you prove to yourself it works?
function toAreas(state) {
  // A rowset is an array of sets of 3 rows
  // Each row is a colset: an array of sets of 3 values
  var rowsets = partition3(_.map(state, partition3))

  return _.mapcat(rowsets, function (colsets) {
    // We return an array of 3 areas
    // This operation is basically zip and concat
    return _.map(_.range(3), function (area) {
      return _.mapcat(colsets, function (valset) { return valset[area] })
    })
  })

  function partition3(arr) {
    return _.partitionn(arr, 3)
  }
}