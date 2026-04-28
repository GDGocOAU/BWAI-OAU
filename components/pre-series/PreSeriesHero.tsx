"use client";

import { motion } from "motion/react";
import { FiCalendar } from "react-icons/fi";
import BlackPillButton from "@/components/BlackPillButton";
import GhostPillButton from "@/components/GhostPillButton";
import { EVENT_DATES, SITE_LINKS } from "@/lib/config";

const copyVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" as const },
    },
};

export default function PreSeriesHero() {
    return (
        <motion.section
            className="mx-auto w-full max-w-7xl px-4 pb-10 pt-14 sm:px-6 lg:px-8 lg:pt-20"
            variants={copyVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.35 }}
        >
            {/* Eyebrow */}
            <motion.p
                variants={itemVariants}
                className="font-openSans text-xs font-semibold uppercase tracking-[0.18em] text-ink/55"
            >
                GDG OAU × Build with AI 2026
            </motion.p>

            {/* Headline */}
            <motion.h1
                variants={itemVariants}
                className="mt-2 text-5xl font-bold leading-[1.05] text-ink sm:text-6xl lg:text-[4rem]"
            >
                Before the Main Event
            </motion.h1>

            {/* Subtitle */}
            <motion.p
                variants={itemVariants}
                className="mt-4 max-w-3xl leading-8 text-ink/75"
            >
                Each sub-community hosts their own pre-series session in the
                weeks leading up to{" "}
                <span className="font-semibold text-ink">
                    {EVENT_DATES.mainEvent}
                </span>
                . Explore the three events, register your spot, and come ready
                to build.
            </motion.p>

            {/* Date pills */}
            <motion.div
                variants={itemVariants}
                className="mt-6 flex flex-wrap gap-2"
            >
                {EVENT_DATES.preseries.map((date) => (
                    <span
                        key={date}
                        className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-white px-4 py-1.5 text-sm font-medium text-ink/80"
                    >
                        <FiCalendar
                            size={13}
                            className="text-ink/50"
                            aria-hidden="true"
                        />
                        {date}
                    </span>
                ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
                variants={itemVariants}
                className="mt-8 flex flex-wrap items-center gap-3"
            >
                <BlackPillButton
                    label="Register Now"
                    href={SITE_LINKS.registerInterest}
                    className="px-7"
                />
                <GhostPillButton
                    label="View Full Schedule"
                    href={SITE_LINKS.schedule}
                />
            </motion.div>
        </motion.section>
    );
}
