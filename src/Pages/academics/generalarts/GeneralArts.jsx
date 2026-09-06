import React from "react";
import DepartmentPage from "../../../component/common/DepartmentPage";
import heroImg from "../../../assets/slider1.jpeg";
import teacherPhoto from "../../../assets/teachers/teacher1.jpeg";
import facility1 from "../../../assets/gallery/gallery2.jpg";
import facility2 from "../../../assets/gallery/gallery3.jpg";
import facility3 from "../../../assets/gallery/gallery4.jpg";

const GeneralArts = () => (
  <DepartmentPage
    heroImage={heroImg}
    title="General Arts"
    heroSubtitle="Literature, government, history, and languages that sharpen critical thinking and communication — a foundation for law, media, education, and public service."
    overview="The General Arts programme builds strong reading, reasoning, and communication skills through literature, government, and the social sciences. It's a versatile foundation for students heading toward law, media, public service, or higher education in the humanities."
    coreSubjects={[
      "English Language",
      "Core Mathematics",
      "Integrated Science",
      "Social Studies",
    ]}
    electiveSubjects={[
      "Literature in English",
      "Government",
      "Economics",
      "Christian Religious Studies / French",
    ]}
    professors={[
      { name: "Mrs. Elizabeth Boateng", role: "Head of General Arts Department", photo: teacherPhoto },
      { name: "Mr. Joseph Amankwah", role: "Literature & Government Tutor", photo: teacherPhoto },
      { name: "Mrs. Patricia Danso", role: "Economics Tutor", photo: teacherPhoto },
    ]}
    facilities={[
      { title: "Library & Resource Centre", desc: "Extensive reading and research materials.", img: facility1 },
      { title: "Language Laboratory", desc: "Dedicated space for language study and practice.", img: facility2 },
      { title: "Debate & Media Studio", desc: "Space for public speaking and communication skills.", img: facility3 },
    ]}
    requirements={[
      "Credit passes (A1–C6) in six BECE subjects, including English Language and Mathematics",
      "A pass in Integrated Science and Social Studies",
      "Demonstrated strength in reading comprehension and written expression",
      "Successful completion of the AMESCO admissions placement process",
    ]}
  />
);

export default GeneralArts;
