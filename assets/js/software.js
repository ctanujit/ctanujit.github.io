(function () {
  var art = document.querySelector(".software-hero-art");
  if (art && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    art.classList.add("is-animated");
  }

  var buttons = document.querySelectorAll(".software-copy");
  if (!buttons.length) return;

  function restore(button, feedback, timer) {
    window.clearTimeout(timer);
    return window.setTimeout(function () {
      button.classList.remove("is-copied");
      if (feedback) feedback.textContent = "";
    }, 1600);
  }

  function fallbackCopy(text, done) {
    var field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.left = "-9999px";
    document.body.appendChild(field);
    field.select();
    try { document.execCommand("copy"); } catch (error) {}
    document.body.removeChild(field);
    done();
  }

  buttons.forEach(function (button) {
    var timer;
    var feedback = button.querySelector(".software-copy-feedback");
    button.addEventListener("click", function () {
      var text = button.getAttribute("data-copy") || "";
      if (!text) return;
      function done() {
        button.classList.add("is-copied");
        if (feedback) feedback.textContent = "Copied";
        timer = restore(button, feedback, timer);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(function () {
          fallbackCopy(text, done);
        });
      } else {
        fallbackCopy(text, done);
      }
    });
  });
})();
