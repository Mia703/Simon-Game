$(document).ready(function () {
	
	// variables
	let audio; // used to play sound
	let header = $("#level-title"); // changes the header
	let button_list = ["green", "red", "yellow", "blue"]; // the list of buttons
	let history = []; // saves the button order

	let start = false; // indicates when the game has started
	let keyboard_press = false; // indicates that the keyboard has been presed once
	
	// counters
	let lvl_number = 0; // level counter
	let history_index = 0; // loops through the history array

	// the buttons
	const green_btn = $("#green");
	const red_btn = $("#red");
	const yellow_btn = $("#yellow");
	const blue_btn = $("#blue");


	// --------------------- FUNCTIONS ---------------------
	// flashing button animation
	function butonAnimation (button) {
		if (button == 'green') {
			$(green_btn).addClass("pressed");
			setTimeout(function () {
				$(green_btn).removeClass("pressed");
			}, 200);
			playAudio(button);
		}
		else if (button == 'red') {
			$(red_btn).addClass("pressed");
			setTimeout(function () {
				$(red_btn).removeClass("pressed");
			}, 200);
			playAudio(button);
		}
		else if (button == 'yellow') {
			$(yellow_btn).addClass("pressed");
			setTimeout(function () {
				$(yellow_btn).removeClass("pressed");
			}, 200);
			playAudio(button);
		}
		else { // it's the blue button
			$(blue_btn).addClass("pressed");
			setTimeout(function () {
				$(blue_btn).removeClass("pressed");
			}, 200);
			playAudio(button);
		}
	}

	// flashing background animation
	function backgroundAnimation () {
		$("body").css("background-color", "red");
		setTimeout (function() {
			$("body").css("background-color", "#011F3F");
		}, 100);
	}

	// play button sound
	function playAudio (button) {
		if (button == 'green') {
			audio = new Audio ('./sounds/green.mp3');
			audio.play();
		}
		else if (button == 'red') {
			audio = new Audio ('./sounds/red.mp3');
			audio.play();
		}
		else if (button == 'yellow') {
			audio = new Audio ('./sounds/yellow.mp3');
			audio.play();
		}
		else {
			audio = new Audio ('./sounds/blue.mp3');
			audio.play();
		}
	}

	// when the game starts - saves and returns a randomly selected button
	function gameStart() {
		// start the game
		start = true;

		// change header to Level X
		$(header).text("Level " + (lvl_number+1));

		// select a rand index from button list (i.e.: 0 ~ 4)
		let rand_index = Math.floor(Math.random() * button_list.length);

		// get a random colour from the list (i.e.: green, red, yellow, or blue)
		let btn_colour = button_list[rand_index];

		// save the random button to the history list
		history[lvl_number] = btn_colour;
		
		// SHOWS THE ANSWER
		// console.log(history);

		// flash the random button
		butonAnimation(btn_colour);
	}

	// when the game ends -- clears and resets all data
	function gameEnd () {
		start = false;
		keyboard_press = false;

		// change header
		$(header).text("Game Over, Press Any Key to Restart");

		// reset lvl number
		lvl_number = 0;

		// reset history index
		history_index = 0;

		// reset history
		history.length = 0;

		// flash background red
		backgroundAnimation();

		// play wrong sound
		audio = new Audio ('./sounds/wrong.mp3');
		audio.play();
	}

	// checks that on each button click it's in the same order as the history array
	function gameCheck (pressed) {
		// if history has only 1 entry
		if (history.length == 1) {
			// has only 1 entry & the selected is correct
			if (history[history_index] == pressed) {
				// reset the index to zero
				history_index = 0;

				// move to the next level
				lvl_number += 1;

				// start the game
				gameStart();
			}
			// else end game
			else {
				gameEnd();
			}
		}
		// history has more than one entry
		else {
			// has more than one entry & is correct & at the end of the list
			if (history[history_index] == pressed && history_index == (history.length - 1)) {
				// reset index to zero
				history_index = 0;

				// move to next level
				lvl_number += 1;

				// start new game
				gameStart();
			}
			// has more than one entry & is correct & somewhere between the first entry and 2nd-to-last entry
			else if (history[history_index] == pressed && history_index < (history.length - 1)) {
				// move to the next index in history array
				history_index += 1;
			}
			// else has more than one entry & is wrong; end game
			else {
				gameEnd();
			}
		}
	}


	// --------------------- KEYBOARD PRESS ---------------------
	// on any keyboard press
	$(document).on("keypress", function () {
		// if only clicked on keyboard once
		if (!keyboard_press) {
			// update keyboard counter
			keyboard_press = true;

			// on any keyboard press -- saves and returns a random button
			gameStart();
		}
	});


	// --------------------- BUTTON CLICK ---------------------
	// on button click
	$(green_btn).on("click", function () {
		if (!start) {
			butonAnimation("green");
			gameEnd();
		}
		else {
			// butonAnimation("green");
			audio = new Audio ('./sounds/green.mp3');
			audio.play();

			gameCheck("green");
		}
	});

	$(red_btn).on("click", function () {
		if (!start) {
			butonAnimation("red");
			gameEnd();
		}
		else {
			// butonAnimation("red");
			audio = new Audio ('./sounds/red.mp3');
			audio.play();

			gameCheck("red");
		}
	});

	$(yellow_btn).on("click", function () {
		if (!start) {
			butonAnimation("yellow");
			gameEnd();
		}
		else {
			// butonAnimation("yellow");
			audio = new Audio ('./sounds/yellow.mp3');
			audio.play();

			gameCheck("yellow");
		}
	});

	$(blue_btn).on("click", function () {
		if (!start) {
			butonAnimation("blue");
			gameEnd();
		}
		else {
			// butonAnimation("blue");
			audio = new Audio ('./sounds/blue.mp3');
			audio.play();
			gameCheck("blue");
		}
	});

});