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

// On narrow screens, start the scrollable campus map at x = 1100 of the 2576px image:
// both S-Bahn exits, both routes, the pin and the venue are then in view
const mapScroller = document.querySelector(".vm-scroller");

function centreMap() {
  const mapCanvas = mapScroller.firstElementChild;

  if (mapCanvas.offsetWidth > mapScroller.clientWidth) {
    mapScroller.scrollLeft = mapCanvas.offsetWidth * (1100 / 2576);
  }
}

if (mapScroller) {
  centreMap();
  window.addEventListener("orientationchange", () => setTimeout(centreMap, 300));
}
