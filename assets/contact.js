document.addEventListener("DOMContentLoaded", function () {
    // Sync cart count with other pages
    const cartCount = document.getElementById("cart-count");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalQuantity;

    // FAQ Toggle Effect
    const faqQuestions = document.querySelectorAll(".faq-question");
    
    faqQuestions.forEach(question => {
        question.addEventListener("click", function () {
            const answer = this.nextElementSibling;
            if (answer.style.display === "block") {
                answer.style.display = "none";
            } else {
                answer.style.display = "block";
            }
        });
    });

    // Query form submission
    document.getElementById("submitQuery").addEventListener("click", function () {
        const queryInput = document.getElementById("query");
        const userQuery = queryInput.value.trim();

        if (userQuery === "") {
            alert("Please enter a question before submitting.");
            return;
        }

        // Sending query via Formspree
        fetch("https://formspree.io/f/YOUR_FORM_ID", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question: userQuery, email: "your-email@gmail.com" })
        }).then(response => {
            if (response.ok) {
                alert("Your query has been submitted successfully!");
                queryInput.value = "";
            } else {
                alert("Failed to submit query. Please try again later.");
            }
        });
    });

    // Contact form submission
    document.getElementById("contactForm").addEventListener("submit", function (event) {
        event.preventDefault();
        const formData = new FormData(this);

        fetch("https://formspree.io/f/YOUR_FORM_ID", {
            method: "POST",
            body: formData
        }).then(response => {
            if (response.ok) {
                alert("Your message has been sent successfully!");
                this.reset();
            } else {
                alert("Failed to send message. Please try again later.");
            }
        });
    });
});