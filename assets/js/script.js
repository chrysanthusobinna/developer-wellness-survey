$(document).ready(function () {
    let currentQuestionIndex = 0;
    const totalQuestions = $('.question').length;
    const userResponses = Array(totalQuestions).fill(null);

    function displayQuestion(index) {
        $('.question').hide(); // Hide all questions
        $(`#question-${index}`).show(); // Show the current question
        $('#prev-button').prop('disabled', index === 0); // Disable prev button if first question
    }

    $('#next-button').click(function () {
        const selectedResponse = $(`input[name="question-${currentQuestionIndex}"]:checked`);
        if (selectedResponse.length) {
            userResponses[currentQuestionIndex] = selectedResponse.val(); // Save response
            currentQuestionIndex++;
         
            
            if (currentQuestionIndex < (totalQuestions)) {
                displayQuestion(currentQuestionIndex);
            } 
            else
            {
                $('#question-4').hide(); // hide last question
                $('#navigation-buttons').hide(); // hide last question
                displaySummary();
                
                
            }

        
        } else {
            alert("Please select a response before proceeding.");
        }
    });

    $('#prev-button').click(function () {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            displayQuestion(currentQuestionIndex);
        }
    });

    function displaySummary() {
        $('#navigation-buttons').hide(); // Hide navigation buttons
        $('#summary').show(); // Show summary
        $('#summary-content').empty(); // Clear previous content
        
        $('.question').each(function (index) {
            if (userResponses[index]) {
                const questionText = $(this).find('p:first').text();
                $('#summary-content').append(`<p>${questionText}<br><strong>Your response: ${userResponses[index]}</strong></p>`);
            }
        });
        $('#hidden-responses').val(JSON.stringify(userResponses)); // Store responses in hidden input
    }

    $('#final-submit-button').click(function () {
        $('#survey-form').submit(); // Submit the form
    });

    displayQuestion(currentQuestionIndex); // Display the first question
});