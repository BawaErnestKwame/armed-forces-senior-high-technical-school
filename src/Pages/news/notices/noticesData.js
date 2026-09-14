export const NOTICE_CATEGORIES = [
  "All",
  "Academic",
  "Examination",
  "Administrative",
  "General",
];

export const notices = [
  {
    id: "second-term-reopening-2026",
    refCode: "AFSHTS/ADM/2026/018",
    title: "Second Term Reopening Date for All Students",
    category: "Administrative",
    date: "2026-09-10",
    pinned: true,
    attachment: null,
    excerpt:
      "All students are to report to school by 6:00 PM on the reopening date. Late arrivals will be sanctioned per school policy.",
    body:
      "Management wishes to inform all students, parents, and guardians that the school reopens for the Second Term on the date indicated on the academic calendar. All students are expected to report to their respective houses by 6:00 PM. Boarding students arriving after this time without prior notice to the housemaster/housemistress will be sanctioned according to school policy. Students should come along with their reporting cards, updated medical forms, and all prescribed textbooks.",
  },
  {
    id: "end-of-term-exams-timetable",
    refCode: "AFSHTS/EXAMS/2026/014",
    title: "End-of-Term Examination Timetable Released",
    category: "Examination",
    date: "2026-09-08",
    pinned: true,
    // No file hosted yet — set { label, url } here once the PDF is available.
    attachment: null,
    excerpt:
      "The timetable for the end-of-term examinations has been published. Check your class notice board for your paper schedule.",
    body:
      "The End-of-Term Examination timetable is now available on all class and departmental notice boards. Students are reminded to confirm their exam venues and seating arrangements with their class teachers. All students must be seated at least 15 minutes before each paper begins. Calculators and other approved materials should be brought according to subject requirements; no borrowing will be permitted during examinations.",
  },
  {
    id: "pta-meeting-notice",
    refCode: "AFSHTS/GEN/2026/009",
    title: "Invitation to Parent-Teacher Association (PTA) Meeting",
    category: "General",
    date: "2026-08-28",
    pinned: false,
    attachment: null,
    excerpt:
      "All parents and guardians are cordially invited to the termly PTA meeting to discuss student welfare and academic progress.",
    body:
      "The school's Parent-Teacher Association invites all parents and guardians to the termly general meeting. The agenda includes a review of academic performance, infrastructure development updates, and welfare matters affecting students. Attendance is strongly encouraged as key decisions affecting your ward's education will be discussed and voted on.",
  },
  {
    id: "textbook-list-2026",
    refCode: "AFSHTS/ACAD/2026/007",
    title: "Approved Textbook and Stationery List for New Academic Year",
    category: "Academic",
    date: "2026-08-20",
    pinned: false,
    // No file hosted yet — set { label, url } here once the PDF is available.
    attachment: null,
    excerpt:
      "The list of approved textbooks and stationery required for each programme is now available.",
    body:
      "The Academic Board has released the approved list of textbooks and stationery required for each programme of study for the new academic year. Parents and guardians are advised to purchase only the prescribed editions to ensure consistency with classroom instruction. The full list has been shared with class teachers and is available at the school's administration office.",
  },
  {
    id: "mock-exam-registration",
    refCode: "AFSHTS/EXAMS/2026/005",
    title: "Registration Opens for Mock Examinations",
    category: "Examination",
    date: "2026-08-12",
    pinned: false,
    attachment: null,
    excerpt:
      "Final-year students should register for the upcoming mock examinations at the examinations office before the deadline.",
    body:
      "Final-year students preparing for their national examinations are to register for the upcoming mock examinations at the examinations office. Registration fees and deadlines have been communicated through class teachers. Students are encouraged to use the mock examination period to identify and address weak areas ahead of the main examinations.",
  },
  {
    id: "lost-and-found-notice",
    refCode: "AFSHTS/GEN/2026/003",
    title: "Lost and Found: Unclaimed Items at the Security Post",
    category: "General",
    date: "2026-08-01",
    pinned: false,
    attachment: null,
    excerpt:
      "Several unclaimed personal items have been recovered on campus and are being held at the main security post.",
    body:
      "Several items including textbooks, water bottles, and clothing have been found around the campus and are currently held at the main security post. Students who have misplaced personal belongings are encouraged to check with security, providing an accurate description of the item, before the end of the term.",
  },
];

export const getNoticeById = (id) => notices.find((n) => n.id === id);
