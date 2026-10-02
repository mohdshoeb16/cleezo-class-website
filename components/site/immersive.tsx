"use client";
import { useEffect, useRef, useState } from "react";
import homepage from "@/content/homepage.json";
import connectionStyles from "./connection-map.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  ArrowUpRight,
  Bell,
  BookOpen,
  Bus,
  CalendarDays,
  Check,
  CheckCheck,
  Clock3,
  FileCheck,
  Heart,
  LayoutDashboard,
  Library,
  MessageSquare,
  NotebookPen,
  Play,
  School,
  Send,
  ShieldCheck,
  Sparkles,
  Users,
  Wallet,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Action, Eyebrow, TextLink } from "./ui";
import { ProductCanvas } from "./product";
import { useMotionDisabled } from "./motion";
import { modules, modulePath } from "@/content/modules";
import { roles } from "./experience";
import { resources } from "@/content/resources";

const icons = [
  CalendarDays,
  BookOpen,
  FileCheck,
  MessageSquare,
  Wallet,
  Bus,
  Users,
  Heart,
  Library,
];
const tabNames = ["Overview", "Attendance", "Learning", "Communication"];
export function ImmersiveMotion() {
  const path = usePathname();
  const disabled = useMotionDisabled();
  const cursor = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (disabled) return;
    const ctx = gsap.context(() => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(".reading-progress", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: true },
        });
        gsap.utils
          .toArray<HTMLElement>("[data-reveal]")
          .forEach((el, i) =>
            gsap.fromTo(
              el,
              { y: i % 2 ? 36 : 0, x: i % 2 ? 0 : 24, opacity: 0.35 },
              {
                y: 0,
                x: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: { trigger: el, start: "top 90%", once: true },
              },
            ),
          );
        gsap.utils
          .toArray<HTMLElement>(".workflow-stop")
          .forEach((el) =>
            ScrollTrigger.create({
              trigger: el,
              start: "top 65%",
              onEnter: () => el.classList.add("reached"),
              onLeaveBack: () => el.classList.remove("reached"),
            }),
          );
        gsap.fromTo(
          ".workflow-route",
          { strokeDashoffset: 1 },
          {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: ".pathway",
              start: "top center",
              end: "bottom 70%",
              scrub: true,
            },
          },
        );
        gsap.utils
          .toArray<HTMLElement>(".ecosystem-module")
          .forEach((el, i) =>
            gsap.from(el, {
              y: 50,
              rotate: i % 2 ? 4 : -4,
              opacity: 0.2,
              duration: 0.8,
              scrollTrigger: { trigger: el, start: "top 94%", once: true },
            }),
          );
        gsap.from(".demo-devices>div", {
          y: 90,
          rotate: 4,
          opacity: 0.3,
          stagger: 0.15,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".demo-devices",
            start: "top 85%",
            once: true,
          },
        });
      });
      media.add(
        "(min-width: 1000px) and (prefers-reduced-motion: no-preference)",
        () => {
          const scatter = document.querySelector(".gather-scene");
          if (scatter) {
            const cards = gsap.utils.toArray<HTMLElement>(".scatter-card");
            gsap.to(cards, {
              x: 0,
              y: 0,
              rotation: 0,
              scale: 0.6,
              opacity: 0,
              ease: "power2.inOut",
              stagger: 0.025,
              scrollTrigger: {
                trigger: ".gather-track",
                start: "top top",
                end: "75% bottom",
                scrub: 0.5,
              },
            });
            gsap.fromTo(
              ".gather-dashboard",
              { scale: 0.78, opacity: 0.1, y: 60 },
              {
                scale: 1,
                opacity: 1,
                y: 0,
                scrollTrigger: {
                  trigger: ".gather-track",
                  start: "top top",
                  end: "bottom bottom",
                  scrub: 0.5,
                },
              },
            );
          }
        },
      );
    });
    const visibility = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          (e.target as HTMLElement).dataset.motionVisible = String(
            e.isIntersecting,
          );
        }),
      { rootMargin: "100px" },
    );
    document
      .querySelectorAll("main>section")
      .forEach((el) => visibility.observe(el));
    const fine = matchMedia("(hover:hover) and (pointer:fine)").matches;
    let frame = 0;
    const pointer = (e: PointerEvent) => {
      if (!fine) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (cursor.current) {
          cursor.current.style.left = e.clientX + "px";
          cursor.current.style.top = e.clientY + "px";
          const target = (e.target as Element).closest(
            "a,button,[data-cursor]",
          );
          cursor.current.classList.toggle("cursor-active", !!target);
          cursor.current.textContent =
            (target as HTMLElement)?.dataset.cursor || "";
        }
        const magnetic = (e.target as Element).closest<HTMLElement>(
          ".hero-actions .button,.site-header .desktop-nav a",
        );
        if (magnetic) {
          const r = magnetic.getBoundingClientRect();
          magnetic.style.translate =
            (e.clientX - r.left - r.width / 2) * 0.06 +
            "px " +
            (e.clientY - r.top - r.height / 2) * 0.08 +
            "px";
          magnetic.onpointerleave = () => {
            magnetic.style.translate = "0px 0px";
          };
        }
        const stage = (e.target as Element).closest<HTMLElement>(".hero-depth");
        if (stage) {
          const r = stage.getBoundingClientRect();
          stage.style.setProperty(
            "--rx",
            ((e.clientY - r.top - r.height / 2) / r.height) * -5 + "deg",
          );
          stage.style.setProperty(
            "--ry",
            ((e.clientX - r.left - r.width / 2) / r.width) * 7 + "deg",
          );
        }
      });
    };
    document.addEventListener("pointermove", pointer, { passive: true });
    return () => {
      ctx.revert();
      visibility.disconnect();
      document
        .querySelectorAll("[data-motion-visible]")
        .forEach((el) => el.removeAttribute("data-motion-visible"));
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", pointer);
    };
  }, [disabled, path]);
  return (
    <>
      <div className="reading-progress" aria-hidden="true" />
      <div
        ref={cursor}
        className={`focus-cursor ${disabled ? "off" : ""}`}
        aria-hidden="true"
      />
    </>
  );
}

