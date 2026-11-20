import React, { useEffect, useRef, useState } from "react";
import clinicHero from "../clinic-hero.jpeg";
import doctorPhoto from "../DR.jpeg";

const clinicPhone = "+91 93267 75061";
const clinicTel = "+919326775061";

const services = [
  {
    icon: "medicine",
    title: "General Medicine",
    description: "Diagnosis and management of fever, infections, diabetes, hypertension, and thyroid disorders.",
    fee: "Consultation: ₹500",
  },
  {
    icon: "dental",
    title: "Dental & Implantology",
    description: "Painless root canals, teeth cleaning, aligners, crowns, and pediatric dental treatments.",
    fee: "Consultation: ₹400",
  },
  {
    icon: "pediatrics",
    title: "Pediatrics",
    description: "Newborn care, growth monitoring, childhood vaccinations, and adolescent nutrition advice.",
    fee: "Consultation: ₹600",
  },
  {
    icon: "skin",
    title: "Dermatology & Skin",
    description: "Clinical treatments for acne, eczema, hair fall, allergies, and safe skin rejuvenation.",
    fee: "Consultation: ₹600",
  },
  {
    icon: "lab",
    title: "Pathology & Diagnostics",
    description: "Blood tests, ECG, digital X-ray, and full-body preventive packages with home sample collection.",
    fee: "Reports within 6 hrs",
  },
  {
    icon: "orthopedics",
    title: "Orthopedics & Physio",
    description: "Joint pain relief, sports injury rehab, back pain therapy, and post-fracture physiotherapy.",
    fee: "Consultation: ₹700",
  },
];

const doctors = [
  {
    name: "Dr. Satish M Aghav",
    specialty: "General Physician & Diabetologist",
    qualification: "MBBS, MD (Internal Medicine) · 14 yrs exp.",
    bookLabel: "Book with Dr. Aghav",
    value: "Dr. Satish M Aghav - General Medicine",
    photo: doctorPhoto,
  },
  {
    name: "Dr. Vikram Deshmukh",
    specialty: "Dental Surgeon",
    qualification: "BDS, MDS (Endodontics) · 11 yrs exp.",
    bookLabel: "Book with Dr. Deshmukh",
    value: "Dr. Vikram Deshmukh - Dental",
    initials: "VD",
    avatarClass: "alt-a",
  },
  {
    name: "Dr. Priya Nair",
    specialty: "Consultant Pediatrician",
    qualification: "MBBS, DCH, DNB (Pediatrics) · 12 yrs exp.",
    bookLabel: "Book with Dr. Nair",
    value: "Dr. Priya Nair - Pediatrics",
    initials: "PN",
    avatarClass: "alt-b",
  },
];

const navItems = [
  ["services", "Services"],
  ["clinic-hours", "Clinic Hours"],
  ["doctors", "Doctors"],
  ["location", "Location"],
  ["appointment", "Book Visit"],
  ["contact", "Contact"],
];

const bookingBenefits = [
  ["Choose a department", "and preferred visit time"],
  ["Choose a date", "that works for you"],
  ["Add a note", "about your visit if needed"],
  ["Call the clinic", "to confirm your appointment"],
];

function getLocalDate() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

function createInitialForm() {
  return {
    patientName: "",
    phone: "",
    doctor: "",
    visitDate: getLocalDate(),
    timeSlot: "Morning (8:00 AM - 1:00 PM)",
    notes: "",
  };
}

