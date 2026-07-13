import { motion } from "motion/react";
import { Speaker } from "@/lib/config";
import { FaLinkedinIn, FaXTwitter, FaGithub } from "react-icons/fa6";
import { FiGlobe, FiArrowRight } from "react-icons/fi";
import Link from "next/link";

function SpeakerCard({ index, speaker, role = "SPEAKER" }: { index: number; speaker: Speaker; role?: "SPEAKER" | "PANELIST" | "KEYNOTE SPEAKER" }) {
	const isComingSoon = speaker.name === "Coming Soon...";

	return (
		<motion.div
			key={index}
			className="relative mx-auto flex h-[33rem] w-full max-w-96 flex-col overflow-hidden rounded-lg border-2 bg-surface shadow-lg"
			initial={{ opacity: 0, y: 24 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: false, amount: 0.4 }}
			transition={{
				duration: 0.6,
				delay: index * 0.1,
			}}
		>
			{/* Track Badge - Top Left */}
			{ role == "PANELIST" && (
				<span className={`absolute top-4 left-4 z-10 inline-flex items-center rounded-full ${speaker.track == "Cybersecurity" ? "bg-halftoneBlue" : "bg-halftoneGreen"} px-3 py-1 text-xs font-bold text-ink opacity-90`}>
					{speaker.track}
				</span>
			)}

			{/* Image - Full Width Top */}
			<div className="h-96 w-full overflow-hidden border-b-2">
				{isComingSoon ? (
					<img
						src={speaker.photo}
						alt={speaker.name}
						className="h-full w-full object-cover transition-all duration-300 ease-in-out"
					/>
				) : (
					<Link href={`/speakers/${speaker.slug}`} className="block h-full w-full overflow-hidden">
						<img
							src={speaker.photo}
							alt={speaker.name}
							className="h-full w-full object-cover transition-all duration-300 ease-in-out hover:scale-105"
						/>
					</Link>
				)}
			</div>

			{/* GDG OAU Logo stuff */}
			<div className="flex items-center justify-between px-4 mt-2">
				<span className="text-sm font-light tracking-widest text-coreBlue uppercase whitespace-nowrap">
					{role}
				</span>
				{/* <img
					src={"/main-event/branding.png"}
					alt={"GDG branding"}
					className="h-6 w-auto"
				/> */}
			</div>

			{/* Details - Bottom */}
			<div className="flex flex-col flex-1 justify-between px-4 py-2">
				<div>
					<h3 className="mb-1 text-2xl font-extrabold text-ink">
						{isComingSoon ? (
							speaker.name
						) : (
							<Link href={`/speakers/${speaker.slug}`} className="hover:text-coreBlue transition-colors duration-200">
								{speaker.name}
							</Link>
						)}
					</h3>
					<p className="text-sm text-ink/75">
						{speaker.title}{" "}
						<span className="mx-2 text-ink/40">•</span>{" "}
						{speaker.organization}
					</p>
				</div>

				<div className="flex items-center justify-between gap-4 mt-2 pt-2 border-t border-ink/10">
					{speaker.socials && (
						<div className="flex items-center gap-4">
							{speaker.socials.linkedin && (
								<a
									href={speaker.socials.linkedin}
									target="_blank"
									rel="noopener noreferrer"
									className="text-ink/60 hover:text-[#0077b5] transition-colors duration-200"
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
									className="text-ink/60 hover:text-black dark:hover:text-white transition-colors duration-200"
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
									className="text-ink/60 hover:text-[#24292e] dark:hover:text-white transition-colors duration-200"
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
									className="text-ink/60 hover:text-[#4285F4] transition-colors duration-200"
									aria-label={`${speaker.name}'s Website`}
								>
									<FiGlobe size={16} />
								</a>
							)}
						</div>
					)}

					{!isComingSoon && (
						<Link
							href={`/speakers/${speaker.slug}`}
							className="text-xs font-bold text-coreBlue hover:text-coreBlue/80 hover:underline flex items-center gap-1 shrink-0 ml-auto transition-colors"
						>
							View Bio <FiArrowRight size={12} />
						</Link>
					)}
				</div>
			</div>
		</motion.div>
	);
}

export default SpeakerCard;
