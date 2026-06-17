"use client";

import * as React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "motion/react";
import { FaLinkedinIn, FaXTwitter, FaGithub } from "react-icons/fa6";
import { FiGlobe, FiArrowLeft } from "react-icons/fi";
import { EVENT_SPEAKERS, EVENT_PANELISTS } from "@/lib/config";

interface PageProps {
	params: Promise<{ slug: string }>;
}

export default function SpeakerProfilePage({ params }: PageProps) {
	const { slug } = React.use(params);

	// Find the speaker or panelist matching the slug
	const speaker = EVENT_SPEAKERS.find((s) => s.slug === slug);
	const panelist = EVENT_PANELISTS.find((p) => p.slug === slug);
	const person = speaker || panelist;

	// If the speaker/panelist doesn't exist, return 404
	if (!person) {
		notFound();
	}

	const isComingSoon = person.name === "Coming Soon...";

	return (
		<div className="min-h-screen bg-base py-12 px-4 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-4xl">
				{/* Back Button */}
				<motion.div
					initial={{ opacity: 0, x: -16 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.4 }}
				>
					<Link
						href="/main-event"
						className="inline-flex items-center gap-2 text-ink/70 hover:text-coreBlue font-semibold transition-colors duration-200 mb-8"
					>
						<FiArrowLeft size={16} /> Back to Main Event
					</Link>
				</motion.div>

				{/* Profile Content */}
				<motion.div
					className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
					initial={{ opacity: 0, y: 24 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					{/* Left Column - Image & Quick Links */}
					<div className="md:col-span-1 flex flex-col items-center md:items-start">
						{/* Styled Profile Image Container */}
						<div className="relative aspect-square w-full max-w-72 md:max-w-none overflow-hidden rounded-2xl border-2 border-ink bg-surface shadow-lg">
							<img
								src={person.photo}
								alt={person.name}
								className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
							/>
						</div>

						{/* Track Badge */}
						<span className="mt-4 inline-flex items-center rounded-full bg-halftoneBlue px-3 py-1 text-xs font-bold text-ink">
							{person.track}
						</span>

						{/* Social Media Links */}
						{person.socials && !isComingSoon && (
							<div className="flex gap-4 mt-6">
								{person.socials.linkedin && (
									<a
										href={person.socials.linkedin}
										target="_blank"
										rel="noopener noreferrer"
										className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink bg-surface text-ink/75 hover:bg-[#0077b5] hover:text-white transition-all duration-200 hover:-translate-y-1"
										aria-label={`${person.name}'s LinkedIn`}
									>
										<FaLinkedinIn size={18} />
									</a>
								)}
								{person.socials.twitter && (
									<a
										href={person.socials.twitter}
										target="_blank"
										rel="noopener noreferrer"
										className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink bg-surface text-ink/75 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-200 hover:-translate-y-1"
										aria-label={`${person.name}'s Twitter`}
									>
										<FaXTwitter size={18} />
									</a>
								)}
								{person.socials.github && (
									<a
										href={person.socials.github}
										target="_blank"
										rel="noopener noreferrer"
										className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink bg-surface text-ink/75 hover:bg-[#24292e] hover:text-white transition-all duration-200 hover:-translate-y-1"
										aria-label={`${person.name}'s GitHub`}
									>
										<FaGithub size={18} />
									</a>
								)}
								{person.socials.website && (
									<a
										href={person.socials.website}
										target="_blank"
										rel="noopener noreferrer"
										className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink bg-surface text-ink/75 hover:bg-[#4285F4] hover:text-white transition-all duration-200 hover:-translate-y-1"
										aria-label={`${person.name}'s Website`}
									>
										<FiGlobe size={18} />
									</a>
								)}
							</div>
						)}
					</div>

					{/* Right Column - Text Details */}
					<div className="md:col-span-2 flex flex-col justify-start">
						{/* Speaker Role Label */}
						<p className="text-sm font-bold tracking-widest text-coreBlue uppercase mb-2">
							{speaker ? "Keynote Speaker" : "Event Panelist"}
						</p>

						{/* Name */}
						<h1 className="text-4xl md:text-5xl font-extrabold text-ink tracking-tight mb-2">
							{person.name}
						</h1>

						{/* Title & Organization */}
						<p className="text-lg md:text-xl text-ink/75 font-semibold mb-6">
							{person.title} <span className="mx-2 text-ink/30">•</span> {person.organization}
						</p>

						{/* Divider */}
						<div className="h-[2px] w-full bg-ink/10 mb-6" />

						{/* Bio Section */}
						<div className="mb-8">
							<h2 className="text-xl font-bold text-ink mb-3">Biography</h2>
							<p className="text-ink/80 leading-relaxed text-base font-sans whitespace-pre-line">
								{person.bio}
							</p>
						</div>

						{/* CTA / Context Box */}
						{!isComingSoon && (
							<div className="rounded-xl border-l-4 border-coreGreen bg-surface p-5 shadow-sm">
								<p className="text-sm font-semibold text-ink/75">
									Catch {person.name} live in action at the Build With AI 2026 event.
									They will be participating in the <strong className="text-coreGreen">{person.track}</strong> sessions.
								</p>
							</div>
						)}
					</div>
				</motion.div>
			</div>
		</div>
	);
}
