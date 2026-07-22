// ================================
// Firebase Imports
// ================================

console.log("auth.js loaded");

// import { auth } from "../firebase/firebase-config.js";

import {
    auth,
    googleProvider
} from "../firebase/firebase-config.js";

import {

    createUserWithEmailAndPassword,

    signInWithEmailAndPassword,

    updateProfile,

    sendPasswordResetEmail,

    signInWithPopup

} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";


// ================================
// Desktop Sliding Animation
// ================================

const signBtn = document.querySelector(".sign");
const loginBtn = document.querySelector(".log");

const shade = document.getElementById("shade");
const signText = document.getElementById("sign_text");
const loginText = document.getElementById("login_text");

signBtn.addEventListener("click", () => {

    if (window.innerWidth > 768) {

        shade.style.left = "45%";

        signText.style.display = "none";

        setTimeout(() => {

            loginText.style.display = "block";
            loginText.style.marginLeft = "59.5%";

        }, 1000);

        setTimeout(() => {

            loginText.style.marginLeft = "0";

        }, 1100);

        loginText.style.transition = "1s";
        shade.style.transition = "1s ease-in-out";

    }

});

loginBtn.addEventListener("click", () => {

    if (window.innerWidth > 768) {

        shade.style.left = "-58%";

        loginText.style.display = "none";

        setTimeout(() => {

            signText.style.display = "block";
            signText.style.marginLeft = "0";

        }, 1000);

        setTimeout(() => {

            signText.style.marginLeft = "59.5%";

        }, 1100);

        signText.style.transition = "1s";
        shade.style.transition = "1s ease-in-out";

    }

});


// ================================
// Mobile View
// ================================

const loginForm = document.querySelector(".login");
const registerForm = document.querySelector(".register");

const mobileLoginBtn = document.querySelector(".mobile-login-btn");
const mobileRegisterBtn = document.querySelector(".mobile-register-btn");

function mobileView() {

    if (window.innerWidth <= 768) {

        loginForm.style.display = "flex";
        registerForm.style.display = "none";

        mobileRegisterBtn.style.display = "block";
        mobileLoginBtn.style.display = "none";

    }

    else {

        loginForm.style.display = "flex";
        registerForm.style.display = "flex";

        mobileRegisterBtn.style.display = "none";
        mobileLoginBtn.style.display = "none";

    }

}

mobileView();

window.addEventListener("resize", mobileView);

mobileRegisterBtn.addEventListener("click", () => {

    loginForm.style.display = "none";
    registerForm.style.display = "flex";

    mobileRegisterBtn.style.display = "none";
    mobileLoginBtn.style.display = "block";

});

mobileLoginBtn.addEventListener("click", () => {

    registerForm.style.display = "none";
    loginForm.style.display = "flex";

    mobileLoginBtn.style.display = "none";
    mobileRegisterBtn.style.display = "block";

});


// ================================
// SweetAlert Helpers
// ================================

function showSuccess(title, text) {

    Swal.fire({

        icon: "success",

        title: title,

        text: text,

        confirmButtonColor: "#2563eb"

    });

}

function showError(title, text) {

    Swal.fire({

        icon: "error",

        title: title,

        text: text,

        confirmButtonColor: "#dc2626"

    });

}

function firebaseError(error) {

    switch (error.code) {

        case "auth/email-already-in-use":
            return "An account with this email already exists.";

        case "auth/invalid-email":
            return "Please enter a valid email address.";

        case "auth/weak-password":
            return "Password must be at least 6 characters.";

        case "auth/user-not-found":
            return "No account found with this email.";

        case "auth/wrong-password":
            return "Incorrect password.";

        case "auth/invalid-credential":
            return "Incorrect email or password.";

        case "auth/too-many-requests":
            return "Too many attempts. Please try again later.";

        default:
            return error.message;

    }

}


// ================================
// Forgot Password
// ================================

const forgotPassword = document.getElementById("forgotPassword");

