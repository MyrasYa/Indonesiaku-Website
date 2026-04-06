function statAnimate(element, target, suffix = "") {
  const duration = 1500;
  const start = performance.now();
  const isFloat = target % 1 !== 0;

  const tick = (now) => {
    const elapsed = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - elapsed, 3);
    const current = isFloat
      ? (eased * target).toFixed(1)
      : Math.round(eased * target);

    element.textContent = current + suffix;
    element.style.opacity = eased; 
    if (elapsed < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}

const statsSection = document.querySelector(".why-stats");
let countersRun = false;

new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting && !countersRun) {
      countersRun = true;
      const cards = document.querySelectorAll(".stat-num");
      cards.forEach((card, index) => {
        if (index === 0) statAnimate(card, 17000, "+");
        if (index === 1) statAnimate(card, 300, "+");
        if (index === 2) statAnimate(card, 270, "Juta");
      });
    }
  },
  { threshold: 0.5 },
).observe(statsSection);

