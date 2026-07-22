/*=========================================
        VOYAGEAI PROFILE PAGE
=========================================*/

import { auth } from "../firebase/firebase-config.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";
/*=========================================
        ELEMENTS
=========================================*/
const db = getFirestore();
const userName = document.getElementById("userName");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const locationInput = document.getElementById("location");

const joinedDate = document.getElementById("joinedDate");
const lastLogin = document.getElementById("lastLogin");

const editBtn = document.getElementById("editBtn");
const saveBtn = document.getElementById("saveBtn");
const logoutBtn = document.getElementById("logoutBtn");

const profileImage = document.getElementById("profileImage");
const changePhoto = document.querySelector(".change-photo");

/*=========================================
        AUTH STATE
=========================================*/

let currentUser = null;

/*=========================================
        LOAD FIREBASE USER
=========================================*/

onAuthStateChanged(auth, (user) => {

    if (!user) {

        window.location.href = "login.html";
        return;
    }

    currentUser = user;

    userName.textContent =
        user.displayName || "VoyageAI User";

    email.value = user.email || "";

    if (user.photoURL) {
        profileImage.src = user.photoURL;
    }

    if (user.metadata.creationTime) {

        joinedDate.value =
            new Date(user.metadata.creationTime)
            .toLocaleDateString("en-IN", {

                day: "numeric",
                month: "long",
                year: "numeric"

            });

    }

    if (user.metadata.lastSignInTime) {

        lastLogin.value =
            new Date(user.metadata.lastSignInTime)
            .toLocaleString("en-IN");

    }

    loadSavedProfile();

});

/*=========================================
        LOAD LOCAL PROFILE
=========================================*/

/*=========================================
        LOAD USER PROFILE
=========================================*/

async function loadSavedProfile() {

    if (!currentUser) return;

    try {

        const docRef = doc(db, "users", currentUser.uid);

        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) return;

        const profile = docSnap.data();

        phone.value = profile.phone || "";

        locationInput.value = profile.location || "";

        if (
            profile.image &&
            !currentUser.photoURL
        ) {

            profileImage.src = profile.image;

        }

    }

    catch (error) {

        console.error(error);

    }

}
/*=========================================
        DEFAULT READ ONLY
=========================================*/

phone.readOnly = true;
locationInput.readOnly = true;

/*=========================================
        EDIT PROFILE
=========================================*/

editBtn.addEventListener("click", () => {

    phone.readOnly = false;
    locationInput.readOnly = false;

    phone.focus();

    alert("You can now edit your profile.");

});

/*=========================================
        SAVE PROFILE
=========================================*/

saveBtn.addEventListener("click", async () => {

    try {

        const profile = {

            name: userName.textContent,

            email: email.value,

            phone: phone.value,

            location: locationInput.value,

            image: profileImage.src

        };

        await setDoc(

            doc(db, "users", currentUser.uid),

            profile,

            { merge: true }

        );

        phone.readOnly = true;

        locationInput.readOnly = true;

        alert("Profile updated successfully!");

    }

    catch (error) {

    console.error("Firestore Error:", error);
    console.error("Code:", error.code);
    console.error("Message:", error.message);

    alert(error.message);

}

});

/*=========================================
        CHANGE PHOTO
=========================================*/

changePhoto.addEventListener("click", () => {

    const fileInput = document.createElement("input");

    fileInput.type = "file";

    fileInput.accept = "image/*";

    fileInput.click();

    fileInput.onchange = function () {

        const file = this.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = function (e) {

            profileImage.src = e.target.result;

        };

        reader.readAsDataURL(file);

    };

});

/*=========================================
        FIREBASE LOGOUT
=========================================*/

logoutBtn.addEventListener("click", async () => {

    const confirmLogout = confirm(
        "Are you sure you want to logout?"
    );

    if (!confirmLogout) return;

    try {

        await signOut(auth);

        window.location.href = "login.html";

    }

    catch (error) {

        console.error(error);

        alert("Logout failed. Please try again.");

    }

});