"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { FiArrowUpRight, FiCalendar, FiMapPin, FiLayers, FiCheckCircle } from "react-icons/fi";
import PillTag from "@/components/PillTag";
import { HERO_PILL_TONE_COLORS } from "@/lib/config";

// Matches the shape of PRESERIES_EVENTS entries (which are `as const`)
type PreSeriesEvent = {
    readonly community: string;
    readonly title: string;
    readonly date: string;
    readonly location: string;
    readonly format: string;
    readonly registrationHref: string;
    readonly photoAlbumHref: string;
    readonly accent: keyof typeof HERO_PILL_TONE_COLORS;
    readonly status: string;
};

type EventCardProps = {
    event: PreSeriesEvent;
    index: number;
};

export default function EventCard({ event, index }: EventCardProps) {
    const accentColor = HERO_PILL_TONE_COLORS[event.accent];
    const isExternal = event.registrationHref.startsWith("http");

    return (
        <motion.article
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.07 }}
            whileHover={{ y: -4 }}
            className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-ink/20 bg-white transition-transform"
        >
            {/* Accent bar */}
            <div
                className="h-2 w-full shrink-0"
                style={{ backgroundColor: accentColor }}
                aria-hidden="true"
            />

            <div className="flex flex-1 flex-col px-6 py-6">
                {/* Top row: branding + status */}
                <div className="flex items-center justify-between">
                    <Image
                        src="/event-header.svg"
                        alt="Event card header"
                        width={120}
                        height={14}
                        className="h-4 w-auto opacity-75"
                    />
                    {event.status === "upcoming" && (
                        <span className="rounded-full bg-halftoneYellow/40 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-ink/70">
                            Upcoming
                        </span>
                    )}
                    {event.status === "past" && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-halftoneGreen/30 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-green-700">
                            <FiCheckCircle size={11} aria-hidden="true" />
                            Completed
                        </span>
                    )}
                </div>

                {/* Community badge */}
                <div className="mt-4">
                    <PillTag
                        label={event.community}
                        color={accentColor}
                        className="w-fit px-3 py-1.5 text-xs shadow-none ring-0"
                    />
                </div>

                {/* Title */}
                <h2 className="mt-5 min-h-16 text-2xl font-bold leading-snug text-ink">
                    {event.title}
                </h2>

                {/* Meta */}
                <dl className="mt-4 space-y-2 text-sm text-ink/75">
                    <div className="flex items-center gap-2">
                        <FiCalendar aria-hidden="true" className="shrink-0" />
                        <dd>{event.date}</dd>
                    </div>
                    <div className="flex items-center gap-2">
                        <FiMapPin aria-hidden="true" className="shrink-0" />
                        <dd>{event.location}</dd>
                    </div>
                    <div className="flex items-center gap-2">
                        <FiLayers aria-hidden="true" className="shrink-0" />
                        <dd>{event.format}</dd>
                    </div>
                </dl>

                {/* CTA */}
                <div className="mt-auto pt-7">
                    {event.status === "past" ? (
                        <Link
                            href = "/"
                            // href="/what-was-built"
                            className="inline-flex items-center gap-2 rounded-full border border-ink/20 bg-surface px-5 py-2.5 text-sm font-bold text-ink transition-transform duration-200 hover:-translate-y-0.5 hover:bg-white"
                        >
                            <span>See What Was Built</span>
                            <span
                                className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-ink text-base"
                                aria-hidden="true"
                            >
                                <FiArrowUpRight size={14} />
                            </span>
                        </Link>
                    ) : (
                        <Link
                            href={event.registrationHref}
                            target={isExternal ? "_blank" : undefined}
                            rel={isExternal ? "noreferrer" : undefined}
                            className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-base transition-transform duration-200 hover:-translate-y-0.5"
                        >
                            <span>Get Tickets</span>
                            <span
                                className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-base text-ink"
                                aria-hidden="true"
                            >
                                <FiArrowUpRight size={14} />
                            </span>
                        </Link>
                    )}
                </div>
            </div>
        </motion.article>
    );
}
