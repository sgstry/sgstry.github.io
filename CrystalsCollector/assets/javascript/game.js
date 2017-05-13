
$(document).ready(function(){
    var numToGuess = Math.floor(Math.random() * (Math.floor(120) - Math.ceil(19) + 1)) + Math.ceil(19);
    var redNum = Math.floor(Math.random() * (Math.floor(12) - Math.ceil(1) + 1)) + Math.ceil(1);
	var blueNum = Math.floor(Math.random() * (Math.floor(12) - Math.ceil(1) + 1)) + Math.ceil(1);
	var yellowNum = Math.floor(Math.random() * (Math.floor(12) - Math.ceil(1) + 1)) + Math.ceil(1);
	var greenNum = Math.floor(Math.random() * (Math.floor(12) - Math.ceil(1) + 1)) + Math.ceil(1);
	$("#randomNumber").text(numToGuess);
	var score = 0;
	var roundOver = false;
	assignNumbers();

	$("input").on("click", function() {
		if(roundOver) {
			newRound();
		} else {
			var jewelId = this.id;
			var value = this.value;
			score += parseInt(value);
			$("#score").text(score);
			determineStatus();
		}
	});

	function determineStatus() {
		if(score === numToGuess) {
			$("#endRoundMessage").text("Congrats! You win! Click a crystal to play again!");
			addWin();
			roundOver = true;
		} else if(score > numToGuess) {
			$("#endRoundMessage").text("Sorry, you lose! Click a crystal to play again!");
			addLoss();
			roundOver = true;
		}
	}

	function getFirstPart(str) {
    	return str.split(':')[0];
	}

	function getSecondPart(str) {
    	return str.split(':')[1];
	}

	function addWin() {
		var winsText = $("#wins").text();
		var currentWins = parseInt(getSecondPart(winsText).trim())+1;
		var newWins = getFirstPart(winsText) + ": " + currentWins;
		$("#wins").text(newWins);
	};

	function addLoss() {
		var lossText = $("#losses").text();
		var currentLosses = parseInt(getSecondPart(lossText).trim())+1;
		var newLosses = getFirstPart(lossText) + ": " + currentLosses;
		$("#losses").text(newLosses);
	};

	function assignNumbers() {
		$("#redjewel").val(redNum);
		$("#bluejewel").val(blueNum);
		$("#yellowjewel").val(yellowNum);
		$("#greenjewel").val(greenNum);
	};

	function newRound() {
		roundOver = false;
		score = 0;
		numToGuess = Math.floor(Math.random() * (Math.floor(120) - Math.ceil(19) + 1)) + Math.ceil(19);
		redNum = Math.floor(Math.random() * (Math.floor(12) - Math.ceil(1) + 1)) + Math.ceil(1);
		blueNum = Math.floor(Math.random() * (Math.floor(12) - Math.ceil(1) + 1)) + Math.ceil(1);
		yellowNum = Math.floor(Math.random() * (Math.floor(12) - Math.ceil(1) + 1)) + Math.ceil(1);
		greenNum = Math.floor(Math.random() * (Math.floor(12) - Math.ceil(1) + 1)) + Math.ceil(1);
		assignNumbers();
		$("#randomNumber").text(numToGuess);
		$("#endRoundMessage").text("");
		$("#score").text("0");
	}

});
