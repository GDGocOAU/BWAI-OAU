"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { FiArrowLeft, FiArrowUpRight, FiImage } from "react-icons/fi";

// 10 placeholder slots — replace with real photo URLs when available
const PHOTO_SLOTS = Array.from({ length: 10 }, (_, i) => i + 1);

type Props = {
    communityName: string;
    communitySlug: string;
    googlePhotosHref: string;
};

export default function CommunityGalleryPage({
    communityName,
    googlePhotosHref,
}: Props) {
    const hasPhotos = googlePhotosHref && googlePhotosHref !== "#";

    return (
        <main className="min-h-screen bg-base">
            {/* Back nav */}
            <div className="mx-auto w-full max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
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
                className="mx-auto w-full max-w-7xl px-4 pb-10 pt-8 sm:px-6 lg:px-8"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
            >
                <p className="font-openSans text-xs font-semibold uppercase tracking-[0.18em] text-ink/50">
                    {communityName} · Pre-Series
                </p>
                <h1 className="mt-2 text-4xl font-bold leading-tight text-ink sm:text-5xl">
                    Gallery
                </h1>
                <p className="mt-3 text-ink/65">
                    A look at the moments from the {communityName} pre-series session.
                    {!hasPhotos && (
                        <span className="ml-1 text-ink/40">(Photos coming soon)</span>
                    )}
                </p>
            </motion.section>

            {/* Photo grid */}
            <section className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {PHOTO_SLOTS.map((slot, index) => (
                        <motion.div
                            key={slot}
                            className="group relative aspect-square overflow-hidden rounded-2xl border border-ink/10 bg-surface"
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                duration: 0.35,
                                ease: "easeOut",
                                delay: index * 0.04,
                            }}
                        >
                            {/* Placeholder fill */}
                            <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-ink/20">
                                <FiImage size={28} aria-hidden="true" />
                                <span className="text-xs font-medium">Photo {slot}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* See more CTA */}
            <section className="pb-20 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.5 }}
                    className="flex flex-col items-center gap-3"
                >
                    <p className="text-sm text-ink/50">
                        {hasPhotos
                            ? "See the full album on Google Photos"
                            : "The full album will be linked here once photos are uploaded"}
                    </p>
                    {hasPhotos ? (
                        <Link
                            href={googlePhotosHref}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-bold text-base transition-transform duration-200 hover:-translate-y-0.5"
                        >
                            <span>See All Photos</span>
                            <span
                                className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-base text-ink"
                                aria-hidden="true"
                            >
                                <FiArrowUpRight size={12} />
                            </span>
                        </Link>
                    ) : (
                        <span className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-surface px-6 py-3 text-sm font-bold text-ink/40 cursor-not-allowed">
                            See All Photos
                        </span>
                    )}
                </motion.div>
            </section>
        </main>
    );
}
