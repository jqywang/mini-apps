var generateEmptyBoard = function (rows, columns) {
  var emptyBoard = [];
  for(var i = 0; i < rows; i++) {
    var row = [];
    for(var j = 0; j < columns; j++) {
      row[j] = 'white';
    }
    emptyBoard.push(row);
  }
  return emptyBoard;
};

var insertAt = function (board, column, color) {
	var index = 0;
	for(var i = 0; i < board.length; i++) {
		if(!board[i+1]) {
			board[i][column] = color;
			index = i;
			break;
		} else if (board[i+1][column] !== 'white') {
			board[i][column] = color;
			index = i;
			break;
		}
	}
	return [board, i]
};

var checkWinner = function (coordinates, board, color) {
  var row = coordinates[0];
  var column = coordinates[1];
  if(checkRow(row, board, color)){
    return true;
  } else if (checkColumn(column, board, color)){
    return true;
  } else if (checkMajorDiag(coordinates, board, color)) {
    return true;
  } else if (checkMinorDiag(coordinates, board, color)) {
    return true;
  }
  return false;
};
var checkRow = function (row, board, color){
  var counter = 0;
  for(var i = 0; i < board[0].length; i++) {
    if(color === board[row][i]){
      counter++;
      if(counter === 4){
        return true;
      }
    } else {
      counter = 0;
    }
  }
  return false;
};

var checkColumn = function (column, board, color) {
  var counter = 0;
  for(var i = 0; i < board.length; i++) {
    if(board[i][column] === color) {
      counter++;
      if(counter === 4) {
        return true;
      }
    } else {
      counter = 0;
    }
  }
  return false;
};

var checkMajorDiag = function (coordinates, board, color) {
  var startCol = coordinates[1] - coordinates[0]; 
  var counter = 0;
  for(var i = 0; i < board.length; i++) {
    if(board[i][startCol + i] === color) {
      counter++;
      if(counter === 4) {
        return true;
      }
    } else {
      counter = 0;
    }
  }
  return false;
};

var checkMinorDiag = function (coordinates, board, color) {
  var startCol = coordinates[0] + coordinates[1];
  var counter = 0;
  for(var i = 0; i < board.length; i++) {
    if(board[i][startCol - i] === color) {
      counter++;
      if(counter === 4) {
        return true;
      }
    } else {
      counter = 0;
    }
  }
  return false;
};

var nextMove = function (color) {
	if(color === 'red') {
		return 'yellow';
	} 
	return 'red';
};

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board : generateEmptyBoard(6, 7),
      move : 'red',
      winner: false
    }
  }
  handlePieceEntry (row, column) {
  	if(this.state.board[0][column] !== 'white') {
  		return;
  	}
  	var newBoard = insertAt(this.state.board, column, this.state.move);
  	row = newBoard[1];
  	var coordinates = [row, column];
  	this.setState({board: newBoard[0]});
  	if(checkWinner(coordinates, this.state.board, this.state.move)) {
  		this.setState({winner: true});
  	} else {
  		var newColor = nextMove(this.state.move);
  		this.setState({move:newColor});
  	}
  }
  makeTable () {
  	return this.state.board.map((rows, i) => {
  		var singleRow = rows.map((cell, j) => { 
  			return <Piece color = {cell} 
  			clickFn = {this.handlePieceEntry.bind(this)} row = {i} col = {j} /> });
  		return <div className = 'row'>{singleRow}</div>
  	})
  }
  render () {
    return (
    	<div>
    	<div className = 'board'>
    	{ 
    	this.makeTable()
    	}
    	</div>
    	<h1></h1>
    	</div>
    );
  }
}

class Piece extends React.Component {
	constructor(props) {
		super(props);
	}
	clickPiece () {
		var col = this.props.col;
		var row = this.props.row;
		this.props.clickFn(row, col);
	}
	render() {
		return (
			<div className = 'piece' 
			onClick = {this.clickPiece.bind(this)} 
			style = {{'backgroundColor' : this.props.color}}>
			</div>
		)
	}
}

ReactDOM.render(
  <Board/>,
  document.getElementById('app')
);