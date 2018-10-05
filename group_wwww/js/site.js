var currentQuestion=0;
var testMode = false;
var collectResponses = false;
var manualMode = false;
var questionList = [
		{
			question: "What does Harold hide?",
			answer: ["Cheese", "The Gain", "The Pain", "White Castle Hamburgers"],
			correctAnswer: "c",
			points: 10
		},
		{
			question: "What is the name of the famous IBM chess computer?",
			answer: ["Deep Blue", "Deep Red", "Deep Down", "The Deepening"],
			correctAnswer: "a",
			points: 10
		},
		{
			question: "What is the name of the little horsey in chess?",
			answer: ["Night", "Warhorse", "Rainbow Dash", "Knight"],
			correctAnswer: "d",
			points: 10
		},
		{
			question: "What is the coffee-based name of a certain programming language?",
			answer: ["Espresso++", "Java", "Mocha Frappucino Script", "C--"],
			correctAnswer: "b",
			points: 10
		},
		{
			question: "How do you respond to haters?",
			answer: ["Talk it out", "Seek help from a counselor", "Write your feelings down", "Dab on them all"],
			correctAnswer: "d",
			points: 10
		},
		{
			question: "What is the best coffee shop?",
			answer: ["Tim Horton's", "Starbucks", "McCafe", "Dunkin'"],
			correctAnswer: "c",
			points: 10
		},
		{
			question: "What is a remote-controlled flying quad-copter called?",
			answer: ["Roto-copter", "Drone", "Plane", "Birb"],
			correctAnswer: "b",
			points: 10
		},
		{
			question: "Who is the current chess world champion?",
			answer: ["Alexander Kelly", "Brett Simonds", "Magnus Carlsen", "The Deepening"],
			correctAnswer: "c",
			points: 10
		},
		{
			question: "What is the shape of the earth?",
			answer: ["Spherical", "Hexagonal", "Disk", "Square"],
			correctAnswer: "a",
			points: 10
		},
		{
			question: "Who was the host of the TV show The Joy of Painting?",
			answer: ["Mister Rogers", "Harold", "The Rob Boss", "Bob Ross"],
			correctAnswer: "d",
			points: 10
		},
		{
			question: "Who owns the Krusty Krab?",
			answer: ["Eugene Krabs", "The Krab Man", "Stan Krabs", "Krabicles"],
			correctAnswer: "a",
			points: 10
		},
		{
			question: "What is the name of Oracle's database backup utility?",
			answer: ["AMAN", "TMAN", "A LITERAL MAN", "RMAN"],
			correctAnswer: "d",
			points: 10
		},
		{
			question: "Who founded Microsoft alongside Bill Gates?",
			answer: ["Paul Allen", "Allen Paul", "The Paulsons", "Allen Rench"],
			correctAnswer: "a",
			points: 10
		},
		{
			question: "When was Microsoft founded?",
			answer: ["2018", "1975", "1982", "1983"],
			correctAnswer: "b",
			points: 10
		},
		{
			question: "Which of these names is not a Pac-Man ghost?",
			answer: ["Blinky", "Clyde", "Inky", "Tricksy"],
			correctAnswer: "d",
			points: 10
		},
		{
			question: "What is the name of Link's horse?",
			answer: ["Soup", "Ebola", "Epona", "Equina"],
			correctAnswer: "c",
			points: 10
		},
		{
			question: "Nintendo's Mario had a different name, what was it?",
			answer: ["Jumperson", "Jumpman", "Barrel Boy", "Plumber"],
			correctAnswer: "b",
			points: 10
		},
		{
			question: "What is the name of the Vader-style villain from Space Balls?",
			answer: ["Evil Guy", "Big Head", "Dark Helmet", "Voldemort"],
			correctAnswer: "c",
			points: 10
		},
		{
			question: "Who was the recurring villain throughout the Matrix series?",
			answer: ["Agent Smith", "Neo", "Morpheus", "Agent Neo"],
			correctAnswer: "a",
			points: 10
		},
		{
			question: "In Star Wars, who ordered the creation of the clone army?",
			answer: ["Obi-Wan", "Sifo-Dyas", "Anakin", "Mace Windu"],
			correctAnswer: "b",
			points: 10
		},
		{
			question: "Which one of these is not an AI?",
			answer: ["Siri", "Bixby", "Jalysa", "Cortana"],
			correctAnswer: "c",
			points: 10
		},
		{
			question: "In gaming, what is the name of the treasure chest shaped enemy?",
			answer: ["Lord Jaraxxus", "Dabloon", "Box of Bad", "Mimic"],
			correctAnswer: "d",
			points: 10
		}	
];



