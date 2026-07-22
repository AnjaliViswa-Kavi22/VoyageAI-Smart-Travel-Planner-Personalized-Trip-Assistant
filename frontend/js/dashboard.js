/*==========================================
        FIREBASE IMPORTS
==========================================*/

import { auth } from "../firebase/firebase-config.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";


/*==========================================
        CURRENT USER
==========================================*/

let currentUser = null;


/*==========================================
        VOYAGEAI DASHBOARD
==========================================*/

document.addEventListener("DOMContentLoaded", () => {

    // Check Login Status

    onAuthStateChanged(auth, (user) => {

        if (!user) {

            window.location.href = "login.html";

            return;

        }

        currentUser = user;

        loadUserInfo(user);

        welcomeGreeting();

    });

    animateStats();

    navbarShadow();

    plannerForm();

    notificationButton();

    profileButton();

    weatherAnimation();

    logoutButton();

});


/*==========================================
        LOAD USER
==========================================*/

/*==========================================
        LOAD USER
==========================================*/

function loadUserInfo(user) {

    const userName = document.getElementById("userName");

    const userRole = document.getElementById("userRole");

    const profileImage = document.getElementById("profileImage");

    if (!userName || !user) return;

    let name = "Traveler";

    if (user.displayName && user.displayName.trim() !== "") {

        name = user.displayName;

    }

    else if (user.email) {

        name = user.email.split("@")[0];

    }

    userName.textContent = name;

    if (userRole) {

        userRole.textContent = "Traveler";

    }

    if (profileImage && user.photoURL) {

        profileImage.src = user.photoURL;

    }

}


/*==========================================
        GREETING
==========================================*/

function welcomeGreeting() {

    const heading =
        document.getElementById("welcomeMessage");

    if (!heading) return;

    const hour = new Date().getHours();

    let greeting = "Good Evening";

    if (hour < 12) {

        greeting = "Good Morning";

    }

    else if (hour < 17) {

        greeting = "Good Afternoon";

    }

    const name =
        currentUser?.displayName ||
        currentUser?.email.split("@")[0] ||
        "Traveler";

    heading.innerHTML =
        `${greeting}, ${name} 👋`;

}


/*==========================================
        LOGOUT
==========================================*/

function logoutButton() {

    const button =
        document.getElementById("logoutBtn");

    if (!button) return;

    button.addEventListener("click", async () => {

        const confirmLogout =
            confirm("Do you want to logout?");

        if (!confirmLogout) return;

        try {

            await signOut(auth);

            window.location.href =
                "login.html";

        }

        catch (error) {

            alert(error.message);

        }

    });

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
