document.addEventListener("DOMContentLoaded", () => {
  const alert = document.getElementById("successAlert");
  const closeBtn = document.getElementById("closeAlertBtn");

  if (alert && alert.getAttribute("data-initial-render") === "true") {
    function dismissAlert() {
      if (alert.dataset.timerId) {
        clearTimeout(parseInt(alert.dataset.timerId));
        delete alert.dataset.timerId;
      }
      alert.classList.remove("show");
    }

    const autoDismissTimer = setTimeout(() => {
      dismissAlert();
    }, 5000);

    alert.dataset.timerId = autoDismissTimer;

    if (closeBtn) {
      closeBtn.addEventListener("click", dismissAlert);
    }
  }
});
