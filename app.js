/*
GAME RULES

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND Score.

- But, if the player rolls a 1, all his ROUND score gets lost. After that, its the next players turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score.After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gameplaying;

init();

document.querySelector('.btn--roll').addEventListener('click', function() {
    if (gameplaying) {
        // 1. Random number
        var dice = Math.floor(Math.random() * 6) + 1;

        //2. Display the result
        var diceDOM = document.querySelector('.dice');

        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        //3. Update the roundscore
        if (dice !== 1) {
            //Add score
            roundScore += dice;
            document.querySelector('#current--' + activePlayer).textContent = roundScore;
        } else {
            //Next player
            nextPlayer();
        }

    }
});

document.querySelector('.btn--hold').addEventListener('click', function() {
    if (gameplaying) {
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        // Update UI
        document.querySelector('#score--' + activePlayer).textContent = scores[activePlayer];

        // Check if player won the game
        if (scores[activePlayer] >= 100) {
            document.querySelector('#name--' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player--' + activePlayer).classList.add('winner');
            document.querySelector('.player--' + activePlayer).classList.remove('active');
            gameplaying = false;
        } else {
            // Next player
            nextPlayer();
        }
    }
        
});

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current--0').textContent = '0';
    document.getElementById('current--1').textContent = '0';

    document.querySelector('.player--0').classList.toggle('active');
    document.querySelector('.player--1').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
};

document.querySelector('.btn--new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;

    gameplaying = true;

    document.getElementById('score--0').textContent = '0';
    document.getElementById('score--1').textContent = '0';
    document.getElementById('current--0').textContent = '0';
    document.getElementById('current--1').textContent = '0';

    document.getElementById('name--0').textContent = 'Player 1';
    document.getElementById('name--1').textContent = 'Player 2';

    document.querySelector('.player--0').classList.remove('winner');
    document.querySelector('.player--1').classList.remove('winner');

    document.querySelector('.player--0').classList.remove('active');
    document.querySelector('.player--1').classList.remove('active');
    document.querySelector('.player--0').classList.add('active');

    document.querySelector('.dice').style.display = 'none'; 
}
