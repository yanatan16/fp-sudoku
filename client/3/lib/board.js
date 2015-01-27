// Sudoku Board
var _ = require('underscore')
  , events = require('./events')
  , validate = require('./validate')
  , sudoku = require('../vendor/sudoku.js/sudoku')

exports.init = function ($board) {
  fill($board, 'easy')
  events.capture($board, function onChange() {
    checkBoard($board)
  })
}

// Round 2: Fill in the board with a new game
function fill($board, difficulty) {
  var game = sudoku.generate(difficulty || 'easy')
  // Each game comes as an object like so:
  // { A1: 5, B4: 6 }
  // Empty squares are not included

  _.each('ABCDEFGHI'.split(''), function (letter, i) {
    _.each(_.range(1, 10), function (number, j) {
      var val = game[letter + number]
        , $box = $board.find('[data-row='+i+'][data-col='+j+']')

      if (val)
        $box.text(val).attr('data-val', val).addClass('unchangeable')
      else
        $box.attr('data-val', '').attr('contenteditable', '')
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
