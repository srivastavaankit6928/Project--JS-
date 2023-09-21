'use strict';
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;
const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};
document.querySelector('.number').textContent = '?';
document.querySelector('.score').textContent = score;
document.querySelector('.check').addEventListener('click', function () {
  const take = Number(document.querySelector('.guess').value);
  console.log(take);

  //No value by player.
  if (!take) {
    displayMessage('No number!');
  }

  //equal value by player.
  else if (take === secretNumber) {
    displayMessage('Correct Answer');
    document.querySelector('.number').textContent = secretNumber;
    document.querySelector('.highscore').textContent = score;
    document.querySelector('body').style.backgroundColor = '#70b347';
    document.querySelector('.number').style.width = '30rem';
  }

  //unequal value by player.
  else if (take !== secretNumber) {
    if (score > 1) {
      score--;
      document.querySelector('.score').textContent = score;
      if (take < secretNumber) {
        secretNumber - take <= 5
          ? displayMessage('Low...')
          : displayMessage('Too Low...');
      } else {
        take - secretNumber <= 5
          ? displayMessage('High...')
          : displayMessage('Too High...');
      }
    } else {
      displayMessage('You Lost!');
      document.querySelector('.score').textContent = 0;
      document.querySelector('body').style.backgroundColor = 'rgb(255,0,0)';
    }
  }
});

  document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  document.querySelector('.score').textContent = 20;
  displayMessage('Start guessing...');
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').textContent = '?';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.guess').value = '';
});
