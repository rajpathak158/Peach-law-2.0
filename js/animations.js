/* =========================================================
   PREACH LAW & CO.
   ANIMATIONS.JS
   PHASE 2 — STEP 3
   CINEMATIC STATISTICS + EXISTING ANIMATIONS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  if (typeof gsap === "undefined") {
    console.warn("GSAP is not loaded.");
    return;
  }

  if (typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }


  /* =======================================================
     HERO
     ======================================================= */

  const hero = document.querySelector(".hero");

  if (hero) {

    const label =
      hero.querySelector(".hero-label");

    const lines =
      hero.querySelectorAll(
        ".hero-title .line > span"
      );

    const description =
      hero.querySelector(".hero-description");

    const button =
      hero.querySelector(".hero-button");

    const side =
      hero.querySelector(".hero-side");

    const scroll =
      hero.querySelector(".hero-scroll");

    const number =
      hero.querySelector(".hero-number");


    gsap.set(lines, {
      yPercent: 110,
      opacity: 0
    });


    if (label) {
      gsap.set(label, {
        y: 25,
        opacity: 0
      });
    }


    if (description) {
      gsap.set(description, {
        y: 30,
        opacity: 0
      });
    }


    if (button) {
      gsap.set(button, {
        y: 30,
        opacity: 0
      });
    }


    if (side) {
      gsap.set(side, {
        opacity: 0
      });
    }


    if (scroll) {
      gsap.set(scroll, {
        opacity: 0,
        y: 20
      });
    }


    if (number) {
      gsap.set(number, {
        opacity: 0,
        y: 20
      });
    }


    const timeline =
      gsap.timeline({
        delay: .2,
        defaults: {
          ease: "power4.out"
        }
      });


    if (label) {

      timeline.to(
        label,
        {
          y: 0,
          opacity: 1,
          duration: .8
        },
        0
      );

    }


    timeline.to(
      lines,
      {
        yPercent: 0,
        opacity: 1,
        duration: 1.15,
        stagger: .12
      },
      .12
    );


    if (description) {

      timeline.to(
        description,
        {
          y: 0,
          opacity: 1,
          duration: .8
        },
        .75
      );

    }


    if (button) {

      timeline.to(
        button,
        {
          y: 0,
          opacity: 1,
          duration: .8
        },
        .85
      );

    }


    if (side) {

      timeline.to(
        side,
        {
          opacity: 1,
          duration: .7
        },
        1
      );

    }


    if (scroll) {

      timeline.to(
        scroll,
        {
          opacity: 1,
          y: 0,
          duration: .7
        },
        1.1
      );

    }


    if (number) {

      timeline.to(
        number,
        {
          opacity: 1,
          y: 0,
          duration: .7
        },
        1.1
      );

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
            (event.clientX - rect.left) /
            rect.width - .5;

          mouseY =
            (event.clientY - rect.top) /
            rect.height - .5;

        }
      );


      function heroDepth() {

        currentX +=
          (mouseX - currentX) * .045;

        currentY +=
          (mouseY - currentY) * .045;


        if (label) {
          gsap.set(label, {
            x: currentX * 8
          });
        }


        if (description) {
          gsap.set(description, {
            x: currentX * 5
          });
        }


        if (button) {
          gsap.set(button, {
            x: currentX * -5
          });
        }


        requestAnimationFrame(
          heroDepth
        );

      }


      requestAnimationFrame(
        heroDepth
      );

    }

  }


  /* =======================================================
     HERO PARALLAX
     ======================================================= */

  if (
    typeof ScrollTrigger !== "undefined" &&
    hero
  ) {

    const grid =
      document.querySelector(".hero-grid");

    const glowOne =
      document.querySelector(".glow-one");

    const glowTwo =
      document.querySelector(".glow-two");


    if (grid) {

      gsap.to(
        grid,
        {
          y: 100,

          ease: "none",

          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 1.4
          }
        }
      );

    }


    if (glowOne) {

      gsap.to(
        glowOne,
        {
          x: -70,
          y: 120,

          ease: "none",

          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 1.6
          }
        }
      );

    }


    if (glowTwo) {

      gsap.to(
        glowTwo,
        {
          x: 60,
          y: -80,

          ease: "none",

          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 2
          }
        }
      );

    }

  }


  /* =======================================================
     GENERAL REVEALS
     ======================================================= */

  if (
    typeof ScrollTrigger !== "undefined"
  ) {

    document
      .querySelectorAll(
        ".reveal:not(.hero .reveal)"
      )
      .forEach(
        (element) => {

          gsap.fromTo(
            element,

            {
              y: 55,
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
     PREMIUM STATISTICS
     ======================================================= */

  const statsSection =
    document.querySelector(
      ".stats-section"
    );


  const counters =
    document.querySelectorAll(
      ".counter"
    );


  if (
    statsSection &&
    counters.length &&
    typeof ScrollTrigger !== "undefined"
  ) {


    /* -----------------------------------------------------
       Statistics section entrance
       ----------------------------------------------------- */

    const stats =
      statsSection.querySelectorAll(
        ".stat"
      );


    gsap.fromTo(
      stats,

      {
        y: 70,
        opacity: 0,
        scale: .96
      },

      {
        y: 0,
        opacity: 1,
        scale: 1,

        duration: 1.1,

        stagger: .12,

        ease:
          "power4.out",

        scrollTrigger: {

          trigger:
            statsSection,

          start:
            "top 82%",

          once: true,

          onEnter: () => {

            animateCounters();

          }

        }

      }
    );


    /* -----------------------------------------------------
       Counter animation
       ----------------------------------------------------- */

    function animateCounters() {

      counters.forEach(
        (counter) => {

          const target =
            Number(
              counter.dataset.target
            );


          const object = {
            value: 0
          };


          gsap.to(
            object,
            {

              value:
                target,

              duration:
                2.4,

              ease:
                "power3.out",

              onUpdate: () => {

                counter.textContent =
                  Math.floor(
                    object.value
                  ).toLocaleString();

              }

            }
          );


          /* Gold flash */

          gsap.fromTo(
            counter,

            {
              textShadow:
                "0 0 0 rgba(200,169,107,0)"
            },

            {

              textShadow:
                "0 0 35px rgba(200,169,107,.45)",

              duration:
                .8,

              yoyo:
                true,

              repeat:
                1,

              ease:
                "power2.inOut"

            }
          );

        }
      );

    }

  }


  /* =======================================================
     STAT HOVER
     ======================================================= */

  if (
    window.matchMedia(
      "(pointer: fine)"
    ).matches
  ) {

    document
      .querySelectorAll(
        ".stat"
      )
      .forEach(
        (stat) => {

          const number =
            stat.querySelector(
              ".stat-number"
            );


          stat.addEventListener(
            "mouseenter",
            () => {

              gsap.to(
                stat,
                {
                  y: -8,
                  duration: .45,
                  ease: "power3.out"
                }
              );


              if (number) {

                gsap.to(
                  number,
                  {
                    scale: 1.06,
                    duration: .5,
                    ease: "power3.out"
                  }
                );

              }

            }
          );


          stat.addEventListener(
            "mouseleave",
            () => {

              gsap.to(
                stat,
                {
                  y: 0,
                  duration: .6,
                  ease:
                    "elastic.out(1,.5)"
                }
              );


              if (number) {

                gsap.to(
                  number,
                  {
                    scale: 1,
                    duration: .5,
                    ease:
                      "power3.out"
                  }
                );

              }

            }
          );

        }
      );

  }


  /* =======================================================
     PREMIUM PRACTICE CARDS
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
                centerX) * 5;


            const rotateX =
              ((centerY - y) /
                centerY) * 5;


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
                rotateX,
                rotateY,
                y: -10,

                duration:
                  .45,

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
                  z: 20,

                  duration:
                    .45,

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
                  z: 35,
                  scale: 1.1,

                  duration:
                    .45,

                  ease:
                    "power3.out",

                  overwrite:
                    "auto"
                }
              );

            }

          }
        );


        card.addEventListener(
          "mouseleave",
          () => {

            gsap.to(
              card,
              {
                rotateX: 0,
                rotateY: 0,
                y: 0,

                duration:
                  .8,

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

                  duration:
                    .6,

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

                  duration:
                    .6,

                  ease:
                    "power3.out",

                  overwrite:
                    "auto"
                  }
                );

            }

          }
        );

      }
    );

  }


  /* =======================================================
     CTA PARALLAX
     ======================================================= */

  const cta =
    document.querySelector(
      ".cta-section"
    );


  if (
    cta &&
    typeof ScrollTrigger !== "undefined"
  ) {

    const ctaBg =
      cta.querySelector(
        ".cta-bg"
      );


    if (ctaBg) {

      gsap.to(
        ctaBg,
        {
          y: -100,
          scale: 1.12,

          ease: "none",

          scrollTrigger: {

            trigger: cta,

            start:
              "top bottom",

            end:
              "bottom top",

            scrub: 1.5

          }

        }
      );

    }

  }


  /* =======================================================
     FINAL REFRESH
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
