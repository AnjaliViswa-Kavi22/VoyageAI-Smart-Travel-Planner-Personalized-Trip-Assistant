// ==========================================
// VoyageAI About Page JavaScript
// ==========================================

// Wait until page loads
document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // Smooth Scroll
    // ==========================================

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth"

            });

        });

    });

    // ==========================================
    // Counter Animation
    // ==========================================

    const counters = document.querySelectorAll(".stat h2");

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;

            const text = counter.innerText;

            let target = parseInt(text.replace(/\D/g, ""));

            let suffix = text.replace(/[0-9]/g, "");

            let current = 0;

            let increment = Math.ceil(target / 100);

            const updateCounter = () => {

                current += increment;

                if (current >= target) {

                    counter.innerText = target + suffix;

                } else {

                    counter.innerText = current + suffix;

                    requestAnimationFrame(updateCounter);

                }

            };

            updateCounter();

            observer.unobserve(counter);

        });

    }, {

        threshold: 0.5

    });

    counters.forEach(counter => observer.observe(counter));

    // ==========================================
    // Scroll Reveal Animation
    // ==========================================

    const sections = document.querySelectorAll(
        ".about-content, .card, .feature-card, .tech-grid span, .stat, .cta"
    );

    const revealObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

                revealObserver.unobserve(entry.target);

            }

        });

    }, {

        threshold: 0.15

    });

    sections.forEach(section => {

        section.style.opacity = "0";
        section.style.transform = "translateY(40px)";
        section.style.transition = "all .8s ease";

        revealObserver.observe(section);

    });

    // ==========================================
    // Navbar Shadow on Scroll
    // ==========================================

    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 20) {

            navbar.style.boxShadow = "0 8px 25px rgba(0,0,0,.12)";

        } else {

            navbar.style.boxShadow = "0 5px 20px rgba(0,0,0,.05)";

        }

    });

    // ==========================================
    // CTA Button Hover Effect
    // ==========================================

    const button = document.querySelector(".cta .btn");

    if (button) {

        button.addEventListener("mouseenter", () => {

            button.style.transform = "translateY(-4px) scale(1.05)";

        });

        button.addEventListener("mouseleave", () => {

            button.style.transform = "translateY(0) scale(1)";

        });

    }

});