/*==========================================
        VOYAGEAI LANDING PAGE
==========================================*/

document.addEventListener("DOMContentLoaded", () => {

    navbarEffect();

    smoothScrolling();

    counterAnimation();

    scrollReveal();

    heroButton();

    aiPreviewButton();

    destinationHover();

});


/*==========================================
        STICKY NAVBAR
==========================================*/

function navbarEffect() {

    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            navbar.style.background = "rgba(17,24,39,.92)";
            navbar.style.backdropFilter = "blur(22px)";
            navbar.style.boxShadow = "0 15px 35px rgba(0,0,0,.30)";

        } else {

            navbar.style.background = "rgba(17,24,39,.72)";
            navbar.style.boxShadow = "none";

        }

    });

}


/*==========================================
        SMOOTH SCROLL
==========================================*/

function smoothScrolling() {

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (e) {

            e.preventDefault();

            const target = document.querySelector(this.getAttribute("href"));

            if (target) {

                target.scrollIntoView({

                    behavior: "smooth"

                });

            }

        });

    });

}


/*==========================================
        HERO COUNTERS
==========================================*/

function counterAnimation() {

    const counters = document.querySelectorAll(".hero-stats h2");

    let started = false;

    window.addEventListener("scroll", () => {

        const hero = document.querySelector(".hero-stats");

        if (!hero) return;

        const position = hero.getBoundingClientRect().top;

        if (position < window.innerHeight - 100 && !started) {

            started = true;

            counters.forEach(counter => {

                animateCounter(counter);

            });

        }

    });

}


function animateCounter(counter) {

    const text = counter.innerText;

    const value = parseInt(text.replace(/\D/g, ""));

    let current = 0;

    const increment = Math.ceil(value / 60);

    const timer = setInterval(() => {

        current += increment;

        if (current >= value) {

            current = value;

            clearInterval(timer);

        }

        if (text.includes("%")) {

            counter.innerText = current + "%";

        }

        else if (text.includes("K")) {

            counter.innerText = current + "K+";

        }

        else {

            counter.innerText = current + "+";

        }

    }, 20);

}


/*==========================================
        SCROLL REVEAL
==========================================*/

function scrollReveal() {

    const sections = document.querySelectorAll(

        ".feature-card,.destination-card,.about-box,.cta,.hero-card"

    );

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";

                entry.target.style.transform = "translateY(0)";

            }

        });

    }, {

        threshold: .2

    });

    sections.forEach(section => {

        section.style.opacity = "0";

        section.style.transform = "translateY(60px)";

        section.style.transition = ".8s ease";

        observer.observe(section);

    });

}


/*==========================================
        START PLANNING BUTTON
==========================================*/

function heroButton() {

    const button = document.querySelector(".primary-btn");

    if (!button) return;

    button.addEventListener("click", (e) => {

        e.preventDefault();

        button.innerHTML =

            '<i class="fa-solid fa-spinner fa-spin"></i> Loading...';

        setTimeout(() => {

            window.location.href = "pages/register.html";

        }, 1200);

    });

}


/*==========================================
        AI PREVIEW BUTTON
==========================================*/

function aiPreviewButton() {

    const btn = document.querySelector(".hero-card button");

    if (!btn) return;

    btn.addEventListener("click", () => {

        btn.innerHTML =

            '<i class="fa-solid fa-spinner fa-spin"></i> Generating...';

        btn.disabled = true;

        setTimeout(() => {

            alert("AI Trip Planner will be connected with Flask + Groq AI.");

            btn.innerHTML = "Generate My Trip";

            btn.disabled = false;

        }, 1800);

    });

}


/*==========================================
        DESTINATION HOVER
==========================================*/

function destinationHover() {

    const cards = document.querySelectorAll(".destination-card");

    cards.forEach(card => {

        card.addEventListener("mousemove", (e) => {

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;

            const y = e.clientY - rect.top;

            card.style.transform =

                `perspective(1000px)
                rotateX(${(y - rect.height / 2) / 30}deg)
                rotateY(${-(x - rect.width / 2) / 30}deg)
                scale(1.03)`;

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform =

                "perspective(1000px) rotateX(0) rotateY(0) scale(1)";

        });

    });

}


/*==========================================
        FEATURE CARD EFFECT
==========================================*/

const features = document.querySelectorAll(".feature-card");

features.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-10px) scale(1.03)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0) scale(1)";

    });

});


/*==========================================
        ABOUT CARD EFFECT
==========================================*/

const aboutCards = document.querySelectorAll(".about-box");

aboutCards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-8px)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0px)";

    });

});


/*==========================================
        CTA BUTTON
==========================================*/

const ctaButton = document.querySelector(".cta a");

if (ctaButton) {

    ctaButton.addEventListener("click", (e) => {

        e.preventDefault();

        window.location.href = "pages/register.html";

    });

}


/*==========================================
        NAVBAR ACTIVE LINK
==========================================*/

const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    document.querySelectorAll("section").forEach(section => {

        const top = window.scrollY;

        const offset = section.offsetTop - 150;

        const height = section.offsetHeight;

        if (top >= offset && top < offset + height) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});
/*==========================================
        HAMBURGER MENU
==========================================*/

const hamburger = document.querySelector(".hamburger");

const navLinks = document.querySelector(".nav-links");

if(hamburger){

    hamburger.addEventListener("click",()=>{

        navLinks.classList.toggle("active");

    });

}

const tryDemo = document.getElementById("tryDemo");

if (tryDemo) {
    tryDemo.addEventListener("click", () => {
        window.location.href = "pages/create-trip.html?mode=demo";
    });
}

/*==========================================
        END
==========================================*/