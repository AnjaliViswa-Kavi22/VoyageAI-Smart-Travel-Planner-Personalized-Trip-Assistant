/* ==========================================
   VOYAGEAI HOMEPAGE JAVASCRIPT
========================================== */

/* ==========================================
   TYPEWRITER EFFECT
========================================== */

const texts = [
    "Plan Your Dream Journey with AI.",
    "Discover Beautiful Destinations.",
    "Travel Smarter with VoyageAI.",
    "Create Personalized Trips.",
    "Explore India Like Never Before."
];

let textIndex = 0;
let charIndex = 0;

const typewriter = document.getElementById("typewriter");

function typeEffect() {

    if (charIndex < texts[textIndex].length) {

        typewriter.textContent += texts[textIndex].charAt(charIndex);

        charIndex++;

        setTimeout(typeEffect,80);

    } else {

        setTimeout(eraseEffect,1800);

    }

}

function eraseEffect(){

    if(charIndex>0){

        typewriter.textContent=texts[textIndex].substring(0,charIndex-1);

        charIndex--;

        setTimeout(eraseEffect,40);

    }

    else{

        textIndex++;

        if(textIndex>=texts.length){

            textIndex=0;

        }

        setTimeout(typeEffect,300);

    }

}

typeEffect();


/* ==========================================
   IMAGE CAROUSEL
========================================== */

const carouselImages=[

"images/goa.jpg",

"images/manali.jpg",

"images/kerala.jpg",

"images/ooty.jpg",

"images/kashmir.jpg",

"images/jaipur.jpg"

];

const carousel=document.getElementById("carouselImage");

let imageIndex=0;

function changeImage(){

imageIndex++;

if(imageIndex>=carouselImages.length){

imageIndex=0;

}

carousel.style.opacity="0";

setTimeout(()=>{

carousel.src=carouselImages[imageIndex];

carousel.style.opacity="1";

},500);

}

setInterval(changeImage,3000);


/* ==========================================
   SEARCH SUGGESTIONS
========================================== */

const places=[

"Goa",
"Manali",
"Jaipur",
"Ooty",
"Kerala",
"Kashmir",
"Delhi",
"Hyderabad",
"Mumbai",
"Chennai",
"Pondicherry",
"Coorg",
"Munnar",
"Ladakh",
"Shimla",
"Darjeeling",
"Agra",
"Varanasi",
"Tirupati",
"Amritsar"

];

const input=document.getElementById("searchInput");

const suggestionBox=document.getElementById("suggestions");

input.addEventListener("keyup",function(){

let value=input.value.toLowerCase();

suggestionBox.innerHTML="";

if(value===""){

return;

}

let filtered=places.filter(place=>

place.toLowerCase().startsWith(value)

);

filtered.forEach(place=>{

const li=document.createElement("li");

li.innerHTML=place;

li.onclick=()=>{

input.value=place;

suggestionBox.innerHTML="";

};

suggestionBox.appendChild(li);

});

});


/* ==========================================
   COUNTER ANIMATION
========================================== */

const counters=document.querySelectorAll(".counter");

const speed=100;

counters.forEach(counter=>{

function update(){

const target=+counter.getAttribute("data-target");

const count=+counter.innerText;

const increment=target/speed;

if(count<target){

counter.innerText=Math.ceil(count+increment);

setTimeout(update,25);

}

else{

counter.innerText=target;

}

}

update();

});


/* ==========================================
   SMOOTH NAVIGATION
========================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

anchor.addEventListener("click",function(e){

e.preventDefault();

document.querySelector(this.getAttribute("href"))

.scrollIntoView({

behavior:"smooth"

});

});

});


/* ==========================================
   SCROLL REVEAL
========================================== */

const reveals=document.querySelectorAll(

".card,.destination-card,.step,.testimonial"

);

window.addEventListener("scroll",reveal);

function reveal(){

const windowHeight=window.innerHeight;

reveals.forEach(item=>{

const top=item.getBoundingClientRect().top;

if(top<windowHeight-100){

item.classList.add("active");

}

});

}


/* ==========================================
   NAVBAR BACKGROUND
========================================== */

window.addEventListener("scroll",()=>{

const header=document.querySelector("header");

if(window.scrollY>80){

header.style.background="rgba(8,15,30,.95)";

}

else{

header.style.background="rgba(8,15,30,.75)";

}

});


/* ==========================================
   BUTTON RIPPLE EFFECT
========================================== */

const buttons=document.querySelectorAll(".btn-primary,.btn-secondary");

buttons.forEach(btn=>{

btn.addEventListener("click",function(e){

let circle=document.createElement("span");

circle.classList.add("ripple");

this.appendChild(circle);

let x=e.clientX-this.offsetLeft;

let y=e.clientY-this.offsetTop;

circle.style.left=x+"px";

circle.style.top=y+"px";

setTimeout(()=>{

circle.remove();

},600);

});

});


/* ==========================================
   CURRENT YEAR
========================================== */

const footer=document.querySelector("footer p:last-child");

const year=new Date().getFullYear();

footer.innerHTML="© "+year+" VoyageAI. All Rights Reserved.";


/* ==========================================
   PAGE LOADED
========================================== */

window.onload=()=>{

document.body.style.opacity="1";

};