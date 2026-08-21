/* =========================================================
   PREACH LAW & CO.
   PREMIUM ANIMATION ENGINE
   GSAP + ScrollTrigger
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* -------------------------------------------------------
     CHECK GSAP
  ------------------------------------------------------- */

  if (typeof gsap === "undefined") {
    console.warn("GSAP not loaded.");
    return;
  }

  if (typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }


  /* -------------------------------------------------------
     PAGE LOADER
     ------------------------------------------------------- */

  const loader = document.getElementById("pageLoader");

  const startPage = () => {

    const timeline = gsap.timeline({
      defaults: {
        ease: "power4.out"
      }
    });

    timeline
      .to(".loader-monogram", {
        scale: 1.08,
        duration: 0.7
      })
      .to(".loader-inner", {
        opacity: 0,
        y: -20,
        duration: 0.45
      })
      .to(loader, {
        yPercent: -100,
        duration: 0.9,
        ease: "power4.inOut"
      });

    /* HERO */

    timeline.fromTo(
      ".hero-label",
      {
        opacity: 0,
        y: 25
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.7
      },
      "-=.25"
    );

    timeline.fromTo(
      ".hero-title .line > span",
      {
        yPercent: 110,
        rotate: 2
      },
      {
        yPercent: 0,
        rotate: 0,
        duration: 1.1,
        stagger: 0.09,
        ease: "power4.out"
      },
      "-=.45"
    );

    timeline.fromTo(
      ".hero-description",
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8
      },
      "-=.65"
    );

    timeline.fromTo(
      ".hero-button",
      {
        opacity: 0,
        y: 25
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.7
      },
      "-=.55"
    );

  };


  /* -------------------------------------------------------
     WAIT FOR PAGE
     ------------------------------------------------------- */

  if (document.readyState === "complete") {
    setTimeout(startPage, 250);
  } else {
    window.addEventListener("load", () => {
      setTimeout(startPage, 250);
    });
  }


  /* -------------------------------------------------------
     REVEAL ANIMATIONS
     ------------------------------------------------------- */

  if (typeof ScrollTrigger !== "undefined") {

    gsap.utils.toArray(".reveal").forEach((element) => {

      /*
       * Don't animate hero elements twice.
       */

      if (
        element.closest(".hero") ||
        element.closest(".page-loader")
      ) {
        return;
      }

      gsap.fromTo(
        element,
        {
          opacity: 0,
          y: 45
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power4.out",

          scrollTrigger: {
            trigger: element,
            start: "top 88%",
            once: true
          }
        }
      );

    });


    /* -----------------------------------------------------
       PRACTICE CARDS
       ----------------------------------------------------- */

    const cards =
      gsap.utils.toArray(".practice-card");

    if (cards.length) {

      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 60
        },
        {
          opacity: 1,
          y: 0,

          duration: 1,

          stagger: {
            each: 0.12
          },

          ease: "power4.out",

          scrollTrigger: {
            trigger: ".practice-grid",
            start: "top 80%",
            once: true
          }
        }
      );

    }


    /* -----------------------------------------------------
       STATS
       ----------------------------------------------------- */

    gsap.utils.toArray(".counter").forEach((counter) => {

      const target =
        Number(counter.dataset.target || 0);

      const obj = {
        value: 0
      };

      gsap.to(obj, {

        value: target,

        duration: 2,

        ease: "power2.out",

        scrollTrigger: {
          trigger: counter,
          start: "top 85%",
          once: true
        },

        onUpdate: () => {

          counter.textContent =
            Math.floor(obj.value).toLocaleString();

        }

      });

    });


    /* -----------------------------------------------------
       SECTION TITLES
       ----------------------------------------------------- */

    gsap.utils.toArray(
      ".section-title, .contact-title, .cta-content h2"
    ).forEach((title) => {

      gsap.fromTo(
        title,

        {
          opacity: 0,
          y: 70
        },

        {
          opacity: 1,
          y: 0,

          duration: 1.15,

          ease: "power4.out",

          scrollTrigger: {
            trigger: title,
            start: "top 82%",
            once: true
          }

        }

      );

    });


    /* -----------------------------------------------------
       PHILOSOPHY TEXT
       ----------------------------------------------------- */

    const philosophy =
      document.querySelector(".philosophy-main");

    if (philosophy) {

      gsap.fromTo(
        philosophy,
        {
          opacity: 0,
          x: 50
        },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: "power4.out",

          scrollTrigger: {
            trigger: philosophy,
            start: "top 78%",
            once: true
          }
        }
      );

    }


    /* -----------------------------------------------------
       CTA GLOW
       ----------------------------------------------------- */

    const ctaBg =
      document.querySelector(".cta-bg");

    if (ctaBg) {

      gsap.to(ctaBg, {

        scale: 1.2,

        duration: 5,

        repeat: -1,

        yoyo: true,

        ease: "sine.inOut"

      });

    }


    /* -----------------------------------------------------
       HERO GLOW PARALLAX
       ----------------------------------------------------- */

    const glowOne =
      document.querySelector(".glow-one");

    const glowTwo =
      document.querySelector(".glow-two");

    if (glowOne) {

      gsap.to(glowOne, {

        x: 100,
        y: 80,

        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 1.5
        }

      });

    }


    if (glowTwo) {

      gsap.to(glowTwo, {

        x: -80,
        y: -60,

        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 1.5
        }

      });

    }

  }


  /* -------------------------------------------------------
     MAGNETIC BUTTONS
     ------------------------------------------------------- */

  const magneticElements =
    document.querySelectorAll(".magnetic");

  magneticElements.forEach((element) => {

    element.addEventListener("mousemove", (event) => {

      const rect =
        element.getBoundingClientRect();

      const x =
        event.clientX -
        rect.left -
        rect.width / 2;

      const y =
        event.clientY -
        rect.top -
        rect.height / 2;

      gsap.to(element, {

        x: x * 0.18,

        y: y * 0.18,

        duration: 0.45,

        ease: "power3.out"

      });

    });


    element.addEventListener("mouseleave", () => {

      gsap.to(element, {

        x: 0,

        y: 0,

        duration: 0.7,

        ease: "elastic.out(1,0.35)"

      });

    });

  });


  /* -------------------------------------------------------
     PRACTICE CARD TILT
     ------------------------------------------------------- */

  document
    .querySelectorAll(".practice-card")
    .forEach((card) => {

      card.addEventListener("mousemove", (event) => {

        const rect =
          card.getBoundingClientRect();

        const x =
          event.clientX -
          rect.left;

        const y =
          event.clientY -
          rect.top;

        const rotateY =
          ((x / rect.width) - 0.5) * 5;

        const rotateX =
          ((y / rect.height) - 0.5) * -5;

        gsap.to(card, {

          rotateX,
          rotateY,

          transformPerspective: 900,

          duration: 0.4,

          ease: "power2.out"

        });

      });


      card.addEventListener("mouseleave", () => {

        gsap.to(card, {

          rotateX: 0,

          rotateY: 0,

          duration: 0.7,

          ease: "power3.out"

        });

      });

    });


  /* -------------------------------------------------------
     LUCIDE ICONS
     ------------------------------------------------------- */

  if (typeof lucide !== "undefined") {

    lucide.createIcons();

  }


  /* -------------------------------------------------------
     REFRESH SCROLLTRIGGER
     ------------------------------------------------------- */

  if (typeof ScrollTrigger !== "undefined") {

    setTimeout(() => {

      ScrollTrigger.refresh();

    }, 500);

  }

});
