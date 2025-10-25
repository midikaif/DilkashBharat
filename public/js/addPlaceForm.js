  const imageInput = document.getElementById('image');
  const previewContainer = document.getElementById('image-preview-container');
  let dataTransfer = new DataTransfer(); // Used to manage files in a virtual FileList

  // Function to render all images currently in dataTransfer
  function renderPreviews() {
    previewContainer.innerHTML = ''; // Clear existing previews

    if (dataTransfer.files.length === 0) {
      document.getElementById('error-image').style.display = 'block'; // Show error if no files
      imageInput.required = true; // Make input required again if no files
      return;
    } else {
      document.getElementById('error-image').style.display = 'none'; // Hide error if files exist
      imageInput.required = false; // Not strictly needed if dataTransfer.files is used
    }

    Array.from(dataTransfer.files).forEach((file, index) => {
      const reader = new FileReader();

      reader.onload = function(e) {
        const previewEl = document.createElement('div');
        previewEl.className = 'relative group'; // For delete icon positioning
        previewEl.innerHTML = `
          <img
            src="${e.target.result}"
            alt="${file.name}"
            class="h-24 w-full object-cover rounded-lg shadow-md"
          >
          <button
            type="button"
            data-index="${index}"
            class="delete-image-btn absolute top-1 right-1 bg-red-600 text-white rounded-full h-6 w-6 flex items-center justify-center text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            title="Remove ${file.name}"
          >
            &times;
          </button>
          <span class="absolute bottom-1 left-1 bg-black bg-opacity-50 text-white text-xs px-2 py-0.5 rounded-md max-w-[calc(100%-10px)] truncate">${file.name}</span>
        `;
        previewContainer.appendChild(previewEl);
      };

      reader.readAsDataURL(file);
    });
  }

  // --- Handle File Input Change (Add Images) ---
  imageInput.addEventListener('change', function() {
    const newFiles = Array.from(this.files);

    // Add new files to our dataTransfer object, limiting to 3
    newFiles.forEach(file => {
      if (dataTransfer.files.length < 3) {
        dataTransfer.items.add(file);
      } else {
        alert('You can only upload up to 3 images.');
        return; // Stop adding if limit reached
      }
    });

    this.files = dataTransfer.files; // Update the actual input's files
    renderPreviews(); // Re-render all previews
  });

  // --- Handle Delete Button Click ---
  previewContainer.addEventListener('click', function(e) {
    if (e.target.classList.contains('delete-image-btn')) {
      const indexToDelete = parseInt(e.target.dataset.index);

      // Remove the item from dataTransfer
      dataTransfer.items.remove(indexToDelete);

      imageInput.files = dataTransfer.files; // Update the actual input's files
      renderPreviews(); // Re-render all previews to update indices and display
    }
  });

  // Initial render in case there are pre-filled files (e.g., in an edit form)
  // For a pure 'add' form, this won't do much on load, but useful for 'edit' functionality.
  if (imageInput.files.length > 0) {
      Array.from(imageInput.files).forEach(file => dataTransfer.items.add(file));
      renderPreviews();
  } else {
      // Ensure error message is shown if no files initially and it's required
      document.getElementById('error-image').style.display = 'block';
  }

  // --- Form Submission Validation (Optional, to ensure at least one image if required) ---
  // document.getElementById('addPlaceForm').addEventListener('submit', function(event) {
  //     if (dataTransfer.files.length === 0) {
  //         document.getElementById('error-image').style.display = 'block';
  //         alert('Please upload at least one image.');
  //         event.preventDefault(); // Prevent form submission
  //     }
  // });