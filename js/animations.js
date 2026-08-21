/* =========================================================
   PREACH LAW & CO.
   ANIMATIONS.JS
   PREMIUM MOTION SYSTEM — PHASE 3
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     GSAP CHECK
     ======================================================= */

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

  const heroLines =
    document.querySelectorAll(
      ".hero-title .line > span"
    );

  const heroLabel =
    document.querySelector(".hero-label");

  const heroDescription =
    document.querySelector(".hero-description");

  const heroButton =
    document.querySelector(".hero-button");

  if (heroLines.length) {

    gsap.set(heroLines, {
      yPercent: 110,
      opacity: 0
    });

    const heroTimeline =
      gsap.timeline({
        delay: 0.25,
        defaults: {
          ease: "power4.out"
        }
      });

    heroTimeline
      .to(heroLabel, {
        opacity: 1,
        y: 0,
        duration: 0.8
      })
      .to(
        heroLines,
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.15,
          stagger: 0.10
        },
        "-=0.35"
      )
      .to(
        heroDescription,
        {
          opacity: 1,
          y: 0,
          duration: 0.8
        },
        "-=0.55"
      )
      .to(
        heroButton,
        {
          opacity: 1,
          y: 0,
          duration: 0.8
        },
        "-=0.6"
      );

  }


  /* =======================================================
     GENERIC REVEAL
     ======================================================= */

  const reveals =
    document.querySelectorAll(
      ".reveal"
    );

  reveals.forEach((element) => {

    if (
      element.closest(".hero")
    ) {
      return;
    }

    gsap.set(element, {
      opacity: 0,
      y: 45
    });


    if (
      typeof ScrollTrigger !==
      "undefined"
    ) {

      gsap.to(element, {

        opacity: 1,
        y: 0,

        duration: 1,

        ease:
          "power3.out",

        scrollTrigger: {

          trigger: element,

          start:
            "top 88%",

          once: true

        }

      });

    }

  });


  /* =======================================================
     SECTION TITLES
     ======================================================= */

  document
    .querySelectorAll(
      ".section-title, .contact-title, .cta-content h2"
    )
    .forEach((title) => {

      const words =
        title.querySelectorAll(
          "br"
        );

      if (
        typeof ScrollTrigger ===
        "undefined"
      ) {
        return;
      }

      gsap.fromTo(
        title,
        {
          opacity: 0,
          y: 60
        },
        {
          opacity: 1,
          y: 0,

          duration: 1.1,

          ease:
            "power4.out",

          scrollTrigger: {

            trigger: title,

            start:
              "top 85%",

            once: true

          }

        }
      );

    });


  /* =======================================================
     PRACTICE CARD STAGGER
     ======================================================= */

  const cards =
    document.querySelectorAll(
      ".practice-card"
    );

  if (cards.length) {

    if (
      typeof ScrollTrigger !==
      "undefined"
    ) {

      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 70,
          scale: 0.97
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,

          duration: 1,

          stagger: 0.12,

          ease:
            "power3.out",

          scrollTrigger: {

            trigger:
              ".practice-grid",

            start:
              "top 82%",

            once: true

          }

        }
      );

    }

  }


  /* =======================================================
     CARD 3D TILT
     ======================================================= */

  const finePointer =
    window.matchMedia(
      "(pointer: fine)"
    ).matches;


  if (finePointer) {

    cards.forEach((card) => {

      card.addEventListener(
        "mousemove",
        (event) => {

          const rect =
            card.getBoundingClientRect();

          const x =
            event.clientX -
            rect.left;

          const y =
            event.clientY -
            rect.top;

          const rotateX =
            ((y / rect.height) - 0.5)
            * -7;

          const rotateY =
            ((x / rect.width) - 0.5)
            * 7;

          gsap.to(card, {

            rotateX,
            rotateY,

            transformPerspective:
              900,

            duration:
              0.45,

            ease:
              "power2.out"

          });

          card.style.setProperty(
            "--mouse-x",
            `${x}px`
          );

          card.style.setProperty(
            "--mouse-y",
            `${y}px`
          );

        }
      );


      card.addEventListener(
        "mouseleave",
        () => {

          gsap.to(card, {

            rotateX: 0,
            rotateY: 0,

            duration:
              0.7,

            ease:
              "elastic.out(1,0.5)"

          });

        }
      );

    });

  }


  /* =======================================================
     PARALLAX HERO
     ======================================================= */

  const heroGrid =
    document.querySelector(
      ".hero-grid"
    );

  if (
    heroGrid &&
    typeof ScrollTrigger !==
    "undefined"
  ) {

    gsap.to(heroGrid, {

      yPercent: 25,

      ease: "none",

      scrollTrigger: {

        trigger: ".hero",

        start: "top top",

        end: "bottom top",

        scrub: true

      }

    });

  }


  /* =======================================================
     HERO SIDE PARALLAX
     ======================================================= */

  const heroSide =
    document.querySelector(
      ".hero-side"
    );

  if (
    heroSide &&
    typeof ScrollTrigger !==
    "undefined"
  ) {

    gsap.to(heroSide, {

      y: -80,

      opacity: 0.5,

      ease: "none",

      scrollTrigger: {

        trigger: ".hero",

        start: "top top",

        end: "bottom top",

        scrub: true

      }

    });

  }


  /* =======================================================
     GOLD GLOW PARALLAX
     ======================================================= */

  document
    .querySelectorAll(
      ".glow-one, .glow-two"
    )
    .forEach((glow, index) => {

      if (
        typeof ScrollTrigger ===
        "undefined"
      ) {
        return;
      }

      gsap.to(glow, {

        y:
          index === 0
            ? -120
            : -70,

        ease: "none",

        scrollTrigger: {

          trigger: ".hero",

          start: "top top",

          end: "bottom top",

          scrub: 1.5

        }

      });

    });


  /* =======================================================
     PHILOSOPHY PARALLAX
     ======================================================= */

  const philosophyBg =
    document.querySelector(
      ".philosophy-bg"
    );

  if (
    philosophyBg &&
    typeof ScrollTrigger !==
    "undefined"
  ) {

    gsap.to(
      philosophyBg,
      {

        y: -100,

        ease: "none",

        scrollTrigger: {

          trigger:
            ".philosophy",

          start:
            "top bottom",

          end:
            "bottom top",

          scrub: true

        }

      }
    );

  }


  /* =======================================================
     CTA PARALLAX
     ======================================================= */

  const ctaBg =
    document.querySelector(
      ".cta-bg"
    );

  if (
    ctaBg &&
    typeof ScrollTrigger !==
    "undefined"
  ) {

    gsap.fromTo(
      ctaBg,

      {
        yPercent: -10,
        scale: 1.08
      },

      {
        yPercent: 10,
        scale: 1.15,

        ease: "none",

        scrollTrigger: {

          trigger:
            ".cta-section",

          start:
            "top bottom",

          end:
            "bottom top",

          scrub: true

        }

      }
    );

  }


  /* =======================================================
     COUNTERS
     ======================================================= */

  document
    .querySelectorAll(
      ".counter"
    )
    .forEach((counter) => {

      const target =
        Number(
          counter.dataset.target
        );

      if (!target) {
        return;
      }


      counter.textContent =
        "0";


      if (
        typeof ScrollTrigger ===
        "undefined"
      ) {
        counter.textContent =
          target;
        return;
      }


      gsap.to(
        counter,
        {

          textContent:
            target,

          duration:
            2.2,

          ease:
            "power2.out",

          snap: {
            textContent: 1
          },

          scrollTrigger: {

            trigger:
              counter,

            start:
              "top 88%",

            once: true

          },

          onUpdate() {

            counter.textContent =
              Math.round(
                Number(
                  counter.textContent
                )
              );

          }

        }
      );

    });


  /* =======================================================
     SCROLL REFRESH
     ======================================================= */

  if (
    typeof ScrollTrigger !==
    "undefined"
  ) {

    window.addEventListener(
      "load",
      () => {

        ScrollTrigger.refresh();

      }
    );

  }


  /* =======================================================
     RESIZE SAFETY
     ======================================================= */

  let resizeTimer;

  window.addEventListener(
    "resize",
    () => {

      clearTimeout(
        resizeTimer
      );

      resizeTimer =
        setTimeout(() => {

          if (
            typeof ScrollTrigger !==
            "undefined"
          ) {

            ScrollTrigger.refresh();

          }

        }, 250);

    }
  );

});
