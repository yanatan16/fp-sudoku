// Sudoku Board
var _ = require('underscore')
  , sudoku = require('../vendor/sudoku.js/sudoku')

exports.init = function ($board) {
  fill($board, 'easy')
}

function fill($board, difficulty) {
  // For each box, fill the value
  forEachStateBox($board, generateGame(), function ($box, val) {
    // SIDE-EFFECTS
    if (val)
      $box.text(val).attr('data-val', val).addClass('unchangeable')
    else
      $box.attr('data-val', '').attr('contenteditable', '')
  })
}

// Generate a game and return as 9x9 2d array
function generateGame(difficulty) {
  // Each game comes as an object like so:
  // { A1: 5, B4: 6 }
  // Empty squares are not included
  var game = sudoku.generate(difficulty || 'easy')

  return _.map('ABCDEFGHI'.split(''), function (letter) {
    return _.map(_.range(1, 10), function (number) {
      return game[letter + number]
    })
  })
}

// Fill the board with the state
// Warning: DOM Side Effects
function forEachBox($board, f) {
  _.each(_.range(9), function (i) {
    _.each(_.range(9), function (j) {
      f($board.find('[data-row='+i+'][data-col='+j+']'), i, j)
    })
  })
}

// Run forEachBox and convert i,j to state value
function forEachStateBox($board, state, f) {
  forEachBox($board, function ($box, i, j) {
    f($box, state[i][j], i, j)
  })
}