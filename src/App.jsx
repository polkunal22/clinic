import React, { useEffect, useRef, useState } from "react";
import clinicHero from "../image/clinic-hero.jpeg";
import doctorPhoto from "../image/DR.jpeg";
import dentistPhoto from "../image/dr. Dentist.png";
import pediatricianPhoto from "../image/dr. Clinic.png";

const clinicPhone = "+91 93267 75061";
const clinicTel = "+919326775061";

const services = [
  {
    icon: "medicine",
    title: "General Medicine",
    description: "Diagnosis and management of fever, infections, diabetes, hypertension, and thyroid disorders.",
    fee: "Consultation: ₹500",
    doctorValue: "Dr. Satish M Aghav - General Medicine",
    cta: "Book General Medicine",
  },
  {
    icon: "dental",
    title: "Dental & Implantology",
    description: "Painless root canals, teeth cleaning, aligners, crowns, and pediatric dental treatments.",
    fee: "Consultation: ₹400",
    doctorValue: "Dr. Vikram Deshmukh - Dental",
    cta: "Book Dental Care",
  },
  {
    icon: "pediatrics",
    title: "Pediatrics",
    description: "Newborn care, growth monitoring, childhood vaccinations, and adolescent nutrition advice.",
    fee: "Consultation: ₹600",
    doctorValue: "Dr. Priya Nair - Pediatrics",
    cta: "Book Pediatrics",
  },
  {
    icon: "skin",
    title: "Dermatology & Skin",
    description: "Clinical treatments for acne, eczema, hair fall, allergies, and safe skin rejuvenation.",
    fee: "Consultation: ₹600",
    doctorValue: "Dermatology Consultation",
    cta: "Book Dermatology",
  },
  {
    icon: "lab",
    title: "Pathology & Diagnostics",
    description: "Blood tests, ECG, digital X-ray, and full-body preventive packages with home sample collection.",
    fee: "Reports within 6 hrs",
    goldTag: true,
    doctorValue: "Pathology / Blood Test",
    cta: "Book Lab & Diagnostics",
  },
  {
    icon: "orthopedics",
    title: "Orthopedics & Physio",
    description: "Joint pain relief, sports injury rehab, back pain therapy, and post-fracture physiotherapy.",
    fee: "Consultation: ₹700",
    doctorValue: "Orthopedics & Physiotherapy",
    cta: "Book Orthopedics",
  },
];

const doctors = [
  {
    name: "Dr. Satish M Aghav",
    specialty: "General Physician & Diabetologist",
    qualification: "MBBS, MD (Internal Medicine) · 14 yrs exp.",
    expBadge: "14 Yrs Experience",
    fee: "₹500",
    schedule: "Mon – Sun OPD",
    bookLabel: "Book with Dr. Aghav",
    value: "Dr. Satish M Aghav - General Medicine",
    photo: doctorPhoto,
  },
  {
    name: "Dr. Vikram Deshmukh",
    specialty: "Dental Surgeon",
    qualification: "BDS, MDS (Endodontics) · 11 yrs exp.",
    expBadge: "11 Yrs Experience",
    fee: "₹400",
    schedule: "Dental & Implantology",
    bookLabel: "Book with Dr. Deshmukh",
    value: "Dr. Vikram Deshmukh - Dental",
    photo: dentistPhoto,
    portrait: true,
  },
  {
    name: "Dr. Priya Nair",
    specialty: "Consultant Pediatrician",
    qualification: "MBBS, DCH, DNB (Pediatrics) · 12 yrs exp.",
    expBadge: "12 Yrs Experience",
    fee: "₹600",
    schedule: "Child & Newborn Care",
    bookLabel: "Book with Dr. Nair",
    value: "Dr. Priya Nair - Pediatrics",
    photo: pediatricianPhoto,
    portrait: true,
  },
];

