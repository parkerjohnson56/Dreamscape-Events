"use strict";
//packages section


// Product object info
const packages = {
  starter: {
    name: "Starter Tier",
    price: "Starting at $3,500",
    description: "Perfect for intimate gatherings like birthdays, showers, or small parties. Includes expert planning and décor setup to make your event magical.",
    includes: [
      "Basic décor setup (fairy lights, table settings, and balloons).",
      "Catering coordination for light snacks or desserts (venue fees not included).",
      "Pre-selected playlist for ambiance.",
      "On-site event assistant for 4 hours.",
    ],
    image: "images/starter-tier.jpeg",
  },
  premium: {
    name: "Premium Tier",
    price: "Starting at $8,000",
    description: `Designed for weddings, anniversaries, or milestone events, this package offers seamless planning and premium touches to make your day unforgettable.`,
    includes: [
      "Full event décor with premium floral arrangements.",
      "Catering service setup for up to 50 guests (cost not included).",
      "Venue selection and booking assistance (venue fees not included).",
      "Professional photographer for 2 hours.",
  ,
    ],
    image: "images/premium-tier.jpeg",
  },
  luxury: {
    name: "Luxury Tier",
    price: "Starting at $15,000",
    description: "Designed for grand events, this package includes exclusive planning, luxury décor, and premium services to create a truly memorable experience.",
    includes: [
      "Exclusive luxury décor with premium floral arrangements.",
      "Full catering coordination for up to 100 guests (cost not included).",
      "VIP event assistant for 8 hours.",
      "Professional photographer and videographer for 4 hours.",
      "Custom lighting design and premium sound setup.",
    ],
    image: "images/luxury-tier.jpeg",
  },
};

// DOM Elements
const packageName = document.querySelector("#package-content h3");
const packageImage = document.querySelector("#package-content img");
const packageDescription = document.querySelector("#package-content p");
const packageIncludes = document.querySelector("#package-content ul");
const packageButtons = document.querySelectorAll(".package-buttons button");

// Function to display the selected package
function displayPackage(tier) {
    const selectedPackage = packages[tier];

    // Update the package name, image, and alt text
    packageName.textContent = selectedPackage.name;
    packageImage.src = selectedPackage.image;
    packageImage.alt = selectedPackage.name;

    // Update the price and main description
    const productDescription = document.querySelector("#product-description");
    productDescription.innerHTML = `<strong>Price:</strong> ${selectedPackage.price}`;

    // Update the additional details
    const productDetails = document.querySelector("#product-details");
    productDetails.textContent = selectedPackage.description;

    // Clear and update the includes list
    packageIncludes.innerHTML = ""; // Clear existing list items
    selectedPackage.includes.forEach((item) => {
        const listItem = document.createElement("li");
        listItem.textContent = item;
        packageIncludes.appendChild(listItem);
    });
}


//Fortune teller game

// Select DOM elements
const guessInput = document.getElementById("guess-input");
const guessButton = document.getElementById("guess-btn");
const userNumberSpan = document.getElementById("user-number");
const fortuneNumberSpan = document.getElementById("fortune-number");
const fortuneOutput = document.querySelector("#fortune-output strong"); // Correctly select the <strong> element

// Example fortune messages
const fortunes = [
  "The starter tier package is in your future!",
  "The premium tier package is in your future.",
  "The luxury tier package is in your future.",
  "I see a celebration in your future",
  "Good news will be received soon",
  "The stars say you have a magical event in your future."
];

// Function to generate a random number between 1 and 10
function generateRandomNumber() {
  return Math.floor(Math.random() * 10) + 1;
}

// Function to display the fortune message
function displayFortune(userGuess, fortuneNumber) {
  // Update displayed numbers
  userNumberSpan.textContent = userGuess;
  fortuneNumberSpan.textContent = fortuneNumber;

  // Check if the user's guess matches the fortune number
  if (userGuess === fortuneNumber) {
    // Display a random magic fortune if the guess is correct
    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    fortuneOutput.textContent = `Fortune: ${randomFortune}`;
    fortuneOutput.style.color = "#ffcb59"; 
  } else {
    // Ask the user to try again
    fortuneOutput.textContent = "Sorry, the future is cloudy. Try again!";
    fortuneOutput.style.color = "#bd0000"; 
  }
}

