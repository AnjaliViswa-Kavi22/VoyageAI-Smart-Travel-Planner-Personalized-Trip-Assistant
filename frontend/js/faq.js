// ==========================================
// VoyageAI FAQ JavaScript
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // FAQ Accordion
    // ==========================================

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {

        const question = item.querySelector(".faq-question");

        question.addEventListener("click", () => {

            const isActive = item.classList.contains("active");

            faqItems.forEach(faq => {

                faq.classList.remove("active");

            });

            if (!isActive) {

                item.classList.add("active");

            }

        });

        // Keyboard Support

        question.setAttribute("tabindex", "0");

        question.addEventListener("keydown", (e) => {

            if (e.key === "Enter" || e.key === " ") {

                e.preventDefault();

                question.click();

            }

        });

    });

    // ==========================================
    // Search FAQs
    // ==========================================

    const searchInput = document.getElementById("faqSearch");

    if (searchInput) {

        searchInput.addEventListener("keyup", () => {

            const value = searchInput.value.toLowerCase();

            faqItems.forEach(item => {

                const text = item.innerText.toLowerCase();

                item.style.display = text.includes(value)
                    ? "block"
                    : "none";

            });

        });

    }

    // ==========================================
    // Category Buttons
    // ==========================================

    const categoryButtons = document.querySelectorAll(".category-btn");

    categoryButtons.forEach(button => {

        button.addEventListener("click", () => {

            categoryButtons.forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");

            // Future Backend Filter
            console.log("Category:", button.innerText);

        });

    });

    // ==========================================
    // Scroll Reveal
    // ==========================================

    const revealElements = document.querySelectorAll(

        ".faq-item, .support"

    );

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

                observer.unobserve(entry.target);

            }

        });

    }, {

        threshold: 0.15

    });

    revealElements.forEach(element => {

        element.style.opacity = "0";
        element.style.transform = "translateY(40px)";
        element.style.transition = "all .7s ease";

        observer.observe(element);

    });

});