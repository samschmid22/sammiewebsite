"use client";

import { useEffect, useState } from "react";
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
    detailLink:
      "https://docs.google.com/spreadsheets/u/1/d/1rlqH7lqekrtDR9860hvZxFQkvML7DMlj5u8sPoMORZ8/edit?usp=sharing",
  },
  {
    school: "Arizona State University",
    program: "BSE in Mechanical Engineering",
    dates: "August 2022 - December 2025",
    detail: "GPA: 3.4 / 4.0",
    detailLink:
      "https://docs.google.com/spreadsheets/d/1n6-t9dWnLEzUf3ewTaFjRiUsAYlM25JsBRmEFdhw6gY/edit",
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

const lifeMoments = [
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
];

const favoriteBook = {
  title: "I Will Teach You To Be Rich",
  author: "by Ramit Sethi",
  description:
    "I love I Will Teach You to Be Rich because it treats money like a system with automation, checklists and simple scripts, so you can set it once and focus on life. It's practical, with clear psychology, high leverage moves like negotiation and conscious spending, and a plan you can actually execute.",
};

const introParagraph =
  "I am Sammie Schmid. I see patterns where others see problems, and I build order that lasts. Chaos has its beauty. It's the invitation to fix things. I learn fast, think in systems, and create processes that make life safer, smarter, and more efficient. Order isn't found; it's made.";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-body text-primary">
      {showSplash && <SplashScreen />}
      <Header />
      <main className="mx-auto max-w-5xl space-y-28 px-4 pb-24 pt-28 md:px-6 lg:pt-32">
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

const SplashScreen = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-body">
    <div className="flex flex-col items-center gap-4">
      <h1 className="font-display text-4xl font-semibold text-primary md:text-5xl">
        SAMMIE SCHMID
      </h1>
      <p className="text-xs uppercase tracking-[0.25em] text-muted">
        Systems, Data, Momentum
      </p>
    </div>
  </div>
);

const Header = () => (
  <header className="fixed top-0 z-40 w-full border-b border-subtle bg-[#050507]/95 backdrop-blur">
    <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-3 md:flex-row md:items-center md:justify-between md:px-6">
      <div className="flex items-center gap-4">
        <div className="relative h-12 w-12 overflow-hidden rounded-full border border-subtle bg-surface-soft">
          <Image
            src="/profile.jpg"
            alt="Samantha Schmid"
            width={96}
            height={96}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <h1 className="font-display text-xl font-semibold text-primary">
            Samantha Schmid
          </h1>
          <p className="text-sm text-muted">Systems engineer & builder</p>
        </div>
      </div>
      <nav className="flex flex-wrap items-center gap-3 text-xs font-medium text-primary md:text-sm">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-full px-3 py-1 transition hover:bg-surface-soft hover:text-primary"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  </header>
);

