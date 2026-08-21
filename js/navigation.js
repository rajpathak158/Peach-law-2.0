/* =========================================================
   PREACH LAW & CO.
   PREMIUM NAVIGATION SYSTEM
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const navbar = document.getElementById("navbar");
  const menuButton = document.getElementById("menuButton");
  const mobileMenu = document.getElementById("mobileMenu");

  /* =======================================================
     NAVBAR SCROLL EFFECT
     ======================================================= */

  const updateNavbar = () => {

    if (!navbar) return;

    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

  };

  updateNavbar();

  window.addEventListener(
    "scroll",
    updateNavbar,
    { passive: true }
  );


  /* =======================================================
     MOBILE MENU
     ======================================================= */

  if (!menuButton || !mobileMenu) return;

  let menuOpen = false;


  const openMenu = () => {

    menuOpen = true;

    menuButton.classList.add("active");

    mobileMenu.classList.add("active");

    menuButton.setAttribute(
      "aria-expanded",
      "true"
    );

    menuButton.setAttribute(
      "aria-label",
      "Close navigation"
    );

    document.body.classList.add(
      "menu-open"
    );

  };


  const closeMenu = () => {

    menuOpen = false;

    menuButton.classList.remove("active");

    mobileMenu.classList.remove("active");

    menuButton.setAttribute(
      "aria-expanded",
      "false"
    );

    menuButton.setAttribute(
      "aria-label",
      "Open navigation"
    );

    document.body.classList.remove(
      "menu-open"
    );

  };


  const toggleMenu = () => {

    if (menuOpen) {

      closeMenu();

    } else {

      openMenu();

    }

  };


  menuButton.addEventListener(
    "click",
    toggleMenu
  );


  /* =======================================================
     CLOSE MOBILE MENU WHEN LINK IS CLICKED
     ======================================================= */

  const mobileLinks =
    mobileMenu.querySelectorAll("a");

  mobileLinks.forEach((link) => {

    link.addEventListener(
      "click",
      () => {

        closeMenu();

      }
    );

  });


  /* =======================================================
     ESCAPE KEY
     ======================================================= */

  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "Escape" &&
        menuOpen
      ) {

        closeMenu();

      }

    }
  );


  /* =======================================================
     RESIZE SAFETY
     ======================================================= */

  window.addEventListener(
    "resize",
    () => {

      if (
        window.innerWidth > 900 &&
        menuOpen
      ) {

        closeMenu();

      }

    }
  );


  /* =======================================================
     ACTIVE PAGE
     ======================================================= */

  const currentPage =
    window.location.pathname
      .split("/")
      .pop() || "index.html";

  mobileLinks.forEach((link) => {

    const href =
      link.getAttribute("href");

    if (!href) return;

    const linkPage =
      href.split("/").pop();

    if (linkPage === currentPage) {

      link.classList.add("active");

    }

  });


  /* =======================================================
     SMOOTH ANCHOR SCROLL
     ======================================================= */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {

      link.addEventListener(
        "click",
        (event) => {

          const targetId =
            link.getAttribute("href");

          if (
            !targetId ||
            targetId === "#"
          ) {
            return;
          }

          const target =
            document.querySelector(targetId);

          if (!target) return;

          event.preventDefault();

          const navbarHeight =
            navbar
              ? navbar.offsetHeight
              : 0;

          const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            navbarHeight;

          window.scrollTo({

            top: targetPosition,

            behavior: "smooth"

          });

        }
      );

    });


  /* =======================================================
     PREVENT SCROLL BEHIND MOBILE MENU
     ======================================================= */

  document.body.classList.remove(
    "menu-open"
  );

});
