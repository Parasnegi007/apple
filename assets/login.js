// login.js

document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const emailPhoneInput = document.getElementById("email-phone");
    const passwordInput = document.getElementById("password");
    const emailPhoneError = document.getElementById("email-phone-error");
    const passwordError = document.getElementById("password-error");

    loginForm.addEventListener("submit", function (event) {
        let valid = true;
        const emailPhoneValue = emailPhoneInput.value.trim();
        const passwordValue = passwordInput.value.trim();

        // Validate Email or Phone
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const phoneRegex = /^[6-9]\d{9}$/;

        if (!emailRegex.test(emailPhoneValue) && !phoneRegex.test(emailPhoneValue)) {
            emailPhoneError.textContent = "Enter a valid email (example@mail.com) or phone number (10 digits)";
            emailPhoneError.style.color = "red";
            valid = false;
        } else {
            emailPhoneError.textContent = "";
        }

        // Validate Password (Minimum 6 characters, at least one letter and one number)
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

        if (!passwordRegex.test(passwordValue)) {
            passwordError.textContent = "Password must be at least 6 characters with letters & numbers";
            passwordError.style.color = "red";
            valid = false;
        } else {
            passwordError.textContent = "";
        }

        if (!valid) {
            event.preventDefault(); // Prevent form submission if validation fails
        }
    });
});
