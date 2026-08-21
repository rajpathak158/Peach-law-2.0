/* =========================================================
   PREACH LAW & CO.
   MAIN.JS
   PREMIUM INTERACTION ENGINE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     PAGE LOADER
     ======================================================= */

  const loader = document.getElementById("pageLoader");

  if (loader) {
    window.addEventListener("load", () => {
      setTimeout(() => {
        loader.classList.add("loaded");
      }, 900);
    });
  }


  /* =======================================================
     LUCIDE ICONS
     ======================================================= */

  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }


  /* =======================================================
     SCROLL PROGRESS
     ======================================================= */

  const progress =
    document.getElementById("scrollProgress");

  const updateProgress = () => {

    if (!progress) return;

    const scrollTop = window.scrollY;

    const documentHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;

    if (documentHeight <= 0) {
      progress.style.width = "0%";
      return;
    }

    const percentage =
      (scrollTop / documentHeight) * 100;

    progress.style.width =
      `${percentage}%`;
  };

  window.addEventListener(
    "scroll",
    updateProgress,
    { passive: true }
  );

  updateProgress();


  /* =======================================================
     DISCLAIMER
     ======================================================= */

  const disclaimer =
    document.getElementById("disclaimer");

  const agreeBtn =
    document.getElementById("agreeBtn");

  const disagreeBtn =
    document.getElementById("disagreeBtn");


  const disclaimerAccepted =
    localStorage.getItem(
      "preachLawDisclaimer"
    );


  if (
    disclaimer &&
    disclaimerAccepted === "true"
  ) {
    disclaimer.style.display = "none";
  }


  if (agreeBtn) {

    agreeBtn.addEventListener(
      "click",
      () => {

        localStorage.setItem(
          "preachLawDisclaimer",
          "true"
        );

        if (disclaimer) {

          disclaimer.classList.add("hidden");

          setTimeout(() => {
            disclaimer.style.display = "none";
          }, 600);

        }

        document.body.classList.remove(
          "disclaimer-open"
        );

      }
    );

  }


  if (disagreeBtn) {

    disagreeBtn.addEventListener(
      "click",
      () => {
        window.history.back();
      }
    );

  }


  /* =======================================================
     TOUCH DETECTION
     ======================================================= */

  const isTouch =
    window.matchMedia(
      "(pointer: coarse)"
    ).matches;


  /* =======================================================
     CUSTOM CURSOR
     ======================================================= */

  if (!isTouch) {

    const cursor =
      document.createElement("div");

    cursor.className =
      "custom-cursor";

    document.body.appendChild(cursor);


    const cursorDot =
      document.createElement("div");

    cursorDot.className =
      "custom-cursor-dot";

    document.body.appendChild(cursorDot);


    let mouseX = 0;
    let mouseY = 0;

    let cursorX = 0;
    let cursorY = 0;


    window.addEventListener(
      "mousemove",
      (event) => {

        mouseX = event.clientX;
        mouseY = event.clientY;

        cursorDot.style.transform =
          `translate3d(
            ${mouseX}px,
            ${mouseY}px,
            0
          ) translate(-50%, -50%)`;

      },
      { passive: true }
    );


    const animateCursor = () => {

      cursorX +=
        (mouseX - cursorX) * 0.16;

      cursorY +=
        (mouseY - cursorY) * 0.16;

      cursor.style.transform =
        `translate3d(
          ${cursorX}px,
          ${cursorY}px,
          0
        ) translate(-50%, -50%)`;

      requestAnimationFrame(
        animateCursor
      );

    };

    animateCursor();


    const interactiveElements =
      document.querySelectorAll(
        "a, button, .practice-card, .magnetic"
      );


    interactiveElements.forEach(
      (element) => {

        element.addEventListener(
          "mouseenter",
          () => {
            cursor.classList.add(
              "cursor-active"
            );
          }
        );


        element.addEventListener(
          "mouseleave",
          () => {
            cursor.classList.remove(
              "cursor-active"
            );
          }
        );

      }
    );

  }


  /* =======================================================
     MAGNETIC BUTTONS
     ======================================================= */

  if (!isTouch) {

    const magneticElements =
      document.querySelectorAll(
        ".magnetic"
      );


    magneticElements.forEach(
      (element) => {

        element.addEventListener(
          "mousemove",
          (event) => {

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

            element.style.transform =
              `translate(
                ${x * 0.12}px,
                ${y * 0.12}px
              )`;

          }
        );


        element.addEventListener(
          "mouseleave",
          () => {
            element.style.transform = "";
          }
        );

      }
    );

  }


  /* =======================================================
     PRACTICE CARD DEPTH + LIGHT
     ======================================================= */

  if (!isTouch) {

    const cards =
      document.querySelectorAll(
        ".practice-card"
      );


    cards.forEach(
      (card) => {

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


            card.style.setProperty(
              "--mouse-x",
              `${x}px`
            );

            card.style.setProperty(
              "--mouse-y",
              `${y}px`
            );


            const rotateX =
              ((y / rect.height) - 0.5)
              * -5;

            const rotateY =
              ((x / rect.width) - 0.5)
              * 5;


            card.style.transform =
              `perspective(1000px)
               rotateX(${rotateX}deg)
               rotateY(${rotateY}deg)
               translateY(-4px)`;

          }
        );


        card.addEventListener(
          "mouseleave",
          () => {
            card.style.transform = "";
          }
        );

      }
    );

  }


  /* =======================================================
     ANIMATED STAT COUNTERS
     ======================================================= */

  const counters =
    document.querySelectorAll(
      ".counter"
    );


  const animateCounter = (counter) => {

    const target =
      Number(
        counter.dataset.target
      );


    if (
      !Number.isFinite(target)
    ) {
      return;
    }


    const duration = 1800;

    const startTime =
      performance.now();


    const updateCounter =
      (currentTime) => {

        const elapsed =
          currentTime -
          startTime;


        const progress =
          Math.min(
            elapsed / duration,
            1
          );


        /* Smooth easing */

        const eased =
          1 -
          Math.pow(
            1 - progress,
            3
          );


        const current =
          Math.floor(
            target * eased
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

  if (counters.length) {

    const counterObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach(
            (entry) => {

              if (
                entry.isIntersecting
              ) {

                animateCounter(
                  entry.target
                );

                observer.unobserve(
                  entry.target
                );

              }

            }
          );

        },
        {
          threshold: 0.35
        }
      );


    counters.forEach(
      (counter) => {

        counterObserver.observe(
          counter
        );

      }
    );

  }


  /* =======================================================
     SMOOTH ANCHOR SCROLL
     ======================================================= */

  document
    .querySelectorAll(
      'a[href^="#"]'
    )
    .forEach(
      (link) => {

        link.addEventListener(
          "click",
          (event) => {

            const targetId =
              link.getAttribute(
                "href"
              );


            if (
              !targetId ||
              targetId === "#"
            ) {
              return;
            }


            const target =
              document.querySelector(
                targetId
              );


            if (!target) {
              return;
            }


            event.preventDefault();


            target.scrollIntoView({
              behavior: "smooth",
              block: "start"
            });

          }
        );

      }
    );


  /* =======================================================
     HERO MOUSE LIGHT
     ======================================================= */

  if (!isTouch) {

    const hero =
      document.querySelector(
        ".hero"
      );


    if (hero) {

      hero.addEventListener(
        "mousemove",
        (event) => {

          const rect =
            hero.getBoundingClientRect();


          const lightX =
            ((event.clientX - rect.left)
            / rect.width) * 100;


          const lightY =
            ((event.clientY - rect.top)
            / rect.height) * 100;


          hero.style.setProperty(
            "--mouse-light-x",
            `${lightX}%`
          );


          hero.style.setProperty(
            "--mouse-light-y",
            `${lightY}%`
          );

        },
        { passive: true }
      );

    }

  }


  /* =======================================================
     HORIZONTAL OVERFLOW SAFETY
     ======================================================= */

  document.documentElement.style.overflowX =
    "hidden";

  document.body.style.overflowX =
    "hidden";


  /* =======================================================
     SCROLLTRIGGER REFRESH
     ======================================================= */

  window.addEventListener(
    "resize",
    () => {

      if (
        typeof ScrollTrigger !==
        "undefined"
      ) {

        ScrollTrigger.refresh();

      }

    }
  );


  /* =======================================================
     READY
     ======================================================= */

  document.body.classList.add(
    "js-ready"
  );

});
