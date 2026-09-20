import React from "react";
import LegalPage from "./LegalPage";

// Draft policy — should be reviewed by school management before go-live.
const SECTIONS = [
  {
    title: "Information We Collect",
    body: ["When you use our website or apply for admission we may collect:"],
    list: [
      "Applicant details — name, date of birth, gender, nationality, email, phone number and passport photograph.",
      "Academic details — previous school, programme choice and grade applied for.",
      "Parent or guardian details — name, phone, email and home address.",
      "Purchase details — order ID, amount and payment method (card and mobile-money credentials are handled by our payment partner, not by us).",
      "Messages you send through our contact forms.",
    ],
  },
  {
    title: "How We Use Your Information",
    body: ["We use your information only to run the school's admissions and communications, including to:"],
    list: [
      "Process and assess your application.",
      "Issue and verify eVouchers and confirm payments.",
      "Contact you or your guardian about your application.",
      "Respond to enquiries and improve our services.",
      "Meet our legal and regulatory obligations.",
    ],
  },
  {
    title: "Children's Information",
    body: [
      "Most applicants are under 18. We collect their information only for admission purposes and expect a parent or guardian to be aware of, and agree to, the application being made.",
    ],
  },
  {
    title: "Sharing Your Information",
    body: [
      "We do not sell your personal data. We share it only with:",
    ],
    list: [
      "Payment providers, to process your eVoucher purchase.",
      "Education and placement authorities, where required for admission and enrolment.",
      "Service providers who help operate our website, under confidentiality obligations.",
      "Authorities, when the law requires it.",
    ],
  },
  {
    title: "Storage & Security",
    body: [
      "We take reasonable technical and organisational steps to protect your data from loss, misuse and unauthorised access. Application records are kept for as long as needed for admission and school records, and then securely deleted or archived.",
    ],
  },
  {
    title: "Your Rights",
    body: [
      "Under the Data Protection Act, 2012 (Act 843) of Ghana you may ask to see the personal data we hold about you, request corrections, and object to certain uses. To do so, contact us using the details below and we will respond within a reasonable time.",
    ],
  },
  {
    title: "Cookies",
    body: [
      "Our website may use small cookies or local storage to remember preferences and keep the site working. You can clear or block these in your browser settings, though some features may not work as intended.",
    ],
  },
  {
    title: "Changes to This Policy",
    body: [
      "We may update this policy from time to time. The date at the top of this page shows when it was last revised.",
    ],
  },
];

const Privacy = () => (
  <LegalPage
    title="Privacy Policy"
    subtitle="How we collect, use and protect your personal information."
    updated="September 2026"
    intro="Armed Forces Senior High Technical School, Kumasi (AMESCO) respects your privacy. This policy explains what personal data we collect through this website and what we do with it."
    sections={SECTIONS}
  />
);

export default Privacy;
