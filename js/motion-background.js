/* =====================================================
   PREACH LAW & CO. — MOTION.DEV BACKGROUND ORBS
   Requires: motion.js (motion.dev) loaded with `defer`
   BEFORE this file in index.html
===================================================== */

(function () {

  "use strict";

  if (typeof Motion === "undefined") {
    return;
  }

  var reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reduceMotion) {
    return;
  }

  var animate = Motion.animate;

  function floatOrbs() {

    var orbs = document.querySelectorAll(".hero-orbs .orb");

    if (!orbs.length) return;

    orbs.forEach(function (orb, i) {

      var driftX = 40 + i * 18;
      var driftY = 30 + i * 14;
      var duration = 9 + i * 3;

      animate(
        orb,
        {
          x: [0, driftX, -driftX * 0.5, 0],
          y: [0, -driftY, driftY * 0.6, 0],
          scale: [1, 1.15, 0.92, 1]
        },
        {
          duration: duration,
          repeat: Infinity,
          easing: "ease-in-out"
        }
      );

    });

  }

  function fadeInOrbs() {

    var orbs = document.querySelectorAll(".hero-orbs .orb");

    if (!orbs.length) return;

    animate(
      orbs,
      { opacity: [0, 0.55] },
      { duration: 1.8, easing: "ease-out" }
    );

  }

  function init() {
    fadeInOrbs();
    floatOrbs();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
