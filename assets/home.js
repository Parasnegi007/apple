document.addEventListener("DOMContentLoaded", function () {
    // Update cart count on Home Page
    const cartCount = document.getElementById("cart-count");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalQuantity;
});

// Shop Now button
function shopNow() {
    alert("Redirecting to shop page...");
}
