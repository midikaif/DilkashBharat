// --- DOM Elements ---
const reviewForm = document.getElementById("reviewForm");
const formMessage = document.getElementById("formMessage");
// ... other DOM elements you might need (reviewsContainer, etc.)

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
  // Clear any existing classes and apply new ones
  formMessage.className = "text-sm p-2 rounded-lg";

  if (type === "success") {
    formMessage.classList.add("bg-green-100", "text-green-700");
  } else {
    formMessage.classList.add("bg-red-100", "text-red-700");
  }
  formMessage.textContent = message;
  formMessage.classList.remove("hidden");
}

// --- Event Listener with Validation ---
reviewForm.addEventListener("submit", function (event) {
  // Prevent the default HTML form submission (page reload)
  event.preventDefault();

  const formData = new FormData(reviewForm);

  // The rating name is 'review[rating]', so we access it that way.
  const ratingValue = formData.get("review[rating]");
  const commentBody = formData.get("review[body]").trim();

  // 1. VALIDATION CHECK: Rating must be selected (value is not null/empty)
  if (!ratingValue) {
    displayFormMessage(
      "Please select a star rating before submitting your review.",
      "error"
    );
    return; // Stop execution
  }

  // 2. VALIDATION CHECK: Comment body must exist and meet a minimum length
  const MIN_COMMENT_LENGTH = 10;
  if (commentBody.length < MIN_COMMENT_LENGTH) {
    displayFormMessage(
      `Your comment must be at least ${MIN_COMMENT_LENGTH} characters long.`,
      "error"
    );
    return; // Stop execution
  }

  // --- If validation passes, proceed with AJAX submission ---

  // Gather final data for the server (assuming you are using fetch/axios for AJAX)
  const dataToSend = {
    review: {
      rating: parseInt(ratingValue),
      body: commentBody,
    },
    // You might also need the placeId if not in the URL path
  };

  // 💡 Placeholder for your actual AJAX/fetch request
  // Example of where you would call your API:

  fetch(reviewForm.action, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataToSend),
  })
  .then((response) => {
    displayFormMessage("Review submitted successfully!", "success");
    reviewForm.reset();
    // ... call your function to dynamically add the new review to the DOM
    window.location.replace(response.url);
    return Promise.reject("Redirecting...");
  });

  // For demonstration, simulating successful submission:
  displayFormMessage("Validation passed! Submitting review...", "success");

  // You would remove the following timeout and call your fetch logic instead
  setTimeout(() => {
    formMessage.classList.add("hidden");
  }, 3000);
});
