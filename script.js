// Active Navigation Link
const links = document.querySelectorAll("nav a");
let currentPage = window.location.pathname.split("/").pop();

if (!currentPage) {
  currentPage = "index.html";
}

links.forEach(link => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});

// Footer Year
const yearEl = document.getElementById("year");

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Theme Toggle
const themeBtn = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
  document.body.classList.add("light");
}

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");

    const theme = document.body.classList.contains("light")
      ? "light"
      : "dark";

    localStorage.setItem("theme", theme);
  });
}

// Back To Top Button
const backTop = document.getElementById("backTop");

if (backTop) {
  const handleScroll = () => {
    if (window.scrollY > 250) {
      backTop.classList.add("show");
    } else {
      backTop.classList.remove("show");
    }
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll();

  backTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

// Reveal Animation
const revealTargets = document.querySelectorAll(".reveal-target");

if (revealTargets.length) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  revealTargets.forEach(el => {
    el.classList.add("reveal");
    observer.observe(el);
  });
}

// Typing Effect
const typingEl = document.querySelector(".typing-text");

if (typingEl) {
  const words = [
    "Full-Stack Developer",
    "Web Developer",
    "System Developer",
    "Problem Solver"
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeEffect() {
    const currentWord = words[wordIndex];

    if (!deleting) {
      typingEl.textContent = currentWord.substring(
        0,
        charIndex + 1
      );

      charIndex++;

      if (charIndex === currentWord.length) {
        deleting = true;
        setTimeout(typeEffect, 1200);
        return;
      }
    } else {
      typingEl.textContent = currentWord.substring(
        0,
        charIndex - 1
      );

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

// Counter Animation
const counters = document.querySelectorAll("[data-count]");

if (counters.length) {
  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const counter = entry.target;
        const target = Number(
          counter.getAttribute("data-count")
        );

        let current = 0;
        const increment = Math.ceil(target / 40);

        const updateCounter = () => {
          current += increment;

          if (current >= target) {
            if (target === 100) {
              counter.textContent = "100%";
            } else {
              counter.textContent = `${target}+`;
            }
          } else {
            counter.textContent = current;
            requestAnimationFrame(updateCounter);
          }
        };

        updateCounter();
        observer.unobserve(counter);
      });
    },
    {
      threshold: 0.5
    }
  );

  counters.forEach(counter => {
    counterObserver.observe(counter);
  });
}

// Smooth Scroll For Internal Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");

    if (targetId.length > 1) {
      e.preventDefault();

      const target = document.querySelector(targetId);

      if (target) {
        target.scrollIntoView({
          behavior: "smooth"
        });
      }
    }
  });
});

// Initialize Lucide Icons
if (typeof lucide !== "undefined") {
  lucide.createIcons();
}
