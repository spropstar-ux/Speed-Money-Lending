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

      document.getElementById("loanForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const form = e.target;
  const submitBtn = document.getElementById("submitBtn");

  submitBtn.disabled = true;
  submitBtn.textContent = "Submitting...";

  const data = {
    fullName: form.fullName.value.trim(),
    email: form.email.value.trim(),
    phone: form.phone.value.trim()
  };

  try {
    // Send as form-encoded to avoid CORS preflight (Google Apps Script accepts form data in e.parameter)
    const params = new URLSearchParams();
    params.append('fullName', data.fullName);
    params.append('email', data.email);
    params.append('phone', data.phone);

    const response = await fetch("https://script.google.com/macros/s/AKfycbyI5nMyymkcJqmQSsBeWQbi-gIzX2TdoIZe17xEgVgDOiau0iMlFkTgIeaaQn4wSBTU/exec", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      body: params.toString()
    });

    // The Apps Script endpoint may return plain text (url-encoded echo) instead of JSON.
    // Safely handle both JSON and non-JSON responses.
    const text = await response.text();
    let result = null;
    try {
      result = JSON.parse(text);
    } catch (err) {
      // not JSON
      result = null;
    }

    if (result && result.status === "success") {
      alert("Your request has been submitted successfully!");
      form.reset();
    } else if (response.ok) {
      // Treat a successful HTTP response as success even if body wasn't JSON.
      alert("Your request has been submitted successfully!");
      form.reset();
    } else {
      const msg = (result && result.message) ? result.message : (text || 'Unknown server error');
      throw new Error(msg);
    }

  } catch (error) {
    alert("Error submitting form: " + error.message);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Submit";
  }
});