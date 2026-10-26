// Registration switch.
// To open registration, set REGISTRATION_OPEN to true, commit and push.
// The hero button and the floating button then link to the Tally form (new tab) and the
// "Registration opens ..." texts are swapped for "Registration is open!".
// While it is false the page looks exactly like before and the form is unreachable.
const REGISTRATION_OPEN = true;
const REGISTRATION_URL = "https://tally.so/r/obra9x";

if (REGISTRATION_OPEN) {
  const registrationButton = document.getElementById("registration-button");

  registrationButton.href = REGISTRATION_URL;
  registrationButton.target = "_blank";
  registrationButton.rel = "noopener";
  registrationButton.classList.remove("btn-disabled");
  registrationButton.removeAttribute("aria-disabled");
  registrationButton.textContent = "Register now";

  document.querySelectorAll("[data-registration]").forEach((el) => {
    el.hidden = el.dataset.registration !== "open";
  });

  // Floating button: always reachable while scrolling, but hidden while the
  // hero button itself is on screen so the two never show at the same time.
  const floatingButton = document.getElementById("registration-float");

  floatingButton.href = REGISTRATION_URL;
  floatingButton.target = "_blank";
  floatingButton.rel = "noopener";
  floatingButton.hidden = false;

  new IntersectionObserver(([entry]) => {
    floatingButton.classList.toggle("is-visible", !entry.isIntersecting);
  }).observe(registrationButton);
}
