// Draw the Board
var $ = require('jquery')
  , _ = require('underscore')

module.exports = drawBoard

function drawBoard($board) {
  _.each(genRows(), function (row) {
    $board.append(row)
  })
}

function genRows() {
  return _.times(9, function (i) {
    var $row = $('<div>')
      .addClass('row')

    $row.append.apply($row, genBoxes(i))

    return $row
  })
}

function genBoxes(i) {
  return _.times(9, function (j) {
    return $('<div>')
      .addClass('box')
      .attr('data-row', i)
      .attr('data-col', j)
      .attr('data-area', area(i, j))
  })
}

// Find the area of a box given its row and column
function area(i, j) {
  return Math.floor(i / 3) * 3 + Math.floor(j / 3)
}