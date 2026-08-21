/* =========================================================
   PREACH LAW & CO.
   PREMIUM GSAP ANIMATION SYSTEM
   PHASE 2 — STEP 1
   CINEMATIC HERO
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* -------------------------------------------------------
     GSAP CHECK
  ------------------------------------------------------- */

  if (typeof gsap === "undefined") {
    console.warn("GSAP not loaded.");
    return;
  }

  if (typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }


  /* =======================================================
     HERO INTRO
  ======================================================= */

  const hero = document.querySelector(".hero");

  if (!hero) return;


  const heroLabel =
    hero.querySelector(".hero-label");

  const heroLines =
    hero.querySelectorAll(
      ".hero-title .line > span"
    );

  const heroDescription =
    hero.querySelector(".hero-description");

  const heroButton =
    hero.querySelector(".hero-button");

  const heroSide =
    hero.querySelector(".hero-side");

  const heroScroll =
    hero.querySelector(".hero-scroll");

  const heroNumber =
    hero.querySelector(".hero-number");


  /* =======================================================
     INITIAL STATES
  ======================================================= */

  gsap.set(heroLines, {
    yPercent: 110,
    opacity: 0
  });


  if (heroLabel) {

    gsap.set(heroLabel, {
      y: 25,
      opacity: 0
    });

  }


  if (heroDescription) {

    gsap.set(heroDescription, {
      y: 30,
      opacity: 0
    });

  }


  if (heroButton) {

    gsap.set(heroButton, {
      y: 30,
      opacity: 0
    });

  }


  if (heroSide) {

    gsap.set(heroSide, {
      opacity: 0
    });

  }


  if (heroScroll) {

    gsap.set(heroScroll, {
      opacity: 0,
      y: 20
    });

  }


  if (heroNumber) {

    gsap.set(heroNumber, {
      opacity: 0,
      y: 20
    });

  }


  /* =======================================================
     HERO TIMELINE
  ======================================================= */

  const heroTimeline =
    gsap.timeline({
      defaults: {
        ease: "power4.out"
      },
      delay: 0.25
    });


  /* Label */

  if (heroLabel) {

    heroTimeline.to(
      heroLabel,
      {
        y: 0,
        opacity: 1,
        duration: 0.8
      },
      0
    );

  }


  /* Main title */

  heroTimeline.to(
    heroLines,
    {
      yPercent: 0,
      opacity: 1,
      duration: 1.15,
      stagger: 0.12
    },
    0.15
  );


  /* Description */

  if (heroDescription) {

    heroTimeline.to(
      heroDescription,
      {
        y: 0,
        opacity: 1,
        duration: 0.9
      },
      0.75
    );

  }


  /* Button */

  if (heroButton) {

    heroTimeline.to(
      heroButton,
      {
        y: 0,
        opacity: 1,
        duration: 0.9
      },
      0.85
    );

  }


  /* Side information */

  if (heroSide) {

    heroTimeline.to(
      heroSide,
      {
        opacity: 1,
        duration: 0.8
      },
      1
    );

  }


  /* Scroll indicator */

  if (heroScroll) {

    heroTimeline.to(
      heroScroll,
      {
        opacity: 1,
        y: 0,
        duration: 0.8
      },
      1.15
    );

  }


  /* Number */

  if (heroNumber) {

    heroTimeline.to(
      heroNumber,
      {
        opacity: 1,
        y: 0,
        duration: 0.8
      },
      1.15
    );

  }


  /* =======================================================
     HERO PARALLAX
  ======================================================= */

  if (
    typeof ScrollTrigger !== "undefined"
  ) {

    const heroGrid =
      document.querySelector(".hero-grid");

    const heroGlowOne =
      document.querySelector(".glow-one");

    const heroGlowTwo =
      document.querySelector(".glow-two");


    if (heroGrid) {

      gsap.to(heroGrid, {

        y: 80,

        ease: "none",

        scrollTrigger: {

          trigger: hero,

          start: "top top",

          end: "bottom top",

          scrub: 1.2

        }

      });

    }


    if (heroGlowOne) {

      gsap.to(heroGlowOne, {

        y: 120,

        x: -50,

        ease: "none",

        scrollTrigger: {

          trigger: hero,

          start: "top top",

          end: "bottom top",

          scrub: 1.5

        }

      });

    }


    if (heroGlowTwo) {

      gsap.to(heroGlowTwo, {

        y: -80,

        x: 40,

        ease: "none",

        scrollTrigger: {

          trigger: hero,

          start: "top top",

          end: "bottom top",

          scrub: 1.8

        }

      });

    }

  }


  /* =======================================================
     HERO MOUSE PARALLAX
     DESKTOP ONLY
  ======================================================= */

  const desktop =
    window.matchMedia(
      "(pointer: fine)"
    ).matches;


  if (desktop) {

    let mouseX = 0;
    let mouseY = 0;

    let currentX = 0;
    let currentY = 0;


    hero.addEventListener(
      "mousemove",
      (event) => {

        const rect =
          hero.getBoundingClientRect();


        mouseX =
          (event.clientX - rect.left)
          / rect.width
          - 0.5;


        mouseY =
          (event.clientY - rect.top)
          / rect.height
          - 0.5;

      }
    );


    const animateMouse =
      () => {

        currentX +=
          (mouseX - currentX) * 0.05;

        currentY +=
          (mouseY - currentY) * 0.05;


        if (heroLabel) {

          gsap.set(
            heroLabel,
            {
              x: currentX * 8
            }
          );

        }


        if (heroDescription) {

          gsap.set(
            heroDescription,
            {
              x: currentX * 5
            }
          );

        }


        if (heroButton) {

          gsap.set(
            heroButton,
            {
              x: currentX * -6
            }
          );

        }


        requestAnimationFrame(
          animateMouse
        );

      };


    requestAnimationFrame(
      animateMouse
    );

  }


  /* =======================================================
     SCROLL REVEALS
  ======================================================= */

  if (
    typeof ScrollTrigger !== "undefined"
  ) {

    const revealElements =
      document.querySelectorAll(
        ".reveal:not(.hero .reveal)"
      );


    revealElements.forEach(
      (element) => {

        gsap.fromTo(
          element,

          {
            y: 45,
            opacity: 0
          },

          {
            y: 0,
            opacity: 1,

            duration: 1,

            ease:
              "power3.out",

            scrollTrigger: {

              trigger: element,

              start:
                "top 88%",

              once: true

            }

          }
        );

      }
    );

  }


  /* =======================================================
     REFRESH
  ======================================================= */

  window.addEventListener(
    "load",
    () => {

      if (
        typeof ScrollTrigger !==
        "undefined"
      ) {

        ScrollTrigger.refresh();

      }

    },
    { once: true }
  );

});
