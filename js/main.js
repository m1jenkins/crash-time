// Mobile nav toggle
document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", links.classList.contains("open"));
    });
  }

  // Lead form: placeholder handler until a real backend/form service is wired up.
  var form = document.querySelector("#free-review-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      // Remove this block once the form `action` points at a real endpoint
      // (e.g. Formspree, Netlify Forms, or your own API).
      if (form.getAttribute("action") === "#") {
        e.preventDefault();
        var msg = document.querySelector("#form-success");
        if (msg) {
          form.hidden = true;
          msg.hidden = false;
          msg.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    });
  }
});
