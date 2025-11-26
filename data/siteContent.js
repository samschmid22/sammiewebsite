export const introParagraph =
  "I am Sammie Schmid. I see patterns where others see problems, and I build order that lasts. Chaos has its beauty. It's the invitation to fix things. I learn fast, think in systems, and create processes that make life safer, smarter, and more efficient. Order isn't found; it's made.";

export const heroSnapshot = {
  degrees: [
    "MS in Business Analytics (2026 - 2027)",
    "BSE in Mechanical Engineering (2022 - 2025)",
  ],
  roles: [
    "General Dynamics Mission Systems",
    "Nissan Motor Co.",
  ],
  badges: ["Engineering", "Data & Analytics", "Process Design"],
};

export const employmentHistory = [
  {
    role: "Manufacturing Engineer Intern",
    company: "General Dynamics Mission Systems",
    dates: "09/2025 - 11/2025",
    bullets: [
      "Supported manufacturing engineering for the Air and Missile Defense Radar (AMDR) program.",
    ],
  },
  {
    role: "Powertrain Test Intern",
    company: "Nissan Motor Co.",
    dates: "05/2024 - 08/2024",
    bullets: [
      "Executed powertrain test runs and aggregated measurements; organized/cleaned datasets for reliable analysis.",
      "Built quick analyses and visuals (Excel/MATLAB) to surface signals and compare calibrations; documented findings.",
      "Recommended test/tuning adjustments that reduced iteration time and improved test workflow consistency.",
    ],
  },
];

export const education = [
  {
    school: "Arizona State University",
    program: "MS in Business Analytics",
    dates: "January 2026 - December 2026",
    detailLink:
      "https://docs.google.com/spreadsheets/u/1/d/1rlqH7lqekrtDR9860hvZxFQkvML7DMlj5u8sPoMORZ8/edit?usp=sharing",
  },
  {
    school: "Arizona State University",
    program: "BSE in Mechanical Engineering",
    dates: "August 2022 - December 2025",
    gpa: "GPA: 3.4 / 4.0",
    detailLink:
      "https://docs.google.com/spreadsheets/d/1n6-t9dWnLEzUf3ewTaFjRiUsAYlM25JsBRmEFdhw6gY/edit",
  },
  {
    school: "East Valley Institute of Technology",
    program: "Automotive Technologies",
    dates: "July 2021 - May 2022",
    gpa: "GPA: 4.0 / 4.0",
  },
  {
    school: "Chandler-Gilbert Community College",
    program: "Dual Enrollment",
    dates: "July 2018 - May 2022",
    gpa: "GPA: 4.0 / 4.0",
  },
  {
    school: "Casteel High School",
    program: "",
    dates: "July 2018 - May 2022",
    gpa: "GPA: 4.0 / 4.0",
  },
];

export const independentLearning = [
  { label: "Data", items: ["SQL", "Python", "Excel", "Power BI"] },
  { label: "Engineering", items: ["SolidWorks", "MATLAB", "ANSYS"] },
  {
    label: "Other",
    items: [
      "Chat GPT Advanced / Power User",
      "Wix Studio",
      "Visual Studio Code",
      "Vercel",
      "React / Next.js",
      "Supabase",
    ],
  },
];

export const projects = [
  {
    title: "RoutineOS Habit System",
    image: "/images/routineos.png",
    imageFit: "cover",
    bullets: [
      "Daily habit engine with layered routines, sub-habits, and analytics.",
      "Built with React / Next.js, Supabase, and Vercel auth for modern UX.",
      "AI assistant surfaces coaching insights across accounts and dashboards.",
    ],
    links: [
      {
        href: "https://routineos.vercel.app/",
        label: "Launch RoutineOS",
        external: true,
      },
    ],
  },
  {
    title: "Radar-Readable Sign for Autonomous Vehicles",
    image: "/images/radarsign.png",
    imageFit: "contain",
    bullets: [
      "Shaped cavity geometries/materials so radar returns stay consistent in poor visibility.",
      "Validated prototypes against simulation data to tune reflections before field tests.",
      "Refined mounting + enclosure details for manufacturability and field durability.",
    ],
    links: [
      {
        href: "/docs/capstone-final-report.pdf",
        label: "View Capstone Report",
      },
    ],
  },
  {
    title: "350Z Rebuild & Repairs",
    image: "/images/350z.jpeg",
    bullets: [
      "Multi-year mechanical/electrical restoration of a Nissan 350Z platform.",
      "Documented component tear-downs, upgrades, and cosmetic refinements.",
      "Iterated maintenance workflows to keep the build road-ready.",
    ],
  },
];

export const travelLocations = [
  { label: "Cusco, Peru", image: "/images/peru.jpeg" },
  { label: "Ambergris Caye, Belize", image: "/images/belize.jpeg" },
  { label: "Paris, France", image: "/images/paris.jpeg" },
  { label: "Santorini, Greece", image: "/images/greece.jpeg" },
  { label: "Amsterdam, Netherlands", image: "/images/amsterdam.jpeg" },
  { label: "Rome, Italy", image: "/images/rome.jpeg" },
  { label: "Havana, Cuba", image: "/images/cuba.jpeg" },
  { label: "San Jose, Costa Rica", image: "/images/costarica.JPG" },
  { label: "Whistler, Canada", image: "/images/canada.JPG" },
];

export const lifeMilestones = [
  {
    label: "29029 Everesting",
    image: "/images/29029.jpg",
    href: "https://29029everesting.com/?srsltid=AfmBOooOYDLGMXVFOuWrCgwgLr3e3LD8Gg9w7HsU8tsfllLsszOiPIjH",
  },
  { label: "Skiing / Snow", image: "/images/canada.JPG" },
  { label: "Volleyball", image: "/images/vball.jpg" },
];

export const favorites = [
  { label: "Favorite Game", value: "Chess" },
  { label: "Favorite Music", value: "House Music" },
  { label: "Favorite TV Show", value: "Prison Break" },
  { label: "Favorite Movie", value: "21" },
  {
    label: "Favorite Book",
    value: "I Will Teach You To Be Rich by Ramit Sethi",
  },
];

export const siteContentForAI = {
  introParagraph,
  heroSnapshot,
  employmentHistory,
  education,
  independentLearning,
  projects,
  travelLocations,
  lifeMilestones,
  favorites,
};
