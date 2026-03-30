# quarto-revealjs-uw

Quarto reveal.js extension with a UW-flavored theme inspired by
`vladislav-morozov/econometrics-2`.

Defaults include a wider 1150px layout, `slide-level: 4`, a built-in
section/page/content slide structure, title-slide footer behavior, and convex
transitions.

## What it includes

- A custom `uw-revealjs` format bundled under `_extensions/Zigzag021/uw/`.
- A UW-styled SCSS theme with title, section, and page slides differentiated by
  layout and color.
- JavaScript defaults for slide headers, section/page labels, title-slide
  footer behavior, and dark-slide logo handling.
- A built-in MathJax configuration and bundled departmental logo asset.
- A lean starter deck in `template.qmd`.

## Use the template

```bash
quarto use template Zigzag021/quarto-revealjs-uw
```

## Install the extension in an existing project

```bash
quarto install extension Zigzag021/quarto-revealjs-uw
```

Then set the document format to `uw-revealjs`, for example:

```yaml
format: uw-revealjs
```

## Slide structure

With the current defaults, the theme expects a four-level reveal.js structure:

- `#` for document metadata and the title slide
- `##` for section divider slides
- `###` for page slides within a section
- `####` for content-slide headings
- blank `####` for content slides with no dedicated heading

Treat `##` and `###` as structural separators rather than ordinary in-slide
headings. Keep content slides lean: prefer one main idea per slide, shallow
bullets, and the built-in theme utilities before local styling overrides.

See `template.qmd` for a minimal working example.
