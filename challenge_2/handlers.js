var flatten = function (tallObj) {
	var keyArray = [];
	var valueArray = [];
	var endString = '';
	if(!keyArray[0]){
		for(var key in tallObj) {
			if(key !== 'children') {
				keyArray.push(key);
			}
		}
	}
	var recursiveTraverse = function (obj) {
		var holderArray = [];
		for(var key in obj) {
			if(key !== 'children'){
				holderArray.push(obj[key]);
			}
		}
		valueArray.push(holderArray);
		if(obj.children !== undefined){
			for(var i = 0; i < obj.children.length; i++) {
				recursiveTraverse(obj.children[i]);
			}
		}
	};
	recursiveTraverse(tallObj);
	var makeLine = function (array) {
		var line = '';
		line = array.join(',');
		return line + "\n";
	};
	endString += makeLine(keyArray);
	for(var j = 0; j < valueArray.length; j++) {
		endString += makeLine(valueArray[j]);
	}
	return endString;
};

module.exports = flatten;