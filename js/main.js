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

  // State Selector Auto-Navigation
  var stateSelect = document.querySelector("#state-select");
  if (stateSelect) {
    stateSelect.addEventListener("change", function () {
      if (this.value) {
        window.location.href = this.value;
      }
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

  // --- Copyable guide templates ---
  document.querySelectorAll("[data-copy-target]").forEach(function (button) {
    button.addEventListener("click", function () {
      var target = document.querySelector(button.getAttribute("data-copy-target"));
      if (!target) return;

      var copyText = target.textContent.trim();
      var originalLabel = button.textContent;
      var showCopyResult = function (label) {
        button.textContent = label;
        window.setTimeout(function () {
          button.textContent = originalLabel;
        }, 2000);
      };
      var fallbackCopy = function () {
        var field = document.createElement("textarea");
        field.value = copyText;
        field.setAttribute("readonly", "");
        field.style.position = "fixed";
        field.style.opacity = "0";
        document.body.appendChild(field);
        field.select();
        var copied = document.execCommand("copy");
        document.body.removeChild(field);
        showCopyResult(copied ? "Copied" : "Select and copy below");
      };

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(copyText).then(function () {
          showCopyResult("Copied");
        }).catch(fallbackCopy);
      } else {
        fallbackCopy();
      }
    });
  });

  // --- Customer outcome selector ---
  var outcomeTabs = Array.prototype.slice.call(document.querySelectorAll(".outcome-tab"));
  var outcomePanel = document.querySelector("#outcome-panel");
  if (outcomeTabs.length && outcomePanel) {
    var outcomeReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    var outcomeVehicle = outcomePanel.querySelector("[data-outcome-vehicle]");
    var outcomeOffer = outcomePanel.querySelector("[data-outcome-offer]");
    var outcomePayment = outcomePanel.querySelector("[data-outcome-payment]");
    var outcomeRecovered = outcomePanel.querySelector("[data-outcome-recovered]");
    var outcomeImage = outcomePanel.querySelector("[data-outcome-image]");
    var outcomePlaceholder = outcomePanel.querySelector("[data-outcome-placeholder]");

    var selectOutcome = function (tab, shouldFocus) {
      outcomeTabs.forEach(function (item) {
        var isSelected = item === tab;
        item.classList.toggle("is-active", isSelected);
        item.setAttribute("aria-selected", String(isSelected));
        item.tabIndex = isSelected ? 0 : -1;
      });

      outcomePanel.setAttribute("aria-labelledby", tab.id);
      outcomeVehicle.textContent = tab.dataset.vehicle;
      outcomeOffer.textContent = tab.dataset.offer;
      outcomePayment.textContent = tab.dataset.payment;
      outcomeRecovered.textContent = tab.dataset.recovered;

      if (tab.dataset.photoSrc) {
        outcomeImage.src = tab.dataset.photoSrc;
        outcomeImage.alt = tab.dataset.photoAlt || tab.dataset.vehicle;
        outcomeImage.hidden = false;
        outcomePlaceholder.hidden = true;
      } else {
        outcomeImage.removeAttribute("src");
        outcomeImage.alt = "";
        outcomeImage.hidden = true;
        outcomePlaceholder.hidden = false;
      }

      if (shouldFocus) {
        tab.focus();
      }
    };

    outcomeTabs.forEach(function (tab, index) {
      tab.addEventListener("click", function () {
        selectOutcome(tab, false);
      });

      tab.addEventListener("keydown", function (event) {
        var nextIndex = index;
        if (event.key === "ArrowRight") nextIndex = (index + 1) % outcomeTabs.length;
        if (event.key === "ArrowLeft") nextIndex = (index - 1 + outcomeTabs.length) % outcomeTabs.length;
        if (event.key === "Home") nextIndex = 0;
        if (event.key === "End") nextIndex = outcomeTabs.length - 1;

        if (nextIndex !== index) {
          event.preventDefault();
          selectOutcome(outcomeTabs[nextIndex], true);
          outcomeTabs[nextIndex].scrollIntoView({ behavior: outcomeReducedMotion.matches ? "auto" : "smooth", block: "nearest", inline: "center" });
        }
      });
    });
  }

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
