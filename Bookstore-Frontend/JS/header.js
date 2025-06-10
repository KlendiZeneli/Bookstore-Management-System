// fetch('/HTML/header.html')
//     .then(response => response.text())
//     .then(data => {
//         // Inject the fetched HTML into the DOM
//         document.getElementById('header').innerHTML = data;

//         // Now that the header is loaded, attach event listeners
//         const searchInput = document.getElementById('search-input');
//         const searchButton = document.getElementById('search-button');
//         const mobileMenuButton = document.querySelector('.mobile-menu-button');
//         const mobileMenu = document.querySelector('.mobile-menu');
//         const mobileSearchInput = document.querySelector('.mobile-search-input');
//         const mobileSearchButton = document.querySelector('.mobile-search-button');
//         const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

//         if (searchButton && searchInput) {
//             searchButton.addEventListener('click', function () {
//                 console.log("searching");
//                 performSearch(searchInput.value);
//             });

//             searchInput.addEventListener('keypress', function (e) {
//                 if (e.key === 'Enter') {
//                     console.log("searching");
//                     performSearch(searchInput.value);
//                 }
//             });
//         } else {
//             console.error("Search elements not found in the header.");
//         }

//         // Add other event listeners as needed
//         if (mobileMenuButton && mobileMenu) {
//             mobileMenuButton.addEventListener('click', function () {
//                 mobileMenu.classList.toggle('open');
//             });
//         }

//         /* Dropdown functionality */
//     dropdownToggles.forEach(toggle => {
//         toggle.addEventListener('click', function () {
//             const dropdownMenu = this.nextElementSibling;
//             if (mobileMenu.classList.contains('active')) {
//                 // For mobile menu
//                 dropdownMenu.classList.toggle('active');
//             } else {
//                 // For desktop menu
//                 const isOpen = dropdownMenu.style.display === 'block';
//                 closeAllDropdowns();
//                 if (!isOpen) {
//                     dropdownMenu.style.display = 'block';
//                 }
//             }
//         });
//     });

//     })
//     .catch(error => {
//         console.error("Error loading header:", error);
//     });

// document.addEventListener('DOMContentLoaded', function () {
//     console.log("DOM fully loaded");
// });


//     function performSearch(query) {
//         if (query) {
//             query = query.trim();
//             // Redirect to results page with the search query
//             window.location.href = `results.html?query=${encodeURIComponent(query)}`;
//         }
//     }

    
fetch('/HTML/header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header').innerHTML = data;

        // Add event listeners for search after the header is injected
        const searchInput = document.getElementById('search-input');
        const searchButton = document.getElementById('search-button');

        if (searchButton && searchInput) {
            searchButton.addEventListener('click', () => {
                performSearchRedirect(searchInput.value);
            });

            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    performSearchRedirect(searchInput.value);
                }
            });
        }

        createModal();
        const profileIcon = document.querySelector('#profile'); // Adjust this as needed
        if (profileIcon) {
    profileIcon.addEventListener('click', showModal);
}

    })
    .catch(error => console.error('Error loading header:', error));


    (function () {
        d = document;
        s = d.createElement("script");
        s.src = "https://webagent.ai/api/chatbot/92208e6b-e6d1-4edc-a393-b6eb462c477c";
        s.async = 1;
        d.getElementsByTagName("head")[0].appendChild(s);
    })();

/**
 * 
 * Redirect to the results page with the search query.
 * @param {string} query - The search query.
 */
function performSearchRedirect(query) {
    if (query) {
        query = query;
        window.location.href = `results.html?query=${encodeURIComponent(query)}`;
    }
}

// Function to create and show the login modal
function showModal() {
    // Check if modal already exists
    if (!document.querySelector('.modal-backdrop')) {
        createModal();  // Only create modal once
    }

    // Show modal and backdrop
    document.querySelector('.modal-backdrop').style.display = 'block';
    document.querySelector('.modal-container').style.display = 'block';
}

// Function to create modal structure and logic
function createModal() {
    const modalBackdrop = document.createElement('div');
    modalBackdrop.classList.add('modal-backdrop');

    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal-container');

    modalContainer.innerHTML = `
        <span class="close-btn">&times;</span>
        <h3>Login</h3>
        <form id="loginForm">
            <input type="text" id="loginEmail" placeholder="Email" required>
            <input type="password" id="loginPassword" placeholder="Password" required>
            <button type="submit">Login</button>
            <p>Don't have an account? <span class="switch-link" onclick="showRegisterForm()">Register here</span></p>
        </form>
    `;

    // Add event listeners
    modalBackdrop.addEventListener('click', closeModal);
    modalContainer.querySelector('.close-btn').addEventListener('click', closeModal);

    // Append modal to body
    document.body.appendChild(modalBackdrop);
    document.body.appendChild(modalContainer);

    // Handle form submission
    document.getElementById('loginForm').addEventListener('submit', function (e) {
        e.preventDefault();
        handleLogin();
    });
}

// Function to switch to the registration form
function showRegisterForm() {
    const modalContainer = document.querySelector('.modal-container');
    modalContainer.innerHTML = `
        <span class="close-btn">&times;</span>
        <h3>Register</h3>
        <form id="registerForm">
            <input type="text" id="registerName" placeholder="Full Name" required>
            <input type="email" id="registerEmail" placeholder="Email" required>
            <input type="password" id="registerPassword" placeholder="Password" required>
            <input type="password" id="confirmPassword" placeholder="Confirm Password" required>
            <button type="submit">Register</button>
            <p>Already have an account? <span class="switch-link" onclick="showLoginForm()">Login here</span></p>
        </form>
    `;

    // Add event listeners for new form
    document.querySelector('.close-btn').addEventListener('click', closeModal);
    document.getElementById('registerForm').addEventListener('submit', function (e) {
        e.preventDefault();
        handleRegister();
    });
}

// Function to switch back to the login form
function showLoginForm() {
    const modalContainer = document.querySelector('.modal-container');
    modalContainer.innerHTML = `
        <span class="close-btn">&times;</span>
        <h3>Login</h3>
        <form id="loginForm">
            <input type="email" id="loginEmail" placeholder="Email" required>
            <input type="password" id="loginPassword" placeholder="Password" required>
            <button type="submit">Login</button>
            <p>Don't have an account? <span class="switch-link" onclick="showRegisterForm()">Register here</span></p>
        </form>
    `;

    // Add event listeners for new form
    document.querySelector('.close-btn').addEventListener('click', closeModal);
    document.getElementById('loginForm').addEventListener('submit', function (e) {
        e.preventDefault();
        handleLogin();
    });
}

// Function to close modal
function closeModal() {
    const modalBackdrop = document.querySelector('.modal-backdrop');
    const modalContainer = document.querySelector('.modal-container');
    if (modalBackdrop) modalBackdrop.style.display = 'none';
    if (modalContainer) modalContainer.style.display = 'none';
    modalBackdrop.remove();
    modalContainer.remove();
}

// Handle login form submission
// Function to handle login form submission
async function handleLogin() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const loginData = {
        identifier: email,  // Send email or username (identifier)
        password: password,
        rememberMe: false  // Optional: Handle if you want to implement "Remember Me"
    };

    try {
        const response = await fetch('https://localhost:7221/api/Auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });

        const data = await response.json();

        if (response.ok) {
            alert('Login Successful!');
            closeModal();  // Close the modal after successful login
        } else {
            alert(data || 'Login failed!');
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred during login.');
    }
}

// Handle registration form submission
function handleRegister() {
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    console.log('Registering with:', name, email, password);
    alert('Registration Successful!');
    closeModal();
}

