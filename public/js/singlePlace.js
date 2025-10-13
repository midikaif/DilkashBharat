
// --- 1. Utility Function: Renders Star Icons ---
function renderRatingStars(rating) {
  let starsHtml = "";
  // Ensure rating is a number (round it for display)
  const displayRating = Math.round(rating);

  for (let i = 1; i <= 5; i++) {
    const color =
      i <= displayRating ? "fill-amber-500 text-amber-500" : "text-gray-300";
    starsHtml += `<i data-lucide="star" class="w-5 h-5 ${color}"></i>`;
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


