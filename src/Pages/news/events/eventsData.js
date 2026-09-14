import gallery1 from "../../../assets/gallery/gallery1.jpg";
import gallery2 from "../../../assets/gallery/gallery2.jpg";
import gallery3 from "../../../assets/gallery/gallery3.jpg";
import gallery4 from "../../../assets/gallery/gallery4.jpg";
import gallery6 from "../../../assets/gallery/gallery6.jpg";
import gallery7 from "../../../assets/gallery/gallery7.jpg";
import gallery8 from "../../../assets/gallery/gallery8.jpg";
import gallery10 from "../../../assets/gallery/gallery10.jpg";
import gallery11 from "../../../assets/gallery/gallery11.jpg";

export const CATEGORIES = [
  "All",
  "Academic",
  "Sports",
  "Cultural",
  "Ceremony",
];

export const events = [
  {
    id: "speech-night-2026",
    title: "Annual Speech & Prize-Giving Night",
    category: "Ceremony",
    date: "2026-11-14",
    time: "9:00 AM",
    location: "School Auditorium",
    image: gallery1,
    excerpt:
      "Celebrating academic excellence and outstanding achievement across all departments for the 2025/2026 academic year.",
    description:
      "The Armed Forces Senior High Technical School invites parents, guardians, and well-wishers to the Annual Speech & Prize-Giving Night. The event will honour students who excelled academically, in sports, and in extra-curricular activities, feature remarks from the school leadership, and showcase performances from the cultural troupe.",
  },
  {
    id: "inter-house-sports-2026",
    title: "Inter-House Sports Competition",
    category: "Sports",
    date: "2026-10-03",
    time: "8:00 AM",
    location: "School Sports Park",
    image: gallery2,
    excerpt:
      "The four houses battle it out in track and field events for the coveted inter-house trophy.",
    description:
      "Our annual Inter-House Sports Competition brings together all four houses in a day of athletics, football, and relay events. Students, staff, and parents are welcome to cheer on their houses as they compete for this year's trophy.",
  },
  {
    id: "science-tech-fair-2026",
    title: "Science & Technical Innovation Fair",
    category: "Academic",
    date: "2026-09-27",
    time: "10:00 AM",
    location: "Technical Workshop Complex",
    image: gallery3,
    excerpt:
      "Students from the Science and Technical departments exhibit projects, prototypes, and research work.",
    description:
      "The Science & Technical Innovation Fair showcases the practical and research skills of our General Science and Technical students. Expect live demonstrations, project exhibitions, and a panel of judges awarding the most innovative projects.",
  },
  {
    id: "cultural-day-2026",
    title: "Cultural Day Celebration",
    category: "Cultural",
    date: "2026-09-20",
    time: "11:00 AM",
    location: "School Durbar Grounds",
    image: gallery4,
    excerpt:
      "A vibrant showcase of Ghanaian heritage through drumming, dance, and traditional attire.",
    description:
      "Cultural Day is a celebration of the rich diversity and heritage of our student body. The day features traditional drumming and dance performances, a durbar of chiefs, and a display of traditional cuisine and attire from across Ghana.",
  },
  {
    id: "career-guidance-2026",
    title: "Career Guidance & University Fair",
    category: "Academic",
    date: "2026-08-15",
    time: "9:30 AM",
    location: "School Auditorium",
    image: gallery6,
    excerpt:
      "Final-year students meet with university representatives and career counsellors.",
    description:
      "Representatives from leading universities and technical institutions join us to guide final-year students through admissions, scholarships, and career paths. Sessions include one-on-one counselling and open Q&A panels.",
  },
  {
    id: "founders-day-2026",
    title: "Founder's Day Anniversary",
    category: "Ceremony",
    date: "2026-07-18",
    time: "9:00 AM",
    location: "School Auditorium",
    image: gallery7,
    excerpt:
      "Commemorating the founding of the school with a special assembly and alumni homecoming.",
    description:
      "Founder's Day marks the anniversary of the school's establishment. The programme includes a commemorative assembly, alumni homecoming, and recognition of long-serving staff members.",
  },
  {
    id: "inter-school-quiz-2026",
    title: "Inter-School Quiz Competition",
    category: "Academic",
    date: "2026-06-05",
    time: "1:00 PM",
    location: "School Auditorium",
    image: gallery8,
    excerpt:
      "Our brightest students take on neighbouring schools in a battle of knowledge.",
    description:
      "The school proudly hosted the regional inter-school quiz competition, welcoming teams from neighbouring senior high schools to compete across subjects including science, mathematics, and general knowledge.",
  },
  {
    id: "matriculation-2026",
    title: "Matriculation Ceremony",
    category: "Ceremony",
    date: "2026-05-09",
    time: "9:00 AM",
    location: "School Auditorium",
    image: gallery10,
    excerpt:
      "Formally welcoming the new batch of first-year students into the school community.",
    description:
      "The Matriculation Ceremony formally admits newly enrolled students into the school. Students take the matriculation oath, receive their identification, and are officially welcomed by the school leadership.",
  },
  {
    id: "girls-in-tech-2026",
    title: "Girls in STEM & Technical Education Day",
    category: "Academic",
    date: "2026-04-22",
    time: "10:00 AM",
    location: "Technical Workshop Complex",
    image: gallery11,
    excerpt:
      "Encouraging young women to pursue careers in science, technology, and technical trades.",
    description:
      "This special day highlights female role models in STEM and technical fields, with workshops, mentorship sessions, and hands-on activities designed to encourage more girls to pursue technical education.",
  },
];

export const getEventById = (id) => events.find((e) => e.id === id);

export const isUpcoming = (event) => new Date(event.date) >= new Date();
