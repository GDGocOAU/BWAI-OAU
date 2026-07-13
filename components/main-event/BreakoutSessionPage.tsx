"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { FiArrowLeft, FiCode, FiBarChart2, FiShield, FiPenTool, FiUsers, FiCalendar, FiMapPin } from "react-icons/fi";
import { FaLinkedinIn, FaXTwitter, FaGithub } from "react-icons/fa6";
import { FiGlobe } from "react-icons/fi";
import PillTag from "@/components/PillTag";
import {
    HERO_PILL_TONE_COLORS,
    EVENT_DATES,
    EVENT_LOCATION,
    type BreakoutSession,
    type PreSeriesSpeaker,
} from "@/lib/config";

const TRACK_ICONS: Record<string, typeof FiCode> = {
    "Web Development": FiCode,
    "Data Science": FiBarChart2,
    "Cybersecurity": FiShield,
    "Design": FiPenTool,
};

// Deep, saturated gradient per track — the accent color is layered on top as a glow.
const TRACK_BANNER_GRADIENTS: Record<string, string> = {
    "Web Development": "from-[#062b1c] via-[#0b4a2e] to-[#08160f]",
    "Data Science": "from-[#051b33] via-[#0d3f73] to-[#050f1c]",
    "Cybersecurity": "from-[#1a1a1a] via-[#2e2e2e] to-[#0d0d0d]",
    "Design": "from-[#3a2504] via-[#6b4a08] to-[#1c1302]",
};

