
document.addEventListener("DOMContentLoaded", () => {
    const heroText = document.querySelector(".hero-content");
    const aboutText = document.querySelector(".about-text");
    const aboutImg = document.querySelector(".about-img img");
    const newsletterForm = document.getElementById("newsletter-form");
    const successMessage = document.getElementById("success-message");

    // Smooth Fade-In Effect
    setTimeout(() => {
        heroText.style.opacity = "1";
        heroText.style.transform = "translateY(0)";
    }, 300);

    setTimeout(() => {
        aboutText.style.opacity = "1";
        aboutText.style.transform = "translateX(0)";
    }, 600);

    setTimeout(() => {
        aboutImg.style.opacity = "1";
        aboutImg.style.transform = "translateX(0)";
    }, 900);

    // Handle Newsletter Subscription
    newsletterForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector("input[type='email']");
        
        if (emailInput.value) {
            successMessage.style.display = "block";
            successMessage.classList.add("show");
            emailInput.value = "";
            
            // Hide success message after 3 seconds
            setTimeout(() => {
                successMessage.classList.remove("show");
                setTimeout(() => {
                    successMessage.style.display = "none";
                }, 300);
            }, 3000);
        }
    });
});
