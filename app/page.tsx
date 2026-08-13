"use client";

/* eslint-disable react/no-unescaped-entities, jsx-a11y/no-noninteractive-element-interactions */

import { useEffect, useState } from "react";

type FeaturedProject = {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  built: string;
  challenge: string;
  status?: string;
  tags: string[];
  asset: string;
  relatedAsset?: string;
  mediaKind: "video" | "image" | "sequence";
  tone: string;
};

type SmallProject = {
  title: string;
  description: string;
  tags: string[];
  asset: string;
  relatedAsset?: string;
  mediaKind: "video" | "image";
  tone: string;
};

const featuredProjects: FeaturedProject[] = [
  {
    number: "01",
    title: "Putting Computer Vision System",
    subtitle: "Interactive golf training and game platform",
    description:
      "I built an interactive putting system that uses computer vision and projection to turn a physical putting surface into a programmable game and training platform.",
    built:
      "The system uses a webcam to track a golf ball as it travels up a physical putting ramp and lands on a projected target area. Python/OpenCV processes the camera image, determines the ball's landing position, and communicates that information to a custom game interface.",
    challenge:
      "Tracking the golf ball reliably is harder than detecting an orange object. The projector changes the appearance of the surface, while the ball rolls up and back down the ramp before coming to rest. I experimented with background subtraction, contour analysis, circularity filtering, state-machine logic, and camera calibration.",
    status: "Working prototype; continuing to experiment with tracking reliability and game mechanics.",
    tags: ["Python", "OpenCV", "Pygame", "Camera calibration", "Projection", "Ball tracking"],
    asset: "assets/putting-cv/hero.webp",
    mediaKind: "image",
    tone: "putting-tone",
  },
  {
    number: "02",
    title: "Automated Needlepoint Printer",
    subtitle: "Two generations of computer-vision-guided printing",
    description:
      "I wanted to automate the process of transferring digital artwork onto needlepoint canvas. The first prototype used a custom CNC-style plotter; the second changed the architecture entirely.",
    built:
      "Version 1 repurposed an old 3D printer as a motion platform with custom Arduino and stepper-driver control software. A webcam and plotted reference points let the software calculate a transformation between camera coordinates and machine coordinates. Canvas was scanned, mapped, color-separated, and printed with a paint pen.",
    challenge:
      "It worked - but it was too slow. Each stitch location required an individual marking operation, and multi-color designs needed repeated tool changes. Rather than make the CNC plotter faster, I kept the calibration concepts and moved the physical printing process to a consumer inkjet printer. The challenge shifted toward image processing, canvas alignment, and print registration.",
    status: "An evolving case study in changing the system architecture when the first working approach reveals its fundamental limitation.",
    tags: ["Arduino", "Computer vision", "G-code", "Coordinate transforms", "Calibration", "Inkjet printing"],
    asset: "assets/needlepoint/v1-plotter.webp",
    relatedAsset: "assets/needlepoint/v2-inkjet.webp",
    mediaKind: "image",
    tone: "needlepoint-tone",
  },
  {
    number: "03",
    title: "Wireless IMU Golf Simulator",
    subtitle: "Physical swing controller for a Unity golf game",
    description:
      "I built a physical golf-swing controller that used an IMU and ESP32 to translate a real-world swing into a simulated golf shot inside Unity.",
    built:
      "An ESP32, multi-axis IMU, and rechargeable battery were integrated into a physical pendulum-style mechanism with a golf ball at the end. Motion from the IMU was processed into a shot direction and velocity vector, then transmitted wirelessly over Bluetooth to a custom Unity golf environment.",
    challenge:
      "How do you translate motion from a physical mechanism into an intuitive virtual golf shot? The interesting part was not just sensing motion; it was designing a physical-to-digital interface whose response felt understandable when the Unity ball launched.",
    status: "A completed earlier experiment that still represents the kind of physical/digital systems I like to build.",
    tags: ["ESP32", "IMU", "Bluetooth", "Unity", "C#", "Motion sensing"],
    asset: "assets/imu-golf/demo.webp",
    mediaKind: "image",
    tone: "golf-tone",
  },
  {
    number: "04",
    title: "CNC Robotic Massager",
    subtitle: "Programmable robotic motion platform",
    description:
      "I'm building an experimental robotic platform that uses CNC-style motion control to explore programmable massage paths and controlled physical interaction.",
    built:
      "The current prototype explores a CoreXY motion architecture, stepper motors, and a Z-axis mechanism. The work is centered on the mechanical design, motion-control architecture, CAD, and the practical details of making a large physical system iterate quickly.",
    challenge:
      "The current challenge is getting the motion platform, Z-axis, and contact mechanism to behave predictably together. It is deliberately still a prototype: a platform for testing the architecture, not a finished product.",
    status: "IN PROGRESS - current prototype and ongoing experiment.",
    tags: ["CoreXY", "Stepper motors", "Motion control", "CAD", "CNC architecture", "Prototyping"],
    asset: "assets/cnc-massager/hero.webp",
    relatedAsset: "assets/cnc-massager/cad.png",
    mediaKind: "image",
    tone: "massager-tone",
  },
];

