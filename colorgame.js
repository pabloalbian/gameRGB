var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("goalColor");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var easyBtn = document.querySelector("#easyBtn");
var hardBtn = document.querySelector("#hardBtn");
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
	setupModeButtons();
	setupSquares();
	reset();
}

function setupModeButtons() {
		//Mode buttons
	for (var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function() {
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			//Ternary operator to set number of squares depending on level
			this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
			reset();
		});
	}

}

function setupSquares() {
	for (var i = 0; i< squares.length; i++) {
		//Add click listeners to squares
		squares[i].addEventListener("click", function() {
			//grab color of clocked square and compare to pickedcolor
			var clickedColor = this.style.backgroundColor;
			if (clickedColor === pickedColor) {
				messageDisplay.textContent = "Correct!";
				resetButton.textContent = "Play Again?";
				changeColors(clickedColor);
				h1.style.backgroundColor = clickedColor;
			} else {
				this.style.backgroundColor = "steelblue";
				messageDisplay.textContent = "Try again!";
			}
		});
	}

}

function reset() {
	colors = generateRandomColors(numSquares);
	//pick up new random color form array
	pickedColor = pickColor();
	//change colorDisplay to match picked Color
	colorDisplay.textContent = pickedColor;

	resetButton.textContent  ="New Colors";
	messageDisplay.textContent = "";
	//change colors of squares
	for (var i = 0; i < squares.length; i++) {
		if(colors[i]) {
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
	h1.style.backgroundColor = "steelblue";
}


resetButton.addEventListener("click", function() {
	reset();
});

colorDisplay.textContent = pickedColor;

function changeColors(color) {
	//loop through all squares
	for (var i = 0; i< colors.length; i++) {
		//change each color to match given color
		squares[i].style.backgroundColor = color;
	}
}

function pickColor() {
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num) {
	//make an array
	var arr = [];
	for (var i=0; i < num; i++) {
		//get random color and push into array
		arr.push(randomColor());
	}
	//return the array
	return arr;
}

function randomColor(){
	//pick each color from 0 to 255
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);	

	return "rgb(" + r + ", " + g + ", " + b + ")";
}