function ServiceIcon({ name }) {
  const paths = {
    medicine: <path d="M12 4v16M4 12h16" />,
    dental: <><path d="M8 4h8l2 4-2 12H8L6 8l2-4Z" /><path d="M9 8h6" /></>,
    pediatrics: <path d="M12 21s-8-4.5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 6.5-8 11-8 11Z" />,
    skin: <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8m0-12.8L5.6 18.4" />,
    lab: <path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.7 3h10.6a2 2 0 0 0 1.7-3l-5-9V3M8 15h8" />,
    orthopedics: <path d="M8 4v5l4 3-4 3v5m8-16v5l-4 3 4 3v5" />,
  };

  return (
    <div className="service-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {paths[name]}
      </svg>
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [form, setForm] = useState(createInitialForm);
  const [errors, setErrors] = useState({});
  const [requestReady, setRequestReady] = useState(false);
  const [highlightedDoctor, setHighlightedDoctor] = useState("");
  const menuButtonRef = useRef(null);
  const nameInputRef = useRef(null);
  const eveningIsDisabled = form.visitDate
    ? new Date(`${form.visitDate}T00:00:00`).getDay() === 0
    : false;

  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      revealElements.forEach((element) => element.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealElements.forEach((element) => observer.observe(element));
    const revealFallback = window.setTimeout(() => {
      revealElements.forEach((element) => element.classList.add("is-visible"));
    }, 2500);

    return () => {
      observer.disconnect();
      window.clearTimeout(revealFallback);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const closeOnEscape = (event) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  useEffect(() => {
    const sections = navItems.map(([id]) => document.getElementById(id)).filter(Boolean);
    if (!("IntersectionObserver" in window) || !sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => {
      const next = { ...current, [name]: value };
      if (name === "visitDate" && value && new Date(`${value}T00:00:00`).getDay() === 0 && next.timeSlot.startsWith("Evening")) {
        next.timeSlot = "Morning (8:00 AM - 1:00 PM)";
      }
      return next;
    });
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const selectDoctor = (value) => {
    setForm((current) => ({ ...current, doctor: value }));
    setHighlightedDoctor(value);
    document.getElementById("appointment")?.scrollIntoView({ behavior: "smooth" });
    window.setTimeout(() => setHighlightedDoctor(""), 1200);
  };

  const submitRequest = (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (form.patientName.trim().length < 2) nextErrors.patientName = "Please enter the patient's full name.";
    if (!/^[6-9]\d{9}$/.test(form.phone.trim())) nextErrors.phone = "Enter a valid 10-digit Indian mobile number.";
    if (!form.doctor) nextErrors.doctor = "Please choose a doctor or department.";
    if (!form.visitDate) nextErrors.visitDate = "Please pick a preferred date.";
    else if (form.visitDate < getLocalDate()) nextErrors.visitDate = "Choose today or a future date.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      const firstInvalid = Object.keys(nextErrors)[0];
      document.getElementById(firstInvalid)?.focus();
      return;
    }
    setRequestReady(true);
  };

  const resetRequest = () => {
    setForm(createInitialForm());
    setErrors({});
    setRequestReady(false);
    window.setTimeout(() => nameInputRef.current?.focus(), 0);
  };

  const formattedDate = form.visitDate
    ? new Date(`${form.visitDate}T00:00:00`).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

  return (
    <>
      <a className="skip-link" href="#mainContent">Skip to main content</a>

      <div className="top-bar">
        <div className="container">
          <span>Sector 17, Kopar Khairane, Navi Mumbai - 400709</span>
          <span className="top-divider" aria-hidden="true">|</span>
          <span>Call: <a href={`tel:${clinicTel}`}>{clinicPhone}</a> <span className="top-divider" aria-hidden="true">|</span> Emergency: <strong>108</strong></span>
        </div>
      </div>

      <header id="siteHeader">
        <div className="container navbar">
          <a href="#mainContent" className="logo"><span aria-hidden="true">+</span> Dr. Aghav's&nbsp;Health&nbsp;Clinic</a>
          <button
            ref={menuButtonRef}
            type="button"
            className="menu-toggle"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="navLinks"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span /><span /><span />
          </button>
          <nav aria-label="Main navigation">
            <ul className={`nav-links${menuOpen ? " active" : ""}`} id="navLinks">
              {navItems.map(([id, label]) => (
                <li key={id}>
                  <a href={`#${id}`} className={activeSection === id ? "active-link" : undefined} aria-current={activeSection === id ? "location" : undefined} onClick={closeMenu}>{label}</a>
                </li>
              ))}
              <li><a href="#appointment" className="btn btn-primary" onClick={closeMenu}>Book Appointment</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main id="mainContent">
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="badge">Trusted family healthcare since 2011</span>
              <h1>Quality medical care, <em>close to home.</em></h1>
              <p>Experienced specialists, in-house diagnostics, and convenient appointments for your entire family.</p>
              <div className="hero-actions">
                <a href="#appointment" className="btn btn-primary">Book Consultation</a>
                <a href={`tel:${clinicTel}`} className="btn btn-secondary">Call {clinicPhone}</a>
              </div>
              <div className="stats">
                <div className="stat-item"><h3>15+ <small>yrs</small></h3><p>Clinical Experience</p></div>
                <div className="stat-item"><h3>12,000+</h3><p>Patients Treated</p></div>
                <div className="stat-item"><h3>4.9 <small>★</small></h3><p>Patient Rating</p></div>
              </div>
            </div>
            <div className="hero-visual reveal">
              <img className="hero-photo" src={clinicHero} alt="Dr. Aghav's Health Clinic exterior in Navi Mumbai" fetchPriority="high" decoding="async" />
            </div>
          </div>
        </section>

        <section id="clinic-hours" className="hours-section">
          <div className="container">
            <div className="hours-panel reveal">
              <div className="hours-intro">
                <span className="eyebrow">Plan your visit</span>
                <h2>Clinic Hours</h2>
                <p>Our team is here to provide care throughout the week. Holiday visits are available by prior intimation.</p>
                <a href="#appointment" className="btn btn-primary">Book an Appointment</a>
              </div>
              <div className="hours-list" aria-label="Clinic opening hours">
                <div className="hours-row"><span>Monday - Saturday <small>Morning OPD</small></span><strong>8:00 AM - 1:00 PM</strong></div>
                <div className="hours-row"><span>Monday - Saturday <small>Evening OPD</small></span><strong>5:00 PM - 10:00 PM</strong></div>
                <div className="hours-row"><span>Sunday</span><strong>8:00 AM - 1:00 PM</strong></div>
                <div className="hours-row"><span>Holidays</span><strong className="hours-note">By prior intimation</strong></div>
              </div>
            </div>
          </div>
        </section>

        <section id="services">
          <div className="container">
            <div className="section-header reveal">
              <span className="eyebrow">What we treat</span>
              <h2>Our Clinical Departments</h2>
              <p>Comprehensive outpatient consultations and preventive health checkups, delivered by specialists who take time to explain.</p>
            </div>
            <div className="services-grid">
              {services.map((service) => (
                <article className="service-card reveal" key={service.title}>
                  <ServiceIcon name={service.icon} />
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <span className="fee-tag">{service.fee}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="doctors" className="bg-light">
          <div className="container">
            <div className="section-header reveal">
              <span className="eyebrow">Meet the team</span>
              <h2>Our Specialists</h2>
              <p>Qualified doctors dedicated to transparent diagnosis and ethical, evidence-based treatment plans.</p>
            </div>
            <div className="doctors-grid">
              {doctors.map((doctor) => (
                <article className="doctor-card reveal" key={doctor.name}>
                  {doctor.photo ? (
                    <img className="doctor-photo" src={doctor.photo} alt={`${doctor.name} in his clinic`} loading="lazy" decoding="async" />
                  ) : (
                    <div className={`doctor-avatar ${doctor.avatarClass}`} aria-hidden="true">{doctor.initials}</div>
                  )}
                  <div className="doctor-info">
                    <span className="doctor-specialty">{doctor.specialty}</span>
                    <h3>{doctor.name}</h3>
                    <p className="doctor-qual">{doctor.qualification}</p>
                    <button type="button" className={`btn btn-outline${highlightedDoctor === doctor.value ? " flash" : ""}`} onClick={() => selectDoctor(doctor.value)}>{doctor.bookLabel}</button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="trust-strip" aria-label="Clinic services">
          <div className="container trust-grid">
            <div className="trust-item reveal"><strong>Consulting</strong><span>General &amp; family care</span></div>
            <div className="trust-item reveal"><strong>Laboratory</strong><span>Testing services</span></div>
            <div className="trust-item reveal"><strong>Diagnostics</strong><span>Preventive care</span></div>
            <div className="trust-item reveal"><strong>Hospitalization</strong><span>Coordinated care</span></div>
          </div>
        </section>

        <section id="appointment">
          <div className="container">
            <div className="booking-wrapper reveal">
              <div className="booking-info">
                <span className="eyebrow">Appointment request</span>
                <h2>Book Your Appointment</h2>
                <p>Share your preferred department, date, and time. Please call the clinic to confirm your visit.</p>
                <ul className="info-list">
                  {bookingBenefits.map(([strong, detail]) => (
                    <li key={strong}><span className="benefit-check" aria-hidden="true">&#10003;</span><span><strong>{strong}</strong> {detail}</span></li>
                  ))}
                </ul>
              </div>

              <div>
                {!requestReady ? (
                  <form className="form-grid" noValidate onSubmit={submitRequest}>
                    <div className="form-group">
                      <label htmlFor="patientName">Patient Full Name *</label>
                      <input ref={nameInputRef} type="text" id="patientName" name="patientName" value={form.patientName} onChange={updateField} aria-describedby="patientNameError" aria-invalid={Boolean(errors.patientName)} placeholder="e.g. Rohan Kulkarni" autoComplete="name" required />
                      <small className="field-error" id="patientNameError" aria-live="polite">{errors.patientName}</small>
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Mobile Number *</label>
                      <input type="tel" id="phone" name="phone" value={form.phone} onChange={updateField} aria-describedby="phoneError" aria-invalid={Boolean(errors.phone)} placeholder="e.g. 9876543210" pattern="[6-9][0-9]{9}" inputMode="numeric" autoComplete="tel" required />
                      <small className="field-error" id="phoneError" aria-live="polite">{errors.phone}</small>
                    </div>
                    <div className="form-group full">
                      <label htmlFor="doctor">Department / Doctor *</label>
                      <select id="doctor" name="doctor" value={form.doctor} onChange={updateField} aria-describedby="doctorError" aria-invalid={Boolean(errors.doctor)} required>
                        <option value="">-- Choose doctor or department --</option>
                        <option value="Dr. Satish M Aghav - General Medicine">Dr. Satish M Aghav (General Medicine - ₹500)</option>
                        <option value="Dr. Vikram Deshmukh - Dental">Dr. Vikram Deshmukh (Dental Care - ₹400)</option>
                        <option value="Dr. Priya Nair - Pediatrics">Dr. Priya Nair (Pediatrics - ₹600)</option>
                        <option value="Dermatology Consultation">Dermatology &amp; Skin Care (₹600)</option>
                        <option value="Orthopedics & Physiotherapy">Orthopedics &amp; Physiotherapy (₹700)</option>
                        <option value="Pathology / Blood Test">Pathology &amp; Lab Diagnostics</option>
                      </select>
                      <small className="field-error" id="doctorError" aria-live="polite">{errors.doctor}</small>
                    </div>
                    <div className="form-group">
                      <label htmlFor="visitDate">Preferred Date *</label>
                      <input type="date" id="visitDate" name="visitDate" value={form.visitDate} min={getLocalDate()} onChange={updateField} aria-describedby="visitDateError" aria-invalid={Boolean(errors.visitDate)} required />
                      <small className="field-error" id="visitDateError" aria-live="polite">{errors.visitDate}</small>
                    </div>
                    <div className="form-group">
                      <label htmlFor="timeSlot">Preferred Slot *</label>
                      <select id="timeSlot" name="timeSlot" value={form.timeSlot} onChange={updateField}>
                        <option value="Morning (8:00 AM - 1:00 PM)">Morning (8:00 AM - 1:00 PM)</option>
                        <option value="Evening (5:00 PM - 10:00 PM)" disabled={eveningIsDisabled}>Evening (5:00 PM - 10:00 PM)</option>
                      </select>
                    </div>
                    <div className="form-group full">
                      <label htmlFor="notes">Symptoms or Notes <span className="optional">(optional)</span></label>
                      <textarea id="notes" name="notes" value={form.notes} onChange={updateField} rows="2" placeholder="Briefly describe your concern..." />
                    </div>
                    <div className="form-group full">
                      <button type="submit" className="btn btn-primary full-btn">Review Appointment Request</button>
                    </div>
                  </form>
                ) : (
                  <div className="confirmation-box show" role="status" aria-live="polite">
                    <h3><span className="benefit-check" aria-hidden="true">&#10003;</span> Appointment request details</h3>
                    <p>
                      Thank you, <strong>{form.patientName.trim()}</strong>. Your request is for <strong>{form.doctor}</strong> on <strong>{formattedDate}</strong> ({form.timeSlot}).<br />
                      Contact number: <strong>+91 {form.phone.trim()}</strong>.<br />
                      {form.notes.trim() && <>Note: {form.notes.trim()}<br /></>}
                      Please call <a href={`tel:${clinicTel}`}>{clinicPhone}</a> to confirm. This form does not send your request to the clinic.
                    </p>
                    <button type="button" className="btn btn-outline" onClick={resetRequest}>Start another request</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section id="location" className="bg-light">
          <div className="container">
            <div className="section-header reveal">
              <span className="eyebrow">Find us</span>
              <h2>Visit Our Clinic</h2>
              <p>Find us near Aazad School in Sector 17, Kopar Khairane, Navi Mumbai.</p>
            </div>
            <div className="map-card reveal">
              <iframe
                src="https://maps.google.com/maps?q=Shop%20No.%203%20%26%204%2C%20Plot%20No.%2036%2C%20Phase%201%2C%20Sector%2017%2C%20Kopar%20Khairane%2C%20Navi%20Mumbai%20400709&z=16&output=embed"
                title="Dr. Aghav's Health Clinic location on Google Maps"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <div className="map-overlay">
                <strong>Shop 3 &amp; 4, Plot 36</strong>
                <span>Phase 1, Kopar Khairane, Navi Mumbai - 400709</span>
                <a className="btn btn-primary" href="https://www.google.com/maps/search/?api=1&query=Shop%203%20%26%204%2C%20Plot%2036%2C%20Phase%201%2C%20Sector%2017%2C%20Kopar%20Khairane%2C%20Navi%20Mumbai%20400709" target="_blank" rel="noopener noreferrer">Open in Google Maps</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer id="contact">
        <div className="container">
          <div className="footer-grid">
            <div>
              <h4>Dr. Aghav's Health Clinic</h4>
              <p>Compassionate, evidence-based healthcare for individuals and families.</p>
            </div>
            <div>
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#services">Clinical Services</a></li>
                <li><a href="#doctors">Our Doctors</a></li>
                <li><a href="#location">Clinic Location</a></li>
                <li><a href="#appointment">Book Appointment</a></li>
              </ul>
            </div>
            <div>
              <h4>Contact &amp; Location</h4>
              <ul>
                <li>Shop 3 &amp; 4, Plot 36, Phase 1, Sector 17, Kopar Khairane, Navi Mumbai - 400709</li>
                <li><a href={`tel:${clinicTel}`}>Phone: {clinicPhone}</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>&copy; 2026 Dr. Aghav's Health Clinic. All rights reserved.</span>
            <span className="footer-credit">Designed by Kunal Pol</span>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
