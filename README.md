# quarto-revealjs-uw

Quarto reveal.js extension with a UW-flavored theme inspired by
`vladislav-morozov/econometrics-2`.

Defaults include a wider 1150px layout, `slide-level: 4` section/page/content
structure, an automatic title footer, and convex transitions.

## What it includes

- A custom `uw-revealjs` format defined in `_extensions/uw/_extension.yml`.
- A UW-styled SCSS theme with title, section, and page slides differentiated by
  layout and colour.
- JavaScript defaults for slide headers, section/page labels, title-slide footer
  behaviour, and dark-slide logo handling.
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

- `#` for document metadata/title
- `##` for section slides
- `###` for page slides within a section
- `####` for content-slide headings

See `template.qmd` for a minimal working example.
