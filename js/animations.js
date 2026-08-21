/* =========================================================
   PREACH LAW & CO.
   PREMIUM GSAP ANIMATION SYSTEM
   PHASE 2 — STEP 2
   HERO + SCROLL + 3D PRACTICE CARDS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  if (typeof gsap === "undefined") {
    console.warn("GSAP not loaded.");
    return;
  }

  if (typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }


  /* =======================================================
     HERO
     ======================================================= */

  const hero =
    document.querySelector(".hero");

  if (hero) {

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


    /* Initial states */

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


    /* Hero timeline */

    const heroTimeline =
      gsap.timeline({
        defaults: {
          ease: "power4.out"
        },
        delay: 0.2
      });


    if (heroLabel) {

      heroTimeline.to(
        heroLabel,
        {
          y: 0,
          opacity: 1,
          duration: .8
        },
        0
      );

    }


    heroTimeline.to(
      heroLines,
      {
        yPercent: 0,
        opacity: 1,
        duration: 1.1,
        stagger: .11
      },
      .12
    );


    if (heroDescription) {

      heroTimeline.to(
        heroDescription,
        {
          y: 0,
          opacity: 1,
          duration: .8
        },
        .72
      );

    }


    if (heroButton) {

      heroTimeline.to(
        heroButton,
        {
          y: 0,
          opacity: 1,
          duration: .8
        },
        .82
      );

    }


    if (heroSide) {

      heroTimeline.to(
        heroSide,
        {
          opacity: 1,
          duration: .7
        },
        .95
      );

    }


    if (heroScroll) {

      heroTimeline.to(
        heroScroll,
        {
          opacity: 1,
          y: 0,
          duration: .7
        },
        1.05
      );

    }


    if (heroNumber) {

      heroTimeline.to(
        heroNumber,
        {
          opacity: 1,
          y: 0,
          duration: .7
        },
        1.05
      );

    }


    /* =====================================================
       HERO PARALLAX
       ===================================================== */

    if (
      typeof ScrollTrigger !==
      "undefined"
    ) {

      const heroGrid =
        document.querySelector(".hero-grid");

      const glowOne =
        document.querySelector(".glow-one");

      const glowTwo =
        document.querySelector(".glow-two");


      if (heroGrid) {

        gsap.to(heroGrid, {

          y: 70,

          ease: "none",

          scrollTrigger: {

            trigger: hero,

            start: "top top",

            end: "bottom top",

            scrub: 1.2

          }

        });

      }


      if (glowOne) {

        gsap.to(glowOne, {

          x: -45,
          y: 100,

          ease: "none",

          scrollTrigger: {

            trigger: hero,

            start: "top top",

            end: "bottom top",

            scrub: 1.5

          }

        });

      }


      if (glowTwo) {

        gsap.to(glowTwo, {

          x: 35,
          y: -70,

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


    /* =====================================================
       HERO MOUSE DEPTH
       ===================================================== */

    if (
      window.matchMedia(
        "(pointer: fine)"
      ).matches
    ) {

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
            (event.clientX -
              rect.left) /
              rect.width -
            .5;

          mouseY =
            (event.clientY -
              rect.top) /
              rect.height -
            .5;

        }
      );


      const updateHeroDepth = () => {

        currentX +=
          (mouseX - currentX) * .045;

        currentY +=
          (mouseY - currentY) * .045;


        if (heroLabel) {
          gsap.set(heroLabel, {
            x: currentX * 8
          });
        }

        if (heroDescription) {
          gsap.set(heroDescription, {
            x: currentX * 5
          });
        }

        if (heroButton) {
          gsap.set(heroButton, {
            x: currentX * -5
          });
        }


        requestAnimationFrame(
          updateHeroDepth
        );

      };


      requestAnimationFrame(
        updateHeroDepth
      );

    }

  }


  /* =======================================================
     SCROLL REVEALS
     ======================================================= */

  if (
    typeof ScrollTrigger !==
    "undefined"
  ) {

    const reveals =
      document.querySelectorAll(
        ".reveal:not(.hero .reveal)"
      );


    reveals.forEach(
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

            duration: .9,

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
     PRACTICE CARD SYSTEM
     ======================================================= */

  const cards =
    document.querySelectorAll(
      ".practice-card"
    );


  if (
    cards.length &&
    window.matchMedia(
      "(pointer: fine)"
    ).matches
  ) {

    cards.forEach(
      (card) => {

        const content =
          card.querySelector(
            ".practice-card-content"
          );

        const icon =
          card.querySelector(
            ".practice-card-top i"
          );


        /* ---------------------------------------------------
           Mouse movement
        --------------------------------------------------- */

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


            const centerX =
              rect.width / 2;


            const centerY =
              rect.height / 2;


            const rotateY =
              ((x - centerX) /
                centerX) * 4;


            const rotateX =
              ((centerY - y) /
                centerY) * 4;


            /* CSS variables for light */

            card.style.setProperty(
              "--mouse-x",
              `${x}px`
            );

            card.style.setProperty(
              "--mouse-y",
              `${y}px`
            );


            gsap.to(
              card,
              {
                rotateX:
                  rotateX,

                rotateY:
                  rotateY,

                y: -8,

                duration: .45,

                ease:
                  "power3.out",

                overwrite:
                  "auto"
              }
            );


            if (content) {

              gsap.to(
                content,
                {
                  z: 18,

                  duration: .45,

                  ease:
                    "power3.out",

                  overwrite:
                    "auto"
                }
              );

            }


            if (icon) {

              gsap.to(
                icon,
                {
                  z: 30,

                  scale: 1.08,

                  duration: .45,

                  ease:
                    "power3.out",

                  overwrite:
                    "auto"
                }
              );

            }

          }
        );


        /* ---------------------------------------------------
           Mouse leave
        --------------------------------------------------- */

        card.addEventListener(
          "mouseleave",
          () => {

            gsap.to(
              card,
              {
                rotateX: 0,
                rotateY: 0,
                y: 0,

                duration: .7,

                ease:
                  "elastic.out(1,.55)",

                overwrite:
                  "auto"
              }
            );


            if (content) {

              gsap.to(
                content,
                {
                  z: 0,

                  duration: .6,

                  ease:
                    "power3.out",

                  overwrite:
                    "auto"
                }
              );

            }


            if (icon) {

              gsap.to(
                icon,
                {
                  z: 0,
                  scale: 1,

                  duration: .6,

                  ease:
                    "power3.out",

                  overwrite:
                    "auto"
                }
              );

            }

          }
        );


        /* ---------------------------------------------------
           Card entrance
        --------------------------------------------------- */

        if (
          typeof ScrollTrigger !==
          "undefined"
        ) {

          gsap.fromTo(
            card,

            {
              y: 50,
              opacity: 0
            },

            {
              y: 0,
              opacity: 1,

              duration:
                .9,

              ease:
                "power3.out",

              scrollTrigger: {

                trigger:
                  card,

                start:
                  "top 90%",

                once: true

              }

            }
          );

        }

      }
    );

  }


  /* =======================================================
     MOBILE CARD SAFETY
     ======================================================= */

  if (
    window.matchMedia(
      "(pointer: coarse)"
    ).matches
  ) {

    cards.forEach(
      (card) => {

        card.style.transform =
          "none";

      }
    );

  }


  /* =======================================================
     REFRESH AFTER PAGE LOAD
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
