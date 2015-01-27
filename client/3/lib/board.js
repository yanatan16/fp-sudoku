// Sudoku Board
var _ = require('underscore')
  , events = require('./events')
  , validate = require('./validate')
  , util = require('./util')
  , sudoku = require('../vendor/sudoku.js/sudoku')

exports.init = function ($board) {
  fill($board, 'easy')
  events.capture($board, function onChange() {
    checkBoard($board)
  })
}

function fill($board, difficulty) {
  // For each box, fill the value
  util.forEachStateBox($board, generateGame(), function ($box, val) {
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

// Round 3: Check the board for errors and finishing
function checkBoard($board) {
  var invalidBunches = validate($board)
  showInvalids($board, invalidBunches)

  if (!invalidBunches.length && allFilledIn($board))
    showDone($board)
}

// Set invalid classes on DOM from invalid bunches
// SIDE-EFFECTS
function showInvalids($board, invalidBunches) {
  $board.find('.invalid').removeClass('invalid')

  _.each(invalidBunches, function (bunch) {
    $board.find(bunch.selector).addClass('invalid')
  })
}

// See if board is all filled in
function allFilledIn($board) {
  return !$board.find('.box:empty').length
}

// Set done class
// SIDE-EFFECTS
function showDone($board) {
  $board.addClass('done')
}
