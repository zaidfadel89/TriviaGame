$(document).ready(function() {
  // this is the events
  $('#remaining-time').hide();
  $('#start').on('click', trivia.startGame);
  $(document).on('click', '.option', trivia.guessChecker);
});

var trivia = {
  // this is the properties
  correct: 0,
  incorrect: 0,
  unanswered: 0,
  currentSet: 0,
  timer: 20,
  timerOn: false,
  timerId: '',
  // questions options and answers
  questions: {
    q1: 'Who is actually a chef?',
    q2: 'What does Joey love to eat?',
    q3: 'How many times has Ross been divorced?',
    q4: 'How many types of towels does Monica have?',
    q5: "Who stole Monica's thunder after she got engaged?",
    q6: 'Who hates Thanksgiving?',
    q7: "Who thinks they're always the last to find out everything?"
  },
  options: {
    q1: ['Monica', 'Chandler', 'Rachel', 'Ross'],
    q2: ['Fish', 'Apples', 'Oranges', 'Sandwhiches'],
    q3: ['5', '2', '1', '3'],
    q4: ['3', '8', '11', '6'],
    q5: ['Rachel', 'Phoebe', 'Emily', 'Carol'],
    q6: ['Joey', 'Chandler', 'Rachel', 'Ross'],
    q7: ['Ross', 'Phoebe', 'Monica', 'Chandler']
  },
  answers: {
    q1: 'Monica',
    q2: 'Sandwhiches',
    q3: '3',
    q4: '11',
    q5: 'Rachel',
    q6: 'Chandler',
    q7: 'Phoebe'
  },
  // methods
  startGame: function() {
    // restarting game results
    trivia.currentSet = 0;
    trivia.correct = 0;
    trivia.incorrect = 0;
    trivia.unanswered = 0;
    clearInterval(trivia.timerId);

    // game section
    $('#game').show();

    //  last results
    $('#results').html('');

    //  timer
    $('#timer').text(trivia.timer);

    // to hide start button
    $('#start').hide();

    $('#remaining-time').show();

    // ask first question
    trivia.nextQuestion();
  },
  nextQuestion: function() {
    // set timer to 15 seconds for every Question
    trivia.timer = 15;
    $('#timer').removeClass('last-seconds');
    $('#timer').text(trivia.timer);

    // timer speed
    if (!trivia.timerOn) {
      trivia.timerId = setInterval(trivia.timerRunning, 1000);
    }

    var questionContent = Object.values(trivia.questions)[trivia.currentSet];
    $('#question').text(questionContent);

    var questionOptions = Object.values(trivia.options)[trivia.currentSet];

    // creates all the  guess
    $.each(questionOptions, function(index, key) {
      $('#options').append($('<button class="option">' + key + '</button>'));
    });
  },
  timerRunning: function() {
    if (
      trivia.timer > -1 &&
      trivia.currentSet < Object.keys(trivia.questions).length
    ) {
      $('#timer').text(trivia.timer);
      trivia.timer--;
      if (trivia.timer === 4) {
        $('#timer').addClass('last-seconds');
      }
    }
    // run result
    else if (trivia.timer === -1) {
      trivia.unanswered++;
      trivia.result = false;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 2000);
      $('#results').html(
        '<h3>Out of time! The answer is ' +
          Object.values(trivia.answers)[trivia.currentSet] +
          '</h3>'
      );
    } else if (trivia.currentSet === Object.keys(trivia.questions).length) {
      $('#results').html(
        '<h3>Thank you for playing!</h3>' +
          '<p>Correct: ' +
          trivia.correct +
          '</p>' +
          '<p>Incorrect: ' +
          trivia.incorrect +
          '</p>' +
          '<p>Unaswered: ' +
          trivia.unanswered +
          '</p>' +
          '<p>Please play again!</p>'
      );

      // to hide game sction
      $('#game').hide();

      // to show start button to begin the new game
      $('#start').show();
    }
  },
  guessChecker: function() {
    // setTimeout
    var resultId;

    var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];

    if ($(this).text() === currentAnswer) {
      trivia.correct++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 2000);
      $('#results').html('<h3>Correct</h3>');
    } else {
      trivia.incorrect++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 3000);
      $('#results').html(
        '<h3>incorrect the rigtht answer is ' + currentAnswer + '</h3>'
      );
    }
  },
  guessResult: function() {
    // increment to next question set
    trivia.currentSet++;

    // remove the options and results
    $('.option').remove();
    $('#results h3').remove();

    // begin next question
    trivia.nextQuestion();
  }
};
