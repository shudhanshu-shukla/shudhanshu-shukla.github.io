/* =========================================================
   SHUDHANSHU SHUKLA — PORTFOLIO
   Premium Interaction System
   Fast • Smooth • Cinematic • Performance-first
   ========================================================= */

(() => {
  "use strict";

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const isTouchDevice =
    window.matchMedia("(hover: none) and (pointer: coarse)").matches ||
    "ontouchstart" in window;

  /* =========================================================
     HELPERS
     ========================================================= */

  const $ = (selector, scope = document) =>
    scope.querySelector(selector);

  const $$ = (selector, scope = document) =>
    Array.from(scope.querySelectorAll(selector));

  /* =========================================================
     TYPING EFFECT
     ========================================================= */

  const words = [
    "Software Developer",
    "AI Enthusiast",
    "JEE Aspirant",
    "Building StudyLocker"
  ];

  const typingElement = $("#typing");

  if (typingElement && !prefersReducedMotion) {
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const type = () => {
      const word = words[wordIndex];

      if (deleting) {
        charIndex = Math.max(0, charIndex - 1);
      } else {
        charIndex = Math.min(word.length, charIndex + 1);
      }

      typingElement.textContent = word.slice(0, charIndex);

      let delay = deleting ? 42 : 72;

      if (!deleting && charIndex === word.length) {
        delay = 950;
        deleting = true;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        delay = 220;
      }

      window.setTimeout(type, delay);
    };

    type();
  } else if (typingElement) {
    typingElement.textContent = words[0];
  }

  /* =========================================================
     CINEMATIC SCROLL REVEAL
     Fast entry + smooth settle
     ========================================================= */

  const revealElements = $$(
    "section, .project-card, .skill-card, .journey-card, .certification-card"
  );

  if (revealElements.length) {
    revealElements.forEach((element, index) => {
      element.classList.add("reveal");

      if (!prefersReducedMotion) {
        element.style.transitionDelay =
          `${Math.min(index * 0.035, 0.18)}s`;
      }
    });

    if (
      prefersReducedMotion ||
      !("IntersectionObserver" in window)
    ) {
      revealElements.forEach((element) =>
        element.classList.add("visible")
      );
    } else {
      const revealObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          });
        },
        {
          threshold: 0.08,
          rootMargin: "0px 0px -8% 0px"
        }
      );

      revealElements.forEach((element) =>
        revealObserver.observe(element)
      );
    }
  }

  /* =========================================================
     SCROLL PROGRESS
     ========================================================= */

  const scrollProgress = $("#scroll-progress");
  let scrollTicking = false;

  const updateScrollProgress = () => {
    if (!scrollProgress) return;

    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;

    const progress =
      maxScroll > 0
        ? Math.min(
            100,
            Math.max(0, (window.scrollY / maxScroll) * 100)
          )
        : 0;

    scrollProgress.style.width = `${progress}%`;
    scrollTicking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (scrollTicking) return;

      scrollTicking = true;
      window.requestAnimationFrame(updateScrollProgress);
    },
    { passive: true }
  );

  updateScrollProgress();

  /* =========================================================
     POINTER SYSTEM
     One coordinated animation loop
     ========================================================= */

  const cursorGlow = $("#cursor-glow");
  const heroOrb = $(".hero-3d-orb");
  const heroSection = $("#hero");
  const heroImage = $(".hero-image-3d");

  const projectCards = $$(".project-card");

  const heroTitle = heroSection
    ? $("h2", heroSection)
    : null;

  const heroTagline = heroSection
    ? $(".hero-tagline", heroSection)
    : null;

  const heroRole = heroSection
    ? $(".hero-role", heroSection)
    : null;

  const heroDescription = heroSection
    ? $(".hero-description", heroSection)
    : null;

  const heroButtons = heroSection
    ? $(".hero-buttons", heroSection)
    : null;

  const pointer = {
    x: window.innerWidth * 0.5,
    y: window.innerHeight * 0.5,
    targetX: window.innerWidth * 0.5,
    targetY: window.innerHeight * 0.5,
    active: false
  };

  let pointerFrame = null;

  const resetHeroTransforms = () => {
    const elements = [
      heroTitle,
      heroTagline,
      heroRole,
      heroDescription,
      heroButtons
    ];

    elements.forEach((element) => {
      if (element) {
        element.style.transform =
          "translate3d(0, 0, 0)";
      }
    });

    if (heroOrb) {
      heroOrb.style.transform =
        "translate(-50%, -50%)";
    }

    if (heroImage) {
      heroImage.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    }
  };

  const renderPointer = () => {
    const ease = 0.14;

    pointer.x +=
      (pointer.targetX - pointer.x) * ease;

    pointer.y +=
      (pointer.targetY - pointer.y) * ease;

    const nx =
      pointer.x / Math.max(window.innerWidth, 1) - 0.5;

    const ny =
      pointer.y / Math.max(window.innerHeight, 1) - 0.5;

    /* Cursor glow */

    if (
      cursorGlow &&
      pointer.active &&
      !isTouchDevice
    ) {
      cursorGlow.style.left =
        `${pointer.x}px`;

      cursorGlow.style.top =
        `${pointer.y}px`;

      cursorGlow.style.opacity = "1";
    }

    /* Hero orb */

    if (
      heroOrb &&
      !isTouchDevice &&
      !prefersReducedMotion
    ) {
      heroOrb.style.transform =
        `translate(-50%, -50%)
         translate3d(${nx * 36}px, ${ny * 36}px, 0)
         rotateX(${ny * -10}deg)
         rotateY(${nx * 10}deg)`;
    }

    /* Hero parallax */

    if (
      heroSection &&
      !isTouchDevice &&
      !prefersReducedMotion
    ) {
      if (heroTitle) {
        heroTitle.style.transform =
          `translate3d(${nx * 10}px, ${ny * 7}px, 0)`;
      }

      if (heroTagline) {
        heroTagline.style.transform =
          `translate3d(${nx * 15}px, ${ny * 10}px, 0)`;
      }

      if (heroRole) {
        heroRole.style.transform =
          `translate3d(${nx * 18}px, ${ny * 11}px, 0)`;
      }

      if (heroDescription) {
        heroDescription.style.transform =
          `translate3d(${nx * 8}px, ${ny * 6}px, 0)`;
      }

      if (heroButtons) {
        heroButtons.style.transform =
          `translate3d(${nx * 13}px, ${ny * 8}px, 0)`;
      }
    }

    /* Profile 3D */

    if (
      heroImage &&
      !isTouchDevice &&
      !prefersReducedMotion
    ) {
      const rect =
        heroImage.getBoundingClientRect();

      const centerX =
        rect.left + rect.width / 2;

      const centerY =
        rect.top + rect.height / 2;

      const rotateY =
        ((pointer.x - centerX) /
          Math.max(rect.width, 1)) * 9;

      const rotateX =
        ((pointer.y - centerY) /
          Math.max(rect.height, 1)) * -9;

      heroImage.style.transform =
        `perspective(1000px)
         rotateX(${rotateX}deg)
         rotateY(${rotateY}deg)`;
    }

    pointerFrame =
      window.requestAnimationFrame(renderPointer);
  };

  if (
    !isTouchDevice &&
    !prefersReducedMotion
  ) {
    document.addEventListener(
      "pointermove",
      (event) => {
        if (event.pointerType !== "mouse") return;

        pointer.targetX = event.clientX;
        pointer.targetY = event.clientY;
        pointer.active = true;
      },
      { passive: true }
    );

    document.addEventListener(
      "pointerleave",
      () => {
        pointer.active = false;

        if (cursorGlow) {
          cursorGlow.style.opacity = "0";
        }

        resetHeroTransforms();
      }
    );

    pointerFrame =
      window.requestAnimationFrame(renderPointer);
  } else {
    resetHeroTransforms();
  }

  /* =========================================================
     PROJECT CARD 3D TILT
     ========================================================= */

  if (
    projectCards.length &&
    !isTouchDevice &&
    !prefersReducedMotion
  ) {
    projectCards.forEach((card) => {
      const state = {
        x: 0,
        y: 0,
        targetX: 0,
        targetY: 0,
        frame: null
      };

      const renderCard = () => {
        state.x +=
          (state.targetX - state.x) * 0.16;

        state.y +=
          (state.targetY - state.y) * 0.16;

        card.style.transform =
          `perspective(1000px)
           rotateX(${state.y}deg)
           rotateY(${state.x}deg)
           translateZ(0)
           scale(1.012)`;

        card.style.setProperty(
          "--card-light-x",
          `${50 + state.x * 4}%`
        );

        card.style.setProperty(
          "--card-light-y",
          `${50 - state.y * 4}%`
        );

        state.frame =
          window.requestAnimationFrame(
            renderCard
          );
      };

      const stopCard = () => {
        if (state.frame) {
          window.cancelAnimationFrame(
            state.frame
          );

          state.frame = null;
        }

        state.targetX = 0;
        state.targetY = 0;

        const settle = () => {
          state.x +=
            (state.targetX - state.x) * 0.18;

          state.y +=
            (state.targetY - state.y) * 0.18;

          card.style.transform =
            `perspective(1000px)
             rotateX(${state.y}deg)
             rotateY(${state.x}deg)
             translateZ(0)
             scale(1)`;

          if (
            Math.abs(state.x) > 0.05 ||
            Math.abs(state.y) > 0.05
          ) {
            state.frame =
              window.requestAnimationFrame(
                settle
              );
          } else {
            card.style.transform = "";

            card.style.setProperty(
              "--card-light-opacity",
              "0"
            );
          }
        };

        state.frame =
          window.requestAnimationFrame(settle);
      };

      card.addEventListener(
        "pointerenter",
        () => {
          card.style.setProperty(
            "--card-light-opacity",
            "1"
          );

          state.frame =
            window.requestAnimationFrame(
              renderCard
            );
        },
        { passive: true }
      );

      card.addEventListener(
        "pointermove",
        (event) => {
          const rect =
            card.getBoundingClientRect();

          const px =
            (event.clientX - rect.left) /
            Math.max(rect.width, 1);

          const py =
            (event.clientY - rect.top) /
            Math.max(rect.height, 1);

          state.targetY =
            (0.5 - py) * 7;

          state.targetX =
            (px - 0.5) * 7;

          card.style.setProperty(
            "--card-light-x",
            `${px * 100}%`
          );

          card.style.setProperty(
            "--card-light-y",
            `${py * 100}%`
          );
        },
        { passive: true }
      );

      card.addEventListener(
        "pointerleave",
        stopCard
      );
    });
  }

  /* =========================================================
     PROFILE LIGHT + GLASS REFLECTION
     ========================================================= */

  if (
    heroImage &&
    !isTouchDevice &&
    !prefersReducedMotion
  ) {
    heroImage.addEventListener(
      "pointermove",
      (event) => {
        const rect =
          heroImage.getBoundingClientRect();

        const x =
          ((event.clientX - rect.left) /
            Math.max(rect.width, 1)) * 100;

        const y =
          ((event.clientY - rect.top) /
            Math.max(rect.height, 1)) * 100;

        const glassX =
          (x - 50) * 0.18;

        const glassY =
          (y - 50) * 0.18;

        heroImage.style.setProperty(
          "--light-x",
          `${x}%`
        );

        heroImage.style.setProperty(
          "--light-y",
          `${y}%`
        );

        heroImage.style.setProperty(
          "--light-opacity",
          "1"
        );

        heroImage.style.setProperty(
          "--glass-x",
          `${glassX}px`
        );

        heroImage.style.setProperty(
          "--glass-y",
          `${glassY}px`
        );

        heroImage.style.setProperty(
          "--glass-opacity",
          "1"
        );

        heroImage.style.filter =
          "brightness(1.03)";
      },
      { passive: true }
    );

    heroImage.addEventListener(
      "pointerleave",
      () => {
        heroImage.style.setProperty(
          "--light-opacity",
          "0"
        );

        heroImage.style.setProperty(
          "--glass-opacity",
          "0"
        );

        heroImage.style.setProperty(
          "--glass-x",
          "0px"
        );

        heroImage.style.setProperty(
          "--glass-y",
          "0px"
        );

        heroImage.style.filter =
          "brightness(1)";
      }
    );
  }

  /* =========================================================
     CLEANUP
     ========================================================= */

  window.addEventListener(
    "pagehide",
    () => {
      if (pointerFrame) {
        window.cancelAnimationFrame(
          pointerFrame
        );
      }

      projectCards.forEach((card) => {
        card.style.transform = "";
      });
    }
  );
})();
