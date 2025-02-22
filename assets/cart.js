document.addEventListener("DOMContentLoaded", function () {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartCount = document.getElementById("cart-count");
    const checkoutBtn = document.getElementById("checkout-btn");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function updateCartCount() {
        let totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalQuantity;
    }

    function updateCartDisplay() {
        cartItemsContainer.innerHTML = "";
        let totalPrice = 0;

        cart.forEach((item, index) => {
            totalPrice += item.price * item.quantity;
            let cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-info">
                    <h3>${item.name}</h3>
                    <p>Price: ₹${item.price.toFixed(2)}</p>
                    <div class="quantity-control">
                        <button class="decrease" data-index="${index}">-</button>
                        <span>${item.quantity}</span>
                        <button class="increase" data-index="${index}">+</button>
                    </div>
                    <button class="remove" data-index="${index}">Remove</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        cartTotal.textContent = totalPrice.toFixed(2);

        // Disable checkout button if cart is empty
        if (cart.length === 0) {
            checkoutBtn.disabled = true;
            checkoutBtn.style.opacity = "0.5";
            checkoutBtn.style.cursor = "not-allowed";
        } else {
            checkoutBtn.disabled = false;
            checkoutBtn.style.opacity = "1";
            checkoutBtn.style.cursor = "pointer";
        }
    }

    cartItemsContainer.addEventListener("click", function (event) {
        let index = event.target.getAttribute("data-index");
        if (index === null) return;
        index = parseInt(index);

        if (event.target.classList.contains("increase")) {
            cart[index].quantity++;
        } else if (event.target.classList.contains("decrease")) {
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
            } else {
                cart.splice(index, 1);
            }
        } else if (event.target.classList.contains("remove")) {
            cart.splice(index, 1);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        updateCartDisplay();
    });

    // Prevent checkout if cart is empty
    checkoutBtn.addEventListener("click", function (event) {
        if (cart.length === 0) {
            alert("Your cart is empty! Please add items before proceeding to checkout.");
            event.preventDefault(); // Stop the button from redirecting
        }
    });

    updateCartCount();
    updateCartDisplay();
});
