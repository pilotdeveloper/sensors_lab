var currentQuestion=0;
var testMode = false;
var collectResponses = false;
var manualMode = false;
var questionList = [
		{
			question: "How did we first meet?",
			answer: ["Robotics Competition", "Facebook", "Gay Bar", "World of Warcraft"],
			correctAnswer: "b",
			points: 10
		},
		{
			question: "Where was our first kiss?",
			answer: ["Pickup Truck", "High School Bleachers", "Reedy River Park", "World of Warcraft"],
			correctAnswer: "a",
			points: 10
		},
		{
			question: "Where was our second first date?",
			answer: ["Grocery Store", "Rollerskating Rink", "Clemson Dining Hall", "World of Warcraft"],
			correctAnswer: "a",
			points: 10
		},
		{
			question: "What's the farthest we've been apart?",
			answer: ["989 miles", "2842 miles", "3800 miles", "World of Warcraft"],
			correctAnswer: "c",
			points: 10
		},
		{
			question: "What's our favorite game to play together?",
			answer: ["Starcraft", "Hearthstone", "Animal Crossing: New Leaf", "Rec Room"],
			correctAnswer: "d",
			points: 10
		},
		{
			question: "What does Alex always leave all over the apartment?",
			answer: ["Tissues", "A trail of cereal", "Half-empty La Croix cans", "Dirty socks"],
			correctAnswer: "c",
			points: 10
		},
		{
			question: "What does Jalysa always leave in her jeans before they're washed?",
			answer: ["Pencils", "Tissues", "Receipts", "Nothing, because she is perfect."],
			correctAnswer: "b",
			points: 10
		},
		{
			question: "How many blankets are on our bed at all times?",
			answer: ["1", "2", "3", "None, because the apartment is kept at reasonable temperature."],
			correctAnswer: "c",
			points: 10
		},
		{
			question: "Where did we go ghosthunting together?",
			answer: ["Graveyard", "General Store", "Abandoned Church", "Plantation House"],
			correctAnswer: "a",
			points: 10
		},
		{
			question: "As of today, how long have we been together?",
			answer: ["2 weeks", "2 hours", "6 years", "7 years"],
			correctAnswer: "d",
			points: 10
		},
		{
			question: "Where was our second first kiss?",
			answer: ["The lake", "Flat Rock", "Pretty Place", "We haven't kissed since 2008"],
			correctAnswer: "a",
			points: 10
		},
		{
			question: "What is our song?",
			answer: ["Forever by Chris Brown", "Inspiration by Chicago", "All-Star by Smash Mouth", "Faithfully by Journey"],
			correctAnswer: "d",
			points: 10
		},
		{
			question: "Where did Alex propose to Jalysa?",
			answer: ["Kishi Bashi NYE concert", "Creed NYE concert", "Universal Orlando's Harry Potter World", "Pickens County BP Gas Station"],
			correctAnswer: "a",
			points: 10
		},
		{
			question: "What did Alex bet Jalysa couldn't do while in Clemson?",
			answer: ["Pass all Comp Sci classes with an A", "Cuddle with him for 5 minutes", "Eat a teaspoon of garlic", "Get into art school and achieve her dreams"],
			correctAnswer: "b",
			points: 10
		},
		{
			question: "What is Jalysa's signature dish?",
			answer: ["Eggs and rice", "Cereal", "Eggo waffles", "Banana muffins"],
			correctAnswer: "d",
			points: 10
		},
		{
			question: "What is Alex's signature dish?",
			answer: ["Revenge served cold", "Beef stew", "Pulled pork", "Mac 'n Cheesey"],
			correctAnswer: "c",
			points: 10
		},
		{
			question: "Which wi-fi network is not ours?",
			answer: ["Hyrule", "Lowrule", "FuckComcast", "FuckComcastHard"],
			correctAnswer: "b",
			points: 10
		},
		{
			question: "How many mild packets does Alex take every time we go to Taco Bell?",
			answer: ["1 handful", "2 handfuls", "3 per taco", "None.  He avoids being wastful and cares deeply for the environment."],
			correctAnswer: "c",
			points: 10
		},
		{
			question: "What does Jalysa always steal from Alex's Taco Bell order?",
			answer: ["Quesorito", "Crunchwrap Supreme", "Empanada", "2 handfuls of mild packets"],
			correctAnswer: "a",
			points: 10
		},
		{
			question: "What are our terms of endearment for each other?",
			answer: ["Honeybunny and Fart Nugget", "Kitty and Boo", "Babe and Babe", "Sugah Bayuh and Punkin"],
			correctAnswer: "b",
			points: 10
		},
		{
			question: "What are the names of our Build-A-Bears?",
			answer: ["Alexica and Jalysica", "Michel and Jesse", "Mikey and JC", "Kittycakes and Boocakes"],
			correctAnswer: "c",
			points: 10
		},
		{
			question: "Why are we together?",
			answer: ["It takes 2 to summon LORD JARAXXUS, EREDAR LORD OF THE BURNING LEGION!!", "We are studying each other to understand the human equation", "Our collective height is 11 feet 7 inches", "We kinda like each other"],
			correctAnswer: "d",
			points: 10
		}	
];



var tableStates=["0", "0", "0", "0", "0", "0", "0"];
	


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

