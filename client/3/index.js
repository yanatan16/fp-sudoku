// Round 1
// Draw the board

var $ = require('jquery')
  , draw = require('./lib/draw')
  , board = require('./lib/board')
  , sudoku = require('./vendor/sudoku.js/sudoku')

  , $board = $('#board')

draw($board)
board.init($board)