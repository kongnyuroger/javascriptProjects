// chalelenge 1: your age in days


function ageInDays(){
    var birthYear = prompt('What year were you born Good  friend');
    var ageInDayss = (2021 - birthYear) * 365;
    var h1 = document.createElement('h1');
    var textAnswer = document.createTextNode("You are " + ageInDayss + " days old");
    h1.setAttribute('id', 'ageInDays');
    h1.appendChild(textAnswer);
    document.querySelector(".flex-box-result").appendChild(h1);
    
}

 function reset() {
     document.getElementById('ageInDays').remove()
 }


 //Challenge 2: your cat generator
function generateCat(){
   var image = document.createElement('img')
   image.src = "images/cat.jpg";
   const div = document.querySelector('.flex-box-container-2');
   div.appendChild(image);
}


//Challenge 3: Rock Paper scissor
function rpsGame(yourChoice){  
    console.log(yourChoice);
    var humanChoice,botChois;
   humanChoice = yourChoice.id;
   
   botChois = numberToChioce(randomRpsInt());
   console.log('computer choice:', botChois);   
   result = decideWinner(humanChoice, botChois);
   console.log(result);
  
   message = finalMessage(result);// {'message'= 'you won' 'color' = 'green' }
   console.log(message);
   rpsFrontEnd(yourChoice.id, botChois.id, message);
   
   
   function randomRpsInt(){
        return Math.floor(Math.random() * 3);
    };
    function numberToChioce(number){
        return ['rock', 'paper', 'scissor'] [number]
    };

    function decideWinner(yourChoice, computerChoice){
        rpsDataBase ={
            'rock': {'scissor': 1, 'rock': 0.5, 'paper': 0},
            'paper': {'rock': 1, 'paper': 0.5, 'scissor': 0},
            'scissor': {'paper': 1, 'scissor': 0.5, 'rock': 0},
        };

        var yourScore = rpsDataBase[yourChoice][computerChoice];
        var computerScore = rpsDataBase[computerChoice][yourChoice];
        return [yourScore, computerScore]
    };

    function finalMessage(yourScore, computerScore) {
        if (yourScore === 0){
            return{'message': 'You loos!', 'color': 'red' }
        }else if (yourScore === 0.5){
            return {'message': 'You tiad!', 'color': 'yellow' }
        }else {
            return {'message': 'You won!', 'color': 'green' }
        }
    }

    function rpsFrontEnd(humanImgChoic, botImgChoic, finalMessage){
        var imagesDataBase = {
            'rock': document.querySelector('#rock').src,
            'paper': document.querySelector('#paper').src,
            'scissor': document.querySelector('#scissor').src
        }  

        //let remove all the images
        document.getElementById('rock').remove();
        document.getElementById('paper').remove();
        document.getElementById('scissor').remove();

        var humanDiv = document.createElement('div');
        var botDiv = document.createElement('div');
        var messageDiv = document.createElement('div');

        humanDiv.innerHTML = "<img src'" + imagesDataBase[humanImgChoic] + "' style='box-shadow: 0px 10px 50px rgba(0, 0, 255, 1)' height=150px width=150px>"
        messageDiv.innerHTML = "<h1 style='color: " + finalMessage['color'] + "; font-size: 60px; padding: 30px;'>" + finalMessage['message'] + "</h1>"
        botDiv.innerHTML = "<img src'" + imagesDataBase[botImgChoic] + "' style='box-shadow: 0px 10px 50px rgba(255, 0, 0, 0.5)' height=150px width=150px>"

        document.querySelector('.flex-box-rps').appendChild(humanDiv);
        document.querySelector('.flex-box-rps').appendChild(messageDiv);
        document.querySelector('.flex-box-rps').appendChild(botDiv);
        
         
    }
}


//challenge 4: change color of all buttons

var all_buttons = document.querySelectorAll('.btn');

var copyAllButtons = [];
for(let i = 0; i < all_buttons.length; i++){
    copyAllButtons.push(all_buttons[i].classList[1]);
}

function buttonColorChange(buttonthingy){
     if(buttonthingy.value === 'red'){
         buttonsRed();
     }else if(buttonthingy.value === 'green'){
         buttonsGreen();
     }else if(buttonthingy.value === 'reset'){
         buttoncolorReset();
     }else if(buttonthingy.value === 'random'){
         randomColors();
     }
}

function buttonsRed(){
    for(let i = 0; i < all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');

    }
}

function buttonsGreen(){
    for(let i = 0; i < all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}

function buttoncolorReset(){
    for(let i = 0; i < all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);

    }
}

function randomColors(){
    var choices =['btn-primary', 'btn-danger', 'btn-success', 'btn-warning'];
    for(let i = 0; i < all_buttons.length; i++){
        var randomnumber = Math.floor(Math.random() * 4);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[randomnumber]);
    }
}



