document.addEventListener("DOMContentLoaded", function () {
    const cartCount = document.getElementById("cart-count");
    const addToCartButtons = document.querySelectorAll(".add-to-cart");

    // Load cart from localStorage or initialize an empty array
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Function to update cart count display
    function updateCartCount() {
        let totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalQuantity;
        localStorage.setItem("cartCount", totalQuantity); // Save count globally
    }

    // Load saved cart count when the page loads
    updateCartCount();

    // Add event listener to all "Add to Cart" buttons
    addToCartButtons.forEach(button => {
        button.addEventListener("click", function () {
            let productElement = this.closest(".product");
            let name = productElement.querySelector("h3").textContent;
            let price = parseFloat(productElement.querySelector(".price").textContent.replace("₹", ""));
            let image = productElement.querySelector("img").src;

            // Check if item already exists in cart
            let existingProduct = cart.find(item => item.name === name);
            if (existingProduct) {
                existingProduct.quantity++; // Increase quantity
            } else {
                cart.push({ name, price, image, quantity: 1 }); // Add new product
            }

            // Save updated cart and update UI
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartCount();
        });
    });
});
