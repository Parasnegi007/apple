document.addEventListener("DOMContentLoaded", function () {
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const otpInput = document.getElementById("otp");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm-password");
    const signupForm = document.getElementById("signupForm");

    const emailError = document.getElementById("emailError");
    const otpError = document.getElementById("otpError");
    const passwordError = document.getElementById("passwordError");

    const sendOtpBtn = document.getElementById("sendOtp");

    // Function to validate password strength
    function validatePassword() {
        const password = passwordInput.value;
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/; // At least 1 uppercase, 1 lowercase, 1 number, min 8 chars

        if (!passwordPattern.test(password)) {
            passwordError.textContent = "Password must contain at least 1 uppercase, 1 lowercase, and 1 number.";
            passwordError.style.color = "red";
        } else {
            passwordError.textContent = ""; // Clear error if valid
        }
    }

    // Function to check if passwords match
    function validateConfirmPassword() {
        if (confirmPasswordInput.value !== passwordInput.value) {
            passwordError.textContent = "Passwords do not match.";
            passwordError.style.color = "red";
        } else {
            passwordError.textContent = "";
        }
    }

    // Event listeners for validation
    passwordInput.addEventListener("input", validatePassword);
    confirmPasswordInput.addEventListener("input", validateConfirmPassword);

    // Mock OTP sending
    sendOtpBtn.addEventListener("click", function () {
        const phoneNumber = phoneInput.value.trim();

        if (!/^[6-9]\d{9}$/.test(phoneNumber)) {
            otpError.textContent = "Enter a valid phone number to receive OTP.";
            otpError.style.color = "red";
            return;
        }

        // Mock OTP generation (random 6-digit number)
        const mockOTP = Math.floor(100000 + Math.random() * 900000).toString();
        localStorage.setItem("mockOTP", mockOTP);

        // Display success message
        otpError.textContent = `OTP sent to ${phoneNumber}. Use ${mockOTP} for testing.`;
        otpError.style.color = "green";
    });

    // Form submission event
    signupForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Verify OTP
        const enteredOtp = otpInput.value.trim();
        const storedOtp = localStorage.getItem("mockOTP");

        if (enteredOtp !== storedOtp) {
            otpError.textContent = "Invalid OTP. Try again.";
            otpError.style.color = "red";
            return;
        }

        // Final validation
        if (passwordError.textContent || otpError.textContent.includes("Enter a valid phone number")) {
            alert("Please fix the errors before submitting.");
            return;
        }

        alert("Signup successful!");
        signupForm.reset(); // Clear form after successful signup
        localStorage.removeItem("mockOTP"); // Clear stored OTP

        // Redirect to login page
        window.location.href = "login.html";
    });
});
