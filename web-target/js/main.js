// SkyBridge Airways controlled SOC lab website behaviour.
// No real payment, booking or credential processing is performed.

function showDemoMessage() {
  const statusMessage = document.getElementById("statusMessage");
  if (statusMessage) {
    statusMessage.style.display = "block";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const fareCards = document.querySelectorAll(".fare-card");
  const selectedFare = document.getElementById("selectedFare");
  const totalPrice = document.getElementById("totalPrice");

  fareCards.forEach(card => {
    card.addEventListener("click", () => {
      fareCards.forEach(c => {
        c.classList.remove("selected");
        const button = c.querySelector(".select-button");
        if (button) button.textContent = "Select";
      });

      card.classList.add("selected");
      const button = card.querySelector(".select-button");
      if (button) button.textContent = "Selected";

      const fare = card.dataset.fare || "Economy Saver";
      const price = parseInt(card.dataset.price || "89", 10);
      const total = price + 21;

      if (selectedFare) selectedFare.textContent = fare;
      if (totalPrice) totalPrice.textContent = "€" + total;
    });
  });

  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("nav a").forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPage) {
      link.classList.add("active");
    }
  });

  document.querySelectorAll("[data-demo-message]").forEach(element => {
    element.addEventListener("click", showDemoMessage);
  });
});
