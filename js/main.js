// Mobile nav toggle & Scroll animations fallbacks
document.addEventListener("DOMContentLoaded", function () {
  // Move keyboard focus with the skip link, not only the visual scroll position.
  var skipLink = document.querySelector(".skip-link");
  var mainContent = document.querySelector("#main-content");
  if (skipLink && mainContent) {
    skipLink.addEventListener("click", function () {
      mainContent.focus({ preventScroll: true });
    });
  }
  
  // --- Mobile Navigation Menu ---
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    if (!links.id) {
      links.id = "primary-navigation";
    }
    toggle.setAttribute("aria-controls", links.id);
    toggle.setAttribute("aria-label", "Open navigation");

    var closeNavigation = function () {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open navigation");
    };

    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
      var isOpen = links.classList.contains("open");
      toggle.setAttribute("aria-expanded", isOpen);
      toggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });

    links.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        closeNavigation();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && links.classList.contains("open")) {
        closeNavigation();
        toggle.focus();
      }
    });

    var desktopQuery = window.matchMedia("(min-width: 961px)");
    var handleDesktopChange = function (event) {
      if (event.matches) {
        closeNavigation();
      }
    };
    if (desktopQuery.addEventListener) {
      desktopQuery.addEventListener("change", handleDesktopChange);
    } else {
      desktopQuery.addListener(handleDesktopChange);
    }
  }

  // --- Lead Form Enhancements ---
  // Send every review CTA directly to the short form, skipping the former landing-page hero.
  document.querySelectorAll('a[href="free-review.html"]').forEach(function (link) {
    link.href = "free-review.html#free-review-form";
  });

  // --- Pricing CTA: keep the secondary mobile action out of the first viewport ---
  var pricingMobileCta = document.querySelector(".pricing-mobile-cta");
  var pricingHeroCta = document.querySelector(".pricing-hero-cta");
  if (pricingMobileCta && pricingHeroCta) {
    var pricingMobileQuery = window.matchMedia("(max-width: 700px)");
    var setPricingMobileCtaVisibility = function (heroIsVisible) {
      var shouldShow = pricingMobileQuery.matches && !heroIsVisible;
      pricingMobileCta.classList.toggle("is-visible", shouldShow);
      pricingMobileCta.setAttribute("aria-hidden", String(!shouldShow));
      document.body.classList.toggle("pricing-mobile-cta-visible", shouldShow);
    };

    if ("IntersectionObserver" in window) {
      var pricingHeroObserver = new IntersectionObserver(function (entries) {
        setPricingMobileCtaVisibility(entries[0].isIntersecting);
      }, { threshold: 0.01 });
      pricingHeroObserver.observe(pricingHeroCta);
    } else {
      var updatePricingMobileCta = function () {
        var rect = pricingHeroCta.getBoundingClientRect();
        setPricingMobileCtaVisibility(rect.bottom > 0 && rect.top < window.innerHeight);
      };
      updatePricingMobileCta();
      window.addEventListener("scroll", updatePricingMobileCta, { passive: true });
    }

    var handlePricingViewportChange = function () {
      var rect = pricingHeroCta.getBoundingClientRect();
      setPricingMobileCtaVisibility(rect.bottom > 0 && rect.top < window.innerHeight);
    };
    if (pricingMobileQuery.addEventListener) {
      pricingMobileQuery.addEventListener("change", handlePricingViewportChange);
    } else {
      pricingMobileQuery.addListener(handlePricingViewportChange);
    }
  }

  var form = document.querySelector("#free-review-form");
  if (form && window.location.hash === "#free-review-form") {
    window.requestAnimationFrame(function () {
      var header = document.querySelector(".site-header");
      window.scrollBy(0, -(header ? header.offsetHeight + 24 : 0));
      var emailInput = document.querySelector("#email");
      if (emailInput) emailInput.focus({ preventScroll: true });
    });
  }

  // --- Free Review Form ---
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
