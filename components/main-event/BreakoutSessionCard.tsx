"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { FiCode, FiBarChart2, FiShield, FiPenTool, FiArrowUpRight, FiUsers } from "react-icons/fi";
import PillTag from "@/components/PillTag";
import { HERO_PILL_TONE_COLORS, type BreakoutSession } from "@/lib/config";

const TRACK_ICONS: Record<string, typeof FiCode> = {
    "Web Development": FiCode,
    "Data Science": FiBarChart2,
    "Cybersecurity": FiShield,
    "Design": FiPenTool,
};

type BreakoutSessionCardProps = {
    session: BreakoutSession;
    index: number;
};

export default function BreakoutSessionCard({ session, index }: BreakoutSessionCardProps) {
    const accentColor = HERO_PILL_TONE_COLORS[session.accent];
    const Icon = TRACK_ICONS[session.track] ?? FiUsers;

    return (
        <motion.article
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.07 }}
            whileHover={{ y: -4 }}
            className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-ink/20 bg-white transition-transform"
        >
            <div
                className="h-2 w-full shrink-0"
                style={{ backgroundColor: accentColor }}
                aria-hidden="true"
            />

            <Link
                href={`/main-event/breakout/${session.slug}`}
                className="group flex flex-1 flex-col px-6 py-6 outline-none"
                aria-label={`View ${session.track} breakout session details`}
            >
                <span
                    className="flex h-11 w-11 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${accentColor}55` }}
                    aria-hidden="true"
                >
                    <Icon size={20} className="text-ink/80" />
                </span>

                <div className="mt-4">
                    <PillTag
                        label={session.track}
                        color={accentColor}
                        className="w-fit px-3 py-1.5 text-xs shadow-none ring-0"
                    />
                </div>

                <h3 className="mt-5 min-h-14 text-xl font-bold leading-snug text-ink">
                    {session.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-6 text-ink/70">
                    {session.summary}
                </p>

                <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-ink/60 transition-colors">
                    View session details
                    <FiArrowUpRight
                        size={13}
                        aria-hidden="true"
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                </span>
            </Link>
        </motion.article>
    );
}
