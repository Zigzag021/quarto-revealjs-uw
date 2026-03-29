document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const revealRoot = document.querySelector(".reveal");
  const footer = document.querySelector(".footer-default");
  const title = document.querySelector("#title-slide .title");
  let header = null;
  let sectionLabel = null;
  let pageLabel = null;

  if (footer && !footer.textContent.trim() && title) {
    footer.textContent = title.textContent.trim();
  }

  const themeValue = (name, fallback) => {
    const value = getComputedStyle(root).getPropertyValue(name).trim();
    return value || fallback;
  };

  const theme = {
    titleBackground: `linear-gradient(135deg, ${themeValue("--uw-title-bg-start", "#4b2e83")} 0%, ${themeValue("--uw-title-bg-end", "#32006e")} 100%)`,
    sectionBackground: themeValue("--uw-section-bg", "#241a3a"),
    pageBackground: themeValue("--uw-page-bg", "#32006e")
  };

  const isMainTitleSlide = (slide) => slide?.id === "title-slide";
  const isSectionSlide = (slide) => slide?.matches(".title-slide.level2");
  const isPageSlide = (slide) => slide?.matches(".title-slide.level3");
  const getHeadingText = (slide, selector) =>
    slide?.querySelector(selector)?.textContent?.trim() || "";
  const hasExplicitBackground = (slide) =>
    [
      "data-background",
      "data-background-color",
      "data-background-gradient",
      "data-background-image",
      "data-background-video"
    ].some((attribute) => slide?.hasAttribute(attribute));

  const ensureHeader = () => {
    if (!revealRoot) {
      return null;
    }

    if (!header) {
      header = document.createElement("div");
      header.className = "reveal-header";
      header.innerHTML = `
        <div class="sc-title"><p></p></div>
        <div class="sb-title"><p></p></div>
      `;
      revealRoot.insertBefore(header, revealRoot.firstChild);
      sectionLabel = header.querySelector(".sc-title p");
      pageLabel = header.querySelector(".sb-title p");
    }

    const slideNumber = document.querySelector(".slide-number");
    if (slideNumber && slideNumber.parentElement !== header) {
      header.appendChild(slideNumber);
    }

    return header;
  };

  const setSlideBackground = (slide, background) => {
    if (!window.Reveal || typeof window.Reveal.getSlideBackground !== "function") {
      return;
    }

    const backgroundElement = window.Reveal.getSlideBackground(slide);
    if (!backgroundElement) {
      return;
    }

    backgroundElement.style.background = background;
  };

  const applyThemeDefaults = () => {
    if (!window.Reveal || typeof window.Reveal.getSlides !== "function") {
      return;
    }

    let currentSection = "";
    let currentPage = "";

    window.Reveal.getSlides().forEach((slide) => {
      slide.classList.remove("uw-dark-slide");

      if (isMainTitleSlide(slide)) {
        slide.classList.add("uw-dark-slide", "has-dark-background");
        slide.setAttribute("data-sc-title", "");
        slide.setAttribute("data-sb-title", "");

        if (!hasExplicitBackground(slide)) {
          setSlideBackground(slide, theme.titleBackground);
        }

        currentPage = "";
        return;
      }

      if (isSectionSlide(slide)) {
        currentSection = getHeadingText(slide, "h2");
        currentPage = "";
        slide.setAttribute("data-sc-title", "");
        slide.setAttribute("data-sb-title", "");

        if (!hasExplicitBackground(slide)) {
          slide.classList.add("uw-dark-slide", "has-dark-background");
          setSlideBackground(slide, theme.sectionBackground);
        }

        return;
      }

      if (isPageSlide(slide)) {
        currentPage = getHeadingText(slide, "h3");
        slide.setAttribute("data-sc-title", currentSection);
        slide.setAttribute("data-sb-title", "");

        if (!hasExplicitBackground(slide)) {
          slide.classList.add("uw-dark-slide", "has-dark-background");
          setSlideBackground(slide, theme.pageBackground);
        }

        return;
      }

      slide.setAttribute("data-sc-title", currentSection);
      slide.setAttribute("data-sb-title", currentPage);
    });
  };

  const syncFooterVisibility = () => {
    if (!footer) {
      return;
    }

    const currentSlide =
      (window.Reveal && typeof window.Reveal.getCurrentSlide === "function"
        ? window.Reveal.getCurrentSlide()
        : null) || document.querySelector(".reveal .slides section.present");

    footer.style.display = currentSlide && isMainTitleSlide(currentSlide) ? "none" : "";
  };

  const syncHeader = () => {
    const activeHeader = ensureHeader();
    if (!activeHeader || !sectionLabel || !pageLabel) {
      return;
    }

    const currentSlide =
      (window.Reveal && typeof window.Reveal.getCurrentSlide === "function"
        ? window.Reveal.getCurrentSlide()
        : null) || document.querySelector(".reveal .slides section.present");

    if (revealRoot) {
      revealRoot.classList.toggle(
        "uw-current-slide-dark",
        Boolean(currentSlide?.classList.contains("uw-dark-slide"))
      );
    }

    const hideHeader = !currentSlide || isMainTitleSlide(currentSlide);
    activeHeader.classList.toggle("is-hidden", hideHeader);

    if (hideHeader) {
      sectionLabel.textContent = "";
      pageLabel.textContent = "";
      return;
    }

    activeHeader.classList.toggle(
      "is-dark",
      currentSlide.classList.contains("uw-dark-slide")
    );
    sectionLabel.textContent = currentSlide.getAttribute("data-sc-title") || "";
    pageLabel.textContent = currentSlide.getAttribute("data-sb-title") || "";
  };

  const scheduleFooterSync = () => {
    window.requestAnimationFrame(() => {
      applyThemeDefaults();
      syncHeader();
      syncFooterVisibility();
    });
  };

  scheduleFooterSync();

  if (window.Reveal && typeof window.Reveal.on === "function") {
    window.Reveal.on("ready", () => {
      ensureHeader();
      scheduleFooterSync();
    });
    window.Reveal.on("slidechanged", scheduleFooterSync);
  }
});
