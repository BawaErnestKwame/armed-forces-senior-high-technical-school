import React from "react";
import DepartmentPage from "../../../component/common/DepartmentPage";
import heroImg from "../../../assets/slider1.jpeg";
import teacherPhoto from "../../../assets/teachers/teacher1.jpeg";
import facility1 from "../../../assets/gallery/gallery4.jpg";
import facility2 from "../../../assets/gallery/gallery5.webp";
import facility3 from "../../../assets/gallery/gallery6.jpg";

const Technical = () => (
  <DepartmentPage
    heroImage={heroImg}
    title="Technical"
    heroSubtitle="Woodwork, metalwork, electronics, and building construction — practical, industry-aligned training that equips students for skilled trades and engineering pathways."
    overview="The Technical programme pairs classroom theory with hands-on workshop practice in construction, woodwork, and metalwork. Students graduate with practical, industry-ready skills alongside the technical drawing and design literacy needed for engineering and the skilled trades."
    coreSubjects={[
      "English Language",
      "Core Mathematics",
      "Integrated Science",
      "Social Studies",
    ]}
    electiveSubjects={[
      "Technical Drawing",
      "Building Construction",
      "Woodwork",
      "Applied Electricity / Auto Mechanics",
    ]}
    professors={[
      { name: "Mr. Samuel Boateng", role: "Head of Technical Department", photo: teacherPhoto },
      { name: "Mr. Isaac Darko", role: "Building Construction Tutor", photo: teacherPhoto },
      { name: "Mr. Emmanuel Osei", role: "Woodwork & Metalwork Tutor", photo: teacherPhoto },
    ]}
    facilities={[
      { title: "Woodwork Workshop", desc: "Full bench and machine tools for joinery practice.", img: facility1 },
      { title: "Metalwork Workshop", desc: "Fabrication and machining equipment for hands-on training.", img: facility2 },
      { title: "Technical Drawing Studio", desc: "Dedicated space for drafting and design work.", img: facility3 },
    ]}
    requirements={[
      "Credit passes (A1–C6) in six BECE subjects, including English Language and Mathematics",
      "A pass in Integrated Science and Social Studies",
      "Demonstrated aptitude for Technical Drawing and practical/manual work",
      "Successful completion of the AMESCO admissions placement process",
    ]}
  />
);

export default Technical;
