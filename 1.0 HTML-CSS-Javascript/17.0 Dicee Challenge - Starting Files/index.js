//Random number and select images
var randomNumber1 = Math.floor(Math.random() *6 ) +1;
var randomImage1 = "./images/dice"+randomNumber1+".png";

var randomNumber2 = Math.floor(Math.random() *6 ) +1;
var randomImage2 = "./images/dice"+randomNumber2+".png";

var images = document.querySelectorAll("img");

images[0].setAttribute("src", randomImage1);
images[1].setAttribute("src", randomImage2);
var winner = document.querySelectorAll("h1");
if(randomNumber1 > randomNumber2){
    winner[0].innerHTML = "🚩 Play 1 Wins!";
} else if( randomNumber1 < randomNumber2){
    winner[0].innerHTML = "🚩 Play 2 Wins!";
}else {
    winner[0].innerHTML = "Draw!";
}


