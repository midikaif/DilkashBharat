document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("addPlaceForm");

  /**
   * Resets the error state for a form group.
   * @param {string} fieldId - The ID of the field (e.g., 'title').
   */
  function resetError(fieldId) {
    const group = document.getElementById(`group-${fieldId}`);
    if (group) {
      group.classList.remove("has-error");
    }
  }

  /**
   * Sets the error state and message for a form group.
   * @param {string} fieldId - The ID of the field (e.g., 'title').
   * @param {string} message - The error message to display.
   */
  function setError(fieldId, message) {
    const group = document.getElementById(`group-${fieldId}`);
    const errorDiv = document.getElementById(`error-${fieldId}`);
    if (group) {
      group.classList.add("has-error");
      if (errorDiv) {
        errorDiv.textContent = message;
      }
    }
  }

  /**
   * Handles validation for all form fields.
   * @returns {boolean} True if validation passes, false otherwise.
   */
  function validateForm() {
    let isValid = true;

    // --- 1. Validate Title (min 3 chars) ---
    const titleInput = document.getElementById("title");
    resetError("title");
    if (titleInput.value.trim().length < 3) {
      setError("title", "Title is required and must be at least 3 characters.");
      isValid = false;
    }

    // --- 2. Validate Location (min 3 chars) ---
    const locationInput = document.getElementById("location");
    resetError("location");
    if (locationInput.value.trim().length < 3) {
      setError(
        "location",
        "Location is required and must be at least 3 characters."
      );
      isValid = false;
    }

    // --- 3. Validate Description (min 10 chars) ---
    const descriptionInput = document.getElementById("description");
    resetError("description");
    if (descriptionInput.value.trim().length < 10) {
      setError(
        "description",
        "Description is required and must be at least 10 characters."
      );
      isValid = false;
    }

    // --- 4. Validate Images (at least 1 file) ---
    const imageInput = document.getElementById("image");
    resetError("image");
    if (imageInput.files.length === 0) {
      setError("image", "Please select at least one file.");
      isValid = false;
    }

    return isValid;
  
  }

  // Attach validation listener to the form submission
  form.addEventListener("submit", (event) => {
    if (!validateForm()) {
     console.log('validation failed');
      event.preventDefault();
       // Stop form submission if validation fails
      // Scroll to the first error if needed
      const firstError = document.querySelector(".has-error");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  
  });

  // Real-time validation feedback on input change/blur
  const fields = ["title", "location", "description", "image"];
  fields.forEach((fieldId) => {
    const input = document.getElementById(fieldId);
    if (input) {
      input.addEventListener("input", () => {
        // Only perform validation if the field has content
        if (input.value.trim().length > 0) {
          validateForm();
        }
      });
      input.addEventListener("blur", () => {
        validateForm();
      });
    }
  });

  // Special handling for file input to validate immediately on change
  const imageInput = document.getElementById("image");
  if (imageInput) {
    imageInput.addEventListener("change", () => {
      validateForm();
    });
  }
});
