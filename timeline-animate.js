// 政策發展時間軸自動緩慢向右滾動，彈性回彈，點擊暫停30秒
(function() {
  const container = document.getElementById('timelineContainer');
  if (!container) return;
  let animationFrame;
  let paused = false;
  let pauseTimeout = null;
  const velocity = 2.5; // px per frame
  const direction = 1; // only auto-scroll right

  // slider element (added in index.html)
  const slider = document.getElementById('timelineSlider');

  function updateSliderMax() {
    if (!slider) return;
    const max = Math.max(0, container.scrollWidth - container.clientWidth);
    slider.max = Math.floor(max);
    // keep slider value in-range
    slider.value = Math.min(slider.value || 0, slider.max);
  }

  function animate() {
    if (paused) return;
    const maxScroll = container.scrollWidth - container.clientWidth;
    const current = container.scrollLeft;
    if (direction === 1) {
      if (current < maxScroll) {
        container.scrollLeft = Math.min(current + velocity, maxScroll);
        // update slider position to match
        if (slider) slider.value = Math.round(container.scrollLeft);
        animationFrame = requestAnimationFrame(animate);
      } else {
        container.scrollLeft = maxScroll;
        if (slider) slider.value = Math.round(container.scrollLeft);
      }
    }
  }

  function pauseScroll(timeoutMs = 30000) {
    paused = true;
    if (animationFrame) cancelAnimationFrame(animationFrame);
    if (pauseTimeout) clearTimeout(pauseTimeout);
    pauseTimeout = setTimeout(() => {
      paused = false;
      animate();
    }, timeoutMs);
  }

  // When user clicks the timeline, pause auto-scroll
  container.addEventListener('click', () => pauseScroll(30000));

  // When user scrolls manually (wheel/trackpad), sync slider and pause
  container.addEventListener('scroll', () => {
    if (slider) slider.value = Math.round(container.scrollLeft);
    pauseScroll(5000);
  }, { passive: true });

  // Slider interactions: update scrollLeft while sliding
  if (slider) {
    // set initial range once content is loaded
    updateSliderMax();

    // input -> live update
    slider.addEventListener('input', (e) => {
      const v = Number(e.target.value);
      container.scrollLeft = v;
    });

    // when user starts using slider, pause auto-scroll briefly
    slider.addEventListener('pointerdown', () => pauseScroll(10000));
    slider.addEventListener('change', () => pauseScroll(10000));
  }

  // update slider max on resize / content changes
  window.addEventListener('resize', () => {
    updateSliderMax();
  });

  // initial setup
  updateSliderMax();
  animate();
})();
