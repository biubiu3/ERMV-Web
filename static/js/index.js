document.addEventListener("DOMContentLoaded", function () {
  const copyButton = document.querySelector(".copy-button");
  const scrollButton = document.querySelector(".scroll-top");
  const videos = Array.from(document.querySelectorAll("video"));

  videos.forEach(function (video) {
    video.addEventListener("play", function () {
      videos.forEach(function (otherVideo) {
        if (otherVideo !== video && !otherVideo.paused) {
          otherVideo.pause();
        }
      });
    });
  });

  if (copyButton) {
    copyButton.addEventListener("click", async function () {
      const target = document.getElementById(copyButton.dataset.copyTarget);
      const label = copyButton.querySelector("span");
      if (!target || !label) return;

      const originalLabel = label.textContent;
      try {
        await navigator.clipboard.writeText(target.innerText.trim());
        label.textContent = "Copied";
      } catch (_error) {
        label.textContent = "Select and copy";
      }

      window.setTimeout(function () {
        label.textContent = originalLabel;
      }, 1800);
    });
  }

  function updateScrollButton() {
    if (!scrollButton) return;
    scrollButton.classList.toggle("visible", window.scrollY > 500);
  }

  window.addEventListener("scroll", updateScrollButton, { passive: true });
  updateScrollButton();

  if (scrollButton) {
    scrollButton.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
