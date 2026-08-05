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
    speed = 1800; // pause after typing
    isDeleting = true;
  }

  if (isDeleting && charIndex < 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    speed = 400; // pause before next word
  }

  setTimeout(type, speed);
}

type();
