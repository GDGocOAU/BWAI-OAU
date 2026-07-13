"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
    FiArrowLeft,
    FiArrowUpRight,
    FiArrowRight,
    FiCalendar,
    FiMapPin,
    FiLayers,
    FiCheckCircle,
    FiBookOpen,
    FiPackage,
    FiCamera,
    FiUsers,
    FiImage,
} from "react-icons/fi";
import { FaLinkedinIn, FaXTwitter, FaGithub } from "react-icons/fa6";
import { FiGlobe } from "react-icons/fi";
import PillTag from "@/components/PillTag";
import ProjectCard from "@/components/what-was-built/ProjectCard";
import { apiClient } from "@/lib/axios";
import {
    HERO_PILL_TONE_COLORS,
    type PreSeriesEventDetail,
    type PreSeriesSpeaker,
    type Project,
} from "@/lib/config";

type PreSeriesEvent = {
    readonly community: string;
    readonly communitySlug: string;
    readonly title: string;
    readonly date: string;
    readonly location: string;
    readonly format: string;
    readonly registrationHref: string;
    readonly googlePhotosHref: string;
    readonly accent: keyof typeof HERO_PILL_TONE_COLORS;
    readonly status: string;
};

type Props = {
    event: PreSeriesEvent;
    detail: PreSeriesEventDetail;
    photoUrls: string[];
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

const LIKED_PROJECTS_STORAGE_KEY = "bwai-liked-project-ids";
const DEVICE_ID_STORAGE_KEY = "bwai-device-id";

export default function PreSeriesEventPage({ event, detail, photoUrls }: Props) {
    const accentColor = HERO_PILL_TONE_COLORS[event.accent];
    const isPast = event.status === "past";
    const hasPhotos = photoUrls.some((url) => url && url !== "#");
    const previewPhotos = photoUrls.filter((url) => url && url !== "#").slice(0, 6);

    // ── Live "What Got Built" data (from the same DB as /what-was-built) ──
    const [allProjects, setAllProjects] = useState<Project[]>([]);
    const [isLoadingProjects, setIsLoadingProjects] = useState(true);
    const [likedProjects, setLikedProjects] = useState<Set<number>>(new Set());
    const [likingProjects, setLikingProjects] = useState<Set<number>>(new Set());
    const [deviceId, setDeviceId] = useState<string>("");

    // Live DB projects are tagged with the same community label as the event.
    // Fall back to the config-mapped name for any older records.
    const projects = useMemo(
        () =>
            allProjects.filter(
                (project) =>
                    project.community === event.community ||
                    (detail.projectCommunity &&
                        project.community === detail.projectCommunity),
            ),
        [allProjects, event.community, detail.projectCommunity],
    );

    useEffect(() => {
        const existingDeviceId = window.localStorage.getItem(DEVICE_ID_STORAGE_KEY);
        const generatedDeviceId =
            existingDeviceId ||
            (typeof crypto !== "undefined" && "randomUUID" in crypto
                ? crypto.randomUUID()
                : `${Date.now()}-${Math.random().toString(36).slice(2)}`);

        if (!existingDeviceId) {
            window.localStorage.setItem(DEVICE_ID_STORAGE_KEY, generatedDeviceId);
        }
        setDeviceId(generatedDeviceId);

        const rawLikedIds = window.localStorage.getItem(LIKED_PROJECTS_STORAGE_KEY);
        if (rawLikedIds) {
            try {
                const parsed = JSON.parse(rawLikedIds) as number[];
                setLikedProjects(new Set(parsed.filter((id) => Number.isInteger(id))));
            } catch {
                // Ignore malformed local data.
            }
        }
    }, []);

    useEffect(() => {
        let mounted = true;

        const loadProjects = async () => {
            try {
                const { data } = await apiClient.get<{ projects: Project[] }>(
                    "/what-was-built",
                );
                if (mounted) {
                    setAllProjects(data.projects);
                }
            } catch {
                // Leave the list empty (show empty state) if the request fails.
            } finally {
                if (mounted) {
                    setIsLoadingProjects(false);
                }
            }
        };

        loadProjects();

        return () => {
            mounted = false;
        };
    }, []);

    useEffect(() => {
        window.localStorage.setItem(
            LIKED_PROJECTS_STORAGE_KEY,
            JSON.stringify(Array.from(likedProjects)),
        );
    }, [likedProjects]);

    async function toggleLike(id: number) {
        if (!deviceId || likingProjects.has(id)) {
            return;
        }

        setLikingProjects((prev) => new Set(prev).add(id));

        try {
            const { data } = await apiClient.post<{
                projectId: number;
                liked: boolean;
                likes: number;
            }>("/what-was-built/like", { projectId: id, deviceId });

            setLikedProjects((prev) => {
                const next = new Set(prev);
                if (data.liked) {
                    next.add(id);
                } else {
                    next.delete(id);
                }
                return next;
            });

            setAllProjects((prev) =>
                prev.map((project) =>
                    project.id === id ? { ...project, likes: data.likes } : project,
                ),
            );
        } catch {
            // Ignore action failures and keep current UI state unchanged.
        } finally {
            setLikingProjects((prev) => {
                const next = new Set(prev);
                next.delete(id);
                return next;
            });
        }
    }

    const meta = [
        { icon: FiCalendar, value: event.date },
        { icon: FiMapPin, value: event.location },
        { icon: FiLayers, value: event.format },
    ];

    return (
        <main className="min-h-screen bg-base">
            {/* ── Banner ─────────────────────────────────────────── */}
            <section className="relative h-[22rem] w-full overflow-hidden sm:h-[26rem]">
                <img
                    src={detail.banner}
                    alt={`${event.community} pre-series`}
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/55 to-ink/25" />
                {/* Accent bar */}
                <div
                    className="absolute inset-x-0 top-0 h-1.5"
                    style={{ backgroundColor: accentColor }}
                    aria-hidden="true"
                />

                <div className="relative mx-auto flex h-full w-full max-w-7xl flex-col px-4 py-8 sm:px-6 lg:px-8">
                    <Link
                        href="/pre-series"
                        className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-white/80 transition-colors hover:text-white"
                    >
                        <FiArrowLeft size={14} aria-hidden="true" />
                        Back to Pre-Series
                    </Link>

                    <motion.div
                        className="mt-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, ease: "easeOut" }}
                    >
                        <div className="flex flex-wrap items-center gap-3">
                            <PillTag
                                label={event.community}
                                color={accentColor}
                                className="w-fit px-3 py-1.5 text-xs shadow-none ring-0"
                            />
                            {isPast ? (
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-white backdrop-blur">
                                    <FiCheckCircle size={11} aria-hidden="true" />
                                    Completed
                                </span>
                            ) : (
                                <span className="rounded-full bg-white/15 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-white backdrop-blur">
                                    Upcoming
                                </span>
                            )}
                        </div>
                        <h1 className="mt-4 max-w-4xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                            {event.title}
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
                            About this session
                        </h2>
                        <p className="mt-4 text-[1.02rem] leading-8 text-ink/75">
                            {detail.description}
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
                            {meta.map(({ icon: Icon, value }) => (
                                <div key={value} className="flex items-start gap-3">
                                    <span
                                        className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                                        style={{ backgroundColor: `${accentColor}55` }}
                                    >
                                        <Icon size={14} className="text-ink/70" aria-hidden="true" />
                                    </span>
                                    <dd className="text-sm leading-6 text-ink/80">{value}</dd>
                                </div>
                            ))}
                        </dl>
                    </motion.div>
                </div>

                {/* Quick jump nav */}
                <div className="mt-8 flex flex-wrap gap-2">
                    <a
                        href="#speakers"
                        className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-surface px-4 py-2 text-xs font-semibold text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/30 hover:bg-white"
                    >
                        <FiUsers size={12} aria-hidden="true" />
                        Speakers
                    </a>
                    {detail.hasBlog && (
                        <Link
                            href={`/pre-series/${event.communitySlug}/blog`}
                            className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-surface px-4 py-2 text-xs font-semibold text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/30 hover:bg-white"
                        >
                            <FiBookOpen size={12} aria-hidden="true" />
                            Blog
                        </Link>
                    )}
                    <a
                        href="#projects"
                        className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-surface px-4 py-2 text-xs font-semibold text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/30 hover:bg-white"
                    >
                        <FiPackage size={12} aria-hidden="true" />
                        Projects
                    </a>
                    <a
                        href="#gallery"
                        className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-surface px-4 py-2 text-xs font-semibold text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/30 hover:bg-white"
                    >
                        <FiCamera size={12} aria-hidden="true" />
                        Gallery
                    </a>
                </div>
            </section>

            {/* ── Speakers ───────────────────────────────────────── */}
            <section
                id="speakers"
                className="mx-auto w-full max-w-7xl scroll-mt-20 bg-surface/50 px-4 py-14 sm:px-6 lg:px-8"
            >
                <motion.h2
                    className="text-2xl font-bold text-ink sm:text-3xl"
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.4 }}
                    transition={{ duration: 0.5 }}
                >
                    Speakers &amp; Facilitators
                </motion.h2>
                <p className="mt-2 text-ink/65">
                    The people who led the {event.community} session.
                </p>

                {detail.speakers.length > 0 ? (
                    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {detail.speakers.map((speaker, index) => (
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

            {/* ── Projects ───────────────────────────────────────── */}
            <section
                id="projects"
                className="scroll-mt-20 mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8"
            >
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <motion.h2
                            className="text-2xl font-bold text-ink sm:text-3xl"
                            initial={{ opacity: 0, y: 14 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.4 }}
                            transition={{ duration: 0.5 }}
                        >
                            What Got Built
                        </motion.h2>
                        <p className="mt-2 text-ink/65">
                            Projects shipped by the {event.community} community.
                        </p>
                    </div>
                    <Link
                        href={`/what-was-built?community=${encodeURIComponent(event.community)}`}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink transition-colors hover:text-coreBlue"
                    >
                        View all projects <FiArrowRight size={14} aria-hidden="true" />
                    </Link>
                </div>

                {isLoadingProjects ? (
                    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {[0, 1, 2].map((slot) => (
                            <div
                                key={slot}
                                className="rounded-2xl border border-ink/10 bg-white p-6"
                            >
                                <div className="h-4 w-28 animate-pulse rounded bg-ink/10" />
                                <div className="mt-5 h-7 w-3/4 animate-pulse rounded bg-ink/10" />
                                <div className="mt-3 h-4 w-full animate-pulse rounded bg-ink/10" />
                                <div className="mt-2 h-4 w-5/6 animate-pulse rounded bg-ink/10" />
                                <div className="mt-6 h-9 w-32 animate-pulse rounded-full bg-ink/10" />
                            </div>
                        ))}
                    </div>
                ) : projects.length > 0 ? (
                    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {projects.map((project, index) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                index={index}
                                isLiked={likedProjects.has(project.id)}
                                isLiking={likingProjects.has(project.id)}
                                onToggleLike={toggleLike}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink/15 bg-white/60 px-6 py-12 text-center">
                        <FiPackage size={28} className="text-ink/25" aria-hidden="true" />
                        <p className="mt-3 text-sm font-medium text-ink/55">
                            Projects from this session will appear here as they are submitted.
                        </p>
                    </div>
                )}
            </section>

            {/* ── Gallery ────────────────────────────────────────── */}
            <section
                id="gallery"
                className="mx-auto w-full max-w-7xl scroll-mt-20 bg-surface/50 px-4 py-14 sm:px-6 lg:px-8"
            >
                <>
                    <div className="flex flex-wrap items-end justify-between gap-4">
                        <div>
                            <motion.h2
                                className="text-2xl font-bold text-ink sm:text-3xl"
                                initial={{ opacity: 0, y: 14 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false, amount: 0.4 }}
                                transition={{ duration: 0.5 }}
                            >
                                Gallery
                            </motion.h2>
                            <p className="mt-2 text-ink/65">
                                Moments from the {event.community} session.
                            </p>
                        </div>
                        {hasPhotos && (
                            <Link
                                href={`/pre-series/${event.communitySlug}/gallery`}
                                className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink transition-colors hover:text-coreBlue"
                            >
                                View full gallery <FiArrowRight size={14} aria-hidden="true" />
                            </Link>
                        )}
                    </div>

                    {previewPhotos.length > 0 ? (
                        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                            {previewPhotos.map((url, index) => (
                                <motion.div
                                    key={`${event.communitySlug}-preview-${index}`}
                                    className="aspect-square overflow-hidden rounded-2xl border border-ink/10 bg-white"
                                    initial={{ opacity: 0, scale: 0.96 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: false, amount: 0.2 }}
                                    transition={{ duration: 0.35, delay: index * 0.05 }}
                                >
                                    <Link
                                        href={`/pre-series/${event.communitySlug}/gallery`}
                                        className="block h-full w-full"
                                    >
                                        <img
                                            src={url}
                                            alt={`${event.community} pre-series photo ${index + 1}`}
                                            loading="lazy"
                                            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                                        />
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink/15 bg-white/60 px-6 py-12 text-center">
                            <FiImage size={28} className="text-ink/25" aria-hidden="true" />
                            <p className="mt-3 text-sm font-medium text-ink/55">
                                Photos from this session will be published here soon.
                            </p>
                        </div>
                    )}
                </>
            </section>

            {/* ── Blog CTA ───────────────────────────────────────── */}
            {detail.hasBlog && (
                <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
                    <motion.div
                        className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-ink/10 bg-white p-8 sm:flex-row sm:items-center"
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1 text-xs font-semibold text-ink/70">
                                <FiBookOpen size={12} aria-hidden="true" />
                                Read the recap
                            </div>
                            <h2 className="mt-3 text-xl font-bold text-ink sm:text-2xl">
                                Go deeper with the full write-up
                            </h2>
                            <p className="mt-2 max-w-xl text-sm leading-6 text-ink/65">
                                Highlights, takeaways, and resources from the {event.community} pre-series session.
                            </p>
                        </div>
                        <Link
                            href={`/pre-series/${event.communitySlug}/blog`}
                            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-bold text-base transition-transform duration-200 hover:-translate-y-0.5"
                        >
                            <span>Read the Blog</span>
                            <span
                                className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-base text-ink"
                                aria-hidden="true"
                            >
                                <FiArrowUpRight size={12} />
                            </span>
                        </Link>
                    </motion.div>
                </section>
            )}
        </main>
    );
}
