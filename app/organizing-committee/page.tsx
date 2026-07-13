import type { Metadata } from "next";
import Image from "next/image";
import { FaLinkedinIn, FaXTwitter, FaGithub } from "react-icons/fa6";
import { FiGlobe } from "react-icons/fi";
import { ORGANIZERS } from "@/lib/config";

export const metadata: Metadata = {
	title: "Organizing Committee",
	description:
		"Meet the community leads and organizers behind Build With AI 2026 at GDG OAU.",
};

export default function OrganizingCommitteePage() {
	return (
		<div className="relative isolate overflow-hidden bg-base">
			<div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-120 bg-[radial-gradient(58rem_22rem_at_20%_0%,rgba(66,133,244,0.22),transparent),radial-gradient(52rem_20rem_at_95%_10%,rgba(52,168,83,0.18),transparent)]" />

			{/* Page Header */}
			<section className="mx-auto w-full max-w-7xl px-4 pb-10 pt-16 sm:px-6 sm:pt-20 lg:px-8 lg:pb-12 lg:pt-24">
				<div className="inline-flex items-center rounded-full border border-ink/10 bg-white/80 px-4 py-2 backdrop-blur-sm">
					<Image
						src="/event-header.svg"
						alt="Decorative event header"
						width={190}
						height={22}
						className="h-4 w-auto sm:h-5"
					/>
				</div>

				<div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
					<div>
						<h1 className="text-4xl font-bold text-ink sm:text-5xl lg:text-6xl">
							Organizing Committee
						</h1>
						<p className="mt-4 max-w-2xl text-base text-ink/65 sm:text-lg">
							The community leads and passionate organizers making Build With AI 2026 possible at OAU.
						</p>
					</div>
					<img
						src="/branding.png"
						alt="GDG Branding"
						className="h-8 w-auto shrink-0 sm:h-10"
					/>
				</div>
			</section>

			{/* Organizer Grid */}
			<section className="mx-auto w-full max-w-5xl px-4 pb-24 sm:px-6 lg:px-8">
				<div className="flex flex-wrap justify-center gap-12">
					{ORGANIZERS.map((organizer, index) => (
						<article
							key={index}
							className="group flex w-72 flex-col items-center text-center"
						>
							{/* Circular headshot */}
							<div className="relative h-64 w-64 shrink-0 overflow-hidden rounded-full ring-4 ring-white shadow-lg transition-shadow duration-300 group-hover:shadow-xl">
								<img
									src={organizer.photo}
									alt={organizer.name}
									className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
								/>
							</div>

							{/* Role label */}
							{/* <div className="mt-4 flex items-center gap-2">
								<span className="text-[10px] font-medium tracking-[0.2em] text-coreBlue uppercase">
									{organizer.role}
								</span>
							</div> */}

							{/* Name */}
							<h2 className="mt-4 uppercase text-base font-bold leading-tight text-ink">
								{organizer.name}
							</h2>

							{/* Course + Level */}
							<p className="mt-1 text-sm text-ink/55 leading-relaxed">
								{organizer.role}
								<br />
								{/* <span className="font-medium text-ink/70">{organizer.level}</span> */}
							</p>

							{/* Social icons */}
							{organizer.socials && Object.values(organizer.socials).some(Boolean) && (
								<div className="mt-3 flex items-center justify-center gap-3">
									{organizer.socials.linkedin && (
										<a
											href={organizer.socials.linkedin}
											target="_blank"
											rel="noopener noreferrer"
											aria-label={`${organizer.name}'s LinkedIn`}
											className="text-ink/40 transition-colors duration-200 hover:text-[#0077b5]"
										>
											<FaLinkedinIn size={14} />
										</a>
									)}
									{organizer.socials.twitter && (
										<a
											href={organizer.socials.twitter}
											target="_blank"
											rel="noopener noreferrer"
											aria-label={`${organizer.name}'s Twitter`}
											className="text-ink/40 transition-colors duration-200 hover:text-black dark:hover:text-white"
										>
											<FaXTwitter size={14} />
										</a>
									)}
									{organizer.socials.github && (
										<a
											href={organizer.socials.github}
											target="_blank"
											rel="noopener noreferrer"
											aria-label={`${organizer.name}'s GitHub`}
											className="text-ink/40 transition-colors duration-200 hover:text-[#24292e] dark:hover:text-white"
										>
											<FaGithub size={14} />
										</a>
									)}
									{organizer.socials.website && (
										<a
											href={organizer.socials.website}
											target="_blank"
											rel="noopener noreferrer"
											aria-label={`${organizer.name}'s Website`}
											className="text-ink/40 transition-colors duration-200 hover:text-coreBlue"
										>
											<FiGlobe size={14} />
										</a>
									)}
								</div>
							)}
						</article>
					))}
				</div>
			</section>
		</div>
	);
}
