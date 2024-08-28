/* jshint esversion: 11 */
/* jshint jquery: true */


// Initialize the jQuery UI dialog
$(function() {
    $("#dialog-message").dialog({
        autoOpen: false,
        modal: true,
        buttons: {
            "OK": function() {
                $(this).dialog("close");
            }
        }
    });
});

$(document).ready(function () {
    let currentQuestionIndex = 0; // Initialize the index for the current question
    const totalQuestions = $('.question').length; // Get the total number of questions
    const userResponses = Array(totalQuestions).fill(null); // Create an array to store user responses initialized with null


    // Function to display the question at the specified index
    function displayQuestion(index) {
        $('.question').hide(); // Hide all question elements
        $(`#question-${index}`).show(); // Show the question corresponding to the current index
        $('#prev-button').prop('disabled', index === 0); // Disable the "Previous" button if it's the first question
    }

    // Event listener for the "Next" button click
    $('#next-button').click(function () {
        const selectedResponse = $(`input[name="question-${currentQuestionIndex}"]:checked`); // Get the checked radio button for the current question
        if (selectedResponse.length) { // Check if a response is selected
            userResponses[currentQuestionIndex] = selectedResponse.val(); // Save the selected response in the userResponses array
            currentQuestionIndex++; // Move to the next question
            
            // Check if there are more questions to display
            if (currentQuestionIndex < totalQuestions) {
                displayQuestion(currentQuestionIndex); // Display the next question if available
            } 
            else {
                $('#question-4').hide(); // Hide the last question (assuming there are 5 questions indexed 0-4)
                $('#navigation-buttons').hide(); // Hide navigation buttons on the last question
                displaySummary(); // Call the function to display the summary of responses
            }
        } else {
            //alert("Please select a response before proceeding."); // Alert user if no response is selected
            $("#dialog-message").dialog("open"); // Open the jQuery UI dialog if no response is selected

        }
    });

    // Event listener for the "Previous" button click
    $('#prev-button').click(function () {
        if (currentQuestionIndex > 0) { // Check if there are previous questions
            currentQuestionIndex--; // Decrement the question index to go back
            displayQuestion(currentQuestionIndex); // Display the previous question
        }
    });

    // Function to display a summary of user responses
    function displaySummary() {
        $('#navigation-buttons').hide(); // Hide navigation buttons to prevent further navigation
        $('#summary').show(); // Show the summary section
        $('#summary-content').empty(); // Clear any previously displayed summary content
        
        $('.question').each(function (index) { // Iterate over each question
            if (userResponses[index]) { // Check if there is a recorded response for the question
                const questionText = $(this).find('p:first').text(); // Get the text of the question
                $('#summary-content').append(`<p>${questionText}<br><strong>Your response: ${userResponses[index]}</strong></p>`); // Append question and response to the summary
            }
        });
        $('#hidden-responses').val(JSON.stringify(userResponses)); // Store all responses in a hidden input as a JSON string
    }

    // Event listener for the final submit button click
    $('#final-submit-button').click(function () {
        $('#survey-form').submit(); // Submit the survey form
    });

    displayQuestion(currentQuestionIndex); // Initially display the first question
});