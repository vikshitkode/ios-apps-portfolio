"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export default function Home() {
  const [activeSection, setActiveSection] = useState("")
  const sectionsRef = useRef<(HTMLElement | null)[]>([])
  const setSectionRef = (index: number) => (el: HTMLElement | null) => {
  sectionsRef.current[index] = el;
};

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3, rootMargin: "0px 0px -20% 0px" },
    )

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (sectionId: string) => {
  const el = document.getElementById(sectionId);
  const header = document.querySelector("header");
  if (!el || !header) return;

  const headerHeight = (header as HTMLElement).offsetHeight;
  const rect = el.getBoundingClientRect();

  const elementTop = rect.top + window.scrollY;
  const elementHeight = rect.height;

  // Available vertical space under the fixed header
  const available = window.innerHeight - headerHeight;

  // Scroll so the element's center sits in the center of the available area
  let target =
    elementTop - headerHeight + Math.max(0, (elementHeight - available) / 2);

  // Clamp to document bounds
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  target = Math.max(0, Math.min(target, maxScroll));

  window.scrollTo({ top: target, behavior: "smooth" });
};


  return (
    <div className="min-h-screen text-foreground relative">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 border-b border-border/20">
        <nav className="max-w-4xl mx-auto px-8 lg:px-16 py-6">
          <div className="flex items-center justify-center gap-12">
            {[
              { id: "intro", label: "HOME" },
              { id: "work", label: "EXPERIENCE" },
              { id: "projects", label: "PROJECTS" },
              { id: "connect", label: "CONNECT" },
            ].map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`text-sm font-medium tracking-wide transition-colors duration-300 hover:text-foreground ${
                  activeSection === section.id ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto px-8 lg:px-16 pt-20">
        <header
          id="intro"
          ref={setSectionRef(0)}
          className="min-h-[80vh] flex items-center opacity-0"
        >
          <div className="grid lg:grid-cols-5 gap-16 w-full">
            <div className="lg:col-span-3 space-y-8">
              <div className="space-y-2">
                <h1 className="text-6xl lg:text-7xl font-light tracking-tight">
                  Sai Vikshit
                  <br />
                  <span className="text-muted-foreground">Kode</span>
                </h1>
              </div>

              <div className="space-y-6 max-w-md">
                <p className="text-xl text-muted-foreground leading-relaxed">
                  iOS Developer crafting native mobile Applications with
                  <span className="text-gradient-primary font-semibold"> Swift</span>,
                  <span className="text-gradient-secondary font-semibold"> SwiftUI</span>, and
                  <span className="text-gradient-primary font-semibold"> modern iOS frameworks</span>.
                </p>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                    Available for work
                  </div>
                  <div>Seattle, WA</div>
                </div>

                <button className="btn-gradient px-8 py-3 rounded-full font-medium text-white shadow-lg">
                  Get In Touch
                </button>
              </div>
            </div>

            <div className="lg:col-span-2 flex flex-col justify-end space-y-8">
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">CURRENTLY</div>
                <div className="space-y-2">
                  <div className="text-foreground">Freelance iOS Developer</div>
                  <div className="text-muted-foreground">@ Indieveloper</div>
                  <div className="text-xs text-muted-foreground">2021 — Present</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">FOCUS</div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Swift",
                    "SwiftUI",
                    "UIKit",
                    "SwiftData",
                    "HealthKit",
                    "MongoDB Realm",
                    "Combine",
                    "CloudKit",
                    "MapKit",
                    "Foundation ML",
                    "XCTest"
                  ].map((skill) => (
                    <span key={skill} className="skill-tag-gradient px-3 py-1 text-xs rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>

        <section id="work" ref={setSectionRef(1)} className="py-32 opacity-0 min-h-screen">
          <div className="space-y-16">
            <div className="flex items-end justify-between">
              <h2 className="text-4xl font-light">
                <span className="text-gradient-primary">Experience</span>
              </h2>
              <div className="text-sm text-muted-foreground font-mono">2021 — 2023</div>
            </div>

            <div className="space-y-12">
              {[
                {
                  year: "2021-2023",
                  role: "iOS Developer",
                  company: "Freelancer",
                  description:
                    "Designed and developed a comprehensive health tracking app leveraging HealthKit to integrate real-time fitness and wellness data. Implemented SwiftData for efficient, local-first data management with seamless syncing across devices. Built features for activity tracking, weight monitoring, and step analysis with intuitive SwiftUI interfaces. Optimized performance and ensured data privacy while delivering a clean, user-friendly experience tailored for long-term health insights.",
                  tech: ["SwiftUI", "HealthKit", "SwiftData"],
                },
              ].map((job, index) => (
                <div key={index} className="group card-gradient-border grid lg:grid-cols-12 gap-8 py-8 rounded-lg px-6">
                  <div className="lg:col-span-2">
                    <div className="text-lg font-light text-muted-foreground">{job.year}</div>
                  </div>

                  <div className="lg:col-span-6 space-y-3">
                    <div>
                      <h3 className="text-xl font-medium">{job.role}</h3>
                      <div className="text-muted-foreground">{job.company}</div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed max-w-lg">{job.description}</p>
                  </div>

                  <div className="lg:col-span-4 flex flex-wrap gap-2 lg:justify-end">
                    {job.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs text-muted-foreground rounded group-hover:border-muted-foreground/50 transition-colors duration-500"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="projects"
          ref={setSectionRef(2)}
          className="py-32 opacity-0 min-h-screen flex items-center"
        >
          <div className="space-y-16 w-full">
            <h2 className="text-4xl font-light text-center">
              Personal <span className="text-gradient-secondary">iOS Apps</span>
            </h2>

            <div className="grid lg:grid-cols-2 gap-12">
              <article className="group card-gradient-border p-8 rounded-lg">
                <div className="space-y-6 text-center">
                  {/* App Icon */}
                  <div className="flex justify-center">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/StepBuddy%20App%20Icon-iOS-Default-1024x1024%401x-W57N3DtKSF1DxxypjXdEGY1vFuLxC4.png"
                      alt="Step Buddy App Icon"
                      className="w-42 h-42 rounded-2xl object-contain"
                    />
                  </div>

                  {/* Project Info */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-medium">Step Buddy</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      A comprehensive fitness tracking app that motivates users to stay active with step counting, goal
                      setting, and social challenges. Built with HealthKit integration for accurate health data.
                    </p>
                  </div>

                  {/* GitHub Link */}
                  <div className="pt-4">
                    <a
                      href="https://github.com/vikshitkode/StepBuddy"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        console.log("[v0] Step Buddy GitHub link clicked")
                        console.log("[v0] Link href:", e.currentTarget.href)
                      }}
                      className="inline-flex items-center gap-2 text-sm group-hover:text-foreground transition-all duration-300 hover:scale-105 relative z-10 cursor-pointer"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      View on GitHub
                    </a>
                  </div>
                </div>
              </article>

              <article className="group card-gradient-border p-8 rounded-lg">
                <div className="space-y-6 text-center">
                  {/* App Icon */}
                  <div className="flex justify-center">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Exported%20PNG%20image-Q3eTrzq7pfJPbhrcrCYebHnvReyKQm.png"
                      alt="War Card Game App Icon"
                      className="w-42 h-42 rounded-2xl object-contain"
                    />
                  </div>

                  {/* Project Info */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-medium">War Card Game</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Classic card game reimagined for iOS with smooth animations, multiplayer support, and engaging
                      gameplay. Features custom card designs and intuitive touch controls.
                    </p>
                  </div>

                  {/* GitHub Link */}
                  <div className="pt-4">
                    <a
                      href="https://github.com/vikshitkode/War-Card-Game"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        console.log("[v0] War Card Game GitHub link clicked")
                        console.log("[v0] Link href:", e.currentTarget.href)
                      }}
                      className="inline-flex items-center gap-2 text-sm group-hover:text-foreground transition-all duration-300 hover:scale-105 relative z-10 cursor-pointer"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      View on GitHub
                    </a>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="connect" ref={setSectionRef(3)} className="py-32 opacity-0 min-h-screen">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <h2 className="text-4xl font-light">
                Let's <span className="text-gradient-primary">Connect</span>
              </h2>

              <div className="space-y-6">
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Always interested in new iOS projects, collaborations, and conversations about mobile development.
                </p>

                <div className="space-y-4">
                  <Link
                    href="mailto:kvikshit7@gmail.com"
                    className="group btn-gradient inline-flex items-center gap-3 px-6 py-3 rounded-full text-white font-medium shadow-lg"
                  >
                    <span className="text-lg">Drop an Email</span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="text-sm text-muted-foreground font-mono">ELSEWHERE</div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    name: "GitHub",
                    handle: "@vikshitkode",
                    url: "https://github.com/vikshitkode",
                    icon: (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    ),
                  },
                  {
                    name: "Twitter / X",
                    handle: "@vikshitkode",
                    url: "https://twitter.com/vikshitkode",
                    icon: (
                      <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/vecteezy_new-twitter-x-logo-twitter-icon-x-social-media-icon_42148611-btGZrb4lIZrQKOb7B6NidwKCFPZmh0.png"
                        alt="X (Twitter) Logo"
                        className="w-6 h-6 object-contain"
                      />
                    ),
                  },
                  {
                    name: "LinkedIn",
                    handle: "@vikshitkode",
                    url: "https://linkedin.com/in/vikshitkode",
                    icon: (
                      <svg className="w-5 h-5" fill="#0077B5" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    ),
                  },
                  {
                    name: "App Store",
                    handle: "Sai Vikshit Kode",
                    url: "https://developer.apple.com/account",
                    icon: (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51.65.03 2.5.87 3.81.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                      </svg>
                    ),
                  },
                ].map((social) => (
                  <Link
                    key={social.name}
                    href={social.url}
                    className="group card-gradient-border p-4 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-foreground transition-colors duration-300">
                        {social.icon}
                        {social.name}
                      </div>
                      <div className="text-sm">{social.handle}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer className="py-16 border-t border-border">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">© 2025 Sai Vikshit Kode. All rights reserved.</div>
              <div className="text-xs text-muted-foreground">Built with Next.js</div>
            </div>

            <div className="flex items-center gap-4">
              <button className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300">
                <svg
                  className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
