/* =========================================================
   SHUDHANSHU SHUKLA — PORTFOLIO
   3D V2 INTERACTION ENGINE
   ========================================================= */

(() => {
  "use strict";

  /* =======================================================
     DEVICE / MOTION DETECTION
     ======================================================= */

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const finePointer = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
  ).matches;

  const canUse3D = finePointer && !reduceMotion;


  /* =======================================================
     TYPING EFFECT
     ======================================================= */

  const typingElement = document.getElementById("typing");

  if (typingElement && !reduceMotion) {
    const words = [
      "Software Developer",
      "AI Enthusiast",
      "JEE Aspirant",
      "Building StudyLocker"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeText() {
      const word = words[wordIndex];

      if (deleting) {
        charIndex--;
      } else {
        charIndex++;
      }

      typingElement.textContent = word.substring(0, charIndex);

      let speed = deleting ? 55 : 105;

      if (!deleting && charIndex >= word.length) {
        speed = 1700;
        deleting = true;
      }

      if (deleting && charIndex <= 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 450;
      }

      window.setTimeout(typeText, speed);
    }

    typeText();
  }


  /* =======================================================
     SCROLL REVEAL
     ======================================================= */

  const revealElements = document.querySelectorAll(
    "section, .project-card, .skill-card"
  );

  if (revealElements.length) {
    revealElements.forEach((element, index) => {
      element.classList.add("reveal");

      if (!reduceMotion) {
        element.style.transitionDelay =
          `${Math.min(index * 0.06, 0.45)}s`;
      }
    });

    if ("IntersectionObserver" in window && !reduceMotion) {
      const revealObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -40px 0px"
        }
      );

      revealElements.forEach((element) => {
        revealObserver.observe(element);
      });
    } else {
      revealElements.forEach((element) => {
        element.classList.add("visible");
      });
    }
  }


  /* =======================================================
     SCROLL PROGRESS
     ======================================================= */

  const scrollProgress =
    document.getElementById("scroll-progress");

  if (scrollProgress) {
    let scrollTicking = false;

    function updateScrollProgress() {
      const scrollTop = window.scrollY;

      const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

      const progress =
        documentHeight > 0
          ? (scrollTop / documentHeight) * 100
          : 0;

      scrollProgress.style.width =
        `${Math.min(progress, 100)}%`;

      scrollTicking = false;
    }

    window.addEventListener(
      "scroll",
      () => {
        if (!scrollTicking) {
          window.requestAnimationFrame(
            updateScrollProgress
          );

          scrollTicking = true;
        }
      },
      { passive: true }
    );

    updateScrollProgress();
  }


  /* =======================================================
     POINTER ENGINE
     One pointer listener controls the entire 3D system.
     ======================================================= */

  if (!canUse3D) {
    return;
  }

  const hero = document.getElementById("hero");
  const heroOrb =
    document.querySelector(".hero-3d-orb");
  const heroProfile =
    document.querySelector(".hero-image-3d");
  const cursorGlow =
    document.getElementById("cursor-glow");

  const projectCards =
    document.querySelectorAll(".project-card");

  const skillCards =
    document.querySelectorAll(".skill-card");


  let pointerX = 0;
  let pointerY = 0;

  let animationFrame = null;

  let activeCard = null;
  let activeSkill = null;
  let profileActive = false;


  /* =======================================================
     POINTER POSITION
     ======================================================= */

  function handlePointerMove(event) {
    pointerX = event.clientX;
    pointerY = event.clientY;

    if (!animationFrame) {
      animationFrame =
        window.requestAnimationFrame(update3DScene);
    }
  }


  /* =======================================================
     3D SCENE UPDATE
     ======================================================= */

  function update3DScene() {
    animationFrame = null;

    /* -----------------------------------------------
       Cursor glow
       ----------------------------------------------- */

    if (cursorGlow) {
      cursorGlow.style.setProperty(
        "--cursor-x",
        `${pointerX}px`
      );

      cursorGlow.style.setProperty(
        "--cursor-y",
        `${pointerY}px`
      );

      cursorGlow.style.opacity = "1";
    }


    /* -----------------------------------------------
       Hero orb
       ----------------------------------------------- */

    if (heroOrb) {
      const x =
        (pointerX / window.innerWidth - 0.5) * 2;

      const y =
        (pointerY / window.innerHeight - 0.5) * 2;

      heroOrb.style.setProperty(
        "--orb-x",
        `${x * 22}px`
      );

      heroOrb.style.setProperty(
        "--orb-y",
        `${y * 18}px`
      );
    }


    /* -----------------------------------------------
       Hero background glow
       ----------------------------------------------- */

    if (hero) {
      const x =
        (pointerX / window.innerWidth - 0.5) * 2;

      const y =
        (pointerY / window.innerHeight - 0.5) * 2;

      hero.style.setProperty(
        "--hero-glow-x",
        `${x * 25}px`
      );

      hero.style.setProperty(
        "--hero-glow-y",
        `${y * 20}px`
      );
    }


    /* -----------------------------------------------
       Profile 3D tilt
       ----------------------------------------------- */

    if (heroProfile && profileActive) {
      const rect =
        heroProfile.getBoundingClientRect();

      const centerX =
        rect.left + rect.width / 2;

      const centerY =
        rect.top + rect.height / 2;

      const rotateY =
        ((pointerX - centerX) / rect.width) * 8;

      const rotateX =
        ((pointerY - centerY) / rect.height) * -8;

      heroProfile.style.setProperty(
        "--profile-rx",
        `${rotateX}deg`
      );

      heroProfile.style.setProperty(
        "--profile-ry",
        `${rotateY}deg`
      );

      heroProfile.style.setProperty(
        "--light-x",
        `${((pointerX - rect.left) / rect.width) * 100}%`
      );

      heroProfile.style.setProperty(
        "--light-y",
        `${((pointerY - rect.top) / rect.height) * 100}%`
      );

      heroProfile.style.setProperty(
        "--light-opacity",
        "1"
      );

      heroProfile.style.setProperty(
        "--glass-x",
        `${rotateY * 1.5}px`
      );

      heroProfile.style.setProperty(
        "--glass-y",
        `${rotateX * -1.5}px`
      );

      heroProfile.style.setProperty(
        "--glass-opacity",
        "1"
      );
    }


    /* -----------------------------------------------
       Active project card
       ----------------------------------------------- */

    if (activeCard) {
      applyCardTilt(activeCard);
    }


    /* -----------------------------------------------
       Active skill card
       ----------------------------------------------- */

    if (activeSkill) {
      applySkillTilt(activeSkill);
    }
  }


  /* =======================================================
     PROJECT CARD TILT
     ======================================================= */

  function applyCardTilt(card) {
    const rect =
      card.getBoundingClientRect();

    const x =
      (pointerX - rect.left) / rect.width;

    const y =
      (pointerY - rect.top) / rect.height;

    const rotateY =
      (x - 0.5) * 10;

    const rotateX =
      (y - 0.5) * -10;

    card.style.setProperty(
      "--card-rx",
      `${rotateX}deg`
    );

    card.style.setProperty(
      "--card-ry",
      `${rotateY}deg`
    );

    card.style.setProperty(
      "--card-light-x",
      `${x * 100}%`
    );

    card.style.setProperty(
      "--card-light-y",
      `${y * 100}%`
    );

    card.style.setProperty(
      "--card-light-opacity",
      "1"
    );

    card.style.setProperty(
      "--card-y",
      "-3px"
    );
  }


  /* =======================================================
     PROJECT CARD EVENTS
     ======================================================= */

  projectCards.forEach((card) => {
    card.addEventListener("pointerenter", () => {
      activeCard = card;
    });

    card.addEventListener("pointerleave", () => {
      if (activeCard === card) {
        activeCard = null;
      }

      card.style.setProperty("--card-rx", "0deg");
      card.style.setProperty("--card-ry", "0deg");
      card.style.setProperty("--card-y", "0px");
      card.style.setProperty(
        "--card-light-opacity",
        "0"
      );
    });
  });


  /* =======================================================
     SKILL CARD TILT
     ======================================================= */

  function applySkillTilt(card) {
    const rect =
      card.getBoundingClientRect();

    const x =
      (pointerX - rect.left) / rect.width;

    const y =
      (pointerY - rect.top) / rect.height;

    const rotateY =
      (x - 0.5) * 7;

    const rotateX =
      (y - 0.5) * -7;

    card.style.setProperty(
      "--skill-rx",
      `${rotateX}deg`
    );

    card.style.setProperty(
      "--skill-ry",
      `${rotateY}deg`
    );

    card.style.setProperty(
      "--skill-x",
      `${x * 100}%`
    );

    card.style.setProperty(
      "--skill-y",
      `${y * 100}%`
    );

    card.style.setProperty(
      "--skill-light",
      "1"
    );
  }


  /* =======================================================
     SKILL CARD EVENTS
     ======================================================= */

  skillCards.forEach((card) => {
    card.addEventListener("pointerenter", () => {
      activeSkill = card;
    });

    card.addEventListener("pointerleave", () => {
      if (activeSkill === card) {
        activeSkill = null;
      }

      card.style.setProperty(
        "--skill-rx",
        "0deg"
      );

      card.style.setProperty(
        "--skill-ry",
        "0deg"
      );

      card.style.setProperty(
        "--skill-light",
        "0"
      );
    });
  });


  /* =======================================================
     PROFILE EVENTS
     ======================================================= */

  if (heroProfile) {
    heroProfile.addEventListener(
      "pointerenter",
      () => {
        profileActive = true;
      }
    );

    heroProfile.addEventListener(
      "pointerleave",
      () => {
        profileActive = false;

        heroProfile.style.setProperty(
          "--profile-rx",
          "0deg"
        );

        heroProfile.style.setProperty(
          "--profile-ry",
          "0deg"
        );

        heroProfile.style.setProperty(
          "--light-opacity",
          "0"
        );

        heroProfile.style.setProperty(
          "--glass-opacity",
          "0"
        );
      }
    );
  }


  /* =======================================================
     GLOBAL POINTER LISTENER
     ======================================================= */

  document.addEventListener(
    "pointermove",
    handlePointerMove,
    { passive: true }
  );


  /* =======================================================
     POINTER LEAVE WINDOW
     ======================================================= */

  document.addEventListener(
    "pointerout",
    (event) => {
      if (event.relatedTarget !== null) {
        return;
      }

      if (cursorGlow) {
        cursorGlow.style.opacity = "0";
      }
    }
  );


  /* =======================================================
     INITIALIZE
     ======================================================= */

  if (cursorGlow) {
    cursorGlow.style.opacity = "0";
  }

})();