var tableStates=["0", "0", "0", "0", "0", "0", "0","0", "0", "0", "0", "0", "0", "0","0", "0", "0", "0", "0", "0", "0","0", "0", "0", "0", "0", "0", "0","0", "0", "0", "0", "0", "0", "0","0", "0", "0", "0", "0", "0", "0","0", "0", "0", "0", "0", "0", "0","0"];
	


$("#clearAnswers").on("click", function(){
	//hideAnswers();
});

$("#collectAnswers").on("click", function(){
	var correct = 	$("#correctAnswer").val();
	highlightCorrectAnswers(correct);
});

$("#startQuiz").on("click", function(){
	$(".ard").each(function(){
		$(this).css("background-color", "red");
		$(this).css("color", "red");
	});	
});


$(".ard").on("DOMSubtreeModified", function(){
	if (!collectResponses)
		return;
	var state = $(this).data("state");
			//$(this).css("background-color", "green");
	if ($(this).text() == 0)
		return;
	var name = $(this).attr('id');
	//tableOneName
	var resp = $(this).text().split(',',2);
	$(this).val(resp[0]);
	$("#" + name + "Name").text(resp[1]);
	
	
	//$("#pressedBlessed").text("." + name + "Response");
	if ($(this).val() == $("." + name ).val()){	
				//$(this).css("background-color", "yellow");
		return;	
	} else {	
		$("." + name + "Response").css("background-color", "yellow");
		$("." + name + "Response").css("color","yellow");
		if(testMode){
					$("." + name + "Response").css("background-color", "black");

			$("." + name + "Response").css("color","white");
		}
		$("." + name + "Response").text(resp[0]);
	}
		});
//	$(".ard").each(function(){$(this).updateValue().css("background-color", "red").css("color", "red")});




function hideAnswers(){
	$(".ard").each(function(){
		$(this).css("background-color", "red");
		$(this).css("color", "red");
	});	
}

function showAnswers(){
	$(".ard").each(function(){
		$(this).css("background-color", "white");
		$(this).css("color", "black");
		var name = $(this).attr('id');
		$("." + name + "Response").css("background-color", "yellow");
		$("." + name + "Response").css("color","yellow");
		$("." + name + "Response").text($(this).text());
		
	});	
}

