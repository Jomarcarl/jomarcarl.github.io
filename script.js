const links = document.querySelectorAll("nav a");
let currentPage = window.location.pathname.split("/").pop();
if (!currentPage) currentPage = "index.html";

links.forEach(link => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});

const yearEl = document.querySelector("#year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

const themeBtn = document.querySelector("#themeToggle");
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") document.body.classList.add("light");

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");
    localStorage.setItem(
      "theme",
      document.body.classList.contains("light") ? "light" : "dark"
    );
  });
}

const backTop = document.querySelector("#backTop");
if (backTop) {
  const onScroll = () => {
    if (window.scrollY > 240) backTop.classList.add("show");
    else backTop.classList.remove("show");
  };

  window.addEventListener("scroll", onScroll);
  onScroll();

  backTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

const revealTargets = document.querySelectorAll(".reveal-target");
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.14 });

revealTargets.forEach(el => {
  el.classList.add("reveal");
  io.observe(el);
});

const typingEl = document.querySelector(".typing-text");
if (typingEl) {
  const words = [
    "Aspiring Full-Stack Developer",
    "Web Developer",
    "System Builder"
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeEffect() {
    const currentWord = words[wordIndex];

    if (!deleting) {
      typingEl.textContent = currentWord.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentWord.length) {
        deleting = true;
        setTimeout(typeEffect, 1200);
        return;
      }
    } else {
      typingEl.textContent = currentWord.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }

    setTimeout(typeEffect, deleting ? 50 : 90);
  }

  typeEffect();
}

const counters = document.querySelectorAll("[data-count]");
const counterObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const counter = entry.target;
    const target = +counter.getAttribute("data-count");
    let current = 0;
    const increment = Math.ceil(target / 40);

    const updateCounter = () => {
      current += increment;
      if (current >= target) {
        counter.textContent = target === 100 ? "100%" : `${target}+`;
      } else {
        counter.textContent = current;
        requestAnimationFrame(updateCounter);
      }
    };

    updateCounter();
    observer.unobserve(counter);
  });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
const images = document.querySelectorAll(".project-images img");
const closeBtn = document.querySelector(".close-modal");

images.forEach(img => {
  img.addEventListener("click", () => {
    modal.style.display = "block";
    modalImg.src = img.src;
  });
});

if(closeBtn){
  closeBtn.onclick = () => modal.style.display = "none";
}

window.onclick = (e) => {
  if(e.target === modal){
    modal.style.display = "none";
  }
};