const smallerProjects: SmallProject[] = [
  {
    title: "Interactive Fitness Platform",
    description:
      "An experimental exercise controller using multiple load cells and an ultrasonic distance sensor to translate body movement into real-time software inputs. An ESP32 streamed sensor data to Python, which visualized the user's center of pressure as a moving point.",
    tags: ["Load cells", "ESP32", "Ultrasonic sensing", "Python"],
    asset: "assets/fitness-platform/demo.webp",
    mediaKind: "image",
    tone: "fitness-tone",
  },
  {
    title: "Miniature LED Fireplace",
    description:
      "A miniature desktop fireplace designed and built as a Christmas gift, with a Fusion 360 enclosure, addressable LEDs, an ESP32, soldered electronics, and a custom flickering-fire animation.",
    tags: ["Fusion 360", "ESP32", "Addressable LEDs", "3D printing"],
    asset: "assets/fireplace/hero.webp",
    relatedAsset: "assets/fireplace/cad.png",
    mediaKind: "image",
    tone: "fire-tone",
  },
  {
    title: "UV Glow Plotter",
    description:
      "A stepper-controlled UV drawing system that used programmed motion to create temporary glowing patterns on phosphorescent material.",
    tags: ["Stepper motors", "Motion control", "Plotting"],
    asset: "assets/uv-plotter/demo.webp",
    relatedAsset: "assets/uv-plotter/galvo-cad.png",
    mediaKind: "image",
    tone: "uv-tone",
  },
  {
    title: "Pen Plotter Experiments",
    description:
      "A collection of experiments with custom XY motion systems, stepper motors, and automated drawing.",
    tags: ["XY motion", "Fabrication", "Automation"],
    asset: "assets/plotters/chain-plotter.webp",
    mediaKind: "image",
    tone: "plotter-tone",
  },
  {
    title: "ESP32 Addressable LED Controller",
    description:
      "A custom ESP32-based controller for addressable LEDs, including the electronics, wiring, power integration, and lighting behavior.",
    tags: ["ESP32", "Wiring", "Power", "Embedded systems"],
    asset: "assets/led-controller/hero.webp",
    relatedAsset: "assets/led-controller/matrix.webp",
    mediaKind: "image",
    tone: "led-tone",
  },
];

const capabilities = [
  "Mechanical design",
  "Rapid prototyping",
  "CAD",
  "ESP32",
  "Python",
  "Computer vision",
  "Motion control",
  "Embedded systems",
];

function assetPath(path: string) {
  const base = ((import.meta as ImportMeta & { env?: { BASE_URL?: string } }).env?.BASE_URL ?? "/");
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  return `${normalizedBase}${path.replace(/^\/+/, "")}`;
}

