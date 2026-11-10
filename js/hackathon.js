// Hackathon repository switch.
// To enable the repository buttons, set HACKATHON_REPOS_OPEN to true, commit and push.
// The buttons in the Hackathon section then link to their GitHub repositories (new tab).
const HACKATHON_REPOS_OPEN = true;

if (HACKATHON_REPOS_OPEN) {
  document.querySelectorAll("[data-repo-url]").forEach((button) => {
    button.href = button.dataset.repoUrl;
    button.target = "_blank";
    button.rel = "noopener";
    button.classList.remove("btn-disabled");
    button.removeAttribute("aria-disabled");
    button.textContent = "View repository on GitHub";
  });
}
