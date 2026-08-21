/* =========================================================
   PREACH LAW
   ANIMATION ENGINE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  lucide.createIcons();

  gsap.registerPlugin(ScrollTrigger);


  /* =======================================================
     PAGE LOADER
  ======================================================= */

  const loader = document.getElementById("pageLoader");
  const loaderLine = document.querySelector(".loader-line span");

  const loaderTimeline = gsap.timeline();

  loaderTimeline

    .to(loaderLine, {
      width: "100%",
      duration: 1.5,
      ease: "power2.inOut"
    })

    .to(loader, {
      yPercent: -100,
      duration: 1.1,
      ease: "power4.inOut",
      delay: .25
    })

    .set(loader, {
      display: "none"
    })

    .add(() => {
      if (localStorage.getItem("preach_law_disclaimer") !== "true") {
        openDisclaimer();
      } else {
        startWebsiteAnimations();
      }
    });


  /* =======================================================
     DISCLAIMER
  ======================================================= */

  const disclaimer = document.getElementById("disclaimer");

  const agreeBtn = document.getElementById("agreeBtn");

  const disagreeBtn = document.getElementById("disagreeBtn");


  function openDisclaimer() {

    document.body.classList.add("no-scroll");

    gsap.fromTo(
      ".disclaimer-card",
      {
        opacity: 0,
        y: 60,
        scale: .96
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: .9,
        ease: "power3.out"
      }
    );

  }


  agreeBtn.addEventListener("click", () => {

    localStorage.setItem(
      "preach_law_disclaimer",
      "true"
    );

    gsap.to(".disclaimer-card", {

      opacity: 0,
      y: -30,
      duration: .4,

      onComplete: () => {

        gsap.to(disclaimer, {

          opacity: 0,

          duration: .5,

          onComplete: () => {

            disclaimer.classList.add("hidden");

            document.body.classList.remove("no-scroll");

            startWebsiteAnimations();

          }

        });

      }

    });

  });


  disagreeBtn.addEventListener("click", () => {

    window.history.back();

  });


  /* =======================================================
     MAIN WEBSITE ANIMATIONS
  ======================================================= */

  function startWebsiteAnimations() {

    /* Hero title */

    gsap.from(".hero-title .line span", {

      yPercent: 110,

      duration: 1.2,

      stagger: .08,

      ease: "power4.out",

      delay: .15

    });


    gsap.from(".hero-label", {

      opacity: 0,

      x: -30,

      duration: 1,

      delay: .5,

      ease: "power3.out"

    });


    gsap.from(".hero-description", {

      opacity: 0,

      y: 30,

      duration: 1,

      delay: .8,

      ease: "power3.out"

    });


    gsap.from(".hero-button", {

      opacity: 0,

      y: 30,

      duration: 1,

      delay: .9,

      ease: "power3.out"

    });


    gsap.from(".hero-scroll", {

      opacity: 0,

      duration: 1,

      delay: 1.4

    });


    /* Scroll reveals */

    gsap.utils.toArray(".reveal").forEach((element) => {

      gsap.from(element, {

        scrollTrigger: {

          trigger: element,

          start: "top 88%",

          toggleActions: "play none none reverse"

        },

        opacity: 0,

        y: 50,

        duration: .9,

        ease: "power3.out"

      });

    });


    /* Counters */

    gsap.utils.toArray(".counter").forEach((counter) => {

      const target = Number(
        counter.dataset.target
      );

      gsap.to(counter, {

        scrollTrigger: {

          trigger: counter,

          start: "top 85%",

          once: true

        },

        innerText: target,

        duration: 2,

        ease: "power2.out",

        snap: {
          innerText: 1
        }

      });

    });


    /* Service stagger */

    gsap.from(".service", {

      scrollTrigger: {

        trigger: ".services-list",

        start: "top 80%"

      },

      opacity: 0,

      x: -40,

      duration: .7,

      stagger: .06,

      ease: "power3.out"

    });


    /* CTA circles */

    gsap.to(".cta-bg", {

      rotation: 360,

      duration: 40,

      repeat: -1,

      ease: "none"

    });


    /* Hero glow */

    gsap.to(".glow-one", {

      x: 80,

      y: 40,

      duration: 6,

      repeat: -1,

      yoyo: true,

      ease: "sine.inOut"

    });


    gsap.to(".glow-two", {

      x: -50,

      y: -40,

      duration: 7,

      repeat: -1,

      yoyo: true,

      ease: "sine.inOut"

    });

  }


  /* =======================================================
     NAVBAR
  ======================================================= */

  const navbar = document.getElementById("navbar");

  window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {

      navbar.classList.add("scrolled");

    } else {

      navbar.classList.remove("scrolled");

    }


    updateScrollProgress();

  });


  /* =======================================================
     SCROLL PROGRESS
  ======================================================= */

  function updateScrollProgress() {

    const scrollTop = window.scrollY;

    const documentHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;

    const progress =
      (scrollTop / documentHeight) * 100;

    document.getElementById(
      "scrollProgress"
    ).style.width = `${progress}%`;

  }


  /* =======================================================
     MOBILE MENU
  ======================================================= */

  const menuButton =
    document.getElementById("menuButton");

  const mobileMenu =
    document.getElementById("mobileMenu");

  let menuOpen = false;


  menuButton.addEventListener("click", () => {

    menuOpen = !menuOpen;


    if (menuOpen) {

      gsap.to(mobileMenu, {

        yPercent: 100,

        duration: .8,

        ease: "power4.inOut"

      });

    } else {

      gsap.to(mobileMenu, {

        yPercent: 0,

        duration: .7,

        ease: "power4.inOut"

      });

    }

  });


  document
    .querySelectorAll(".mobile-menu a")
    .forEach(link => {

      link.addEventListener("click", () => {

        menuOpen = false;

        gsap.to(mobileMenu, {

          yPercent: 0,

          duration: .7,

          ease: "power4.inOut"

        });

      });

    });


  /* =======================================================
     MAGNETIC BUTTONS
  ======================================================= */

  document
    .querySelectorAll(".magnetic")
    .forEach(button => {

      button.addEventListener("mousemove", (event) => {

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


        gsap.to(button, {

          x: x * .15,

          y: y * .15,

          duration: .3,

          ease: "power2.out"

        });

      });


      button.addEventListener("mouseleave", () => {

        gsap.to(button, {

          x: 0,

          y: 0,

          duration: .5,

          ease: "elastic.out(1,.4)"

        });

      });

    });


  /* =======================================================
     PARALLAX
  ======================================================= */

  gsap.to(".hero-grid", {

    yPercent: 20,

    scrollTrigger: {

      trigger: ".hero",

      start: "top top",

      end: "bottom top",

      scrub: true

    }

  });


});
