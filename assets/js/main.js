document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("nav ul li a");
  const header = document.querySelector("header");

  // Highlight navigation item on scroll
  const highlightNavigation = () => {
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute("id");

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  };

  // Header shadow elevation
  const handleHeaderShadow = () => {
    if (window.scrollY > 40) {
      header.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.45)";
    } else {
      header.style.boxShadow = "none";
    }
  };

  window.addEventListener("scroll", () => {
    highlightNavigation();
    handleHeaderShadow();
  });

  // Click-to-copy email interaction
  const emailLink = document.querySelector(".email-link");
  if (emailLink) {
    emailLink.addEventListener("click", async (e) => {
      const email = emailLink.textContent.trim();

      try {
        await navigator.clipboard.writeText(email);
        const originalText = emailLink.textContent;
        emailLink.textContent = "✓ copied to clipboard!";
        emailLink.style.color = "var(--accent)";

        setTimeout(() => {
          emailLink.textContent = originalText;
        }, 2000);
      } catch (err) {
        // Fallback: regular mailto behavior continues
      }
    });
  }
});