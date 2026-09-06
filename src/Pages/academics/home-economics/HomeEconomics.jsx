import React from "react";
import DepartmentPage from "../../../component/common/DepartmentPage";
import heroImg from "../../../assets/slider1.jpeg";
import teacherPhoto from "../../../assets/teachers/teacher1.jpeg";
import facility1 from "../../../assets/gallery/gallery8.jpg";
import facility2 from "../../../assets/gallery/gallery9.jpeg";
import facility3 from "../../../assets/gallery/gallery10.jpg";

const HomeEconomics = () => (
  <DepartmentPage
    heroImage={heroImg}
    title="Home Economics"
    heroSubtitle="Food and nutrition, clothing and textiles, and management in living — practical training for careers in hospitality, fashion, and family and consumer sciences."
    overview="The Home Economics programme blends practical training with applied science across food, textiles, and household management. Students graduate ready for careers in hospitality, fashion, nutrition, and family and consumer sciences."
    coreSubjects={[
      "English Language",
      "Core Mathematics",
      "Integrated Science",
      "Social Studies",
    ]}
    electiveSubjects={[
      "Food and Nutrition",
      "Management in Living",
      "Clothing and Textiles",
      "General Knowledge in Art",
    ]}
    professors={[
      { name: "Mrs. Rebecca Twumasi", role: "Head of Home Economics Department", photo: teacherPhoto },
      { name: "Mrs. Vida Frimpong", role: "Food & Nutrition Tutor", photo: teacherPhoto },
      { name: "Mrs. Doris Yeboah", role: "Clothing & Textiles Tutor", photo: teacherPhoto },
    ]}
    facilities={[
      { title: "Food & Nutrition Lab", desc: "Fully equipped kitchen space for practical cookery.", img: facility1 },
      { title: "Fashion & Textiles Studio", desc: "Sewing machines and pattern-making equipment.", img: facility2 },
      { title: "Management-in-Living Lab", desc: "Practical space for household management training.", img: facility3 },
    ]}
    requirements={[
      "Credit passes (A1–C6) in six BECE subjects, including English Language and Mathematics",
      "A pass in Integrated Science and Social Studies",
      "Demonstrated interest in practical and applied science subjects",
      "Successful completion of the AMESCO admissions placement process",
    ]}
  />
);

export default HomeEconomics;
