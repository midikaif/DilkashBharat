let slides = document.getElementsByClassName("carousel-image");
if (slides.length !== 0) {
  let slideIndex = 1;
  let slideTimer;
  const intervalTime = 4000;
  const mainImagesContainer = document.querySelector(".carousel-main-images");
  const prevNextButtons = document.querySelectorAll(".carousel-btn");
  const thumbnailContainer = document.querySelector(".carousel-thumbnails");

  startSlideshow();

  /* --- JS UTILITY FUNCTIONS --- */

  function resetTimer() {
    clearInterval(slideTimer);
    startSlideshow();
  }

  function startSlideshow() {
    showSlides(slideIndex);
    slideTimer = setInterval(() => {
      showSlides((slideIndex += 1));
    }, intervalTime);
  }

  function showSlides(n) {
    let i;
    let thumbs = document.getElementsByClassName("thumbnail-item");

    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }

    for (i = 0; i < slides.length; i++) {
      slides[i].classList.remove("active");
      thumbs[i].classList.remove("active");
    }

    slides[slideIndex - 1].classList.add("active");
    thumbs[slideIndex - 1].classList.add("active");
  }

  /* ------------------------------------------------------------------ */
  /* NEW: EVENT LISTENERS FOR EJS COMPATIBILITY               */
  /* ------------------------------------------------------------------ */

  // 1. Prev/Next Button Listeners
  prevNextButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Get the direction from the data-change attribute
      const change = parseInt(this.getAttribute("data-change"));

      showSlides((slideIndex += change));
      resetTimer();
    });
  });

  // 2. Thumbnail Click Listener (using Event Delegation on the container)
  thumbnailContainer.addEventListener("click", function (event) {
    // Check if the clicked element is a thumbnail-item
    if (event.target.classList.contains("thumbnail-item")) {
      // Get the index from the data-index attribute
      const index = parseInt(event.target.getAttribute("data-index"));

      showSlides((slideIndex = index));
      resetTimer();
    }
  });
}

// --- 1. Utility Function: Renders Star Icons ---
function renderRatingStars(rating) {
  let starsHtml = "";
  // The SVG code for the Lucide 'star' icon
  const STAR_SVG = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
`;

  // Ensure rating is a number (round it for display)
  const displayRating = Math.round(rating);

  for (let i = 1; i <= 5; i++) {
    // Determine color: filled star uses fill-amber-500, empty star uses stroke-gray-300
    const colorClasses =
      i <= displayRating
        ? "fill-amber-500 text-amber-500" // For filled stars
        : "fill-none text-gray-300"; // For empty stars (only border shown)

    // Combine all size and color classes
    const finalClasses = `w-5 h-5 ${colorClasses}`;

    // Insert the final classes into the SVG tag
    starsHtml += STAR_SVG.replace("<svg", `<svg class="${finalClasses}"`);
  }

  return `<div class="flex">${starsHtml}</div>`;
}

// --- 2. Utility Function: Formats Date ---
function formatDisplayDate(rawDateString) {
  if (!rawDateString) return "";
  const date = new Date(rawDateString);
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// --- 3. Utility Function: Creates Review HTML ---
function createReviewElement(review) {
  // Determine the user's initial for the avatar
  const userInitial = review.username ? review.username.charAt(0) : "U";
  const formattedDate = formatDisplayDate(review.createdAt || review.date); // Use createdAt from backend or date from mock/temp

  return `
        <div class="bg-gray-50 p-5 rounded-lg border border-gray-200 shadow-sm transition hover:shadow-md">
            <div class="flex items-center justify-between mb-3">
                <div class="flex items-center space-x-3">
                    <div class="bg-emerald-100 p-2 rounded-full text-emerald-600 font-bold w-10 h-10 flex items-center justify-center">
                        ${userInitial}
                    </div>
                    <div>
                        <p class="font-semibold text-gray-800">${
                          review.username || "Anonymous"
                        }</p>
                        <p class="text-sm text-gray-500">${formattedDate}</p>
                    </div>
                </div>
                ${renderRatingStars(review.rating)}
            </div>
            <p class="text-gray-700 leading-relaxed italic border-t pt-3 mt-3">
                "${review.comment}"
            </p>
        </div>
    `;
}

// --- 4. Initialization and Dynamic Rendering Logic ---
document.addEventListener("DOMContentLoaded", () => {
  // 1. Initial Render: Find all server-rendered review containers
  // Use the functions to format and replace the content.
  document.querySelectorAll(".review-card").forEach((card) => {
    // Find the star placeholder and date element within the card
    const starsEl = card.querySelector(".review-stars-placeholder");
    const dateEl = card.querySelector(".review-date-placeholder");

    if (starsEl && dateEl) {
      // Get data attributes injected by EJS
      const rating = parseFloat(starsEl.getAttribute("data-rating"));
      const rawDate = dateEl.getAttribute("data-raw-date");

      // Render the elements using the JS functions
      starsEl.innerHTML = renderRatingStars(rating);
      dateEl.textContent = formatDisplayDate(rawDate);
    }
  });

  // 2. Dynamic Update (Your Form Logic Here)
  const reviewForm = document.getElementById("reviewForm");
  const reviewsContainer = document.getElementById("reviewsContainer");

  // ... [Insert your form submission logic from previous answers here,
  // using fetch/POST and calling createReviewElement to append the new review] ...

  // Re-render Lucide icons for all content (server-rendered or client-rendered)
  lucide.createIcons();
});

// IMPORTANT: Export functions if needed, or leave them global if the script is in the HTML <head> or <body>
// If not using modules, the functions are global and callable.

// Function to handle showing the custom delete modal
