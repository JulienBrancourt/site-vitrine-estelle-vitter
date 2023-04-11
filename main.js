//slider
const slide = [
    "images/Lettre-de-recommandation-Estelle-1.jpeg",
    "images/lettre-de-recommandation-Estelle-2.jpeg", 
    "images/IMG_20200410_170901.jpg"];
let numero = 0;

function ChangeSlide(sens) {
  numero = numero + sens;
  if (numero < 0)
    numero = slide.length - 1;
  if (numero > slide.length - 1)
    numero = 0;
  document.getElementById("slide").src = slide[numero];
}

//zoom
let images = document.querySelectorAll("#slider img");
let current = 0;
let precedent = document.querySelector("#precedent");
let suivant = document.querySelector("#suivant");

function zoomIn() {
  images[current].style.transform = "scale(2)";
  images[current].style.transition = "transform 0.5s";
  
  precedent.classList.add("zoomed-in");
  suivant.classList.add("zoomed-in");
  
  precedent.style.left = "calc(50% - 250px)";
  suivant.style.right = "calc(50% - 250px)";
}

function zoomOut() {
  images[current].style.transform = "scale(1)";
  images[current].style.transition = "transform 0.5s";
  
  precedent.classList.remove("zoomed-in");
  suivant.classList.remove("zoomed-in");
  
  precedent.style.left = "0";
  suivant.style.right = "0";
}

for (var i = 0; i < images.length; i++) {
  images[i].addEventListener("click", function () {
    if (images[current].style.transform === "scale(2)") {
      zoomOut();
    } else {
      zoomIn();
    }
  });
}

//opacité des flèches
const slider = document.querySelector("#slider");
const nav = document.querySelector("#nav");
slider.addEventListener("mouseenter", function () {
  precedent.style.opacity = "1";
  suivant.style.opacity = "1";
  precedent.style.transition = "left 0.4s ease-in-out, opacity 0.5s ease-in-out";
  suivant.style.transition = "right 0.4s ease-in-out, opacity 0.5s ease-in-out";
});

slider.addEventListener("mouseleave", function () {
  precedent.style.opacity = "0";
  suivant.style.opacity = "0";
  precedent.style.transition = "left 0.3s ease-in-out, opacity 1s ease-in-out";
  suivant.style.transition = "right 0.3s ease-in-out, opacity 1s ease-in-out";
});

 

//formulaire de contact
const form = document.getElementById('form');
const result = document.getElementById('result');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);
  result.innerHTML = "Please wait..."

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.innerHTML = json.message;
            } else {
                console.log(response);
                result.innerHTML = json.message;
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "Something went wrong!";
        })
        .then(function() {
            form.reset();
            setTimeout(() => {
                result.style.display = "none";
            }, 3000);
        });
});


