/* =====================================================
   VoyageAI - Create Trip
===================================================== */

console.log("VoyageAI Trip JS Loaded");

// ===============================
// Demo Mode
// ===============================

const params = new URLSearchParams(window.location.search);
const isDemo = params.get("mode") === "demo";

// ===============================
// Form Elements
// ===============================

const destination = document.getElementById("destination");
const budget = document.getElementById("budget");
const travelers = document.getElementById("travelers");
const tripType = document.getElementById("tripType");
const interest = document.getElementById("interest");
const startDate = document.getElementById("startDate");
const endDate = document.getElementById("endDate");

// ===============================
// Preview Elements
// ===============================

const previewTitle = document.getElementById("previewTitle");
const previewBudget = document.getElementById("previewBudget");
const previewTravelers = document.getElementById("previewTravelers");
const previewTripType = document.getElementById("previewTripType");
const previewInterest = document.getElementById("previewInterest");
const previewDays = document.getElementById("previewDays");
const previewImage = document.getElementById("previewImage");

const demoBanner = document.getElementById("demoBanner");
const generateBtn = document.querySelector(".generate-btn");

// ===============================
// Destination Images
// ===============================

const destinationImages = {

    Bali:
        "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=1200",

    Paris:
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200",

    Switzerland:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200",

    Maldives:
        "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1200",

    Dubai:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200",

    Japan:
        "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200"

};

// ===============================
// Show Demo Banner
// ===============================

demoBanner.style.display = isDemo ? "block" : "none";

// ===============================
// Calculate Trip Days
// ===============================

function calculateDays() {

    if (!startDate.value || !endDate.value) {

        previewDays.textContent = "Select Dates";
        return;

    }

    const start = new Date(startDate.value);
    const end = new Date(endDate.value);

    const totalDays =
        Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    if (totalDays < 0) {

        previewDays.textContent = "Invalid Dates";

    } else {

        previewDays.textContent = `${totalDays + 1} Days`;

    }

}

// ===============================
// Change Destination Image
// ===============================

function changeImage(place) {

    previewImage.src =
        destinationImages[place] ||
        destinationImages["Bali"];

}

// ===============================
// Update Live Preview
// ===============================

function updatePreview() {

    const place =
        destination.value || "Bali";

    const selectedTripType =
        tripType.value || "Solo";

    const selectedInterest =
        interest.value || "Adventure";

    previewTitle.textContent =
        `${place} ${selectedInterest} ${selectedTripType} Trip`;

    previewBudget.textContent =
        budget.value
            ? `₹${Number(budget.value).toLocaleString()}`
            : "₹50,000";

    previewTravelers.textContent =
        `${travelers.value} Traveler${travelers.value === "1" ? "" : "s"}`;

    previewTripType.textContent =
        selectedTripType;

    previewInterest.textContent =
        selectedInterest;

    calculateDays();

    changeImage(place);

}

// ===============================
// Live Events
// ===============================

destination.addEventListener("change", updatePreview);

budget.addEventListener("input", updatePreview);

travelers.addEventListener("change", updatePreview);

tripType.addEventListener("change", updatePreview);

interest.addEventListener("change", updatePreview);

startDate.addEventListener("change", updatePreview);

endDate.addEventListener("change", updatePreview);

// ===============================
// Initial Preview
// ===============================

updatePreview();

// =====================================================
// Generate Trip
// =====================================================

generateBtn.addEventListener("click", function () {

    // ---------------------------
    // Validation
    // ---------------------------

    if (!destination.value) {

        alert("Please select a destination.");
        destination.focus();
        return;

    }

    if (!startDate.value) {

        alert("Please select the start date.");
        startDate.focus();
        return;

    }

    if (!endDate.value) {

        alert("Please select the end date.");
        endDate.focus();
        return;

    }

    if (!budget.value) {

        alert("Please enter your budget.");
        budget.focus();
        return;

    }

    // ---------------------------
    // Save Trip Data
    // ---------------------------

    const tripData = {

        destination: destination.value,

        startDate: startDate.value,

        endDate: endDate.value,

        budget: budget.value,

        travelers: travelers.value,

        tripType: tripType.value,

        interest: interest.value,

        days: previewDays.textContent,

        image: previewImage.src,

        demo: isDemo

    };

    sessionStorage.setItem(
        "tripData",
        JSON.stringify(tripData)
    );

    // ---------------------------
    // Loading Button
    // ---------------------------

    generateBtn.disabled = true;

    generateBtn.innerHTML = `
        <i class="ri-loader-4-line ri-spin"></i>
        Generating Your AI Trip...
    `;

    // ---------------------------
    // Redirect
    // ---------------------------

    setTimeout(() => {

        window.location.href = "trip-details.html";

    }, 2500);

});