const faqs = [
  {
    question: "What are the clinic's regular OPD hours and Sunday timings?",
    answer:
      "Monday through Saturday, our Morning OPD runs from 8:00 AM to 1:00 PM and Evening OPD runs from 5:00 PM to 10:00 PM. On Sundays, the clinic is open for Morning OPD from 8:00 AM to 1:00 PM. Holiday visits are available by prior intimation.",
  },
  {
    question: "How do I confirm my appointment request?",
    answer:
      "You can prepare and review your appointment request using the form above by selecting your preferred specialist or department, date, and OPD slot. Because the website form is a browser review tool and does not transmit data to a server, please call +91 93267 75061 to confirm your slot with the clinic.",
  },
  {
    question: "Are lab tests, ECG, X-ray, and home sample collection available?",
    answer:
      "Yes. Our Pathology & Diagnostics department offers blood tests, ECG, digital X-ray, and full-body preventive health packages with home sample collection. Standard diagnostic reports are delivered within 6 hours.",
  },
  {
    question: "What are the consultation fees for each specialist department?",
    answer:
      "Standard outpatient consultation fees are: Dental & Implantology (₹400), General Medicine (₹500), Pediatrics (₹600), Dermatology & Skin (₹600), and Orthopedics & Physio (₹700).",
  },
];

const navItems = [
  ["services", "Services"],
  ["clinic-hours", "Clinic Hours"],
  ["doctors", "Doctors"],
  ["facilities", "Why Choose Us"],
  ["location", "Location"],
  ["faq", "FAQs"],
  ["contact", "Contact"],
];

const bookingBenefits = [
  ["Choose a department", "and preferred visit time"],
  ["Choose a date", "that works for you"],
  ["Add a note", "about your visit if needed"],
  ["Call the clinic", "to confirm your appointment"],
];

