// Sudoku Board
var _ = require('underscore')
  , sudoku = require('../vendor/sudoku.js/sudoku')

exports.init = function ($board) {
  fill($board, 'easy')
}

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
        $box.text(val).data('val', val).addClass('unchangeable')
      else
        $box.data('val', null).attr('contenteditable', '')
    })
  })
}