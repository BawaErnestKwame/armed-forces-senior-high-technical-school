import React from "react";
import DepartmentPage from "../../../component/common/DepartmentPage";
import heroImg from "../../../assets/slider1.jpeg";
import teacherPhoto from "../../../assets/teachers/teacher1.jpeg";
import facility1 from "../../../assets/gallery/gallery10.jpg";
import facility2 from "../../../assets/gallery/gallery11.jpg";
import facility3 from "../../../assets/gallery/gallery1.jpg";

const Business = () => (
  <DepartmentPage
    heroImage={heroImg}
    title="Business"
    heroSubtitle="Accounting, management, and economics grounded in real-world practice — building the analytical and entrepreneurial skills tomorrow's business leaders need."
    overview="The Business programme develops financial literacy, management thinking, and entrepreneurial skill through accounting, economics, and business studies. Students leave prepared for further study or careers in finance, management, and enterprise."
    coreSubjects={[
      "English Language",
      "Core Mathematics",
      "Integrated Science",
      "Social Studies",
    ]}
    electiveSubjects={[
      "Financial Accounting",
      "Cost Accounting",
      "Business Management",
      "Economics",
    ]}
    professors={[
      { name: "Mr. Frank Amoako", role: "Head of Business Department", photo: teacherPhoto },
      { name: "Mrs. Gifty Sarpong", role: "Accounting Tutor", photo: teacherPhoto },
      { name: "Mr. Richard Ofori", role: "Economics & Management Tutor", photo: teacherPhoto },
    ]}
    facilities={[
      { title: "Business Resource Centre", desc: "Reference materials and case-study resources.", img: facility1 },
      { title: "ICT Laboratory", desc: "Computer literacy and business software practice.", img: facility2 },
      { title: "Mock Trading Lab", desc: "Simulated exercises in accounting and enterprise.", img: facility3 },
    ]}
    requirements={[
      "Credit passes (A1–C6) in six BECE subjects, including English Language and Mathematics",
      "A pass in Integrated Science and Social Studies",
      "Demonstrated aptitude for numeracy and analytical reasoning",
      "Successful completion of the AMESCO admissions placement process",
    ]}
  />
);

export default Business;