//Challenge 5: Blackjack
var blackjackgame = {
    'you': {'scoreSpan': '#your-blackjack-result', 'div': '.your-box', 'score': 0},
    'dealer': {'scoreSpan': '#dealer-blackjack-result', 'div': '.dealer-box', 'score': 0},
    'cards': ['2', '3', '4', '5', '6', '7', '8','9', '10', 'K', 'J', 'Q', 'A'],
    'cardsMap':{'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8,'9': 9, '10': 10, 'K': 10, 'J': 10, 'Q': 10, 'A': [1, 11]},
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'turnsOver': false,  
};

const you = blackjackgame['you'];
const dealer = blackjackgame['dealer'];

const hitSound = new Audio('sounds/swish.m4a');
const winSound = new Audio('sounds/cash.mp3');
const lossSound = new Audio('sounds/aww.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);

function blackjackHit(){
 if (blackjackgame['isStand'] === false){

    let card = randomCard();
    console.log(card)
    showCard(card, you);
    updateScore(card, you);
    showScore(you);
    }

}

function randomCard(){
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackgame['cards'][randomIndex];
}

function showCard(card, activePlayer){
    if (activePlayer['score'] <= 21){
    let cardImage = document.createElement('img');
    cardImage.src = `images2/${card}.png`;
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitSound.play();
    }
} 

    
function blackjackDeal(){
  if(blackjackgame['turnsOver'] === true){
    blackjackgame['isStand'] = false;
    let yourImages = document.querySelector('.your-box').querySelectorAll('img');
    let dealerImages = document.querySelector('.dealer-box').querySelectorAll('img');

    for(i = 0; i < yourImages.length; i++){
        yourImages[i].remove()
    }
    for(i = 0; i < dealerImages.length; i++){
        dealerImages[i].remove()
    }
    
     you['score'] = 0;
     dealer['score'] = 0;

     document.querySelector('#your-blackjack-result').textContent = 0;
     document.querySelector('#dealer-blackjack-result').textContent = 0;

     document.querySelector('#your-blackjack-result').style.color = '#ffffff'
     document.querySelector('#dealer-blackjack-result').style.color = '#ffffff'

     document.querySelector('#blackjack-result').textContent = "Let's play";
     document.querySelector('#blackjack-result').style.color = '#111';

     blackjackgame['turnsOver'] = true;
  }
}  


function updateScore(card, activePlayer){
    if(card === 'A'){ 
    //if adding  11 keeps me below 21, add 11 else add 1 
      if(activePlayer['score'] + blackjackgame['cardsMap'][card][1] <= 21){
        activePlayer['score'] += blackjackgame['cardsMap'][card][1];
      }else{
        activePlayer['score'] += blackjackgame['cards'][card][0];
      } 

    }else{ 
      activePlayer['score'] +=  blackjackgame['cardsMap'][card];
    }
};  

function showScore(activePlayer)
{
  if(activePlayer['score'] > 21){
    document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
    document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
}else{ 
  document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
  }
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function dealerLogic() {
  blackjackgame['isStand'] = true;
    while(dealer['score'] < 16 && blackjackgame['isStand'] === true){
    let card = randomCard();
    showCard(card, dealer);
    updateScore(card, dealer);
     showScore(dealer);
     await sleep(1800);
  }

         blackjackgame['turnsOver'] = true;
         let winner = computeWinner();
         showResult(winner);
                
     
     
}

//compute winner and return who just won
//update the wins draws and losses
function computeWinner()
{
    let winner;

    if(you['score'] <= 21){
    //condition: higher score than the deealer or dealer bust but you are 21 or under
        if(you['score'] > dealer['score'] || (dealer['score'] > 21)){
            blackjackgame['wins']++
            console.log('You won!');
            winner = you;

        }else if(you['score'] < dealer['score']){
            blackjackgame['losses']++
            console.log('You lost');
            winner = dealer;
        }else if (you['score'] === dealer['score']){
            blackjackgame['draws']++
            console.log('You drew')
        }

        //condition: when user bust but dealer doesn't
        if(you['score'] > 21 &&dealer['score'] <= 21){
            blackjackgame['losses']++
              console.log('You lost!');
              winner = dealer
        }

        //condition: when you and the dealer bust
        if(you['score'] > 21 &&dealer['score'] > 21){
            blackjackgame['draws']++
            console.log('You drew!');
        }         
    }
    console.log(blackjackgame)
    console.log('winner is', winner)
    return winner
};

function showResult(winner) {
     let message, messageColor;
      if (blackjackgame['turnsOver'] === true){
     if(winner === you) {
         document.querySelector('#wins').textContent = blackjackgame['wins'];
         message = 'You won!';
         messageColor = 'green';
         winSound.play();

     } else if (winner === dealer) {
        document.querySelector('#losses').textContent = blackjackgame['losses'];
        message = 'You loss!';
        messageColor = 'red';
        lossSound.play();

     } else {
        document.querySelector('#draws').textContent = blackjackgame['draws'];
         message = 'You drew';
         messageColor = 'black';
     }

     document.querySelector('#blackjack-result').textContent = message;
     document.querySelector('#blackjack-result').style.color = messageColor;
  }

}


