const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}

// Close navbar when link is clicked
const navLink = document.querySelectorAll(".nav-link");

navLink.forEach((n) => n.addEventListener("click", closeMenu));

function closeMenu() {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
}

// On narrow screens the maps are wider than the screen and scroll sideways.
// Start each one at the fraction given in data-map-start; the campus map defaults to
// x = 1100 of its 2576px image, so both S-Bahn exits, both routes, the pin and the venue are in view
const mapScrollers = document.querySelectorAll(".vm-scroller");

function centreMaps() {
  mapScrollers.forEach((scroller) => {
    const canvas = scroller.firstElementChild;
    const start = parseFloat(scroller.dataset.mapStart || 1100 / 2576);

    if (canvas.offsetWidth > scroller.clientWidth) {
      scroller.scrollLeft = canvas.offsetWidth * start;
    }
  });
}

if (mapScrollers.length) {
  centreMaps();
  window.addEventListener("orientationchange", () => setTimeout(centreMaps, 300));
}
