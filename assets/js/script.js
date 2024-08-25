$(document).ready(function () {
    const questions = [
        {
            question: "On a scale of 1 to 5, how would you rate your work-life balance? (1 being very poor, 5 being excellent)",
            responses: [1, 2, 3, 4, 5],
            type: 'scale'
        },
        {
            question: "In the past month, how often have you felt overwhelmed or stressed due to work demands?",
            responses: ["Never", "Rarely", "Sometimes", "Often", "Always"],
            type: 'multiple-choice'
        },
        {
            question: "How frequently do you experience feelings of anxiety or depression related to your work?",
            responses: ["Never", "Rarely", "Sometimes", "Often", "Always"],
            type: 'multiple-choice'
        },
        {
            question: "Do you feel you have adequate support from your colleagues and supervisors when facing challenges at work?",
            responses: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
            type: 'multiple-choice'
        },
        {
            question: "Over the past month, how often have you felt disengaged or unmotivated in your work?",
            responses: ["Never", "Rarely", "Sometimes", "Often", "Always"],
            type: 'multiple-choice'
        }
    ];

    let currentQuestionIndex = 0;
    const userResponses = Array(questions.length).fill(null);

    function displayQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        $('#question').text(currentQuestion.question);
        $('#responses').empty();
        
        currentQuestion.responses.forEach((response, index) => {
            const responseElement = $(`<div>
                <input type="radio" name="question-${currentQuestionIndex}" value="${response}" id="response-${currentQuestionIndex}-${index}">
                <label for="response-${currentQuestionIndex}-${index}">${response}</label>
            </div>`);
            $('#responses').append(responseElement);
        });

        $('#question-counter').text(`${currentQuestionIndex + 1}/${questions.length}`);
        $('#prev-button').prop('disabled', currentQuestionIndex === 0);
        $('#next-button').toggle(currentQuestionIndex < questions.length - 1);
        $('#submit-button').toggle(currentQuestionIndex === questions.length - 1);
    }

    $('#next-button').click(function () {
        const selectedResponse = $(`input[name="question-${currentQuestionIndex}"]:checked`);
        if (selectedResponse.length) {
            userResponses[currentQuestionIndex] = selectedResponse.val();
            currentQuestionIndex++;
            displayQuestion();
        } else {
            alert("Please select a response before proceeding.");
        }
    });

    $('#prev-button').click(function () {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            displayQuestion();
        }
    });

    $('#submit-button').click(function () {
        const selectedResponse = $(`input[name="question-${currentQuestionIndex}"]:checked`);
        if (selectedResponse.length) {
            userResponses[currentQuestionIndex] = selectedResponse.val();
            displaySummary();
        } else {
            alert("Please select a response before submitting.");
        }
    });

    function displaySummary() {
        $('#summary').html("<h2>Your Responses</h2>");
        questions.forEach((question, index) => {
            $('#summary').append(`<p>${question.question}<br><strong>Your response: ${userResponses[index]}</strong></p>`);
        });
        $('#question').hide();
        $('#submit-button').hide();
        $('#responses').hide();
        $('#question-counter').hide();
        $('#next-button').hide();
        $('#prev-button').hide();
        $('#summary').show();
        $('#final-submit-button').show();
        
    }

    window.submitSurvey = function () {
        alert("Thank you for your responses!");
        // Here you can handle submission logic, such as sending data to a server
    };

    displayQuestion();
});