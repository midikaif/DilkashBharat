
let MOCK_REVIEWS = [
  {
    id: 101,
    user: "Alex J.",
    date: "May 10, 2024",
    rating: 5,
    comment:
      "Absolutely stunning views! Worth the hike at dawn. The trails are easily navigable.",
    userId: "mock_user_1",
  },
  {
    id: 102,
    user: "Sam K.",
    date: "May 8, 2024",
    rating: 4,
    comment:
      "Beautiful, but the path was a little crowded on the weekend. Still highly recommended.",
    userId: "mock_user_2",
  },
  {
    id: 103,
    user: "Chris L.",
    date: "May 5, 2024",
    rating: 4,
    comment: "Great place for a picnic. The air is so fresh and clean.",
    userId: "mock_user_3",
  },
];

// --- DOM Elements ---
const reviewsContainer = document.getElementById("reviewsContainer");
const reviewForm = document.getElementById("reviewForm");
const formMessage = document.getElementById("formMessage");
const noReviewsMessage = document.getElementById("noReviewsMessage");
const averageRatingEl = document.getElementById("averageRating");
const totalReviewsCountEl = document.getElementById("totalReviewsCount");

// --- Utility Functions ---

/**
 * Renders the star rating HTML for a given score.
 * @param {number} rating - The rating score (1-5).
 * @returns {string} HTML string for the stars.
 */
function renderRatingStars(rating) {
  let starsHtml = "";
  for (let i = 1; i <= 5; i++) {
    const color =
      i <= rating ? "fill-amber-500 text-amber-500" : "text-gray-300";
    // Using Lucide icons for stars
    starsHtml += `<i data-lucide="star" class="w-5 h-5 ${color}"></i>`;
  }
  return `<div class="flex">${starsHtml}</div>`;
}

/**
 * Calculates and updates the average rating and count display.
 */
function updatePlaceStats() {
  const total = MOCK_REVIEWS.reduce((sum, review) => sum + review.rating, 0);
  const count = MOCK_REVIEWS.length;
  const avg = count > 0 ? (total / count).toFixed(1) : "N/A";

  // Update display elements
  averageRatingEl.innerHTML = `${avg} ${renderRatingStars(Math.round(avg))}`;
  totalReviewsCountEl.textContent = `based on ${count} review${
    count === 1 ? "" : "s"
  }`;
}

/**
 * Creates the HTML structure for a single review.
 * @param {Object} review - The review data object.
 * @returns {string} HTML string for the review card.
 */
function createReviewElement(review) {
  return `
                <div class="bg-gray-50 p-5 rounded-lg border border-gray-200 shadow-sm transition hover:shadow-md">
                    <div class="flex items-center justify-between mb-3">
                        <div class="flex items-center space-x-3">
                            <div class="bg-emerald-100 p-2 rounded-full text-emerald-600 font-bold w-10 h-10 flex items-center justify-center">
                                ${review.user.charAt(0)}
                            </div>
                            <div>
                                <p class="font-semibold text-gray-800">${
                                  review.user
                                }</p>
                                <p class="text-sm text-gray-500">${
                                  review.date
                                }</p>
                            </div>
                        </div>
                        <!-- Star Rating -->
                        ${renderRatingStars(review.rating)}
                    </div>
                    <p class="text-gray-700 leading-relaxed italic border-t pt-3 mt-3">
                        "${review.comment}"
                    </p>
                </div>
            `;
}

/**
 * Renders all reviews to the DOM.
 */
function renderReviews() {
  reviewsContainer.innerHTML = ""; // Clear existing reviews

  if (MOCK_REVIEWS.length === 0) {
    reviewsContainer.innerHTML = `<p id="noReviewsMessage" class="text-gray-500 italic">No reviews yet. Be the first to leave one!</p>`;
    return;
  }

  // Sort by date (newest first)
  MOCK_REVIEWS.sort((a, b) => new Date(b.date) - new Date(a.date));

  MOCK_REVIEWS.forEach((review) => {
    const reviewHtml = createReviewElement(review);
    reviewsContainer.insertAdjacentHTML("beforeend", reviewHtml);
  });

  // Re-render Lucide icons after injection
  lucide.createIcons();
  updatePlaceStats();
}

/**
 * Displays a message in the form's feedback box.
 */
function displayFormMessage(message, type = "error") {
  formMessage.classList.remove(
    "hidden",
    "bg-red-100",
    "text-red-700",
    "bg-green-100",
    "text-green-700"
  );

  if (type === "success") {
    formMessage.classList.add("bg-green-100", "text-green-700");
  } else {
    formMessage.classList.add("bg-red-100", "text-red-700");
  }
  formMessage.textContent = message;
}

// --- Event Listener ---
reviewForm.addEventListener("submit", function (event) {
//   event.preventDefault();

  // Basic Form Validation (check if rating is selected and comment exists)
  const formData = new FormData(reviewForm);
  const rating = parseInt(formData.get("rating"));
  const comment = formData.get("comment").trim();

  if (!rating || comment.length < 5) {
    displayFormMessage(
      "Please select a rating and ensure your comment is at least 5 characters long.",
      "error"
    );
    return;
  }

  // Create new mock review object
  const newReview = {
    id: Date.now(),
    user: "Current User", // Mock user name
    date: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    rating: rating,
    comment: comment,
    userId: "current_user_id", // Mock user ID
  };

  // Add to mock data array
  MOCK_REVIEWS.push(newReview);

  // Display success message
  displayFormMessage("Review submitted successfully!", "success");

  // Re-render the list and reset the form
  renderReviews();
  reviewForm.reset();

  // Clear success message after a delay
  setTimeout(() => {
    formMessage.classList.add("hidden");
  }, 3000);
});

// --- Initialization ---
document.addEventListener("DOMContentLoaded", () => {
  // Populate place details (though most are hardcoded in HTML for this mock)
//   document.getElementById("placeImage").src = MOCK_PLACE.imageUrl;
//   document.getElementById("placeTitle").textContent = MOCK_PLACE.title;
//   document.getElementById(
//     "placeLocation"
//   ).innerHTML = `<i data-lucide="map-pin" class="w-5 h-5 mr-2"></i> ${MOCK_PLACE.location}`;
//   document.getElementById("placeDescription").textContent =
//     MOCK_PLACE.description;

  // Initial render of reviews and stats
  renderReviews();

  // Re-render Lucide icons after all dynamic content is in place
  lucide.createIcons();
});
