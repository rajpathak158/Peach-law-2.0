/* =====================================================
   PREACH LAW & CO. — GSAP ANIMATIONS
   Requires: gsap.min.js, ScrollTrigger.min.js (loaded
   with `defer` BEFORE this file in index.html)
===================================================== */

(function () {

  "use strict";

  if (typeof gsap === "undefined") {
    document.documentElement.classList.add("gsap-ready");
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.style.opacity = 1;
    });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  var reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  document.documentElement.classList.add("gsap-ready");

  function heroEntrance() {
    var tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(".hero-label", { opacity: 0, y: 20, duration: 0.7 })
      .from(".hero-title .line > span", {
        opacity: 0, yPercent: 110, duration: 0.9, stagger: 0.12
      }, "-=0.35")
      .from(".hero-description p", { opacity: 0, y: 20, duration: 0.7 }, "-=0.4")
      .from(".hero-button", { opacity: 0, y: 20, duration: 0.6 }, "-=0.5")
      .from(".hero-side span", { opacity: 0, duration: 0.6, stagger: 0.1 }, "-=0.5")
      .from(".hero-scroll", { opacity: 0, duration: 0.6 }, "-=0.4");
  }

  function scrollReveals() {
    var items = gsap.utils.toArray(".reveal");
    items.forEach(function (el) {
      gsap.fromTo(el, { opacity: 0, y: 32 }, {
        opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: {
          trigger: el, start: "top 88%", toggleActions: "play none none reverse"
        }
      });
    });
  }

  function practiceCardStagger() {
    var grid = document.querySelector(".practice-grid");
    if (!grid) return;
    var cards = gsap.utils.toArray(".practice-card", grid);
    gsap.fromTo(cards, { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.12,
      scrollTrigger: { trigger: grid, start: "top 85%" }
    });
  }

  function statCounters() {
    var counters = gsap.utils.toArray(".counter");
    counters.forEach(function (el) {
      var target = parseFloat(el.getAttribute("data-target")) || 0;
      var proxy = { val: 0 };
      ScrollTrigger.create({
        trigger: el, start: "top 90%", once: true,
        onEnter: function () {
          gsap.to(proxy, {
            val: target, duration: 2, ease: "power2.out",
            onUpdate: function () {
              el.textContent = Math.round(proxy.val).toLocaleString();
            }
          });
        }
      });
    });
  }

  function marqueeLoop() {
    var marquee = document.getElementById("marquee");
    if (!marquee) return;
    var tracks = marquee.querySelectorAll(".marquee-track");
    if (!tracks.length) return;
    if (reduceMotion) return;
    gsap.to(tracks, { xPercent: -100, repeat: -1, duration: 18, ease: "linear" });
  }

  function scrollProgressBar() {
    var bar = document.getElementById("scrollProgress");
    if (!bar) return;
    gsap.to(bar, {
      scaleX: 1, ease: "none",
      scrollTrigger: {
        trigger: document.documentElement, start: "top top", end: "bottom bottom", scrub: 0.3
      }
    });
  }

  function navbarShrink() {
    var navbar = document.getElementById("navbar");
    if (!navbar) return;
    ScrollTrigger.create({
      start: "top -80", end: 99999,
      toggleClass: { targets: navbar, className: "is-scrolled" }
    });
  }

  function magneticButtons() {
    if (reduceMotion) return;
    var buttons = document.querySelectorAll(".magnetic");
    buttons.forEach(function (btn) {
      var strength = 0.35;
      btn.addEventListener("mousemove", function (e) {
        var rect = btn.getBoundingClientRect();
        var relX = e.clientX - rect.left - rect.width / 2;
        var relY = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, { x: relX * strength, y: relY * strength, duration: 0.4, ease: "power2.out" });
      });
      btn.addEventListener("mouseleave", function () {
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
      });
    });
  }

  function cardTilt() {
    if (reduceMotion) return;
    if (window.matchMedia("(hover: none)").matches) return;
    var cards = document.querySelectorAll(".practice-card");
    cards.forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        var rect = card.getBoundingClientRect();
        var px = (e.clientX - rect.left) / rect.width - 0.5;
        var py = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(card, {
          rotateX: py * -6, rotateY: px * 6, transformPerspective: 800,
          duration: 0.4, ease: "power2.out"
        });
      });
      card.addEventListener("mouseleave", function () {
        gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "power3.out" });
      });
    });
  }

  function parallaxBackgrounds() {
    if (reduceMotion) return;
    var glows = document.querySelectorAll(".hero-glow");
    glows.forEach(function (glow, i) {
      gsap.to(glow, {
        y: i % 2 === 0 ? 80 : -80, ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
      });
    });
  }

  function init() {
    if (reduceMotion) {
      document.querySelectorAll(".reveal").forEach(function (el) { el.style.opacity = 1; });
      statCounters();
      navbarShrink();
      scrollProgressBar();
      return;
    }
    heroEntrance();
    scrollReveals();
    practiceCardStagger();
    statCounters();
    marqueeLoop();
    scrollProgressBar();
    navbarShrink();
    magneticButtons();
    cardTilt();
    parallaxBackgrounds();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
