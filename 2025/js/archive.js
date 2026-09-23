// Keeps --archive-banner-height in sync with the banner's real height, so the
// fixed navbar and the hero stay clear of it when the text wraps on narrow
// screens.
(function () {
  const banner = document.querySelector(".archive-banner");
  if (!banner) return;

  function syncHeight() {
    document.documentElement.style.setProperty(
      "--archive-banner-height",
      banner.offsetHeight + "px"
    );
  }

  syncHeight();
  window.addEventListener("resize", syncHeight);
  if (window.ResizeObserver) new ResizeObserver(syncHeight).observe(banner);
})();
