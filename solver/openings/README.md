### Tic-Tac-Toe Openings

Below it is a list of the optimal moves that a second player can make in order to avoid losing (all represent a `tie` when played optimally), after each possible first move. All the other moves can result in a `loss` for the second player.

```
      a   b   c          a   b   c          a   b   c
     ───────────        ───────────        ───────────
  1 │ 1 │   │   │    1 │ 2 │ 1 │ 2 │    1 │   │   │ 1 │
    │───────────│      │───────────│      │───────────│
  2 │   │ 2 │   │    2 │   │ 2 │   │    2 │   │ 2 │   │
    │───────────│      │───────────│      │───────────│
  3 │   │   │   │    3 │   │ 2 │   │    3 │   │   │   │
     ───────────        ───────────        ───────────


      a   b   c          a   b   c          a   b   c
     ───────────        ───────────        ───────────
  1 │ 2 │   │   │    1 │ 2 │   │ 2 │    1 │   │   │ 2 │
    │───────────│      │───────────│      │───────────│
  2 │ 1 │ 2 │ 2 │    2 │   │ 1 │   │    2 │ 2 │ 2 │ 1 │
    │───────────│      │───────────│      │───────────│
  3 │ 2 │   │   │    3 │ 2 │   │ 2 │    3 │   │   │ 2 │
     ───────────        ───────────        ───────────


      a   b   c          a   b   c          a   b   c
     ───────────        ───────────        ───────────
  1 │   │   │   │    1 │   │ 2 │   │    1 │   │   │   │
    │───────────│      │───────────│      │───────────│
  2 │   │ 2 │   │    2 │   │ 2 │   │    2 │   │ 2 │   │
    │───────────│      │───────────│      │───────────│
  3 │ 1 │   │   │    3 │ 2 │ 1 │ 2 │    3 │   │   │ 1 │
     ───────────        ───────────        ───────────
```

From the above scheme, we can choose from standard opening moves, since there is no such big difference between them:

#### First move
Since no second move is a certain `win` for the second player, it follows that the first player is guaranteed a `tie` for any move that it makes. So, choosing the first move is not that important, but, since it is intuitively better to constraint the opponent's moves, a good first choice would be one of the corners, since the second player can only choose the center of the board in order not to loose.

#### Second move
If the player is second, it should choose one of the moves that guarantee a `tie`. From the above figures, it appears that a general rule is to choose the center of the board, except when it is already chosen, in which case it should choose any corner.
