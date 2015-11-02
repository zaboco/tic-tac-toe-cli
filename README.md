# TicTacToe CLI

A toy project.

## Usage
> requires [node `>= v4.0.0`](https://nodejs.org/en/)

#### Start game
```sh
$ npm start
```

#### Choose players
```sh
? Choose type (Use arrow keys)
❯ Human
  Computer
```

There are two types of players:
- __Human__: will take input from the keyboard
- __Computer__: uses an [algorithm](#computer-algorithm) to find the best move for the given board

#### Human input
```sh
It is X[H: Joe]s turn:
    a   b   c
   ───────────
1 │   │   │   │
  │───────────│
2 │   │   │   │
  │───────────│
3 │   │   │   │
   ───────────
? Choose empty cell (a1-c3)
```

## Computer algorithm

The algorithm used to find the best move is based on [the __Negamax__ search](https://en.wikipedia.org/wiki/Negamax):
> "a variant form of [minimax](https://en.wikipedia.org/wiki/Minimax)"

It is, however, optimized in several ways:
- It looks for __immediate winners__: it checks all the available moves for an immediate `winner`, and only if it does not find one, it actually starts checking the full tree of possible moves using negamax.
- When doing the search, it uses a form of [__pruning__](https://en.wikipedia.org/wiki/Negamax#Negamax_with_alpha_beta_pruning), meaning that, when it finds a `winning` move, it does not check further moves.
- It uses [__standard openings__](/solver/openings), based on analyzing the outcome of the first two moves. This is because, for the first move in the opening round, any choice ensures a `tie`, and, for the the second move, there are some choices that result in a `tie`, all the others being `looser`s. So, if the best outcome when making the first move is a `tie`, it makes no sense to compute it all the time. So, for the first round, [the moves](/solver/openings/README.md) are:
    + if first: any move is good, but it will choose a _corner_, since it leaves the opponent only one move that is not `loosing` (the _center_)
    + if second: depending on the first move, there are several choices available, but, in any case, choosing the `center` is a move that guarantees at least a `tie`. Except, of course, if the first move is itself in the _center_, in which case, the algorithm will choose any _corner_.
    
## TODO
- [ ] Format text using specific colors (for player names, signs, etc).
- [ ] Make some game aspects configurable (like table box chars), maybe from a settings file.
- [ ] Add other ways to take human input for moves.
- [ ] Add some others UIs (e.g. HTML)