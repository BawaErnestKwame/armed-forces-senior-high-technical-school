import React from "react";
import DepartmentPage from "../../../component/common/DepartmentPage";
import heroImg from "../../../assets/slider1.jpeg";
import teacherPhoto from "../../../assets/teachers/teacher1.jpeg";
import facility1 from "../../../assets/gallery/gallery7.jpg";
import facility2 from "../../../assets/gallery/gallery8.jpg";
import facility3 from "../../../assets/gallery/gallery9.jpeg";

const Agriculture = () => (
  <DepartmentPage
    heroImage={heroImg}
    title="Agricultural Science"
    heroSubtitle="From crop and animal husbandry to soil science and farm management — hands-on training that prepares students for careers in agriculture and agribusiness."
    overview="The Agricultural Science programme combines classroom instruction with practical farm work, covering crop production, animal husbandry, and soil science. Students gain the scientific grounding and hands-on experience needed for careers across modern agriculture and agribusiness."
    coreSubjects={[
      "English Language",
      "Core Mathematics",
      "Integrated Science",
      "Social Studies",
    ]}
    electiveSubjects={[
      "General Agriculture",
      "Animal Husbandry",
      "Chemistry",
      "Biology",
    ]}
    professors={[
      { name: "Dr. Kwabena Asante", role: "Head of Agricultural Science", photo: teacherPhoto },
      { name: "Mrs. Comfort Appiah", role: "Animal Husbandry Tutor", photo: teacherPhoto },
      { name: "Mr. Daniel Nkrumah", role: "Crop Science Tutor", photo: teacherPhoto },
    ]}
    facilities={[
      { title: "School Farm", desc: "Working farmland for practical crop and livestock training.", img: facility1 },
      { title: "Agric Science Laboratory", desc: "Soil and biological analysis for applied research.", img: facility2 },
      { title: "Greenhouse", desc: "Controlled-environment cultivation practice.", img: facility3 },
    ]}
    requirements={[
      "Credit passes (A1–C6) in six BECE subjects, including English Language and Mathematics",
      "A pass in Integrated Science and Social Studies",
      "Demonstrated interest in agriculture and practical fieldwork",
      "Successful completion of the AMESCO admissions placement process",
    ]}
  />
);

export default Agriculture;
