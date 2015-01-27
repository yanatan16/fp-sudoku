// Sudoku Board
var _ = require('underscore')
  , events = require('./events')
  , validate = require('./validate')
  , solveState = require('./solve')
  , util = require('./util')
  , sudoku = require('../vendor/sudoku.js/sudoku')

exports.init = function ($board) {
  fill($board, 'easy')
  events.capture($board, function onChange() {
    checkBoard($board)
  })
}

exports.solve = function ($board) {
  try {
    solveState(getBoardState())
  } catch (e) {
    if (e.message == 'solved')
      putBoardState(e.state)
    else
      throw e

    checkBoard($board)
  }

  function getBoardState() {
    return util.getNumbers($board, util.makeAttrSelector('data-row'))
  }

  function putBoardState(state) {
    return _.map(state, function (row, i) {
      return _.map(row, function (val, j) {
        $board.find('[data-row='+i+'][data-col='+j+']').text(val).attr('data-val', val)
      })
    })
  }
}

// Round 2: Fill in the board with a new game
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

function showInvalids($board, invalidBunches) {
  $board.find('.invalid').removeClass('invalid')

  _.each(invalidBunches, function (bunch) {
    $board.find(bunch.selector).addClass('invalid')
  })
}

function allFilledIn($board) {
  return !$board.find('.box:empty').length
}

function showDone($board) {
  $board.addClass('done')
}