export function ExperienceHero() {
  return (
    <section className="experience-hero">
      <div className="hero-grid wrap">
        <div className="hero-editorial">
          <Eyebrow>{homepage.hero.eyebrow}</Eyebrow>
          <h1>{homepage.hero.title}</h1>
          <p>{homepage.hero.description}</p>
          <div className="hero-actions">
            <Action>{homepage.hero.primary}</Action>
            <Action href="#how-it-works" secondary>{homepage.hero.secondary}</Action>
          </div>
        </div>
        <div className="hero-depth" data-cursor="View">
          <div className="hero-halo" />
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />
          <div className="hero-app">
            <div className="hero-app-label">
              <span>
                <School size={16} /> YOUR SCHOOL, IN SYNC
              </span>
              <span>Illustrative preview · 08:30</span>
            </div>
            <ProductCanvas mode={0} />
          </div>
          <div className="activity-card activity-attendance">
            <span className="activity-icon">
              <CheckCheck size={23} />
            </span>
            <div>
              <small>Morning register</small>
              <strong>Attendance recorded</strong>
              <span>Class 6A · Ready to review</span>
            </div>
          </div>
          <div className="activity-card activity-lesson">
            <span className="activity-icon orange-icon">
              <BookOpen size={22} />
            </span>
            <div>
              <small>Up next · 10:30</small>
              <strong>Science</strong>
              <span>Our environment</span>
            </div>
            <span className="lesson-clock">
              <Clock3 size={18} />
            </span>
          </div>
          <div className="activity-card activity-message">
            <span className="activity-icon">
              <MessageSquare size={21} />
            </span>
            <div>
              <small>Parents, kept in the loop</small>
              <strong>A little window into today.</strong>
              <span>Classroom update ready</span>
            </div>
          </div>
          <div className="floating-school-icon float-bell">
            <Bell size={27} />
          </div>
          <div className="floating-school-icon float-book">
            <NotebookPen size={28} />
          </div>
        </div>
      </div>
      <div className="hero-foot wrap"><p>{homepage.hero.strip}</p></div>
    </section>
  );
}

