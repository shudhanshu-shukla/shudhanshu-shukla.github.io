const words = [
    "Software Developer",
    "Building StudyLocker",
    "AI Enthusiast",
    "Future Software Engineer"
];
let wordIndex = 0;
let charIndex = 0;
let deleting = false;

const typingElement = document.getElementById("typing");

function type() {
  const currentWord = words[wordIndex];

  if (!deleting) {
    typingElement.textContent = currentWord.substring(0, charIndex++);
    if (charIndex > currentWord.length) {
      deleting = true;
      setTimeout(type, 1200);
      return;
    }
  } else {
    typingElement.textContent = currentWord.substring(0, charIndex--);
    if (charIndex < 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      charIndex = 0;
    }
  }

  setTimeout(type, deleting ? 50 : 100);
}

type();
