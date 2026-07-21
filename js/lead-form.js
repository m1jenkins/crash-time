// Resilient, progressively enhanced Web3Forms lead submission.
(function (root, factory) {
  "use strict";

  var api = factory();

  if (typeof module === "object" && module.exports) {
    module.exports = api;
  }

  if (root && root.document) {
    root.SpurAutoLeadForms = api;
    api.init(root.document, { window: root });
  }
})(typeof window !== "undefined" ? window : null, function () {
  "use strict";

  var DEFAULT_TIMEOUT_MS = 45000;
  var DEFAULT_REDIRECT_DELAY_MS = 750;
  var MAX_FILE_BYTES = 5 * 1024 * 1024;
  var ALLOWED_FILE_TYPES = ["application/pdf", "image/jpeg", "image/png"];
  var ALLOWED_FILE_EXTENSIONS = ["pdf", "jpg", "jpeg", "png"];

  function createSubmissionId(win) {
    if (win.crypto && typeof win.crypto.randomUUID === "function") {
      return win.crypto.randomUUID();
    }

    return "lead-" + Date.now() + "-" + Math.random().toString(16).slice(2);
  }

  function supportsEnhancement(win) {
    return Boolean(
      win &&
      typeof win.fetch === "function" &&
      typeof win.FormData === "function" &&
      typeof win.AbortController === "function" &&
      typeof win.CustomEvent === "function"
    );
  }

  function appendDescription(field, id) {
    var current = (field.getAttribute("aria-describedby") || "").trim();
    var ids = current ? current.split(/\s+/) : [];
    if (ids.indexOf(id) === -1) ids.push(id);
    field.setAttribute("aria-describedby", ids.join(" "));
  }

  function removeDescription(field, id) {
    var current = (field.getAttribute("aria-describedby") || "").trim();
    var ids = current ? current.split(/\s+/) : [];
    var next = ids.filter(function (item) { return item !== id; });
    if (next.length) field.setAttribute("aria-describedby", next.join(" "));
    else field.removeAttribute("aria-describedby");
  }

  function fieldLabel(field) {
    if (field.labels && field.labels.length) {
      return field.labels[0].textContent.replace(/\s*\*\s*$/, "").trim();
    }
    return field.name || "This field";
  }

  function ensureFieldId(field, formId, index) {
    if (!field.id) field.id = (formId || "lead-form") + "-field-" + index;
    return field.id;
  }

  function validateAttachment(field) {
    if (!field || field.type !== "file" || !field.files || !field.files.length) {
      if (field && field.dataset.leadFileError === "true") {
        field.setCustomValidity("");
        delete field.dataset.leadFileError;
      }
      return "";
    }

    var file = field.files[0];
    var extension = String(file.name || "").split(".").pop().toLowerCase();
    var typeAllowed = ALLOWED_FILE_TYPES.indexOf(String(file.type || "").toLowerCase()) !== -1;
    var extensionAllowed = ALLOWED_FILE_EXTENSIONS.indexOf(extension) !== -1;
    var message = "";

    if (!typeAllowed && !extensionAllowed) {
      message = "Choose a PDF, JPG, or PNG file.";
    } else if (Number(file.size) > MAX_FILE_BYTES) {
      message = "Choose a file that is 5 MB or smaller.";
    }

    field.setCustomValidity(message);
    if (message) field.dataset.leadFileError = "true";
    else delete field.dataset.leadFileError;
    return message;
  }

  function responseState(status) {
    if (status === 400) return "client-error";
    if (status === 429) return "rate-limited";
    return "server-error";
  }

  function stateMessage(state) {
    var messages = {
      "client-error": "We couldn’t send this request. Check your details and attachment, then try again.",
      "rate-limited": "Too many requests were received. Wait a moment, then try again.",
      "server-error": "We couldn’t send your request right now. Your information is still here. Try again.",
      "offline": "You appear to be offline. Your information is still here. Reconnect, then try again.",
      "timeout": "The request took too long. Your information is still here. Try again."
    };
    return messages[state] || messages["server-error"];
  }

  function createFeedback(doc, submitButton) {
    var feedback = doc.createElement("div");
    feedback.className = "lead-form-feedback";
    feedback.setAttribute("data-lead-feedback", "");

    var status = doc.createElement("p");
    status.className = "lead-form-status";
    status.setAttribute("data-lead-status", "");
    status.setAttribute("role", "status");
    status.setAttribute("aria-live", "polite");
    status.setAttribute("aria-atomic", "true");
    status.hidden = true;

    var summary = doc.createElement("div");
    summary.className = "lead-form-error-summary";
    summary.setAttribute("data-lead-error-summary", "");
    summary.setAttribute("role", "alert");
    summary.setAttribute("tabindex", "-1");
    summary.hidden = true;

    var summaryMessage = doc.createElement("p");
    summaryMessage.className = "lead-form-error-message";
    summaryMessage.setAttribute("data-lead-error-message", "");

    var summaryList = doc.createElement("ul");
    summaryList.className = "lead-form-error-list";
    summaryList.setAttribute("data-lead-error-list", "");
    summaryList.hidden = true;

    var retry = doc.createElement("button");
    retry.type = "button";
    retry.className = "btn lead-form-retry";
    retry.setAttribute("data-lead-retry", "");
    retry.textContent = "Try again";
    retry.hidden = true;

    summary.appendChild(summaryMessage);
    summary.appendChild(summaryList);
    summary.appendChild(retry);
    feedback.appendChild(status);
    feedback.appendChild(summary);
    var buttonParent = submitButton.parentElement || submitButton.parentNode;
    var parentClasses = buttonParent && typeof buttonParent.className === "string"
      ? (" " + buttonParent.className + " ")
      : "";
    var feedbackAnchor = parentClasses.indexOf(" form-actions ") !== -1
      ? buttonParent
      : submitButton;
    feedbackAnchor.insertAdjacentElement("afterend", feedback);

    return {
      feedback: feedback,
      status: status,
      summary: summary,
      summaryMessage: summaryMessage,
      summaryList: summaryList,
      retry: retry
    };
  }

  function enhanceForm(form, options) {
    options = options || {};
    var win = options.window || (typeof window !== "undefined" ? window : null);
    var doc = options.document || (win && win.document);
    if (!form || !doc || form.dataset.leadController === "true") return null;
    if (!supportsEnhancement(win)) return null;

    var submitButton = form.querySelector('button[type="submit"], input[type="submit"]');
    var redirectInput = form.querySelector('input[name="redirect"]');
    if (!submitButton || !redirectInput || !redirectInput.value) return null;

    var timeoutMs = Number(options.timeoutMs) || DEFAULT_TIMEOUT_MS;
    var redirectDelayMs = options.redirectDelayMs === 0
      ? 0
      : (Number(options.redirectDelayMs) || DEFAULT_REDIRECT_DELAY_MS);
    var createFormData = options.createFormData || function () { return new win.FormData(form); };
    var request = options.fetch || win.fetch.bind(win);
    var setTimer = options.setTimeout || win.setTimeout.bind(win);
    var clearTimer = options.clearTimeout || win.clearTimeout.bind(win);
    var ui = createFeedback(doc, submitButton);
    var originalButtonHtml = submitButton.innerHTML;
    var active = false;
    var hasFailed = false;
    var invalidSummaryTimer = null;
    var submissionId = createSubmissionId(win);
    var fields = Array.prototype.slice.call(form.querySelectorAll("input, select, textarea"));

    form.dataset.leadController = "true";
    form.dataset.leadEnhanced = "true";
    form.dataset.leadSubmissionId = submissionId;
    form.dataset.submitState = "idle";

    function setButtonBusy(message) {
      submitButton.disabled = true;
      submitButton.setAttribute("aria-disabled", "true");
      submitButton.textContent = message;
    }

    function restoreButton() {
      submitButton.disabled = false;
      submitButton.removeAttribute("aria-disabled");
      submitButton.innerHTML = originalButtonHtml;
    }

    function hideFeedback() {
      ui.status.hidden = true;
      ui.status.textContent = "";
      ui.summary.hidden = true;
      ui.summaryMessage.textContent = "";
      ui.summaryList.textContent = "";
      ui.summaryList.hidden = true;
      ui.retry.hidden = true;
    }

    function setStatus(state, message) {
      form.dataset.submitState = state;
      ui.summary.hidden = true;
      ui.status.textContent = message;
      ui.status.hidden = false;
    }

    function showAsyncError(state, message) {
      active = false;
      hasFailed = true;
      restoreButton();
      form.dataset.submitState = state;
      ui.status.hidden = true;
      ui.status.textContent = "";
      ui.summaryMessage.textContent = message || stateMessage(state);
      ui.summaryList.textContent = "";
      ui.summaryList.hidden = true;
      ui.retry.hidden = false;
      ui.summary.hidden = false;
      ui.summary.focus();
    }

    function clearFieldError(field) {
      var errorId = field.dataset.leadErrorId;
      if (errorId) {
        var error = doc.getElementById(errorId);
        if (error) error.remove();
        removeDescription(field, errorId);
        delete field.dataset.leadErrorId;
      }
      if (field.validity && field.validity.valid) field.removeAttribute("aria-invalid");
    }

    function markFieldInvalid(field, message, index) {
      var fieldId = ensureFieldId(field, form.id, index);
      var errorId = fieldId + "-error";
      var error = doc.getElementById(errorId);

      field.setAttribute("aria-invalid", "true");
      if (!error) {
        error = doc.createElement("p");
        error.id = errorId;
        error.className = "lead-form-field-error";
        error.setAttribute("data-lead-field-error", "");
        field.insertAdjacentElement("afterend", error);
      }
      error.textContent = message || "Review this field.";
      field.dataset.leadErrorId = errorId;
      appendDescription(field, errorId);
    }

    function invalidFields() {
      return fields.filter(function (field) {
        return field.type !== "hidden" && field.validity && !field.validity.valid;
      });
    }

    function showValidationSummary() {
      var invalid = invalidFields();
      if (!invalid.length) return;

      form.dataset.submitState = "invalid";
      ui.status.hidden = true;
      ui.status.textContent = "";
      ui.summaryMessage.textContent = "Please correct the following information:";
      ui.summaryList.textContent = "";

      invalid.forEach(function (field, index) {
        markFieldInvalid(field, field.validationMessage, index);
        var item = doc.createElement("li");
        var link = doc.createElement("a");
        link.href = "#" + field.id;
        link.textContent = fieldLabel(field) + ": " + (field.validationMessage || "Review this field.");
        link.addEventListener("click", function (event) {
          event.preventDefault();
          field.focus();
        });
        item.appendChild(link);
        ui.summaryList.appendChild(item);
      });

      ui.summaryList.hidden = false;
      ui.retry.hidden = true;
      ui.summary.hidden = false;
      ui.summary.focus();
    }

    function scheduleValidationSummary() {
      if (invalidSummaryTimer !== null) clearTimer(invalidSummaryTimer);
      invalidSummaryTimer = setTimer(function () {
        invalidSummaryTimer = null;
        showValidationSummary();
      }, 0);
    }

    fields.forEach(function (field, index) {
      if (field.type === "file") {
        field.addEventListener("change", function () {
          validateAttachment(field);
          if (field.validity.valid) clearFieldError(field);
          else markFieldInvalid(field, field.validationMessage, index);
        });
      }

      field.addEventListener("input", function () {
        if (field.validity && field.validity.valid) clearFieldError(field);
      });
    });

    form.addEventListener("invalid", function (event) {
      var index = fields.indexOf(event.target);
      markFieldInvalid(event.target, event.target.validationMessage, index < 0 ? 0 : index);
      scheduleValidationSummary();
    }, true);

    ui.retry.addEventListener("click", function () {
      hideFeedback();
      if (typeof form.requestSubmit === "function") form.requestSubmit(submitButton);
      else submitButton.click();
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (active) return;

      form.dataset.submitState = "validating";
      fields.forEach(function (field) {
        if (field.type === "file") validateAttachment(field);
      });

      if (!form.checkValidity()) {
        form.reportValidity();
        showValidationSummary();
        return;
      }

      hideFeedback();
      active = true;
      setButtonBusy(hasFailed ? "Trying again…" : "Sending request…");
      setStatus(hasFailed ? "retrying" : "submitting", hasFailed ? "Trying again…" : "Sending your review request…");

      var controller = new win.AbortController();
      var timedOut = false;
      var timeout = setTimer(function () {
        timedOut = true;
        controller.abort();
      }, timeoutMs);
      var formData = createFormData(form);
      if (typeof formData.delete === "function") formData.delete("redirect");
      if (typeof formData.set === "function") formData.set("submission_id", submissionId);
      else formData.append("submission_id", submissionId);

      request(form.action, {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: formData,
        signal: controller.signal
      }).then(function (response) {
        return response.json().then(function (payload) {
          return { response: response, payload: payload, parseError: false };
        }, function () {
          return { response: response, payload: null, parseError: true };
        });
      }).then(function (result) {
        clearTimer(timeout);
        if (result.parseError) {
          showAsyncError("server-error");
          return;
        }
        if (!result.response.ok || !result.payload || result.payload.success !== true) {
          showAsyncError(responseState(result.response.status));
          return;
        }

        active = false;
        submitButton.disabled = true;
        submitButton.setAttribute("aria-disabled", "true");
        submitButton.textContent = "Request received";
        setStatus("success", "Request received. Opening your next steps…");

        form.dispatchEvent(new win.CustomEvent("spurauto:lead-confirmed", {
          bubbles: true,
          detail: {
            submissionId: submissionId,
            formId: form.id || "lead-form",
            provider: "web3forms"
          }
        }));

        setTimer(function () {
          win.location.assign(redirectInput.value);
        }, redirectDelayMs);
      }).catch(function () {
        clearTimer(timeout);
        if (timedOut) showAsyncError("timeout");
        else if (win.navigator && win.navigator.onLine === false) showAsyncError("offline");
        else showAsyncError(
          "server-error",
          "We couldn’t connect to send your request. Your information is still here. Try again."
        );
      });
    });

    return {
      form: form,
      retry: function () { ui.retry.click(); },
      submissionId: submissionId,
      ui: ui
    };
  }

  function init(doc, options) {
    options = options || {};
    var win = options.window || (typeof window !== "undefined" ? window : null);
    if (!doc || !win) return [];

    return Array.prototype.map.call(doc.querySelectorAll("form[data-lead-form]"), function (form) {
      var formOptions = {};
      Object.keys(options).forEach(function (key) { formOptions[key] = options[key]; });
      formOptions.window = win;
      formOptions.document = doc;
      return enhanceForm(form, formOptions);
    }).filter(Boolean);
  }

  return {
    ALLOWED_FILE_EXTENSIONS: ALLOWED_FILE_EXTENSIONS,
    ALLOWED_FILE_TYPES: ALLOWED_FILE_TYPES,
    DEFAULT_REDIRECT_DELAY_MS: DEFAULT_REDIRECT_DELAY_MS,
    DEFAULT_TIMEOUT_MS: DEFAULT_TIMEOUT_MS,
    MAX_FILE_BYTES: MAX_FILE_BYTES,
    createSubmissionId: createSubmissionId,
    enhanceForm: enhanceForm,
    init: init,
    responseState: responseState,
    stateMessage: stateMessage,
    supportsEnhancement: supportsEnhancement,
    validateAttachment: validateAttachment
  };
});
