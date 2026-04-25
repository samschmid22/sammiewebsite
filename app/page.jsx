"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Anton } from "next/font/google";
import {
  introParagraph,
  heroSnapshot,
  employmentHistory,
  education,
  independentLearning,
  projects,
  travelLocations,
  lifeMilestones,
  favorites,
} from "@/data/siteContent";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
});

const navItems = [
  { label: "Home", href: "#hero" },
  { label: "Employment", href: "#employment" },
  { label: "Intelligence", href: "#intelligence" },
  { label: "Projects", href: "#projects" },
  { label: "Life Resume", href: "#life-resume" },
];

const RESUME_FILE_HREF = "/docs/resume.pdf?v=20260415";

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
    <div className="page-shell min-h-screen bg-body text-primary">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <span className="ambient-orb ambient-orb-left" />
        <span className="ambient-orb ambient-orb-right" />
        <span className="ambient-orb ambient-orb-bottom" />
      </div>
      {showSplash && <SplashScreen fadeOut={fadeOutSplash} />}
      <div
        className={`transition-opacity duration-700 ${
          showSplash ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <Header activeSection={activeSection} />
        <main className="mx-auto max-w-6xl space-y-20 px-4 pb-28 pt-40 md:px-6 md:pt-44 lg:pt-48">
          <Hero />
          <Employment />
          <Intelligence />
          <Projects />
          <LifeResume />
        </main>
      </div>
      <AIChatWidget />
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
      <h1 className="text-center font-display text-5xl font-semibold uppercase tracking-[0.06em] text-accent drop-shadow-[0_0_25px_rgba(255,255,255,0.5)] drop-shadow-[0_0_25px_rgba(56,189,248,0.45)] md:text-6xl">
        Samantha Schmid
      </h1>
      <div className="line-track">
        <span className="line-runner" />
      </div>
    </div>
  </div>
);

const Header = ({ activeSection }) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const toggleMobileNav = () => setMobileNavOpen((prev) => !prev);
  const closeMobileNav = () => setMobileNavOpen(false);

  const renderNavLink = (item, extraClasses = "", onClick) => {
    const sectionId = item.href.replace("#", "");
    const isActive = activeSection === sectionId;
    return (
      <Link
        key={`${item.href}-${extraClasses}`}
        href={item.href}
        onClick={onClick}
        className={`whitespace-nowrap rounded-full border px-3 py-2 text-[18px] font-light uppercase tracking-[0.07em] transition ${
          isActive
            ? "border-accent/70 bg-accent/15 text-accent shadow-[0_0_20px_rgba(94,209,255,0.18)]"
            : "border-transparent text-primary/80 hover:border-accent/40 hover:bg-surface-soft hover:text-primary"
        } ${extraClasses}`}
      >
        {item.label}
      </Link>
    );
  };

  return (
    <header className="fixed inset-x-0 top-3 z-40 px-3 md:top-4 md:px-6">
      <div className="mx-auto max-w-7xl rounded-[1.8rem] border border-accent/30 bg-[rgba(16,16,21,0.82)] shadow-[0_24px_60px_rgba(5,7,12,0.65)] backdrop-blur-xl will-change-transform">
        <div className="flex flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-5 md:py-4">
          <div className="flex w-full items-center gap-4 md:w-auto">
            <div className="relative h-[4.5rem] w-[4.5rem] overflow-hidden rounded-full border border-accent/60 bg-surface-soft shadow-[0_0_18px_rgba(56,189,248,0.25)] md:h-24 md:w-24">
              <Image
                src="/images/profile.png"
                alt="Samantha Schmid"
                width={240}
                height={240}
                className="h-full w-full origin-[50%_20%] scale-[1.8] object-cover object-[50%_20%]"
              />
            </div>
            <div>
              <p className="font-display text-[0.95rem] font-semibold uppercase leading-tight tracking-[0.1em] text-primary md:text-[1.12rem]">
                Samantha
                <br />
                Schmid
              </p>
            </div>
            <button
              type="button"
              className="ml-auto inline-flex items-center rounded-full border border-accent/40 px-3.5 py-2 text-sm uppercase tracking-[0.1em] text-primary transition hover:border-accent hover:text-accent md:hidden"
              onClick={toggleMobileNav}
              aria-expanded={mobileNavOpen}
              aria-label="Toggle navigation"
            >
              {mobileNavOpen ? "Close" : "Menu"}
            </button>
          </div>
          <nav className={`${anton.className} hidden w-full items-center justify-end gap-1.5 md:flex md:flex-nowrap`}>
            {navItems.map((item) => renderNavLink(item))}
          </nav>
          {mobileNavOpen && (
            <div className="w-full md:hidden">
              <nav
                className={`${anton.className} glass-panel-soft flex w-full flex-col gap-2 px-4 py-4 text-base uppercase text-primary`}
              >
                {navItems.map((item) =>
                  renderNavLink(item, "w-full text-center text-base", closeMobileNav)
                )}
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

const Hero = () => (
  <section
    id="hero"
    className="grid gap-8 scroll-mt-40 pt-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch"
  >
    <div className="glass-panel flex h-full flex-col p-8 md:p-10">
      <p className="max-w-[58ch] text-[1.03rem] leading-[1.9] text-muted md:text-[1.12rem]">
        {introParagraph}
      </p>
    </div>
    <div className="glass-panel flex h-full flex-col p-6 md:p-7">
      <div className="flex items-center gap-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-subtle bg-surface-soft text-2xl text-accent shadow-[0_0_20px_rgba(56,189,248,0.2)]">
          ✦
        </div>
        <div>
          <p className="text-[0.82rem] font-semibold uppercase tracking-[0.12em] text-soft">
            Snapshot
          </p>
          <p className="text-[1.06rem] font-semibold text-accent">Systems Builder</p>
        </div>
      </div>
      <div className="mt-6 space-y-5">
        <SnapshotList label="Degrees" items={heroSnapshot.degrees} />
        <SnapshotList label="Recent Roles" items={heroSnapshot.roles} />
        <div>
          <p className="text-[0.82rem] font-semibold uppercase tracking-[0.12em] text-soft">
            Focus Areas
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {heroSnapshot.badges.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-accent bg-accent/10 px-3 py-1 text-[0.82rem] font-semibold uppercase tracking-[0.08em] text-accent"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
    <div className="lg:col-span-2 flex flex-wrap justify-center gap-3 md:gap-4">
      <Link
        href="#projects"
        className="inline-flex items-center justify-center rounded-full border border-accent bg-accent px-7 py-3.5 text-[0.82rem] font-semibold uppercase tracking-[0.11em] text-[#050507] shadow-[0_10px_30px_rgba(5,7,12,0.45)] transition hover:bg-accent/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        See Projects
      </Link>
      <Link
        href={RESUME_FILE_HREF}
        className="inline-flex items-center justify-center rounded-full border border-accent bg-surface-soft px-7 py-3.5 text-[0.82rem] font-semibold uppercase tracking-[0.11em] text-primary shadow-[0_10px_30px_rgba(5,7,12,0.45)] transition hover:bg-accent/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        Download Resume
      </Link>
      <Link
        href="mailto:sammieschmid22@gmail.com"
        className="inline-flex items-center justify-center rounded-full border border-accent bg-surface-soft px-7 py-3.5 text-[0.82rem] font-semibold uppercase tracking-[0.11em] text-primary shadow-[0_10px_30px_rgba(5,7,12,0.45)] transition hover:bg-accent/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        Email Me
      </Link>
      <Link
        href="https://www.linkedin.com/in/samanthaschmid2/"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-full border border-accent bg-surface-soft px-7 py-3.5 text-[0.82rem] font-semibold uppercase tracking-[0.11em] text-primary shadow-[0_10px_30px_rgba(5,7,12,0.45)] transition hover:bg-accent/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        LinkedIn
        <span aria-hidden="true">↗</span>
      </Link>
      <Link
        href="https://github.com/samschmid22"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-full border border-accent bg-surface-soft px-7 py-3.5 text-[0.82rem] font-semibold uppercase tracking-[0.11em] text-primary shadow-[0_10px_30px_rgba(5,7,12,0.45)] transition hover:bg-accent/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        GitHub
        <span aria-hidden="true">↗</span>
      </Link>
    </div>
  </section>
);

const Employment = () => (
  <section id="employment" className="space-y-8 scroll-mt-40">
    <SectionTitle title="Employment" />
    <div className="grid gap-6 lg:grid-cols-2">
      {employmentHistory.map((job) => (
        <ExperienceCard key={job.role} job={job} />
      ))}
    </div>
  </section>
);

const ExperienceCard = ({ job }) => (
  <div className="glass-panel glass-panel-hover p-6 md:p-7">
    <div className="flex flex-col gap-2 text-left">
      <h3 className="font-display text-[0.9rem] font-semibold uppercase leading-tight tracking-[0.07em] text-primary sm:text-[0.96rem] md:overflow-hidden md:text-ellipsis md:whitespace-nowrap md:text-[1rem] lg:text-[1.04rem]">
        {job.role}
      </h3>
      {job.company && (
        <p className="font-display text-[0.82rem] font-semibold uppercase tracking-[0.07em] text-accent sm:text-[0.86rem]">
          {job.company}
        </p>
      )}
      <p className="text-[0.94rem] font-medium text-soft">{job.dates}</p>
    </div>
    {job.bullets.length > 0 && (
      <ul className="mt-4 space-y-3 text-[0.94rem] text-muted md:text-[1.06rem]">
        {job.bullets.map((bullet) => (
          <li key={bullet}>• {bullet}</li>
        ))}
      </ul>
    )}
  </div>
);

const Intelligence = () => (
  <section id="intelligence" className="space-y-10 scroll-mt-40">
    <SectionTitle title="Intelligence" />
    <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-5">
        {education.map((item) => (
          <EducationCard key={`${item.school}-${item.program}-${item.dates}`} item={item} />
        ))}
      </div>
      <div className="space-y-5">
        <div className="glass-panel p-6">
          <p className="text-[0.82rem] font-semibold uppercase tracking-[0.15em] text-accent">
            Independent Learning
          </p>
          <div className="mt-6 space-y-5">
            {independentLearning.map((bucket) => (
              <div key={bucket.label} className="glass-panel-soft p-4">
                <p className="text-[0.94rem] font-semibold uppercase tracking-[0.1em] text-primary">
                  {bucket.label}
                </p>
                <ul className="mt-3 space-y-1 text-[0.94rem] text-muted">
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
            className="mt-6 inline-flex w-full items-center justify-center rounded-full border border-accent px-5 py-3 text-[0.82rem] font-semibold uppercase tracking-[0.12em] text-accent transition hover:bg-accent/10"
          >
            All Certifications
          </Link>
        </div>
        <FavoritesPanel />
      </div>
    </div>
  </section>
);

const EducationCard = ({ item }) => (
  <details className="glass-panel glass-panel-hover group p-6" open>
    <summary className="flex cursor-pointer list-none flex-col gap-3 text-left">
      <h3 className="font-display text-[0.96rem] font-semibold uppercase leading-tight tracking-[0.08em] text-primary md:text-[1.04rem]">
        {item.school}
      </h3>
      {item.program && <p className="text-[1.06rem] font-semibold text-accent">{item.program}</p>}
      <p className="text-[0.82rem] font-medium uppercase tracking-[0.12em] text-soft">
        {item.dates}
      </p>
    </summary>
    {item.gpa && <p className="mt-2 text-[0.94rem] text-soft">{item.gpa}</p>}
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
  <section id="projects" className="space-y-8 scroll-mt-40">
    <SectionTitle title="Projects" />
    <div className="grid gap-6 md:grid-cols-2">
      {projects.map((project) => {
        const mediaAssets =
          Array.isArray(project.media) && project.media.length > 0
            ? project.media
            : project.image
              ? [{ src: project.image, alt: project.title }]
              : [];

        const renderMedia = () => {
          if (mediaAssets.length === 0) {
            return (
              <div className="col-span-2 flex h-full w-full items-center justify-center rounded-xl border border-accent/15 text-sm uppercase tracking-[0.15em] text-soft">
                Image coming soon
              </div>
            );
          }

          if (mediaAssets.length === 1) {
            const onlyMedia = mediaAssets[0];
            return (
              <div className="relative col-span-2 overflow-hidden rounded-xl">
                <Image
                  src={onlyMedia.src}
                  alt={onlyMedia.alt ?? project.title}
                  width={960}
                  height={480}
                  className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-[1.03]"
                />
              </div>
            );
          }

          return mediaAssets.slice(0, 2).map((media, index) => (
            <div
              key={`${project.title}-media-${media.src}-${index}`}
              className="flex h-full items-center justify-center overflow-hidden rounded-xl border border-accent/15 bg-surface"
            >
              <div className="relative h-full aspect-[9/19.5] overflow-hidden rounded-[0.8rem]">
                <Image
                  src={media.src}
                  alt={media.alt ?? `${project.title} screenshot ${index + 1}`}
                  width={360}
                  height={780}
                  className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-[1.03]"
                />
              </div>
            </div>
          ));
        };

        return (
          <article
            key={project.title}
            className="glass-panel glass-panel-hover group flex h-full flex-col p-5 md:p-6"
          >
            <div className="mb-4 w-full overflow-hidden rounded-2xl border border-accent/20 bg-surface-soft shadow-[inset_0_0_26px_rgba(56,189,248,0.08)]">
              <div className="grid aspect-[2/1] grid-cols-2 gap-2 p-2">{renderMedia()}</div>
            </div>
            <h3 className="font-display text-[0.96rem] font-semibold uppercase leading-tight tracking-[0.08em] text-primary md:text-[1.01rem]">
              {project.title}
            </h3>
            {project.hook && (
              <p className="mt-1.5 text-[0.84rem] font-medium leading-relaxed text-accent">
                {project.hook}
              </p>
            )}
            {project.bullets && project.bullets.length > 0 && (
              <ul className="mt-2.5 space-y-1 text-[0.84rem] leading-relaxed text-muted">
                {project.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2">
                    <span className="pt-[0.2rem] text-[0.5rem] text-accent">●</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            )}
            {project.links && project.links.length > 0 && (
              <div className="mt-auto flex flex-wrap gap-2 pt-3.5">
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
                      className="inline-flex items-center gap-2 rounded-full border border-accent px-3.5 py-2 text-[0.74rem] font-semibold uppercase tracking-[0.1em] text-accent transition hover:bg-accent/10"
                    >
                      {projectLink.label}
                      <span aria-hidden="true">↗</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </article>
        );
      })}
    </div>
  </section>
);

const LifeResume = () => (
  <section id="life-resume" className="space-y-8 scroll-mt-40">
    <SectionTitle title="Life Resume" />
    <div className="glass-panel p-6">
      <p className="text-[0.82rem] font-semibold uppercase tracking-[0.15em] text-accent">Travel</p>
      <div className="mt-4 flex gap-4 overflow-x-auto pb-2 pt-4">
        {travelLocations.map((location) => (
          <LifeMoment key={location.label} {...location} />
        ))}
      </div>
      <p className="mt-8 text-[0.82rem] font-semibold uppercase tracking-[0.15em] text-accent">
        Milestones
      </p>
      <div className="mt-4 flex gap-4 overflow-x-auto pb-2 pt-4">
        {lifeMilestones.map((moment) => (
          <LifeMoment key={moment.label} {...moment} />
        ))}
      </div>
    </div>
    <article className="glass-panel p-6 text-[0.94rem] text-muted">
      Beyond work, I chase altitude, endurance, and stories worth retelling.
    </article>
  </section>
);

const FavoritesPanel = () => {
  const [openFavorite, setOpenFavorite] = useState(null);

  return (
    <div className="glass-panel p-6">
      <p className="text-[0.82rem] font-semibold uppercase tracking-[0.15em] text-accent">
        Favorites
      </p>
      <div className="mt-4 space-y-3">
        {favorites.map((fav, idx) => (
          <div key={fav.label} className="glass-panel-soft px-4 py-3">
            <button
              type="button"
              className="flex w-full items-center justify-between text-left text-[0.94rem] font-semibold text-primary"
              onClick={() => setOpenFavorite(openFavorite === idx ? null : idx)}
            >
              <span>{fav.label}</span>
              <span className="text-accent">{openFavorite === idx ? "–" : "+"}</span>
            </button>
            {openFavorite === idx && (
              <p className="mt-3 text-[0.94rem] text-muted">{fav.value}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const LifeMoment = ({ label, image, href }) => {
  const baseClasses =
    "glass-panel-soft group flex w-[190px] flex-shrink-0 flex-col gap-3 p-4 text-center text-[0.94rem] font-semibold text-primary transition hover:-translate-y-1 hover:border-accent hover:bg-surface";

  const content = (
    <>
      {image && (
        <div className="h-24 w-full overflow-hidden rounded-xl border border-accent/20 bg-surface">
          <Image
            src={image}
            alt={label}
            width={320}
            height={180}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
          />
        </div>
      )}
      <p className="text-[0.94rem] font-semibold text-primary">{label}</p>
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

const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const toggleWidget = () => setIsOpen((prev) => !prev);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setMessages((prev) => [...prev, { from: "user", text: userText }]);
    setInput("");
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const serverMessage =
          data && typeof data.error === "string"
            ? data.error
            : "Failed to reach AI assistant.";
        throw new Error(serverMessage);
      }

      setMessages((prev) => [
        ...prev,
        { from: "ai", text: data.reply ?? "I couldn't generate a response." },
      ]);
    } catch (err) {
      console.error("Chat widget error:", err);
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-3">
      {isOpen && (
        <div className="glass-panel w-[22rem] p-4 shadow-[0_18px_50px_rgba(4,8,20,0.62),0_0_28px_rgba(94,209,255,0.12)]">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-[0.82rem] font-semibold uppercase tracking-[0.15em] text-accent">
                AI Assistant
              </p>
              <p className="text-[0.94rem] text-soft">Ask anything about Sammie</p>
            </div>
            <button
              type="button"
              className="rounded-full border border-accent/40 px-2 py-1 text-xs uppercase tracking-[0.1em] text-primary transition hover:border-accent hover:text-accent"
              onClick={toggleWidget}
            >
              Close
            </button>
          </div>
          <div className="mb-3 flex max-h-64 flex-col space-y-3 overflow-y-auto pr-2 text-[0.94rem]">
            {messages.length === 0 && !isLoading && (
              <p className="text-muted">
                Start a conversation to get tailored insights or summaries.
              </p>
            )}
            {messages.map((msg, idx) => (
              <div
                key={`${msg.from}-${idx}`}
                className={`max-w-[85%] w-fit rounded-2xl px-3 py-2 text-left ${
                  msg.from === "user"
                    ? "self-end bg-accent text-[#050507]"
                    : "self-start border border-accent/30 text-primary"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="mr-auto rounded-2xl border border-accent/30 px-3 py-2 text-muted">
                Thinking...
              </div>
            )}
          </div>
          {error && <p className="mb-2 text-[0.82rem] text-red-400">{error}</p>}
          <form className="flex items-end gap-2" onSubmit={handleSubmit}>
            <input
              type="text"
              className="flex-1 rounded-2xl border border-accent/30 bg-surface-soft px-3 py-2 text-[0.94rem] text-primary outline-none transition focus:border-accent"
              placeholder="Ask Sammie's AI..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={600}
              disabled={isLoading}
            />
            <button
              type="submit"
              className="rounded-full bg-accent px-4 py-2 text-[0.82rem] font-semibold uppercase tracking-[0.1em] text-[#050507] transition hover:bg-accent/90 disabled:opacity-60"
              disabled={isLoading}
            >
              Send
            </button>
          </form>
        </div>
      )}
      <button
        type="button"
        onClick={toggleWidget}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-sm font-semibold uppercase tracking-[0.1em] text-[#050507] shadow-[0_12px_35px_rgba(94,209,255,0.45)] transition hover:translate-y-0.5 hover:bg-accent/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        aria-label="Toggle AI assistant"
      >
        AI
      </button>
    </div>
  );
};

const SectionTitle = ({ title, description }) => (
  <div className="space-y-3">
    <div className="flex items-center gap-4">
      <h2 className="font-display text-3xl font-semibold uppercase tracking-[0.06em] text-accent md:text-[2.1rem]">
        {title}
      </h2>
      <div className="h-px flex-1 bg-gradient-to-r from-accent/80 via-accent/20 to-transparent" />
    </div>
    {description && description.length > 0 && (
      <p className="max-readable text-sm text-muted md:text-base">{description}</p>
    )}
  </div>
);

const SnapshotList = ({ label, items }) => (
  <div>
    <p className="text-[0.82rem] font-semibold uppercase tracking-[0.15em] text-soft">{label}</p>
    <ul className="mt-2 space-y-1 text-[0.94rem] text-muted">
      {items.map((item) => (
        <li key={item}>• {item}</li>
      ))}
    </ul>
  </div>
);
