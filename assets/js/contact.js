(function () {
  var trigger = document.getElementById("contact-trigger");
  var panel = document.getElementById("contact-panel");
  var closeButton = document.getElementById("contact-panel-close");

  if (!trigger || !panel) return;


  function openPanel() {
    panel.hidden = false;
    trigger.setAttribute("aria-expanded", "true");

    /*
     * If the mobile navigation is open,
     * close it when the contact drawer opens.
     */
    var nav = document.getElementById("site-nav");
    var navToggle = document.querySelector(".nav-toggle");

    if (nav && nav.classList.contains("is-open")) {
      nav.classList.remove("is-open");

      if (navToggle) {
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.textContent = "Menu";
      }
    }
  }


  function closePanel() {
    panel.hidden = true;
    trigger.setAttribute("aria-expanded", "false");
  }


  function togglePanel() {
    if (panel.hidden) {
      openPanel();
    } else {
      closePanel();
    }
  }


  trigger.addEventListener("click", function (event) {
    event.stopPropagation();
    togglePanel();
  });


  if (closeButton) {
    closeButton.addEventListener("click", function () {
      closePanel();
      trigger.focus();
    });
  }


  panel.addEventListener("click", function (event) {
    event.stopPropagation();
  });


  document.addEventListener("click", function () {
    if (!panel.hidden) {
      closePanel();
    }
  });


  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !panel.hidden) {
      closePanel();
      trigger.focus();
    }
  });
})();
