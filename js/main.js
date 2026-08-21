/* =========================================================
   PREACH LAW & CO.
   MAIN.JS — STABLE PERFORMANCE VERSION
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

  const loader =
    document.getElementById("pageLoader");

  if (loader) {

    window.addEventListener("load", () => {

      setTimeout(() => {
        loader.classList.add("loaded");
      }, 700);

    });

  }


  /* =======================================================
     SCROLL PROGRESS
     ======================================================= */

  const progress =
    document.getElementById("scrollProgress");

  if (progress) {

    const updateProgress = () => {

      const scrollTop =
        window.scrollY;

      const totalHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

      if (totalHeight <= 0) {
        progress.style.width = "0%";
        return;
      }

      progress.style.width =
        `${(scrollTop / totalHeight) * 100}%`;

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

     The disclaimer is shown unless the user
     has previously accepted it.
  */

  const accepted =
    localStorage.getItem(
      "preachLawDisclaimer"
    );


  if (disclaimer) {

    if (accepted === "true") {

      disclaimer.style.display =
        "none";

    } else {

      disclaimer.style.display =
        "flex";

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

        window.history.back();

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
              ${x * 0.08}px,
              ${y * 0.08}px
            )`;

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
     SCROLLTRIGGER
     ======================================================= */

  if (
    typeof ScrollTrigger !==
    "undefined"
  ) {

    ScrollTrigger.refresh();

  }


  /* =======================================================
     PERFORMANCE SAFETY
     ======================================================= */

  document.documentElement.style.overflowX =
    "hidden";

  document.body.style.overflowX =
    "hidden";


  /* =======================================================
     READY
     ======================================================= */

  document.body.classList.add(
    "js-ready"
  );

});
