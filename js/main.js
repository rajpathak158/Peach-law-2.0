/* =========================================================
   PREACH LAW & CO.
   MAIN INTERACTION ENGINE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     LUCIDE ICONS
     ======================================================= */

  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }


  /* =======================================================
     PAGE LOADER
     ======================================================= */

  const pageLoader =
    document.getElementById("pageLoader");

  const hideLoader = () => {

    if (!pageLoader) return;

    pageLoader.classList.add("loaded");

    setTimeout(() => {

      pageLoader.style.pointerEvents = "none";

    }, 900);

  };


  if (document.readyState === "complete") {

    setTimeout(hideLoader, 400);

  } else {

    window.addEventListener(
      "load",
      () => {
        setTimeout(hideLoader, 500);
      },
      { once: true }
    );

  }


  /* =======================================================
     DISCLAIMER
     ======================================================= */

  const disclaimer =
    document.getElementById("disclaimer");

  const agreeBtn =
    document.getElementById("agreeBtn");

  const disagreeBtn =
    document.getElementById("disagreeBtn");


  const closeDisclaimer = () => {

    if (!disclaimer) return;

    disclaimer.classList.add("hidden");

    document.body.classList.remove(
      "disclaimer-open"
    );

    try {

      sessionStorage.setItem(
        "preachLawDisclaimer",
        "accepted"
      );

    } catch (error) {

      console.warn(
        "Session storage unavailable."
      );

    }

  };


  const showDisclaimer = () => {

    if (!disclaimer) return;

    disclaimer.classList.remove("hidden");

    document.body.classList.add(
      "disclaimer-open"
    );

  };


  let disclaimerAccepted = false;

  try {

    disclaimerAccepted =
      sessionStorage.getItem(
        "preachLawDisclaimer"
      ) === "accepted";

  } catch (error) {

    disclaimerAccepted = false;

  }


  if (disclaimer) {

    if (disclaimerAccepted) {

      disclaimer.classList.add("hidden");

    } else {

      showDisclaimer();

    }

  }


  if (agreeBtn) {

    agreeBtn.addEventListener(
      "click",
      closeDisclaimer
    );

  }


  if (disagreeBtn) {

    disagreeBtn.addEventListener(
      "click",
      () => {

        /*
         * We do not redirect the user to
         * an external website.
         *
         * The page simply remains unavailable
         * until they choose to continue.
         */

        if (disclaimer) {

          disclaimer.classList.add(
            "disagreement"
          );

          setTimeout(() => {

            disclaimer.classList.remove(
              "disagreement"
            );

          }, 500);

        }

      }
    );

  }


  /* =======================================================
     ESCAPE KEY FOR DISCLAIMER
     ======================================================= */

  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "Escape" &&
        disclaimer &&
        !disclaimer.classList.contains("hidden")
      ) {

        const card =
          disclaimer.querySelector(
            ".disclaimer-card"
          );

        if (card) {

          card.classList.add(
            "disagreement"
          );

          setTimeout(() => {

            card.classList.remove(
              "disagreement"
            );

          }, 500);

        }

      }

    }
  );


  /* =======================================================
     SCROLL PROGRESS
     ======================================================= */

  const scrollProgress =
    document.getElementById(
      "scrollProgress"
    );


  const updateScrollProgress = () => {

    if (!scrollProgress) return;

    const scrollTop =
      window.scrollY;

    const documentHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;

    if (documentHeight <= 0) {

      scrollProgress.style.width = "0%";

      return;

    }

    const progress =
      Math.min(
        100,
        Math.max(
          0,
          (scrollTop / documentHeight) * 100
        )
      );

    scrollProgress.style.width =
      `${progress}%`;

  };


  updateScrollProgress();


  window.addEventListener(
    "scroll",
    updateScrollProgress,
    { passive: true }
  );


  /* =======================================================
     MAGNETIC BUTTONS
     ======================================================= */

  const magneticElements =
    document.querySelectorAll(
      ".magnetic"
    );


  magneticElements.forEach((element) => {

    element.addEventListener(
      "mousemove",
      (event) => {

        if (window.innerWidth < 768) return;

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

        const strength = 0.18;

        element.style.transform =
          `translate(${x * strength}px, ${y * strength}px)`;

      }
    );


    element.addEventListener(
      "mouseleave",
      () => {

        element.style.transform =
          "";

      }
    );

  });


  /* =======================================================
     CARD TILT
     ======================================================= */

  const cards =
    document.querySelectorAll(
      ".practice-card"
    );


  cards.forEach((card) => {

    card.addEventListener(
      "mousemove",
      (event) => {

        if (window.innerWidth < 900) return;

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

        const rotateX =
          ((y - centerY) / centerY) * -2.5;

        const rotateY =
          ((x - centerX) / centerX) * 2.5;

        card.style.transform =
          `perspective(900px)
           rotateX(${rotateX}deg)
           rotateY(${rotateY}deg)
           translateY(-5px)`;

      }
    );


    card.addEventListener(
      "mouseleave",
      () => {

        card.style.transform =
          "";

      }
    );

  });


  /* =======================================================
     PARALLAX BACKGROUND
     ======================================================= */

  const parallaxElements =
    document.querySelectorAll(
      ".hero-glow, .hero-grid"
    );


  let parallaxTicking = false;


  const updateParallax = () => {

    const scrollY =
      window.scrollY;

    parallaxElements.forEach(
      (element, index) => {

        const speed =
          index === 0
            ? 0.08
            : 0.04;

        element.style.transform =
          `translate3d(0, ${scrollY * speed}px, 0)`;

      }
    );

    parallaxTicking = false;

  };


  window.addEventListener(
    "scroll",
    () => {

      if (!parallaxTicking) {

        requestAnimationFrame(
          updateParallax
        );

        parallaxTicking = true;

      }

    },
    { passive: true }
  );


  /* =======================================================
     COUNTERS
     ======================================================= */

  const counters =
    document.querySelectorAll(
      ".counter"
    );


  const animateCounter = (
    counter
  ) => {

    const target =
      Number(
        counter.dataset.target
      );

    if (
      !Number.isFinite(target)
    ) {
      return;
    }

    const duration =
      1800;

    const startTime =
      performance.now();


    const updateCounter = (
      currentTime
    ) => {

      const elapsed =
        currentTime -
        startTime;

      const progress =
        Math.min(
          elapsed / duration,
          1
        );

      /*
       * Smooth ease-out
       */

      const eased =
        1 -
        Math.pow(
          1 - progress,
          3
        );

      const current =
        Math.floor(
          eased * target
        );

      counter.textContent =
        current.toLocaleString();

      if (progress < 1) {

        requestAnimationFrame(
          updateCounter
        );

      } else {

        counter.textContent =
          target.toLocaleString();

      }

    };


    requestAnimationFrame(
      updateCounter
    );

  };


  /* =======================================================
     COUNTER OBSERVER
     ======================================================= */

  if (
    counters.length &&
    "IntersectionObserver" in window
  ) {

    const counterObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach(
            (entry) => {

              if (
                !entry.isIntersecting
              ) {
                return;
              }

              const counter =
                entry.target;

              if (
                counter.dataset.animated
              ) {
                return;
              }

              counter.dataset.animated =
                "true";

              animateCounter(
                counter
              );

              observer.unobserve(
                counter
              );

            }
          );

        },
        {
          threshold: 0.5
        }
      );


    counters.forEach(
      (counter) => {

        counterObserver.observe(
          counter
        );

      }
    );

  } else {

    counters.forEach(
      animateCounter
    );

  }


  /* =======================================================
     CURSOR GLOW
     ======================================================= */

  const createCursorGlow = () => {

    if (
      window.innerWidth < 1000 ||
      window.matchMedia(
        "(pointer: coarse)"
      ).matches
    ) {

      return;

    }


    const glow =
      document.createElement(
        "div"
      );

    glow.className =
      "cursor-glow";

    document.body.appendChild(
      glow
    );


    let mouseX = 0;
    let mouseY = 0;

    let currentX = 0;
    let currentY = 0;


    document.addEventListener(
      "mousemove",
      (event) => {

        mouseX =
          event.clientX;

        mouseY =
          event.clientY;

      },
      { passive: true }
    );


    const animateCursor = () => {

      currentX +=
        (mouseX - currentX) *
        0.12;

      currentY +=
        (mouseY - currentY) *
        0.12;


      glow.style.transform =
        `translate3d(
          ${currentX}px,
          ${currentY}px,
          0
        )`;


      requestAnimationFrame(
        animateCursor
      );

    };


    animateCursor();

  };


  createCursorGlow();


  /* =======================================================
     LINK HOVER STATE
     ======================================================= */

  const links =
    document.querySelectorAll(
      "a"
    );


  links.forEach((link) => {

    link.addEventListener(
      "mouseenter",
      () => {

        document.body.classList.add(
          "link-hover"
        );

      }
    );


    link.addEventListener(
      "mouseleave",
      () => {

        document.body.classList.remove(
          "link-hover"
        );

      }
    );

  });


  /* =======================================================
     PREVENT IMAGE DRAGGING
     ======================================================= */

  document
    .querySelectorAll("img")
    .forEach((image) => {

      image.setAttribute(
        "draggable",
        "false"
      );

    });


  /* =======================================================
     INITIAL REFRESH
     ======================================================= */

  updateScrollProgress();

});
