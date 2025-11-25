"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Anton } from "next/font/google";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
});

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
    "MS in Business Analytics (2026 - 2027)",
    "BSE in Mechanical Engineering (2022 - 2025)",
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

const independentLearning = [
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

// Replace placeholder image paths below with actual project thumbnails.
const projects = [
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

// Replace /images/life/... placeholders below with real travel photos when available.
const travelLocations = [
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

const lifeMilestones = [
  {
    label: "29029 Everesting",
    image: "/images/29029.jpg",
    href: "https://29029everesting.com/?srsltid=AfmBOooOYDLGMXVFOuWrCgwgLr3e3LD8Gg9w7HsU8tsfllLsszOiPIjH",
  },
  { label: "Skiing / Snow", image: "/images/canada.JPG" },
  { label: "Volleyball", image: "/images/vball.jpg" },
];

const favoriteBook = {
  title: "I Will Teach You To Be Rich",
  author: "Ramit Sethi",
};

const favorites = [
  { label: "Favorite Game", value: "Chess" },
  { label: "Favorite Music", value: "House Music" },
  { label: "Favorite TV Show", value: "Prison Break" },
  { label: "Favorite Movie", value: "21" },
  {
    label: "Favorite Book",
    value: `${favoriteBook.title} by ${favoriteBook.author}`,
  },
];

const introParagraph =
  "I am Sammie Schmid. I see patterns where others see problems, and I build order that lasts. Chaos has its beauty. It's the invitation to fix things. I learn fast, think in systems, and create processes that make life safer, smarter, and more efficient. Order isn't found; it's made.";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [fadeOutSplash, setFadeOutSplash] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOutSplash(true), 1200);
    const hideTimer = setTimeout(() => setShowSplash(false), 1800);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.35, rootMargin: "-20% 0px -20% 0px" }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-body text-primary">
      {showSplash && <SplashScreen fadeOut={fadeOutSplash} />}
      <Header activeSection={activeSection} />
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

const SplashScreen = ({ fadeOut }) => (
  <div
    className={`fixed inset-0 z-50 flex items-center justify-center bg-body transition-opacity duration-500 ${
      fadeOut ? "opacity-0" : "opacity-100"
    }`}
  >
    <div className="flex flex-col items-center gap-4">
      <h1 className="font-display text-5xl font-semibold uppercase tracking-[0.06em] text-accent drop-shadow-[0_0_25px_rgba(255,255,255,0.5)] drop-shadow-[0_0_25px_rgba(56,189,248,0.45)] md:text-6xl">
        Samantha Schmid
      </h1>
      <div className="h-0.5 w-24 rounded-full bg-accent/80 animate-pulse" />
    </div>
  </div>
);

const Header = ({ activeSection }) => (
  <header className="fixed top-0 z-40 w-full border-b border-accent/40 bg-[#050507]/95 backdrop-blur">
    <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 md:flex-row md:items-center md:justify-between md:px-6 lg:max-w-7xl">
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20 overflow-hidden rounded-full border border-accent/60 bg-surface-soft shadow-[0_0_18px_rgba(56,189,248,0.25)] md:h-24 md:w-24">
          <Image
            src="/images/profile.png"
            alt="Samantha Schmid"
            width={200}
            height={200}
            className="h-full w-full origin-[50%_42%] scale-[1.6] object-cover object-[50%_42%]"
          />
        </div>
        <div>
          <h1 className="font-display text-base font-semibold uppercase tracking-[0.06em] text-primary md:text-lg">
            Samantha Schmid
          </h1>
        </div>
      </div>
      <nav
        className={`${anton.className} flex w-full flex-wrap items-center gap-5 px-2 text-lg uppercase text-primary md:text-xl`}
      >
        {navItems.map((item) => {
          const sectionId = item.href.replace("#", "");
          const isActive = activeSection === sectionId;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-3 py-1 transition ${
                isActive ? "text-accent" : "text-primary/70"
              } hover:bg-surface-soft hover:text-accent whitespace-nowrap`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  </header>
);

const Hero = () => (
  <section id="hero" className="grid gap-10 pt-16 lg:grid-cols-2">
    <div className="space-y-6">
      <div className="flex h-full flex-col rounded-3xl border border-accent/30 bg-surface p-8 shadow-[0_0_25px_rgba(56,189,248,0.12)]">
        <p className="max-readable text-base leading-relaxed text-muted md:text-lg">
          {introParagraph}
        </p>
      </div>
    </div>
    <div className="flex h-full flex-col rounded-[1.75rem] border border-accent/30 bg-surface p-6 shadow-[0_0_25px_rgba(56,189,248,0.12)]">
      <div className="flex items-center gap-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-subtle bg-surface-soft text-2xl text-accent">
          ✦
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-soft">
            Snapshot
          </p>
          <p className="text-base font-semibold text-accent">
            Systems Builder
          </p>
        </div>
      </div>
      <div className="mt-6 space-y-5">
        <SnapshotList label="Degrees" items={heroSnapshot.degrees} />
        <SnapshotList label="Recent Roles" items={heroSnapshot.roles} />
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-soft">
            Focus Areas
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {heroSnapshot.badges.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-accent bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-accent"
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
    <SectionTitle title="Employment" />
    <div className="grid gap-8 lg:grid-cols-2">
      {employmentHistory.map((job) => (
        <ExperienceCard key={job.role} job={job} />
      ))}
    </div>
  </section>
);

const ExperienceCard = ({ job }) => (
  <details className="group rounded-[1.75rem] border border-accent/30 bg-surface p-6 shadow-[0_0_22px_rgba(56,189,248,0.08)] transition hover:border-accent" open>
    <summary className="flex cursor-pointer list-none flex-col gap-2 text-left">
      <h3 className="font-display text-base font-semibold uppercase tracking-[0.08em] text-primary md:text-lg">
        {job.role}
      </h3>
      {job.company && (
        <p className="font-display text-sm uppercase tracking-[0.08em] text-accent">
          {job.company}
        </p>
      )}
      <p className="text-sm font-medium text-soft">{job.dates}</p>
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
    <SectionTitle title="Intelligence" />
    <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-6">
        {education.map((item) => (
          <EducationCard key={`${item.school}-${item.program}-${item.dates}`} item={item} />
        ))}
      </div>
      <div className="rounded-[1.75rem] border border-accent/30 bg-surface p-6 shadow-[0_0_22px_rgba(56,189,248,0.08)]">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">
          Independent Learning
        </p>
        <div className="mt-6 space-y-6">
          {independentLearning.map((bucket) => (
            <div key={bucket.label} className="rounded-2xl border border-accent/25 bg-surface-soft p-4 shadow-[0_0_18px_rgba(56,189,248,0.07)]">
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
          href="https://drive.google.com/drive/folders/1OYvqiph0WnRPXoFnaMCaLXZ1WyeqElvf?usp=sharing"
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex w-full items-center justify-center rounded-full border border-accent px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-accent transition hover:bg-accent/10"
        >
          All Certifications
        </Link>
      </div>
    </div>
  </section>
);

const EducationCard = ({ item }) => (
  <details className="group rounded-[1.75rem] border border-accent/30 bg-surface p-6 shadow-[0_0_22px_rgba(56,189,248,0.08)] transition hover:border-accent" open>
    <summary className="flex cursor-pointer list-none flex-col gap-3 text-left">
      <h3 className="font-display text-base font-semibold uppercase tracking-[0.08em] text-primary md:text-lg">
        {item.school}
      </h3>
      {item.program && (
        <p className="text-base font-semibold text-primary">{item.program}</p>
      )}
      <p className="text-xs font-medium uppercase tracking-[0.12em] text-soft">
        {item.dates}
      </p>
    </summary>
    {item.gpa && <p className="mt-2 text-sm text-soft">{item.gpa}</p>}
    {item.detailLink && (
      <Link
        href={item.detailLink}
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-flex items-center gap-2 rounded-full border border-accent px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-accent transition hover:bg-accent/10"
      >
        Major Map ↗
      </Link>
    )}
  </details>
);

const Projects = () => (
  <section id="projects" className="space-y-8">
    <SectionTitle title="Projects" />
    <div className="grid gap-10 md:grid-cols-2">
      {projects.map((project) => (
        <article
          key={project.title}
          className="rounded-[1.6rem] border border-accent/30 bg-surface p-5 shadow-[0_0_22px_rgba(56,189,248,0.08)] transition hover:border-accent"
        >
          {project.image && (
            <div
              className={`mb-4 flex h-48 w-full items-center justify-center overflow-hidden rounded-2xl bg-surface-soft ${
                project.imageFit === "contain" ? "p-4" : ""
              }`}
            >
              <Image
                src={project.image}
                alt={project.title}
                width={640}
                height={360}
                className={
                  project.imageFit === "contain"
                    ? "h-full w-full object-contain"
                    : "h-full w-full object-cover"
                }
              />
            </div>
          )}
          <h3 className="font-display text-lg font-semibold uppercase tracking-[0.08em] text-primary">
            {project.title}
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-muted md:text-base">
            {project.bullets.map((bullet) => (
              <li key={bullet}>• {bullet}</li>
            ))}
          </ul>
          {project.links && project.links.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-3">
              {project.links.map((projectLink) => {
                const isExternal =
                  projectLink.external ||
                  projectLink.href.startsWith("http://") ||
                  projectLink.href.startsWith("https://");
                return (
                  <Link
                    key={`${project.title}-${projectLink.href}`}
                    href={projectLink.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noreferrer" : undefined}
                    className="inline-flex items-center gap-2 rounded-full border border-accent px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-accent transition hover:bg-accent/10"
                  >
                    {projectLink.label}
                    <span aria-hidden="true">↗</span>
                  </Link>
                );
              })}
            </div>
          )}
        </article>
      ))}
    </div>
  </section>
);

const Resume = () => (
  <section id="resume" className="space-y-8">
    <SectionTitle title="Resume" />
    <div className="flex flex-col gap-3 text-sm text-muted md:flex-row md:items-center md:gap-6 md:text-base">
      <p className="max-readable">
        Download my one-page resume for a concise view of my experience.
      </p>
      <Link
        href="/docs/resume.pdf"
        className="inline-flex items-center justify-center rounded-full border border-accent px-6 py-3 text-sm font-semibold text-primary transition hover:bg-accent/10"
      >
        Download my Resume ⬇
      </Link>
    </div>
  </section>
);

const LifeResume = () => {
  const [openFavorite, setOpenFavorite] = useState(null);

  return (
    <section id="life-resume" className="space-y-10">
      <SectionTitle title="Life Resume" />
      <div className="rounded-[1.75rem] border border-accent/30 bg-surface p-6 shadow-[0_0_22px_rgba(56,189,248,0.08)]">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">
          Travel
        </p>
        <div className="mt-4 flex gap-4 overflow-x-auto pb-2 pt-4">
          {travelLocations.map((location) => (
            <LifeMoment key={location.label} {...location} />
          ))}
        </div>
        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.15em] text-accent">
          Milestones
        </p>
        <div className="mt-4 flex gap-4 overflow-x-auto pb-2 pt-4">
          {lifeMilestones.map((moment) => (
            <LifeMoment key={moment.label} {...moment} />
          ))}
        </div>
      </div>
      <div className="space-y-6">
        <article className="rounded-[1.75rem] border border-accent/30 bg-surface p-6 text-sm text-muted shadow-[0_0_22px_rgba(56,189,248,0.08)]">
          Beyond work, I chase altitude, endurance, and stories worth retelling.
        </article>
        <div className="rounded-[1.75rem] border border-accent/30 bg-surface p-6 shadow-[0_0_22px_rgba(56,189,248,0.08)]">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">
          Favorites
        </p>
          <div className="mt-4 space-y-3">
            {favorites.map((fav, idx) => (
              <div key={fav.label} className="rounded-xl border border-accent/25 bg-surface-soft px-4 py-3 shadow-[0_0_18px_rgba(56,189,248,0.07)]">
                <button
                  type="button"
                  className="flex w-full items-center justify-between text-left text-sm font-semibold text-primary"
                  onClick={() => setOpenFavorite(openFavorite === idx ? null : idx)}
                >
                  <span>{fav.label}</span>
                  <span className="text-accent">{openFavorite === idx ? "–" : "+"}</span>
                </button>
                {openFavorite === idx && (
                  <p className="mt-3 text-sm text-muted">{fav.value}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const LifeMoment = ({ label, image, href }) => {
  const baseClasses =
    "group flex min-w-[190px] flex-col gap-3 rounded-2xl border border-accent/25 bg-surface-soft p-4 text-center text-sm font-semibold text-primary transition hover:-translate-y-1 hover:border-accent hover:bg-surface";
  const content = (
    <>
      {image && (
        <div className="h-24 w-full overflow-hidden rounded-xl bg-surface">
          <Image
            src={image}
            alt={label}
            width={320}
            height={180}
            className="h-full w-full object-cover"
          />
        </div>
      )}
      <p className="text-sm font-semibold text-primary">{label}</p>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        target="_blank"
        rel="noreferrer"
        className={`${baseClasses} hover:text-accent`}
      >
        {content}
      </Link>
    );
  }

  return <div className={baseClasses}>{content}</div>;
};

const Contact = () => (
  <section id="contact" className="space-y-6">
    <SectionTitle title="Contact" />
    <p className="max-readable text-sm text-muted md:text-base">
      Reach out for roles that blend engineering, analytics, and product
      building.
    </p>
    <div className="flex flex-wrap gap-4">
      <Link
        href="mailto:sammieschmid22@gmail.com"
        className="inline-flex items-center justify-center rounded-full border border-accent bg-accent px-6 py-3 text-sm font-semibold text-[#050507] transition hover:bg-accent/90"
      >
        Email me
      </Link>
      <Link
        href="https://www.linkedin.com/in/samantha-schmid/"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center justify-center rounded-full border border-accent px-6 py-3 text-sm font-semibold text-primary transition hover:bg-accent/10"
      >
        View LinkedIn
      </Link>
    </div>
  </section>
);

const SectionTitle = ({ title, description }) => (
  <div className="space-y-3">
    <h2 className="font-display text-3xl font-semibold uppercase tracking-[0.06em] text-accent md:text-[2.1rem]">
      {title}
    </h2>
    <div className="h-px w-12 bg-accent" />
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
