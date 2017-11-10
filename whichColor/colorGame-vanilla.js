var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeBtn = document.querySelectorAll(".mode");

init();

function init(){
	setUpModeBtn();
	setUpSquares();
	repeatCode();
}

function setUpModeBtn(){
	for (var i = 0; i < modeBtn.length; i++){
		modeBtn[i].addEventListener("click", function(){
			// modeBtn[0].classList.remove("selected");
			// modeBtn[1].classList.remove("selected");
			modeBtn.forEach(function(x){
				x.classList.remove("selected");
			})
			this.classList.add("selected");
			this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
			repeatCode();
		})
	}
}

function setUpSquares(){
	for (var i = 0; i < squares.length; i++) {
		//add click listener to squares
		squares[i].addEventListener("click", function(){
			//grab color of clicked squares and later compare it to picked
			 var clickedColor = this.style.backgroundColor;
			 //check clicked color and picked color
			if(clickedColor === pickedColor){
				messageDisplay.textContent = "Correct!";
				changeColors(clickedColor);
				h1.style.backgroundColor = clickedColor;
				resetButton.textContent = "Play Again?";
			} else {
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try Again!";
			}
		})
	}
}
// easyBtn.addEventListener("click", function(){
// 	easyBtn.classList.add("selected");
// 	hardBtn.classList.remove("selected");
// 	numSquares = 3;
// 	repeatCode();
// 	for (var i = 0; i < squares.length; i++){
// 		if (colors[i]){
// 			squares[i].style.backgroundColor = colors[i];
// 		} else {
// 			squares[i].style.display = "none";
// 		}
// 	}
// })

// hardBtn.addEventListener("click", function(){
// 	hardBtn.classList.add("selected");
// 	easyBtn.classList.remove("selected");
// 	numSquares = 6;
// 	repeatCode();
// 	for (var i = 0; i < squares.length; i++){
// 			squares[i].style.backgroundColor = colors[i];
// 			squares[i].style.display = "block";
// 	}
// })

resetButton.addEventListener("click", function(){
	repeatCode();
})

function changeColors(Xcolor){
	//loop all the squares
	for (var i = 0; i < squares.length; i++) {
		//change each color to picked color
		squares[i].style.backgroundColor = Xcolor;
	}
}

function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(x){
	var arr = []
	for (i = 0; i < x; i++){
		arr.push(randomColor())
	}
	return arr;
}

function randomColor(){
		var r = Math.floor(Math.random() * 256);
		var g = Math.floor(Math.random() * 256);
		var b = Math.floor(Math.random() * 256);
		return "rgb(" + r + ", " + g + ", " + b + ")";
}

function repeatCode(){
	colors = generateRandomColors(numSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	h1.style.backgroundColor =  "steelblue";
	messageDisplay.textContent = "";
	resetButton.textContent = "New Colors";
	for (var i = 0; i < squares.length; i++){
		if (colors[i]){
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
}
