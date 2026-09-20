import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import bgImage from "/src/assets/slider1.jpeg";
import { Link } from "react-router-dom";
import {
  User,
  BookOpen,
  Users,
  Camera,
  ClipboardList,
  FileText,
  CalendarDays,
  Phone,
  Check,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  X,
} from "lucide-react";
import AcademicHero from "../../../component/common/AcademicHero";

// ─── Color tokens ─────────────────────────────────────────────────────────────
// Brand palette shared with the rest of the site:
//   navy  → structure & headings (matches the hero overlay)
//   red   → actions, active states and errors
//   green → reserved for the "submitted" confirmation only
const C = {
  red: "#E63946",
  redDark: "#c1121f",
  navy: "#261481",
  navyDeep: "#0a0850",
  page: "#f3f4f8",
  border: "#e5e7ef",
  body: "#4b5563",
  success: "#2ecc71",
};

const INITIAL_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  gender: "",
  nationality: "",
  previousSchool: "",
  programme: "",
  grade: "",
  parentName: "",
  parentPhone: "",
  parentEmail: "",
  address: "",
  message: "",
};

const PROGRAMMES = [
  "General Science",
  "General Arts",
  "Business",
  "Technical",
  "Visual Arts",
  "Home Economics",
  "Agricultural Science",
];

const STEPS = [
  {
    number: 1,
    label: "Personal Information",
    short: "Personal",
    icon: User,
    description: "Your basic details & passport",
    subtitle: "Tell us about yourself and upload your passport photo.",
  },
  {
    number: 2,
    label: "Academic Details",
    short: "Academic",
    icon: BookOpen,
    description: "Education background",
    subtitle: "Share your academic background and programme choice.",
  },
  {
    number: 3,
    label: "Parent/Guardian",
    short: "Guardian",
    icon: Users,
    description: "Parent/guardian info",
    subtitle: "Provide parent/guardian contact details.",
  },
];

const INFO_CARDS = [
  { icon: FileText, title: "Application Fee", text: "GHS 50 (Non-refundable)" },
  { icon: CalendarDays, title: "Deadline", text: "March 31, 2026" },
  { icon: Phone, title: "Need Help?", text: "Call: +233 24 873 2262" },
];

const CARD_SHADOW = "0 4px 24px rgba(10,8,80,.07)";

// ─── Field ────────────────────────────────────────────────────────────────────
// Lives outside ApplyNow so it isn't re-created on every keystroke (which
// would drop input focus). Focus styling is pure CSS, errors turn it red.
const Field = ({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  as = "input",
  placeholder,
  rows,
  required = true,
  children,
}) => {
  const cls = `w-full px-4 py-3.5 rounded-xl text-[14px] text-gray-800 bg-white outline-none border-2 transition-all duration-200 placeholder:text-gray-400 ${
    error
      ? "border-[#E63946] focus:ring-4 focus:ring-[#E63946]/10"
      : "border-[#e5e7ef] hover:border-[#261481]/30 focus:border-[#261481] focus:ring-4 focus:ring-[#261481]/10"
  } ${as === "select" ? "appearance-none pr-10" : ""}`;

  const props = { id: name, name, value, onChange, className: cls };
  let control;
  if (as === "select") {
    control = (
      <div className="relative">
        <select {...props}>{children}</select>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#261481] text-[10px]"
        >
          ▼
        </span>
      </div>
    );
  } else if (as === "textarea") {
    control = (
      <textarea
        {...props}
        rows={rows}
        placeholder={placeholder}
        className={`${cls} resize-y`}
      />
    );
  } else {
    control = (
      <input {...props} type={type} placeholder={placeholder} />
    );
  }

  return (
    <div>
      <label
        htmlFor={name}
        className="block text-[11px] font-bold uppercase tracking-[1px] mb-2 text-[#261481]"
      >
        {label}
        {required && <span className="text-[#E63946]"> *</span>}
      </label>
      {control}
      {error && <p className="text-[#E63946] text-xs mt-1.5">{error}</p>}
    </div>
  );
};

