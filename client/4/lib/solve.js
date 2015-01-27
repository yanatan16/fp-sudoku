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
    , columnwiseState = toColumns(state)
    , areawiseState = toAreas(state)

  return _.difference(allValues(), rowValues(), colValues(), areaValues())

  function allValues() {
    return _.range(1, 10)
  }

  function rowValues() {
    var row = state[i]
    return withoutIndex(state[i], j)
  }

  function colValues() {
    return withoutIndex(columnwiseState[j], i)
  }

  function areaValues() {
    return withoutIndex(areawiseState[areaIndex(i,j)], indexInArea(i,j))
  }
}

function nextEmpty(state) {
  var row = _.find(annotateLocation(state), function (row) {
    return _.find(row, function (obj) {
      return obj.val === 0
    })
  })


  var obj = row && _.find(row, function (obj) {
    return obj.val === 0
  })

  return obj && [obj.i, obj.j]
}

function annotateLocation(state) {
  return _.map(state, function (row, i) {
    return _.map(row, function (val, j) {
      return {val: val, i: i, j: j}
    })
  })
}

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

function solved(state) {
  var err = new Error('solved')
  err.state = state
  throw err
}

function withoutIndex(arr, i) {
  return arr.slice(0, i).concat(arr.slice(i+1))
}

function toColumns(state) {
  return _.zip.apply(_, state)
}

function areaIndex(i, j) {
  return Math.floor(i / 3) * 3 + Math.floor(j / 3)
}

function indexInArea(i, j) {
  return (i % 3) * 3 + (j % 3)
}

function toAreas(state) {
  var first = state.slice(0, 3)
    , second = state.slice(3, 6)
    , third = state.slice(6)

  return areasOf(first).concat(areasOf(second)).concat(areasOf(third))

  function areasOf(group) {
    return [group[0].slice(0, 3).concat(group[1].slice(0, 3)).concat(group[2].slice(0, 3)),
            group[0].slice(3, 6).concat(group[1].slice(3, 6)).concat(group[2].slice(3, 6)),
            group[0].slice(6, 9).concat(group[1].slice(6, 9)).concat(group[2].slice(6, 9))]
  }
}