function MediaPlaceholder({ asset, relatedAsset, kind, tone, compact = false }: { asset: string; relatedAsset?: string; kind?: FeaturedProject["mediaKind"]; tone: string; compact?: boolean }) {
  const [ready, setReady] = useState(false);
  const showMedia = kind === "image" || ready;
  return (
    <div className={`media-placeholder ${tone} ${showMedia ? "has-media" : ""} ${compact ? "compact" : ""}`} data-asset={asset}>
      {kind === "image" && <div className={`media-image-layer ${relatedAsset ? "media-dual" : ""}`} style={{ opacity: 1 }}>
        <img src={assetPath(asset)} alt="" onLoad={() => setReady(true)} onError={() => setReady(false)} />
        {relatedAsset && <img src={assetPath(relatedAsset)} alt="" onLoad={() => setReady(true)} onError={() => setReady(false)} />}
      </div>}
      {kind !== "image" && <div className={`media-video-layer ${relatedAsset ? "media-dual" : ""}`} style={{ opacity: ready ? 1 : 0 }}>
        <video autoPlay muted loop playsInline preload="metadata" onCanPlay={() => setReady(true)} onError={() => setReady(false)} aria-label="Project demo video"><source src={assetPath(asset)} /></video>
        {relatedAsset && <video autoPlay muted loop playsInline preload="metadata" onCanPlay={() => setReady(true)} onError={() => setReady(false)} aria-label="Related project demo video"><source src={assetPath(relatedAsset)} /></video>}
      </div>}
      <div className="media-grid" aria-hidden="true" />
      <div className="media-diagram" aria-hidden="true"><span /><span /><span /></div>
      <span className="media-kind">{kind === "sequence" ? "V1  ->  PROBLEM  ->  V2" : showMedia ? relatedAsset ? "RELATED VIEWS" : "PROJECT CLIP" : kind === "image" ? "ANIMATED PREVIEW" : relatedAsset ? "RELATED VIEWS" : "VIDEO"}</span>
      <span className="media-asset">{asset}</span>
    </div>
  );
}

