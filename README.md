# Sudoku as a Functional Programming exercise

# Use

To run:

```
npm install
node index
```

And open up `localhost:3000` in a browser.

### Dockerized

```
docker run -it --rm --volume $(pwd):/app --publish 3000:3000 yanatan16/fp-sudoku
```

And open up `dockerhost:3000` in a browser, where `dockerhost` is your connected docker host: on boot2docker, `dockerhost` is `$(bootdocker ip)`; on linux its `localhost`

# License

MIT