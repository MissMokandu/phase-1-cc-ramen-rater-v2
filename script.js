const baseURL = "http://localhost:3000/ramens";

// DOM elements
const ramenMenu = document.getElementById("ramen-menu");
const detailImage = document.querySelector(".detail-image");
const detailName = document.querySelector(".name");
const detailRestaurant = document.querySelector(".restaurant");
const ratingDisplay = document.getElementById("rating-display");
const commentDisplay = document.getElementById("comment-display");
const form = document.getElementById("new-ramen");

// When the page loads, start the app
document.addEventListener("DOMContentLoaded", () => {
  fetchAndDisplayRamens();
  handleNewRamenSubmit();
});

function fetchAndDisplayRamens() {
  fetch(baseURL)
    .then(res => res.json())
    .then(ramens => {
      ramens.forEach(ramen => renderRamenThumbnail(ramen));

      // Show the first ramen by default
      if (ramens.length > 0) {
        showRamenDetails(ramens[0]);
      }
    })
    .catch(error => {
      console.error("Error fetching ramens:", error);
    });
}

function renderRamenThumbnail(ramen) {
  const img = document.createElement("img");
  img.src = ramen.image;
  img.alt = ramen.name;
  img.addEventListener("click", () => showRamenDetails(ramen));
  ramenMenu.appendChild(img);
}

function showRamenDetails(ramen) {
  detailImage.src = ramen.image;
  detailImage.alt = ramen.name;
  detailName.textContent = ramen.name;
  detailRestaurant.textContent = ramen.restaurant;
  ratingDisplay.textContent = ramen.rating;
  commentDisplay.textContent = ramen.comment;
}

function handleNewRamenSubmit() {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Grab user input
    const newRamen = {
      name: e.target["new-name"].value,
      restaurant: e.target["new-restaurant"].value,
      image: e.target["new-image"].value,
      rating: e.target["new-rating"].value,
      comment: e.target["new-comment"].value
    };

    // Add to menu visually
    renderRamenThumbnail(newRamen);
    form.reset();
  });
}

