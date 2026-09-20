import React from "react";
import LegalPage from "./LegalPage";

// Draft terms — should be reviewed by school management before go-live.
const SECTIONS = [
  {
    title: "Acceptance of Terms",
    body: [
      "By using this website, purchasing an application eVoucher or submitting an application, you agree to these Terms & Conditions. If you do not agree, please do not use the application portal.",
      "Applicants under 18 must have a parent or guardian read and agree to these terms on their behalf.",
    ],
  },
  {
    title: "Applications & Admission",
    body: [
      "Submitting an application does not guarantee admission. Placement is decided by the school according to its admission criteria, available places and, where applicable, the Computerised School Selection and Placement System.",
    ],
    list: [
      "You must meet the entry requirements of the programme you apply for.",
      "Applications must be completed by the stated deadline.",
      "The school may withdraw an offer if any information provided is found to be false or incomplete.",
    ],
  },
  {
    title: "Accuracy of Information",
    body: [
      "You confirm that everything you submit — including personal details, academic history, guardian information and your passport photograph — is true, accurate and complete. Supplying false information or documents may lead to rejection or cancellation of admission.",
    ],
  },
  {
    title: "eVoucher & Payments",
    body: [
      "An application eVoucher is required to apply. The price is shown at the point of purchase. Payments are processed by our payment partners, and the school does not store your card or mobile-money PIN details.",
    ],
    list: [
      "eVoucher and application fees are non-refundable once the voucher has been issued, except where a payment error is confirmed by the school.",
      "Each eVoucher is for one applicant and may not be sold or transferred.",
      "Keep your Order ID — you will need it to check your transaction status.",
    ],
  },
  {
    title: "Acceptable Use",
    body: ["When using the portal you agree not to:"],
    list: [
      "Attempt to gain unauthorised access to accounts, systems or data.",
      "Submit false, misleading or offensive content.",
      "Interfere with the operation or security of the website.",
      "Use automated tools to scrape or overload the site.",
    ],
  },
  {
    title: "Intellectual Property",
    body: [
      "The school name, crest, logo, text, photographs and design of this website belong to Armed Forces Senior High Technical School, Kumasi, unless stated otherwise. You may not copy or reuse them without written permission.",
    ],
  },
  {
    title: "Limitation of Liability",
    body: [
      "We work to keep the website accurate and available, but it is provided \"as is\". The school is not liable for interruptions, errors or losses arising from use of the site, to the fullest extent permitted by law.",
    ],
  },
  {
    title: "Changes to These Terms",
    body: [
      "We may update these terms from time to time. The date at the top of this page shows when they were last revised. Continued use of the website after changes means you accept the updated terms.",
    ],
  },
  {
    title: "Governing Law",
    body: ["These terms are governed by the laws of the Republic of Ghana."],
  },
];

const Terms = () => (
  <LegalPage
    title="Terms & Conditions"
    subtitle="The rules for using our website and application portal."
    updated="September 2026"
    intro="Please read these terms carefully before buying an eVoucher or applying to Armed Forces Senior High Technical School, Kumasi (AMESCO)."
    sections={SECTIONS}
  />
);

export default Terms;