// Event listener for the "Guess" button
guessButton.addEventListener("click", () => {
  const userGuess = parseInt(guessInput.value); // Get the user's input
  if (isNaN(userGuess) || userGuess < 1 || userGuess > 10) {
    fortuneOutput.textContent = "Please enter a number between 1 and 10.";
    fortuneOutput.style.color = "#d098e3"; 
    return;
  }

  const fortuneNumber = generateRandomNumber(); // Generate a random fortune number
  displayFortune(userGuess, fortuneNumber); // Display the result
});


//Form validation and user information storing

// Select form and inputs
const form = document.querySelector("#booking-right form");
const firstNameInput = document.getElementById("first-name");
const lastNameInput = document.getElementById("last-name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const packageInput = document.getElementById("package");
const messageInput = document.getElementById("message");
const contactPhone = document.getElementById("contact-phone");
const contactEmail = document.getElementById("contact-email");


// Add an event listener for form submission
form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default form submission
    let isValid = true; // Flag to check if all validations pass
    const errorMessages = {}; // Object to store error messages

    // Validate first and last name
    if (!firstNameInput.value.trim()) {
        isValid = false;
        errorMessages.firstName = "First name is required.";
    }
    if (!lastNameInput.value.trim()) {
        isValid = false;
        errorMessages.lastName = "Last name is required.";
    }

    // Validate email using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value)) {
        isValid = false;
        errorMessages.email = "Please enter a valid email address.";
    }

    // Validate phone using regex (optional but only if contact method is phone)
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/; // Format: 123-456-7890
    if (contactPhone.checked && (!phoneInput.value.trim() || !phoneRegex.test(phoneInput.value))) {
        isValid = false;
        errorMessages.phone = "Please enter a valid phone number (format: 123-456-7890).";
    }

    // Ensure a contact method is selected
    if (!contactPhone.checked && !contactEmail.checked) {
        isValid = false;
        errorMessages.contactMethod = "Please select a preferred contact method.";
    }

    // Validate message field
    if (!messageInput.value.trim()) {
        isValid = false;
        errorMessages.message = "Please enter a message.";
    }

    // Display error messages if validation fails
    displayErrors(errorMessages);

    // If the form is valid, create the customer object
    if (isValid) {
        const customer = {
            firstName: firstNameInput.value.trim(),
            lastName: lastNameInput.value.trim(),
            email: emailInput.value.trim(),
            phone: phoneInput.value.trim(),
            package: packageInput.value,
            contactMethod: contactPhone.checked ? "Phone" : "Email",
            message: messageInput.value.trim(),
        };

        // Reset the form
        form.reset();

        // Show a success message
        displaySuccess(customer);
    }
});

// Function to display error messages
function displayErrors(errors) {
    // Clear previous error messages
    document.querySelectorAll(".error-message").forEach((el) => el.remove());

    // Append error messages next to each input
    if (errors.firstName) {
        showError(firstNameInput, errors.firstName);
    }
    if (errors.lastName) {
        showError(lastNameInput, errors.lastName);
    }
    if (errors.email) {
        showError(emailInput, errors.email);
    }
    if (errors.phone) {
        showError(phoneInput, errors.phone);
    }
    if (errors.contactMethod) {
        const contactMethodGroup = document.querySelector(".radio-group");
        showError(contactMethodGroup, errors.contactMethod);
    }
    if (errors.message) {
        showError(messageInput, errors.message);
    }
}

// Function to display success message
function displaySuccess(customer) {
    const successMessage = document.createElement("p");
    successMessage.textContent = `Thank you, ${customer.firstName} ${customer.lastName}! We have received your message and will contact you via ${customer.contactMethod}.`;
    successMessage.style.color = "white";
    form.appendChild(successMessage);
}

// Helper function to show error message next to an element
function showError(inputElement, message) {
    const errorElement = document.createElement("span");
    errorElement.textContent = message;
    errorElement.classList.add("error-message");

    inputElement.insertAdjacentElement("afterend", errorElement);
}


//Dark mode section

const themeToggleButton = document.getElementById("theme-toggle");
const body = document.body;

// Toggle dark mode
themeToggleButton.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    // Update button text based on mode
    if (body.classList.contains("dark-mode")) {
        themeToggleButton.textContent = "Light Mode";
    } else {
        themeToggleButton.textContent = "Dark Mode";
    }
});