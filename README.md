# TicTacToe CLI

## API

### Board

#### `#fillCell : ([row, column], sign) -> Board`
Places the `sign` in the cell at the given location and returns a new `Board`

#### `#isEmptyAt : ([row, column]) -> Boolean`

#### `#getSignAt : ([row, column]) -> String`

#### `#hasWinner : () -> Boolean`

#### `#hasTie : () -> Boolean`

### Game

#### Methods

##### `hasNext: () -> Boolean`
Returns true if the game should continue, false when it is finished.

##### `next: () -> Promise Game`
Waits for current player to take its turn, then swaps players and calls itself again, until the game ends.

##### `run: () -> Promise Game`
Starts the game and returns a `Promise` that is fulfilled when the game ends, either by win or tie.

#### Events

##### `game.start (board, currentPlayer)`

##### `round.start (board, currentPlayer)`

##### `round.end (coords, currentPlayer)`

##### `game.won (board, winningPlayer)`

##### `game.tie (board)`

### Player
#### Methods

##### `constructor: (sign, moveAdviser) -> Board`
Parameters:
- __sign__ - either _X_ or _O_ 
- __moveAdviser__ - exposes a method: `coordsFor : (board, sign) -> Promise [row, column]`, which, given a board and a sign, suggests a position on the board where the player should place its sign.

##### `fillCellOnBoard : (board) -> Promise Board`
The player waits for the `moveAdviser` to deliver a position on the board, and place its sign there.