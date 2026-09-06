import React from "react";
import DepartmentPage from "../../../component/common/DepartmentPage";
import heroImg from "../../../assets/slider1.jpeg";
import teacherPhoto from "../../../assets/teachers/teacher1.jpeg";
import facility1 from "../../../assets/gallery/gallery5.webp";
import facility2 from "../../../assets/gallery/gallery6.jpg";
import facility3 from "../../../assets/gallery/gallery7.jpg";

const VisualArt = () => (
  <DepartmentPage
    heroImage={heroImg}
    title="Visual Arts"
    heroSubtitle="Painting, sculpture, graphic design, and picture-making — nurturing creativity and technical craft for careers in design, media, and the fine arts."
    overview="The Visual Arts programme develops creative and technical craft across drawing, design, and sculpture. Students build a professional portfolio while learning the visual literacy and design thinking behind careers in art, design, and media."
    coreSubjects={[
      "English Language",
      "Core Mathematics",
      "Integrated Science",
      "Social Studies",
    ]}
    electiveSubjects={[
      "General Knowledge in Art",
      "Graphic Design",
      "Picture Making",
      "Sculpture / Ceramics",
    ]}
    professors={[
      { name: "Mr. Nana Yaw Boadi", role: "Head of Visual Arts Department", photo: teacherPhoto },
      { name: "Mrs. Efua Asiedu", role: "Graphic Design Tutor", photo: teacherPhoto },
      { name: "Mr. Kwesi Baffour", role: "Picture Making & Sculpture Tutor", photo: teacherPhoto },
    ]}
    facilities={[
      { title: "Art Studio", desc: "Open studio space for drawing and painting practice.", img: facility1 },
      { title: "Graphic Design Lab", desc: "Computers and software for digital design work.", img: facility2 },
      { title: "Sculpture & Ceramics Workshop", desc: "Tools and kiln space for 3D art forms.", img: facility3 },
    ]}
    requirements={[
      "Credit passes (A1–C6) in six BECE subjects, including English Language and Mathematics",
      "A pass in Integrated Science and Social Studies",
      "A portfolio or demonstrated aptitude in drawing and creative work",
      "Successful completion of the AMESCO admissions placement process",
    ]}
  />
);

export default VisualArt;
