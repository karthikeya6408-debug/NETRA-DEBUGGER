// Basic form submission message for demonstration
const form = document.getElementById("registration-form");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    if (form.checkValidity()) {
        document.getElementById("form-message").textContent =
            "Thank you! Your registration form has been submitted.";
        form.reset();
    }
});
