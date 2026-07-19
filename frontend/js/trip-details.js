/* =====================================================
   VoyageAI - Trip Details
===================================================== */

console.log("Trip Details Loaded");

// =====================================
// Get Stored Trip Data
// =====================================

const tripData =
    JSON.parse(sessionStorage.getItem("tripData"));

// =====================================
// If No Data Found
// =====================================

if (!tripData) {

    alert("No trip found!");

    window.location.href = "create-trip.html";

}

// =====================================
// Elements
// =====================================

const heroImage =
    document.getElementById("heroImage");

const tripTitle =
    document.getElementById("tripTitle");

const tripDates =
    document.getElementById("tripDates");

const tripDays =
    document.getElementById("tripDays");

const tripTravelers =
    document.getElementById("tripTravelers");

const tripBudget =
    document.getElementById("tripBudget");

const saveTripBtn =
    document.getElementById("saveTripBtn");

const demoMessage =
    document.getElementById("demoMessage");

// Optional (only if you add these spans in HTML)
const tripType =
    document.getElementById("tripType");

const tripInterest =
    document.getElementById("tripInterest");

// =====================================
// Fill Data
// =====================================

if (heroImage) {
    heroImage.src = tripData.image;
}

tripTitle.textContent =
`${tripData.destination} ${tripData.interest} ${tripData.tripType} Trip`;

tripDates.textContent =
`${tripData.startDate} → ${tripData.endDate}`;

tripDays.textContent =
tripData.days;

tripTravelers.textContent =
`${tripData.travelers} Traveler${tripData.travelers == "1" ? "" : "s"}`;

tripBudget.textContent =
"₹" + Number(tripData.budget).toLocaleString();

if (tripType) {
    tripType.textContent = tripData.tripType;
}

if (tripInterest) {
    tripInterest.textContent = tripData.interest;
}

// =====================================
// Demo Mode
// =====================================

if (tripData.demo) {

    demoMessage.textContent =
        "🔒 Demo Mode: Login to save this trip.";

    saveTripBtn.innerHTML =
        '<i class="ri-login-box-line"></i> Login to Save';

}

// =====================================
// Save Button
// =====================================

saveTripBtn.addEventListener("click", () => {

    if (tripData.demo) {

        window.location.href = "login.html";

    } else {

        alert("✅ Trip Saved Successfully!");

    }

});

// =====================================
// Generate Demo AI Itinerary
// =====================================

const itinerary =
document.querySelector(".timeline");

const days =
parseInt(tripData.days);

const interest =
tripData.interest;

let activities = [

    "☀ Morning - Explore famous attractions",
    "🍴 Afternoon - Enjoy local cuisine",
    "📸 Evening - Sightseeing & Photography"

];

// Customize itinerary based on interest

switch (interest) {

    case "Adventure":

        activities = [

            "🥾 Morning - Trekking & Hiking",
            "🚵 Afternoon - Adventure Activities",
            "🔥 Evening - Campfire & Relax"

        ];

        break;

    case "Romantic":

        activities = [

            "🌅 Morning - Beach Walk",
            "🍷 Afternoon - Romantic Lunch",
            "🌇 Evening - Sunset Cruise"

        ];

        break;

    case "Luxury":

        activities = [

            "🏨 Morning - Luxury Hotel Experience",
            "🛍 Afternoon - Premium Shopping",
            "🍽 Evening - Fine Dining"

        ];

        break;

    case "Culture":

        activities = [

            "🏛 Morning - Visit Museums",
            "🎭 Afternoon - Explore Local Culture",
            "🍛 Evening - Traditional Food Tour"

        ];

        break;

    case "Nature":

        activities = [

            "🌿 Morning - Nature Park",
            "🏞 Afternoon - Waterfalls & Lakes",
            "🌌 Evening - Stargazing"

        ];

        break;

}

if (!isNaN(days) && itinerary) {

    itinerary.innerHTML = "";

    for (let i = 1; i <= Math.min(days, 7); i++) {

        itinerary.innerHTML += `

        <div class="day">

            <h3>Day ${i}</h3>

            <ul>

                <li>${activities[0]}</li>

                <li>${activities[1]}</li>

                <li>${activities[2]}</li>

            </ul>

        </div>

        `;

    }

}