export default function Home() {
  const [selected, setSelected] = useState<FeaturedProject | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = selected ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <main>
      <nav className="nav" aria-label="Primary navigation">
        <a className="mark" href="#top" aria-label="Jake Burttram home">JB<span>/</span></a>
        <button className="menu-button" aria-expanded={menuOpen} aria-controls="nav-links" onClick={() => setMenuOpen(!menuOpen)}>Menu <span>+</span></button>
        <div id="nav-links" className={`nav-links ${menuOpen ? "open" : ""}`}>
          <a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href={assetPath("assets/Jake-Burttram-Resume.pdf")} target="_blank" rel="noreferrer">Resume</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </div>
      </nav>

      <section id="top" className="hero">
        <div className="hero-copy">
          <p className="eyebrow">JAKE BURTTRAM / MECHANICAL ENGINEER</p>
          <h1>Mechanical Engineer<br /><em>Prototyper</em> <span>·</span> Builder</h1>
          <p className="hero-statement">I like turning weird ideas into working physical prototypes.</p>
          <p className="hero-intro">I'm a mechanical engineer who enjoys building things that sit somewhere between machines, electronics, and software. Most of my personal projects start as a strange idea and turn into a physical prototype through CAD, wiring, coding, testing, and iteration.</p>
          <div className="hero-actions"><a className="button" href="#projects">Explore projects <span>↓</span></a><a className="text-link" href="#about">A little about me <span>→</span></a></div>
        </div>
        <div className="hero-object" aria-label="Abstract technical drawing placeholder">
          <div className="hero-crosshair" />
          <div className="hero-ring ring-one"><span /></div>
          <div className="hero-ring ring-two"><span /></div>
          <div className="hero-machine"><i /><i /><i /><b>JB</b></div>
          <p>PHYSICAL<br />SYSTEMS<br />IN MOTION</p>
          <small>MECH / ELEC / CODE</small>
        </div>
        <div className="scroll-note">SCROLL TO EXPLORE <span>↓</span></div>
      </section>

      <section id="projects" className="projects section">
        <header className="section-heading reveal"><div><p className="eyebrow">01 / FEATURED PROJECTS</p><h2>Idea <span>→</span><br /><em>working system.</em></h2></div><p>Physical prototypes that connect mechanics, sensing, electronics, software, and the real world.</p></header>
        <div className="featured-grid">
          {featuredProjects.map((project) => (
            <article className="featured-card reveal" key={project.title}>
              <button className="project-media-button" onClick={() => setSelected(project)} aria-label={`Open details for ${project.title}`}><MediaPlaceholder asset={project.asset} relatedAsset={project.relatedAsset} kind={project.mediaKind} tone={project.tone} /><span className="project-number">{project.number}</span><span className="open-mark">+</span></button>
              <div className="project-info"><div><p className="eyebrow">{project.subtitle}{project.status?.startsWith("IN PROGRESS") && <span className="status-label">IN PROGRESS</span>}</p><h3>{project.title}</h3></div><button className="round-button" onClick={() => setSelected(project)} aria-label={`View ${project.title} details`}>↗</button></div>
              <p className="project-description">{project.description}</p>
              <div className="tags">{project.tags.slice(0, 5).map((tag) => <span key={tag}>{tag}</span>)}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="process section">
        <div className="process-intro reveal"><p className="eyebrow">THE THROUGH-LINE</p><h2>Build it.<br /><em>Find the problem.</em></h2></div>
        <div className="process-steps"><article className="process-step reveal"><span>01</span><h3>Idea</h3><p>Start with a strange question, useful annoyance, or physical interaction worth chasing.</p></article><article className="process-step reveal"><span>02</span><h3>Prototype</h3><p>Build the fastest version that can prove the important thing in the real world.</p></article><article className="process-step reveal"><span>03</span><h3>Problem</h3><p>Test it until the messy constraints become visible and specific.</p></article><article className="process-step reveal"><span>04</span><h3>Iteration</h3><p>Change the architecture, mechanism, code, or assumptions until it works better.</p></article></div>
      </section>

      <section className="experiments section">
        <header className="section-heading reveal"><div><p className="eyebrow">02 / SMALLER BUILDS &amp; EXPERIMENTS</p><h2>More things<br /><em>in the shop.</em></h2></div><p>Not every build needs a full case study. These smaller projects show the range of questions I like to answer with hardware.</p></header>
        <div className="small-grid">{smallerProjects.map((project) => <article className="small-card reveal" key={project.title}><div className="small-media"><MediaPlaceholder asset={project.asset} relatedAsset={project.relatedAsset} kind={project.mediaKind} tone={project.tone} compact /></div><div className="small-card-copy"><p className="eyebrow">EXPERIMENT</p><h3>{project.title}</h3><p>{project.description}</p><div className="tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div></article>)}</div>
      </section>

      <section id="about" className="about section">
        <div className="about-label reveal"><p className="eyebrow">03 / ABOUT</p><div className="about-rule" /><p className="about-note">MECHANICS<br />+ ELECTRONICS<br />+ SOFTWARE</p></div>
        <div className="about-copy reveal"><h2>Mechanical engineering with a weakness for <em>side quests.</em></h2><p>I'm a mechanical engineer who enjoys building things outside of work just as much as designing them professionally. My personal projects tend to start with a simple question - "could I build this?" - and usually turn into some combination of CAD, electronics, programming, fabrication, and a lot of troubleshooting.</p><p>I'm particularly interested in roles involving product development, prototyping, R&amp;D, robotics, mechatronics, and turning early-stage concepts into working physical systems.</p><div className="capability-list">{capabilities.map((capability) => <span key={capability}>{capability}</span>)}</div><div className="about-actions"><a className="button" href={assetPath("assets/Jake-Burttram-Resume.pdf")} target="_blank" rel="noreferrer">Resume <span>↗</span></a><a className="text-link" href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn <span>↗</span></a></div></div>
      </section>

      <footer id="contact" className="contact"><p className="eyebrow">04 / CONTACT</p><h2>Have something<br /><em>interesting?</em></h2><p className="contact-copy">Give me a vague physical problem and I'll be curious about the mechanics, electronics, software, and prototype hiding inside it.</p><a className="email-link" href="mailto:hello@jakeburttram.com">hello@jakeburttram.com <span>↗</span></a><div className="footer-bottom"><p>© {new Date().getFullYear()} Jake Burttram</p><div><a href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a><a href="#top">Back to top ↑</a></div></div></footer>

      {selected && <div className="modal-backdrop" role="presentation" onMouseDown={() => setSelected(null)}><article className="project-modal" role="dialog" aria-modal="true" aria-label={selected.title} onMouseDown={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setSelected(null)} aria-label="Close project detail">×</button><MediaPlaceholder asset={selected.asset} relatedAsset={selected.relatedAsset} kind={selected.mediaKind} tone={selected.tone} /><div className="modal-content"><p className="eyebrow">PROJECT {selected.number} / {selected.subtitle}</p><h2>{selected.title}</h2><p className="modal-summary">{selected.description}</p><div className="detail-columns"><div><h3>What I built</h3><p>{selected.built}</p></div><div><h3>Interesting problem</h3><p>{selected.challenge}</p></div></div>{selected.title === "Automated Needlepoint Printer" && <div className="iteration"><p className="eyebrow">SYSTEM ITERATION</p><strong>V1 / CNC plotter <i>→</i> limitation: too slow <i>→</i> V2 / inkjet approach</strong></div>}<div className="modal-status"><span>STATUS</span><p>{selected.status ?? "Working prototype."}</p></div><div className="tags">{selected.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div></article></div>}
    </main>
  );
}
