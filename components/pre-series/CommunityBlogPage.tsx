"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { FiArrowLeft, FiCalendar, FiUser, FiTag } from "react-icons/fi";

type BlogPost = {
    title: string;
    date: string;
    author: string;
    tags: string[];
    body: string[];
};

// Placeholder post — replace with API-fetched content when backend is ready
const PLACEHOLDER_POST: BlogPost = {
    title: "Highlights & Takeaways",
    date: "Coming soon",
    author: "GDG OAU",
    tags: ["Build with AI", "Pre-Series", "Recap"],
    body: [
        "Our pre-series session brought together community members for a day of hands-on building, learning, and collaboration.",
        "From foundational concepts to practical demos, attendees left with new skills and a clear path toward the main event on May 16, 2026.",
        "Full write-up and resources will be published here shortly. Stay tuned.",
    ],
};

type Props = {
    communityName: string;
    communitySlug: string;
};

export default function CommunityBlogPage({ communityName, communitySlug }: Props) {
    return (
        <main className="min-h-screen bg-base">
            {/* Back nav */}
            <div className="mx-auto w-full max-w-4xl px-4 pt-8 sm:px-6 lg:px-8">
                <Link
                    href="/pre-series"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-ink/60 transition-colors hover:text-ink"
                >
                    <FiArrowLeft size={14} aria-hidden="true" />
                    Back to Pre-Series
                </Link>
            </div>

            {/* Hero */}
            <motion.section
                className="mx-auto w-full max-w-4xl px-4 pb-10 pt-8 sm:px-6 lg:px-8"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
            >
                <p className="font-openSans text-xs font-semibold uppercase tracking-[0.18em] text-ink/50">
                    {communityName} · Pre-Series
                </p>
                <h1 className="mt-2 text-4xl font-bold leading-tight text-ink sm:text-5xl">
                    Blog
                </h1>
                <p className="mt-3 text-ink/65">
                    Recaps, resources, and reflections from the {communityName} pre-series session.
                </p>
            </motion.section>

            {/* Post card */}
            <section className="mx-auto w-full max-w-4xl px-4 pb-20 sm:px-6 lg:px-8">
                <motion.article
                    className="rounded-2xl border border-ink/15 bg-white p-8"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                        {PLACEHOLDER_POST.tags.map((tag) => (
                            <span
                                key={tag}
                                className="inline-flex items-center gap-1 rounded-full bg-surface px-3 py-1 text-xs font-medium text-ink/70"
                            >
                                <FiTag size={10} aria-hidden="true" />
                                {tag}
                            </span>
                        ))}
                    </div>

                    <h2 className="mt-5 text-2xl font-bold text-ink sm:text-3xl">
                        {communityName}: {PLACEHOLDER_POST.title}
                    </h2>

                    {/* Meta */}
                    <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-ink/55">
                        <span className="inline-flex items-center gap-1.5">
                            <FiCalendar size={13} aria-hidden="true" />
                            {PLACEHOLDER_POST.date}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                            <FiUser size={13} aria-hidden="true" />
                            {PLACEHOLDER_POST.author}
                        </span>
                    </div>

                    {/* Body */}
                    <div className="mt-6 space-y-4 text-[0.95rem] leading-7 text-ink/80">
                        {PLACEHOLDER_POST.body.map((paragraph, i) => (
                            <p key={i}>{paragraph}</p>
                        ))}
                    </div>
                </motion.article>

                {/* More posts placeholder */}
                <motion.p
                    className="mt-8 text-center text-sm text-ink/45"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.25 }}
                >
                    More posts will appear here as they are published.
                </motion.p>
            </section>
        </main>
    );
}