const Hero = () => (
  <section id="hero" className="grid gap-10 pt-10 lg:grid-cols-[1.2fr_0.8fr]">
    <div className="space-y-6">
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-soft">
        Samantha Schmid
      </p>
      <div className="rounded-3xl border border-subtle bg-surface p-8">
        <h2 className="font-display text-4xl font-semibold tracking-tight text-primary md:text-[3.25rem]">
          Samantha Schmid
        </h2>
        <div className="mt-6 space-y-1 text-sm text-muted md:text-base">
          <p>Arizona State University</p>
          <p>BSE in Mechanical Engineering (2022 - 2025)</p>
          <p>MS in Business Analytics (2026 - 2027)</p>
        </div>
        <p className="mt-6 max-readable text-sm leading-relaxed text-muted md:text-base">
          {introParagraph}
        </p>
      </div>
    </div>
    <div className="rounded-[1.75rem] border border-subtle bg-surface p-6">
      <div className="flex items-center gap-3">
        <div className="relative h-14 w-14 overflow-hidden rounded-2xl border border-subtle bg-surface-soft">
          <Image
            src="/profile.jpg"
            alt="Samantha Schmid"
            width={88}
            height={88}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-soft">
            Snapshot
          </p>
          <p className="text-base font-semibold text-primary">
            Systems-minded builder
          </p>
        </div>
      </div>
      <div className="mt-6 space-y-5">
        <SnapshotList label="Degrees" items={heroSnapshot.degrees} />
        <SnapshotList label="Recent Roles" items={heroSnapshot.roles} />
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-soft">
            Badges
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {heroSnapshot.badges.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-subtle px-3 py-1 text-xs font-medium text-muted"
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
  <section id="employment" className="space-y-8">
    <SectionTitle eyebrow="Professional Experience" title="Employment" />
    <div className="grid gap-8 lg:grid-cols-2">
      {employmentHistory.map((job) => (
        <ExperienceCard key={job.role} job={job} />
      ))}
    </div>
  </section>
);

const ExperienceCard = ({ job }) => (
  <details className="group rounded-[1.75rem] border border-subtle bg-surface p-6" open>
    <summary className="flex cursor-pointer list-none flex-col gap-2 text-left">
      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-soft">
        <span>{job.dates}</span>
        {job.company && <span className="text-soft">•</span>}
        {job.company && <span className="text-muted">{job.company}</span>}
      </div>
      <h3 className="font-display text-xl font-semibold tracking-tight text-primary">
        {job.role}
      </h3>
    </summary>
    {job.bullets.length > 0 && (
      <ul className="mt-4 space-y-3 text-sm text-muted md:text-base">
        {job.bullets.map((bullet) => (
          <li key={bullet}>• {bullet}</li>
        ))}
      </ul>
    )}
  </details>
);

const Intelligence = () => (
  <section id="intelligence" className="space-y-12">
    <SectionTitle eyebrow="Learning & Skills" title="Intelligence" />
    <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-6">
        {education.map((item) => (
          <EducationCard key={`${item.school}-${item.program}-${item.dates}`} item={item} />
        ))}
      </div>
      <div className="rounded-[1.75rem] border border-subtle bg-surface p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-soft">
          Independent Learning
        </p>
        <div className="mt-6 space-y-6">
          {independentLearning.map((bucket) => (
            <div key={bucket.label} className="rounded-2xl border border-subtle bg-surface-soft p-4">
              <p className="text-sm font-semibold uppercase tracking-[0.1em] text-primary">
                {bucket.label}
              </p>
              <ul className="mt-3 space-y-1 text-sm text-muted">
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
          className="mt-6 inline-flex w-full items-center justify-center rounded-full border border-subtle px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-primary transition hover:bg-surface-soft"
        >
          All Certifications
        </Link>
      </div>
    </div>
  </section>
);

const EducationCard = ({ item }) => (
  <details className="group rounded-[1.75rem] border border-subtle bg-surface p-6" open>
    <summary className="flex cursor-pointer list-none flex-col gap-3 text-left">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-display text-lg font-semibold tracking-tight text-primary">
          {item.school}
        </h3>
        <span className="text-xs font-medium uppercase tracking-[0.12em] text-soft">
          {item.dates}
        </span>
      </div>
      {item.program && (
        <p className="text-sm text-muted">{item.program}</p>
      )}
    </summary>
    {item.detail && <p className="mt-3 text-sm text-soft">{item.detail}</p>}
    {item.detailLink && (
      <Link
        href={item.detailLink}
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-flex items-center gap-2 rounded-full border border-subtle px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-primary transition hover:bg-surface-soft"
      >
        Major Map ↗
      </Link>
    )}
  </details>
);

const Projects = () => (
  <section id="projects" className="space-y-8">
    <SectionTitle eyebrow="Builds In Progress" title="Projects" />
    <div className="grid gap-8 md:grid-cols-3">
      {projects.map((project) => (
        <article
          key={project.title}
          className="rounded-[1.6rem] border border-subtle bg-surface p-5"
        >
          <h3 className="font-display text-xl font-semibold tracking-tight text-primary">
            {project.title}
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-muted md:text-base">
            {project.bullets.map((bullet) => (
              <li key={bullet}>• {bullet}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  </section>
);

const Resume = () => (
  <section id="resume" className="space-y-8">
    <SectionTitle
      eyebrow="One Page"
      title="Resume"
      description="This page expands on highlights; download my Resume for the full story."
    />
    <div className="flex flex-col gap-6 md:flex-row md:items-start">
      <p className="text-sm text-muted md:w-1/2">
        This site expands on highlights and the full one-page resume can be
        downloaded anytime.
      </p>
      <Link
        href="/resume.pdf"
        className="inline-flex items-center justify-center rounded-full border border-subtle px-6 py-3 text-sm font-semibold text-primary transition hover:bg-surface-soft"
      >
        Download my Resume ⬇
      </Link>
    </div>
    <div className="mt-2 rounded-[2rem] border-2 border-dashed border-subtle bg-surface p-12 text-center text-xs uppercase tracking-[0.1em] text-soft">
      Resume preview placeholder
    </div>
  </section>
);

const LifeResume = () => (
  <section id="life-resume" className="space-y-10">
    <SectionTitle eyebrow="Beyond Work" title="Life Resume" />
    <div className="rounded-[1.75rem] border border-subtle bg-surface p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-soft">
        Travel + Milestones
      </p>
      <div className="mt-4 flex gap-4 overflow-x-auto pb-2">
        {lifeMoments.map((moment) => (
          <LifeMoment key={moment} label={moment} />
        ))}
      </div>
    </div>
    <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
      <article className="rounded-[1.75rem] border border-subtle bg-surface p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-soft">
          Favorite Book
        </p>
        <h3 className="mt-3 font-display text-2xl font-semibold text-primary">
          {favoriteBook.title}
        </h3>
        <p className="text-sm text-soft">{favoriteBook.author}</p>
        <p className="mt-3 max-readable text-sm leading-relaxed text-muted">
          {favoriteBook.description}
        </p>
      </article>
      <div className="rounded-[1.75rem] border border-subtle bg-surface p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-soft">
          Favorites
        </p>
        <div className="mt-4 space-y-3">
          {favorites.map((fav) => (
            <details key={fav.label} className="rounded-xl border border-subtle bg-surface-soft p-4">
              <summary className="cursor-pointer text-sm font-semibold text-primary">
                {fav.label}
              </summary>
              <p className="mt-3 text-sm text-muted">{fav.value}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const LifeMoment = ({ label }) => (
  <div className="group relative min-w-[180px] rounded-2xl border border-subtle bg-surface-soft p-4 text-center text-sm font-semibold tracking-wide text-primary transition hover:-translate-y-1 hover:bg-surface">
    {label}
  </div>
);

const Contact = () => (
  <section id="contact" className="space-y-6">
    <SectionTitle eyebrow="Let's Connect" title="Contact" />
    <p className="max-readable text-sm text-muted md:text-base">
      Reach out for roles that blend engineering, analytics, and product
      building.
    </p>
    <div className="flex flex-wrap gap-4">
      <Link
        href="mailto:sammieschmid22@gmail.com"
        className="inline-flex items-center justify-center rounded-full border border-subtle bg-surface-soft px-6 py-3 text-sm font-semibold text-primary transition hover:bg-surface"
      >
        Email me
      </Link>
      <Link
        href="https://www.linkedin.com/in/samantha-schmid/"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center justify-center rounded-full border border-subtle px-6 py-3 text-sm font-semibold text-primary transition hover:bg-surface-soft"
      >
        View LinkedIn
      </Link>
    </div>
  </section>
);

const SectionTitle = ({ eyebrow, title, description }) => (
  <div className="space-y-2">
    {eyebrow && (
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-soft">
        {eyebrow}
      </p>
    )}
    <h2 className="font-display text-3xl font-semibold tracking-tight text-primary md:text-[2.1rem]">
      {title}
    </h2>
    {description && description.length > 0 && (
      <p className="max-readable text-sm text-muted md:text-base">{description}</p>
    )}
  </div>
);

const SnapshotList = ({ label, items }) => (
  <div>
    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-soft">
      {label}
    </p>
    <ul className="mt-2 space-y-1 text-sm text-muted">
      {items.map((item) => (
        <li key={item}>• {item}</li>
      ))}
    </ul>
  </div>
);
