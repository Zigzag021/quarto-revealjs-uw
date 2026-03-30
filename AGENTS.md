# Agent Guidance

When helping write or revise `.qmd` slides in this repo, follow these
conventions unless the user asks otherwise:

- Use `##` only for section divider slides.
- Use `###` only for page slides within a section.
- Use `####` for content slides; do not treat `##` or `###` as ordinary
  in-slide headings.
- A blank `####` is allowed when a content slide should start directly with
  text, math, a figure, or a list.
- Prefer one main idea per content slide; split dense material across slides
  instead of shrinking text.
- Keep bullets shallow and short; use a short lead-in sentence instead of deep
  nested lists or extra heading levels.
- Reuse built-in theme utilities such as `.alert`, `.highlight`,
  `.rounded-box`, `.button`, `.fg`, and `.bg` before adding ad hoc styling.
- Avoid local font, color, or spacing overrides unless explicitly requested,
  and preserve the statistical and mathematical meaning of the existing
  content.
