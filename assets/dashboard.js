document.addEventListener("DOMContentLoaded", function () {
    const userInfo = JSON.parse(localStorage.getItem("user")) || {
        name: "John Doe",
        email: "johndoe@example.com",
        phone: "9876543210"
    };

    const addressList = JSON.parse(localStorage.getItem("addresses")) || [];

    // Load user info
    document.getElementById("user-name").textContent = userInfo.name;
    document.getElementById("user-email").textContent = userInfo.email;
    document.getElementById("user-phone").textContent = userInfo.phone;

    // Load addresses
    const addressContainer = document.getElementById("address-list");
    function loadAddresses() {
        addressContainer.innerHTML = "";
        addressList.forEach((address, index) => {
            const addressDiv = document.createElement("div");
            addressDiv.classList.add("address");
            addressDiv.innerHTML = `
                <p><strong>${address.name}</strong></p>
                <p>${address.street}, ${address.city}, ${address.state}, ${address.zip}, ${address.country}</p>
                <button class="edit-btn" onclick="editAddress(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteAddress(${index})">Delete</button>
            `;
            addressContainer.appendChild(addressDiv);
        });

        // Save addresses to localStorage
        localStorage.setItem("addresses", JSON.stringify(addressList));
    }

    loadAddresses();

    // Edit User Details
    document.getElementById("editUserBtn").addEventListener("click", function () {
        const newName = prompt("Enter your new name:", userInfo.name);
        const newPhone = prompt("Enter your new phone number:", userInfo.phone);

        if (newName && newPhone) {
            userInfo.name = newName;
            userInfo.phone = newPhone;
            localStorage.setItem("user", JSON.stringify(userInfo));

            document.getElementById("user-name").textContent = userInfo.name;
            document.getElementById("user-phone").textContent = userInfo.phone;
            alert("User details updated successfully!");
        }
    });

    // Function to edit an address
    window.editAddress = function (index) {
        const address = addressList[index];
        const newName = prompt("Name:", address.name);
        const newStreet = prompt("Street:", address.street);
        const newCity = prompt("City:", address.city);
        const newState = prompt("State:", address.state);
        const newZip = prompt("ZIP Code:", address.zip);
        const newCountry = prompt("Country:", address.country);

        if (newName && newStreet && newCity && newState && newZip && newCountry) {
            addressList[index] = { name: newName, street: newStreet, city: newCity, state: newState, zip: newZip, country: newCountry };
            loadAddresses();
        }
    };

    // Function to delete an address
    window.deleteAddress = function (index) {
        if (confirm("Are you sure you want to delete this address?")) {
            addressList.splice(index, 1);
            loadAddresses();
        }
    };
});
