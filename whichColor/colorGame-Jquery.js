/*global $*/

var numSquares = 6;
var colors = [];
var pickedColor;
var squares = $('.square');
var colorDisplay = $('#colorDisplay');
var messageDisplay = $('#message');
var h1 = $('h1');
var resetButton = $('#reset');
var modeBtn = $('.mode');

init();

function init(){
  setUpModeBtn();
  setUpSquares();
  repCode();

}

$(resetButton).click(function(){
  repCode();
});

function setUpModeBtn(){
  for (var i = 0; i < modeBtn.length; i++){
    $(modeBtn[i]).click(function(){
      // THREE SOLUTION ON REMOVING THE SELECTED CLASS
      // [].forEach.call(modeBtn, function(x){ //modeBtn is not an array, its a collection of HTML jadi bisa di bikin menjadi array pake gitu.
      //   $(x).removeClass('selected');
      // });
      // $(modeBtn).each(function(){
      //   $(this).removeClass('selected');
      // });
      $.each(modeBtn, function(){
        $(this).removeClass('selected');
      })
      $(this).addClass('selected');
      this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
      repCode();
    });
  }
}

// set up all the squares and assign colors
function setUpSquares(){
  for (var i = 0; i < squares.length; i++){
    $(squares[i]).click(function(){
      var clickedColor = $(this).css("background-color");
      if (clickedColor === pickedColor){
        $(h1).css({"background-color":pickedColor});
        $(messageDisplay).text("Correct!")
        chgColor(clickedColor);
        $(resetButton).text("Play Again?");
        console.log("yes")
      }else{
        $(this).css({"background-color": "#232323"});
        $(messageDisplay).text("Wrong!")
        console.log("no"+ clickedColor);
      }
    });
  }
}

function repCode(){
  colors = makeColCol(numSquares);
  pickedColor = pickColor();
  $(colorDisplay).text(pickedColor);
  $(h1).css({"background-color":"steelblue"});
  $(messageDisplay).text(" ");
  $(resetButton).text("New Game");
  for (var i = 0; i < squares.length; i++){
    if (colors[i]){
      $(squares[i]).css({"display":"block"});
      $(squares[i]).css({"background-color":colors[i]});
    }else{
      $(squares[i]).css({"display":"none"});
    }
  }
  console.log(colors);
  console.log(numSquares);
}

// change all the squares color if GUESSED CORRECTLY
function chgColor(clr){
  for (var i = 0; i < squares.length; i++){
    $(squares).css({"background-color":clr});
  }
}

// pick a color from colors collections
function pickColor(){
  var rndmclr = Math.floor(Math.random() * colors.length);
  return colors[rndmclr];
}

// generate random color
function randomColor(){
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  return "rgb("+r+", "+g+", "+b+")";
}

// make collections of random colors
function makeColCol(x){
  var arr = []
  for (var i = 0; i < x; i++){
    arr.push(randomColor())
  }
  console.log("arr "+ arr);
  return arr;
}
