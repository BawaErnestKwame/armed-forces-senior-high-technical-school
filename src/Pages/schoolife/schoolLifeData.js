// schoolLifeData.js — content for /school-life/:slug pages.
// Copy is descriptive and intentionally light on hard numbers; swap in real
// details (house names, club lists, opening hours) as the school supplies them.
import {
  BookOpen,
  Wifi,
  Armchair,
  Library,
  Trees,
  Utensils,
  Monitor,
  Landmark,
  Mic2,
  Cpu,
  HeartHandshake,
  Users,
  BedDouble,
  ShieldCheck,
  Moon,
  Home,
  Trophy,
  Dumbbell,
  Medal,
  Flag,
} from "lucide-react";
import gallery1 from "../../assets/gallery/gallery1.jpg";
import gallery2 from "../../assets/gallery/gallery2.jpg";
import gallery3 from "../../assets/gallery/gallery3.jpg";
import gallery4 from "../../assets/gallery/gallery4.jpg";
import gallery6 from "../../assets/gallery/gallery6.jpg";
import gallery7 from "../../assets/gallery/gallery7.jpg";
import gallery8 from "../../assets/gallery/gallery8.jpg";
import gallery9 from "../../assets/gallery/gallery9.jpeg";
import gallery11 from "../../assets/gallery/gallery11.jpg";