const PrimaryBtn = ({ children, className = "", ...rest }) => (
  <button
    {...rest}
    className={`flex items-center justify-center gap-2 text-white font-bold text-[14px] px-8 py-3.5 rounded-full transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 ${className}`}
  >
    {children}
  </button>
);

const GhostBtn = ({ children, ...rest }) => (
  <button
    {...rest}
    className="flex items-center justify-center gap-2 text-[#261481] font-bold text-[14px] px-8 py-3.5 rounded-full border-2 border-[#261481]/20 hover:border-[#E63946] hover:text-[#E63946] transition-all duration-300 hover:-translate-y-0.5"
  >
    {children}
  </button>
);

const ApplyNow = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [passportPhoto, setPassportPhoto] = useState(null);
  const [passportPreview, setPassportPreview] = useState(null);
  const [agreed, setAgreed] = useState(false);
  const fileInputRef = useRef(null);

  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  const [errors, setErrors] = useState({});

  const step = STEPS[currentStep - 1];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      alert("Please upload a JPEG or PNG image");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("File size should be less than 5MB");
      return;
    }
    setPassportPhoto(file);
    setErrors((prev) => ({ ...prev, passportPhoto: "" }));
    const reader = new FileReader();
    reader.onloadend = () => setPassportPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    setPassportPhoto(null);
    setPassportPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const validateStep = (s) => {
    const e = {};

    if (s === 1) {
      if (!form.firstName) e.firstName = "First name is required";
      if (!form.lastName) e.lastName = "Last name is required";
      if (!form.email) e.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Email is invalid";
      if (!form.phone) e.phone = "Phone number is required";
      if (!form.dateOfBirth) e.dateOfBirth = "Date of birth is required";
      if (!form.gender) e.gender = "Gender is required";
      if (!form.nationality) e.nationality = "Nationality is required";
      if (!passportPhoto) e.passportPhoto = "Passport photo is required";
    }

    if (s === 2) {
      if (!form.previousSchool) e.previousSchool = "Previous school is required";
      if (!form.programme) e.programme = "Programme selection is required";
      if (!form.grade) e.grade = "Grade selection is required";
    }

    if (s === 3) {
      if (!form.parentName) e.parentName = "Parent/Guardian name is required";
      if (!form.parentPhone) e.parentPhone = "Parent phone is required";
      if (!form.parentEmail) e.parentEmail = "Parent email is required";
      else if (!/\S+@\S+\.\S+/.test(form.parentEmail))
        e.parentEmail = "Email is invalid";
      if (!form.address) e.address = "Home address is required";
      if (!agreed) e.terms = "Please confirm before continuing";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
      scrollTop();
    }
  };

  const handlePrevStep = () => {
    setErrors({});
    setCurrentStep(currentStep - 1);
    scrollTop();
  };

  const validateAll = () => {
    // Run every step so the first failing one is reported, not just the last.
    const results = [1, 2, 3].map((s) => ({ s, ok: validateStep(s) }));
    const firstBad = results.find((r) => !r.ok);
    if (firstBad) {
      setCurrentStep(firstBad.s);
      validateStep(firstBad.s);
      return false;
    }
    return true;
  };

  const handlePreview = () => {
    if (validateAll()) {
      setShowPreview(true);
      scrollTop();
    }
  };

  const handleEdit = (s) => {
    setShowPreview(false);
    setCurrentStep(s);
    scrollTop();
  };

  const handleSubmit = (e) => {
    e?.preventDefault?.();
    if (!validateAll()) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setShowPreview(false);
    }, 1800);
    setTimeout(() => {
      setSent(false);
      setForm(INITIAL_FORM);
      setPassportPhoto(null);
      setPassportPreview(null);
      setAgreed(false);
      setCurrentStep(1);
    }, 5000);
  };

  // ─── Application Preview ──────────────────────────────────────────────────
  const previewSections = [
    {
      title: "Personal Information",
      step: 1,
      rows: [
        ["Full Name", `${form.firstName} ${form.lastName}`],
        ["Email", form.email],
        ["Phone", form.phone],
        ["Date of Birth", form.dateOfBirth],
        ["Gender", form.gender],
        ["Nationality", form.nationality],
      ],
    },
    {
      title: "Academic Details",
      step: 2,
      rows: [
        ["Previous School", form.previousSchool],
        ["Programme", form.programme],
        ["Grade", form.grade],
        ...(form.message ? [["Message", form.message]] : []),
      ],
    },
    {
      title: "Parent / Guardian",
      step: 3,
      rows: [
        ["Name", form.parentName],
        ["Phone", form.parentPhone],
        ["Email", form.parentEmail],
        ["Address", form.address],
      ],
    },
  ];

  const renderPreview = () => (
    <div className="rounded-2xl border border-[#e5e7ef] overflow-hidden">
      <div
        className="px-6 py-4 flex items-center gap-2 text-white"
        style={{ background: C.navy }}
      >
        <ClipboardList size={18} />
        <h3 className="font-heading font-bold text-base">
          Review Your Application
        </h3>
      </div>

      <div className="p-6 space-y-6">
        {passportPreview && (
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#261481]/15">
              <img
                src={passportPreview}
                alt="Passport"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {previewSections.map((section) => (
          <div key={section.title}>
            <div className="flex items-center justify-between border-b border-[#e5e7ef] pb-2 mb-3">
              <h4 className="text-[13px] font-bold uppercase tracking-[1px] text-[#261481]">
                {section.title}
              </h4>
              <button
                type="button"
                onClick={() => handleEdit(section.step)}
                className="text-xs font-semibold text-[#E63946] hover:text-[#c1121f] underline underline-offset-2 transition-colors"
              >
                Edit
              </button>
            </div>
            <dl className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-x-4 gap-y-1.5 text-sm">
              {section.rows.map(([k, v]) => (
                <React.Fragment key={k}>
                  <dt className="text-gray-500">{k}</dt>
                  <dd className="text-gray-800 font-medium break-words">
                    {v}
                  </dd>
                </React.Fragment>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <AcademicHero
        image={bgImage}
        title="Apply Now"
        subtitle="Complete the application form below to begin your journey at AMESCO."
      />

      {/* ══ APPLICATION FORM ────────────────────────────────────────────── */}
      <section className="py-10 lg:py-14" style={{ background: C.page }}>
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            {/* ─── Left Sidebar: Steps ────────────────────────────────── */}
            <div className="lg:col-span-3">
              <div className="lg:sticky lg:top-24 space-y-4">
                <div
                  className="rounded-2xl p-5 lg:p-6 text-white"
                  style={{
                    background: `linear-gradient(160deg, ${C.navy} 0%, ${C.navyDeep} 100%)`,
                    boxShadow: CARD_SHADOW,
                  }}
                >
                  <h3 className="font-heading text-lg font-bold mb-1">
                    Application Steps
                  </h3>
                  <div className="w-10 h-0.5 rounded-full bg-[#E63946] mb-4" />

                  <div className="grid grid-cols-3 lg:grid-cols-1 gap-2 lg:gap-3">
                    {STEPS.map((s) => {
                      const isActive = currentStep === s.number;
                      const isCompleted = currentStep > s.number;
                      const Icon = s.icon;

                      return (
                        <motion.button
                          type="button"
                          key={s.number}
                          whileHover={{ x: 3 }}
                          disabled={showPreview || sent}
                          onClick={() => setCurrentStep(s.number)}
                          className={`flex flex-col lg:flex-row items-center lg:items-start gap-2 lg:gap-3 p-3 rounded-xl text-center lg:text-left transition-colors duration-300 border ${
                            isActive
                              ? "bg-white border-white"
                              : "bg-white/5 border-white/10 hover:bg-white/10"
                          }`}
                        >
                          <motion.span
                            animate={{ scale: isActive ? 1.1 : 1 }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 16,
                            }}
                            className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-bold ${
                              isActive
                                ? "bg-[#E63946] text-white"
                                : isCompleted
                                  ? "bg-white text-[#261481]"
                                  : "bg-white/10 text-white/70"
                            }`}
                          >
                            {isCompleted ? (
                              <Check size={16} strokeWidth={3} />
                            ) : (
                              <Icon size={16} />
                            )}
                          </motion.span>
                          <span className="min-w-0">
                            <span
                              className={`block font-semibold text-xs lg:text-sm ${
                                isActive ? "text-[#261481]" : "text-white"
                              }`}
                            >
                              <span className="lg:hidden">{s.short}</span>
                              <span className="hidden lg:inline">
                                {s.label}
                              </span>
                            </span>
                            <span
                              className={`hidden lg:block text-xs mt-0.5 ${
                                isActive ? "text-gray-500" : "text-white/60"
                              }`}
                            >
                              {s.description}
                            </span>
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-5 pt-4 border-t border-white/10">
                    <div className="flex justify-between text-xs text-white/70 mb-1.5">
                      <span>Progress</span>
                      <span>{Math.round((currentStep / 3) * 100)}%</span>
                    </div>
                    <div className="w-full h-2 bg-white/15 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: C.red }}
                        animate={{ width: `${(currentStep / 3) * 100}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </div>

                <div
                  className="hidden lg:flex items-center gap-3 bg-white rounded-2xl p-4 text-xs text-gray-500"
                  style={{ boxShadow: CARD_SHADOW }}
                >
                  <span className="w-9 h-9 rounded-full bg-[#E63946]/10 flex items-center justify-center shrink-0">
                    <Phone size={16} className="text-[#E63946]" />
                  </span>
                  <span>
                    Need help? Call{" "}
                    <strong className="text-[#261481]">+233 24 873 2262</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* ─── Right Side: Form ────────────────────────────────────── */}
            <div className="lg:col-span-9 min-w-0">
              <AnimatePresence>
                {sent && (
                  <motion.div
                    initial={{ opacity: 0, y: -12, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -12, height: 0 }}
                    transition={{ duration: 0.35 }}
                    className="rounded-xl px-5 py-4 mb-6 flex items-center gap-3 border"
                    style={{
                      background: "rgba(46,204,113,.1)",
                      borderColor: "rgba(46,204,113,.35)",
                    }}
                  >
                    <CheckCircle2 size={26} style={{ color: C.success }} />
                    <div>
                      <p className="text-[14px] font-semibold text-[#261481]">
                        Application submitted successfully!
                      </p>
                      <p className="text-gray-600 text-sm">
                        We'll contact you within 24 hours at {form.email}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ─── Form Container ─────────────────────────────────── */}
              <div
                className="rounded-3xl bg-white overflow-hidden"
                style={{
                  boxShadow: "0 20px 60px rgba(10,8,80,.08)",
                  border: `1px solid ${C.border}`,
                }}
              >
                <div className="h-1.5 bg-[#E63946]" />

                <div className="p-5 sm:p-8">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[11px] font-bold text-[#E63946] tracking-[2px] uppercase whitespace-nowrap">
                      {showPreview ? "Final review" : `Step ${currentStep} of 3`}
                    </span>
                    <div className="h-px flex-1 bg-[#E63946]/25" />
                  </div>

                  <h2 className="font-heading text-[#261481] text-2xl sm:text-[26px] font-bold mb-1">
                    {showPreview ? "Review & Submit" : step.label}
                  </h2>
                  <p className="text-[13px] mb-6 text-gray-500">
                    {showPreview
                      ? "Check your details below, then submit your application."
                      : step.subtitle}
                  </p>

                  <form onSubmit={handleSubmit} noValidate>
                    {!showPreview && (
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentStep}
                          initial={{ opacity: 0, x: 24 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -24 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                          {/* ─── Step 1: Personal Information ───────────── */}
                          {currentStep === 1 && (
                            <div className="space-y-5">
                              <div
                                className={`rounded-xl p-4 border-2 border-dashed transition-colors ${
                                  errors.passportPhoto
                                    ? "border-[#E63946]"
                                    : "border-[#261481]/25 hover:border-[#E63946]"
                                }`}
                              >
                                <label className="block text-[11px] font-bold uppercase tracking-[1px] mb-3 text-[#261481]">
                                  Passport Photo
                                  <span className="text-[#E63946]"> *</span>
                                </label>

                                <div className="mb-4 p-3 rounded-lg bg-[#261481]/5 border border-[#261481]/10 flex items-start gap-3">
                                  <Camera
                                    size={18}
                                    className="text-[#261481] mt-0.5 shrink-0"
                                  />
                                  <div>
                                    <p className="text-xs font-semibold text-[#261481]">
                                      Passport photo requirements
                                    </p>
                                    <ul className="text-xs text-gray-600 space-y-0.5 mt-1 list-disc pl-4">
                                      <li>
                                        <strong>White background</strong> only
                                      </li>
                                      <li>JPEG or PNG format, max 5MB</li>
                                      <li>
                                        Clear, recent photo with a neutral
                                        expression
                                      </li>
                                      <li>
                                        No hats, sunglasses, or other
                                        accessories
                                      </li>
                                    </ul>
                                  </div>
                                </div>

                                <div className="flex flex-col sm:flex-row items-center gap-4">
                                  <div className="flex-1 w-full min-w-0">
                                    <input
                                      ref={fileInputRef}
                                      type="file"
                                      accept=".jpg,.jpeg,.png"
                                      onChange={handlePhotoChange}
                                      className="w-full text-gray-600 text-sm cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#E63946] file:text-white hover:file:bg-[#c1121f]"
                                    />
                                    {errors.passportPhoto && (
                                      <p className="text-[#E63946] text-xs mt-1.5">
                                        {errors.passportPhoto}
                                      </p>
                                    )}
                                  </div>

                                  {passportPreview && (
                                    <div className="flex flex-col items-center">
                                      <div className="relative w-20 h-20">
                                        <img
                                          src={passportPreview}
                                          alt="Passport preview"
                                          className="w-full h-full rounded-full object-cover border-2 border-[#261481]/20"
                                        />
                                        <button
                                          type="button"
                                          onClick={removePhoto}
                                          aria-label="Remove photo"
                                          className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#E63946] text-white flex items-center justify-center hover:bg-[#c1121f] transition-colors"
                                        >
                                          <X size={12} strokeWidth={3} />
                                        </button>
                                      </div>
                                      <span className="text-[10px] text-gray-400 mt-1">
                                        Preview
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Field
                                  label="First Name"
                                  name="firstName"
                                  value={form.firstName}
                                  onChange={handleChange}
                                  error={errors.firstName}
                                  placeholder="John"
                                />
                                <Field
                                  label="Last Name"
                                  name="lastName"
                                  value={form.lastName}
                                  onChange={handleChange}
                                  error={errors.lastName}
                                  placeholder="Doe"
                                />
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Field
                                  label="Email Address"
                                  name="email"
                                  type="email"
                                  value={form.email}
                                  onChange={handleChange}
                                  error={errors.email}
                                  placeholder="john@example.com"
                                />
                                <Field
                                  label="Phone Number"
                                  name="phone"
                                  type="tel"
                                  value={form.phone}
                                  onChange={handleChange}
                                  error={errors.phone}
                                  placeholder="+233 00 000 0000"
                                />
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Field
                                  label="Date of Birth"
                                  name="dateOfBirth"
                                  type="date"
                                  value={form.dateOfBirth}
                                  onChange={handleChange}
                                  error={errors.dateOfBirth}
                                />
                                <Field
                                  label="Gender"
                                  name="gender"
                                  as="select"
                                  value={form.gender}
                                  onChange={handleChange}
                                  error={errors.gender}
                                >
                                  <option value="">Select gender</option>
                                  <option>Male</option>
                                  <option>Female</option>
                                  <option>Other</option>
                                </Field>
                              </div>

                              <Field
                                label="Nationality"
                                name="nationality"
                                value={form.nationality}
                                onChange={handleChange}
                                error={errors.nationality}
                                placeholder="Ghanaian"
                              />
                            </div>
                          )}

                          {/* ─── Step 2: Academic Details ───────────────── */}
                          {currentStep === 2 && (
                            <div className="space-y-5">
                              <Field
                                label="Previous School"
                                name="previousSchool"
                                value={form.previousSchool}
                                onChange={handleChange}
                                error={errors.previousSchool}
                                placeholder="Name of your previous school"
                              />

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Field
                                  label="Programme of Interest"
                                  name="programme"
                                  as="select"
                                  value={form.programme}
                                  onChange={handleChange}
                                  error={errors.programme}
                                >
                                  <option value="">Select a programme</option>
                                  {PROGRAMMES.map((p) => (
                                    <option key={p}>{p}</option>
                                  ))}
                                </Field>
                                <Field
                                  label="Grade/Class"
                                  name="grade"
                                  as="select"
                                  value={form.grade}
                                  onChange={handleChange}
                                  error={errors.grade}
                                >
                                  <option value="">Select grade</option>
                                  <option>SHS 1</option>
                                  <option>SHS 2</option>
                                  <option>SHS 3</option>
                                </Field>
                              </div>

                              <Field
                                label="Additional Message"
                                name="message"
                                as="textarea"
                                rows={4}
                                required={false}
                                value={form.message}
                                onChange={handleChange}
                                placeholder="Any additional information you'd like to share..."
                              />
                            </div>
                          )}

                          {/* ─── Step 3: Parent/Guardian ────────────────── */}
                          {currentStep === 3 && (
                            <div className="space-y-5">
                              <Field
                                label="Parent/Guardian Name"
                                name="parentName"
                                value={form.parentName}
                                onChange={handleChange}
                                error={errors.parentName}
                                placeholder="Full name of parent/guardian"
                              />

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Field
                                  label="Parent Phone"
                                  name="parentPhone"
                                  type="tel"
                                  value={form.parentPhone}
                                  onChange={handleChange}
                                  error={errors.parentPhone}
                                  placeholder="+233 00 000 0000"
                                />
                                <Field
                                  label="Parent Email"
                                  name="parentEmail"
                                  type="email"
                                  value={form.parentEmail}
                                  onChange={handleChange}
                                  error={errors.parentEmail}
                                  placeholder="parent@example.com"
                                />
                              </div>

                              <Field
                                label="Home Address"
                                name="address"
                                as="textarea"
                                rows={3}
                                value={form.address}
                                onChange={handleChange}
                                error={errors.address}
                                placeholder="Enter your home address"
                              />

                              <div>
                                <div
                                  className={`flex items-start gap-3 p-4 rounded-xl border ${
                                    errors.terms
                                      ? "border-[#E63946] bg-[#E63946]/5"
                                      : "border-[#e5e7ef] bg-[#f3f4f8]"
                                  }`}
                                >
                                  <input
                                    type="checkbox"
                                    id="terms"
                                    checked={agreed}
                                    onChange={(e) => {
                                      setAgreed(e.target.checked);
                                      if (e.target.checked)
                                        setErrors((p) => ({ ...p, terms: "" }));
                                    }}
                                    className="mt-1 w-4 h-4 accent-[#E63946] cursor-pointer shrink-0"
                                  />
                                  <label
                                    htmlFor="terms"
                                    className="text-sm text-gray-600 leading-relaxed"
                                  >
                                    I confirm that all information provided is
                                    accurate and complete. I agree to the
                                    <Link
                                      to="/terms"
                                      className="text-[#E63946] font-semibold hover:underline mx-1"
                                    >
                                      Terms & Conditions
                                    </Link>
                                    and
                                    <Link
                                      to="/privacy"
                                      className="text-[#E63946] font-semibold hover:underline mx-1"
                                    >
                                      Privacy Policy
                                    </Link>
                                    of AMESCO.
                                  </label>
                                </div>
                                {errors.terms && (
                                  <p className="text-[#E63946] text-xs mt-1.5">
                                    {errors.terms}
                                  </p>
                                )}
                              </div>
                            </div>
                          )}
                        </motion.div>
                      </AnimatePresence>
                    )}

                    {/* ─── Navigation Buttons ──────────────────────────── */}
                    {!showPreview && !sent && (
                      <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 mt-8">
                        {currentStep > 1 && (
                          <GhostBtn type="button" onClick={handlePrevStep}>
                            <ArrowLeft size={16} /> Previous
                          </GhostBtn>
                        )}

                        <div className="hidden sm:block flex-1" />

                        {currentStep < 3 ? (
                          <PrimaryBtn
                            type="button"
                            onClick={handleNextStep}
                            className="hover:shadow-xl"
                            style={{
                              background: C.red,
                              boxShadow: "0 8px 25px rgba(230,57,70,.35)",
                            }}
                          >
                            Next Step <ArrowRight size={16} />
                          </PrimaryBtn>
                        ) : (
                          <PrimaryBtn
                            type="button"
                            onClick={handlePreview}
                            className="hover:shadow-xl"
                            style={{
                              background: C.navy,
                              boxShadow: "0 8px 25px rgba(38,20,129,.35)",
                            }}
                          >
                            <ClipboardList size={16} /> Review Application
                          </PrimaryBtn>
                        )}
                      </div>
                    )}
                  </form>

                  {/* ─── Preview Mode ──────────────────────────────────── */}
                  <AnimatePresence>
                    {showPreview && !sent && (
                      <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -16 }}
                        transition={{ duration: 0.3 }}
                      >
                        {renderPreview()}

                        <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 mt-6">
                          <GhostBtn
                            type="button"
                            onClick={() => setShowPreview(false)}
                          >
                            <ArrowLeft size={16} /> Back to Edit
                          </GhostBtn>

                          <div className="hidden sm:block flex-1" />

                          <PrimaryBtn
                            type="button"
                            onClick={handleSubmit}
                            disabled={sending}
                            className="px-10 hover:shadow-xl"
                            style={{
                              background: C.red,
                              boxShadow: "0 8px 25px rgba(230,57,70,.35)",
                            }}
                          >
                            {sending ? (
                              <>
                                <span className="animate-pulse">●</span>
                                Submitting...
                              </>
                            ) : (
                              <>
                                Submit Application <Check size={16} />
                              </>
                            )}
                          </PrimaryBtn>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* ─── Additional Info Cards ────────────────────────────── */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                {INFO_CARDS.map(({ icon: Icon, title, text }) => (
                  <div
                    key={title}
                    className="bg-white rounded-2xl p-4 text-center border border-[#e5e7ef]"
                    style={{ boxShadow: CARD_SHADOW }}
                  >
                    <div className="w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-2 bg-[#E63946]/10">
                      <Icon size={18} className="text-[#E63946]" />
                    </div>
                    <h4 className="font-bold text-[13px] text-[#261481]">
                      {title}
                    </h4>
                    <p className="text-[12px]" style={{ color: C.body }}>
                      {text}
                    </p>
                  </div>
                ))}
              </div>

              <div className="text-center mt-6">
                <Link
                  to="/admissions/howtoApply/howtoApply"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#261481] hover:text-[#E63946] transition-colors duration-200"
                >
                  <ArrowLeft size={15} /> Back to How to Apply
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ApplyNow;
