import React from "react";
import DepartmentPage from "../../../component/common/DepartmentPage";
import heroImg from "../../../assets/slider1.jpeg";
import teacherPhoto from "../../../assets/teachers/teacher1.jpeg";
import facility1 from "../../../assets/gallery/gallery1.jpg";
import facility2 from "../../../assets/gallery/gallery2.jpg";
import facility3 from "../../../assets/gallery/gallery3.jpg";

const Science = () => (
  <DepartmentPage
    heroImage={heroImg}
    title="General Science"
    heroSubtitle="Physics, chemistry, biology, and mathematics taught through modern labs and hands-on experiments — a rigorous foundation for careers in medicine, engineering, and research."
    overview="The General Science programme builds a strong foundation in the natural sciences and mathematics, combining rigorous classroom instruction with hands-on laboratory work. Students develop the analytical thinking, problem-solving, and research skills needed to thrive in science and technology-driven careers."
    coreSubjects={[
      "English Language",
      "Core Mathematics",
      "Integrated Science",
      "Social Studies",
    ]}
    electiveSubjects={[
      "Physics",
      "Chemistry",
      "Biology",
      "Elective Mathematics",
    ]}
    professors={[
      { name: "Dr. Yaw Mensah", role: "Head of Science Department", photo: teacherPhoto },
      { name: "Mrs. Abena Owusu", role: "Senior Biology Tutor", photo: teacherPhoto },
      { name: "Mr. Kofi Adjei", role: "Physics & Chemistry Tutor", photo: teacherPhoto },
    ]}
    facilities={[
      { title: "Physics Laboratory", desc: "Equipped for mechanics, electricity, and optics experiments.", img: facility1 },
      { title: "Chemistry Laboratory", desc: "Fully fitted for practical and analytical chemistry.", img: facility2 },
      { title: "Biology Laboratory", desc: "Microscopy and specimen study for life sciences.", img: facility3 },
    ]}
    requirements={[
      "Credit passes (A1–C6) in six BECE subjects, including English Language and Mathematics",
      "A pass in Integrated Science and Social Studies",
      "Demonstrated aptitude for Physics, Chemistry, and Elective Mathematics",
      "Successful completion of the AMESCO admissions placement process",
    ]}
  />
);

export default Science;
