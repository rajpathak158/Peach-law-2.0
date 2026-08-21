/* =========================================================
   PREACH LAW & CO.
   MAIN.JS
   STABLE PERFORMANCE VERSION
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

  const loader = document.getElementById("pageLoader");

  if (loader) {

    const hideLoader = () => {

      setTimeout(() => {
        loader.classList.add("loaded");
      }, 500);

    };

    if (document.readyState === "complete") {
      hideLoader();
    } else {
      window.addEventListener(
        "load",
        hideLoader,
        { once: true }
      );
    }

  }


  /* =======================================================
     SCROLL PROGRESS
     ======================================================= */

  const progress =
    document.getElementById("scrollProgress");

  if (progress) {

    let ticking = false;

    const updateProgress = () => {

      if (ticking) return;

      ticking = true;

      requestAnimationFrame(() => {

        const scrollTop =
          window.scrollY || window.pageYOffset;

        const totalHeight =
          document.documentElement.scrollHeight -
          window.innerHeight;

        if (totalHeight <= 0) {

          progress.style.width = "0%";

        } else {

          const percentage =
            Math.min(
              100,
              Math.max(
                0,
                (scrollTop / totalHeight) * 100
              )
            );

          progress.style.width =
            percentage + "%";

        }

        ticking = false;

      });

    };

    window.addEventListener(
      "scroll",
      updateProgress,
      { passive: true }
    );

    updateProgress();

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


  /*
     IMPORTANT:

     The disclaimer appears on a new browser
     unless the user has already agreed.
  */

  const accepted =
    localStorage.getItem(
      "preachLawDisclaimer"
    );


  if (disclaimer) {

    if (accepted === "true") {

      disclaimer.style.display = "none";

    } else {

      disclaimer.style.display = "flex";

      document.body.classList.add(
        "disclaimer-open"
      );

    }

  }


  /* =======================================================
     AGREE
     ======================================================= */

  if (agreeBtn) {

    agreeBtn.addEventListener(
      "click",
      () => {

        localStorage.setItem(
          "preachLawDisclaimer",
          "true"
        );


        if (disclaimer) {

          disclaimer.classList.add(
            "hidden"
          );

          setTimeout(() => {

            disclaimer.style.display =
              "none";

          }, 500);

        }


        document.body.classList.remove(
          "disclaimer-open"
        );

      }
    );

  }


  /* =======================================================
     DISAGREE
     ======================================================= */

  if (disagreeBtn) {

    disagreeBtn.addEventListener(
      "click",
      () => {

        /*
           Going back may do nothing if the visitor
           opened the site directly.

           In that case, leave the page.
        */

        if (window.history.length > 1) {

          window.history.back();

        } else {

          window.location.href =
            "about:blank";

        }

      }
    );

  }


  /* =======================================================
     MAGNETIC BUTTONS
     DESKTOP ONLY
     ======================================================= */

  const finePointer =
    window.matchMedia(
      "(pointer: fine)"
    ).matches;


  if (finePointer) {

    const magnetic =
      document.querySelectorAll(
        ".magnetic"
      );


    magnetic.forEach((element) => {

      let raf = null;


      element.addEventListener(
        "mousemove",
        (event) => {

          if (raf) {
            cancelAnimationFrame(raf);
          }


          raf =
            requestAnimationFrame(() => {

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
                `translate3d(
                  ${x * 0.06}px,
                  ${y * 0.06}px,
                  0
                )`;

            });

        }
      );


      element.addEventListener(
        "mouseleave",
        () => {

          if (raf) {
            cancelAnimationFrame(raf);
          }

          element.style.transform = "";

        }
      );

    });

  }


  /* =======================================================
     SMOOTH ANCHOR LINKS
     ======================================================= */

  document
    .querySelectorAll(
      'a[href^="#"]'
    )
    .forEach((link) => {

      link.addEventListener(
        "click",
        (event) => {

          const id =
            link.getAttribute("href");


          if (!id || id === "#") {
            return;
          }


          const target =
            document.querySelector(id);


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

    });


  /* =======================================================
     NO FORCED SCROLLTRIGGER REFRESH
     ======================================================= */

  /*
     ScrollTrigger is controlled by animations.js.

     We intentionally DO NOT call:

     ScrollTrigger.refresh();

     here because doing so unnecessarily can cause
     extra calculations and lag.
  */


  /* =======================================================
     READY
     ======================================================= */

  document.body.classList.add(
    "js-ready"
  );


});
