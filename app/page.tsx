"use client";

import { useEffect, useState } from "react";

type Project = {
  number: string;
  title: string;
  year: string;
  category: string;
  description: string;
  challenge: string;
  built: string;
  learned: string;
  tags: string[];
  palette: string;
  mediaLabel: string;
};

// Edit this list to add a project. Replace each project's CSS placeholder with an image or video when ready.
const projects: Project[] = [
  { number: "01", title: "Smart Putting Simulator", year: "2025", category: "INTERACTIVE SYSTEM", description: "A camera-tracked putting simulator that turns practice into projected games, responsive courses, and a little friendly competition.", challenge: "Make putting practice feel less like repetition and more like play without adding friction to the first swing.", built: "A vision pipeline tracks the ball while a Python game layer maps real putting into projected environments.", learned: "The most persuasive interaction is often the one people understand before you explain it.", tags: ["Computer Vision", "Python", "Pygame", "Prototyping"], palette: "putting", mediaLabel: "PUT DEMO VIDEO HERE" },
  { number: "02", title: "CNC Massage Robot", year: "2024", category: "MOTION EXPERIMENT", description: "A programmable XY motion platform built to explore repeatable massage patterns through custom mechanics and motion control.", challenge: "Translate something deeply human and tactile into a safe, adjustable mechanical motion system.", built: "A custom gantry, motor controls, and software interface designed around smooth movement and quick adjustment.", learned: "The best mechanism is only half the project—the human interface is where it becomes useful.", tags: ["Mechanical Design", "CNC", "Motion Control", "Fabrication"], palette: "robot", mediaLabel: "PUT DEMO VIDEO HERE" },
  { number: "03", title: "Needlepoint Canvas Printer", year: "2025", category: "PRODUCT DEVELOPMENT", description: "A purpose-built printing and alignment system for accurately placing artwork on needlepoint canvas.", challenge: "Make a delicate, variable material behave predictably enough for repeatable, accurate printing.", built: "A calibration workflow, alignment guides, and a production-minded test rig for consistent registration.", learned: "Reliability comes from designing for the messy details, not ignoring them.", tags: ["Printing", "Calibration", "Product Development", "Prototyping"], palette: "printer", mediaLabel: "PROJECT PHOTO" },
  { number: "04", title: "Switchblade Divot Tool", year: "2023", category: "COMPACT MECHANISM", description: "A pocket-sized golf divot tool developed through rapid CAD iterations, printed prototypes, and ergonomic testing.", challenge: "Fit a satisfying deploy-and-lock mechanism into a compact object that feels natural in a pocket and hand.", built: "A series of mechanism studies refined through 3D prints, failure testing, and use-focused geometry changes.", learned: "Small objects amplify every decision—tolerances, textures, and sounds all matter.", tags: ["CAD", "Product Design", "3D Printing", "Mechanisms"], palette: "tool", mediaLabel: "PROJECT PHOTO" },
  { number: "05", title: "Golf Trip Analytics", year: "2024", category: "DIGITAL TOOL", description: "A playful web app that keeps a golf trip moving with live scoring, handicaps, leaderboards, reports, and stats.", challenge: "Turn a complicated spreadsheet ritual into a social object people actually want to check between rounds.", built: "A responsive dashboard with automated calculations, custom reporting, and a clear visual hierarchy.", learned: "Data feels more alive when it gives a group something to react to together.", tags: ["Web Development", "Data", "UI Design", "Automation"], palette: "analytics", mediaLabel: "INTERACTIVE APP PREVIEW" },
];

const process = [
  ["01", "IDEA", "Find a strange problem, a useful annoyance, or an experiment worth chasing."],
  ["02", "PROTOTYPE", "Build the fastest physical version that can prove the important thing."],
  ["03", "TEST", "Break it, measure it, and learn what the real constraints are."],
  ["04", "ITERATE", "Refine the system until it starts to feel like a product."],
];

