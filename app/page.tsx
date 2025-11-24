import Image from "next/image";
import Link from "next/link";

const navItems = [
  { label: "Home", href: "#hero" },
  { label: "Employment", href: "#employment" },
  { label: "Intelligence", href: "#intelligence" },
  { label: "Projects", href: "#projects" },
  { label: "Resume", href: "#resume" },
  { label: "Life Resume", href: "#life-resume" },
  { label: "Contact", href: "#contact" },
];

const heroSnapshot = {
  degrees: [
    "BSE in Mechanical Engineering (2022 - 2025)",
    "MS in Business Analytics (2026 - 2027)",
  ],
  roles: [
    "General Dynamics Mission Systems",
    "Nissan Motor Co.",
    "Arizona Real Estate Salesperson",
  ],
  badges: ["Engineering", "Data & Analytics", "Process Design"],
};

const employmentHistory = [
  {
    role: "Manufacturing Engineer Intern",
    company: "General Dynamics Mission Systems - AMDR",
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
  {
    role: "Arizona Real Estate Salesperson",
    company: "",
    dates: "07/2022 - Present",
    bullets: [],
  },
];

const education = [
  {
    school: "Arizona State University",
    program: "MS in Business Analytics",
    dates: "January 2026 - December 2026",
    cta: "Major Map",
  },
  {
    school: "Arizona State University",
    program: "BSE in Mechanical Engineering",
    dates: "August 2022 - December 2025",
    detail: "GPA: 3.4 / 4.0",
    cta: "Major Map",
  },
  {
    school: "East Valley Institute of Technology",
    program: "Automotive Technologies",
    dates: "2021 - 2022",
  },
  {
    school: "Chandler-Gilbert Community College",
    program: "Dual Enrollment",
    dates: "2018 - 2022",
  },
  {
    school: "Casteel High School",
    program: "",
    dates: "2018 - 2022",
  },
];

const independentLearning = [
  { label: "Data", items: ["SQL", "Python", "Excel", "Power BI"] },
  { label: "Engineering", items: ["SolidWorks", "MATLAB", "ANSYS"] },
  {
    label: "Other",
    items: ["Chat GPT Advanced / Power User", "Wix Studio (personal website)"],
  },
];

const projects = [
  {
    title: "Radar-Readable Sign for Autonomous Vehicles",
    bullets: [
      "Engineered cavity geometry and materials to shape radar reflections for consistent multi-peak signatures.",
      "Built and tested prototypes; compared measured radar responses vs. simulations to validate robustness in low-visibility conditions.",
      "Iterated mounting, enclosure, and manufacturability details to improve durability and field readiness.",
    ],
  },
  {
    title: "Temporal Capsule Recorder",
    bullets: [
      "Defined a sensor + sampling architecture prioritizing signal quality, privacy, and battery life.",
      "Prototyped a capture pipeline with timestamped events and a minimal retrieval interface for fast recall.",
      "Ran early user/bench tests to stress noise, memory usage, and synchronization, informing the provisional filing.",
    ],
  },
  {
    title: "350Z Rebuild & Repairs",
    bullets: [
      "Long-term hands-on project restoring and upgrading a Nissan 350Z - mechanical, electrical, and cosmetic.",
    ],
  },
];

const lifeTiles = [
  "Cusco, Peru",
  "Ambergris Caye, Belize",
  "Paris, France",
  "Santorini, Greece",
  "Amsterdam, Netherlands",
  "Rome, Italy",
  "Havana, Cuba",
  "San Jose, Costa Rica",
  "Whistler, Canada",
  "29029 Everesting",
  "Skiing / Snow",
  "Running / Hiking",
  "Volleyball",
];

const favorites = [
  { label: "Favorite Game", value: "Chess" },
  { label: "Favorite Music", value: "House Music" },
  { label: "Favorite TV Show", value: "Prison Break" },
  { label: "Favorite Movie", value: "21" },
  { label: "Favorite Book", value: "I Will Teach You To Be Rich by Ramit Sethi" }
];


const introParagraph =
  "I am Sammie Schmid. I see patterns where others see problems, and I build order that lasts. Chaos has its beauty. It's the invitation to fix things. I learn fast, think in systems, and create processes that make life safer, smarter, and more efficient. Order isn't found; it's made.";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-slate-950 to-slate-900 text-slate-100">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.12),_transparent_55%)]" />
      <Header />
      <main className="relative z-10 mx-auto max-w-6xl space-y-24 px-4 pb-24 pt-28 lg:space-y-28 lg:px-0 lg:pt-36">
        <Hero />
        <Employment />
        <Intelligence />
        <Projects />
        <Resume />
        <LifeResume />
        <Contact />
      </main>
    </div>
  );
}