export const SCHOOL_LIFE_PAGES = {
  library: {
    navLabel: "School Library",
    title: "School Library",
    hero: gallery8,
    subtitle:
      "A quiet, well-stocked space for reading, research and revision — at the heart of learning at AMESCO.",
    eyebrow: "Read. Research. Revise.",
    heading: "Where Learning Goes Deeper",
    intro: [
      "The school library supports every programme with textbooks, reference works, past examination papers and general reading, giving students a calm place to study beyond the classroom.",
      "Library periods build good reading habits, and the library is open to students outside lesson time for private study and group revision.",
    ],
    highlights: [
      { icon: BookOpen, title: "Textbooks & References", text: "Core and elective materials for all seven programmes." },
      { icon: Library, title: "Past Questions", text: "Exam papers and revision material for BECE-to-WASSCE preparation." },
      { icon: Armchair, title: "Quiet Study Space", text: "Comfortable seating for individual and group study." },
      { icon: Wifi, title: "Learning Resources", text: "Supporting materials that go alongside classroom teaching." },
    ],
    listTitle: "Library at a Glance",
    list: [
      "Reading and research space for all students",
      "Reference, textbook and general-reading collections",
      "Study areas for individual and group work",
      "Supervised by library staff during opening hours",
    ],
    gallery: [gallery8, gallery3, gallery4],
  },

  campus: {
    navLabel: "Campus Life",
    title: "Campus Life",
    hero: gallery9,
    subtitle:
      "Classrooms, labs, workshops, a dining hall and open fields — everything a student needs, in one campus.",
    eyebrow: "Our Campus",
    heading: "A Campus Built for Learning and Growth",
    intro: [
      "AMESCO's campus in Kumasi brings together classrooms, science and ICT laboratories, technical workshops, a library, a dining hall, an assembly hall and sports fields.",
      "Beyond lessons, campus life is shaped by assemblies, house activities, entertainment nights and community service that build character alongside academics.",
    ],
    highlights: [
      { icon: Monitor, title: "Labs & Workshops", text: "Science, ICT and technical facilities for hands-on learning." },
      { icon: Utensils, title: "Dining Hall", text: "A central dining hall serving students each day." },
      { icon: Landmark, title: "Assembly Hall", text: "Home to assemblies, worship and school events." },
      { icon: Trees, title: "Open Grounds", text: "Fields and green space for sport, relaxation and events." },
    ],
    listTitle: "Around the Campus",
    list: [
      "Classrooms and specialist laboratories",
      "Technical, art and home-economics workshops",
      "School library and ICT facilities",
      "Dining hall, assembly hall and sports field",
    ],
    gallery: [gallery9, gallery1, gallery11],
    tourLink: true,
  },

  clubs: {
    navLabel: "Clubs & Societies",
    title: "Clubs & Societies",
    hero: gallery3,
    subtitle:
      "From debate to robotics-style innovation, clubs let students explore passions and lead outside the classroom.",
    eyebrow: "Beyond the Classroom",
    heading: "Find Your Community",
    intro: [
      "Clubs and societies give students the chance to pursue interests, build confidence and take on leadership — skills that count as much as grades.",
      "Students are encouraged to join at least one club, and every club is guided by a teacher-patron.",
    ],
    highlights: [
      { icon: Mic2, title: "Debate & Public Speaking", text: "Argue, persuade and speak with confidence." },
      { icon: Cpu, title: "JETS Club", text: "Junior Engineers, Technicians and Scientists — build, test and invent." },
      { icon: HeartHandshake, title: "Interact & Service", text: "Community projects that put service into practice." },
      { icon: Users, title: "Vision Club & More", text: "Interest-based groups that bring like-minded students together." },
    ],
    listTitle: "What Clubs Offer",
    list: [
      "Leadership roles and responsibility",
      "Inter-school competitions and showcases",
      "Community service and outreach",
      "Friendships across year groups and houses",
    ],
    gallery: [gallery3, gallery6, gallery7],
  },

  boarding: {
    navLabel: "Boarding",
    title: "Boarding Life",
    hero: gallery1,
    subtitle:
      "A structured, safe home away from home where discipline, independence and friendship grow.",
    eyebrow: "Home Away From Home",
    heading: "Life in the Boarding Houses",
    intro: [
      "AMESCO is a boarding school. Students live in residential houses under the care of housemasters and housemistresses, with set routines for prep, meals, rest and recreation.",
      "Boarding builds independence, time management and lasting friendships, and reflects the discipline the school is known for.",
    ],
    highlights: [
      { icon: Home, title: "Residential Houses", text: "Students are grouped into houses, each with its own housemaster or housemistress." },
      { icon: BedDouble, title: "Dormitories", text: "Organised sleeping quarters with clear house rules." },
      { icon: ShieldCheck, title: "Safety & Supervision", text: "Staff on hand to keep students safe and well." },
      { icon: Moon, title: "Daily Routine", text: "Structured mornings, lessons, evening prep and lights-out." },
    ],
    listTitle: "Boarding Essentials",
    list: [
      "Supervised prep (study) time each evening",
      "Meals served in the school dining hall",
      "House activities, competitions and duties",
      "Guidance and counselling support for boarders",
    ],
    gallery: [gallery1, gallery4, gallery2],
  },

  sports: {
    navLabel: "Sports",
    title: "Sports & Athletics",
    hero: gallery2,
    subtitle:
      "Teamwork, fitness and healthy competition — from house matches to inter-school championships.",
    eyebrow: "Play With Discipline",
    heading: "Sports at AMESCO",
    intro: [
      "Sport is part of school life for every student. Football, athletics, volleyball and table tennis keep the school active, and inter-house competitions bring everyone together.",
      "Our teams represent the school in zonal and inter-school competitions, and students learn teamwork, resilience and fair play along the way.",
    ],
    highlights: [
      { icon: Trophy, title: "Football", text: "Boys' and girls' teams competing at school and zonal level." },
      { icon: Medal, title: "Athletics", text: "Track and field events, including the annual inter-house sports day." },
      { icon: Dumbbell, title: "Volleyball & Table Tennis", text: "Indoor and outdoor games for all abilities." },
      { icon: Flag, title: "Inter-House Competition", text: "Houses compete for the overall sports trophy each year." },
    ],
    listTitle: "Why Sport Matters Here",
    list: [
      "Builds fitness, discipline and teamwork",
      "Chances to represent the school",
      "Inter-house and inter-school fixtures",
      "Coaching from teacher-patrons and games staff",
    ],
    gallery: [gallery2, gallery11, gallery7],
  },
};

export const SCHOOL_LIFE_ORDER = ["campus", "boarding", "clubs", "sports", "library"];
