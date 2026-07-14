# Totaled Texas - Design System Rules for AI Coding Assistants

This file contains strict design rules and behavioral constraints for all AI coding assistants (LLMs) working on the Totaled Texas website. Please review and adhere to these guidelines to maintain visual excellence, consistency, and proper contrast.

---

## 1. Visual Hierarchy & Badges
* **No Pill Shapes for Eyebrows/Labels**:
  - Do NOT style eyebrow labels or section tags (e.g. `.eyebrow`, `.offer-card-label`) with background pills, rounded borders, or padding.
  - Eyebrows should be formatted as flat, uppercase text with letter-spacing (e.g., `letter-spacing: 0.14em;`) and bold weights.
  - Example:
    ```css
    .eyebrow {
      display: inline-block;
      text-transform: uppercase;
      letter-spacing: 0.14em;
      font-size: 0.78rem;
      font-weight: 800;
      color: var(--amber-dark);
      margin-bottom: 0.8rem;
    }
    ```

## 2. Text Contrast & Background Compatibility
* **Dark Background Components (e.g., Hero, CTA Bands)**:
  - Do NOT allow inner elements (like paragraphs `<p>`, citations `<cite>`, or cards) to fall back to the default dark body text (`color: var(--ink)`).
  - Explicitly override inner text colors to high-contrast colors (e.g., `#fff` or `rgba(255, 255, 255, 0.9)`) inside dark components.
  - Example:
    ```css
    .hero-founder p {
      color: rgba(255, 255, 255, 0.9) !important;
    }
    ```

## 3. Interactive Elements & Hover States
* **Explicit Button Hover Text Colors**:
  - Every button class (e.g., `.btn-primary`, `.btn-secondary`, `.btn-outline`) MUST explicitly declare its `color` in its `:hover` state.
  - Never let hover states fall back to the generic global link hover style (`a:hover`), which will cause invisible text when the button background is similar to the link hover color.
  - Example:
    ```css
    .btn-primary {
      background: linear-gradient(135deg, var(--amber), var(--amber-dark));
      color: var(--navy-deep);
    }
    .btn-primary:hover {
      background: linear-gradient(135deg, var(--amber-dark), var(--amber));
      color: var(--navy-deep); /* Keep contrast high against amber */
    }
    ```

## 4. Components & Naming
* **Founder Testimonial Badge**:
  - Name is **Mark West**, initials **MW**.
* **Assurance Ribbon**:
  - `.assurance-bar` must span full-width, display elements horizontally on desktop, wrap on mobile, and use green checkmarks (`✓` in `var(--green)`) prepended to each point.

## 5. Punctuation & Typography
* **Do NOT Use Em Dashes (`—` or `&mdash;`)**:
  - Do NOT use em dashes (`—`) anywhere in titles, metadata, headers, paragraphs, or alt text.
  - Instead, use a spaced hyphen (` - `) or appropriate alternative punctuation (such as commas, colons, or parentheses) to separate clauses or titles.
