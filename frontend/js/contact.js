// ==========================================
// VoyageAI Contact Page JavaScript
// ==========================================

const contactForm = document.getElementById("contactForm");
const sendBtn = document.querySelector(".send-btn");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const categoryInput = document.getElementById("category");
const subjectInput = document.getElementById("subject");
const messageInput = document.getElementById("message");

// ==========================================
// Character Counter
// ==========================================

const counter = document.createElement("small");
counter.style.display = "block";
counter.style.textAlign = "right";
counter.style.marginTop = "8px";
counter.style.color = "#64748b";

messageInput.parentElement.appendChild(counter);

updateCounter();

messageInput.addEventListener("input", updateCounter);

function updateCounter() {

    counter.textContent = `${messageInput.value.length}/500 Characters`;

}

// ==========================================
// Email Validation
// ==========================================

function isValidEmail(email) {

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regex.test(email);

}

// ==========================================
// Phone Validation
// ==========================================

function isValidPhone(phone) {

    if (phone.trim() === "") return true;

    return /^[0-9]{10}$/.test(phone);

}

// ==========================================
// Toast Notification
// ==========================================

function showToast(message, color) {

    const toast = document.createElement("div");

    toast.innerText = message;

    toast.style.position = "fixed";
    toast.style.top = "25px";
    toast.style.right = "25px";
    toast.style.padding = "15px 25px";
    toast.style.background = color;
    toast.style.color = "#fff";
    toast.style.borderRadius = "10px";
    toast.style.fontWeight = "600";
    toast.style.boxShadow = "0 8px 20px rgba(0,0,0,.2)";
    toast.style.zIndex = "9999";
    toast.style.animation = "fadeIn .4s";

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.remove();

    }, 3000);

}

// ==========================================
// Form Submit
// ==========================================

contactForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    const name = nameInput.value.trim();

    const email = emailInput.value.trim();

    const phone = phoneInput.value.trim();

    const category = categoryInput.value;

    const subject = subjectInput.value.trim();

    const message = messageInput.value.trim();

    // =============================
    // Validation
    // =============================

    if (name.length < 3) {

        showToast("Enter a valid name", "#ef4444");

        return;

    }

    if (!isValidEmail(email)) {

        showToast("Invalid email address", "#ef4444");

        return;

    }

    if (!isValidPhone(phone)) {

        showToast("Phone must contain 10 digits", "#ef4444");

        return;

    }

    if (subject.length < 5) {

        showToast("Subject is too short", "#ef4444");

        return;

    }

    if (message.length < 20) {

        showToast("Please describe your issue in detail", "#ef4444");

        return;

    }

    // =============================
    // Loading Button
    // =============================

    sendBtn.disabled = true;

    sendBtn.innerHTML =
        `<i class="fa-solid fa-spinner fa-spin"></i> Sending...`;

    try {

        const response = await fetch("http://127.0.0.1:5000/contact", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                name: name,
                email: email,
                phone: phone,
                category: category,
                subject: subject,
                message: message

            })

        });

        const result = await response.json();

        if (response.ok && result.success) {

            showToast(
                "Message Sent Successfully!",
                "#16a34a"
            );

            contactForm.reset();

            updateCounter();

        } else {

            showToast(
                result.message || "Unable to send message.",
                "#ef4444"
            );

        }

    } catch (error) {

        console.error(error);

        showToast(
            "Server connection failed.",
            "#ef4444"
        );

    }

    // =============================
    // Reset Button
    // =============================

    sendBtn.disabled = false;

    sendBtn.innerHTML =
        `<i class="fa-solid fa-paper-plane"></i> Send Message`;

});