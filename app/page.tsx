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
  category: "PROJECT" | "EXPERIMENT";
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
      "An interactive putting system that combines computer vision and projection to turn a physical putting surface into a programmable game platform.",
    summary:
      "I built an interactive putting system that combines computer vision and projection to turn a physical putting surface into a programmable game platform.",
    built:
      "A webcam watches an orange golf ball as it rolls across a surface while a projector displays targets, graphics, and game elements directly onto that same area. I built the software in Python using OpenCV and Pygame, including ball tracking, a projector calibration sequence, coordinate transformation, shot detection, scoring, and multiple game modes. The calibration system maps positions from the webcam image into the projected coordinate system, allowing a ball moving through the real world to interact directly with targets and game elements displayed on the surface.",
    challenge:
      "The main challenge was making the physical and digital systems behave like a single playing surface. The camera and projector view the surface from different positions and perspectives, so detected ball coordinates have to be transformed accurately into game coordinates. Tracking also has to remain reliable while the projected image constantly changes underneath the ball. I experimented with color and size filtering, background subtraction, motion tracking, and shot-state logic to reliably identify the ball and determine when a putt has reached its stopping or return point.",
    status: "Working prototype with calibrated camera-to-projector interaction and multiple game modes.",
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
    subtitle: "Computer vision and automated fabrication",
    category: "PROJECT",
    description:
      "A personal engineering challenge to automate the process of producing hand-painted needlepoint canvases.",
    summary:
      "After learning why hand-painted needlepoint canvases are expensive to produce, I took automating the process on as a personal engineering challenge.",
    built:
      "The first version repurposed an old 3D printer into a vision-guided canvas plotter. I rewired the machine around an Arduino and CNC shield and developed custom GRBL controller software to operate it. A webcam mounted above the machine captures an image of the needlepoint canvas. My software identifies the canvas mesh and fiducial references, maps the individual intersections, and generates G-code based on their physical positions so the machine can place the pattern onto the irregular canvas. I later developed a second approach that uses a standard scanner and inkjet printer to accomplish the same goal without requiring a dedicated plotting machine.",
    challenge:
      "Unlike printing onto a normal sheet of paper, a needlepoint pattern has to align with the physical mesh of the canvas. Small differences in canvas position, orientation, and spacing make a fixed print path unreliable. The core challenge became translating what the camera sees into usable machine coordinates. I developed a vision and calibration workflow that detects the canvas structure, references it to known fiducial locations, and generates toolpaths aligned with the actual canvas rather than assuming a perfectly positioned grid.",
    status: "Two working automation approaches: a vision-guided plotter and a scanner/inkjet workflow.",
    tags: ["Arduino", "Computer vision", "G-code", "Coordinate transforms", "Calibration", "Inkjet printing", "Motion control"],
    tone: "needlepoint-tone",
    media: [
      {
        src: "assets/needlepoint/v1-plotter.webp",
        kind: "image",
        alt: "First-generation CNC-style needlepoint plotting setup.",
      },
      {
        src: "assets/needlepoint/v2-plotter-donut.mp4",
        kind: "video",
        poster: "assets/needlepoint/v2-plotter-donut.webp",
        alt: "Needlepoint plotter drawing a donut pattern.",
      },
    ],
    iterationCallout: "V1 / CNC plotter -> limitation: too slow -> V2 / inkjet approach",
  },
  {
    number: "03",
    title: "IMU Golf Simulator",
    subtitle: "Wireless motion sensing and game control",
    category: "PROJECT",
    description:
      "A physical golf controller that measures the motion of a struck pendulum and sends that data wirelessly to a Unity golf simulation.",
    summary:
      "I built a physical golf controller that measures the motion of a struck pendulum and sends that data wirelessly to a Unity golf simulation.",
    built:
      "The controller uses a rigid pendulum with a golf ball at the bottom and an ESP32, battery, and IMU mounted farther up the rod. The user strikes the ball with a putter, causing the entire pendulum to swing. The IMU records the resulting motion, and the ESP32 processes and transmits the shot data over Bluetooth to a Unity application on my computer. The Unity program then uses that data to control the resulting golf shot.",
    challenge:
      "This project was primarily an exploration of inertial sensing and connecting physical hardware to a game environment. I had to interpret IMU measurements from a moving pendulum, establish reliable Bluetooth communication between the ESP32 and computer, and convert physical motion into useful inputs for the Unity simulation. It gave me a practical introduction to IMU data, wireless embedded communication, and Unity while tying all three together in a physical prototype.",
    status: "Completed prototype exploring IMU data, wireless embedded communication, and Unity control.",
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
    title: "CoreXYZ Motion Platform",
    subtitle: "Custom three-axis motion system",
    category: "PROJECT",
    description:
      "A three-axis motion platform that keeps all three coupled motors stationary while controlling X, Y, and Z movement.",
    summary:
      "I designed and built a three-axis motion platform that uses three coupled stationary motors to control X, Y, and Z movement while keeping all motors off the moving toolhead.",
    built:
      "The mechanism extends the concept of a CoreXY system into three axes. X and Y motion use a conventional CoreXY-style belt arrangement, while a third coupled motor and timing-belt path provide Z-axis movement. All three motors remain mounted to the machine frame. Their movements are combined mathematically to position the toolhead in three dimensions, allowing the moving assembly to remain extremely lightweight. I also built a custom Python controller that allows the prototype to be jogged and operated directly through keyboard controls.",
    challenge:
      "Adding Z movement to a coupled CoreXY mechanism creates parasitic vertical motion when the toolhead moves in the X-Y plane. The challenge was developing a belt arrangement and control relationship that accounts for this coupling so commanded planar movement does not unintentionally change the toolhead height. The result is a functional CoreXYZ prototype capable of controlled three-axis movement without carrying a motor on the toolhead. The same architecture could be applied to machines where low moving mass is important.",
    status: "Functional CoreXYZ prototype capable of controlled three-axis movement with stationary motors.",
    tags: ["CoreXYZ", "CoreXY", "Stepper motors", "Motion control", "CAD", "Python", "Prototyping"],
    tone: "corexyz-tone",
    media: [
      {
        src: "assets/corexyz-platform/hero.mp4",
        kind: "video",
        alt: "CoreXYZ motion platform prototype.",
        poster: "assets/corexyz-platform/hero.webp",
      },
      {
        src: "assets/corexyz-platform/cad.png",
        kind: "image",
        alt: "CAD model of the CoreXYZ motion platform.",
        fit: "contain",
      },
    ],
  },
  {
    number: "05",
    title: "Interactive Fitness Platform",
    subtitle: "Sensing and interactive fitness",
    category: "PROJECT",
    description:
      "A Wii Fit-inspired sensing platform designed to turn bodyweight exercises into interactive games.",
    summary:
      "I built a Wii Fit-inspired sensing platform designed to turn bodyweight exercises into interactive games.",
    built:
      "The platform combines multiple load cells with an ultrasonic distance sensor to measure both weight distribution and the user's position above the board. An ESP32 collects the sensor measurements and sends packets of data to a Python application. The software processes the load-cell readings to calculate and display the user's center of pressure while the distance sensor provides an additional dimension of movement. Together, the sensors allow physical exercises and body movements to become inputs for software.",
    challenge:
      "The interesting part of the project was turning several simple sensor measurements into an intuitive representation of body movement. Individual load-cell readings have limited meaning on their own, but their relative forces can be combined to estimate where the user's weight is centered on the platform. Adding distance measurement expanded the system beyond a conventional balance board and created another input that could be used for movements such as push-ups and other bodyweight exercises.",
    status: "Working prototype for turning bodyweight movement into interactive software input.",
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
    title: "LED Desktop Fireplace",
    subtitle: "Embedded lighting and product design",
    category: "PROJECT",
    description:
      "A miniature desktop fireplace using individually addressable LEDs and custom geometry to create a compact simulated flame effect.",
    summary:
      "I designed and built a miniature desktop fireplace that uses individually addressable LEDs and custom geometry to create a compact simulated flame effect.",
    built:
      "I modeled the fireplace and its components in CAD, fabricated the enclosure and translucent log assembly, and integrated an ESP32 with individually addressable LEDs. Custom lighting animations vary the intensity and behavior of the LEDs behind the translucent elements to create the appearance of a small flickering fire.",
    challenge:
      "The project was an exercise in combining mechanical design, fabrication, electronics, and software into a small finished object. The physical geometry, material translucency, LED placement, and animation all had to work together for the lighting effect to read as a flame rather than simply exposed LEDs.",
    status: "Completed functional desktop lighting prototype.",
    tags: ["Fusion 360", "ESP32", "Addressable LEDs", "3D printing", "CAD", "Soldering", "Embedded programming"],
    tone: "fire-tone",
    media: [
      {
        src: "assets/fireplace/hero.mp4",
        kind: "video",
        alt: "LED desktop fireplace with flickering light effect.",
        poster: "assets/fireplace/hero.webp",
      },
      {
        src: "assets/fireplace/cad.png",
        kind: "image",
        alt: "CAD model of the LED desktop fireplace enclosure.",
        fit: "contain",
      },
    ],
  },
  {
    number: "07",
    title: "UV Glow Plotter",
    subtitle: "Optical motion control",
    category: "EXPERIMENT",
    description:
      "A compact plotter that uses two motor-controlled mirrors to steer a UV laser across a glow-in-the-dark surface.",
    summary:
      "I built a compact plotter that uses two motor-controlled mirrors to steer a UV laser across a glow-in-the-dark surface.",
    built:
      "A UV laser is directed toward two mirrors controlled by stepper motors inside a custom 3D-printed housing. Changing the angle of the mirrors redirects the beam across a phosphorescent surface without physically moving the laser itself. As the UV beam moves across the glow-in-the-dark paint, it temporarily excites the material and creates visible glowing paths and patterns.",
    challenge:
      "Instead of moving a pen or toolhead through X and Y, this project controls the position of a light beam by changing mirror angles. That creates a different relationship between motor movement and the resulting position on the drawing surface. The project was an experiment in optical steering, stepper control, geometry, and translating commanded paths into coordinated mirror motion.",
    status: "Completed optical motion-control experiment.",
    tags: ["Stepper motors", "Motion control", "XY plotting", "Fabrication", "UV light", "Prototyping"],
    tone: "uv-tone",
    media: [
      {
        src: "assets/uv-plotter/demo.mp4",
        kind: "video",
        alt: "UV glow plotter steering a beam across phosphorescent material.",
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
    title: "Pen Plotters",
    subtitle: "Robotic motion systems",
    category: "EXPERIMENT",
    description:
      "Several drawing robots built to experiment with different mechanisms, scales, and approaches to robotic motion control.",
    summary:
      "I built several drawing robots as a way to experiment with different mechanisms, scales, and approaches to robotic motion control.",
    built:
      "Two of the more unusual designs sit at opposite ends of the scale. One is a large hanging plotter that positions a suspended drawing tool across a broad vertical workspace. The other is a miniature servo-driven SCARA mechanism designed specifically to draw on sticky notes. Both accomplish essentially the same task - positioning a pen in two dimensions - but use completely different mechanical architectures.",
    challenge:
      "These projects were less about solving one specific problem and more about developing an intuitive understanding of robotic mechanisms. Building radically different machines for the same basic task gave me an opportunity to experiment with kinematics, motor control, mechanical layouts, coordinate systems, and the tradeoffs that come with different motion architectures.",
    status: "Completed and ongoing drawing-robot experiments.",
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
    title: "LED Controller",
    subtitle: "Embedded lighting control",
    category: "PROJECT",
    description:
      "A compact ESP32-based controller for addressable LEDs that makes programmable lighting easier to integrate into physical projects.",
    summary:
      "I built a compact ESP32-based controller for addressable LEDs to make programmable lighting easy to integrate into physical projects.",
    built:
      "The controller provides a reusable hardware platform for driving addressable LED installations from an ESP32. It packages the electronics and connections into a dedicated controller rather than rebuilding the same breadboard-style setup for every lighting project. The system can run programmable lighting effects and serve as a reusable controller for future builds.",
    challenge:
      "The goal was less about inventing a new lighting algorithm and more about turning a commonly repeated electronics setup into a clean, reusable piece of hardware. It reflects the same approach I use in many of my projects: once I find myself solving the same problem repeatedly, I look for a way to turn that solution into a reusable tool.",
    status: "Working reusable controller for addressable LED projects.",
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

const VIDEO_PLAYBACK_RATE = 0.72;

function assetPath(path: string) {
  const base = ((import.meta as ImportMeta & { env?: { BASE_URL?: string } }).env?.BASE_URL ?? "/");
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  return `${normalizedBase}${path.replace(/^\/+/, "")}`;
}

function syncVideoRate(video: HTMLVideoElement) {
  video.defaultPlaybackRate = VIDEO_PLAYBACK_RATE;
  video.playbackRate = VIDEO_PLAYBACK_RATE;
}

function playVideo(video: HTMLVideoElement) {
  syncVideoRate(video);
  if (video.readyState === 0) video.load();
  video.play().catch(() => {});
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
              autoPlay={!compact}
              preload={compact ? "metadata" : "auto"}
              poster={item.poster ? assetPath(item.poster) : undefined}
              aria-label={item.alt}
              ref={(element) => {
                if (element) syncVideoRate(element);
              }}
              onLoadedMetadata={(event) => {
                syncVideoRate(event.currentTarget);
              }}
              onPlay={(event) => {
                syncVideoRate(event.currentTarget);
              }}
              onCanPlay={(event) => {
                if (compact && event.currentTarget.dataset.inView === "true") playVideo(event.currentTarget);
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
    const videos = Array.from(document.querySelectorAll<HTMLVideoElement>(".project-card-media video"));

    if (!("IntersectionObserver" in window)) {
      videos.forEach(playVideo);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            video.dataset.inView = "true";
            playVideo(video);
          } else {
            video.dataset.inView = "false";
            video.pause();
          }
        });
      },
      { rootMargin: "160px 0px", threshold: 0.2 },
    );

    videos.forEach((video) => {
      syncVideoRate(video);
      video.dataset.inView = "false";
      observer.observe(video);
    });

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
        <div className="about-copy reveal"><h2>Mechanical engineer. <em>Compulsive builder.</em></h2><p>I'm a mechanical engineer who likes taking ideas all the way to something that actually works. My background is primarily in mechanical design and manufacturing, but my personal projects regularly pull me into electronics, programming, computer vision, motion control, and whatever else the problem requires.</p><p>I tend to learn by building. Most of my projects start with an idea I don't quite know how to make yet, followed by a lot of CAD, prototyping, testing, and figuring things out along the way.</p><p>Professionally, I'm most interested in product development, prototyping, R&amp;D, robotics, mechatronics, and other roles where I can work across disciplines to turn early concepts into working physical systems.</p><div className="capability-list">{capabilities.map((capability) => <span key={capability}>{capability}</span>)}</div><div className="about-actions"><a className="button" href={assetPath("assets/Jake-Burttram-Resume.pdf")} target="_blank" rel="noreferrer">Resume <span>↗</span></a><a className="text-link" href="https://www.linkedin.com/in/jakeburttram" target="_blank" rel="noreferrer">LinkedIn <span>↗</span></a></div></div>
      </section>

      <footer id="contact" className="contact"><p className="eyebrow">04 / CONTACT</p><h2>Let's build something<br /><em>interesting.</em></h2><p className="contact-copy">I'm interested in teams working on physical products, prototypes, robotics, and unusual engineering problems, especially where mechanical design overlaps with electronics and software.<br /><br />If that sounds like what you're working on, I'd love to hear about it.</p><a className="email-link" href="mailto:jakelburttram@gmail.com">jakelburttram@gmail.com <span>↗</span></a><div className="footer-bottom"><p>© {new Date().getFullYear()} Jake Burttram</p><div><a href="https://www.linkedin.com/in/jakeburttram" target="_blank" rel="noreferrer">LinkedIn</a><a href="#top">Back to top ↑</a></div></div></footer>

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
