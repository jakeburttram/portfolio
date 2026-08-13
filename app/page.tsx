"use client";

/* eslint-disable react/no-unescaped-entities, jsx-a11y/no-noninteractive-element-interactions */

import { useEffect, useRef, useState } from "react";

type ProjectMedia = {
  src: string;
  kind: "image" | "video";
  alt: string;
  poster?: string;
  label?: string;
  fit?: "cover" | "contain";
};

type Project = {
  number: string;
  title: string;
  subtitle: string;
  category: "PROJECT" | "IN PROGRESS" | "EXPERIMENT";
  description: string;
  summary: string;
  built: string;
  challenge: string;
  status: string;
  tags: string[];
  tone: string;
  media: ProjectMedia[];
  iterationCallout?: string;
};

const projects: Project[] = [
  {
    number: "01",
    title: "Putting Computer Vision System",
    subtitle: "Interactive golf training and game platform",
    category: "PROJECT",
    description:
      "A computer-vision putting system that turns a physical putting surface into a projected game and training platform.",
    summary:
      "I built an interactive putting system that uses computer vision and projection to turn a physical putting surface into a programmable game and training platform.",
    built:
      "The system uses a webcam to track a golf ball as it travels across a physical putting setup while a projector displays targets and game elements directly onto the playing surface. Python, OpenCV, and Pygame handle camera processing, ball tracking, calibration, shot-state logic, scoring, and the game interface. Camera-to-projector calibration maps positions in the real-world camera image into the projected game coordinate system so physical shots can interact with digital targets.",
    challenge:
      "The difficult part is making the tracking reliable in an environment that actively changes what the camera sees. Projected greens, targets, and animations alter the apparent color of the ball and surface, while the ball itself is moving quickly before reversing direction or settling. I experimented with background subtraction, contour filtering, circularity and size checks, smoothing, state-machine logic, apex/shot detection, and camera/projector calibration to make the system behave more like a game than a computer-vision demo.",
    status:
      "Working prototype; continuing to improve tracking reliability, game mechanics, packaging, and the overall physical setup.",
    tags: ["Python", "OpenCV", "Pygame", "Computer vision", "Camera calibration", "Projection", "Ball tracking"],
    tone: "putting-tone",
    media: [
      {
        src: "assets/putting-cv/hero.mp4",
        kind: "video",
        alt: "Projected putting game surface with computer-vision tracking setup.",
        poster: "assets/putting-cv/hero.webp",
      },
      {
        src: "assets/putting-cv/system-diagram.png",
        kind: "image",
        alt: "Diagram of the putting computer vision system showing projector, mirror, camera, ramp, and projected target.",
        fit: "contain",
      },
    ],
  },
  {
    number: "02",
    title: "Automated Needlepoint Printer",
    subtitle: "Two generations of computer-vision-guided printing",
    category: "PROJECT",
    description:
      "A multi-generation system for transferring digital artwork onto needlepoint canvas, first as a CNC plotter and then as an inkjet-based approach.",
    summary:
      "I wanted to automate the process of transferring digital artwork onto needlepoint canvas. The first prototype used a custom CNC-style plotter; the second changed the architecture entirely.",
    built:
      "Version 1 repurposed an old 3D-printer-style motion platform into a custom needlepoint plotter. Arduino-based stepper control moved a paint pen over the canvas while a webcam and reference points established the relationship between camera coordinates and machine coordinates. The software scanned the canvas, mapped stitch locations, separated colors, and generated the motion required to mark the design. Version 2 kept the image-processing and alignment ideas but moved the actual printing process to an inkjet-based architecture.",
    challenge:
      "Version 1 proved that the idea worked, but also exposed the architecture's fundamental limitation: marking thousands of individual stitch locations mechanically was too slow, and multi-color designs required repeated tool changes. Rather than optimizing a system with the wrong basic architecture, I changed the printing method. The problem shifted from CNC motion speed to image processing, physical canvas registration, coordinate mapping, and getting printed artwork to align accurately with the needlepoint mesh.",
    status: "Working multi-generation prototype and an ongoing experiment in choosing the right system architecture.",
    tags: ["Arduino", "Computer vision", "G-code", "Coordinate transforms", "Calibration", "Inkjet printing", "Motion control"],
    tone: "needlepoint-tone",
    media: [
      {
        src: "assets/needlepoint/v1-plotter.webp",
        kind: "image",
        alt: "First-generation CNC-style needlepoint plotting setup.",
      },
      {
        src: "assets/needlepoint/v2-inkjet.webp",
        kind: "image",
        alt: "Second-generation inkjet-based needlepoint printing approach.",
      },
    ],
    iterationCallout: "V1 / CNC plotter -> limitation: too slow -> V2 / inkjet approach",
  },
  {
    number: "03",
    title: "Wireless IMU Golf Simulator",
    subtitle: "Physical swing controller for a Unity golf game",
    category: "PROJECT",
    description:
      "A handheld ESP32 and IMU swing controller that translated real physical motion into a Unity golf shot.",
    summary:
      "I built a physical golf-swing controller that used an IMU and ESP32 to translate a real-world swing into a simulated golf shot inside Unity.",
    built:
      "I integrated an ESP32, multi-axis IMU, rechargeable battery, and wireless communication into a handheld pendulum-style golf controller. A physical golf ball at the end of the mechanism provided real motion and feedback during the swing. IMU data was processed into shot direction and speed information and sent wirelessly over Bluetooth to a custom Unity golf environment, where the values controlled the launch of the virtual ball.",
    challenge:
      "The interesting problem was not simply measuring acceleration. The controller had to turn noisy real-world motion into a small set of values that produced an intuitive virtual response. I had to think about sensing, filtering, communication, physical packaging, and game behavior together so that a player's swing produced a Unity shot that felt understandable rather than arbitrary.",
    status: "Completed earlier prototype; a useful exploration of embedded sensing and physical-to-digital interaction.",
    tags: ["ESP32", "IMU", "Bluetooth", "Unity", "C#", "Motion sensing", "Embedded systems"],
    tone: "golf-tone",
    media: [
      {
        src: "assets/imu-golf/demo.mp4",
        kind: "video",
        alt: "Wireless IMU golf simulator controller prototype.",
        poster: "assets/imu-golf/demo.webp",
      },
      {
        src: "assets/imu-golf/controller-diagram.png",
        kind: "image",
        alt: "Diagram of the IMU golf controller with ESP32, IMU, battery, and two-degree-of-freedom pivot.",
        fit: "contain",
      },
    ],
  },
  {
    number: "04",
    title: "CNC Robotic Massager",
    subtitle: "Programmable robotic motion platform",
    category: "IN PROGRESS",
    description:
      "A CoreXY-style motion platform exploring programmable massage paths, Z-axis behavior, and controlled physical interaction.",
    summary:
      "I'm building an experimental robotic platform that uses CNC-style motion control to explore programmable massage paths and controlled physical interaction.",
    built:
      "The current prototype uses a large CoreXY-style XY motion system with stepper motors and a separate Z-axis mechanism for controlled vertical movement. I designed the mechanism in CAD, fabricated and assembled the motion platform, integrated the motors and electronics, and used CNC/GRBL-style control concepts to move the toolhead through programmable paths. The project is intentionally modular so I can continue experimenting with the contact mechanism and Z-axis behavior without rebuilding the entire machine.",
    challenge:
      "Unlike a normal plotter or CNC router, this machine is intended to interact physically with a person, so XY position is only part of the problem. The Z-axis and contact mechanism also need predictable travel, compliance, and force behavior. Much of the project has been about building enough of the architecture to expose those practical mechanical problems and then iterating on them.",
    status: "IN PROGRESS - functional XY and Z motion platform with continued development of the contact mechanism and control strategy.",
    tags: ["CoreXY", "Stepper motors", "Motion control", "CAD", "CNC architecture", "GRBL", "Prototyping"],
    tone: "massager-tone",
    media: [
      {
        src: "assets/cnc-massager/hero.mp4",
        kind: "video",
        alt: "CNC robotic massager prototype motion platform.",
        poster: "assets/cnc-massager/hero.webp",
      },
      {
        src: "assets/cnc-massager/cad.png",
        kind: "image",
        alt: "CAD model of the CoreXY-style massager motion platform.",
        fit: "contain",
      },
    ],
  },
  {
    number: "05",
    title: "Interactive Fitness Platform",
    subtitle: "Body-position sensing as a physical game controller",
    category: "EXPERIMENT",
    description:
      "A sensor-based exercise platform that translated body position and movement into live software input using load cells, distance sensing, an ESP32, and Python.",
    summary:
      "I built an experimental fitness controller that used sensors in a physical platform to turn balance and body movement into real-time software input.",
    built:
      "The prototype combined multiple load cells with an ultrasonic distance sensor to measure how the user's weight and body position changed during movement. An ESP32 collected the sensor readings and streamed them to a Python application, where the data was converted into a live visualization of the user's center of pressure. Shifting weight on the physical platform moved a corresponding point on the computer screen, creating the basis for balance exercises, interactive training, or simple game controls.",
    challenge:
      "The interesting part was turning several imperfect physical measurements into one control signal that felt stable and understandable. Individual load-cell readings fluctuate, people do not stand perfectly still, and the physical structure distributes force between sensors. The project became an exercise in sensor integration, calibration, data interpretation, and deciding how much filtering was necessary before a person's movement felt natural on screen.",
    status: "Working experimental prototype demonstrating real-time body-position sensing and software feedback.",
    tags: ["Load cells", "ESP32", "Ultrasonic sensing", "Python", "Sensor integration", "Data visualization"],
    tone: "fitness-tone",
    media: [
      {
        src: "assets/fitness-platform/demo.mp4",
        kind: "video",
        alt: "Interactive fitness platform prototype visualization.",
        poster: "assets/fitness-platform/demo.webp",
      },
      {
        src: "assets/fitness-platform/load-cell-board.png",
        kind: "image",
        alt: "Underside of the interactive fitness platform showing load cells and wiring mounted to a plywood board.",
      },
    ],
  },
  {
    number: "06",
    title: "Miniature LED Fireplace",
    subtitle: "A small electromechanical Christmas-gift build",
    category: "EXPERIMENT",
    description:
      "A miniature desktop fireplace designed from scratch with a custom enclosure, ESP32 electronics, addressable LEDs, and a programmed flickering-fire effect.",
    summary:
      "I designed and built a miniature desktop fireplace as a Christmas gift, combining CAD, 3D printing, soldered electronics, embedded programming, and a custom animated lighting effect.",
    built:
      "I modeled the fireplace enclosure and cosmetic details in Fusion 360, designed the parts around the available electronics, and fabricated the enclosure with 3D printing. Inside, an ESP32 controls addressable LEDs positioned behind the fire area. I wired and soldered the electronics and programmed the LEDs to vary their brightness and color over time, creating an irregular flickering effect rather than a simple repeating blink pattern.",
    challenge:
      "Although it is a small project, it required the same integration decisions as a larger product: the enclosure had to physically package the electronics, hide wiring, diffuse the LEDs, remain easy to assemble, and still look like a miniature fireplace rather than an electronics enclosure. The project was a useful exercise in designing the mechanical package and embedded behavior together instead of treating them as separate systems.",
    status: "Completed functional gift build.",
    tags: ["Fusion 360", "ESP32", "Addressable LEDs", "3D printing", "CAD", "Soldering", "Embedded programming"],
    tone: "fire-tone",
    media: [
      {
        src: "assets/fireplace/hero.mp4",
        kind: "video",
        alt: "Finished miniature LED fireplace with flickering light effect.",
        poster: "assets/fireplace/hero.webp",
      },
      {
        src: "assets/fireplace/cad.png",
        kind: "image",
        alt: "CAD model of the miniature fireplace enclosure.",
        fit: "contain",
      },
    ],
  },
  {
    number: "07",
    title: "UV Glow Plotter",
    subtitle: "Programmable motion drawing with ultraviolet light",
    category: "EXPERIMENT",
    description:
      "A programmable UV drawing machine that moved a light source across phosphorescent material to create temporary glowing graphics and patterns.",
    summary:
      "I built a motion-controlled plotter that used ultraviolet light instead of ink, temporarily drawing glowing patterns onto phosphorescent material.",
    built:
      "The system used stepper-controlled motion to move a UV light source through programmed XY paths above a phosphorescent surface. Instead of leaving a permanent pen mark, the ultraviolet light excited the material and produced a glowing trace that slowly faded away. I used the project to experiment with motion control, plotting paths, mechanical fabrication, and unconventional ways of turning machine movement into a visual output.",
    challenge:
      "Replacing a pen with light changes the behavior of the machine. The visible line depends not only on XY position but also on the UV intensity, distance from the surface, motion speed, and persistence of the phosphorescent material. The fun engineering problem was balancing those variables well enough for the machine's programmed motion to create recognizable temporary drawings.",
    status: "Completed experimental prototype.",
    tags: ["Stepper motors", "Motion control", "XY plotting", "Fabrication", "UV light", "Prototyping"],
    tone: "uv-tone",
    media: [
      {
        src: "assets/uv-plotter/demo.mp4",
        kind: "video",
        alt: "UV glow plotter drawing on phosphorescent material.",
        poster: "assets/uv-plotter/demo.webp",
      },
      {
        src: "assets/uv-plotter/galvo.mp4",
        kind: "video",
        alt: "Galvo-style UV light motion assembly prototype clip.",
        poster: "assets/uv-plotter/galvo.webp",
      },
    ],
  },
  {
    number: "08",
    title: "Pen Plotter Experiments",
    subtitle: "A series of custom XY drawing-machine experiments",
    category: "EXPERIMENT",
    description:
      "A collection of homemade drawing machines exploring different XY mechanisms, stepper control, fabrication methods, and automated plotting.",
    summary:
      "I've built several pen-plotter experiments as a way to explore motion systems, fabrication, motor control, and different ways of producing controlled XY movement.",
    built:
      "Rather than treating the pen plotter as one finished product, I used multiple versions as small motion-control experiments. The machines combined custom mechanical structures, stepper motors, belts or other motion-transmission concepts, fabricated components, and software-controlled drawing paths. Each build provided a quick platform for trying another way of turning commanded XY coordinates into physical movement on a page.",
    challenge:
      "Plotters look simple because the output is only a line on paper, but they make mechanical errors extremely visible. Backlash, frame stiffness, belt tension, alignment, motor behavior, and coordinate accuracy all show up directly in the drawing. These experiments gave me a practical way to learn how seemingly small mechanical choices affect the quality of a controlled motion system.",
    status: "Ongoing collection of completed and experimental motion-control builds.",
    tags: ["XY motion", "Stepper motors", "Fabrication", "Automation", "Motion control", "Prototyping"],
    tone: "plotter-tone",
    media: [
      {
        src: "assets/plotters/chain-plotter.mp4",
        kind: "video",
        alt: "Homemade chain-style pen plotter experiment.",
        poster: "assets/plotters/chain-plotter.webp",
      },
      {
        src: "assets/plotters/mini-plotter.png",
        kind: "image",
        alt: "Small servo-driven pen plotter experiment drawing on a sticky note.",
      },
    ],
  },
  {
    number: "09",
    title: "ESP32 Addressable LED Controller",
    subtitle: "Custom embedded controller for programmable lighting",
    category: "EXPERIMENT",
    description:
      "A custom ESP32-based lighting controller built around addressable LEDs, power distribution, wiring, and programmable animation behavior.",
    summary:
      "I built a custom ESP32-based controller for addressable LEDs to experiment with embedded lighting, electronics integration, and programmable visual effects.",
    built:
      "The project brought the microcontroller, LED hardware, power distribution, wiring, and software behavior into one working lighting system. The ESP32 generated the control signals for the addressable LEDs while the hardware side handled the practical details of powering and connecting the lighting elements. I used the controller as a platform for experimenting with animated patterns and individually controlled LED behavior.",
    challenge:
      "Addressable LEDs are straightforward to control in small numbers, but a physical lighting system quickly becomes an electronics-integration problem. Power delivery, grounding, wiring layout, connector reliability, current demand, and the way software patterns map onto the physical LED arrangement all affect the result. The project was a useful small-scale exercise in making the electrical hardware and programmed behavior work as one system.",
    status: "Working embedded-lighting experiment.",
    tags: ["ESP32", "Addressable LEDs", "Embedded systems", "Wiring", "Power", "Soldering", "Programming"],
    tone: "led-tone",
    media: [
      {
        src: "assets/led-controller/hero.mp4",
        kind: "video",
        alt: "ESP32 addressable LED controller wiring and enclosure.",
        poster: "assets/led-controller/hero.webp",
      },
      {
        src: "assets/led-controller/matrix.mp4",
        kind: "video",
        alt: "Addressable LED matrix controlled by the ESP32 lighting system.",
        poster: "assets/led-controller/matrix.webp",
      },
    ],
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

function ProjectMediaView({
  media,
  tone,
  compact = false,
}: {
  media: ProjectMedia[];
  tone: string;
  compact?: boolean;
}) {
  return (
    <div className={`project-media ${tone} ${media.length > 1 ? "has-two-media" : "has-one-media"} ${compact ? "compact" : ""}`}>
      {media.map((item) => (
        <figure className={`media-item fit-${item.fit ?? "cover"}`} key={item.src}>
          {item.kind === "video" ? (
            <video
              muted
              loop
              playsInline
              autoPlay
              preload="auto"
              poster={item.poster ? assetPath(item.poster) : undefined}
              aria-label={item.alt}
              ref={(element) => {
                if (element) element.playbackRate = 0.72;
              }}
              onLoadedMetadata={(event) => {
                event.currentTarget.playbackRate = 0.72;
              }}
              onPlay={(event) => {
                event.currentTarget.playbackRate = 0.72;
              }}
            >
              <source src={assetPath(item.src)} />
            </video>
          ) : (
            <img src={assetPath(item.src)} alt={item.alt} loading="lazy" />
          )}
          {item.label && <figcaption>{item.label}</figcaption>}
        </figure>
      ))}
    </div>
  );
}

export default function Home() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

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
    if (selected) window.setTimeout(() => closeButtonRef.current?.focus(), 0);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <main>
      <nav className="nav" aria-label="Primary navigation">
        <a className="mark" href="#projects" aria-label="Jake Burttram home">JAKE BURTTRAM</a>
        <button className="menu-button" aria-expanded={menuOpen} aria-controls="nav-links" onClick={() => setMenuOpen(!menuOpen)}>Menu <span>+</span></button>
        <div id="nav-links" className={`nav-links ${menuOpen ? "open" : ""}`}>
          <a className="active" href="#projects" onClick={() => setMenuOpen(false)}>Work</a>
          <a href="#process" onClick={() => setMenuOpen(false)}>Process</a>
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

      <section id="projects" className="projects work-section">
        <header className="section-heading reveal"><div><p className="eyebrow">01 / SELECTED WORK</p><h2>Idea <span>→</span><br /><em>working system.</em></h2></div><p>Physical prototypes that connect mechanics, sensing, electronics, software, and the real world.</p></header>
        <div className="project-grid">
          {projects.map((project) => (
            <article className="project-card reveal" key={project.title}>
              <button className="project-card-button" onClick={() => setSelected(project)} aria-label={`Open details for ${project.title}`}>
                <span className="project-card-media">
                  <ProjectMediaView media={project.media} tone={project.tone} compact />
                  <span className="project-category-badge">{project.category}</span>
                  <span className="project-number">{project.number}</span>
                </span>
                <span className="project-card-copy">
                  <span className="project-meta">{project.subtitle}</span>
                  <span className="project-title-row"><span>{project.title}</span><span className="open-mark" aria-hidden="true">↗</span></span>
                  <span className="project-description">{project.description}</span>
                  <span className="project-card-footer">
                    <span className="tags">{project.tags.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}</span>
                  </span>
                </span>
              </button>
            </article>
          ))}
        </div>
      </section>

      <section id="process" className="process section">
        <div className="process-intro reveal"><p className="eyebrow">02 / THE THROUGH-LINE</p><h2>Build it.<br /><em>Find the problem.</em></h2></div>
        <div className="process-steps"><article className="process-step reveal"><span>01</span><h3>Idea</h3><p>Start with a strange question, useful annoyance, or physical interaction worth chasing.</p></article><article className="process-step reveal"><span>02</span><h3>Prototype</h3><p>Build the fastest version that can prove the important thing in the real world.</p></article><article className="process-step reveal"><span>03</span><h3>Problem</h3><p>Test it until the messy constraints become visible and specific.</p></article><article className="process-step reveal"><span>04</span><h3>Iteration</h3><p>Change the architecture, mechanism, code, or assumptions until it works better.</p></article></div>
      </section>

      <section id="about" className="about section">
        <div className="about-label reveal"><p className="eyebrow">03 / ABOUT</p><div className="about-rule" /><p className="about-note">MECHANICS<br />+ ELECTRONICS<br />+ SOFTWARE</p></div>
        <div className="about-copy reveal"><h2>Mechanical engineering with a weakness for <em>side quests.</em></h2><p>I'm a mechanical engineer who enjoys building things outside of work just as much as designing them professionally. My personal projects tend to start with a simple question - "could I build this?" - and usually turn into some combination of CAD, electronics, programming, fabrication, and a lot of troubleshooting.</p><p>I'm particularly interested in roles involving product development, prototyping, R&amp;D, robotics, mechatronics, and turning early-stage concepts into working physical systems.</p><div className="capability-list">{capabilities.map((capability) => <span key={capability}>{capability}</span>)}</div><div className="about-actions"><a className="button" href={assetPath("assets/Jake-Burttram-Resume.pdf")} target="_blank" rel="noreferrer">Resume <span>↗</span></a><a className="text-link" href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn <span>↗</span></a></div></div>
      </section>

      <footer id="contact" className="contact"><p className="eyebrow">04 / CONTACT</p><h2>Have something<br /><em>interesting?</em></h2><p className="contact-copy">Give me a vague physical problem and I'll be curious about the mechanics, electronics, software, and prototype hiding inside it.</p><a className="email-link" href="mailto:hello@jakeburttram.com">hello@jakeburttram.com <span>↗</span></a><div className="footer-bottom"><p>© {new Date().getFullYear()} Jake Burttram</p><div><a href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a><a href="#top">Back to top ↑</a></div></div></footer>

      {selected && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setSelected(null)}>
          <article className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title" onMouseDown={(event) => event.stopPropagation()}>
            <button ref={closeButtonRef} className="modal-close" onClick={() => setSelected(null)} aria-label="Close project detail">×</button>
            <ProjectMediaView media={selected.media} tone={selected.tone} />
            <div className="modal-content">
              <p className="eyebrow">{selected.category} / {selected.subtitle}</p>
              <h2 id="project-modal-title">{selected.title}</h2>
              <p className="modal-summary">{selected.summary}</p>
              <div className="detail-columns"><div><h3>What I built</h3><p>{selected.built}</p></div><div><h3>Engineering challenge</h3><p>{selected.challenge}</p></div></div>
              {selected.iterationCallout && <div className="iteration"><p className="eyebrow">SYSTEM ITERATION</p><strong>{selected.iterationCallout}</strong></div>}
              <div className="modal-status"><span>STATUS</span><p>{selected.status}</p></div>
              <div className="tags">{selected.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </div>
          </article>
        </div>
      )}
    </main>
  );
}