const connections = [
  {
    label: "Teacher",
    icon: BookOpen,
    action: "Records the register",
    className: "teacher-node",
  },
  {
    label: "Administrator",
    icon: CalendarDays,
    action: "Reviews the school day",
    className: "admin-node",
  },
  {
    label: "Parent",
    icon: MessageSquare,
    action: "Receives the right update",
    className: "parent-node",
  },
  {
    label: "School leader",
    icon: LayoutDashboard,
    action: "Sees the bigger picture",
    className: "leader-node",
  },
];
export function ConnectionMap() {
  const [active, setActive] = useState(0);
  const mapRef = useRef<HTMLDivElement>(null);
  const [wires, setWires] = useState({
    width: 1,
    height: 1,
    paths: [] as string[],
  });
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const measure = () => {
      const hub = map.querySelector<HTMLElement>(".connection-hub");
      if (!hub) return;
      const hx = hub.offsetLeft + hub.offsetWidth / 2,
        hy = hub.offsetTop + hub.offsetHeight / 2;
      const paths = Array.from(
        map.querySelectorAll<HTMLElement>(".connection-node"),
      ).map((node) => {
        const x = node.offsetLeft + node.offsetWidth / 2,
          y = node.offsetTop + node.offsetHeight / 2;
        const mid = (y + hy) / 2;
        return (
          "M" +
          x +
          " " +
          y +
          " C" +
          x +
          " " +
          mid +
          " " +
          hx +
          " " +
          mid +
          " " +
          hx +
          " " +
          hy
        );
      });
      setWires({ width: map.clientWidth, height: map.clientHeight, paths });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(map);
    map
      .querySelectorAll(".connection-node,.connection-hub")
      .forEach((el) => observer.observe(el));
    measure();
    return () => observer.disconnect();
  }, []);
  const disabled = useMotionDisabled();
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    if (disabled) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        clearInterval(timer);
        if (entry.isIntersecting)
          timer = setInterval(() => setActive((v) => (v + 1) % 4), 2600);
      },
      { threshold: 0.35 },
    );
    if (root.current) observer.observe(root.current);
    return () => {
      clearInterval(timer);
      observer.disconnect();
    };
  }, [disabled]);
  return (
    <section
      ref={root}
      className={`connections-section section wrap ${connectionStyles.diagram}`}
      id="connections"
    >
      <div className="section-heading">
        <h2>
          Made for the people
          <br />
          who make a <em>school.</em>
        </h2>
        <p>
          One update can make a difference to everyone. Connect the people
          behind every school day.
        </p>
      </div>
      <div ref={mapRef} className={`connection-map connection-step-${active}`}>
        <svg
          className={connectionStyles.mobileWires}
          viewBox={`0 0 ${wires.width} ${wires.height}`}
          aria-hidden="true"
        >
          {wires.paths.map((d, i) => (
            <path
              key={i}
              d={d}
              className={active === i ? connectionStyles.activeWire : undefined}
            />
          ))}
        </svg>
        <svg
          viewBox="0 0 1000 350"
          preserveAspectRatio="none"
          className="connection-wires"
          aria-hidden="true"
        >
          <path d="M140 80 C330 80 290 175 500 175 S710 80 860 80 M140 280 C330 280 290 175 500 175 S710 280 860 280" />
          <path
            className="wire-signal"
            d="M140 80 C330 80 290 175 500 175 S710 280 860 280"
          />
          <circle r="5" fill="#F36D22">
            <animateMotion
              dur="7s"
              repeatCount="indefinite"
              path="M140 80 C330 80 290 175 500 175 S710 280 860 280"
            />
          </circle>
        </svg>
        <div className="connection-hub">
          <img
            src="/cleezo-logo.png"
            width="52"
            height="55"
            alt="Cleezo Class"
          />
          <strong>
            One connected
            <br />
            school day.
          </strong>
          <span>Information that flows.</span>
        </div>
        {connections.map((n, i) => (
          <button
            className={`connection-node ${n.className} ${active === i ? "node-active" : ""}`}
            key={n.label}
            onClick={() => setActive(i)}
            aria-pressed={active === i}
          >
            <span className="node-icon">
              <n.icon size={24} />
            </span>
            <span>
              <strong>{n.label}</strong>
              <small>{n.action}</small>
            </span>
            <ArrowUpRight size={17} />
          </button>
        ))}
        <div className="travelling-update" key={active}>
          <Check size={15} />
          {connections[active].action}
        </div>
      </div>
      <p className="connection-caption">
        <span>Teacher records attendance</span>
        <ArrowRight size={14} aria-hidden="true" />
        <span>Office reviews</span>
        <ArrowRight size={14} aria-hidden="true" />
        <span>Parent stays informed</span>
        <ArrowRight size={14} aria-hidden="true" />
        <span>Leader sees the day</span>
      </p>
    </section>
  );
}