const Header = () => (
  <header className="sticky top-0 z-40 border-b border-white/10 bg-black/70 backdrop-blur">
    <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-0">
      <div className="flex items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 overflow-hidden rounded-full border border-white/20 bg-white/5">
            <Image
              src="/profile.jpg"
              alt="Samantha Schmid"
              width={64}
              height={64}
              className="h-full w-full object-cover"
            />
          </div>
          <span className="text-xs font-semibold uppercase tracking-[0.5em] text-white">
            Samantha Schmid
          </span>
        </div>
        <Link
          href="https://www.linkedin.com/in/samantha-schmid/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-sky-400 text-sm font-semibold uppercase tracking-[0.4em] text-sky-300 transition hover:bg-sky-400/20"
        >
          in
        </Link>
      </div>
      <nav className="hidden items-center gap-6 text-[0.65rem] uppercase tracking-[0.4em] text-slate-300 lg:flex">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="transition hover:text-white"
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <nav className="flex flex-wrap gap-3 text-[0.6rem] uppercase tracking-[0.4em] text-slate-400 lg:hidden">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-full border border-white/10 px-3 py-1 transition hover:border-slate-200 hover:text-white"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  </header>
);

const Hero = () => (
  <section id="hero" className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
    <div>
      <p className="text-xs uppercase tracking-[0.6em] text-slate-400">
        Samantha Schmid
      </p>
      <h1 className="mt-4 text-4xl font-black tracking-[0.3em] text-white drop-shadow-[0_0_25px_rgba(56,189,248,0.45)] md:text-5xl">
        SAMANTHA SCHMID
      </h1>
      <div className="mt-6 space-y-2 text-lg text-slate-200">
        <p>Arizona State University</p>
        <p>BSE in Mechanical Engineering (2022 - 2025)</p>
        <p>MS in Business Analytics (2026 - 2027)</p>
      </div>
      <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300">
        {introParagraph}
      </p>
    </div>
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-sky-500/10">
      <div className="flex items-center gap-3">
        <div className="relative h-16 w-16 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          <Image
            src="/profile.jpg"
            alt="Samantha Schmid"
            width={96}
            height={96}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
            Snapshot
          </p>
          <p className="font-semibold text-white">Systems-minded builder</p>
        </div>
      </div>
      <div className="mt-7 space-y-5">
        <SnapshotList label="Degrees" items={heroSnapshot.degrees} />
        <SnapshotList label="Recent Roles" items={heroSnapshot.roles} />
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
            Badges
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {heroSnapshot.badges.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-white/10 bg-sky-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-200"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Employment = () => (
  <section id="employment">
    <SectionTitle
      eyebrow="Professional Experience"
      title="Employment"
    />
    <div className="space-y-6">
      {employmentHistory.map((job) => (
        <div
          key={job.role}
          className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/30"
        >
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-slate-400">
            <span>{job.dates}</span>
            {job.company && <span className="text-slate-500">/</span>}
            {job.company && <span>{job.company}</span>}
          </div>
          <h3 className="mt-3 text-2xl font-semibold tracking-[0.15em] text-white">
            {job.role}
          </h3>
          {job.bullets.length > 0 && (
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              {job.bullets.map((bullet) => (
                <li key={bullet} className="leading-relaxed">
                  • {bullet}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  </section>
);

const Intelligence = () => (
  <section id="intelligence">
    <SectionTitle
      eyebrow="Learning & Skills"
      title="Intelligence"
    />
    <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
      <div className="space-y-5">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
          Education
        </p>
        {education.map((item) => (
          <div
            key={`${item.school}-${item.program}-${item.dates}`}
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-lg font-semibold uppercase tracking-[0.2em] text-white">
                {item.school}
              </h3>
              <span className="text-xs uppercase tracking-[0.3em] text-slate-400">
                {item.dates}
              </span>
            </div>
            {item.program && (
              <p className="mt-2 text-sm text-slate-200">{item.program}</p>
            )}
            {item.detail && (
              <p className="text-sm text-slate-400">{item.detail}</p>
            )}
            {item.cta && (
              <Link
                href="https://www.samanthaschmid.info/intelligence"
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-sky-400 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-sky-200 transition hover:bg-sky-500/10"
              >
                {item.cta}
              </Link>
            )}
          </div>
        ))}
      </div>
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900/70 to-black p-6">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
          Independent Learning
        </p>
        <div className="mt-5 space-y-5">
          {independentLearning.map((bucket) => (
            <div key={bucket.label}>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white">
                {bucket.label}
              </p>
              <ul className="mt-2 space-y-1 text-sm text-slate-300">
                {bucket.items.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Link
          href="https://www.samanthaschmid.info/intelligence"
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex w-full items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:border-white/30"
        >
          All Certifications
        </Link>
      </div>
    </div>
  </section>
);

const Projects = () => (
  <section id="projects">
    <SectionTitle eyebrow="Builds In Progress" title="Projects" />
    <div className="grid gap-6 md:grid-cols-2">
      {projects.map((project) => (
        <div
          key={project.title}
          className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/30"
        >
          <h3 className="text-xl font-semibold uppercase tracking-[0.2em] text-white">
            {project.title}
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            {project.bullets.map((bullet) => (
              <li key={bullet}>• {bullet}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </section>
);

const Resume = () => (
  <section id="resume">
    <SectionTitle
      eyebrow="One Page"
      title="Resume"
      description="This page expands on highlights; download my Resume for the full story."
    />
    <div className="flex flex-col gap-6 md:flex-row md:items-start">
      <p className="text-sm text-slate-300 md:w-1/2">
        This site expands on highlights and the full one-page resume can be
        downloaded anytime.
      </p>
      <Link
        href="/resume.pdf"
        className="inline-flex items-center justify-center rounded-full border border-sky-400 bg-sky-500/10 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-sky-200 transition hover:bg-sky-500/20"
      >
        Download my Resume ⬇
      </Link>
    </div>
    <div className="mt-8 rounded-[2rem] border-2 border-dashed border-white/20 bg-white/5 p-12 text-center text-xs uppercase tracking-[0.5em] text-slate-500">
      Resume preview placeholder
    </div>
  </section>
);

const LifeResume = () => (
  <section id="life-resume">
    <SectionTitle eyebrow="Beyond Work" title="Life Resume" />
    <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
      <div className="grid gap-4 sm:grid-cols-2">
        {lifeTiles.map((tile) => (
          <div
            key={tile}
            className="flex h-32 items-center justify-center rounded-3xl border border-white/5 bg-white/5 text-center text-sm font-semibold uppercase tracking-[0.2em] text-slate-200"
          >
            {tile}
          </div>
        ))}
      </div>
      <div className="space-y-6">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-black p-6">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
            Favorite Book
          </p>
          <h3 className="mt-3 text-xl font-semibold text-white">
            {favoriteBook.title}
          </h3>
          <p className="text-sm text-slate-400">{favoriteBook.author}</p>
          <p className="mt-3 text-sm text-slate-300">
            {favoriteBook.description}
          </p>
        </div>
        <div className="grid gap-4">
          {favorites.map((fav) => (
            <div
              key={fav.label}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm"
            >
              <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
                {fav.label}
              </p>
              <p className="mt-2 font-semibold text-white">{fav.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const Contact = () => (
  <section id="contact">
    <SectionTitle title="Contact" eyebrow="Let's Connect" />
    <p className="max-w-2xl text-sm text-slate-300">
      Reach out for roles that blend engineering, analytics, and product
      building.
    </p>
    <div className="mt-6 flex flex-wrap gap-4">
      <Link
        href="mailto:sammieschmid22@gmail.com"
        className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:border-white/35"
      >
        Email me
      </Link>
      <Link
        href="https://www.linkedin.com/in/samantha-schmid/"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center justify-center rounded-full border border-sky-400 bg-sky-500/10 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-sky-200 transition hover:bg-sky-500/20"
      >
        View LinkedIn
      </Link>
    </div>
  </section>
);

const SectionTitle = ({ eyebrow, title, description }) => (
  <div className="mb-10 space-y-3">
    {eyebrow && (
      <p className="text-xs uppercase tracking-[0.5em] text-slate-500">
        {eyebrow}
      </p>
    )}
    <h2 className="text-3xl font-black uppercase tracking-[0.3em] text-white">
      {title}
    </h2>
    {description && description.length > 0 && (
      <p className="max-w-2xl text-sm text-slate-300">{description}</p>
    )}
  </div>
);

const SnapshotList = ({ label, items }) => (
  <div>
    <p className="text-xs uppercase tracking-[0.4em] text-slate-400">{label}</p>
    <ul className="mt-2 space-y-1 text-sm text-slate-200">
      {items.map((item) => (
        <li key={item}>• {item}</li>
      ))}
    </ul>
  </div>
);
