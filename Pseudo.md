1) The following constants are required
    1.1) An array containing the combinations required to win the game.
    1.2) An object for each player.

2) The required variables used to track the state of the game are;
    2.1) A variable to determine the player turn (1 or -1)

3) Upon loading the app, the intro page pops up with a click to start button.
    3.1) Once the start button is clicked, thee players are required to enter their names and submit to start the game.

4) After the player name submission, the main page is rendered. The default at the start of the game should be;
    4.1) Player One plays first, hence, Player One's Turn is highlighted and Player Two name is rendered normally
    4.2) The player scores are set to zero 
    4.3) The board is empty
    4.4) The reset button becomes available

5) Once Player One clicks on a spot;
    5.1) 'X' is rendered on that spot
    5.2) The spot becomes disabled and cannot be selected again
    5.3) It becomes Player Two's turn.
        5.3.1) Player Two's name is highlighted and Player One's name is rendered normally

6) Once Player Two clicks on a spot;
    6.1) 'O' is rendered on that spot
    6.2) The spot becomes disabled and cannot be selected again
    6.3) It becomes Player One's turn.

7) Each player's choices is stored in a array. After each turn, the choices in the array are compared against the winning combination array.
    7.1) If a player has a winning combination, the player wins
        7.1.1) A winning message is displayed
        7.1.2) The winner's score is incremented by one
        7.1.3) All the spots on the board become disabled
        7.1.4) Both Player One and Player Two names are unhighlighted and names are displayed normally

8) Once the reset button is clicked;
    8.1) All the board spots are cleared
    8.2) All the board spots beome enabled again
    8.3) It becomes Player one's turn
    8.4) The player choices in the objects are cleared