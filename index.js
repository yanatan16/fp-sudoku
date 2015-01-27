var express = require('express')
  , serveStatic = require('serve-static')
  , enchilada = require('enchilada')

var app = express()

app
  .use(enchilada({
    src: __dirname + '/client',
    debug: true
  }))
  .get('/', function (req, res, next) {
    req.url = '/0'
    next()
  })
  .get('/:n', function (req, res, next) {
    req.url = '/' + req.params.n + '/index.html'
    next()
  })
  .use(serveStatic(__dirname + '/client'))
  .listen(3000)

console.log('fp-sudoku listening on port 3000')

