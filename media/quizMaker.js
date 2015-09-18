/*
	DOC ET UTILISATION LIGNE 129
*/

function Reponse(reponse, estVraie) {
	this.reponse = reponse;
	this.estVraie = estVraie;
}

function Question(question, reponses) {
	this.question = question;
	this.reponses = reponses;
	shuffle(reponses);

	function shuffle(array) {
	    var counter = array.length, temp, index;
	    while (counter > 0) {
	        index = Math.floor(Math.random() * counter);
	        counter--;
	        temp = array[counter];
	        array[counter] = array[index];
	        array[index] = temp;
	    }
	    return array;
	};
}

function Questionnaire() {
	this.questions = [];

	this.addQuestion = function(q) {
		this.questions.push(q);
	};

	this.addQuestions = function(q) {
		for (var i=0; i < this.questions.length; i++) {
			this.questions.push(q[i]);
		}
	};

	this.drawQuestionnaire = function() {
		$('body').append('<section class="questionnaire" id="-1"></section>');
		$('body').append('<p class="infosQuestionnaire">Nombre de questions : ' + this.questions.length + '</p>');

		for (var i=0; i<this.questions.length; i++) {
			$('body').append(drawQuestion(this.questions[i],i));
		}

		$('body').append('<input type ="button" value="Valider" onclick="verifQuestionnaire()">');
	};

	function drawQuestion(question, id) {
		str = 
			"<section class='question' id='" + id + "''>"
				+ "<h2>Question " + (id+1) + "</h2>" 
				+ "<i>" + question.question + "</i>"
				+ "<section>"
		;
		for(var i=0; i<question.reponses.length; i++) {
			var rep = question.reponses[i];
			if(rep.estVraie) {
				str += "<span><input type='checkbox' id='true' /><p>" + rep.reponse + "</p></span>";
			} else {
				str += "<span><input type='checkbox' id='false' /><p>" + rep.reponse + "</p></span>";
			}
		}
		str += "</section></section>";
		return str;
	}
}

function verifQuestionnaire() {
	var bonnesRep = 0;
	var mauvaisesRep = 0;
	var nonRepondu = 0;

	$(function() {
		$('[class="question"]').each(function() {
			var lesBonnesRep = [];
			var estRatee = false;
			var estReussie = false;

			$('span', this).each(function() {
				var maCase = $('input', this);
				if (maCase.attr('id') == "true") {
					if (maCase.is(':checked')) {
						estReussie = true;
					} else {
						$(this).css('border', '1px solid green');
					}
				} else {
					if (maCase.is(':checked')) {
						estRatee = true;
						$('p', this).css('color', 'red');
					}
				}
			});

			if (estReussie == true) {
				if (estRatee == true) { 
					mauvaisesRep++;
				} else {
					bonnesRep++;
				} 
			} else if (estRatee == true) { 
				mauvaisesRep++;
			} else {
				nonRepondu++;
			}

			for (var i=0; i<lesBonnesRep.length; i++) {
				$('body').append(lesBonnesRep[i]);
			}
		});
	});

	var nbQuestion = $('[class="question"]').length;
	var note = ((bonnesRep-(0.5*mauvaisesRep))/nbQuestion)*20;
	if (note < 0) {
		note = 0;
	}
	$('[class="infosQuestionnaire"]').replaceWith('Nombre de questions : ' + nbQuestion + ' | Répondu : ' + (nbQuestion-nonRepondu) + '/' + nbQuestion + ' | Bonnes réponses : ' + bonnesRep + ' | Mauvaises réponses : ' + mauvaisesRep + ' | Note : ' + note + '/20');
	$('input:button').css('display','none');
}

var q = new Questionnaire();

/*	
	================== [DOCUMENTATION] ==================

	-> AJOUTER UNE QUESTION :
		q.addQuestion(new Question("maQuestion", [new Reponse("maReponse1",false), new Reponse("maReponse2",false), new Reponse("maReponse",true)]));

		-> DOC METHODE addQuestion :
			PARAMETRES :
				- STRING : Corresponds au texte de la question
				- [] type-objet Reponse : Correspond aux Réponses

		-> DOC CLASS Reponse :
			CONSTRUCTION :
				- STRING : Corresponds au texte de la réponse
				- BOOLEAN : Définis si la réponse est bonne ou mauvaise (True = Bonne / False = Mauvaise)

	exemple d'ajout d'une question : 
		q.addQuestion(new Question("1+1 = ?", [new Reponse("1",false), new Reponse("2",true), new Reponse("3",false), new Reponse("3-1",true)]));

	=====================================================

	|										|
	|	ECRIVEZ CI-DESSOUS VOS QUESTIONS 	|
	v 										v
*/



/*
	^										^
	|	ECRIVEZ CI-DESSUS VOS QUESTIONS 	|
	| 										|
*/
q.drawQuestionnaire();