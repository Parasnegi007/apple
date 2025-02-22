document.addEventListener("DOMContentLoaded", function () {
    // Update cart count from localStorage
    const cartCount = document.getElementById("cart-count");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalQuantity;

    // Image Modal Functionality
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const closeModalBtn = document.querySelector(".modal .close");

    function openModal(imgElement) {
        modal.style.display = "flex"; // Open modal only when an image is clicked
        modalImg.src = imgElement.src;
    }

    function closeModal() {
        modal.style.display = "none"; // Ensure modal closes properly
    }

    // Attach event listeners to all gallery images
    document.querySelectorAll(".gallery img").forEach(img => {
        img.addEventListener("click", function () {
            openModal(this);
        });
    });

    // Close modal when clicking the close button
    closeModalBtn.addEventListener("click", closeModal);

    // Close modal when clicking outside the image
    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Close modal with Esc key
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeModal();
        }
    });
});
