/*=========================================
        VOYAGEAI MY TRIPS
=========================================*/

const searchInput = document.getElementById("searchTrip");
const filterType = document.getElementById("filterType");
const filterInterest = document.getElementById("filterInterest");

const tripCards = document.querySelectorAll(".trip-card");
const emptyState = document.querySelector(".empty-state");

/*=========================================
        SEARCH + FILTER
=========================================*/

function filterTrips(){

    let visible = 0;

    tripCards.forEach(card=>{

        const title =
        card.querySelector("h2")
        .textContent
        .toLowerCase();

        const type =
        card.querySelectorAll("p")[1]
        .textContent
        .toLowerCase();

        const search =
        searchInput.value.toLowerCase();

        const tripType =
        filterType.value.toLowerCase();

        let show = true;

        if(search && !title.includes(search)){

            show = false;

        }

        if(tripType && !type.includes(tripType)){

            show = false;

        }

        card.style.display = show ? "block":"none";

        if(show){

            visible++;

        }

    });

    if(visible===0){

        emptyState.style.display="block";

    }

    else{

        emptyState.style.display="none";

    }

}

searchInput.addEventListener(
    "keyup",
    filterTrips
);

filterType.addEventListener(
    "change",
    filterTrips
);

filterInterest.addEventListener(
    "change",
    filterTrips
);

/*=========================================
        VIEW BUTTON
=========================================*/

document.querySelectorAll(".view-btn")
.forEach(button=>{

    button.addEventListener("click",()=>{

        window.location.href=
        "trip-details.html";

    });

});

/*=========================================
        DELETE BUTTON
=========================================*/

document.querySelectorAll(".delete-btn")
.forEach(button=>{

    button.addEventListener("click",()=>{

        const confirmDelete =
        confirm(
            "Delete this trip?"
        );

        if(!confirmDelete) return;

        button
        .closest(".trip-card")
        .remove();

        filterTrips();

    });

});

/*=========================================
        LOAD SAVED TRIPS
=========================================*/

window.addEventListener(
    "DOMContentLoaded",
    ()=>{

        filterTrips();

    }
);