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
// Mobile Login/Register Switch
// ================================

const loginForm = document.querySelector(".login");
const registerForm = document.querySelector(".register");

const mobileLoginBtn = document.querySelector(".mobile-login-btn");
const mobileRegisterBtn = document.querySelector(".mobile-register-btn");

function mobileView() {

    if (window.innerWidth <= 768) {

        // Default Screen
        loginForm.style.display = "flex";
        registerForm.style.display = "none";

        mobileRegisterBtn.style.display = "block";
        mobileLoginBtn.style.display = "none";

    } else {

        // Desktop
        loginForm.style.display = "flex";
        registerForm.style.display = "flex";

        mobileRegisterBtn.style.display = "none";
        mobileLoginBtn.style.display = "none";
    }

}

// Initial Load
mobileView();


// Resize Window

window.addEventListener("resize", mobileView);


// Show Register

mobileRegisterBtn.addEventListener("click", () => {

    loginForm.style.display = "none";
    registerForm.style.display = "flex";

    mobileRegisterBtn.style.display = "none";
    mobileLoginBtn.style.display = "block";

});


// Show Login

mobileLoginBtn.addEventListener("click", () => {

    registerForm.style.display = "none";
    loginForm.style.display = "flex";

    mobileLoginBtn.style.display = "none";
    mobileRegisterBtn.style.display = "block";

});