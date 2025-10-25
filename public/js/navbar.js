function setupNavbarToggle() {
  const button = document.getElementById("mobile-menu-button");
  const menu = document.getElementById("mobile-menu");
  if (button && menu) {
    button.addEventListener("click", () => {
      menu.classList.toggle("hidden");
      // Re-render icons after DOM modification
      lucide.createIcons();
    });
  }
}

