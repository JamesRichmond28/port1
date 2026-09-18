document.addEventListener("DOMContentLoaded", () => {
  // 1. Splash Screen Fade-out
  const welcomeScreen = document.getElementById("welcome-screen");
  if (welcomeScreen) {
    setTimeout(() => {
      welcomeScreen.classList.add("hidden");
    }, 2200);
  }

  // 2. Typewriter Effect
  const words = ["Frontend Developer", "Data Analyst", "Database Engineer", "Student & Creator"];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typewriterElement = document.getElementById("typewriter-text");

  function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 40 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 400;
    }

    setTimeout(type, typeSpeed);
  }
  type();

  // 3. Hamburger Mobile Menu Drawer Toggle
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener("click", () => {
      hamburgerBtn.classList.toggle("open");
      mobileMenu.classList.toggle("open");
    });

    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        hamburgerBtn.classList.remove("open");
        mobileMenu.classList.remove("open");
      });
    });
  }

  // 4. Tab Switching (Projects / Certificates / Tech Stack)
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-tab");

      tabBtns.forEach((b) => b.classList.remove("active"));
      tabContents.forEach((c) => c.classList.remove("active"));

      btn.classList.add("active");
      const activeTab = document.getElementById(target);
      if (activeTab) activeTab.classList.add("active");
    });
  });

  // 5. Project Details Modal Dialog
  const modal = document.getElementById("details-modal");
  const modalClose = document.getElementById("modal-close");
  const modalTitle = document.getElementById("modal-title");
  const modalDesc = document.getElementById("modal-desc");
  const modalTech = document.getElementById("modal-tech");

  document.querySelectorAll(".open-modal-btn").forEach((button) => {
    button.addEventListener("click", () => {
      modalTitle.textContent = button.getAttribute("data-title");
      modalDesc.textContent = button.getAttribute("data-desc");

      const techs = button.getAttribute("data-tech").split(", ");
      modalTech.innerHTML = techs.map((t) => `<span>${t}</span>`).join("");

      modal.classList.add("open");
    });
  });

  if (modalClose && modal) {
    modalClose.addEventListener("click", () => modal.classList.remove("open"));
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.remove("open");
    });
  }

  // 6. Interactive Guestbook Comments
  const commentForm = document.getElementById("comment-form");
  const commentFeed = document.getElementById("comment-feed");
  const commentCount = document.getElementById("comment-count");
  let count = 1;

  if (commentForm && commentFeed) {
    commentForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("comment-name").value.trim();
      const text = document.getElementById("comment-text").value.trim();

      if (name && text) {
        const commentItem = document.createElement("div");
        commentItem.className = "comment-item";
        commentItem.innerHTML = `
          <div class="comment-avatar">💬</div>
          <div>
            <strong>${name}</strong>
            <p>${text}</p>
          </div>
        `;
        commentFeed.prepend(commentItem);

        count++;
        commentCount.textContent = count;
        commentForm.reset();
      }
    });
  }

  // 7. Contact Form Simulation
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thank you, Richmond has received your message!");
      contactForm.reset();
    });
  }

  // 8. Active Nav Link on Scroll
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 150;
      if (pageYOffset >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
});
