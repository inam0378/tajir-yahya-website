
/* =========================================================
   HOME — cursor-driven 3D (hero scene + brand cube)
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;

  const follow = (zone, target, maxX, maxY, base) => {
    if (!zone || !target) return;
    let raf = null, rx = 0, ry = 0;
    zone.addEventListener("mousemove", (e) => {
      const r = zone.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      ry = x * maxY; rx = -y * maxX;
      if (!raf) raf = requestAnimationFrame(() => {
        target.style.transform = `${base || ""} rotateX(${rx}deg) rotateY(${ry}deg)`;
        raf = null;
      });
    });
    zone.addEventListener("mouseleave", () => { target.style.transform = base || ""; });
  };

  // Hero: the whole orb / ring / card system turns toward the cursor
  follow(document.querySelector(".hero"), document.querySelector(".hero-3d"), 16, 24);
  // Approach panel: cube tilts with the cursor while it keeps spinning
  follow(document.querySelector(".visual-panel"), document.querySelector(".ty-cube-wrap"), 22, 30);

  // Touch devices: gentle automatic sway so the scene still feels alive
  if (!window.matchMedia("(hover: hover)").matches) {
    const scene = document.querySelector(".hero-3d");
    let t = 0;
    const loop = () => { t += 0.01; if (scene) scene.style.transform = `rotateX(${Math.sin(t) * 6}deg) rotateY(${Math.cos(t) * 10}deg)`; requestAnimationFrame(loop); };
    loop();
  }
});
