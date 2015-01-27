var _ = require('underscore')

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