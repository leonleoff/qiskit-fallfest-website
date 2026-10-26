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

// On narrow screens, start the scrollable campus map with pin, routes and venue in view
const mapScroller = document.querySelector(".vm-scroller");

if (mapScroller) {
  const mapCanvas = mapScroller.firstElementChild;

  if (mapCanvas.offsetWidth > mapScroller.clientWidth) {
    mapScroller.scrollLeft = mapCanvas.offsetWidth * (2470 / 2576) - mapScroller.clientWidth;
  }
}