function SpeakerCard({ speaker, index }: { speaker: PreSeriesSpeaker; index: number }) {
    return (
        <motion.div
            className="flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.08 }}
        >
            <div className="aspect-square w-full overflow-hidden bg-surface">
                <img
                    src={speaker.photo}
                    alt={speaker.name}
                    loading="lazy"
                    className="h-full w-full object-cover"
                />
            </div>
            <div className="flex flex-1 flex-col p-5">
                <span className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-coreBlue">
                    {speaker.role}
                </span>
                <h3 className="mt-1.5 text-lg font-bold leading-snug text-ink">
                    {speaker.name}
                </h3>
                {speaker.organization && (
                    <p className="mt-1 text-sm text-ink/60">{speaker.organization}</p>
                )}
                {speaker.bio && (
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-ink/70">
                        {speaker.bio}
                    </p>
                )}
                {speaker.socials && (
                    <div className="mt-4 flex items-center gap-4 border-t border-ink/10 pt-4">
                        {speaker.socials.linkedin && (
                            <a
                                href={speaker.socials.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-ink/55 transition-colors hover:text-[#0077b5]"
                                aria-label={`${speaker.name}'s LinkedIn`}
                            >
                                <FaLinkedinIn size={16} />
                            </a>
                        )}
                        {speaker.socials.twitter && (
                            <a
                                href={speaker.socials.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-ink/55 transition-colors hover:text-black"
                                aria-label={`${speaker.name}'s Twitter`}
                            >
                                <FaXTwitter size={16} />
                            </a>
                        )}
                        {speaker.socials.github && (
                            <a
                                href={speaker.socials.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-ink/55 transition-colors hover:text-[#24292e]"
                                aria-label={`${speaker.name}'s GitHub`}
                            >
                                <FaGithub size={16} />
                            </a>
                        )}
                        {speaker.socials.website && (
                            <a
                                href={speaker.socials.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-ink/55 transition-colors hover:text-[#4285F4]"
                                aria-label={`${speaker.name}'s Website`}
                            >
                                <FiGlobe size={16} />
                            </a>
                        )}
                    </div>
                )}
            </div>
        </motion.div>
    );
}

function FeaturedSpeaker({
    speaker,
    accentColor,
}: {
    speaker: PreSeriesSpeaker;
    accentColor: string;
}) {
    return (
        <motion.div
            className="grid gap-8 rounded-2xl border border-ink/10 bg-white p-6 sm:p-8 md:grid-cols-3"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
        >
            <div className="md:col-span-1">
                <div
                    className="aspect-square w-full max-w-72 overflow-hidden rounded-2xl border-2 bg-surface md:max-w-none"
                    style={{ borderColor: accentColor }}
                >
                    <img
                        src={speaker.photo}
                        alt={speaker.name}
                        loading="lazy"
                        className="h-full w-full object-cover"
                    />
                </div>
            </div>

            <div className="flex flex-col md:col-span-2">
                <h3 className="text-2xl font-bold leading-snug text-ink sm:text-3xl">
                    {speaker.name}
                </h3>
                {speaker.organization && (
                    <p className="mt-1.5 text-[1rem] text-ink/60">{speaker.organization}</p>
                )}

                {speaker.bio && (
                    <p className="whitespace-pre-line text-[1rem] leading-7 text-ink/75">
                        {speaker.bio}
                    </p>
                )}

                {speaker.socials && (
                    <div className="mt-6 flex items-center gap-3 border-t border-ink/10 pt-6">
                        {speaker.socials.linkedin && (
                            <a
                                href={speaker.socials.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink/60 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0077b5] hover:bg-[#0077b5] hover:text-white"
                                aria-label={`${speaker.name}'s LinkedIn`}
                            >
                                <FaLinkedinIn size={16} />
                            </a>
                        )}
                        {speaker.socials.twitter && (
                            <a
                                href={speaker.socials.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink/60 transition-all duration-200 hover:-translate-y-0.5 hover:border-black hover:bg-black hover:text-white"
                                aria-label={`${speaker.name}'s Twitter`}
                            >
                                <FaXTwitter size={16} />
                            </a>
                        )}
                        {speaker.socials.github && (
                            <a
                                href={speaker.socials.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink/60 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#24292e] hover:bg-[#24292e] hover:text-white"
                                aria-label={`${speaker.name}'s GitHub`}
                            >
                                <FaGithub size={16} />
                            </a>
                        )}
                        {speaker.socials.website && (
                            <a
                                href={speaker.socials.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink/60 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#4285F4] hover:bg-[#4285F4] hover:text-white"
                                aria-label={`${speaker.name}'s Website`}
                            >
                                <FiGlobe size={16} />
                            </a>
                        )}
                    </div>
                )}
            </div>
        </motion.div>
    );
}

type Props = {
    session: BreakoutSession;
};

export default function BreakoutSessionPage({ session }: Props) {
    const accentColor = HERO_PILL_TONE_COLORS[session.accent];
    const Icon = TRACK_ICONS[session.track] ?? FiUsers;

    return (
        <main className="min-h-screen bg-base">
            {/* ── Banner ─────────────────────────────────────────── */}
            <section
                className={`relative overflow-hidden bg-gradient-to-br px-4 py-20 sm:px-6 sm:py-24 lg:px-8 ${
                    TRACK_BANNER_GRADIENTS[session.track] ?? "from-ink via-ink to-ink"
                }`}
            >
                {/* Accent glows */}
                <div
                    className="pointer-events-none absolute -right-20 -top-24 h-96 w-96 rounded-full blur-3xl"
                    style={{ backgroundColor: accentColor, opacity: 0.35 }}
                    aria-hidden="true"
                />
                <div
                    className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full blur-3xl"
                    style={{ backgroundColor: accentColor, opacity: 0.15 }}
                    aria-hidden="true"
                />

                {/* Dot-grid texture */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-20"
                    style={{
                        backgroundImage:
                            "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
                        backgroundSize: "24px 24px",
                    }}
                    aria-hidden="true"
                />

                {/* Oversized watermark icon */}
                <Icon
                    size={320}
                    className="pointer-events-none absolute -bottom-16 -right-10 text-white/5"
                    aria-hidden="true"
                />

                {/* Accent bar */}
                <div
                    className="absolute inset-x-0 top-0 h-1.5"
                    style={{ backgroundColor: accentColor }}
                    aria-hidden="true"
                />

                <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col">
                    <Link
                        href="/main-event"
                        className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-white/80 transition-colors hover:text-white"
                    >
                        <FiArrowLeft size={14} aria-hidden="true" />
                        Back to Main Event
                    </Link>

                    <motion.div
                        className="mt-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, ease: "easeOut" }}
                    >
                        <div className="flex flex-wrap items-center gap-3">
                            <span
                                className="flex h-12 w-12 items-center justify-center rounded-full backdrop-blur-sm"
                                style={{ backgroundColor: `${accentColor}55` }}
                                aria-hidden="true"
                            >
                                <Icon size={22} className="text-white" />
                            </span>
                            <PillTag
                                label={`${session.track} Breakout`}
                                color={accentColor}
                                className="w-fit px-3 py-1.5 text-xs shadow-none ring-0"
                            />
                        </div>
                        <h1 className="mt-5 max-w-4xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                            {session.title}
                        </h1>
                    </motion.div>
                </div>
            </section>

            {/* ── Overview ───────────────────────────────────────── */}
            <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-3">
                    <motion.div
                        className="lg:col-span-2"
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-xl font-bold text-ink sm:text-2xl">
                            What this session entails
                        </h2>
                        <p className="mt-4 text-[1.02rem] leading-8 text-ink/75">
                            {session.description}
                        </p>
                    </motion.div>

                    {/* Meta card */}
                    <motion.div
                        className="rounded-2xl border border-ink/10 bg-white p-6"
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <h3 className="text-sm font-bold uppercase tracking-wide text-ink/50">
                            Details
                        </h3>
                        <dl className="mt-4 space-y-4">
                            <div className="flex items-start gap-3">
                                <span
                                    className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                                    style={{ backgroundColor: `${accentColor}55` }}
                                >
                                    <FiCalendar size={14} className="text-ink/70" aria-hidden="true" />
                                </span>
                                <dd className="text-sm leading-6 text-ink/80">
                                    {EVENT_DATES.mainEvent} • 1:00 PM breakout slot
                                </dd>
                            </div>
                            <div className="flex items-start gap-3">
                                <span
                                    className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                                    style={{ backgroundColor: `${accentColor}55` }}
                                >
                                    <FiMapPin size={14} className="text-ink/70" aria-hidden="true" />
                                </span>
                                <dd className="text-sm leading-6 text-ink/80">
                                    {EVENT_LOCATION.mainEvent}
                                </dd>
                            </div>
                        </dl>
                    </motion.div>
                </div>
            </section>

            {/* ── Speakers ───────────────────────────────────────── */}
            <section className="mx-auto w-full max-w-7xl bg-surface/50 px-4 py-14 sm:px-6 lg:px-8">
                <motion.h2
                    className="text-2xl font-bold text-ink sm:text-3xl"
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.4 }}
                    transition={{ duration: 0.5 }}
                >
                    Speaker
                </motion.h2>
                <p className="mt-2 text-ink/65">
                    The person leading the {session.track} breakout.
                </p>

                {session.speakers.length === 1 ? (
                    <div className="mt-8">
                        <FeaturedSpeaker
                            speaker={session.speakers[0]}
                            accentColor={accentColor}
                        />
                    </div>
                ) : session.speakers.length > 1 ? (
                    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {session.speakers.map((speaker, index) => (
                            <SpeakerCard
                                key={speaker.name}
                                speaker={speaker}
                                index={index}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink/15 bg-white/60 px-6 py-12 text-center">
                        <FiUsers size={28} className="text-ink/25" aria-hidden="true" />
                        <p className="mt-3 text-sm font-medium text-ink/55">
                            Speaker line-up for this session will be added soon.
                        </p>
                    </div>
                )}
            </section>
        </main>
    );
}
