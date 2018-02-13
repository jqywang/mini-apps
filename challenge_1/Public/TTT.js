var nextMove = {
	letter: 'X',
	color: 'blue'
};
var boardArray = [
[0, 0, 0],
[0, 0, 0],
[0, 0, 0]
];
var title = document.getElementById('box');
var moveCount = 0;
var changeNext = (letter) => {
	if(letter.letter === 'O'){
		return nextMove = {letter: 'X', color: 'blue'};
	}
	return {letter: 'O', color: 'red'};
};

var something = document.getElementsByTagName("th");
var setup = function () {
	title.innerHTML = '';
	moveCount = 0;
	for(var j = 0; j < 3; j++){
		for (k = 0; k < 3; k++){
			boardArray[j][k] = 0;
		}
	}
	for(var i = 0; i < something.length; i++) {
		something[i].addEventListener('click', onClick);
		something[i].setAttribute('style', 'color: black;');
	}
}

var onClick = function (e){
	if(this.innerHTML === '--'){
		this.innerHTML = nextMove.letter;
		this.setAttribute('style', `color: ${nextMove.color};`);
		var coordinates = findCoordinates(this.id);
		addToBoard(coordinates, nextMove.letter);
		moveCount ++;
		if(checkWinner(coordinates)){
			clearListeners();
			title.innerHTML = `${nextMove.letter} Wins!!!`;
		} else if (moveCount === 9) {
			title.innerHTML = 'Tic Tac Toe is a solved game';
		}

		nextMove = changeNext(nextMove);
	}
}

document.getElementById('clear').addEventListener('click', function () {
	for(var i = 0; i < something.length; i++) {
		something[i].innerHTML = '--';
		nextMove = {letter: 'X', color: 'blue'};
	}
	setup();
});

var clearListeners = function () {
	for (var i = 0; i < something.length; i++) {
		something[i].removeEventListener('click', onClick);
	}
}

var findCoordinates = function (string) {
	string = string.split('-');
	return string.map(x => parseInt(x));
}

var addToBoard = function (coordinates, letter){
	boardArray[coordinates[0]][coordinates[1]] = letter;
}

var checkWinner = function (coordinates) {
	var row = coordinates[0];
	var column = coordinates[1];
	if(checkColumn(column)){
		return true;
	}
	if(checkRow(row)){
		return true;
	}
	return checkDiagonal();
};

var checkColumn = function (column) {
	//returns true if column has winner
	if(boardArray[0][column] === boardArray[1][column] && boardArray[1][column] === boardArray[2][column]){

		return true;
	}
	return false;
};
var checkRow = function (row) {
	if(boardArray[row][0] === boardArray[row][1] && boardArray[row][1] === boardArray[row][2]){
		return true;
	}
	return false;
};

var checkDiagonal = function () {
	if(boardArray[1][1] === 0) {
		return false;
	}
	if(boardArray[0][0] === boardArray[1][1] && boardArray[1][1] === boardArray[2][2]){
		return true;
	}
	if(boardArray[0][2] === boardArray[1][1] && boardArray[2][0] == boardArray[1][1]){
		return true;
	}
	return false;
}

setup();