export default function Home() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <main>
      <nav className="nav" aria-label="Primary navigation">
        <a className="mark" href="#top" aria-label="Jake Burttram home">JB<span>°</span></a>
        <button className="menu-button" aria-expanded={menuOpen} aria-controls="nav-links" onClick={() => setMenuOpen(!menuOpen)}>Menu <span>+</span></button>
        <div id="nav-links" className={`nav-links ${menuOpen ? "open" : ""}`}>
          <a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a><a href="#about" onClick={() => setMenuOpen(false)}>About</a><a href="/assets/Jake-Burttram-Resume.pdf" target="_blank" rel="noreferrer">Resume</a><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </div>
      </nav>

      <section id="top" className="hero">
        <div className="hero-copy">
          <p className="eyebrow">MECHANICAL ENGINEER · CHARLESTON, SC</p>
          <h1>I make <em>ideas</em><br />physical.</h1>
          <p className="hero-intro">I&apos;m Jake, a mechanical engineer who enjoys turning unusual ideas into working prototypes. My projects bring together design, code, electronics, fabrication, and a lot of experiments.</p>
          <div className="hero-actions"><a className="button" href="#projects">View projects <span>↘</span></a><a className="text-link" href="#contact">Get in touch <span>→</span></a></div>
        </div>
        <div className="hero-object" aria-hidden="true"><div className="orbit orbit-a" /><div className="orbit orbit-b" /><div className="machine"><i /><i /><i /><b>JB</b></div><p>WORKING<br />PROTOTYPES<br />ONLY</p><small>X 32.784 · Y 79.940</small></div>
        <div className="scroll-note">SCROLL TO EXPLORE <span>↓</span></div>
      </section>

      <section id="projects" className="projects section">
        <header className="section-heading reveal"><p className="eyebrow">SELECTED WORK / 2023—NOW</p><h2>Things I&apos;ve<br /><em>brought to life.</em></h2><p>Each project starts with a question. The good ones end with something you can touch, test, or play with.</p></header>
        <div className="project-grid">
          {projects.map((project, index) => <article className={`project-card reveal card-${index}`} key={project.title}>
            <button className={`project-media ${project.palette}`} onClick={() => setSelected(project)} aria-label={`Open ${project.title} project`}><span className="project-number">PROJECT {project.number}</span><span className="media-label">{project.mediaLabel}</span><span className="corner-mark">+</span><div className="placeholder-object" /></button>
            <div className="project-info"><div><p className="eyebrow">{project.category} <span>· {project.year}</span></p><h3>{project.title}</h3></div><button className="round-button" onClick={() => setSelected(project)} aria-label={`View ${project.title}`}>↗</button></div><p className="project-description">{project.description}</p><div className="tags">{project.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}</div>
          </article>)}
          <article className="project-card add-card reveal"><div><p className="eyebrow">NEXT EXPERIMENT</p><h3>More in the works.</h3><p>New objects, systems, and useful oddities are always taking shape.</p></div><a href="#contact" className="round-button">→</a></article>
        </div>
      </section>

      <section className="build section"><header className="section-heading reveal"><p className="eyebrow">A REPEATABLE WAY TO MAKE</p><h2>How I <em>build.</em></h2></header><div className="process">{process.map(([num, title, text]) => <article className="process-step reveal" key={title}><span>{num}</span><div className="process-line" /><h3>{title}</h3><p>{text}</p></article>)}</div></section>

      <section className="capabilities section"><div className="capabilities-intro reveal"><p className="eyebrow">COMFORTABLE ACROSS THE BENCH</p><h2>Enough range to connect the <em>dots.</em></h2><p>I like projects that don&apos;t fit cleanly into one box. The fun is in making the mechanical, digital, and human parts work together.</p></div><div className="capability-list reveal"><Capability name="Design" items="Mechanical design|CAD|Product development|Mechanisms|Design for manufacturing" /><Capability name="Build" items="3D printing|CNC|Laser cutting|Fabrication|Rapid prototyping" /><Capability name="Electronics" items="Arduino|Sensors|Motors|Basic circuits|Embedded prototyping" /><Capability name="Software" items="Python|OpenCV|Pygame|HTML/CSS/JavaScript|Automation" /></div></section>

      <section className="current section reveal"><div className="current-media"><p>EXPERIMENT IN PROGRESS</p><div className="current-object"><span /></div></div><div className="current-copy"><p className="eyebrow"><span className="status-dot" /> CURRENTLY BUILDING · PROTOTYPE 03</p><h2>A better way to <em>feel</em> the ball.</h2><p>I&apos;m exploring a golf-training object that blends physical feedback with a few unobtrusive sensors. It&apos;s currently a promising pile of printed parts, test fixtures, and tiny breakthroughs.</p><a className="text-link" href="#contact">Follow along <span>→</span></a></div></section>

      <section id="about" className="about section"><div className="about-photo reveal"><div className="portrait-placeholder"><span>HEADSHOT<br />GOES HERE</span></div><p>JAKE BURTTRAM · MAKER / ENGINEER</p></div><div className="about-copy reveal"><p className="eyebrow">A LITTLE ABOUT ME</p><h2>A practical engineer with a weakness for <em>side quests.</em></h2><p>I&apos;m a mechanical engineer based in Charleston, South Carolina. I&apos;m at my best in the space between a sketch and a working prototype—especially when hardware and software get to collaborate.</p><p>Outside the day job, I&apos;m usually iterating on something: a golf gadget, an interactive game, a strange mechanism, or a small tool that should exist.</p><a className="button secondary" href="/assets/Jake-Burttram-Resume.pdf" target="_blank" rel="noreferrer">Read my resume <span>↗</span></a></div></section>

      <footer id="contact" className="contact"><p className="eyebrow">HAVE SOMETHING INTERESTING TO BUILD?</p><h2>Let&apos;s make it<br /><em>real.</em></h2><a className="email-link" href="mailto:hello@jakeburttram.com">hello@jakeburttram.com <span>↗</span></a><div className="footer-bottom"><p>© {new Date().getFullYear()} Jake Burttram</p><div><a href="#">LinkedIn</a><a href="#">GitHub</a><a href="#top">Back to top ↑</a></div></div></footer>

      {selected && <div className="modal-backdrop" role="presentation" onMouseDown={() => setSelected(null)}><article className="project-modal" role="dialog" aria-modal="true" aria-label={selected.title} onMouseDown={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setSelected(null)} aria-label="Close project detail">×</button><div className={`modal-media ${selected.palette}`}><span>PROJECT {selected.number} · {selected.mediaLabel}</span><div className="placeholder-object" /></div><div className="modal-content"><p className="eyebrow">{selected.category} · {selected.year}</p><h2>{selected.title}</h2><p className="modal-summary">{selected.description}</p><div className="detail-columns"><div><h3>The challenge</h3><p>{selected.challenge}</p></div><div><h3>What I built</h3><p>{selected.built}</p></div></div><div className="detail-gallery"><span>GALLERY / ADD PHOTOS, GIFS &amp; CAD HERE</span><span>PROCESS / TESTING</span><span>FINAL SYSTEM</span></div><div className="tags">{selected.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><div className="iteration"><p className="eyebrow">ITERATION</p><strong>Prototype 01 <i>→</i> Prototype 02 <i>→</i> Final system</strong></div><p className="learned"><b>What I learned:</b> {selected.learned}</p></div></article></div>}
    </main>
  );
}

function Capability({ name, items }: { name: string; items: string }) { return <article className="capability"><h3>{name}</h3><p>{items.split("|").map((item) => <span key={item}>{item}</span>)}</p></article>; }
