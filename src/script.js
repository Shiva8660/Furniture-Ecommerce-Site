document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    const showRegister = document.getElementById("show-register");
    const showLogin = document.getElementById("show-login");
    const formTitle = document.getElementById("form-title");

    // Toggle Forms
    showRegister.addEventListener("click", () => {
        loginForm.classList.add("hidden");
        registerForm.classList.remove("hidden");
        formTitle.textContent = "Register";
    });

    showLogin.addEventListener("click", () => {
        registerForm.classList.add("hidden");
        loginForm.classList.remove("hidden");
        formTitle.textContent = "Login";
    });

    // Register User
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("register-name").value;
        const email = document.getElementById("register-email").value;
        const password = document.getElementById("register-password").value;

        if (name && email && password) {
            localStorage.setItem("userEmail", email);
            localStorage.setItem("userPassword", password); // ⚠ Not secure!
            alert("Registration Successful! Please login.");
            registerForm.classList.add("hidden");
            loginForm.classList.remove("hidden");
            formTitle.textContent = "Login";
        } else {
            alert("All fields are required.");
        }
    });

    // Login User
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;
        
        // Get stored credentials
        const storedEmail = localStorage.getItem("userEmail");
        const storedPassword = localStorage.getItem("userPassword");

        if (email === storedEmail && password === storedPassword) {
            alert("Login Successful!");
            window.location.href = "homepage.html"; // Redirect to homepage
        } else {
            alert("Invalid email or password.");
        }
    });
});
