console.log("Script is running");

document.addEventListener("DOMContentLoaded", () => {
    // Navbar and section references
    const navbar = document.getElementById("navbar");
    const navLinks = document.querySelectorAll("#navbar ul li a");
    const navbarH1 = navbar.querySelector("h1"); // Navbar-specific H1
    const sections = document.querySelectorAll("section, .third-section"); // Include third-section in sections

    // Fade-in elements for page load (navbar and sections)
    const fadeElements = document.querySelectorAll(".content, #navbar, section"); // All sections and navbar

    // Initial fade-in setup for navbar and sections
    fadeElements.forEach((el) => {
        el.style.opacity = 0; // Start hidden
        el.style.transition = "opacity 1.5s ease"; // Smooth fade effect
    });

    // Function to trigger fade-in effect when page is loaded
    const triggerFadeInOnLoad = () => {
        fadeElements.forEach((el) => {
            el.style.opacity = 1; // Make visible
        });
    };

    // Trigger fade-in after a slight delay
    setTimeout(triggerFadeInOnLoad, 200); // Adjust delay for the fade-in effect to start

    // Add fade-in setup for sections (on scroll)
    sections.forEach((section) => {
        section.style.opacity = 0; // Initially hidden
        section.style.transition = "opacity 1.5s ease"; // Smooth fade effect
    });

    // Scroll event handler for navbar and dynamic fade-ins
    document.addEventListener("scroll", () => {
        let navbarColor = "transparent"; // Default navbar background color for the video section
        let navTextColor = "#F0E095"; // Default navbar text color for the video section
        let navbarH1Color = ""; // Default Navbar H1 text color (navbar-specific H1)

        sections.forEach((section) => {
            const rect = section.getBoundingClientRect();

            // Check if the section is in the viewport
            if (rect.top <= 50 && rect.bottom >= 50) {
                if (section.classList.contains("new-section")) {
                    navbarColor = "#F1EBDB"; // Background color for Section 1
                    navTextColor = "#824D2E"; // Text color for navbar in Section 1
                    navbarH1Color = "#824D2E"; // Navbar H1 text color for Section 1
                } else if (section.classList.contains("new-section-alternate")) {
                    navbarColor = "#7CBAC6"; // Background color for Section 2
                    navTextColor = "#F1EBDB"; // Text color for navbar in Section 2
                    navbarH1Color = "#F1EBDB"; // Navbar H1 text color for Section 2
                } else if (section.classList.contains("third-section")) {
                    navbarColor = "#F1EBDB"; // Background color for Section 3
                    navTextColor = "#824D2E"; // Text color for navbar in Section 3
                    navbarH1Color = "#824D2E"; // Navbar H1 text color for Section 3
                } else if (section.classList.contains("order-section")) {
                    navbarColor = "#F1EBDB"; // Background color for Section 3
                    navTextColor = "#824D2E"; // Text color for navbar in Section 3
                    navbarH1Color = "#824D2E"; // Navbar H1 text color for Section 3
                }
            }

            // Fade in sections when they enter the viewport
            if (rect.top <= window.innerHeight * 0.9 && rect.bottom >= 0) {
                section.style.opacity = 1; // Make section visible
            }
        });

        // Apply the navbar background color
        navbar.style.backgroundColor = navbarColor;

        // Update navbar text color
        navLinks.forEach((link) => {
            link.style.color = navTextColor;
        });

        // Update only the navbar H1 text color
        if (navbarH1) {
            navbarH1.style.color = navbarH1Color; // Change Navbar H1 color
        }
    });
});

// JavaScript for navigating through the questions
let currentQuestionIndex = 0;
const questions = document.querySelectorAll('.question');
const submitBtn = document.getElementById('submitBtn');
const navigation = document.querySelector('.navigation');

// Function to show the current question and hide others
function showQuestion(index) {
    // Hide all questions
    questions.forEach((question, i) => {
        question.style.display = i === index ? 'block' : 'none';
    });

    // Show/hide the next/prev buttons
    if (index === 0) {
        navigation.innerHTML = ''; // Hide previous button on first question
    } else {
        const prevBtn = document.createElement("button");
        prevBtn.textContent = "← Back";
        prevBtn.id = "prevBtn";
        prevBtn.setAttribute("onclick", "navigate(-1)");
        navigation.appendChild(prevBtn);
    }

    if (index === questions.length - 1) {
        const submitBtn = document.createElement("button");
        submitBtn.textContent = "Submit Order";
        submitBtn.id = "submitBtn";
        submitBtn.setAttribute("onclick", "submitOrder()");
        navigation.appendChild(submitBtn);
    } else {
        const nextBtn = document.createElement("button");
        nextBtn.textContent = "Next →";
        nextBtn.id = "nextBtn";
        nextBtn.setAttribute("onclick", "navigate(1)");
        navigation.appendChild(nextBtn);
    }
}

// Function to navigate through the questions
function navigate(step) {
    currentQuestionIndex += step;
    if (currentQuestionIndex < 0) currentQuestionIndex = 0;
    if (currentQuestionIndex >= questions.length) currentQuestionIndex = questions.length - 1;
    showQuestion(currentQuestionIndex);
}

// Function to handle form submission
function submitOrder() {
    alert('Your order has been submitted!');
}

// Initial question display
showQuestion(currentQuestionIndex);

// Optional: Form submission handler
document.getElementById('orderForm').addEventListener('submit', function (e) {
    e.preventDefault();
    submitOrder();
});

// JavaScript to handle the "Next" button functionality
document.getElementById("next-btn").addEventListener("click", function () {
    const formContent = document.getElementById("form-content");

    // Replace the current question with the next one
    formContent.innerHTML = `
        <div class="question">
            <label for="order-quantity">How many would you like to order?</label>
            <input type="number" id="order-quantity" min="1" placeholder="Enter quantity" />
        </div>
    `;

    // Update the button for the next step (if needed)
    this.innerText = "Submit";
    this.onclick = function () {
        alert("Order submitted! Thank you.");
    };
});
document.addEventListener("wheel", (event) => {
    window.scrollBy(0, event.deltaY);  // Scroll based on mouse wheel input
});

document.addEventListener("touchmove", (event) => {
    window.scrollBy(0, event.changedTouches[0].clientY);  // Scroll based on touch input
});


