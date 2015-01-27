// Handle all the HTML Events
// Not very functional

exports.capture = capture

function capture($board, onchange) {
  $board.on('input', '.box', function (evt) {
    var $box = $(evt.target)

    // Validate the text and save as data 'val'
    if (!/^[0-9]?$/.test($box.text())) {
      $box.text($box.attr('data-val'))
    } else {
      $box.attr('data-val', $box.text())

      onchange()
    }
  })
}