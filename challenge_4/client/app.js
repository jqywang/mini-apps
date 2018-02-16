console.log('hey there');
import React from 'react';
import ReactDOM from 'react-dom';
import Numpad from './numpad.js';

var getName = function () {
	var name;
	var alertPrompt = prompt('please enter your name :)');
	if(alertPrompt === null || alertPrompt === ''){
		name = 'dunkle';
	} else {
		name = alertPrompt;
	}
	return name;
}
var roundGenerator = function() {
	var returnValue = [];
	for (var i = 0; i < 22; i++) {
		returnValue[i] = { score: 0, mult: 1 };
	}
	return returnValue;
};

class Bowl extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			currentScore: 0,
			round: 0,
			balls: roundGenerator(),
			index: 0,
			previousScore: '-',
		}
	}
	incrementRound() {
		var nextRound = this.state.round + 1;
		this.setState({
			round: nextRound,
			previousScore: '-',
		});
	}
	calcPoints(num, holderState) {
		var newIndex = this.state.index + 1;
		if(this.state.previousScore === '-') {
			holderState[this.state.index].score += num;
			if(num === 10) {
				this.incrementRound();
				holderState[this.state.index + 1].mult++;
				holderState[this.state.index + 2].mult++;
			} else {
				this.setState({previousScore: num});
			}
		} else {
			if(this.state.previousScore + num > 10) {
				num = 10 - this.state.previousScore;
			}
			if(num + this.state.previousScore === 10) {
				holderState[this.state.index + 1].mult++;
			}
			holderState[this.state.index].score += num;
			this.incrementRound();
		}
		this.setState({
			index: newIndex,
			balls: holderState,
		});
	}
	handleEntry(num) {
		var holderState = this.state.balls.slice();
		if(this.state.round > 11) {
			return;
		}
		if(this.state.round === 10) {
			holderState[this.state.index].mult--;
			holderState[this.state.index + 1].mult-= 2;
			this.extraPoints(num, holderState);
			this.calcScore();
			return
		}
		if(this.state.round > 10) {
			this.extraPoints(num, holderState);
		}
		if(this.state.round < 10) {
			this.calcPoints(num, holderState);
		}
		this.calcScore();
	}
	extraPoints(num, holderState) {
		var newIndex = this.state.index + 1;
		holderState[this.state.index].score = num;
		if(num === 10) {
			holderState[this.state.index + 1].mult++;
		}
		this.incrementRound();
		this.setState({
			index: newIndex,
			balls: holderState,
		});
	}
	calcScore() {
		var totalScore = 0;
		for(var i = 0; i < this.state.balls.length; i++) {
			var lowestMult = this.state.balls[i].mult;
			if(lowestMult < 0) {
				lowestMult = 0;
			}
			totalScore += this.state.balls[i].score * lowestMult;
		}
		this.setState({currentScore: totalScore});
	}
	reset() {
		this.setState({
			currentScore: 0,
			round: 0,
			balls: roundGenerator(),
			index: 0,
			previousScore: '-',
		});
	}
	render() {
		return (
		<div>
			<h3>Lets Bowl Baby</h3>
			<h3>Your Score: {this.state.currentScore}</h3>
			<button onClick = {this.reset.bind(this)}>Reset</button>
			<Numpad numbers = {[0,1,2,3,4,5,6,7,8,9,10]}
				handleEntry = {this.handleEntry.bind(this)}
			/>
		</div>
		)
	}
};


ReactDOM.render(
	<Bowl/>, document.getElementById('app')
);