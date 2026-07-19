/*==========================================
        VOYAGEAI DASHBOARD
==========================================*/

document.addEventListener("DOMContentLoaded", () => {

    welcomeGreeting();

    animateStats();

    navbarShadow();

    plannerForm();

    notificationButton();

    profileButton();

    weatherAnimation();

});


/*==========================================
        GREETING
==========================================*/

function welcomeGreeting() {

    const heading = document.querySelector(".hero h1");

    const hour = new Date().getHours();

    let greeting = "Good Evening";

    if (hour < 12) {

        greeting = "Good Morning";

    }

    else if (hour < 17) {

        greeting = "Good Afternoon";

    }

    heading.innerHTML = `${greeting}, Manoj 👋`;

}


/*==========================================
        ANIMATED STATS
==========================================*/

function animateStats() {

    const stats = document.querySelectorAll(".stat-card h2");

    stats.forEach((stat) => {

        const text = stat.innerText;

        const number = parseInt(text.replace(/\D/g, ""));

        if (isNaN(number)) return;

        let count = 0;

        const speed = Math.ceil(number / 50);

        const timer = setInterval(() => {

            count += speed;

            if (count >= number) {

                count = number;

                clearInterval(timer);

            }

            if (text.includes("₹")) {

                stat.innerText = `₹${count}K`;

            }

            else {

                stat.innerText = count.toString().padStart(2, "0");

            }

        }, 25);

    });

}


/*==========================================
        NAVBAR SHADOW
==========================================*/

function navbarShadow() {

    window.addEventListener("scroll", () => {

        const navbar = document.querySelector(".navbar");

        if (window.scrollY > 20) {

            navbar.style.boxShadow =
                "0 10px 30px rgba(0,0,0,.35)";

        }

        else {

            navbar.style.boxShadow = "none";

        }

    });

}


/*==========================================
        AI PLANNER FORM
==========================================*/

function plannerForm() {

    const form = document.querySelector(".planner-form");

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        const destination =
            form.querySelector('input[type="text"]').value;

        const start =
            form.querySelectorAll('input[type="date"]')[0].value;

        const end =
            form.querySelectorAll('input[type="date"]')[1].value;

        const budget =
            form.querySelector('input[type="number"]').value;

        if (
            destination === "" ||
            start === "" ||
            end === "" ||
            budget === ""
        ) {

            alert("Please fill all required fields.");

            return;

        }

        const button = document.querySelector(".generate-btn");

        button.innerHTML =
            '<i class="fa-solid fa-spinner fa-spin"></i> Generating...';

        button.disabled = true;

        setTimeout(() => {

            alert("AI Trip Generation will be connected to Flask Backend.");

            button.innerHTML =
                '<i class="fa-solid fa-wand-magic-sparkles"></i> Generate AI Trip';

            button.disabled = false;

        }, 2000);

    });

}


/*==========================================
        NOTIFICATION
==========================================*/

function notificationButton() {

    const bell = document.querySelectorAll(".nav-btn")[0];

    bell.addEventListener("click", () => {

        alert("No new notifications.");

    });

}


/*==========================================
        PROFILE
==========================================*/

function profileButton() {

    const profile = document.querySelector(".profile");

    profile.addEventListener("click", () => {

        window.location.href = "profile.html";

    });

}


/*==========================================
        WEATHER ICON
==========================================*/

function weatherAnimation() {

    const icon = document.querySelector(".weather i");

    setInterval(() => {

        icon.style.transform = "scale(1.15)";

        setTimeout(() => {

            icon.style.transform = "scale(1)";

        }, 500);

    }, 3000);

}


/*==========================================
        RECENT TRIPS BUTTONS
==========================================*/

const tripButtons = document.querySelectorAll(".trip-card button");

tripButtons.forEach((button) => {

    button.addEventListener("click", () => {

        alert("Trip Details page will open here.");

    });

});


/*==========================================
        AI TIPS BUTTON
==========================================*/

const aiButton = document.querySelector(".ai-tips button");

if (aiButton) {

    aiButton.addEventListener("click", () => {

        alert("VoyageAI Assistant Coming Soon!");

    });

}


/*==========================================
        DARK MODE (Coming Soon)
==========================================*/

const moonButton = document.querySelectorAll(".nav-btn")[1];

if (moonButton) {

    moonButton.addEventListener("click", () => {

        alert("Dark / Light Mode Coming Soon!");

    });

}


/*==========================================
        CARD HOVER EFFECT
==========================================*/

const cards = document.querySelectorAll(".card, .stat-card");

cards.forEach((card) => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-8px)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0px)";

    });

});


/*==========================================
        END
==========================================*/