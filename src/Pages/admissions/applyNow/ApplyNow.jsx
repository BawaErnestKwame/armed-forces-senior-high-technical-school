import React, { useState, useRef } from "react";
import bgImage from "/src/assets/slider1.jpeg";
import { Link } from "react-router-dom";

// ─── Color tokens ─────────────────────────────────────────────────────────────
const C = {
  accentRed: "#E63946",
  accentRedDark: "#c1121f",
  royalBlue: "#0e07dd",
  royalBlueDark: "#261481",
  royalBlueLight: "#5a7ae8",
  white: "#FFFFFF",
  lightGray: "#f8f9fa",
  mediumGray: "#e9ecef",
  darkGray: "#343a40",
  navy: "#261481",
  bodyText: "#4b5563",
  success: "#2ed573",
};

const ApplyNow = () => {
  const [form, setForm] = useState({
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
  });

  const [passportPhoto, setPassportPhoto] = useState(null);
  const [passportPreview, setPassportPreview] = useState(null);
  const fileInputRef = useRef(null);

  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
        alert("Please upload a JPEG or PNG image");
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB");
        return;
      }
      setPassportPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPassportPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setPassportPhoto(null);
    setPassportPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!form.firstName) newErrors.firstName = "First name is required";
      if (!form.lastName) newErrors.lastName = "Last name is required";
      if (!form.email) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(form.email))
        newErrors.email = "Email is invalid";
      if (!form.phone) newErrors.phone = "Phone number is required";
      if (!form.dateOfBirth)
        newErrors.dateOfBirth = "Date of birth is required";
      if (!form.gender) newErrors.gender = "Gender is required";
      if (!form.nationality) newErrors.nationality = "Nationality is required";
      if (!passportPhoto)
        newErrors.passportPhoto = "Passport photo is required";
    }

    if (step === 2) {
      if (!form.previousSchool)
        newErrors.previousSchool = "Previous school is required";
      if (!form.programme)
        newErrors.programme = "Programme selection is required";
      if (!form.grade) newErrors.grade = "Grade selection is required";
    }

    if (step === 3) {
      if (!form.parentName)
        newErrors.parentName = "Parent/Guardian name is required";
      if (!form.parentPhone) newErrors.parentPhone = "Parent phone is required";
      if (!form.parentEmail) newErrors.parentEmail = "Parent email is required";
      else if (!/\S+@\S+\.\S+/.test(form.parentEmail))
        newErrors.parentEmail = "Email is invalid";
      if (!form.address) newErrors.address = "Home address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePreview = () => {
    if (validateStep(1) && validateStep(2) && validateStep(3)) {
      setShowPreview(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleEdit = (step) => {
    setShowPreview(false);
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(1) && validateStep(2) && validateStep(3)) {
      setSending(true);
      setTimeout(() => {
        setSending(false);
        setSent(true);
        setShowPreview(false);
      }, 1800);
      setTimeout(() => {
        setSent(false);
        setForm({
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
        });
        setPassportPhoto(null);
        setPassportPreview(null);
        setCurrentStep(1);
      }, 5000);
    }
  };

  const fieldStyle = (name) => ({
    borderColor: errors[name]
      ? C.accentRed
      : focused === name
        ? C.accentRed
        : C.mediumGray,
    boxShadow: focused === name ? "0 0 0 3px rgba(230,57,70,0.1)" : "none",
    background: C.white,
    color: C.darkGray,
    fontFamily: "inherit",
    transition: "all 0.3s ease",
  });

  const inputCls = `
    w-full px-4 py-3.5 rounded-xl text-[14px] outline-none
    border-2 transition-all duration-300
    placeholder:text-gray-400
    text-gray-800
  `;

  const programmes = [
    "General Science",
    "General Arts",
    "Business",
    "Technical",
    "Visual Arts",
    "Home Economics",
    "Agricultural Science",
  ];

  // ─── Steps data for sidebar ──────────────────────────────────────────────
  const steps = [
    {
      number: 1,
      label: "Personal Information",
      icon: "👤",
      description: "Your basic details & passport",
    },
    {
      number: 2,
      label: "Academic Details",
      icon: "📚",
      description: "Education background",
    },
    {
      number: 3,
      label: "Parent/Guardian",
      icon: "👨‍👩‍👦",
      description: "Parent/guardian info",
    },
  ];

  // ─── Application Preview ──────────────────────────────────────────────────
  const ApplicationPreview = () => (
    <div className="bg-gray-50 rounded-2xl p-6 space-y-4 border border-gray-200">
      <h3 className="text-gray-800 font-bold text-lg flex items-center gap-2">
        <span>📋</span> Review Your Application
      </h3>

      {passportPreview && (
        <div className="flex justify-center">
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-[#E63946]/20">
            <img
              src={passportPreview}
              alt="Passport"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-2 text-sm">
        <p className="text-gray-500">Full Name:</p>
        <p className="text-gray-800 font-medium">
          {form.firstName} {form.lastName}
        </p>

        <p className="text-gray-500">Email:</p>
        <p className="text-gray-800 font-medium">{form.email}</p>

        <p className="text-gray-500">Phone:</p>
        <p className="text-gray-800 font-medium">{form.phone}</p>

        <p className="text-gray-500">Date of Birth:</p>
        <p className="text-gray-800 font-medium">{form.dateOfBirth}</p>

        <p className="text-gray-500">Gender:</p>
        <p className="text-gray-800 font-medium">{form.gender}</p>

        <p className="text-gray-500">Nationality:</p>
        <p className="text-gray-800 font-medium">{form.nationality}</p>

        <p className="text-gray-500">Previous School:</p>
        <p className="text-gray-800 font-medium">{form.previousSchool}</p>

        <p className="text-gray-500">Programme:</p>
        <p className="text-gray-800 font-medium">{form.programme}</p>

        <p className="text-gray-500">Grade:</p>
        <p className="text-gray-800 font-medium">{form.grade}</p>

        <p className="text-gray-500">Parent/Guardian:</p>
        <p className="text-gray-800 font-medium">{form.parentName}</p>

        <p className="text-gray-500">Parent Phone:</p>
        <p className="text-gray-800 font-medium">{form.parentPhone}</p>

        <p className="text-gray-500">Parent Email:</p>
        <p className="text-gray-800 font-medium">{form.parentEmail}</p>

        <p className="text-gray-500">Address:</p>
        <p className="text-gray-800 font-medium text-xs">{form.address}</p>
      </div>

      {form.message && (
        <div>
          <p className="text-gray-500 text-sm">Message:</p>
          <p className="text-gray-800 text-sm mt-1">{form.message}</p>
        </div>
      )}

      <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-200">
        <button
          onClick={() => handleEdit(1)}
          className="text-xs text-[#E63946] hover:text-[#c1121f] transition-colors underline"
        >
          Edit Personal Info
        </button>
        <button
          onClick={() => handleEdit(2)}
          className="text-xs text-[#E63946] hover:text-[#c1121f] transition-colors underline"
        >
          Edit Academic Details
        </button>
        <button
          onClick={() => handleEdit(3)}
          className="text-xs text-[#E63946] hover:text-[#c1121f] transition-colors underline"
        >
          Edit Parent Info
        </button>
      </div>
    </div>
  );

  return (
    <div>
      {/* ══ HERO BANNER ──────────────────────────────────────────────────── */}
      <div
        className="relative w-full flex items-center justify-center overflow-hidden"
        style={{ minHeight: 280 }}
      >
        <img
          src={bgImage}
          alt="AMESCO Campus"
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0"
          style={{ background: "rgba(10,8,80,.68)" }}
        />
        <div className="relative z-10 text-center px-6 py-12">
          <h1
            className="font-['Playfair_Display'] font-black text-white mb-3"
            style={{ fontSize: "clamp(32px, 5vw, 52px)" }}
          >
            Apply Now
          </h1>
          <div className="w-16 h-0.5 mx-auto rounded-2xl bg-white mb-3" />
          <p className="text-white text-[14px] max-w-[550px] mx-auto">
            Complete the application form below to begin your journey at AMESCO.
          </p>
        </div>
      </div>

      {/* ══ APPLICATION FORM ────────────────────────────────────────────── */}
      <section className="py-12" style={{ background: C.lightGray }}>
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* ─── Left Sidebar: Steps ────────────────────────────────── */}
            <div className="lg:col-span-3">
              <div className="sticky top-24">
                <div
                  className="bg-white rounded-2xl p-6"
                  style={{ boxShadow: "0 4px 24px rgba(0,0,0,.07)" }}
                >
                  <h3
                    className="font-['Playfair_Display'] text-lg font-bold mb-4"
                    style={{ color: C.navy }}
                  >
                    Application Steps
                  </h3>

                  <div className="space-y-3">
                    {steps.map((step) => {
                      const isActive = currentStep === step.number;
                      const isCompleted = currentStep > step.number;

                      return (
                        <div
                          key={step.number}
                          className={`flex items-start gap-3 p-3 rounded-xl transition-all duration-300 cursor-pointer
                            ${
                              isActive
                                ? "bg-[#E63946]/10 border-2 border-[#E63946]"
                                : isCompleted
                                  ? "bg-green-50 border-2 border-green-200"
                                  : "bg-gray-50 border-2 border-transparent hover:border-gray-200"
                            }`}
                          onClick={() =>
                            !showPreview && setCurrentStep(step.number)
                          }
                        >
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0
                            ${
                              isActive
                                ? "bg-[#E63946] text-white"
                                : isCompleted
                                  ? "bg-green-500 text-white"
                                  : "bg-gray-200 text-gray-500"
                            }`}
                          >
                            {isCompleted ? "✓" : step.number}
                          </div>
                          <div>
                            <p
                              className={`font-semibold text-sm ${isActive ? "text-[#E63946]" : isCompleted ? "text-green-600" : "text-gray-600"}`}
                            >
                              {step.label}
                            </p>
                            <p className="text-xs text-gray-400">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Progress</span>
                      <span>{Math.round((currentStep / 3) * 100)}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${(currentStep / 3) * 100}%`,
                          background: `linear-gradient(90deg, ${C.accentRed}, ${C.royalBlue})`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div
                  className="bg-white rounded-2xl p-4 mt-4"
                  style={{ boxShadow: "0 4px 24px rgba(0,0,0,.07)" }}
                >
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>📞</span>
                    <span>
                      Need help? Call{" "}
                      <strong className="text-[#E63946]">
                        +233 24 873 2262
                      </strong>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ─── Right Side: Form ────────────────────────────────────── */}
            <div className="lg:col-span-9">
              {sent && (
                <div
                  className="rounded-xl px-5 py-4 mb-6 flex items-center gap-3"
                  style={{
                    background: "rgba(46, 213, 115, 0.1)",
                    border: "1px solid rgba(46, 213, 115, 0.3)",
                  }}
                >
                  <span style={{ color: C.success, fontSize: 24 }}>✓</span>
                  <div>
                    <p className="text-[14px] font-semibold text-gray-800">
                      Application submitted successfully!
                    </p>
                    <p className="text-gray-600 text-sm">
                      We'll contact you within 24 hours at {form.email}
                    </p>
                  </div>
                </div>
              )}

              {/* ─── Form Container ─── White Background ────────────── */}
              <div
                className="rounded-3xl p-8 relative overflow-hidden"
                style={{
                  background: C.white,
                  boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
                  border: "1px solid #e9ecef",
                }}
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[11px] font-bold text-[#E63946] tracking-[2px] uppercase">
                      Step {currentStep} of 3
                    </span>
                    <div className="h-px flex-1 bg-[#E63946]/30" />
                  </div>

                  <h2 className="font-['Playfair_Display'] text-[#261481] text-[26px] font-black mb-1">
                    {currentStep === 1 && "Personal Information"}
                    {currentStep === 2 && "Academic Details"}
                    {currentStep === 3 && "Parent/Guardian Information"}
                  </h2>
                  <p className="text-[13px] mb-6 text-gray-500">
                    {currentStep === 1 &&
                      "Tell us about yourself and upload your passport photo."}
                    {currentStep === 2 &&
                      "Share your academic background and programme choice."}
                    {currentStep === 3 &&
                      "Provide parent/guardian contact details."}
                  </p>

                  <form onSubmit={handleSubmit}>
                    {/* ─── Step 1: Personal Information ───────────────── */}
                    {currentStep === 1 && (
                      <div className="space-y-4">
                        {/* Passport Photo Upload with White Background Requirement */}
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-[#E63946] transition-all">
                          <label className="block text-[11px] font-bold uppercase tracking-[1px] mb-2 text-gray-600">
                            Passport Photo *
                          </label>

                          {/* ═══ PHOTO REQUIREMENTS ═══ */}
                          <div className="mb-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                            <div className="flex items-start gap-2">
                              <span className="text-blue-500 text-sm mt-0.5">
                                📸
                              </span>
                              <div>
                                <p className="text-xs font-semibold text-blue-700">
                                  Passport Photo Requirements:
                                </p>
                                <ul className="text-xs text-blue-600 space-y-0.5 mt-1">
                                  <li className="flex items-center gap-1.5">
                                    <span>•</span>
                                    <span>
                                      <strong>White background</strong> only
                                    </span>
                                  </li>
                                  <li className="flex items-center gap-1.5">
                                    <span>•</span>
                                    <span>JPEG or PNG format</span>
                                  </li>
                                  <li className="flex items-center gap-1.5">
                                    <span>•</span>
                                    <span>Maximum file size: 5MB</span>
                                  </li>
                                  <li className="flex items-center gap-1.5">
                                    <span>•</span>
                                    <span>
                                      Clear, recent photo with neutral
                                      expression
                                    </span>
                                  </li>
                                  <li className="flex items-center gap-1.5">
                                    <span>•</span>
                                    <span>
                                      No hats, sunglasses, or other accessories
                                    </span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row items-center gap-4">
                            <div className="flex-1 w-full">
                              <input
                                ref={fileInputRef}
                                type="file"
                                accept=".jpg,.jpeg,.png"
                                onChange={handlePhotoChange}
                                className="w-full text-gray-600 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#E63946] file:text-white hover:file:bg-[#c1121f] cursor-pointer"
                              />
                              <p className="text-gray-400 text-xs mt-1">
                                Upload a photo with a white background
                              </p>
                              {errors.passportPhoto && (
                                <p className="text-[#E63946] text-xs mt-1">
                                  {errors.passportPhoto}
                                </p>
                              )}
                            </div>

                            {passportPreview && (
                              <div className="flex flex-col items-center">
                                <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-gray-300">
                                  <img
                                    src={passportPreview}
                                    alt="Passport"
                                    className="w-full h-full object-cover"
                                  />
                                  <button
                                    type="button"
                                    onClick={removePhoto}
                                    className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center hover:bg-red-600 transition-colors"
                                  >
                                    ✕
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
                          <div>
                            <label className="block text-[11px] font-bold uppercase tracking-[1px] mb-2 text-gray-600">
                              First Name *
                            </label>
                            <input
                              name="firstName"
                              type="text"
                              required
                              value={form.firstName}
                              onChange={handleChange}
                              onFocus={() => setFocused("firstName")}
                              onBlur={() => setFocused("")}
                              placeholder="John"
                              className={inputCls}
                              style={fieldStyle("firstName")}
                            />
                            {errors.firstName && (
                              <p className="text-[#E63946] text-xs mt-1">
                                {errors.firstName}
                              </p>
                            )}
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold uppercase tracking-[1px] mb-2 text-gray-600">
                              Last Name *
                            </label>
                            <input
                              name="lastName"
                              type="text"
                              required
                              value={form.lastName}
                              onChange={handleChange}
                              onFocus={() => setFocused("lastName")}
                              onBlur={() => setFocused("")}
                              placeholder="Doe"
                              className={inputCls}
                              style={fieldStyle("lastName")}
                            />
                            {errors.lastName && (
                              <p className="text-[#E63946] text-xs mt-1">
                                {errors.lastName}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[11px] font-bold uppercase tracking-[1px] mb-2 text-gray-600">
                              Email Address *
                            </label>
                            <input
                              name="email"
                              type="email"
                              required
                              value={form.email}
                              onChange={handleChange}
                              onFocus={() => setFocused("email")}
                              onBlur={() => setFocused("")}
                              placeholder="john@example.com"
                              className={inputCls}
                              style={fieldStyle("email")}
                            />
                            {errors.email && (
                              <p className="text-[#E63946] text-xs mt-1">
                                {errors.email}
                              </p>
                            )}
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold uppercase tracking-[1px] mb-2 text-gray-600">
                              Phone Number *
                            </label>
                            <input
                              name="phone"
                              type="tel"
                              required
                              value={form.phone}
                              onChange={handleChange}
                              onFocus={() => setFocused("phone")}
                              onBlur={() => setFocused("")}
                              placeholder="+233 00 000 0000"
                              className={inputCls}
                              style={fieldStyle("phone")}
                            />
                            {errors.phone && (
                              <p className="text-[#E63946] text-xs mt-1">
                                {errors.phone}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[11px] font-bold uppercase tracking-[1px] mb-2 text-gray-600">
                              Date of Birth *
                            </label>
                            <input
                              name="dateOfBirth"
                              type="date"
                              required
                              value={form.dateOfBirth}
                              onChange={handleChange}
                              onFocus={() => setFocused("dateOfBirth")}
                              onBlur={() => setFocused("")}
                              className={inputCls}
                              style={fieldStyle("dateOfBirth")}
                            />
                            {errors.dateOfBirth && (
                              <p className="text-[#E63946] text-xs mt-1">
                                {errors.dateOfBirth}
                              </p>
                            )}
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold uppercase tracking-[1px] mb-2 text-gray-600">
                              Gender *
                            </label>
                            <select
                              name="gender"
                              required
                              value={form.gender}
                              onChange={handleChange}
                              onFocus={() => setFocused("gender")}
                              onBlur={() => setFocused("")}
                              className={inputCls}
                              style={{
                                ...fieldStyle("gender"),
                                appearance: "none",
                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "right 16px center",
                                paddingRight: "40px",
                              }}
                            >
                              <option value="">Select gender</option>
                              <option>Male</option>
                              <option>Female</option>
                              <option>Other</option>
                            </select>
                            {errors.gender && (
                              <p className="text-[#E63946] text-xs mt-1">
                                {errors.gender}
                              </p>
                            )}
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-[1px] mb-2 text-gray-600">
                            Nationality *
                          </label>
                          <input
                            name="nationality"
                            type="text"
                            required
                            value={form.nationality}
                            onChange={handleChange}
                            onFocus={() => setFocused("nationality")}
                            onBlur={() => setFocused("")}
                            placeholder="Ghanaian"
                            className={inputCls}
                            style={fieldStyle("nationality")}
                          />
                          {errors.nationality && (
                            <p className="text-[#E63946] text-xs mt-1">
                              {errors.nationality}
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* ─── Step 2: Academic Details ───────────────────── */}
                    {currentStep === 2 && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-[1px] mb-2 text-gray-600">
                            Previous School *
                          </label>
                          <input
                            name="previousSchool"
                            type="text"
                            required
                            value={form.previousSchool}
                            onChange={handleChange}
                            onFocus={() => setFocused("previousSchool")}
                            onBlur={() => setFocused("")}
                            placeholder="Name of your previous school"
                            className={inputCls}
                            style={fieldStyle("previousSchool")}
                          />
                          {errors.previousSchool && (
                            <p className="text-[#E63946] text-xs mt-1">
                              {errors.previousSchool}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-[1px] mb-2 text-gray-600">
                            Programme of Interest *
                          </label>
                          <select
                            name="programme"
                            required
                            value={form.programme}
                            onChange={handleChange}
                            onFocus={() => setFocused("programme")}
                            onBlur={() => setFocused("")}
                            className={inputCls}
                            style={{
                              ...fieldStyle("programme"),
                              appearance: "none",
                              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "right 16px center",
                              paddingRight: "40px",
                            }}
                          >
                            <option value="">Select a programme</option>
                            {programmes.map((p) => (
                              <option key={p}>{p}</option>
                            ))}
                          </select>
                          {errors.programme && (
                            <p className="text-[#E63946] text-xs mt-1">
                              {errors.programme}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-[1px] mb-2 text-gray-600">
                            Grade/Class *
                          </label>
                          <select
                            name="grade"
                            required
                            value={form.grade}
                            onChange={handleChange}
                            onFocus={() => setFocused("grade")}
                            onBlur={() => setFocused("")}
                            className={inputCls}
                            style={{
                              ...fieldStyle("grade"),
                              appearance: "none",
                              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "right 16px center",
                              paddingRight: "40px",
                            }}
                          >
                            <option value="">Select grade</option>
                            <option>SHS 1</option>
                            <option>SHS 2</option>
                            <option>SHS 3</option>
                          </select>
                          {errors.grade && (
                            <p className="text-[#E63946] text-xs mt-1">
                              {errors.grade}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-[1px] mb-2 text-gray-600">
                            Additional Message
                          </label>
                          <textarea
                            name="message"
                            rows={4}
                            value={form.message}
                            onChange={handleChange}
                            onFocus={() => setFocused("message")}
                            onBlur={() => setFocused("")}
                            placeholder="Any additional information you'd like to share..."
                            className={inputCls}
                            style={{
                              ...fieldStyle("message"),
                              resize: "vertical",
                              minHeight: 100,
                            }}
                          />
                        </div>
                      </div>
                    )}

                    {/* ─── Step 3: Parent/Guardian ────────────────────── */}
                    {currentStep === 3 && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-[1px] mb-2 text-gray-600">
                            Parent/Guardian Name *
                          </label>
                          <input
                            name="parentName"
                            type="text"
                            required
                            value={form.parentName}
                            onChange={handleChange}
                            onFocus={() => setFocused("parentName")}
                            onBlur={() => setFocused("")}
                            placeholder="Full name of parent/guardian"
                            className={inputCls}
                            style={fieldStyle("parentName")}
                          />
                          {errors.parentName && (
                            <p className="text-[#E63946] text-xs mt-1">
                              {errors.parentName}
                            </p>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[11px] font-bold uppercase tracking-[1px] mb-2 text-gray-600">
                              Parent Phone *
                            </label>
                            <input
                              name="parentPhone"
                              type="tel"
                              required
                              value={form.parentPhone}
                              onChange={handleChange}
                              onFocus={() => setFocused("parentPhone")}
                              onBlur={() => setFocused("")}
                              placeholder="+233 00 000 0000"
                              className={inputCls}
                              style={fieldStyle("parentPhone")}
                            />
                            {errors.parentPhone && (
                              <p className="text-[#E63946] text-xs mt-1">
                                {errors.parentPhone}
                              </p>
                            )}
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold uppercase tracking-[1px] mb-2 text-gray-600">
                              Parent Email *
                            </label>
                            <input
                              name="parentEmail"
                              type="email"
                              required
                              value={form.parentEmail}
                              onChange={handleChange}
                              onFocus={() => setFocused("parentEmail")}
                              onBlur={() => setFocused("")}
                              placeholder="parent@example.com"
                              className={inputCls}
                              style={fieldStyle("parentEmail")}
                            />
                            {errors.parentEmail && (
                              <p className="text-[#E63946] text-xs mt-1">
                                {errors.parentEmail}
                              </p>
                            )}
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-[1px] mb-2 text-gray-600">
                            Home Address *
                          </label>
                          <textarea
                            name="address"
                            required
                            rows={3}
                            value={form.address}
                            onChange={handleChange}
                            onFocus={() => setFocused("address")}
                            onBlur={() => setFocused("")}
                            placeholder="Enter your home address"
                            className={inputCls}
                            style={{
                              ...fieldStyle("address"),
                              resize: "vertical",
                              minHeight: 80,
                            }}
                          />
                          {errors.address && (
                            <p className="text-[#E63946] text-xs mt-1">
                              {errors.address}
                            </p>
                          )}
                        </div>

                        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                          <input
                            type="checkbox"
                            id="terms"
                            required
                            className="mt-1 w-4 h-4 accent-[#E63946] cursor-pointer flex-shrink-0"
                          />
                          <label
                            htmlFor="terms"
                            className="text-sm text-gray-600 leading-relaxed"
                          >
                            I confirm that all information provided is accurate
                            and complete. I agree to the
                            <Link
                              to="/terms"
                              className="text-[#E63946] hover:underline mx-1"
                            >
                              Terms & Conditions
                            </Link>
                            and
                            <Link
                              to="/privacy"
                              className="text-[#E63946] hover:underline mx-1"
                            >
                              Privacy Policy
                            </Link>
                            of AMESCO.
                          </label>
                        </div>
                      </div>
                    )}

                    {/* ─── Navigation Buttons ──────────────────────────── */}
                    {!showPreview && !sent && (
                      <div className="flex flex-col sm:flex-row gap-4 mt-8">
                        {currentStep > 1 && (
                          <button
                            type="button"
                            onClick={handlePrevStep}
                            className="flex items-center justify-center gap-2 text-gray-700 font-bold text-[14px] px-8 py-3.5 rounded-full border-2 border-gray-300 hover:border-[#E63946] hover:text-[#E63946] transition-all duration-300 hover:-translate-y-0.5"
                          >
                            ← Previous
                          </button>
                        )}

                        <div className="flex-1" />

                        {currentStep < 3 ? (
                          <button
                            type="button"
                            onClick={handleNextStep}
                            className="flex items-center justify-center gap-2 text-white font-bold text-[14px] px-8 py-3.5 rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl"
                            style={{
                              background: C.accentRed,
                              boxShadow: `0 8px 25px rgba(230,57,70,0.4)`,
                            }}
                          >
                            Next Step →
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={handlePreview}
                            className="flex items-center justify-center gap-2 text-white font-bold text-[14px] px-8 py-3.5 rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl"
                            style={{
                              background: C.royalBlue,
                              boxShadow: `0 8px 25px rgba(14,7,221,0.4)`,
                            }}
                          >
                            Review Application 📋
                          </button>
                        )}
                      </div>
                    )}
                  </form>

                  {/* ─── Preview Mode ──────────────────────────────────── */}
                  {showPreview && !sent && (
                    <div className="mt-6">
                      <ApplicationPreview />

                      <div className="flex flex-col sm:flex-row gap-4 mt-6">
                        <button
                          type="button"
                          onClick={() => setShowPreview(false)}
                          className="flex items-center justify-center gap-2 text-gray-700 font-bold text-[14px] px-8 py-3.5 rounded-full border-2 border-gray-300 hover:border-[#E63946] hover:text-[#E63946] transition-all duration-300"
                        >
                          ← Back to Edit
                        </button>

                        <div className="flex-1" />

                        <button
                          type="button"
                          onClick={handleSubmit}
                          disabled={sending}
                          className="flex items-center justify-center gap-2.5 text-white font-bold text-[15px] px-10 py-3.5 rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl relative overflow-hidden"
                          style={{
                            background: sending ? "#1a1a7a" : C.success,
                            boxShadow: `0 8px 25px rgba(46, 213, 115, 0.4)`,
                            fontFamily: "inherit",
                            opacity: sending ? 0.7 : 1,
                          }}
                        >
                          <span className="relative z-10 flex items-center gap-2.5">
                            {sending ? (
                              <>
                                <span className="animate-pulse">●</span>
                                Submitting...
                              </>
                            ) : (
                              <>Submit Application ✓</>
                            )}
                          </span>
                          {!sending && (
                            <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* ─── Additional Info Cards ────────────────────────────── */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                <div
                  className="bg-white rounded-2xl p-4 text-center"
                  style={{ boxShadow: "0 4px 20px rgba(0,0,0,.06)" }}
                >
                  <div
                    className="w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-2"
                    style={{ background: "rgba(230,57,70,0.1)" }}
                  >
                    <span className="text-xl" style={{ color: C.accentRed }}>
                      📄
                    </span>
                  </div>
                  <h4
                    className="font-bold text-[13px]"
                    style={{ color: C.navy }}
                  >
                    Application Fee
                  </h4>
                  <p className="text-[12px]" style={{ color: C.bodyText }}>
                    GHS 50 (Non-refundable)
                  </p>
                </div>
                <div
                  className="bg-white rounded-2xl p-4 text-center"
                  style={{ boxShadow: "0 4px 20px rgba(0,0,0,.06)" }}
                >
                  <div
                    className="w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-2"
                    style={{ background: "rgba(230,57,70,0.1)" }}
                  >
                    <span className="text-xl" style={{ color: C.accentRed }}>
                      📅
                    </span>
                  </div>
                  <h4
                    className="font-bold text-[13px]"
                    style={{ color: C.navy }}
                  >
                    Deadline
                  </h4>
                  <p className="text-[12px]" style={{ color: C.bodyText }}>
                    March 31, 2026
                  </p>
                </div>
                <div
                  className="bg-white rounded-2xl p-4 text-center"
                  style={{ boxShadow: "0 4px 20px rgba(0,0,0,.06)" }}
                >
                  <div
                    className="w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-2"
                    style={{ background: "rgba(230,57,70,0.1)" }}
                  >
                    <span className="text-xl" style={{ color: C.accentRed }}>
                      📞
                    </span>
                  </div>
                  <h4
                    className="font-bold text-[13px]"
                    style={{ color: C.navy }}
                  >
                    Need Help?
                  </h4>
                  <p className="text-[12px]" style={{ color: C.bodyText }}>
                    Call: +233 24 873 2262
                  </p>
                </div>
              </div>

              <div className="text-center mt-6">
                <Link
                  to="/admissions/howtoApply/howtoApply"
                  className="inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-200"
                  style={{ color: C.navy }}
                >
                  ← Back to How to Apply
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
