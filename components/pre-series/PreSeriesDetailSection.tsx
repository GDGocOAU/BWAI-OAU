"use client";

import { motion } from "motion/react";
import { FiArrowUpRight } from "react-icons/fi";
import PreSeriesHero from "@/components/pre-series/PreSeriesHero";
import EventCard from "@/components/pre-series/EventCard";
import BlackPillButton from "@/components/BlackPillButton";
import { PRESERIES_EVENTS, SITE_LINKS } from "@/lib/config";

// Static "What to Expect" content per event (one bullet list per community)
const WHAT_TO_EXPECT = [
    {
        community: "Mobile & Web Dev",
        accent: "#5cdb6d",
        points: [
            "Vibe coding and AI-assisted web development",
            "Building AI agent interfaces for the modern web",
            "Hands-on sessions with real production tooling",
        ],
    },
    {
        community: "Quantum Finance",
        accent: "#ff7daf",
        points: [
            "Introduction to quantum computing concepts",
            "Keynote on superposition and quantum states",
            "Idea refinement and one-on-one moments with mentors",
        ],
    },
    {
        community: "Game Development",
        accent: "#ffd427",
        points: [
            "Exploring interactive systems through AI-assisted creation",
            "AI-powered game design and rapid prototyping",
            "Full-day workshop with industry speakers",
        ],
    },
    {
        community: "Cybersecurity",
        accent: "#d8d8d8",
        points: [
            "Leveraging AI tools to increase security workflow",
            "Practical AI-driven threat detection techniques",
            "Hands-on with modern security tooling",
        ],
    },
    {
        community: "Data Science & ML",
        accent: "#57caff",
        points: [
            "Building AI agents with Antigravity",
            "Turning raw data into intelligent decisions",
            "Diagnosing real-world problems with data workflows",
        ],
    },
] as const;

export default function PreSeriesDetailSection() {
    return (
        <motion.main
            id="pre-series-detail"
            className="w-full overflow-x-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            {/* ── Hero ─────────────────────────────────────────── */}
            <PreSeriesHero />

            {/* ── Events Grid ──────────────────────────────────── */}
            <section
                aria-labelledby="events-heading"
                className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14"
            >
                <motion.h2
                    id="events-heading"
                    className="mb-8 text-2xl font-bold text-ink sm:text-3xl"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.4 }}
                    transition={{ duration: 0.5 }}
                >
                    The Events
                </motion.h2>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {PRESERIES_EVENTS.map((event, index) => (
                        <EventCard
                            key={`${event.community}-${event.date}`}
                            event={event}
                            index={index}
                        />
                    ))}
                </div>
            </section>

            {/* ── What to Expect ───────────────────────────────── */}
            <section
                aria-labelledby="expect-heading"
                className="bg-surface/50 px-4 py-14 sm:px-6 lg:px-8 lg:py-20"
            >
                <div className="mx-auto max-w-7xl">
                    <motion.div
                        className="mb-10 text-center"
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.4 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2
                            id="expect-heading"
                            className="text-2xl font-bold text-ink sm:text-3xl"
                        >
                            What to Expect
                        </h2>
                        <p className="mt-3 text-ink/70">
                            Each community brings its own flavour — here&apos;s
                            a snapshot of what&apos;s in store.
                        </p>
                    </motion.div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {WHAT_TO_EXPECT.map((item, index) => (
                            <motion.div
                                key={item.community}
                                className="rounded-2xl border border-ink/10 bg-white p-6"
                                initial={{ opacity: 0, y: 14 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false, amount: 0.2 }}
                                transition={{
                                    duration: 0.4,
                                    ease: "easeOut",
                                    delay: index * 0.07,
                                }}
                            >
                                {/* Accent dot + community label */}
                                <div className="mb-4 flex items-center gap-2">
                                    <span
                                        className="h-3 w-3 rounded-full"
                                        style={{
                                            backgroundColor: item.accent,
                                        }}
                                        aria-hidden="true"
                                    />
                                    <span className="text-sm font-semibold text-ink/80">
                                        {item.community}
                                    </span>
                                </div>

                                <ul className="space-y-3">
                                    {item.points.map((point) => (
                                        <li
                                            key={point}
                                            className="flex items-start gap-2 text-sm text-ink/75"
                                        >
                                            <FiArrowUpRight
                                                size={14}
                                                className="mt-0.5 shrink-0 text-ink/40"
                                                aria-hidden="true"
                                            />
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Footer CTA ───────────────────────────────────── */}
            <section
                aria-labelledby="main-event-cta"
                className="px-4 py-16 sm:px-6 lg:px-8"
            >
                <div className="mx-auto max-w-4xl text-center">
                    <motion.div
                        className="flex flex-col items-center gap-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.4 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2
                            id="main-event-cta"
                            className="text-2xl font-bold text-ink sm:text-3xl"
                        >
                            It all builds toward the Main Event
                        </h2>
                        <p className="max-w-2xl leading-8 text-ink/70">
                            The pre-series sessions are the warm-up. On{" "}
                            <span className="font-semibold text-ink">
                                May 16, 2026
                            </span>
                            , every community comes together for a full day of
                            keynotes, showcases, and networking at BOOC, OAU.
                        </p>
                        <BlackPillButton
                            label="View Main Event"
                            href={SITE_LINKS.mainEvent}
                            className="px-8"
                        />
                    </motion.div>
                </div>
            </section>
        </motion.main>
    );
}
