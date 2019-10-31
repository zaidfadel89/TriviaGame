// hi i deside not to get anything from google or youtube
$(document).ready(function() {
  var options = [
    {
      question:
        'Pupusas, handmade thick stuffed corn tortillas, are a traditional dish from what country?',
      choice: ['Ethiopia', 'El Salvadore', 'Peru', 'Guatamala'],
      answer: 'El Salvadore',
      photo: 'assets/images/pupusas.jpg',
      name: 'q01'
    },
    {
      question: 'Kopi luwak is a very expensive type of what?',
      choice: ['Spice', 'Caviar', 'Coffee', 'Rice variety'],
      answer: 'Coffee',
      photo: 'assets/images/coffee.gif',
      name: 'q02'
    },
    {
      question:
        'What popular soda beverage was originally developed as a mixer for whiskey?',
      choice: ['Mountain Dew', 'Sprite', '7-UP', 'Coke'],
      answer: 'Mountain Dew',
      photo: 'assets/images/mtdew.gif',
      name: 'q03'
    }
  ];
  var correctCount = 1;
  var wrongCount = 0;
  var unanswerCount = 0;
  var timer = 25;
  var intervalId;
  var userGuess = '';
  var running = false;
  var qCount = options.length;
  var pick;
  var index = 0;
  var newArray = [];
  //maybe an extra step you dont need
  var holder = [];
  $('#submit').hide();
  $('#reset').hide();
  // now we start game to start the game
  $('#start').on('click', function() {
    $('#start').hide();
    $('#submit').show();

    $('#correctCount').show;

    $(document).on('click', '#submit', function() {
      // alert($(`input[name=${pick.name}]:checked`).val());
      $('#timers').text(runTimer);
      var userSelection = $(`input[name=${pick.name}]:checked`).val();
      console.log('userSelection' + userSelection);
      // console.log(pick);
      if (userSelection == pick.answer) {
        // alert('correct');
        if (correct) {
          $('#correct').append('correct');
          $(correct).empty();
        }
        $('#correct').append(' you have ' + correctCount + ' Correct answer ');
        correctCount++;

        index++;
        displayQuestion();
        console.log('correct: ' + correctCount);
      } else {
        $('#wrongCount').empty();

        wrongCount++;
        // alert('Incorrect');
        $('#wrongCount').append(
          'you have ' + wrongCount + ' uncorrect answer '
        );
        index++;
        displayQuestion();
      }
    });
    runTimer();
    for (var i = 0; i < options.length; i++) {}
    displayQuestion();
  });

  // timer start
  function runTimer() {
    if (!running) {
      clearInterval(intervalId);
      intervalId = setInterval(decrement, 1000);
      running = true;
    }
  }

  // time countdown
  function decrement() {
    $('#timeleft').html('Time remaining to end the game' + timer);
    timer--;

    if (timer === 0) {
      alert('Game Over');
      correctCount++;

      clearInterval(intervalId);
      wrongCount++;
      stop('');

      // $('#answerblock').html(
      //   '<p>Time is up! The correct answer is: ' + pick.choice[1] + '</p>'
      // );

      alert(
        `you have ${correctCount} correct answers and you have ${wrongCount} wrong answers`
      );
    }
  }
  //randomly pick question in array
  function displayQuestion() {
    //generate random index in array
    index = Math.floor(Math.random() * options.length);
    pick = options[index];
    // pick = options[0];
    console.log(pick);

    var newQuestion = $('<form>');

    $('#answerblock').html(newQuestion);

    $('#questionblock').html('<h2>' + pick.question + '</h2>');
    for (var i = 0; i < pick.choice.length; i++) {
      userGuess = $('<div>');
      newQuestion.append(
        `<input type="radio" name="${pick.name}" value="${pick.choice[i]}">${pick.choice[i]}`
      );

      // userChoice.addClass('answerchoice');
      // userChoice.html(pick.choice[i]);
      //assign array position to it so can check answer
      // userChoice.attr('data-guessvalue', pick.choice[i]);
      // $(newQuestion).append(userChoice);
    }

    $('#answerblock').append(newQuestion);
  }
  function reset() {
    $('#reset').on('click', function() {
      // reset all variables and counts
      correctCount = 0;
      wrongCount = 0;
      score = 0;
      timer = 25;
      i = 0;
    });
  }
});
