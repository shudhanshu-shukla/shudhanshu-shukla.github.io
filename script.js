const words = [
  "Software Developer",
  "AI Enthusiast",
  "JEE Aspirant",
  "Building StudyLocker"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typingElement = document.getElementById("typing");

function type() {
  const currentWord = words[wordIndex];

  if (isDeleting) {
    typingElement.textContent = currentWord.substring(0, charIndex--);
  } else {
    typingElement.textContent = currentWord.substring(0, charIndex++);
  }

  let speed = isDeleting ? 60 : 120;

  if (!isDeleting && charIndex === currentWord.length + 1) {
    speed = 1800;
    isDeleting = true;
  }

  if (isDeleting && charIndex < 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    speed = 400;
  }

  setTimeout(type, speed);
}

type();


// ================================
// SCROLL REVEAL ANIMATION
// ================================

const revealElements = document.querySelectorAll(
  "section, .project-card, .skill-card, .journey-card, .certification-card"
);

revealElements.forEach((element, index) => {
  element.classList.add("reveal");

  // Cinematic stagger effect
  element.style.transitionDelay = `${index * 0.08}s`;
});
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});
// =================================
// SCROLL PROGRESS
// =================================

const scrollProgress = document.getElementById("scroll-progress");

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const documentHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  const progress =
    documentHeight > 0
      ? (scrollTop / documentHeight) * 100
      : 0;

  scrollProgress.style.width = `${progress}%`;
});
// =================================
// CURSOR GLOW MOVEMENT
// =================================

const cursorGlow = document.getElementById("cursor-glow");

document.addEventListener("mousemove", (event) => {
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
  cursorGlow.style.opacity = "1";
});

document.addEventListener("mouseleave", () => {
  cursorGlow.style.opacity = "0";
});
// =================================
// 3D PROJECT CARD TILT
// =================================

const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * -8;
    const rotateY = ((x / rect.width) - 0.5) * 8;

    card.style.transform =
      `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform =
      "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";
  });
});
/* =================================
   3D HERO ORB MOUSE INTERACTION
================================= */

const heroOrb = document.querySelector(".hero-3d-orb");

if (heroOrb) {
  document.addEventListener("mousemove", (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 2;
    const y = (event.clientY / window.innerHeight - 0.5) * 2;

    heroOrb.style.transform =
      `translate(-50%, -50%) translate(${x * 18}px, ${y * 18}px) rotateX(${y * -8}deg) rotateY(${x * 8}deg)`;
  });

  document.addEventListener("mouseleave", () => {
    heroOrb.style.transform =
      "translate(-50%, -50%)";
  });
}
/* =================================
   HERO DEPTH PARALLAX
================================= */

const heroSection = document.querySelector("#hero");

if (heroSection) {
  const heroTitle = heroSection.querySelector("h2");
  const heroTagline = heroSection.querySelector(".hero-tagline");
  const heroRole = heroSection.querySelector(".hero-role");
  const heroDescription = heroSection.querySelector(".hero-description");
  const heroButtons = heroSection.querySelector(".hero-buttons");

  document.addEventListener("mousemove", (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 2;
    const y = (event.clientY / window.innerHeight - 0.5) * 2;

    if (heroTitle) {
      heroTitle.style.transform =
        `translate3d(${x * 5}px, ${y * 3}px, 0)`;
    }

    if (heroTagline) {
      heroTagline.style.transform =
        `translate3d(${x * 8}px, ${y * 5}px, 0)`;
    }

    if (heroRole) {
      heroRole.style.transform =
        `translate3d(${x * 10}px, ${y * 6}px, 0)`;
    }

    if (heroDescription) {
      heroDescription.style.transform =
        `translate3d(${x * 4}px, ${y * 3}px, 0)`;
    }

    if (heroButtons) {
      heroButtons.style.transform =
        `translate3d(${x * 7}px, ${y * 4}px, 0)`;
    }
  });

  document.addEventListener("mouseleave", () => {
    [heroTitle, heroTagline, heroRole, heroDescription, heroButtons]
      .forEach((element) => {
        if (element) {
          element.style.transform = "translate3d(0, 0, 0)";
        }
      });
  });
}
/* =================================
   INTERACTIVE 3D PROFILE TILT
================================= */

const heroImage3D = document.querySelector(".hero-image-3d");

if (heroImage3D) {
  document.addEventListener("mousemove", (event) => {
    const rect = heroImage3D.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const rotateY = ((event.clientX - centerX) / rect.width) * 10;
    const rotateX = ((event.clientY - centerY) / rect.height) * -10;

    heroImage3D.style.transform =
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  document.addEventListener("mouseleave", () => {
    heroImage3D.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  });
}
/* =================================
   3D PROFILE LIGHT TRACKING
================================= */

const profileLight = document.querySelector(".hero-image-3d");

if (profileLight) {
  profileLight.addEventListener("mousemove", (event) => {
    const rect = profileLight.getBoundingClientRect();

    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    profileLight.style.setProperty("--light-x", `${x}%`);
    profileLight.style.setProperty("--light-y", `${y}%`);
    profileLight.style.setProperty("--light-opacity", "1");

    profileLight.style.setProperty("filter", "brightness(1.03)");
  });

  profileLight.addEventListener("mouseenter", () => {
    profileLight.style.setProperty("--light-opacity", "1");
  });

  profileLight.addEventListener("mouseleave", () => {
    profileLight.style.setProperty("--light-opacity", "0");
    profileLight.style.setProperty("filter", "brightness(1)");
  });
}
/* =================================
   3D GLASS REFLECTION TRACKING
================================= */

const glassProfile = document.querySelector(".hero-image-3d");

if (glassProfile) {
  glassProfile.addEventListener("mousemove", (event) => {
    const rect = glassProfile.getBoundingClientRect();

    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 18;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 18;

    glassProfile.style.setProperty("--glass-x", `${x}px`);
    glassProfile.style.setProperty("--glass-y", `${y}px`);
    glassProfile.style.setProperty("--glass-opacity", "1");
  });

  glassProfile.addEventListener("mouseleave", () => {
    glassProfile.style.setProperty("--glass-x", "0px");
    glassProfile.style.setProperty("--glass-y", "0px");
    glassProfile.style.setProperty("--glass-opacity", "0");
  });
}
/* =================================
   3D PROJECT CARD INTERACTION
================================= */

const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    const rotateY = (x - 0.5) * 10;
    const rotateX = (y - 0.5) * -10;

    card.style.transform =
      `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;

    card.style.setProperty("--card-light-x", `${x * 100}%`);
    card.style.setProperty("--card-light-y", `${y * 100}%`);
    card.style.setProperty("--card-light-opacity", "1");
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";

    card.style.setProperty("--card-light-opacity", "0");
  });
});
