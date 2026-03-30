window.MathJax = {
  tex: {
    inlineMath: [['\\(', '\\)']],
    displayMath: [['\\[', '\\]']],
    processEscapes: true,
    processRefs: true,
    processEnvironments: true
  },
  output: {
    font: 'mathjax-fira'
  },
  startup: {
    ready: () => {
      console.log('MathJax is loaded and ready with font: mathjax-fira');
      MathJax.startup.defaultReady();
    }
  }
};
