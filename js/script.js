/* =========================================================
   PREACH LAW & CO.
   PREMIUM GSAP ANIMATION SYSTEM
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     ELEMENTS
  ======================================================= */

  const pageLoader = document.getElementById("pageLoader");
  const disclaimer = document.getElementById("disclaimer");
  const agreeBtn = document.getElementById("agreeBtn");
  const disagreeBtn = document.getElementById("disagreeBtn");

  const navbar = document.getElementById("navbar");
  const scrollProgress = document.getElementById("scrollProgress");

  const menuButton = document.getElementById("menuButton");
  const mobileMenu = document.getElementById("mobileMenu");


  /* =======================================================
     LUCIDE ICONS
  ======================================================= */

  function initIcons() {

    if (
      typeof window.lucide !== "undefined" &&
      typeof window.lucide.createIcons === "function"
    ) {
      try {
        window.lucide.createIcons();
      } catch (error) {
        console.warn("Lucide error:", error);
      }
    }

  }

  initIcons();


  /* =======================================================
     DISCLAIMER
  ======================================================= */

  function closeDisclaimer() {

    if (!disclaimer) return;

    disclaimer.classList.add("hidden");

    document.body.classList.remove("no-scroll");

    try {
      localStorage.setItem(
        "preachLawDisclaimerAccepted",
        "true"
      );
    } catch (error) {
      // Ignore storage errors
    }

  }


  function checkDisclaimer() {

    let accepted = false;

    try {

      accepted =
        localStorage.getItem(
          "preachLawDisclaimerAccepted"
        ) === "true";

    } catch (error) {

      accepted = false;

    }


    if (accepted) {

      disclaimer?.classList.add("hidden");

      document.body.classList.remove("no-scroll");

    } else {

      document.body.classList.add("no-scroll");

    }

  }


  agreeBtn?.addEventListener(
    "click",
    closeDisclaimer
  );


  disagreeBtn?.addEventListener(
    "click",
    () => {

      alert(
        "You must agree to the disclaimer to continue browsing this website."
      );

    }
  );


  checkDisclaimer();


  /* =======================================================
     MOBILE MENU
  ======================================================= */

  menuButton?.addEventListener(
    "click",
    () => {

      mobileMenu?.classList.toggle("open");

      const open =
        mobileMenu?.classList.contains("open");

      document.body.classList.toggle(
        "no-scroll",
        Boolean(open)
      );

    }
  );


  document
    .querySelectorAll(".mobile-menu a")
    .forEach(link => {

      link.addEventListener(
        "click",
        () => {

          mobileMenu?.classList.remove("open");

          document.body.classList.remove(
            "no-scroll"
          );

        }
      );

    });


  /* =======================================================
     SMOOTH ANCHOR LINKS
  ======================================================= */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

      link.addEventListener(
        "click",
        event => {

          const id =
            link.getAttribute("href");

          if (!id || id === "#") return;

          const target =
            document.querySelector(id);

          if (!target) return;

          event.preventDefault();

          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }
      );

    });


  /* =======================================================
     SCROLL PROGRESS + NAVBAR
  ======================================================= */

  function updateScroll() {

    const scrollTop =
      window.scrollY;

    const maxScroll =
      document.documentElement.scrollHeight -
      window.innerHeight;

    const progress =
      maxScroll > 0
        ? (scrollTop / maxScroll) * 100
        : 0;


    if (scrollProgress) {

      scrollProgress.style.width =
        progress + "%";

    }


    if (navbar) {

      if (scrollTop > 50) {

        navbar.classList.add("scrolled");

      } else {

        navbar.classList.remove("scrolled");

      }

    }

  }


  window.addEventListener(
    "scroll",
    updateScroll,
    { passive: true }
  );

  updateScroll();


  /* =======================================================
     FAIL-SAFE
  ======================================================= */

  function showEverything() {

    document
      .querySelectorAll(".reveal")
      .forEach(element => {

        element.style.opacity = "1";
        element.style.visibility = "visible";
        element.style.transform = "none";

      });


    document
      .querySelectorAll(
        ".hero-title .line > span"
      )
      .forEach(element => {

        element.style.opacity = "1";
        element.style.visibility = "visible";
        element.style.transform =
          "translateY(0)";

      });

  }


  /* =======================================================
     PAGE LOADER
  ======================================================= */

  function hideLoader() {

    if (!pageLoader) {

      startAnimations();

      return;

    }


    pageLoader.classList.add("loaded");

    startAnimations();

  }


  window.addEventListener(
    "load",
    () => {

      setTimeout(
        hideLoader,
        500
      );

    }
  );


  /*
     Backup in case window.load behaves strangely.
  */

  setTimeout(
    () => {

      if (
        pageLoader &&
        !pageLoader.classList.contains("loaded")
      ) {

        pageLoader.classList.add(
          "loaded"
        );

      }

      startAnimations();

    },
    2500
  );


  /* =======================================================
     MAIN GSAP ANIMATION
  ======================================================= */

  let animationsStarted = false;


  function startAnimations() {

    if (animationsStarted) return;

    animationsStarted = true;


    /* -----------------------------------------------------
       CHECK GSAP
    ----------------------------------------------------- */

    if (
      typeof window.gsap === "undefined"
    ) {

      console.warn(
        "GSAP was not loaded."
      );

      showEverything();

      return;

    }


    const gsap = window.gsap;


    /* -----------------------------------------------------
       CHECK SCROLLTRIGGER
    ----------------------------------------------------- */

    const hasScrollTrigger =
      typeof window.ScrollTrigger !==
      "undefined";


    try {

      if (hasScrollTrigger) {

        gsap.registerPlugin(
          window.ScrollTrigger
        );

      }


      /* ===================================================
         HERO TIMELINE
      =================================================== */

      const heroTimeline =
        gsap.timeline({
          defaults: {
            ease: "power4.out"
          }
        });


      /*
         HERO LABEL
      */

      heroTimeline.fromTo(
        ".hero-label",
        {
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8
        }
      );


      /*
         HERO TITLE
      */

      heroTimeline.fromTo(
        ".hero-title .line > span",
        {
          y: "120%",
          opacity: 0
        },
        {
          y: "0%",
          opacity: 1,

          duration: 1.15,

          stagger: 0.13,

          ease: "power4.out"
        },
        "-=0.35"
      );


      /*
         HERO DESCRIPTION
      */

      heroTimeline.fromTo(
        ".hero-description",
        {
          opacity: 0,
          y: 35
        },
        {
          opacity: 1,
          y: 0,

          duration: 0.8
        },
        "-=0.55"
      );


      /*
         HERO BUTTON
      */

      heroTimeline.fromTo(
        ".hero-button",
        {
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,

          duration: 0.8
        },
        "-=0.55"
      );


      /* ===================================================
         HERO GLOW
      =================================================== */

      gsap.to(
        ".glow-one",
        {
          x: 80,
          y: 100,

          duration: 7,

          repeat: -1,

          yoyo: true,

          ease: "sine.inOut"
        }
      );


      gsap.to(
        ".glow-two",
        {
          x: -70,
          y: -80,

          duration: 8,

          repeat: -1,

          yoyo: true,

          ease: "sine.inOut"
        }
      );


      /* ===================================================
         SCROLL REVEALS
      =================================================== */

      document
        .querySelectorAll(
          ".reveal"
        )
        .forEach(element => {

          /*
             Skip hero elements because
             hero already has its own timeline.
          */

          if (
            element.closest(".hero")
          ) {
            return;
          }


          if (hasScrollTrigger) {

            gsap.fromTo(
              element,

              {
                opacity: 0,
                y: 55
              },

              {
                opacity: 1,
                y: 0,

                duration: 0.9,

                ease: "power3.out",

                scrollTrigger: {

                  trigger: element,

                  start: "top 88%",

                  once: true

                }

              }
            );

          } else {

            gsap.fromTo(
              element,

              {
                opacity: 0,
                y: 55
              },

              {
                opacity: 1,
                y: 0,

                duration: 0.9,

                ease: "power3.out"
              }
            );

          }

        });


      /* ===================================================
         COUNTERS
      =================================================== */

      document
        .querySelectorAll(
          ".counter"
        )
        .forEach(counter => {

          const target =
            Number(
              counter.dataset.target
            ) || 0;


          const counterObject = {
            value: 0
          };


          const animation = {

            value: target,

            duration: 2.2,

            ease: "power2.out",

            onUpdate: () => {

              counter.textContent =
                Math.floor(
                  counterObject.value
                ).toLocaleString();

            },

            onComplete: () => {

              counter.textContent =
                target.toLocaleString();

            }

          };


          if (hasScrollTrigger) {

            animation.scrollTrigger = {

              trigger: counter,

              start: "top 85%",

              once: true

            };

          }


          gsap.to(
            counterObject,
            animation
          );

        });


      /* ===================================================
         MAGNETIC BUTTONS
      =================================================== */

      document
        .querySelectorAll(
          ".magnetic"
        )
        .forEach(button => {


          button.addEventListener(
            "mousemove",
            event => {

              if (
                window.innerWidth < 768
              ) {
                return;
              }


              const rect =
                button.getBoundingClientRect();


              const x =
                event.clientX -
                rect.left -
                rect.width / 2;


              const y =
                event.clientY -
                rect.top -
                rect.height / 2;


              gsap.to(
                button,
                {
                  x: x * 0.12,
                  y: y * 0.12,

                  duration: 0.35,

                  ease: "power3.out",

                  overwrite: true
                }
              );

            }
          );


          button.addEventListener(
            "mouseleave",
            () => {

              gsap.to(
                button,
                {
                  x: 0,
                  y: 0,

                  duration: 0.6,

                  ease: "elastic.out(1, 0.4)"
                }
              );

            }
          );

        });


      /* ===================================================
         EXPERTISE CARD HOVER
      =================================================== */

      document
        .querySelectorAll(
          ".expertise-card"
        )
        .forEach(card => {

          card.addEventListener(
            "mouseenter",
            () => {

              if (
                window.innerWidth < 768
              ) {
                return;
              }


              gsap.to(
                card,
                {
                  y: -10,

                  duration: 0.45,

                  ease: "power3.out"
                }
              );

            }
          );


          card.addEventListener(
            "mouseleave",
            () => {

              gsap.to(
                card,
                {
                  y: 0,

                  duration: 0.5,

                  ease: "power3.out"
                }
              );

            }
          );

        });


      /* ===================================================
         SERVICE HOVER
      =================================================== */

      document
        .querySelectorAll(
          ".service"
        )
        .forEach(service => {

          service.addEventListener(
            "mouseenter",
            () => {

              if (
                window.innerWidth < 768
              ) {
                return;
              }


              gsap.to(
                service.querySelector("svg"),
                {
                  x: 8,

                  duration: 0.3,

                  ease: "power2.out"
                }
              );

            }
          );


          service.addEventListener(
            "mouseleave",
            () => {

              gsap.to(
                service.querySelector("svg"),
                {
                  x: 0,

                  duration: 0.3
                }
              );

            }
          );

        });


      /* ===================================================
         PARALLAX
      =================================================== */

      if (hasScrollTrigger) {

        gsap.to(
          ".hero-grid",
          {
            y: 150,

            scrollTrigger: {

              trigger: ".hero",

              start: "top top",

              end: "bottom top",

              scrub: true

            }

          }
        );


        gsap.to(
          ".hero-number",
          {
            y: -100,

            scrollTrigger: {

              trigger: ".hero",

              start: "top top",

              end: "bottom top",

              scrub: true

            }

          }
        );

      }


      /* ===================================================
         REFRESH
      =================================================== */

      if (hasScrollTrigger) {

        window.ScrollTrigger.refresh();

      }


      initIcons();


      console.log(
        "Preach Law animations initialized successfully."
      );


    } catch (error) {

      console.error(
        "GSAP animation error:",
        error
      );

      /*
         Never leave the website blank.
      */

      showEverything();

    }

  });


  /* =======================================================
     RESIZE
  ======================================================= */

  let resizeTimer = null;


  window.addEventListener(
    "resize",
    () => {

      clearTimeout(
        resizeTimer
      );


      resizeTimer = setTimeout(
        () => {

          if (
            typeof window.ScrollTrigger !==
            "undefined"
          ) {

            window.ScrollTrigger.refresh();

          }

          initIcons();

        },
        300
      );

    }
  );

});
