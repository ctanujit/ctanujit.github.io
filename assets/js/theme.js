(function () {
  var root = document.documentElement;
  var button = document.getElementById("theme-toggle");

  if (!button) return;

  function updateButton(theme) {
    if (theme === "dark") {
      button.setAttribute("aria-label", "Switch to light mode");
      button.setAttribute("title", "Switch to light mode");
    } else {
      button.setAttribute("aria-label", "Switch to dark mode");
      button.setAttribute("title", "Switch to dark mode");
    }
  }

  function setTheme(theme) {
    root.dataset.theme = theme;

    try {
      localStorage.setItem("site-theme", theme);
    } catch (e) {}

    updateButton(theme);
  }

  var currentTheme = root.dataset.theme || "dark";
  updateButton(currentTheme);

  button.addEventListener("click", function () {
    var nextTheme =
      root.dataset.theme === "dark"
        ? "light"
        : "dark";

    setTheme(nextTheme);
  });
})();