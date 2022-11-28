
const startButton = document.querySelector('#start');
const scoreDiv = document.getElementById('score');
let scoreLow = localStorage.getItem('lowestscore');
let scoreCounter = 0;
const gameContainer = document.getElementById("game");
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

function shuffle(array) { 
  let counter = array.length;
 
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--; 
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}
let shuffledColors = shuffle(COLORS);


function createDivsForColors(colorArray) {
  startButton.addEventListener('click', function(event){
    
    const score = document.createElement('div');
    score.classList.add('currentScore');
    score.innerText = 'Score: ';
    scoreDiv.append(score);
    const scoreNum = document.createElement('span');
    scoreNum.innerText = scoreCounter;
    scoreNum.id = 'scoreNum';
    score.append(scoreNum);

    const lowScore = document.createElement('div');
    lowScore.id = 'lowscore';
    lowScore.innerText = 'Lowest Score: ';
    scoreDiv.append(lowScore);
    const lowSpan = document.createElement('span')
    lowSpan.innerText = scoreLow;
    lowSpan.id = 'lowSpan';
    lowScore.append(lowSpan);

    startButton.remove();

    for (let color of colorArray) {
      const newDiv = document.createElement("div");
      newDiv.classList.add(color);
      newDiv.addEventListener("click", handleCardClick);
      gameContainer.append(newDiv);
    }
  })
}

let compareArr = [];
let gameOver = COLORS.length;

function handleCardClick(event) {
  const newColor = event.target.className;
  const divClicked = event.target; //div clicked
  compareArr.push(newColor);
  

  if(compareArr.length < 3){
    event.target.style.backgroundColor = newColor;
    scoreCounter += 1;
    // scoreLow += 1;
    document.getElementById('scoreNum').innerHTML = scoreCounter;
    // document.getElementById('lowSpan').innerHTML = scoreLow;
    divClicked.removeEventListener('click', handleCardClick); //remove the event listener
  }

  if(compareArr.length === 2){
    if(compareArr[0] === compareArr[1]){
      console.log('Match');
      gameOver -= 2;
      console.log(gameOver);
      compareArr = [];
    }
    else{
      setTimeout(function() {
        console.log('No match');
        let color1 = document.getElementsByClassName(compareArr[0]);
        let color2 = document.getElementsByClassName(compareArr[1]);        
     
        for(let k of color1){
          k.style.backgroundColor = '';
          k.addEventListener('click', handleCardClick)
        }

        for(let k of color2){
          k.style.backgroundColor = '';
          k.addEventListener('click', handleCardClick)
        }
        compareArr = [];
      },1000)
    }
  }
  setTimeout(function() {
    if (gameOver === 0){
      window.alert('Game Over!');
      window.alert(`Your score was: ${scoreCounter}`)
      let gameOver = 1;

      for(let color of COLORS){
        let removeColor = document.getElementsByClassName(color);
        
        for(let k of removeColor){
          k.remove();
        }
      }
      let restartButton = document.createElement('button')
      restartButton.innerText = 'Restart Game';
      gameContainer.append(restartButton);

      gameContainer.addEventListener('click', function(event){
        location.reload();
      })

      if (scoreCounter < scoreLow){
        scoreLow = scoreCounter;
        localStorage.setItem('lowestscore', scoreLow);
      }
      else if (scoreLow === null) {
        scoreLow = scoreCounter;
        localStorage.setItem('lowestscore', scoreLow);
      }
    }
  },1000) 
}




// when the DOM loads
createDivsForColors(shuffledColors);