if (forgotPassword) {

    forgotPassword.addEventListener("click", async (e) => {

        e.preventDefault();

        const { value: email } = await Swal.fire({

            title: "Reset Password",

            input: "email",

            inputLabel: "Enter your registered email",

            inputPlaceholder: "example@gmail.com",

            confirmButtonText: "Send Reset Link",

            showCancelButton: true

        });

        if (!email) return;

        try {

            await sendPasswordResetEmail(auth, email);

            showSuccess(

                "Email Sent",

                "If an account exists with this email, a password reset link has been sent."

            );

        }

        catch (error) {

            showError(

                "Reset Failed",

                firebaseError(error)

            );

        }

    });

}
// ================================
// Firebase Register
// ================================

const registerFormElement = document.getElementById("registerForm");

registerFormElement.addEventListener("submit", async (e) => {

    e.preventDefault();

    const name =
        document.getElementById("registerName").value.trim();

    const email =
        document.getElementById("registerEmail").value.trim();

    const password =
        document.getElementById("registerPassword").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;

    const registerBtn =
        registerFormElement.querySelector("button");

    if (password !== confirmPassword) {

        showError(
            "Password Mismatch",
            "Passwords do not match."
        );

        return;

    }

    registerBtn.disabled = true;
    registerBtn.innerHTML =
        '<i class="fa-solid fa-spinner fa-spin"></i> Creating Account...';

    try {

        const userCredential =
            await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

        await updateProfile(userCredential.user, {
            displayName: name
        });

        registerFormElement.reset();

        await Swal.fire({

            icon: "success",

            title: "Welcome to VoyageAI 🎉",

            html: `
                <b>${name}</b><br><br>
                Your account has been created successfully.<br>
                You can now start planning your trips.
            `,

            confirmButtonText: "Continue",

            confirmButtonColor: "#2563eb"

        });

    }

    catch (error) {

        showError(
            "Registration Failed",
            firebaseError(error)
        );

    }

    finally {

        registerBtn.disabled = false;

        registerBtn.innerHTML = "Register";

    }

});


// ================================
// Firebase Login
// ================================

const loginFormElement =
    document.getElementById("loginForm");

loginFormElement.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email =
        document.getElementById("loginEmail").value.trim();

    const password =
        document.getElementById("loginPassword").value;

    const loginBtn =
        loginFormElement.querySelector("button");

    loginBtn.disabled = true;

    loginBtn.innerHTML =
        '<i class="fa-solid fa-spinner fa-spin"></i> Signing In...';

    try {

        const userCredential =
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

        const user = userCredential.user;

        await Swal.fire({

            icon: "success",

            title: "Login Successful",

            html: `
                Welcome back,
                <br><br>
                <b>${user.displayName || "Traveler"}</b>
                <br><br>
                Redirecting to Dashboard...
            `,

            timer: 1800,

            showConfirmButton: false

        });

        window.location.href = "dashboard.html";

    }

    catch (error) {

        showError(
            "Login Failed",
            firebaseError(error)
        );

    }

    finally {

        loginBtn.disabled = false;

        loginBtn.innerHTML = "Login";

    }

});

// ================================
// Continue with Google
// ================================

const googleLoginBtn = document.getElementById("googleLoginBtn");

let googleLoginInProgress = false;

if (googleLoginBtn) {

    googleLoginBtn.addEventListener("click", async () => {

        if (googleLoginInProgress) return;

        googleLoginInProgress = true;

        googleLoginBtn.disabled = true;

        try {

            const result = await signInWithPopup(auth, googleProvider);

            Swal.fire({
                icon: "success",
                title: "Welcome",
                text: `Hello ${result.user.displayName}!`,
                timer: 1800,
                showConfirmButton: false
            });

            window.location.href = "dashboard.html";

        } catch (error) {

            if (error.code !== "auth/cancelled-popup-request") {

                showError(
                    "Google Login Failed",
                    firebaseError(error)
                );

            }

        } finally {

            googleLoginBtn.disabled = false;

            googleLoginInProgress = false;

        }

    });

}