export function PlatformPreview() {
  const [tab, setTab] = useState("0");
  return (
    <section id="platform-preview" className="preview-section section">
      <div className="wrap">
        <div className="section-heading">
          <div>
            <Eyebrow>Your school day, at a glance</Eyebrow>
            <h2>
              A clear view.
              <br />A calmer <em>day.</em>
            </h2>
          </div>
          <p>
            From the first register to the latest class update. Explore four
            views into the same connected workspace.
          </p>
        </div>
        <Tabs value={tab} onValueChange={setTab} className="platform-tabs">
          <TabsList aria-label="Product preview" className="product-tab-list">
            {tabNames.map((t, i) => (
              <TabsTrigger value={String(i)} key={t}>
                {t}
                <span className="tab-number">0{i + 1}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          {tabNames.map((t, i) => (
            <TabsContent value={String(i)} key={t} className="product-panel">
              <ProductCanvas mode={i} />
            </TabsContent>
          ))}
        </Tabs>
        <p className="preview-caption">
          An illustrative preview with sample records. Explore your school’s
          exact configuration in a demo.
        </p>
      </div>
    </section>
  );
}

const checkpoints = [
  [
    "Attendance and schedules",
    "A clear start to the day.",
    "Class register",
    "Today’s timetable",
  ],
  [
    "Academics and learning",
    "Keep the lesson moving.",
    "Assignments",
    "Student progress",
  ],
  [
    "Finance and operations",
    "Give every detail a home.",
    "Fee receipts",
    "School records",
  ],
  [
    "Parents and communication",
    "Keep the right people informed.",
    "Class updates",
    "School notices",
  ],
];
export function ConnectedPathway() {
  const pathwayRef = useRef<HTMLDivElement>(null);
  const [wave, setWave] = useState({ width: 1100, height: 150, path: "" });
  useEffect(() => {
    const pathway = pathwayRef.current;
    if (!pathway) return;
    const measure = () => {
      const svg = pathway.querySelector<SVGSVGElement>(".pathway-svg");
      if (!svg || getComputedStyle(svg).display === "none") return;
      const bounds = svg.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      const points = Array.from(pathway.querySelectorAll(".stop-marker")).map(
        (marker) => {
          const box = marker.getBoundingClientRect();
          return {
            x: box.left + box.width / 2 - bounds.left,
            y: box.top + box.height / 2 - bounds.top,
          };
        },
      );
      if (points.length < 2) return;
      let path = "M" + points[0].x + " " + points[0].y;
      const stops = [
        ...points,
        { x: bounds.width, y: points[points.length - 1].y },
      ];
      for (let i = 1; i < stops.length; i++) {
        const a = stops[i - 1],
          b = stops[i],
          dx = b.x - a.x;
        const amplitude = Math.min(48, dx * 0.2) * (i % 2 ? -1 : 1);
        path +=
          " C" +
          (a.x + dx / 3) +
          " " +
          (a.y + amplitude) +
          " " +
          (b.x - dx / 3) +
          " " +
          (b.y + amplitude) +
          " " +
          b.x +
          " " +
          b.y;
      }
      setWave({ width: bounds.width, height: bounds.height, path });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(pathway);
    pathway
      .querySelectorAll(".stop-marker,.workflow-stop")
      .forEach((el) => observer.observe(el));
    window.addEventListener("resize", measure);
    measure();
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);
  return (
    <section className="pathway-section section wrap">
      <Eyebrow>Every handover, connected</Eyebrow>
      <h2>
        Good school days
        <br />
        have a natural <em>flow.</em>
      </h2>
      <div ref={pathwayRef} className="pathway">
        <svg
          className="pathway-svg"
          viewBox={`0 0 ${wave.width} ${wave.height}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d={wave.path} />
          <path className="workflow-route" pathLength="1" d={wave.path} />
        </svg>
        {checkpoints.map(([title, body, a, b], i) => {
          const Icon = icons[[0, 1, 4, 3][i]];
          return (
            <article className="workflow-stop" key={title}>
              <span className="stop-marker">0{i + 1}</span>
              <Icon size={28} />
              <h3>{title}</h3>
              <p>{body}</p>
              <div className="workflow-chips">
                <span>{a}</span>
                <span>{b}</span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

const looseCards = [
  ["Spreadsheet", FileCheck, -390, -110, -13],
  ["Attendance register", CalendarDays, -420, 80, 8],
  ["Parent message", MessageSquare, 350, -140, 12],
  ["Fee record", Wallet, 410, 70, -8],
  ["Assignment", BookOpen, -240, 200, 9],
  ["Timetable", Clock3, 200, 220, -12],
  ["School notice", Bell, 20, -200, 6],
  ["Student record", Users, 400, 220, 8],
] as const;
export function GatherWorkspace() {
  return (
    <section className="gather-track">
      <div className="gather-scene">
        <div className="wrap">
          <div className="gather-heading">
            <Eyebrow>From scattered to connected</Eyebrow>
            <h2>
              Your school day has
              <br />
              enough <em>moving parts.</em>
            </h2>
            <p>
              A register here. A spreadsheet there. Bring everyday work into a
              clearer rhythm.
            </p>
          </div>
          <div className="gather-art">
            <div className="gather-dashboard">
              <ProductCanvas compact />
              <span className="gather-result">
                <CheckCheck size={20} /> One connected workspace.
              </span>
            </div>
            {looseCards.map(([label, Icon, x, y, r]) => (
              <div
                key={label}
                className="scatter-card"
                style={{
                  transform: `translate(${x}px,${y}px) rotate(${r}deg)`,
                }}
              >
                <Icon size={24} />
                <span>{label}</span>
                <span className="scatter-rule" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const dayStages = [
  {
    time: "08:30",
    label: "The first bell",
    title: "Start with who’s here.",
    body: "A teacher records the class register. The school has a clear starting point for attendance and follow-up.",
    mode: 1,
  },
  {
    time: "10:30",
    label: "In the classroom",
    title: "Let the learning flow.",
    body: "Share a task, add a resource, and follow student submissions. Keep the lesson connected to what comes next.",
    mode: 2,
  },
  {
    time: "13:00",
    label: "Behind the scenes",
    title: "Keep the details in view.",
    body: "Administrators coordinate schedules, fees, staff and resources. Every checked detail makes the next handover easier.",
    mode: 4,
  },
  {
    time: "15:30",
    label: "Beyond the school gate",
    title: "Bring families into the day.",
    body: "A classroom notice. An attendance update. A learning task. Give parents a little window into their child’s school day.",
    mode: 3,
  },
];
export function SchoolDayTimeline() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [hours, minutes] = dayStages[active].time.split(":").map(Number);
  const hourAngle = (hours % 12) * 30 + minutes * 0.5;
  const minuteAngle = minutes * 6;
  const disabled = useMotionDisabled();
  useEffect(() => {
    if (disabled) return;
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(min-width:1000px)", () => {
      const trigger = ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (s) => setActive(Math.min(3, Math.floor(s.progress * 4))),
      });
      return () => trigger.kill();
    });
    return () => media.revert();
  }, [disabled]);
  const scene = (i: number) => {
    const s = dayStages[i];
    return (
      <div className="day-scene" key={s.time}>
        <div className="day-scene-copy">
          <span className="day-large-time">
            {s.time}
            <small>{s.label}</small>
          </span>
          <h3>{s.title}</h3>
          <p>{s.body}</p>
          <span className="day-task">
            <CheckCheck size={18} />
            {
              [
                "Register reviewed",
                "Assignment shared",
                "Records organised",
                "Families informed",
              ][i]
            }
          </span>
        </div>
        <div className="day-product">
          <ProductCanvas mode={s.mode} />
        </div>
      </div>
    );
  };
  return (
    <section
      ref={root}
      className={`day-timeline ${disabled ? "day-static" : ""}`}
      id="school-day"
    >
      <div className="day-sticky wrap">
        <div className="day-top">
          <div>
            <Eyebrow>One connected school day</Eyebrow>
            <h2>
              One day.
              <br />
              <em>So many connections.</em>
            </h2>
          </div>
          <div className="school-clock" aria-hidden="true">
            <svg
              className="clock-face"
              viewBox="0 0 100 100"
              aria-hidden="true"
            >
              <circle cx="50" cy="50" r="44" fill="none" />
              {Array.from({ length: 12 }, (_, i) => (
                <line
                  key={i}
                  x1="50"
                  y1="10"
                  x2="50"
                  y2={i % 3 === 0 ? 18 : 14}
                  transform={`rotate(${i * 30} 50 50)`}
                />
              ))}
            </svg>
            <span
              className="clock-hand clock-hour"
              style={{ transform: `rotate(${hourAngle}deg)` }}
            />
            <span
              className="clock-hand clock-minute"
              style={{ transform: `rotate(${minuteAngle}deg)` }}
            />
            <span className="clock-center" />
          </div>
        </div>
        <div className="day-time-controls" aria-label="School day stages">
          {dayStages.map((s, i) => (
            <button
              key={s.time}
              onClick={() => {
                if (root.current && innerWidth >= 1000 && !disabled) {
                  window.scrollTo({
                    top:
                      root.current.getBoundingClientRect().top +
                      window.scrollY +
                      (root.current.offsetHeight - innerHeight) *
                        (i / 4 + 0.02),
                    behavior: "smooth",
                  });
                } else {
                  setActive(i);
                }
              }}
              aria-pressed={active === i}
            >
              <span>{s.time}</span>
              <small>{s.label}</small>
              <i />
            </button>
          ))}
        </div>
        <div className="desktop-day-scene">{scene(active)}</div>
        <div className="mobile-day-scenes">
          {dayStages.map((_, i) => scene(i))}
        </div>
      </div>
    </section>
  );
}

export function StakeholderExperience() {
  const [role, setRole] = useState("0");
  return (
    <section className="role-experience section wrap" id="people">
      <div className="section-heading">
        <div>
          <Eyebrow>Same school. Different perspectives.</Eyebrow>
          <h2>
            The right view.
            <br />
            For <em>every person.</em>
          </h2>
        </div>
        <p>
          Give each person the context their next task needs. Choose a role to
          see their school day.
        </p>
      </div>
      <Tabs value={role} onValueChange={setRole}>
        <TabsList className="role-tab-list" aria-label="School roles">
          {roles.map((r, i) => (
            <TabsTrigger key={r.id} value={String(i)}>
              {r.name}
              <ArrowUpRight size={16} />
            </TabsTrigger>
          ))}
        </TabsList>
        {roles.map((r, i) => (
          <TabsContent key={r.id} value={String(i)}>
            <div className={`role-perspective role-perspective-${i}`}>
              <div className="role-photo">
                <img
                  src={
                    i === 3
                      ? "/indian-parent.webp"
                      : i === 0 || i === 1
                        ? "/indian-leader.webp"
                        : "/indian-classroom.webp"
                  }
                  srcSet={
                    i === 3
                      ? "/indian-parent-800.webp 800w, /indian-parent.webp 1536w"
                      : i === 0 || i === 1
                        ? "/indian-leader-800.webp 800w, /indian-leader.webp 1536w"
                        : "/indian-classroom-800.webp 800w, /indian-classroom.webp 1536w"
                  }
                  sizes="(max-width:600px) 100vw, 42vw"
                  alt={
                    i === 3
                      ? "Parent and child sharing a school moment"
                      : i === 0 || i === 1
                        ? "Indian school staff in a school environment"
                        : "Teacher and students in an Indian classroom"
                  }
                  loading="lazy"
                  width="800"
                  height="1000"
                />
                <div>
                  <span>THE {r.name.toUpperCase()} VIEW</span>
                  <strong>{r.value}</strong>
                </div>
              </div>
              <div className="role-information">
                <span className="role-kicker">
                  0{i + 1} / ONE CONNECTED PLATFORM
                </span>
                <h3>{r.title}</h3>
                <p>{r.body}</p>
                <div className="role-product">
                  <ProductCanvas mode={r.mode} compact />
                </div>
                <TextLink href={`/solutions/${r.id}`}>
                  Explore the {r.name.toLowerCase()} experience
                </TextLink>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}

export function HumanMoment() {
  return (
    <section className="human-moment">
      <img
        src="/indian-classroom.webp"
        srcSet="/indian-classroom-800.webp 800w, /indian-classroom.webp 1536w"
        sizes="100vw"
        alt="Indian students and a teacher sharing a learning moment in a classroom"
        width="1600"
        height="1067"
        loading="lazy"
      />
      <div className="human-overlay" />
      <div className="wrap human-copy">
        <Eyebrow>At the heart of it all</Eyebrow>
        <h2>
          Better organised.
          <br />
          <em>More human.</em>
        </h2>
        <p>
          Every register, assignment and update supports something more
          important: a child’s experience of learning.
        </p>
        <TextLink href="/about">Get to know Cleezo Class</TextLink>
      </div>
      <div className="human-note">
        <CheckCheck size={20} />
        <span>
          Less coordination.
          <br />
          <strong>More connection.</strong>
        </span>
      </div>
    </section>
  );
}

export function ModuleEcosystem() {
  const [active, setActive] = useState(0);
  const m = modules[active];
  return (
    <section className="module-ecosystem section">
      <div className="wrap">
        <div className="section-heading">
          <div>
            <Eyebrow>The connected platform</Eyebrow>
            <h2>
              The whole school.
              <br />
              <em>Thoughtfully organised.</em>
            </h2>
          </div>
          <TextLink href="/platform">Explore all modules</TextLink>
        </div>
        <div className="ecosystem-layout">
          <div className="ecosystem-grid" aria-label="Explore modules">
            {modules.map((m, i) => {
              const Icon = icons[i];
              return (
                <button
                  key={m.slug}
                  className={`ecosystem-module ${active === i ? "module-active" : ""}`}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  aria-pressed={active === i}
                >
                  <span className="ecosystem-icon">
                    <Icon size={28} />
                  </span>
                  <span className="module-order">0{i + 1}</span>
                  <strong>{m.title}</strong>
                  <ArrowUpRight size={17} />
                </button>
              );
            })}
          </div>
          <div className="ecosystem-focus" key={active}>
            <div className="ecosystem-platform">
              <img
                src="/cleezo-logo.png"
                width="48"
                height="50"
                alt="Cleezo Class"
              />
              <span>ONE CONNECTED PLATFORM</span>
            </div>
            <span className="focus-module-label">
              0{active + 1} / {m.label}
            </span>
            <h3>{m.tagline}</h3>
            <p>{m.intro}</p>
            <div className="module-feature-list">
              {m.features.slice(0, 3).map(([label]) => (
                <span key={label}>
                  <Check size={16} />
                  {label}
                </span>
              ))}
            </div>
            <TextLink href={modulePath(m.slug)}>Explore this module</TextLink>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AttendanceWalkthrough() {
  const [step, setStep] = useState("0");
  const [absent, setAbsent] = useState(true);
  const root = useRef<HTMLElement>(null);
  const disabled = useMotionDisabled();
  useEffect(() => {
    if (disabled) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(min-width:1000px)", () => {
      const trigger = ScrollTrigger.create({
        trigger: root.current,
        start: "top 55%",
        end: "bottom 85%",
        onUpdate: (s) => {
          if (!root.current?.contains(document.activeElement))
            setStep(String(Math.min(2, Math.floor(s.progress * 3))));
        },
      });
      return () => trigger.kill();
    });
    return () => mm.revert();
  }, [disabled]);
  return (
    <section ref={root} className="attendance-walkthrough section wrap">
      <div className="section-heading">
        <div>
          <Eyebrow>A closer look at the workflow</Eyebrow>
          <h2>
            One entry.
            <br />A useful <em>conversation.</em>
          </h2>
        </div>
        <p>
          Follow attendance from the morning register to the right parent
          update.
        </p>
      </div>
      <Tabs value={step} onValueChange={setStep} className="walkthrough-layout">
        <TabsList
          className="walkthrough-steps"
          aria-label="Attendance workflow"
        >
          {modules[0].workflow.map((s, i) => (
            <TabsTrigger key={s.title} value={String(i)}>
              <span>0{i + 1}</span>
              <span>
                <strong>{s.title}</strong>
                <small>{s.body}</small>
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
        {[0, 1, 2].map((i) => (
          <TabsContent value={String(i)} key={i} className="walkthrough-screen">
            <div className="walkthrough-toolbar">
              <span>
                <CalendarDays size={17} /> Morning register
              </span>
              <span>Illustrative preview</span>
            </div>
            <div className="walkthrough-body">
              <span className="mono">CLASS 6A · MORNING SESSION</span>
              <h3>
                {
                  [
                    "Set the day in context.",
                    "Record. Review. Confirm.",
                    "The right people, informed.",
                  ][i]
                }
              </h3>
              {i === 0 ? (
                <>
                  <div className="context-fields">
                    {[
                      ["Class", "6"],
                      ["Section", "A"],
                      ["Date", "21 September"],
                      ["Subject", "Science"],
                    ].map(([label, value]) => (
                      <div key={label}>
                        <small>{label}</small>
                        <strong>{value}</strong>
                        <Check size={16} />
                      </div>
                    ))}
                  </div>
                  <div className="lesson-banner">
                    <Clock3 size={23} />
                    <span>
                      10:30 · Science<small>Our environment · Class 6A</small>
                    </span>
                  </div>
                  <button className="button" onClick={() => setStep("1")}>
                    Open the register <ArrowRight size={17} />
                  </button>
                </>
              ) : i === 1 ? (
                <>
                  <p className="interaction-hint">
                    Try changing Kabir’s attendance status.
                  </p>
                  <div className="attendance-register">
                    {["Aarav S.", "Meera K.", "Riya P.", "Kabir A."].map(
                      (name, j) => (
                        <div key={name}>
                          <span className="student-initial">{name[0]}</span>
                          <strong>{name}</strong>
                          {j === 3 ? (
                            <button
                              className={`attendance-toggle ${absent ? "is-absent" : ""}`}
                              onClick={() => setAbsent(!absent)}
                              aria-label={`Kabir attendance: ${absent ? "Absent" : "Present"}. Click to change.`}
                            >
                              {absent ? "Absent" : "Present"}
                              <span />
                            </button>
                          ) : (
                            <span className="present-status">
                              <Check size={14} /> Present
                            </span>
                          )}
                        </div>
                      ),
                    )}
                  </div>
                  <button className="button" onClick={() => setStep("2")}>
                    Review follow-up <ArrowRight size={17} />
                  </button>
                </>
              ) : (
                <>
                  <div className="followup-card">
                    <span className="phone-header">
                      <MessageSquare size={20} /> Parent update
                    </span>
                    <span className="mono">DRAFT · FOR REVIEW</span>
                    <h4>
                      {absent ? "Attendance follow-up" : "Attendance confirmed"}
                    </h4>
                    <p>
                      {absent
                        ? "Kabir is marked absent from the morning register. Please contact the class teacher if this needs correcting."
                        : "Kabir is marked present in the morning register. The class record is ready to review."}
                    </p>
                    <span className="review-recipient">
                      <ShieldCheck size={17} /> Check recipient and school
                      settings
                    </span>
                  </div>
                  <div className="message-route">
                    <span>Cleezo Class</span>
                    <i />
                    <Send size={20} />
                    <span>Parent experience</span>
                  </div>
                  <p className="preview-caption">
                    Illustrative only. No message is sent.
                  </p>
                </>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}

const assistance = [
  "Give it context",
  "Review the suggestion",
  "Make it your own",
  "Approve the result",
];
export function HumanControlledAI() {
  const [step, setStep] = useState("0");
  return (
    <section className="human-ai section">
      <div className="wrap">
        <div className="section-heading">
          <div>
            <Eyebrow>AI & automation</Eyebrow>
            <h2>
              A helping hand.
              <br />
              <em>With people in control.</em>
            </h2>
          </div>
          <p>
            Support for timetable planning, homework suggestions and question
            paper preparation. Professional judgement stays at the centre.
          </p>
        </div>
        <Tabs value={step} onValueChange={setStep} className="ai-experience">
          <div className="ai-process">
            <span className="ai-caption">
              <Sparkles size={20} /> A useful starting point
            </span>
            <TabsList
              aria-label="AI review process"
              className="ai-process-list"
            >
              {assistance.map((label, i) => (
                <TabsTrigger key={label} value={String(i)}>
                  <span>0{i + 1}</span>
                  {label}
                  <ArrowRight size={18} />
                </TabsTrigger>
              ))}
            </TabsList>
            <TextLink href="/ai">Explore AI & Automation</TextLink>
          </div>
          {assistance.map((label, i) => (
            <TabsContent
              key={label}
              value={String(i)}
              className="ai-assistant-screen"
            >
              <div className="assistant-top">
                <span>
                  <Sparkles size={18} /> Teaching preparation
                </span>
                <span>Illustrative preview</span>
              </div>
              <div className="teacher-prompt">
                <span className="initial-badge">T</span>
                <p>
                  Help me prepare a plant observation task for Class 6 Science.
                </p>
              </div>
              <div className="assistant-draft">
                <span className="draft-tag">
                  {i === 0
                    ? "YOUR CONTEXT"
                    : i === 3
                      ? "TEACHER APPROVED"
                      : "SUGGESTION FOR REVIEW"}
                </span>
                <h3>
                  {i === 0
                    ? "Start with the lesson."
                    : "Observe a plant. Tell its story."}
                </h3>
                <p>
                  {i === 0
                    ? "Class 6 · Science · Our environment. The teacher defines the learning goal and relevant requirements."
                    : "Record three observations, add a labelled sketch, and write one question you would like to explore."}
                </p>
                {i >= 2 && (
                  <div className="teacher-edit">
                    <NotebookPen size={17} />
                    <p>
                      Teacher’s addition: choose a plant you can observe safely
                      at home or at school.
                    </p>
                  </div>
                )}
                {i >= 1 && (
                  <div className="ai-checks">
                    {["Accuracy", "Curriculum fit", "Age suitability"].map(
                      (x) => (
                        <span key={x}>
                          <Check size={14} />
                          {x}
                        </span>
                      ),
                    )}
                  </div>
                )}
              </div>
              <div className="ai-human-decision">
                <ShieldCheck size={19} />
                <span>
                  {i === 3
                    ? "People decide what goes into the lesson."
                    : "A suggestion is a starting point. Always review."}
                </span>
              </div>
              {i < 3 && (
                <button
                  className="ai-next"
                  onClick={() => setStep(String(i + 1))}
                >
                  {assistance[i + 1]}
                  <ArrowRight size={16} />
                </button>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}

export function SchoolDemo() {
  return (
    <section className="school-demo section wrap">
      <div className="demo-devices" data-cursor="View">
        <div className="demo-tablet">
          <span>TEACHER EXPERIENCE</span>
          <div>
            <BookOpen size={22} />
            <h4>Today’s learning</h4>
            <p>Science · Class 6A</p>
            <div className="tablet-task">
              Plant observation<small>Assignment ready for review</small>
            </div>
          </div>
        </div>
        <div className="demo-laptop">
          <ProductCanvas compact />
        </div>
        <div className="demo-phone">
          <span className="phone-island" />
          <div className="phone-brand">
            <img
              src="/cleezo-logo.png"
              width="26"
              height="28"
              alt="Cleezo Class"
            />
            <span>Parent view</span>
          </div>
          <h4>
            A little closer
            <br />
            to their day.
          </h4>
          <div className="phone-update">
            <Bell size={20} />
            <strong>Classroom update</strong>
            <p>Today, Class 6 explored plants and their surroundings.</p>
            <span>Science · Today</span>
          </div>
          <div className="phone-task">
            <BookOpen size={18} />
            <span>
              Plant observation<small>Learning task</small>
            </span>
          </div>
          <span className="phone-home" />
        </div>
        <p className="device-caption">Illustrative previews · sample data</p>
      </div>
      <div className="school-demo-copy">
        <Eyebrow>Built around your school</Eyebrow>
        <h2>
          See your school
          <br />
          in <em>Cleezo Class.</em>
        </h2>
        <div className="demo-promises">
          {[
            "One connected platform",
            "Every important school workflow",
            "Built around the people who use it",
          ].map((x) => (
            <p key={x}>
              <Check size={19} />
              {x}
            </p>
          ))}
        </div>
        <Action>Book Your School Demo</Action>
        <p className="demo-small-note">
          Bring a real workflow. See how it could connect.
        </p>
      </div>
    </section>
  );
}

export function EditorialResources() {
  return (
    <section className="editorial-resources section">
      <div className="wrap">
        <div className="section-heading">
          <div>
            <Eyebrow>Ideas for a better school day</Eyebrow>
            <h2>
              A little clarity.
              <br />
              <em>A better next step.</em>
            </h2>
          </div>
          <TextLink href="/resources">All resources</TextLink>
        </div>
        <div className="editorial-carousel">
          {resources.map((r, i) => (
            <Link
              href={`/resources/${r.slug}`}
              className="editorial-card"
              key={r.slug}
              data-cursor="Explore"
            >
              <div className="editorial-image">
                <img
                  src={
                    [
                      "/indian-classroom.webp",
                      "/indian-leader.webp",
                      "/indian-parent.webp",
                    ][i % 3]
                  }
                  srcSet={
                    [
                      "/indian-classroom-800.webp 800w, /indian-classroom.webp 1536w",
                      "/indian-leader-800.webp 800w, /indian-leader.webp 1536w",
                      "/indian-parent-800.webp 800w, /indian-parent.webp 1536w",
                    ][i % 3]
                  }
                  sizes="(max-width:600px) 85vw, 33vw"
                  width="800"
                  height="600"
                  alt={
                    [
                      "A learning moment at an Indian school",
                      "Indian school staff at work",
                      "A family sharing a school moment",
                    ][i % 3]
                  }
                  loading="lazy"
                />
                <span>0{i + 1}</span>
              </div>
              <div className="editorial-card-copy">
                <span className="tiny-eyebrow">
                  {r.category} · {r.minutes}
                </span>
                <h3>{r.title}</h3>
                <p>{r.description}</p>
                <span className="editorial-link">
                  Read the guide
                  <ArrowUpRight size={21} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
