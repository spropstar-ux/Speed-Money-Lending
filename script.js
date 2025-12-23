// Hamburger Menu Toggle
      const hamburger = document.getElementById("hamburger");
      const mobileMenu = document.getElementById("mobileMenu");
      const navLinks = document.querySelectorAll(".nav-link");

      hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        mobileMenu.classList.toggle("active");
      });

      // Close menu when clicking on a link
      navLinks.forEach((link) => {
        link.addEventListener("click", () => {
          hamburger.classList.remove("active");
          mobileMenu.classList.remove("active");
        });
      });

      // Phone Mask
      const phone = document.getElementById('phone');
      if (phone) {
        phone.addEventListener("input", (e) => {
          let v = e.target.value.replace(/\D/g, "").slice(0, 10);
          if (v.length > 6) {
            e.target.value = v.replace(/(\d{3})(\d{3})(\d{1,4})/, "($1) $2-$3");
          } else if (v.length > 3) {
            e.target.value = v.replace(/(\d{3})(\d{1,3})/, "($1) $2");
          } else {
            e.target.value = v;
          }
        });
      }

      // Reveal-on-scroll for `.roman` and `.testimonial` elements
      const revealObserver = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.6 }
      );
      
      document.querySelectorAll('.testimonial').forEach(el => revealObserver.observe(el));
