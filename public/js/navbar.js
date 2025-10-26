document.addEventListener("DOMContentLoaded", () => {
  // === 1. NAVIGATION TOGGLE LOGIC ===
  const menuToggle = document.querySelector(".menu-toggle");
  const navContainer = document.getElementById("collapsible-nav");

  menuToggle.addEventListener("click", () => {
    // Toggle the 'open' class for the CSS collapse effect
    navContainer.classList.toggle("open");

    // Toggle the aria-expanded attribute for accessibility
    const isExpanded =
      menuToggle.getAttribute("aria-expanded") === "true" || false;
    menuToggle.setAttribute("aria-expanded", !isExpanded);
  });

  // === 2. ACTIVE LINK LOGIC (Original) ===
  // const navLinks = document.querySelectorAll(".nav-link");

  // navLinks.forEach((link) => {
  //     link.addEventListener("click", (event) => {
  //         // Remove 'active' class from all links
  //         navLinks.forEach((l) => l.classList.remove("active"));
  //         // Add 'active' class to the clicked link
  //         event.currentTarget.classList.add("active");

  //         // OPTIONAL: Close the menu after a link is clicked on mobile
  //         if (window.innerWidth < 768) {
  //             navContainer.classList.remove('open');
  //             menuToggle.setAttribute('aria-expanded', 'false');
  //         }
  //     });
  // });

  // Set 'Places' as active by default on load (You had 'places-link', but no ID in HTML)
  // Re-adding the ID to the 'Places' link is necessary if you want this block to work.
  // For simplicity, I'll rely on the existing 'active' class in your HTML
});