const feeMap = {
  "Dr. Satish M Aghav - General Medicine": "Consultation Fee: ₹500",
  "Dr. Vikram Deshmukh - Dental": "Consultation Fee: ₹400",
  "Dr. Priya Nair - Pediatrics": "Consultation Fee: ₹600",
  "Dermatology Consultation": "Consultation Fee: ₹600",
  "Orthopedics & Physiotherapy": "Consultation Fee: ₹700",
  "Pathology / Blood Test": "Reports within 6 hrs",
};

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
    dental: (
      <>
        <path d="M8 4h8l2 4-2 12H8L6 8l2-4Z" />
        <path d="M9 8h6" />
      </>
    ),
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
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [copiedAddress, setCopiedAddress] = useState(false);
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
      { rootMargin: "-40% 0px -50% 0px" }
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
    setErrors((current) => ({ ...current, doctor: "" }));
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

  const copyAddress = async () => {
    try {
      await navigator.clipboard?.writeText("Shop 3 & 4, Plot 36, Phase 1, Sector 17, Kopar Khairane, Navi Mumbai - 400709");
      setCopiedAddress(true);
      window.setTimeout(() => setCopiedAddress(false), 2000);
    } catch {
      // ignore clipboard errors
    }
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
        <div className="container top-bar-inner">
          <div className="top-bar-left">
            <span className="top-location">Sector 17, Kopar Khairane, Navi Mumbai - 400709</span>
            <span className="top-divider" aria-hidden="true">|</span>
            <span className="top-live-status">
              <span className="status-dot" aria-hidden="true" />
              <span className="status-text">Mon–Sat: 8 AM – 1 PM &amp; 5 PM – 10 PM · Sun: 8 AM – 1 PM</span>
            </span>
          </div>
          <div className="top-contact">
            <span>Call: <a href={`tel:${clinicTel}`}>{clinicPhone}</a></span>
            <span className="top-divider" aria-hidden="true">|</span>
            <span className="emergency-pill">Emergency: <strong>108</strong></span>
          </div>
        </div>
      </div>

      <header id="siteHeader">
        <div className="container navbar">
          <a href="#mainContent" className="logo">
            <span className="logo-mark" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
              </svg>
            </span>
            <span className="logo-copy">
              <span className="logo-name">Dr. Aghav&apos;s Health Clinic</span>
              <span className="logo-tagline">Family &amp; Specialist Care · Est. 2011</span>
            </span>
          </a>
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
                  <a
                    href={`#${id}`}
                    className={activeSection === id ? "active-link" : undefined}
                    aria-current={activeSection === id ? "location" : undefined}
                    onClick={closeMenu}
                  >
                    {label}
                  </a>
                </li>
              ))}
              <li className="nav-cta-item">
                <a href="#appointment" className="btn btn-primary btn-nav" onClick={closeMenu}>
                  <span>Book Appointment</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main id="mainContent">
        <section className="hero" id="heroSection">
          <div className="hero-ambient" aria-hidden="true">
            <div className="ambient-orb ambient-orb-teal" />
            <div className="ambient-orb ambient-orb-blue" />
            <div className="ambient-orb ambient-orb-gold" />
            <div className="ambient-circle ambient-circle-lg" />
            <div className="ambient-circle ambient-circle-sm" />
            <div className="ambient-grid" />
          </div>
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="badge-group hero-stagger">
                <span className="badge">
                  <span className="status-dot" aria-hidden="true" />
                  Trusted family healthcare since 2011
                </span>
                <span className="badge badge-subtle">Sector 17, Kopar Khairane</span>
              </div>
              <h1 className="hero-headline hero-stagger">
                <span className="hero-headline-line">Quality medical care,</span>
                <span className="hero-headline-line"><em>close to home.</em></span>
              </h1>
              <p className="hero-lead hero-stagger">
                Experienced specialists, in-house diagnostics, and convenient appointments for your entire family in Navi Mumbai.
              </p>
              <div className="hero-actions hero-stagger">
                <a href="#appointment" className="btn btn-primary btn-lg">Book Consultation</a>
                <a href={`tel:${clinicTel}`} className="btn btn-secondary btn-lg">Call {clinicPhone}</a>
              </div>
              <div className="hero-quick-tags hero-stagger" aria-label="Quick department selection">
                <span className="quick-tags-label">Departments:</span>
                <button type="button" className="quick-tag" onClick={() => selectDoctor("Dr. Satish M Aghav - General Medicine")}>General Medicine</button>
                <button type="button" className="quick-tag" onClick={() => selectDoctor("Dr. Vikram Deshmukh - Dental")}>Dental Care</button>
                <button type="button" className="quick-tag" onClick={() => selectDoctor("Dr. Priya Nair - Pediatrics")}>Pediatrics</button>
                <button type="button" className="quick-tag" onClick={() => selectDoctor("Pathology / Blood Test")}>Pathology &amp; Lab</button>
              </div>
              <div className="stats hero-stagger">
                <div className="stat-item"><h3>15+ <small>yrs</small></h3><p>Clinical Experience</p></div>
                <div className="stat-divider" aria-hidden="true" />
                <div className="stat-item"><h3>12,000+</h3><p>Patients Treated</p></div>
                <div className="stat-divider" aria-hidden="true" />
                <div className="stat-item"><h3>4.9 <small className="gold-star">★</small></h3><p>Patient Rating</p></div>
              </div>
            </div>
            <div className="hero-visual-wrap hero-stagger" id="heroStage">
              <div className="hero-aura-glow" aria-hidden="true" />
              <div className="hero-orbit-ring hero-orbit-ring-outer" aria-hidden="true">
                <span className="orbit-node orbit-node-top" />
                <span className="orbit-node orbit-node-right" />
              </div>
              <div className="hero-orbit-ring hero-orbit-ring-inner" aria-hidden="true" />
              <div className="hero-backdrop-shape" aria-hidden="true" />
              <div className="hero-dots-accent" aria-hidden="true" />

              <div className="hero-visual" id="heroVisual">
                <div className="hero-photo-frame">
                  <img className="hero-photo" src={clinicHero} alt="Dr. Aghav's Health Clinic exterior in Navi Mumbai" fetchPriority="high" decoding="async" />
                  <div className="hero-photo-sheen" aria-hidden="true" />
                </div>
              </div>

              <div className="floating-cards-group" aria-label="Key clinic highlights">
                <div className="floating-card floating-card-doctors">
                  <div className="floating-card-body">
                    <span className="floating-card-eyebrow">Specialist Team</span>
                    <strong>Expert Doctors</strong>
                    <span>General Medicine, Dental &amp; Pediatrics</span>
                  </div>
                </div>
                <div className="floating-card floating-card-care">
                  <div className="floating-card-body">
                    <span className="floating-card-eyebrow">In-House Diagnostics</span>
                    <strong>Personalized Care</strong>
                    <span>Pathology Lab, ECG &amp; Digital X-Ray</span>
                  </div>
                </div>
                <a href="#appointment" className="floating-card floating-card-booking">
                  <div className="floating-card-body">
                    <span className="floating-card-eyebrow">Open 7 Days a Week</span>
                    <strong>Book Appointment</strong>
                    <span>8 AM – 1 PM &amp; 5 PM – 10 PM OPD</span>
                  </div>
                  <span className="floating-card-arrow" aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="clinic-hours" className="hours-section">
          <div className="container">
            <div className="hours-panel reveal">
              <div className="hours-intro">
                <span className="eyebrow">Plan your visit</span>
                <h2>Clinic Hours &amp; OPD Schedule</h2>
                <p>Our team is here to provide care throughout the week. Holiday visits are available by prior intimation.</p>
                <div className="hours-actions">
                  <a href="#appointment" className="btn btn-primary">Book an Appointment</a>
                  <a href={`tel:${clinicTel}`} className="btn btn-outline">Call Reception</a>
                </div>
              </div>
              <div className="hours-list" aria-label="Clinic opening hours">
                <div className="hours-row"><div className="hours-day"><span className="day-title">Monday - Saturday</span><small>Morning OPD</small></div><strong className="hours-time">8:00 AM - 1:00 PM</strong></div>
                <div className="hours-row"><div className="hours-day"><span className="day-title">Monday - Saturday</span><small>Evening OPD</small></div><strong className="hours-time">5:00 PM - 10:00 PM</strong></div>
                <div className="hours-row"><div className="hours-day"><span className="day-title">Sunday</span><small>Weekend Morning OPD</small></div><strong className="hours-time">8:00 AM - 1:00 PM</strong></div>
                <div className="hours-row"><div className="hours-day"><span className="day-title">Holidays</span><small>Call {clinicPhone} before visiting</small></div><strong className="hours-note">By prior intimation</strong></div>
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
                  <div className="service-card-top">
                    <ServiceIcon name={service.icon} />
                    <span className={`fee-tag${service.goldTag ? " fee-tag-gold" : ""}`}>{service.fee}</span>
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <div className="service-card-footer">
                    <button type="button" className="service-link" onClick={() => selectDoctor(service.doctorValue)}>
                      <span>{service.cta}</span>
                    </button>
                  </div>
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
                  <div className="doctor-media">
                    <img
                      className={`doctor-photo${doctor.portrait ? " doctor-portrait" : ""}`}
                      src={doctor.photo}
                      alt={`${doctor.name} at the clinic`}
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="doctor-exp-badge">{doctor.expBadge}</span>
                  </div>
                  <div className="doctor-info">
                    <span className="doctor-specialty">{doctor.specialty}</span>
                    <h3>{doctor.name}</h3>
                    <p className="doctor-qual">{doctor.qualification}</p>
                    <div className="doctor-meta">
                      <span>Consultation: <strong>{doctor.fee}</strong></span>
                      <span>{doctor.schedule}</span>
                    </div>
                    <button
                      type="button"
                      className={`btn btn-outline${highlightedDoctor === doctor.value ? " flash" : ""}`}
                      onClick={() => selectDoctor(doctor.value)}
                    >
                      {doctor.bookLabel}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="facilities" className="trust-strip" aria-label="Clinic services">
          <div className="container">
            <div className="trust-header reveal">
              <span className="eyebrow eyebrow-light">Integrated Family Care</span>
              <h2>Complete Outpatient &amp; Diagnostic Support Under One Roof</h2>
            </div>
            <div className="trust-grid">
              <div className="trust-item reveal"><strong>Consulting</strong><span>General &amp; family care across 6 specialized outpatient departments</span></div>
              <div className="trust-item reveal"><strong>Laboratory</strong><span>Testing services with home sample collection &amp; 6-hour reports</span></div>
              <div className="trust-item reveal"><strong>Diagnostics</strong><span>Preventive care including ECG, digital X-ray, and full-body checkups</span></div>
              <div className="trust-item reveal"><strong>Hospitalization</strong><span>Coordinated care and specialist referrals when inpatient support is needed</span></div>
            </div>
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
                <div className="booking-direct-card">
                  <span className="direct-label">Need immediate assistance?</span>
                  <a href={`tel:${clinicTel}`} className="direct-phone">{clinicPhone}</a>
                  <span className="direct-sub">Sector 17, Kopar Khairane · Near Aazad School</span>
                </div>
              </div>

              <div className="booking-form-panel">
                {!requestReady ? (
                  <form className="form-grid" noValidate onSubmit={submitRequest}>
                    <div className="form-panel-header full">
                      <div>
                        <h3>Patient Visit Details</h3>
                        <p className="form-subtitle">Fields marked with * are required. Review your details on the next screen.</p>
                      </div>
                      <span className="selected-fee-pill">{feeMap[form.doctor] || "Select a department"}</span>
                    </div>
                    <div className="form-group">
                      <label htmlFor="patientName">Patient Full Name *</label>
                      <input ref={nameInputRef} type="text" id="patientName" name="patientName" value={form.patientName} onChange={updateField} aria-describedby="patientNameError" aria-invalid={Boolean(errors.patientName)} placeholder="e.g. Rohan Kulkarni" autoComplete="name" required />
                      <small className="field-error" id="patientNameError" aria-live="polite">{errors.patientName}</small>
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Mobile Number *</label>
                      <input type="tel" id="phone" name="phone" value={form.phone} onChange={updateField} aria-describedby="phoneError" aria-invalid={Boolean(errors.phone)} placeholder="e.g. 9876543210" pattern="[6-9][0-9]{9}" inputMode="numeric" autoComplete="tel" maxLength={10} required />
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
                      {eveningIsDisabled && <small className="field-hint">Sunday OPD is available in the Morning slot (8:00 AM - 1:00 PM).</small>}
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
                    <div className="confirmation-header">
                      <span className="benefit-check confirmation-check" aria-hidden="true">&#10003;</span>
                      <div>
                        <span className="confirmation-eyebrow">Request Summary Ready</span>
                        <h3>Appointment request details</h3>
                      </div>
                    </div>
                    <p>
                      Thank you, <strong>{form.patientName.trim()}</strong>. Your request is for <strong>{form.doctor}</strong> on <strong>{formattedDate}</strong> ({form.timeSlot}).<br />
                      Contact number: <strong>+91 {form.phone.trim()}</strong>.<br />
                      {form.notes.trim() && <>Note: {form.notes.trim()}<br /></>}
                      Please call <a href={`tel:${clinicTel}`}>{clinicPhone}</a> to confirm. This form does not send your request to the clinic.
                    </p>
                    <div className="confirmation-actions">
                      <a href={`tel:${clinicTel}`} className="btn btn-primary">Call {clinicPhone} to Confirm</a>
                      <button type="button" className="btn btn-outline" onClick={resetRequest}>Start another request</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="faq-section">
          <div className="container">
            <div className="section-header reveal">
              <span className="eyebrow">Patient guidance</span>
              <h2>Frequently Asked Questions</h2>
              <p>Everything you need to know before visiting Dr. Aghav&apos;s Health Clinic in Kopar Khairane.</p>
            </div>
            <div className="faq-grid">
              {faqs.map((item, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div className="faq-item reveal" key={item.question}>
                    <button
                      type="button"
                      className="faq-question"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                    >
                      <span>{item.question}</span>
                      <span className="faq-icon" aria-hidden="true" />
                    </button>
                    <div className={`faq-answer${isOpen ? " is-open" : ""}`}>
                      <div className="faq-answer-inner">
                        <p>{item.answer}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
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
                <span className="map-badge">Near Aazad School · Sector 17</span>
                <strong>Shop 3 &amp; 4, Plot 36</strong>
                <span>Phase 1, Kopar Khairane, Navi Mumbai - 400709</span>
                <div className="map-overlay-actions">
                  <a className="btn btn-primary" href="https://www.google.com/maps/search/?api=1&query=Shop%203%20%26%204%2C%20Plot%2036%2C%20Phase%201%2C%20Sector%2017%2C%20Kopar%20Khairane%2C%20Navi%20Mumbai%20400709" target="_blank" rel="noopener noreferrer">Open in Google Maps</a>
                  <button type="button" className="btn btn-outline" onClick={copyAddress}>
                    {copiedAddress ? "Address Copied ✓" : "Copy Address"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer id="contact">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <h4>Dr. Aghav&apos;s Health Clinic</h4>
              <p>Compassionate, evidence-based healthcare for individuals and families in Kopar Khairane, Navi Mumbai.</p>
            </div>
            <div>
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#services">Clinical Services</a></li>
                <li><a href="#clinic-hours">Clinic Hours</a></li>
                <li><a href="#doctors">Our Doctors</a></li>
                <li><a href="#location">Clinic Location</a></li>
                <li><a href="#appointment">Book Appointment</a></li>
              </ul>
            </div>
            <div>
              <h4>Departments</h4>
              <ul>
                <li><a href="#services">General Medicine (₹500)</a></li>
                <li><a href="#services">Dental &amp; Implantology (₹400)</a></li>
                <li><a href="#services">Pediatrics (₹600)</a></li>
                <li><a href="#services">Dermatology &amp; Skin (₹600)</a></li>
                <li><a href="#services">Pathology &amp; Diagnostics</a></li>
                <li><a href="#services">Orthopedics &amp; Physio (₹700)</a></li>
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
            <span>&copy; 2026 Dr. Aghav&apos;s Health Clinic. All rights reserved.</span>
            <span className="footer-credit">Designed by Kunal Pol</span>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
