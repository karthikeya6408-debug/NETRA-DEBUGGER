// Get the appointment form and the message area
const appointmentForm = document.getElementById("appointmentForm");
const formMessage = document.getElementById("formMessage");
const appointmentDate = document.getElementById("appointmentDate");

// Do not allow the user to choose a date in the past
const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, "0");
const day = String(today.getDate()).padStart(2, "0");

appointmentDate.min = `${year}-${month}-${day}`;

// This function runs when the form is submitted
appointmentForm.addEventListener("submit", function (event) {
    // Stop the browser from refreshing the page
    event.preventDefault();

    // Check the built-in HTML form validation
    if (!appointmentForm.checkValidity()) {
        appointmentForm.reportValidity();
        return;
    }

    // Show a confirmation message
    formMessage.textContent =
        "Your appointment request has been submitted successfully.";

    // Clear the form after submission
    appointmentForm.reset();

    // Set the minimum date again after resetting the form
    appointmentDate.min = `${year}-${month}-${day}`;
});
