/* =========================================================
   PREACH LAW & CO.
   SCROLL ANIMATION ENGINE
   GSAP + ScrollTrigger
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     CHECK GSAP
     ======================================================= */

  if (typeof gsap === "undefined") {
    console.warn("GSAP is not loaded.");
    return;
  }

  if (typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }


  /* =======================================================
     GLOBAL SETTINGS
     ======================================================= */

  gsap.defaults({
    ease: "power3.out"
  });


  /* =======================================================
     HERO INTRO
     ======================================================= */

  const heroLines =
    document.querySelectorAll(
      ".hero-title .line > span"
    );

  if (heroLines.length) {

    gsap.fromTo(
      heroLines,

      {
        y: "110%",
        opacity: 0
      },

      {
        y: "0%",
        opacity: 1,
        duration: 1.1,
        stagger: 0.12,
        delay: 0.7
      }
    );

  }


  /* =======================================================
     HERO LABEL
     ======================================================= */

  const heroLabel =
    document.querySelector(
      ".hero-label"
    );

  if (heroLabel) {

    gsap.fromTo(
      heroLabel,

      {
        y: 20,
        opacity: 0
      },

      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.4
      }
    );

  }


  /* =======================================================
     HERO DESCRIPTION
     ======================================================= */

  const heroDescription =
    document.querySelector(
      ".hero-description"
    );

  if (heroDescription) {

    gsap.fromTo(
      heroDescription,

      {
        y: 35,
        opacity: 0
      },

      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 1.15
      }
    );

  }


  /* =======================================================
     HERO BUTTON
     ======================================================= */

  const heroButton =
    document.querySelector(
      ".hero-button"
    );

  if (heroButton) {

    gsap.fromTo(
      heroButton,

      {
        y: 30,
        opacity: 0,
        scale: 0.96
      },

      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.9,
        delay: 1.35
      }
    );

  }


  /* =======================================================
     GENERIC REVEALS
     ======================================================= */

  if (
    typeof ScrollTrigger !== "undefined"
  ) {

    const revealElements =
      document.querySelectorAll(
        ".reveal"
      );


    revealElements.forEach(
      (element) => {

        /*
         * Don't animate elements that
         * already belong to the hero.
         */

        if (
          element.closest(".hero")
        ) {
          return;
        }


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

            scrollTrigger: {

              trigger: element,

              start:
                "top 88%",

              toggleActions:
                "play none none none"

            }

          }

        );

      }
    );

  }


  /* =======================================================
     PHILOSOPHY SECTION
     ======================================================= */

  const philosophy =
    document.querySelector(
      ".philosophy"
    );

  if (
    philosophy &&
    typeof ScrollTrigger !== "undefined"
  ) {

    const heading =
      philosophy.querySelector(
        "h2"
      );

    const paragraphs =
      philosophy.querySelectorAll(
        "p"
      );

    if (heading) {

      gsap.fromTo(

        heading,

        {
          y: 70,
          opacity: 0
        },

        {
          y: 0,
          opacity: 1,
          duration: 1.1,

          scrollTrigger: {

            trigger: philosophy,

            start:
              "top 75%",

            toggleActions:
              "play none none none"

          }

        }

      );

    }


    if (paragraphs.length) {

      gsap.fromTo(

        paragraphs,

        {
          y: 30,
          opacity: 0
        },

        {
          y: 0,
          opacity: 1,
          duration: .8,
          stagger: .14,

          scrollTrigger: {

            trigger: philosophy,

            start:
              "top 65%",

            toggleActions:
              "play none none none"

          }

        }

      );

    }

  }


  /* =======================================================
     PRACTICE CARDS STAGGER
     ======================================================= */

  const practiceCards =
    document.querySelectorAll(
      ".practice-card"
    );

  if (
    practiceCards.length &&
    typeof ScrollTrigger !== "undefined"
  ) {

    gsap.fromTo(

      practiceCards,

      {
        y: 70,
        opacity: 0
      },

      {
        y: 0,
        opacity: 1,

        duration: .9,

        stagger: .12,

        scrollTrigger: {

          trigger:
            ".practice-grid",

          start:
            "top 80%",

          toggleActions:
            "play none none none"

        }

      }

    );

  }


  /* =======================================================
     STATS
     ======================================================= */

  const stats =
    document.querySelectorAll(
      ".stat"
    );

  if (
    stats.length &&
    typeof ScrollTrigger !== "undefined"
  ) {

    gsap.fromTo(

      stats,

      {
        y: 45,
        opacity: 0
      },

      {
        y: 0,
        opacity: 1,

        duration: .8,

        stagger: .15,

        scrollTrigger: {

          trigger:
            ".stats-section",

          start:
            "top 80%",

          toggleActions:
            "play none none none"

        }

      }

    );

  }


  /* =======================================================
     MARQUEE PARALLAX
     ======================================================= */

  const marquee =
    document.querySelector(
      ".marquee"
    );

  if (
    marquee &&
    typeof ScrollTrigger !== "undefined"
  ) {

    gsap.to(

      marquee,

      {
        xPercent: -10,

        ease: "none",

        scrollTrigger: {

          trigger:
            ".marquee-section",

          start:
            "top bottom",

          end:
            "bottom top",

          scrub: 1

        }

      }

    );

  }


  /* =======================================================
     CTA REVEAL
     ======================================================= */

  const cta =
    document.querySelector(
      ".cta-section"
    );

  if (
    cta &&
    typeof ScrollTrigger !== "undefined"
  ) {

    const ctaItems =
      cta.querySelectorAll(
        ".reveal"
      );

    if (ctaItems.length) {

      gsap.fromTo(

        ctaItems,

        {
          y: 55,
          opacity: 0
        },

        {
          y: 0,
          opacity: 1,

          duration: 1,

          stagger: .15,

          scrollTrigger: {

            trigger: cta,

            start:
              "top 75%",

            toggleActions:
              "play none none none"

          }

        }

      );

    }

  }


  /* =======================================================
     CONTACT REVEAL
     ======================================================= */

  const contact =
    document.querySelector(
      ".contact-preview"
    );

  if (
    contact &&
    typeof ScrollTrigger !== "undefined"
  ) {

    gsap.fromTo(

      contact.querySelectorAll(
        ".contact-item"
      ),

      {
        x: 40,
        opacity: 0
      },

      {
        x: 0,
        opacity: 1,

        duration: .9,

        stagger: .15,

        scrollTrigger: {

          trigger: contact,

          start:
            "top 75%",

          toggleActions:
            "play none none none"

        }

      }

    );

  }


  /* =======================================================
     FOOTER
     ======================================================= */

  const footer =
    document.querySelector(
      ".site-footer"
    );

  if (
    footer &&
    typeof ScrollTrigger !== "undefined"
  ) {

    gsap.fromTo(

      footer.querySelectorAll(
        ".footer-brand, .footer-links"
      ),

      {
        y: 35,
        opacity: 0
      },

      {
        y: 0,
        opacity: 1,

        duration: .9,

        stagger: .15,

        scrollTrigger: {

          trigger: footer,

          start:
            "top 85%",

          toggleActions:
            "play none none none"

        }

      }

    );

  }


  /* =======================================================
     HERO PARALLAX
     ======================================================= */

  if (
    typeof ScrollTrigger !== "undefined"
  ) {

    const hero =
      document.querySelector(
        ".hero"
      );

    if (hero) {

      const heroContent =
        hero.querySelector(
          ".hero-inner"
        );

      if (heroContent) {

        gsap.to(

          heroContent,

          {

            y: 100,
            opacity: 0.25,

            ease: "none",

            scrollTrigger: {

              trigger: hero,

              start:
                "top top",

              end:
                "bottom top",

              scrub: 1

            }

          }

        );

      }

    }

  }


  /* =======================================================
     REFRESH SCROLLTRIGGER
     ======================================================= */

  if (
    typeof ScrollTrigger !== "undefined"
  ) {

    window.addEventListener(
      "load",
      () => {

        setTimeout(
          () => {

            ScrollTrigger.refresh();

          },
          300
        );

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
        setTimeout(
          () => {

            if (
              typeof ScrollTrigger !==
              "undefined"
            ) {

              ScrollTrigger.refresh();

            }

          },
          250
        );

    }
  );

});
