var game = {

		wins: 0,

		guesses: 15,

		blank_array: [],

		array_of_used_letters: [],

		changing_guesses: "<p style='font-size: 30px'>Guesses left: </p>",

		array_of_words: ["robben","messi","ronaldo","payet","cuauhtemoc","crouch"],

		words_used: [],

		abc: ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],


		random_index: 
			function(){
				return Math.floor(Math.random() * (this.array_of_words.length));
			},

		word_chooser: 
			function(){
				return this.array_of_words[this.random_index()];
			},

		blank_space_filler: 
			function(word,array){

			 	for(var i = 0; i < word.length; i++){
			 		array.push(" _ ");
				}
			 	return array;
		 	},

		contains: 
			function(a, obj) {
			    for (var i = 0; i < a.length; i++) {
			        if (a[i] === obj) {
			            return true;
			        }
			    }
			    return false;
			}

	}

	var chosen_word = game.word_chooser();

	// need  to print a " _ " for each letter of the word chosen

	var blank_word = game.blank_space_filler(chosen_word,game.blank_array);

	document.querySelector("#current_word").innerHTML = blank_word.join("");

 	// print how many guesses the user has since the beginning

	document.querySelector("#guesses_remaining_title").innerHTML = game.changing_guesses;


	document.querySelector("#guesses_remaining_number").innerHTML = game.guesses;

	document.onkeypress = function(event) {

		var valid_letter = String.fromCharCode(event.keyCode).toLowerCase();

		if(game.contains(game.abc,valid_letter)){

			document.querySelector(".startPrompt").innerHTML = "Keep Pressing those letters!";

			console.log(String.fromCharCode(event.keyCode));

			var key_up = {

				changing_word: blank_word,

				user_guess: valid_letter,

				letter_title: "<p style='font-size: 30px'>You have already used: </p>",

				print_wins: function(){document.querySelector("#wins").innerHTML = "Wins: " + game.wins},
				print_letters_used: function(){document.querySelector("#letters_used").innerHTML = game.array_of_used_letters.join(", ")},
				print_blank_word: function(){document.querySelector("#current_word").innerHTML = blank_word.join("")},
				print_guesses_number: function(){document.querySelector("#guesses_remaining_number").innerHTML = game.guesses},

				boo: new Audio("boo.mp3"),

				cheer: new Audio("win.mp3")

			}

			// check if the letter typed by the user is in the chosen word

			// if it is not and that letter has not been picked before, just update letters used and number of guesses available


			if(game.contains(game.array_of_used_letters,key_up.user_guess) !== true){
				game.array_of_used_letters.push(key_up.user_guess);
				game.guesses = game.guesses - 1;
			}

			// if it is, then put the letter in its corresponding space 
		
			if(game.contains(chosen_word,key_up.user_guess)){
				for(var i = 0; i < chosen_word.length; i++)  {

					if(chosen_word[i] === key_up.user_guess){
					key_up.changing_word[i] = " " + key_up.user_guess + " ";
					document.querySelector("#current_word").innerHTML = key_up.changing_word.join("");
					}

				}
					
			}
			
			// update game and print guesses, letters used, etc

			key_up.print_guesses_number();

			document.querySelector("#letters_used_title").innerHTML = key_up.letter_title;

			key_up.print_letters_used();

			// game is won when there are no more spaces to fill. We reset everything and choose a new word

			if(game.contains(key_up.changing_word," _ ") === false){

				alert("you won!!! You guessed: " + chosen_word);
				
				// if word was guessed, it goes into the "words_used" array so it does not get repeated

				game.words_used.push(chosen_word);

				game.wins = game.wins +1;

				//game ends when the user guesses all 6 words

				if(game.wins === 6){
					alert("You went through all the words!! game will restart");
					game.words_used = [];
					game.wins = 0;
					document.querySelector(".startPrompt").innerHTML = "Press Any Key To Get Started!";
				}

				// we display the image of the soccer player whose name was guessed

				document.querySelector("#image_win").innerHTML = "<img class='col-xs-12' src='assets/images/" + chosen_word + ".jpg' + alt=" + chosen_word + ">";


				chosen_word = game.word_chooser();

				while(game.contains(game.words_used,chosen_word)){
					chosen_word = game.word_chooser();
				}

				console.log(game.words_used);

				// for next word we reset guesses, array to put " _ ", array with used letters, and create a new "blank_word" (a string with "_" instead of the chosen word's letters)

				game.guesses = 15;

				game.blank_array = [];

				game.array_of_used_letters = [];

				blank_word = game.blank_space_filler(chosen_word,game.blank_array);

				// print updated wins, letters used, new blank word and number of guesses

				key_up.print_wins();
				key_up.print_letters_used();
				key_up.print_blank_word();
				key_up.print_guesses_number();

				// play cheering audio
				key_up.cheer.play();

			}

			// if user runs out of guesses

			if(game.guesses === 0){

				alert("you lost!!!");

				chosen_word = game.word_chooser();

				while(game.contains(game.words_used,chosen_word)){
					chosen_word = game.word_chooser();
				}

				// for next word we reset guesses, array to put " _ ", array with used letters, and create a new "blank_word" (a string with "_" instead of the chosen word's letters)
				
				game.guesses = 15;

				game.blank_array = [];

				game.array_of_used_letters = [];

				blank_word = game.blank_space_filler(chosen_word,game.blank_array);
				
				key_up.print_letters_used();
				key_up.print_blank_word();
				key_up.print_guesses_number();
				
				// play loser's audio
				key_up.boo.play();


			}

		}

	}