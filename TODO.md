### TODO

- [x] Player choosing
    + [x] First player gets sign X, second get O
    + [x] Ask for first player type: "Human" or "Computer"
    + [x] If the player is "Human", asks for name (defaults to the sign)
    + [x] Final names will be:
        * [x] Human: "$name ($sign) [H]" - sign is shown only if different from name
        * [x] Computer: "$sign [AI]"
    + [x] Repeat steps above for second player
- [ ] Computer player
    + [ ] Make dummy bot - chooses the first non empty cell
    + [ ] Show board after it moves
    + [ ] Make smart bot
- [ ] Move choosing
    + [ ] Show board
    + [ ] Take input from user
    + [ ] Place sign on board
- [ ] Status
    + [ ] At the start of the round: "It is $Player's turn"
    + [ ] After move: "$Player has chosen $coords"
    + [ ] At game end: 
        * [ ] Win: "$Player has won"
        * [ ] Tie: "The game is a tie"
        * [ ] Play again: "Would you like to start again?"
    
