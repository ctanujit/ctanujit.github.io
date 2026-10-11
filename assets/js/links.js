(function () {
  var file = /\.(pdf|zip|ipynb|png|jpe?g|gif|webp|pptx?|docx?|xlsx?)($|\?)/i;
  document.querySelectorAll("a[href]").forEach(function (anchor) {
    if (anchor.target === "_blank") return;
    var href = anchor.getAttribute("href");
    if (!href || href.charAt(0) === "#" || href.indexOf("mailto:") === 0) return;
    var url;
    try { url = new URL(href, window.location.origin); }
    catch (error) { return; }
    var external = url.origin !== window.location.origin;
    var download = file.test(url.pathname);
    if (!external && !download) return;
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
    anchor.classList.add("is-external");
    if (!anchor.querySelector(".sr-only")) {
      var note = document.createElement("span");
      note.className = "sr-only";
      note.textContent = " (opens in a new tab)";
      anchor.appendChild(note);
    }
  });

  document.querySelectorAll("img").forEach(function (img) {
    function drop() {
      var frame = img.closest("li, figure");
      img.remove();
      if (frame && !frame.querySelector("img, h2, h3, p, strong, a")) frame.remove();
    }
    if (img.complete && img.naturalWidth === 0 && img.src) drop();
    else img.addEventListener("error", drop);
  });
})();
