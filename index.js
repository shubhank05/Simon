var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPatternUnclicked = [];
var level = 0;

function nextSequence() {
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    userPatternUnclicked = [...gamePattern].reverse();

    var delay = 100;

    if(level!=0){
        delay = 800;
    }


    setTimeout(function(){
        animateTile(randomChosenColor);
        $('#level-title').text("Level " + level);
    }, delay);

    
    level++;
    
    return randomChosenColor;

}

function tileSelectAnimate(tileColor){

    $('.' + tileColor).addClass("pressed");

    setTimeout(function(){
        $('.' + tileColor).removeClass("pressed");
    }, 100);

}

function playAudio(tileColor){
    var audio = new Audio("./sounds/" + tileColor + ".mp3");
    audio.play();
}

function animateTile(tileColor){
    tileSelectAnimate(tileColor);
    playAudio(tileColor);
}

function gotWrong(){

    level = 0;
    playAudio("wrong");

    $('#level-title').text('Game Over, Press Any Key to Restart');


    $('body').addClass("wrong");


    setTimeout(function(){
        $('body').removeClass("wrong");
    }, 100);


    gamePattern = [];
    userPatternUnclicked = [];

}


$('body').keydown(
    function(){
        if (level === 0){
            randomChosenColor = nextSequence();
        }
    }

);

$('.btn').click(
    function(){
        
        if(userPatternUnclicked.length != 0){
            
            if(this.id != userPatternUnclicked.pop()){
                gotWrong();
                return;
            }

            else{
                animateTile(this.id);
            }

            if(userPatternUnclicked.length ===0){
                nextSequence();
            }

        }

        else{
            gotWrong();
        }
    }
);







