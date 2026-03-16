export const introParagraph =
  "Sammie Schmid brings clarity to complex systems by seeing patterns where others see problems. With a focus on building lasting structure, her work transforms chaos into opportunity. Known for fast learning and systems thinking, she designs processes that make life safer, smarter, and more efficient. Order isn't found; it's built.";

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
    hook: "Turning discipline into a system that works in real life.",
    image: "/images/routineos.png",
    imageFit: "cover",
    bullets: [
      "Flexible routines built for real, messy days",
      "Designed from personal systems and daily use",
      "Built with Next.js, Supabase, and AI features",
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
    hook: "A safer infrastructure concept for low-visibility conditions.",
    image: "/images/radarsign.png",
    imageFit: "contain",
    bullets: [
      "Designed to stay radar-readable in poor weather",
      "Combines mechanics, materials, and simulation",
      "Focused on safer autonomous decision-making",
    ],
    links: [
      {
        href: "/docs/capstone-final-report.pdf",
        label: "View Capstone Report",
      },
    ],
  },
  {
    title: "The Human Reset",
    hook: "A practical framework for health, clarity, and discipline.",
    image: "/images/humanresetimage.png",
    bullets: [
      "Simplifies wellness into habits that actually stick",
      "Built from real routines, standards, and lived experience",
      "Structured to evolve into a digital product",
    ],
    links: [
      {
        href: "/docs/thehumanreset.pdf",
        label: "Download PDF",
      },
    ],
  },
  {
    title: "350Z Rebuild & Repairs",
    hook: "A long-term rebuild that sharpened systems-level problem solving.",
    image: "/images/350z.jpeg",
    bullets: [
      "Hands-on mechanical and electrical diagnostics",
      "Multi-year rebuild from teardown to reliable daily use",
      "Built repeatable repair workflows under real constraints",
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
