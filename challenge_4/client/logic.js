var shrekable = function() {
	var returnValue = [];
	for (var i = 0; i < 21; i++) {
		returnValue[i] = { score: 0, mult: 1 };
	}
	return returnValue;
};
class CheckBowl {
	constructor() {
		this.currentScore = 0;
		this.round = 0;
		this.balls = shrekable();
		this.index = 0;
		this.previousScore = '-';
	}
	incrementRound() {
		this.round = this.round + 1;
		this.previousScore = '-';
	}
	calcPoints(num) {
	  console.log(this.round);
		if (this.previousScore === '-') {
			// if '-' prevscore, meaning first round
			this.balls[this.index].score += num;
			if (num === 10) {
				// if strike
				this.incrementRound();
				this.balls[this.index + 1].mult++;
				this.balls[this.index + 2].mult++;
			} else {
				this.previousScore = num;
			}
		} else {
			//if second round
			if (this.previousScore + num > 10) {
				// if over 10, set to 10
				num = 10 - this.previousScore;
			}
			if (num + this.previousScore === 10) {
				// if spare
				this.balls[this.index + 1].mult++;
			}
			this.balls[this.index].score += num;
			this.incrementRound();
		}
		this.index = this.index + 1;
	}
	handleEntry(num) {
		if (this.round > 11) {
			return;
		}
		if (this.round > 9) {
			this.balls[this.index].mult--;
			this.balls[this.index + 1].mult--;
			this.extraPoints(num);
			return;
		}
		if (this.round < 10) {
			this.calcPoints(num);
		}
	}
	extraPoints(num) {
	  console.log('extra');
		this.balls[this.index].score = num;
		if (num === 10) {
			this.balls[this.index + 1].mult++;
		}
		this.incrementRound();
		this.index = this.index + 1;
	}
	calcScore() {
		var totalScore = 0;
		for (var i = 0; i < this.balls.length; i++) {
			totalScore += this.balls[i].score * this.balls[i].mult;
		}
		return totalScore;
	}
}