// Mobile nav toggle & Scroll animations fallbacks
document.addEventListener("DOMContentLoaded", function () {
  
  // --- Mobile Navigation Menu ---
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", links.classList.contains("open"));
      // Change burger menu icon between ☰ and ✕
      if (links.classList.contains("open")) {
        toggle.textContent = "✕";
      } else {
        toggle.textContent = "☰";
      }
    });
  }

  // --- Lead Form Demo Handler ---
  var form = document.querySelector("#free-review-form");
  if (form) {
    form.addEventListener("submit", function (e) {
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

  // --- Hero Contact Form Handler ---
  var heroForm = document.querySelector("#hero-contact-form");
  if (heroForm) {
    heroForm.addEventListener("submit", function (e) {
      if (heroForm.getAttribute("action") === "#") {
        e.preventDefault();
        var heroMsg = document.querySelector("#hero-success-message");
        if (heroMsg) {
          heroForm.hidden = true;
          heroMsg.hidden = false;
        }
      }
    });
  }

  // --- PROGRESSIVE ENHANCEMENT: Scroll-Driven Animation Fallbacks ---

  // 1. Fallback for shrinking header on scroll (e.g., Firefox, older Safari)
  if (!CSS.supports('(animation-timeline: scroll()) and (animation-range: 0% 100%)')) {
    var header = document.querySelector(".site-header");
    if (header) {
      var handleScroll = function () {
        if (window.scrollY > 40) {
          header.classList.add("shrunk");
        } else {
          header.classList.remove("shrunk");
        }
      };
      
      // Initial trigger in case page starts scrolled down
      handleScroll();
      window.addEventListener("scroll", handleScroll, { passive: true });
    }
  }

  // 2. Fallback for scroll-entry-exit reveal animations (e.g., Firefox, older Safari)
  if (!CSS.supports('(animation-timeline: view()) and (animation-range: entry)')) {
    // If IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
      var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            // Once revealed, we don't need to observe it anymore
            revealObserver.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px" // triggers slightly before entering viewport fully
      });

      document.querySelectorAll(".reveal-on-scroll").forEach(function (el) {
        revealObserver.observe(el);
      });
    } else {
      // Fallback fallback: just show the elements if browser is ancient
      document.querySelectorAll(".reveal-on-scroll").forEach(function (el) {
        el.classList.add("revealed");
      });
    }
  }
});
