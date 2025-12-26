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


document.getElementById("loanForm")?.addEventListener("submit", async function (e) {
  e.preventDefault();
  const form = e.target;
  const fullNameEl = form.querySelector('#fullName') || document.getElementById('fullName');
  const emailEl = form.querySelector('#email') || document.getElementById('email');
  const phoneEl = form.querySelector('#phone') || document.getElementById('phone');

  const formData = {
    fullName: (fullNameEl && fullNameEl.value) ? fullNameEl.value.trim() : '',
    email: (emailEl && emailEl.value) ? emailEl.value.trim() : '',
    phone: (phoneEl && phoneEl.value) ? phoneEl.value.trim() : ''
  };

  if (!formData.fullName || !formData.email || !formData.phone) {
    Swal.fire({
      title: "Missing Fields",
      text: "Please fill all required fields before submitting.",
      icon: "warning",
      confirmButtonColor: "#b59b6e"
    });
    return;
  }

  const submitBtn = form.querySelector("button[type='submit']") || document.querySelector("button[type='submit']");
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = "<span class=\"spinner-border spinner-border-sm\"></span> Sending...";
  }

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbwFCJfjE7Y4FLuYjiva9ML5CGQ7y2rgVZorI0zhrufte-waeZt98RRY_b4x9L6tV2tx/exec", {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(formData)
    });

    const result = await response.json();
    if (result.status === "success") {
      Swal.fire({
        html: `
          <div style="padding: 30px; text-align:center;">
            <h2 style="font-size: 1.6rem; font-weight:600; color:#000; margin-bottom:12px;">
              Thank you, ${formData.fullName}
            </h2>
            <p style="font-size: 1rem; color:#444; margin-bottom:0; line-height:1.6;">
              We’ve received your message.<br>
              Our team will connect with you shortly.
            </p>
            <p style="margin-top:18px; font-weight:bold; font-size:1.1rem; color:#000;">
              – Speed Money Lending Team
            </p>
          </div>
        `,
        background: "#ffffff",
        color: "#222",
        width: 500,
        allowOutsideClick: false,
        allowEscapeKey: false,
        confirmButtonText: "Close",
        confirmButtonColor: "#000000ff",
        customClass: {
          popup: "rounded-2xl shadow-2xl border-0",
          confirmButton: "px-5 py-2 rounded-md font-medium"
        }
      }).then(() => form.reset());
    } else {
      throw new Error(result.message || "Something went wrong, please try again.");
    }
  } catch (error) {
    Swal.fire({
      title: "Oops!",
      text: error.message,
      icon: "error",
      confirmButtonColor: "#b59b6e"
    });
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = "Submit";
    }
  }
});