document.addEventListener("DOMContentLoaded", function () {
    const phoneInput = document.getElementById("phone");
    const emailInput = document.getElementById("email");
    const pinInput = document.getElementById("zipcode");
    const cityInput = document.getElementById("city");
    const stateInput = document.getElementById("state");
    const countryInput = document.getElementById("country");
    const orderItemsContainer = document.getElementById("order-items");
    const orderTotalElement = document.getElementById("order-total");
    const proceedButton = document.getElementById("proceedToPayment");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // 1. Populate country dropdown
    fetch("https://restcountries.com/v3.1/all")
        .then(response => response.json())
        .then(data => {
            const countryList = data.map(country => country.name.common).sort();
            countryList.forEach(country => {
                const option = document.createElement("option");
                option.value = country;
                option.textContent = country;
                countryInput.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching country list:', error));

    // 2. Populate states & union territories for India (Editable After Autofill)
    countryInput.addEventListener("change", function () {
        stateInput.innerHTML = '<option value="">Select State</option>';
        
        if (countryInput.value === "India") {
            const indianStatesAndUTs = [
                "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana",
                "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
                "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
                "Uttar Pradesh", "Uttarakhand", "West Bengal",
                // Union Territories
                "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
                "Lakshadweep", "Delhi", "Puducherry", "Ladakh", "Jammu and Kashmir"
            ];

            indianStatesAndUTs.forEach(state => {
                const option = document.createElement("option");
                option.value = state;
                option.textContent = state;
                stateInput.appendChild(option);
            });
        }
        stateInput.disabled = false; // Ensure state remains selectable
    });

    // 3. Auto-fill city and state using PIN Code
    pinInput.addEventListener("blur", function () {
        const pinCode = pinInput.value.trim();
        const errorSpan = pinInput.nextElementSibling;

        if (pinCode.length === 6) {
            fetch(`https://api.postalpincode.in/pincode/${pinCode}`)
                .then(response => response.json())
                .then(data => {
                    if (data[0].Status === "Success") {
                        const place = data[0].PostOffice[0];
                        cityInput.value = place.Name;
                        stateInput.value = place.State;
                        errorSpan.textContent = ""; // Clear error
                    } else {
                        errorSpan.textContent = "Invalid PIN code!";
                        errorSpan.style.color = "red";
                    }
                })
                .catch(error => console.error("Error fetching PIN:", error));
        } else {
            errorSpan.textContent = "PIN code must be 6 digits.";
            errorSpan.style.color = "red";
        }
    });

    // 4. Validate Phone Number
    phoneInput.addEventListener("blur", function () {
        validateInput(phoneInput, /^[6-9]\d{9}$/, "Invalid phone number (Must start with 6-9 and be 10 digits)");
    });

    // 5. Improved Email Validation (Detects Missing '@' and Domain)
    emailInput.addEventListener("input", function () {
        validateInput(
            emailInput,
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Invalid email format (must be in example@domain.com format)"
        );

        // Extra check for missing '@' or '.'
        const emailValue = emailInput.value.trim();
        const errorSpan = emailInput.nextElementSibling;

        if (!emailValue.includes("@") || !emailValue.includes(".")) {
            errorSpan.textContent = "Email must contain '@' and a valid domain.";
            errorSpan.style.color = "red";
        }
    });

    // 6. Generic Validation Function (Errors appear below inputs)
    function validateInput(inputElement, pattern, errorMessage) {
        const errorSpan = inputElement.nextElementSibling;
        if (!pattern.test(inputElement.value.trim())) {
            errorSpan.textContent = errorMessage;
            errorSpan.style.color = "red";
        } else {
            errorSpan.textContent = "";
        }
    }

    // 7. Update Order Summary
    function updateOrderSummary(cartItems) {
        orderItemsContainer.innerHTML = "";
        let total = 0;

        cartItems.forEach(item => {
            const itemRow = document.createElement("div");
            itemRow.classList.add("order-item");

            itemRow.innerHTML = `
                <span class="item-name">${item.name} × ${item.quantity}</span>
                <span class="item-price">₹${(item.price * item.quantity).toFixed(2)}</span>
            `;

            orderItemsContainer.appendChild(itemRow);
            total += item.price * item.quantity;
        });

        // Add Grand Total Row
        const totalRow = document.createElement("div");
        totalRow.classList.add("order-total-row");
        totalRow.innerHTML = `
            <strong>Total</strong>
            <strong>₹${total.toFixed(2)}</strong>
        `;
        orderItemsContainer.appendChild(totalRow);
        orderTotalElement.textContent = total.toFixed(2);
    }

    // 8. Ensure Cart is Not Empty Before Payment
    proceedButton.addEventListener("click", function () {
        const selectedPayment = document.querySelector('input[name="payment-method"]:checked');
        const phoneValid = phoneInput.value.match(/^[6-9]\d{9}$/);
        const emailValid = emailInput.value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
        const pinValid = pinInput.value.match(/^\d{6}$/) && pinInput.nextElementSibling.textContent === "";

        if (cart.length === 0) {
            alert("Your cart is empty. Please add items before proceeding.");
            return;
        }

        if (!phoneValid || !emailValid || !pinValid) {
            alert("Please correct the errors before proceeding.");
            return;
        }

        if (!selectedPayment) {
            alert("Please select a payment method.");
            return;
        }

        // Redirect to payment gateway based on selection
        if (selectedPayment.value === "razorpay") {
            window.location.href = "razorpay-payment.html";
        } else if (selectedPayment.value === "phonepe") {
            window.location.href = "phonepe-payment.html";
        } else {
            window.location.href = "generic-payment.html";
        }
    });

    // Load Cart Items
    updateOrderSummary(cart);
});
