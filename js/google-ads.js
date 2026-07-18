// Google Ads site-wide tag.
(function (window, document) {
  "use strict";

  var GOOGLE_ADS_ID = "AW-18071301983";

  if (window.__spurGoogleAdsLoaded) return;
  window.__spurGoogleAdsLoaded = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () {
    window.dataLayer.push(arguments);
  };

  window.gtag("js", new Date());
  window.gtag("config", GOOGLE_ADS_ID);

  var script = document.createElement("script");
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(GOOGLE_ADS_ID);
  document.head.appendChild(script);
})(window, document);