function highlightCorrectAnswers(ans){
	
	collectResponses = false;
		$(".answerBlock").each(function(){
			if ($(this).data("answer") == ans){
				$(this).css("background-color", "#D4AF37");
				$(this).find('*').css("color","white");
			}
		});

	if (!manualMode){
		
		$(".ard").each(function(){
			var name = $(this).attr('id');
			if($(this).text().split(',',2)[0] == ans){
				$(this).updateValue().css("background-color", "green").css("color", "black");
					$("." + name + "Response").css("background-color", "green");
					$("." + name + "Response").css("color","white");
					$("." + name + "Score").text(parseInt($("." + name + "Score").text()) + 1);
					$("." + name + "Response").text($(this).text().split(',',2)[0]);
			}else{
				$(this).updateValue().css("background-color", "red").css("color", "black");		
					$("." + name + "Response").css("background-color", "red");
					$("." + name + "Response").css("color","white");
					$("." + name + "Response").text($(this).text().split(',',2)[0]);
			}			
		});	
		$("#correctAnswer").val("");

	} else {
			$(".tableResponse").each(function(){
			var name = $(this).data('id');
			if($(this).val() == ans){
				$(this).css("background-color", "green").css("color", "black");
					$(this).css("background-color", "green");
					$(this).css("color","white");
					$("." + name + "Score").text(parseInt($("." + name + "Score").text()) + 1);
					//$("." + name + "Response").text($(this).val());
			}else{
				$(this).css("background-color", "red").css("color", "black");		
					$(this).css("background-color", "red");
					$(this).css("color","white");
					//$("." + name + "Response").text($(this).val());
			}			
		});	
		
		
	}
}
$("#manualLayout").on("click", function(){
	
	$("#answersGrid").empty().append('<h2 class="col-2 offset-1">Answers:</h2><input type="text" class="tableResponse tableOneInput col-1" data-id="tableOne"></input><input type="text" data-id="tableTwo" class="tableResponse tableTwoInput col-1"></input><input type="text" class="tableResponse tableThreeInput col-1" data-id="tableThree"></input><input type="text" data-id="tableFour" class="tableResponse tableFourInput col-1"></input><input data-id="tableFive" type="text" class="tableResponse tableFiveInput col-1"></input><input data-id="tableSix" type="text" class="tableResponse tableSixInput col-1"></input><input data-id="tableSeven" type="text" class="tableResponse tableSevenInput col-1"></input>');
	manualMode = true;
	
});
 

$("#showQuestion").on("click", function(){
	populateQuestionAndAnswer();
});

function populateQuestionAndAnswer(){
		if (collectResponses)
			return;
	if($("#testMode").prop('checked')){
		$("#question").empty().append("LOREN IPSUM SOMETHING");
	
		$("#answer-choice-a").empty().append("A GOOD CHOICE");
		$("#answer-choice-b").empty().append("A BAD CHOICE");
		$("#answer-choice-c").empty().append("WHO IS LOREN REALLY");
		$("#answer-choice-d").empty().append("HI LOREN");
		$("#correctAnswer").val("e");
		
		collectResponses = true;
		
		testMode=true;
		return;
	};
	
	testMode = false;
	
	
	var newQuestion = questionList[currentQuestion];
	currentQuestion++;
	
	
	if (currentQuestion >questionList.length){
		$(".answer-label").each(function(){$(this).empty()});
		$(".answer-text").each(function(){$(this).empty()});
		
		var winnerName = "";
		var winnerScore = 0;
		
		$(".score").each(function(){
			
			if (parseInt($(this).text()) > winnerScore){
				winnerName = $("#"+$(this).data("table")).text();
				winnerScore =  parseInt($(this).text());
			}
			//$(this).empty()}	
	}
		);
		
		
		
		$("#answerGrid").empty().append("<center><h1>Congratulations to team " + winnerName + " with " + winnerScore + " points</h1></center>");

		$("#question").empty().append("Final Results");
		
		collectResponses = true;
		
		//$("#answer-choice-a").empty().append();
		//$("#answer-choice-b").empty().append();
		//$("#answer-choice-c").empty().append();
		//$("#answer-choice-d").empty().append();
		
	}else{
	
		$(".answerBlock").each(function(){
				//if ($(this).data("answer") == ans){
					$(this).css("background-color", "");
					//$(this).removeProperty("background-color");
					$(this).find('*').css("color","#D4AF37");

				//}
		});
	
	$("#question").empty().append(newQuestion.question);
	
	$("#answer-choice-a").empty().append(newQuestion.answer[0]);
	$("#answer-choice-b").empty().append(newQuestion.answer[1]);
	$("#answer-choice-c").empty().append(newQuestion.answer[2]);
	$("#answer-choice-d").empty().append(newQuestion.answer[3]);
	$("#correctAnswer").val(newQuestion.correctAnswer);
	//currentQuestion++;
	
	collectResponses = true;
	
	//resets the boxes
	$(".ard").each(function(){$(this).updateValue()});
	$(".tableResponse").each(function(){$(this).css("background-color", "red").css("color", "red")});
	$(".tableResponse").each(function(){$(this).text("")});
	}
}


  $(function() {
    $('#testMode').bootstrapToggle();
  })

