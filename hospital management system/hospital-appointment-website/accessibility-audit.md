# Accessibility audit — CityCare Hospital

## Before refactoring: issues in the old-page scenario

The original scenario describes a page built with excessive `div` elements and poorly structured HTML. The following are the issues to check in that version:

- Page regions are not clearly identified with semantic elements.
- Heading levels may be missing or used only for visual size.
- Form fields may not have properly connected labels.
- Input fields may use generic text inputs instead of suitable types.
- Keyboard focus may be difficult to see.
- Required fields and invalid values may not be identified clearly.

## After refactoring: improvements in this version

- Uses `header`, `nav`, `main`, `section`, `article`, `form`, and `footer`.
- Uses one main `h1`, followed by section headings (`h2`) and card headings (`h3`).
- Every form control has a matching `label` using `for` and `id`.
- Uses suitable input types: `text`, `email`, `tel`, and `date`.
- Uses `required`, `minlength`, and `pattern` for basic browser validation.
- Uses a visible keyboard focus outline.
- Uses `role="status"` and `aria-live="polite"` for the submission message.
- Uses a responsive layout for smaller screens.

## Manual testing checklist

1. Open `index.html` in a browser.
2. Press `Tab` repeatedly and check that links, form fields, and the button receive focus in a sensible order.
3. Press `Shift + Tab` to move backwards.
4. Try submitting the empty form. The browser should identify a required field.
5. Enter an invalid email address and check the browser validation.
6. Enter a phone number that is not 10 digits and check the validation.
7. Try selecting a date in the past.
8. Use a screen reader, such as NVDA on Windows, to navigate headings, landmarks, links, and form labels.

## Important note

This is a planned audit checklist, not a recorded result from an automated accessibility scanner or a completed screen-reader test. For the final lab submission, run the tests yourself and record the actual results. You can also use axe DevTools or Lighthouse to perform an additional accessibility check.
