/* =========================================================
   PREACH LAW & CO.
   MAIN JAVASCRIPT
   FAIL-SAFE GSAP ANIMATION SYSTEM
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     BASIC ELEMENTS
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

  function loadIcons() {
    try {
      if (window.lucide) {
        window.lucide.createIcons();
      }
    } catch (error) {
      console.warn("Lucide icons could not be loaded.");
    }
  }

  loadIcons();


  /* =======================================================
     PAGE LOADER
  ======================================================= */

  window.addEventListener("load", () => {

    setTimeout(() => {

      if (pageLoader) {
        pageLoader.classList.add("loaded");
      }

      startAnimations();

    }, 700);

  });


  /* =======================================================
     SAFETY FALLBACK
     If external scripts fail, text still appears.
  ======================================================= */

  setTimeout(() => {

    document.body.classList.add("animations-ready");

  }, 100);


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
      console.warn("Local storage unavailable.");
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


  agreeBtn?.addEventListener("click", closeDisclaimer);


  disagreeBtn?.addEventListener("click", () => {

    alert(
      "You must agree to the disclaimer to continue browsing this website."
    );

  });


  checkDisclaimer();


  /* =======================================================
     MOBILE MENU
  ======================================================= */

  menuButton?.addEventListener("click", () => {

    mobileMenu?.classList.toggle("open");

    const isOpen =
      mobileMenu?.classList.contains("open");

    document.body.classList.toggle(
      "no-scroll",
      Boolean(isOpen)
    );

  });


  document.querySelectorAll(".mobile-menu a").forEach(link => {

    link.addEventListener("click", () => {

      mobileMenu?.classList.remove("open");

      document.body.classList.remove("no-scroll");

    });

  });


  /* =======================================================
     SMOOTH ANCHOR SCROLL
  ======================================================= */

  document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

      const targetId =
        link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target =
        document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });


  /* =======================================================
     SCROLL HANDLER
  ======================================================= */

  function updateScroll() {

    const scrollTop =
      window.scrollY;

    const documentHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;

    const percentage =
      documentHeight > 0
        ? (scrollTop / documentHeight) * 100
        : 0;

    if (scrollProgress) {
      scrollProgress.style.width =
        `${percentage}%`;
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
     GSAP ANIMATIONS
  ======================================================= */

  function startAnimations() {

    /*
      IMPORTANT:
      If GSAP doesn't load, everything remains visible.
    */

    if (
      typeof window.gsap === "undefined"
    ) {

      console.warn(
        "GSAP unavailable. Using safe CSS mode."
      );

      document.body.classList.remove(
        "animations-ready"
      );

      document.querySelectorAll(".reveal").forEach(el => {

        el.style.opacity = "1";
        el.style.visibility = "visible";
        el.style.transform = "none";

      });

      return;

    }


    const gsap = window.gsap;


    try {

      /*
        Register ScrollTrigger if available.
      */

      if (window.ScrollTrigger) {

        gsap.registerPlugin(
          window.ScrollTrigger
        );

      }


      /*
        Enable animated initial state.
      */

      document.body.classList.add(
        "animations-ready"
      );


      /* ===================================================
         HERO
      =================================================== */

      const heroTimeline =
        gsap.timeline({
          defaults: {
            ease: "power4.out"
          }
        });


      heroTimeline.to(
        ".hero-label",
        {
          opacity: 1,
          y: 0,
          duration: .8
        }
      );


      heroTimeline.to(
        ".hero-title .line > span",
        {
          y: "0%",
          duration: 1.1,
          stagger: .12
        },
        "-=.45"
      );


      heroTimeline.to(
        ".hero-description",
        {
          opacity: 1,
          y: 0,
          duration: .8
        },
        "-=.55"
      );


      heroTimeline.to(
        ".hero-button",
        {
          opacity: 1,
          y: 0,
          duration: .8
        },
        "-=.6"
      );


      /* ===================================================
         REVEAL ELEMENTS
      =================================================== */

      const revealElements =
        document.querySelectorAll(
          ".reveal"
        );


      revealElements.forEach(element => {

        /*
          Don't animate hero elements twice.
        */

        if (
          element.closest(".hero")
        ) {
          return;
        }


        if (
          window.ScrollTrigger
        ) {

          gsap.to(
            element,
            {
              opacity: 1,
              y: 0,

              duration: .9,

              ease: "power3.out",

              scrollTrigger: {

                trigger: element,

                start: "top 88%",

                once: true

              }
            }
          );

        } else {

          gsap.to(
            element,
            {
              opacity: 1,
              y: 0,
              duration: .8,
              ease: "power3.out"
            }
          );

        }

      });


      /* ===================================================
         COUNTERS
      =================================================== */

      document.querySelectorAll(
        ".counter"
      ).forEach(counter => {

        const target =
          Number(
            counter.dataset.target
          ) || 0;


        if (window.ScrollTrigger) {

          gsap.to(
            counter,
            {
              innerText: target,

              duration: 2,

              ease: "power2.out",

              snap: {
                innerText: 1
              },

              scrollTrigger: {

                trigger: counter,

                start: "top 85%",

                once: true

              },

              onUpdate: function () {

                counter.innerText =
                  Math.floor(
                    Number(
                      counter.innerText
                    )
                  ).toLocaleString();

              },

              onComplete: function () {

                counter.innerText =
                  target.toLocaleString();

              }

            }
          );

        } else {

          counter.innerText =
            target.toLocaleString();

        }

      });


      /* ===================================================
         MAGNETIC BUTTONS
      =================================================== */

      document.querySelectorAll(
        ".magnetic"
      ).forEach(button => {

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
                x: x * .12,
                y: y * .12,

                duration: .35,

                ease: "power2.out"
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

                duration: .5,

                ease: "elastic.out(1, .4)"
              }
            );

          }
        );

      });


      /* ===================================================
         EXPERTISE CARDS
      =================================================== */

      document.querySelectorAll(
        ".expertise-card"
      ).forEach(card => {

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
                y: -8,
                duration: .4,
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
                duration: .5,
                ease: "power3.out"
              }
            );

          }
        );

      });


      /* ===================================================
         PARALLAX GLOW
      =================================================== */

      if (window.ScrollTrigger) {

        gsap.to(
          ".glow-one",
          {
            y: 250,

            scrollTrigger: {

              trigger: ".hero",

              start: "top top",

              end: "bottom top",

              scrub: true

            }
          }
        );


        gsap.to(
          ".glow-two",
          {
            y: -200,

            scrollTrigger: {

              trigger: ".hero",

              start: "top top",

              end: "bottom top",

              scrub: true

            }
          }
        );

      }


      /*
        Refresh ScrollTrigger after everything
        has been initialized.
      */

      if (
        window.ScrollTrigger
      ) {

        window.ScrollTrigger.refresh();

      }


      /*
        Re-create icons after animation setup.
      */

      loadIcons();


    } catch (error) {

      /*
        CRITICAL FALLBACK:
        Never leave the website blank because
        an animation failed.
      */

      console.error(
        "Animation error:",
        error
      );


      document.body.classList.remove(
        "animations-ready"
      );


      document.querySelectorAll(
        ".reveal"
      ).forEach(element => {

        element.style.opacity = "1";
        element.style.visibility = "visible";
        element.style.transform = "none";

      });


      document.querySelectorAll(
        ".hero-title .line > span"
      ).forEach(element => {

        element.style.transform =
          "translateY(0)";

      });

    }

  }


  /* =======================================================
     RESIZE
  ======================================================= */

  let resizeTimer;

  window.addEventListener(
    "resize",
    () => {

      clearTimeout(resizeTimer);

      resizeTimer = setTimeout(() => {

        if (window.ScrollTrigger) {
          window.ScrollTrigger.refresh();
        }

        loadIcons();

      }, 250);

    }
  );


});
