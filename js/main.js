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

  // --- Pricing chooser: map the two customer decisions to the four real packages. ---
  var pricingChooser = document.querySelector("[data-pricing-chooser]");
  if (pricingChooser) {
    var pricingPackages = {
      "standard:report": {
        key: "essential",
        name: "Essential",
        price: "99",
        summary: "Complete report for a standard-production vehicle",
        benefits: [
          "Independent vehicle value report",
          "Line-by-line valuation audit",
          "Verified replacement comparables",
          "General demand and response templates"
        ],
        href: "https://buy.stripe.com/3cIfZg6fUcmA7vO8vl9MY04",
        cta: "Choose Essential - $99",
        mobileLabel: "Essential · $99",
        mobileCta: "Choose Essential"
      },
      "standard:guided": {
        key: "guided",
        name: "Guided",
        price: "299",
        summary: "Report + help with insurer replies",
        benefits: [
          "Everything in Essential",
          "Claim-specific demand package",
          "Help reviewing insurer emails",
          "Replies drafted with you"
        ],
        href: "https://buy.stripe.com/fZu4gyeMq9aodUc9zp9MY02",
        cta: "Choose Guided - $299",
        mobileLabel: "Guided · $299",
        mobileCta: "Choose Guided"
      },
      "specialty:report": {
        key: "specialty",
        name: "Specialty",
        price: "299",
        summary: "Expanded research for a rare, modified, or high-value vehicle",
        benefits: [
          "Everything in Essential",
          "VIN and factory build-sheet research",
          "Niche and expanded-market comparables",
          "Specialty-value appendix"
        ],
        href: "https://buy.stripe.com/fZueVcbAe0DS8zS12T9MY03",
        cta: "Choose Specialty - $299",
        mobileLabel: "Specialty · $299",
        mobileCta: "Choose Specialty"
      },
      "specialty:guided": {
        key: "specialty-guided",
        name: "Specialty + Guided",
        price: "449",
        summary: "Expanded research + help with insurer replies",
        benefits: [
          "Everything in Specialty",
          "Guided document support",
          "Help reviewing insurer emails",
          "Select Guided support at checkout"
        ],
        href: "https://buy.stripe.com/fZueVcbAe0DS8zS12T9MY03",
        cta: "Choose Specialty + Guided - $449",
        mobileLabel: "Specialty + Guided · $449",
        mobileCta: "Choose package"
      }
    };

    var pricingChoiceResult = pricingChooser.querySelector("[data-choice-result]");
    var pricingChoiceName = pricingChooser.querySelector("[data-choice-name]");
    var pricingChoicePrice = pricingChooser.querySelector("[data-choice-price]");
    var pricingChoicePriceWrap = pricingChooser.querySelector("[data-choice-price-wrap]");
    var pricingChoiceSummary = pricingChooser.querySelector("[data-choice-summary]");
    var pricingChoiceBenefits = pricingChooser.querySelectorAll("[data-choice-benefit]");
    var pricingChoiceCta = pricingChooser.querySelector("[data-choice-cta]");
    var pricingChoiceStatus = pricingChooser.querySelector("[data-choice-status]");
    var pricingMobilePlanLabel = document.querySelector("[data-mobile-plan-label]");
    var pricingMobilePlanCta = document.querySelector("[data-mobile-plan-cta]");

    var renderPricingChoice = function (announce) {
      var vehicleInput = pricingChooser.querySelector('input[name="pricing-vehicle"]:checked');
      var supportInput = pricingChooser.querySelector('input[name="pricing-support"]:checked');
      if (!vehicleInput || !supportInput) return;

      var selectedPackage = pricingPackages[vehicleInput.value + ":" + supportInput.value];
      if (!selectedPackage) return;

      pricingChoiceResult.setAttribute("data-plan", selectedPackage.key);
      pricingChoiceName.textContent = selectedPackage.name;
      pricingChoicePrice.textContent = selectedPackage.price;
      pricingChoicePriceWrap.setAttribute("aria-label", "$" + selectedPackage.price + " one time");
      pricingChoiceSummary.textContent = selectedPackage.summary;
      pricingChoiceBenefits.forEach(function (benefit, index) {
        benefit.textContent = selectedPackage.benefits[index];
      });
      pricingChoiceCta.href = selectedPackage.href;
      pricingChoiceCta.textContent = selectedPackage.cta;

      if (pricingMobilePlanLabel) {
        pricingMobilePlanLabel.textContent = selectedPackage.mobileLabel;
      }
      if (pricingMobilePlanCta) {
        pricingMobilePlanCta.href = selectedPackage.href;
        pricingMobilePlanCta.textContent = selectedPackage.mobileCta;
        pricingMobilePlanCta.setAttribute("aria-label", selectedPackage.cta);
      }
      if (announce && pricingChoiceStatus) {
        pricingChoiceStatus.textContent = selectedPackage.name + " selected, $" + selectedPackage.price + " one time.";
      }
    };

    pricingChooser.addEventListener("change", function (event) {
      if (event.target.matches('input[type="radio"]')) {
        renderPricingChoice(true);
      }
    });

    renderPricingChoice(false);
    pricingChooser.hidden = false;
  }

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
