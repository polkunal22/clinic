(() => {
  document.documentElement.classList.add('js');

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- Sticky Header Scroll State ----------
  const siteHeader = document.getElementById('siteHeader');
  const updateHeaderScroll = () => {
    if (!siteHeader) return;
    siteHeader.classList.toggle('is-scrolled', window.scrollY > 16);
  };
  window.addEventListener('scroll', updateHeaderScroll, { passive: true });
  updateHeaderScroll();

  // ---------- Mobile & Tablet Navigation Drawer ----------
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const closeMenu = () => {
    if (!navLinks || !menuToggle) return;
    navLinks.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation menu');
  };

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.getAttribute('aria-expanded') !== 'true';
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
      navLinks.classList.toggle('active', isOpen);
    });

    navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
        closeMenu();
        menuToggle.focus();
      }
    });

    document.addEventListener('click', event => {
      if (
        menuToggle.getAttribute('aria-expanded') === 'true' &&
        !navLinks.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }
    });
  }

  // ---------- Active Navigation Link Tracking ----------
  const navAnchors = navLinks ? Array.from(navLinks.querySelectorAll('a[href^="#"]:not(.btn)')) : [];
  const trackedSections = navAnchors
    .map(anchor => document.querySelector(anchor.getAttribute('href')))
    .filter(Boolean);

  if ('IntersectionObserver' in window && trackedSections.length) {
    const navObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = `#${entry.target.id}`;
            navAnchors.forEach(anchor => {
              const isMatch = anchor.getAttribute('href') === id;
              anchor.classList.toggle('active-link', isMatch);
              if (isMatch) anchor.setAttribute('aria-current', 'location');
              else anchor.removeAttribute('aria-current');
            });
          }
        });
      },
      { rootMargin: '-38% 0px -52% 0px' }
    );
    trackedSections.forEach(section => navObserver.observe(section));
  }

  // ---------- Staggered Scroll Reveal Animations ----------
  const staggerGroups = document.querySelectorAll('.services-grid, .doctors-grid, .trust-grid, .faq-grid');
  staggerGroups.forEach(group => {
    Array.from(group.querySelectorAll('[data-stagger]')).forEach((item, index) => {
      item.style.setProperty('--stagger-index', String(index));
    });
  });

  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealElements.forEach(el => revealObserver.observe(el));
    window.setTimeout(() => {
      revealElements.forEach(el => el.classList.add('is-visible'));
    }, 2800);
  } else {
    revealElements.forEach(el => el.classList.add('is-visible'));
  }

  // ---------- Animated Verified Statistics Counters ----------
  const counters = document.querySelectorAll('.stat-counter');
  const animateCounter = el => {
    const target = parseFloat(el.dataset.target || '0');
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const suffix = el.dataset.suffix || '';
    const useComma = el.dataset.format === 'comma';
    const duration = 1500;
    const startTime = performance.now();

    const formatNumber = value => {
      const fixed = decimals > 0 ? value.toFixed(decimals) : String(Math.round(value));
      const formatted = useComma ? Number(fixed).toLocaleString('en-IN') : fixed;
      return `${formatted}${suffix}`;
    };

    if (prefersReducedMotion) {
      el.textContent = formatNumber(target);
      return;
    }

    const tick = now => {
      const elapsed = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - elapsed, 4);
      el.textContent = formatNumber(target * eased);
      if (elapsed < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = formatNumber(target);
      }
    };
    requestAnimationFrame(tick);
  };

  if ('IntersectionObserver' in window && counters.length) {
    const counterObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach(counter => counterObserver.observe(counter));
  }

  // Note: Continuous pointer/keyframe transforms on text elements are disabled
  // to prevent browser subpixel font rasterization jitter.

  // ---------- Live Clinic Open / Closed Status Indicator ----------
  const updateLiveClinicStatus = () => {
    const now = new Date();
    const day = now.getDay(); // 0 = Sun, 1..6 = Mon..Sat
    const minutes = now.getHours() * 60 + now.getMinutes();
    const isMorningOpen = minutes >= 8 * 60 && minutes < 13 * 60;
    const isEveningOpen = day !== 0 && minutes >= 17 * 60 && minutes < 22 * 60;
    const isOpen = isMorningOpen || isEveningOpen;

    const topStatus = document.getElementById('topClinicStatus');
    const heroStatusBadge = document.getElementById('heroStatusBadge');
    const hoursLiveText = document.getElementById('hoursLiveText');
    const hoursLiveBanner = document.getElementById('hoursLiveBanner');

    let statusLabel = 'Open Now · Morning OPD (8:00 AM – 1:00 PM)';
    let activeSlot = '';

    if (isMorningOpen) {
      statusLabel = day === 0
        ? 'Open Now · Sunday Morning OPD (until 1:00 PM)'
        : 'Open Now · Morning OPD (until 1:00 PM)';
      activeSlot = day === 0 ? 'sunday' : 'morning';
    } else if (isEveningOpen) {
      statusLabel = 'Open Now · Evening OPD (until 10:00 PM)';
      activeSlot = 'evening';
    } else if (day !== 0 && minutes >= 13 * 60 && minutes < 17 * 60) {
      statusLabel = 'Evening OPD Opens Today at 5:00 PM';
    } else {
      statusLabel = 'Morning OPD Opens at 8:00 AM';
    }

    if (topStatus) {
      const dot = topStatus.querySelector('.status-dot');
      const text = topStatus.querySelector('.status-text');
      if (dot) dot.classList.toggle('is-closed', !isOpen);
      if (text) text.textContent = statusLabel;
    }

    if (heroStatusBadge) {
      heroStatusBadge.textContent = isOpen ? 'Open Now for Consultations' : 'Open 7 Days a Week';
    }

    if (hoursLiveText && hoursLiveBanner) {
      const dot = hoursLiveBanner.querySelector('.status-dot');
      if (dot) dot.classList.toggle('is-closed', !isOpen);
      hoursLiveText.textContent = statusLabel;
    }

    document.querySelectorAll('.hours-row[data-slot]').forEach(row => {
      row.classList.toggle('is-active-slot', row.dataset.slot === activeSlot);
    });
  };
  updateLiveClinicStatus();

  // ---------- Appointment Form & Department Selection ----------
  const form = document.getElementById('appointmentForm');
  const dateInput = document.getElementById('visitDate');
  const timeSelect = document.getElementById('timeSlot');
  const doctorSelect = document.getElementById('doctor');
  const selectedFeeBadge = document.getElementById('selectedFeeBadge');
  const sundaySlotNote = document.getElementById('sundaySlotNote');

  const feeMap = {
    'Dr. Satish M Aghav - General Medicine': 'Consultation Fee: ₹500',
    'Dr. Vikram Deshmukh - Dental': 'Consultation Fee: ₹400',
    'Dr. Priya Nair - Pediatrics': 'Consultation Fee: ₹600',
    'Dermatology Consultation': 'Consultation Fee: ₹600',
    'Orthopedics & Physiotherapy': 'Consultation Fee: ₹700',
    'Pathology / Blood Test': 'Reports within 6 hrs'
  };

  const updateFeeBadge = () => {
    if (!selectedFeeBadge || !doctorSelect) return;
    const val = doctorSelect.value;
    selectedFeeBadge.textContent = feeMap[val] || 'Select a department';
  };

  if (doctorSelect) {
    doctorSelect.addEventListener('change', updateFeeBadge);
  }

  const today = new Date();
  const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  if (dateInput && timeSelect) {
    dateInput.min = localToday;
    dateInput.value = localToday;

    const updateSundaySlot = () => {
      const isSunday = dateInput.value && new Date(`${dateInput.value}T00:00:00`).getDay() === 0;
      if (timeSelect.options[1]) {
        timeSelect.options[1].disabled = Boolean(isSunday);
      }
      if (isSunday && timeSelect.selectedIndex === 1) {
        timeSelect.selectedIndex = 0;
      }
      if (sundaySlotNote) {
        sundaySlotNote.textContent = isSunday
          ? 'Sunday OPD is available in the Morning slot (8:00 AM - 1:00 PM).'
          : '';
      }
    };
    dateInput.addEventListener('change', updateSundaySlot);
    updateSundaySlot();
  }

  document.querySelectorAll('.doctor-book').forEach(button => {
    button.addEventListener('click', () => {
      if (!doctorSelect) return;
      doctorSelect.value = button.dataset.doctor || '';
      updateFeeBadge();
      const doctorError = document.getElementById('doctorError');
      if (doctorError) doctorError.textContent = '';
      doctorSelect.removeAttribute('aria-invalid');
      doctorSelect.classList.remove('flash');
      void doctorSelect.offsetWidth;
      doctorSelect.classList.add('flash');
      document.getElementById('appointment')?.scrollIntoView({ behavior: 'smooth' });
    });
  });

  const errors = {
    patientName: "Please enter the patient's full name.",
    phone: 'Enter a valid 10-digit Indian mobile number.',
    doctor: 'Please choose a doctor or department.',
    visitDate: 'Please pick today or a future date.'
  };

  Object.keys(errors).forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('input', () => {
      const errEl = document.getElementById(`${id}Error`);
      if (errEl) errEl.textContent = '';
      el.removeAttribute('aria-invalid');
    });
  });

  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      const values = Object.fromEntries(new FormData(form).entries());
      const invalid = [];

      if ((values.patientName || '').trim().length < 2) invalid.push('patientName');
      if (!/^[6-9]\d{9}$/.test((values.phone || '').trim())) invalid.push('phone');
      if (!values.doctor) invalid.push('doctor');
      if (!values.visitDate || values.visitDate < localToday) invalid.push('visitDate');

      Object.keys(errors).forEach(id => {
        const field = document.getElementById(id);
        const errEl = document.getElementById(`${id}Error`);
        const hasError = invalid.includes(id);
        if (field) field.setAttribute('aria-invalid', String(hasError));
        if (errEl) errEl.textContent = hasError ? errors[id] : '';
      });

      if (invalid.length) {
        document.getElementById(invalid[0])?.focus();
        return;
      }

      const formattedDate = new Date(`${values.visitDate}T00:00:00`).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });

      const message = document.getElementById('confirmationText');
      if (message) {
        message.replaceChildren();
        const addLine = (text, bold = false) => {
          const node = bold ? document.createElement('strong') : document.createElement('span');
          node.textContent = text;
          message.append(node, document.createElement('br'));
        };

        message.append(document.createTextNode('Thank you, '));
        const name = document.createElement('strong');
        name.textContent = values.patientName.trim();
        message.append(name, document.createTextNode('. Your request is for '));

        const doctor = document.createElement('strong');
        doctor.textContent = values.doctor;
        message.append(doctor, document.createTextNode(' on '));

        const date = document.createElement('strong');
        date.textContent = formattedDate;
        message.append(date, document.createTextNode(` (${values.timeSlot}).`), document.createElement('br'));

        addLine(`Contact number: +91 ${values.phone.trim()}.`);
        if ((values.notes || '').trim()) {
          addLine(`Note: ${values.notes.trim()}`);
        }

        const callText = document.createTextNode('Please call ');
        const callLink = document.createElement('a');
        callLink.href = 'tel:+919326775061';
        callLink.textContent = '+91 93267 75061';
        message.append(
          callText,
          callLink,
          document.createTextNode(' to confirm. This form does not send your request to the clinic.')
        );
      }

      form.style.display = 'none';
      const confirmation = document.getElementById('confirmation');
      if (confirmation) confirmation.style.display = 'block';
    });
  }

  const newRequestBtn = document.getElementById('newRequest');
  if (newRequestBtn && form) {
    newRequestBtn.addEventListener('click', () => {
      form.reset();
      if (dateInput) {
        dateInput.value = localToday;
        dateInput.min = localToday;
        dateInput.dispatchEvent(new Event('change'));
      }
      updateFeeBadge();
      Object.keys(errors).forEach(id => {
        const errEl = document.getElementById(`${id}Error`);
        const field = document.getElementById(id);
        if (errEl) errEl.textContent = '';
        if (field) field.removeAttribute('aria-invalid');
      });
      const confirmation = document.getElementById('confirmation');
      if (confirmation) confirmation.style.display = 'none';
      form.style.display = '';
      document.getElementById('patientName')?.focus();
    });
  }

  // ---------- Accessible FAQ Accordion ----------
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      const answer = btn.nextElementSibling;
      btn.setAttribute('aria-expanded', String(!isExpanded));
      if (answer) {
        answer.classList.toggle('is-open', !isExpanded);
      }
    });
  });

  // ---------- Copy Clinic Address Button ----------
  const copyAddressBtn = document.getElementById('copyAddressBtn');
  if (copyAddressBtn) {
    copyAddressBtn.addEventListener('click', async () => {
      const address = copyAddressBtn.dataset.address || '';
      try {
        if (navigator.clipboard && address) {
          await navigator.clipboard.writeText(address);
          const original = copyAddressBtn.textContent;
          copyAddressBtn.textContent = 'Address Copied ✓';
          window.setTimeout(() => {
            copyAddressBtn.textContent = original;
          }, 2000);
        }
      } catch {
        // Fallback if clipboard permission is unavailable
      }
    });
  }
})();
