export const EVENT_DATES = {
	preseries: ["April 18, 2026", "April 24, 2026", "April 25, 2026"],
	mainEvent: "July 25, 2026",
};

// Voting closes May 30, 2026 at 11:50 PM WAT (UTC+1)
export const VOTING_DEADLINE = new Date("2026-05-30T23:50:00+01:00");

export function isVotingClosed(): boolean {
	return new Date() > VOTING_DEADLINE;
}

export const COMMUNITIES = [
	"Data Science & ML",
	"Mobile & Web Dev",
	"Cloud",
	"Cybersecurity",
	"Game Development",
	"Quantitative Finance",
];

export const NAV_LINKS = [
	{ label: "Pre-Series", href: "/pre-series" },
	{ label: "Sponsors", href: "/sponsors" },
	{ label: "Main Event", href: "/main-event" },
	{ label: "What Was Built", href: "/what-was-built" },
	// { label: "Research Conf", href: "/research-conf" },
	{ label: "Our Team", href: "/organizing-committee" },
];

export const SOCIAL_LINKS = [
	{ label: "Instagram", href: "https://www.instagram.com/gdgoau" },
	{ label: "Twitter/X", href: "https://x.com/GDGOAU" },
	{ label: "LinkedIn", href: "https://www.linkedin.com/company/gdg-oau/" },
];

export const SITE_LINKS = {
	registerInterest:
		"https://gdg.community.dev/events/details/google-gdg-on-campus-obafemi-awolowo-university-ife-nigeria-presents-build-with-ai-oau-build-shift-scale/",
	sponsors: "https://forms.gle/vQCa2oxraWAFJ6sL9",
	mainEvent: "/main-event",
	preSeries: "/pre-series",
	schedule: "/schedule",
	whatWasBuilt: "/what-was-built",
	abstract_submission: "https://forms.gle/vbxBnza2V6ifoeC1A"
};

export const HERO_PILLS = [
	{ label: "Data Science & ML", tone: "coreBlue" },
	{ label: "Mobile & Web Dev", tone: "coreGreen" },
	{ label: "Cloud", tone: "surface" },
	{ label: "Cybersecurity", tone: "surface" },
	{ label: "Game Development", tone: "coreYellow" },
	{ label: "Quantitative Finance", tone: "coreRed" },
] as const;

export const HERO_PILL_TONE_COLORS = {
	coreBlue: "#57caff",
	coreGreen: "#5cdb6d",
	coreYellow: "#ffd427",
	coreRed: "#ff7daf",
	surface: "#f2f2f2",
	gray: "#d8d8d8",
} as const;

export const HOMEPAGE_ABOUT = [
	"Build with AI Week 2026 is GDG OAU's campus-wide celebration of building with modern AI tools, practical community knowledge, and real project work.",
	"Across the pre-series sessions and the main event, each community gets a lane to teach, ship, and showcase what they are building.",
];

export const PRESERIES_EVENTS = [
	{
		community: "Mobile & Web Dev",
		communitySlug: "mobile-web-dev",
		title: "The Future Stack: Web Development in the Age of AI",
		date: "April 18, 2026",
		location: "Step B, Faculty of Technology Building",
		format: "Hands-on Workshop • 11:00 AM – 4:00 PM",
		registrationHref: "#",
		googlePhotosHref: "https://photos.app.goo.gl/AhnoMnLwKowx7oEo8",
		accent: "coreGreen",
		status: "past",
	},
	{
		community: "Quantitative Finance",
		communitySlug: "quantitative-finance",
		title: "From Superpositions to Positions",
		date: "April 24, 2026",
		location: "Google Meet (Virtual)",
		format: "Talk & Mentoring • 6:00 PM",
		registrationHref: "#",
		googlePhotosHref: "#",
		accent: "coreRed",
		status: "past",
	},
	{
		community: "Game Development",
		communitySlug: "game-development",
		title: "Build With AI Game Dev Pre-Series",
		date: "April 25, 2026",
		location: "Opolo Hub",
		format: "Workshop • 9:00 AM – 5:00 PM",
		registrationHref: "#",
		googlePhotosHref: "#",
		accent: "coreYellow",
		status: "past",
	},
	{
		community: "Cybersecurity",
		communitySlug: "cybersecurity",
		title: "Integrating AI into Cybersecurity",
		date: "April 25, 2026",
		location: "Step B, Faculty of Technology Building",
		format: "Workshop • 11:00 AM",
		registrationHref: "#",
		googlePhotosHref: "#",
		accent: "gray",
		status: "past",
	},
	{
		community: "Data Science & ML",
		communitySlug: "data-science-ml",
		title: "Build AI Agents with Antigravity",
		date: "April 25, 2026",
		location: "Agric Engineering Building",
		format: "Workshop • 11:00 AM",
		registrationHref: "#",
		googlePhotosHref: "#",
		accent: "coreBlue",
		status: "past",
	},
] as const;

// Reverse-lookup: URL slug → display community name
export const PRESERIES_SLUG_MAP: Record<string, string> = {
	"mobile-web-dev": "Mobile & Web Dev",
	"quantitative-finance": "Quantitative Finance",
	"game-development": "Game Development",
	"cybersecurity": "Cybersecurity",
	"data-science-ml": "Data Science & ML",
};

const makePhotoSlots = () => Array.from({ length: 15 }, () => "#");
const webDevPhotoSlots = [
	"https://bwaioau.site/preseries/web-dev/DSC_7258.jpg",
	"https://bwaioau.site/preseries/web-dev/DSC_7263.jpg",
	"https://bwaioau.site/preseries/web-dev/DSC_7275.jpg",
	"https://bwaioau.site/preseries/web-dev/DSC_7291.jpg",
	"https://bwaioau.site/preseries/web-dev/DSC_7303.jpg",
	"https://bwaioau.site/preseries/web-dev/DSC_7322.jpg",
	"https://bwaioau.site/preseries/web-dev/DSC_7324.jpg",
	"https://bwaioau.site/preseries/web-dev/DSC_7429.jpg",
	"https://bwaioau.site/preseries/web-dev/DSC_7430.jpg",
	"https://bwaioau.site/preseries/web-dev/DSC_7450.jpg",
	"https://bwaioau.site/preseries/web-dev/DSC_7464.jpg",
	"https://bwaioau.site/preseries/web-dev/DSC_7575.jpg",
	"https://bwaioau.site/preseries/web-dev/DSC_7683.jpg",
	"https://bwaioau.site/preseries/web-dev/DSC_7701.jpg",
	"https://bwaioau.site/preseries/web-dev/DSC_7737.jpg",
]
const dataSciPhotoSlots = [
	"https://bwaioau.site/preseries/data-science/DSC_6113.JPG",
	"https://bwaioau.site/preseries/data-science/DSC_6115.JPG",
	"https://bwaioau.site/preseries/data-science/DSC_6120.JPG",
	"https://bwaioau.site/preseries/data-science/DSC_6121.JPG",
	"https://bwaioau.site/preseries/data-science/DSC_6398.JPG",
	"https://bwaioau.site/preseries/data-science/DSC_6401.JPG",
	"https://bwaioau.site/preseries/data-science/DSC_6493.JPG",
	"https://bwaioau.site/preseries/data-science/DSC_6507.JPG",
	"https://bwaioau.site/preseries/data-science/DSC_6755.JPG",
]
const gameDevPhotoSlots = [
	"https://bwaioau.site/preseries/game-dev/DSC_6087.JPG",
	"https://bwaioau.site/preseries/game-dev/DSC_6091.JPG",
	"https://bwaioau.site/preseries/game-dev/DSC_6129.JPG",
	"https://bwaioau.site/preseries/game-dev/DSC_6136.JPG",
	"https://bwaioau.site/preseries/game-dev/DSC_6158.JPG",
	"https://bwaioau.site/preseries/game-dev/DSC_6187.JPG",
	"https://bwaioau.site/preseries/game-dev/DSC_6271.JPG",
	"https://bwaioau.site/preseries/game-dev/DSC_6308.JPG",
	"https://bwaioau.site/preseries/game-dev/DSC_6321.JPG",
	"https://bwaioau.site/preseries/game-dev/DSC_6444.JPG",
	"https://bwaioau.site/preseries/game-dev/DSC_6635.JPG",
	"https://bwaioau.site/preseries/game-dev/DSC_6732.JPG",
	"https://bwaioau.site/preseries/game-dev/DSC_6736.JPG",
	"https://bwaioau.site/preseries/game-dev/DSC_6738.JPG",
	"https://bwaioau.site/preseries/game-dev/DSC_6796.JPG",
	"https://bwaioau.site/preseries/game-dev/DSC_6837.JPG",
	"https://bwaioau.site/preseries/game-dev/DSC_6918.JPG",
]
const cybersecurityPhotoSlots = [
	"https://bwaioau.site/preseries/cybersecurity/DSC_0436.JPG",
	"https://bwaioau.site/preseries/cybersecurity/DSC_0437.JPG",
	"https://bwaioau.site/preseries/cybersecurity/DSC_0440.JPG",
	"https://bwaioau.site/preseries/cybersecurity/DSC_0442.JPG",
	"https://bwaioau.site/preseries/cybersecurity/DSC_0445.JPG",
	"https://bwaioau.site/preseries/cybersecurity/DSC_0456.JPG",
	"https://bwaioau.site/preseries/cybersecurity/DSC_0475.JPG",
	"https://bwaioau.site/preseries/cybersecurity/DSC_0483.JPG",
	"https://bwaioau.site/preseries/cybersecurity/DSC_0486.JPG",
	"https://bwaioau.site/preseries/cybersecurity/DSC_0498.JPG",
	"https://bwaioau.site/preseries/cybersecurity/DSC_0503.JPG",
	"https://bwaioau.site/preseries/cybersecurity/DSC_0517.JPG",
	"https://bwaioau.site/preseries/cybersecurity/DSC_0560.JPG",
	"https://bwaioau.site/preseries/cybersecurity/DSC_0564.JPG",
	"https://bwaioau.site/preseries/cybersecurity/DSC_0565.JPG",
	"https://bwaioau.site/preseries/cybersecurity/DSC_0589.JPG",
	"https://bwaioau.site/preseries/cybersecurity/DSC_0595.JPG",
	"https://bwaioau.site/preseries/cybersecurity/DSC_0765.JPG",
	"https://bwaioau.site/preseries/cybersecurity/DSC_0973.JPG",
]

export const PRESERIES_PHOTO_SLOTS: Record<string, string[]> = {
	"mobile-web-dev": webDevPhotoSlots,
	"quantitative-finance": makePhotoSlots(),
	"game-development": gameDevPhotoSlots,
	"cybersecurity": cybersecurityPhotoSlots,
	"data-science-ml": dataSciPhotoSlots,
};

export type PreSeriesSpeaker = {
	name: string;
	role: string; // e.g. "Facilitator", "Community Lead", "Speaker"
	organization?: string;
	photo: string;
	bio?: string;
	socials?: SocialLinks;
};

export type PreSeriesEventDetail = {
	description: string;
	banner: string;
	hasBlog: boolean;
	projectCommunity?: string;
	speakers: PreSeriesSpeaker[];
};

// Generic avatar used until real speaker photos are supplied
const PLACEHOLDER_SPEAKER_AVATAR = "/main-event/gdg-speaker-avatar.png";

export const PRESERIES_EVENT_DETAILS: Record<string, PreSeriesEventDetail> = {
	"mobile-web-dev": {
		description:
			"The Web & Mobile Dev community kicked off the pre-series with a hands-on look at how AI is reshaping the modern web workflow. Attendees explored vibe coding, AI-assisted development, and how to design and ship AI agent interfaces — building real, production-ready features from the ground up.",
		banner: webDevPhotoSlots[3],
		hasBlog: true,
		projectCommunity: "Web & Mobile Dev",
		speakers: [
			{
				name: "Joseph Oyetunde",
				role: "Community Lead",
				organization: "Web Dev, GDG OAU",
				photo: "/organizers/codegod.jpg",
			},
			{
				name: "Teminioluwa Adekoya",
				role: "Community Co-Lead",
				organization: "Web Dev, GDG OAU",
				photo: "/organizers/temiloluwa_adekoya.jpeg",
			},
			{
				name: "Naheem Adisa",
				role: "Facilitator",
				organization: "Software Engineer",
				photo: "/preseries/web-dev/naheem_adisa.jpeg",
			},
			{
				name: "Enoch Idowu",
				role: "Facilitator",
				organization: "Software Engineer",
				photo: "/preseries/web-dev/enoch_idowu.jpeg",
			},
		],
	},
	"quantitative-finance": {
		description:
			"From Superpositions to Positions took the Quantitative Finance community on a virtual journey into quantum computing — from the fundamentals of superposition and quantum states to their promise for modern finance. The evening blended a keynote with idea refinement and one-on-one mentoring moments.",
		banner: "/gdg-hero-background.png",
		hasBlog: false,
		projectCommunity: undefined,
		speakers: [],
	},
	"game-development": {
		description:
			"A full day of building. The Game Development community dove into AI-assisted game design and rapid prototyping — exploring interactive systems through AI-powered creation and shipping playable ideas alongside industry speakers.",
		banner: gameDevPhotoSlots[4],
		hasBlog: false,
		projectCommunity: "Game Dev & Design",
		speakers: [
			{
				name: "Chisom Ogbonna",
				role: "Facilitator",
				photo: "/preseries/game-dev/chisom_ogbonna.jpeg",
			},
			{
				name: "Daveeola",
				role: "Facilitator",
				photo: "/preseries/game-dev/daveeola.jpg",
			},
		],
	},
	"cybersecurity": {
		description:
		"Integrating AI into Cybersecurity gave attendees a practical playbook for using AI to strengthen security workflows — from AI-driven threat detection to hands-on time with modern security tooling.",
		banner: cybersecurityPhotoSlots[5],
		hasBlog: false,
		projectCommunity: "Cloud & Cybersecurity",
		speakers: [
			{
				name: "Samuel Omolewa",
				role: "Facilitator",
				photo: "/preseries/cybersecurity/samuel_omolewa.jpeg",
			},
		],
	},
	"data-science-ml": {
		description:
		"Build AI Agents with Antigravity showed the Data Science & ML community how to turn raw data into intelligent decisions — building AI agents end-to-end and diagnosing real-world problems with practical data workflows.",
		banner: dataSciPhotoSlots[4],
		hasBlog: false,
		projectCommunity: "Data Science & ML",
		speakers: [
			{
				name: "Olamide Lawal",
				role: "Facilitator",
				photo: "/organizers/olamide_lawal.jpg",
			},
			{
				name: "St. Mark Adebayo",
				role: "Facilitator",
				photo: "/organizers/stmarkadebayo.png",
			},
		],
	},
};

export type ScheduleEvent = {
	id: number;
	order: number;
	date: string;
	title: string;
	summary: string;
	track: string;
	sessionType: string;
	time: string;
	location: string;
	ticketHref: string;
};

export const SCHEDULE_DEFAULT_EVENTS: ScheduleEvent[] = [
	{
		id: 1,
		order: 1,
		date: "April 18, 2026",
		title: "Prompting for Data Workflows",
		summary:
			"Exploring practical prompting and model-evaluation approaches for data-focused products.",
		track: "Insight & Intelligence",
		sessionType: "Pre-Series Workshop",
		time: "10:00 AM",
		location: "VirtualLab",
		ticketHref:
			"https://gdg.community.dev/events/details/google-gdg-on-campus-obafemi-awolowo-university-ife-nigeria-presents-build-with-ai-oau-build-shift-scale/",
	},
	{
		id: 2,
		order: 2,
		date: "April 25, 2026",
		title: "Shipping an AI Companion UI",
		summary:
			"A product-focused session on building human-centered AI interfaces for web and mobile.",
		track: "Agents & Autonomy",
		sessionType: "Pre-Series Technical",
		time: "11:30 AM",
		location: "Engineering Hall",
		ticketHref:
			"https://gdg.community.dev/events/details/google-gdg-on-campus-obafemi-awolowo-university-ife-nigeria-presents-build-with-ai-oau-build-shift-scale/",
	},
	{
		id: 3,
		order: 3,
		date: "April 29, 2026",
		title: "Guardrails for Real Products",
		summary:
			"Security, governance, and reliability patterns for AI products shipped in production.",
		track: "Cloud & Security",
		sessionType: "Pre-Series Panel",
		time: "2:00 PM",
		location: "OAU Tech Hub",
		ticketHref:
			"https://gdg.community.dev/events/details/google-gdg-on-campus-obafemi-awolowo-university-ife-nigeria-presents-build-with-ai-oau-build-shift-scale/",
	},
];

export const SPONSOR_TIERS = [
	{
		tier: "Diamond",
		sponsors: [
			{
				href: "#",
				logo: {
					src: "/sponsor-placeholder.svg",
					alt: "Diamond sponsor logo placeholder",
				},
			},
		],
	},
	{
		tier: "Platinum",
		sponsors: [
			{
				href: "#",
				logo: {
					src: "/sponsor-placeholder.svg",
					alt: "Platinum sponsor logo placeholder",
				},
			},
			{
				href: "#",
				logo: {
					src: "/sponsor-placeholder.svg",
					alt: "Platinum sponsor logo placeholder",
				},
			},
		],
	},
	{
		tier: "Gold",
		sponsors: [
			{
				href: "https://www.bayse.markets/",
				logo: {
					src: "/sponsors/bayse.png",
					alt: "Bayse",
				},
			},
		],
	},
	{
		tier: "Silver",
		sponsors: [
			{
				href: "#",
				logo: {
					src: "/sponsor-placeholder-sm.svg",
					alt: "Silver sponsor logo placeholder",
				},
			},
			{
				href: "#",
				logo: {
					src: "/sponsor-placeholder-sm.svg",
					alt: "Silver sponsor logo placeholder",
				},
			},
			{
				href: "#",
				logo: {
					src: "/sponsor-placeholder-sm.svg",
					alt: "Silver sponsor logo placeholder",
				},
			},
		],
	},
	{
		tier: "Bronze",
		sponsors: [
			{
				href: "#",
				logo: {
					src: "/sponsor-placeholder-sm.svg",
					alt: "Bronze sponsor logo placeholder",
				},
			},
			{
				href: "#",
				logo: {
					src: "/sponsor-placeholder-sm.svg",
					alt: "Bronze sponsor logo placeholder",
				},
			},
			{
				href: "#",
				logo: {
					src: "/sponsor-placeholder-sm.svg",
					alt: "Bronze sponsor logo placeholder",
				},
			},
			{
				href: "#",
				logo: {
					src: "/sponsor-placeholder-sm.svg",
					alt: "Bronze sponsor logo placeholder",
				},
			},
		],
	},
	{
		tier: "Nano",
		sponsors: [
			{
				href: "#",
				logo: {
					src: "/sponsor-placeholder-sm.svg",
					alt: "Nano sponsor logo placeholder",
				},
			},
			{
				href: "#",
				logo: {
					src: "/sponsor-placeholder-sm.svg",
					alt: "Nano sponsor logo placeholder",
				},
			},
			{
				href: "#",
				logo: {
					src: "/sponsor-placeholder-sm.svg",
					alt: "Nano sponsor logo placeholder",
				},
			},
			{
				href: "#",
				logo: {
					src: "/sponsor-placeholder-sm.svg",
					alt: "Nano sponsor logo placeholder",
				},
			},
		],
	},
] as const;

export type SponsorRecord = {
	name: string;
	href: string;
	logo: {
		src: string;
		alt: string;
		width: number;
		height: number;
	};
};

export type SponsorLevelGroup = {
	level: "Headline" | "Platinum" | "Gold" | "Silver" | "Bronze" | "Nano";
	sponsors: SponsorRecord[];
};

// Manually maintain this list with your real sponsors before each deploy.
export const SPONSOR_LEVEL_GROUPS: SponsorLevelGroup[] = [
	{
		level: "Headline",
		sponsors: [],
	},
	{
		level: "Platinum",
		sponsors: [
			{
				name: "African Technology Forum",
				href: "https://www.atfchallenge.org/apply?channel=WDVBKMUJ",
				logo: {
					src: "/sponsors/atf.png",
					alt: "African Technology Forum",
					width: 200,
					height: 80,
				},
			},
		],
	},
	{
		level: "Gold",
		sponsors: [
			{
				name: "Bayse",
				href: "https://www.bayse.markets/",
				logo: {
					src: "/sponsors/bayse.png",
					alt: "Bayse",
					width: 200,
					height: 80,
				},
			},
		],
	},
	{
		level: "Silver",
		sponsors: [],
	},
	{
		level: "Bronze",
		sponsors: [
			{
				name: "Megatron",
				href: "#",
				logo: {
					src: "/sponsors/Megatron_Sponsor.jpeg",
					alt: "Megatron",
					width: 200,
					height: 80,
				},
			},
			{
				name: "AISecEng",
				href: "#",
				logo: {
					src: "/sponsors/aiseceng.jpeg",
					alt: "AISecEng",
					width: 200,
					height: 80,
				},
			},
		],
	},
	{
		level: "Nano",
		sponsors: [
			{
				name: "CybariK",
				href: "#",
				logo: {
					src: "/sponsors/CybariK-logo.jpg",
					alt: "CybariK",
					width: 200,
					height: 80,
				},
			},
			{
				name: "Truck",
				href: "#",
				logo: {
					src: "/sponsors/truck.jpeg",
					alt: "CybariK",
					width: 200,
					height: 80,
				},
			},
			{
				name: "Battletest",
				href: "#",
				logo: {
					src: "/sponsors/Battletest.jpeg",
					alt: "Battletest",
					width: 200,
					height: 80,
				},
			},
		],
	},
] as const;

export type CommunityPartner = {
	name: string;
	href: string;
	logo: { src: string; alt: string; width: number; height: number };
};

// Add real community partners here. Images go in public/partners/
export const COMMUNITY_PARTNERS: CommunityPartner[] = [
	{
		name: "Community Partner 1",
		href: "#",
		logo: {
			src: "/partners/Mask group.png",
			alt: "Community Partner",
			width: 200,
			height: 80,
		},
	},
	{
		name: "Community Partner 2",
		href: "#",
		logo: {
			src: "/partners/IMG-20260404-WA0028.jpg",
			alt: "Community Partner",
			width: 200,
			height: 80,
		},
	},
	{
		name: "Community Partner 3",
		href: "#",
		logo: {
			src: "/partners/IMG_6519.JPG",
			alt: "Community Partner",
			width: 200,
			height: 80,
		},
	},
	{
		name: "Cowrywise",
		href: "#",
		logo: {
			src: "/partners/Cowrywise.jpeg",
			alt: "Cowrywise",
			width: 200,
			height: 80,
		},
	},
	{
		name: "DSN OAU",
		href: "#",
		logo: {
			src: "/partners/DSN OAU.jpeg",
			alt: "DSN OAU",
			width: 200,
			height: 80,
		},
	},
	{
		name: "IEEE OAU SB",
		href: "#",
		logo: {
			src: "/partners/IEEE OAU SB.jpeg",
			alt: "IEEE OAU SB",
			width: 200,
			height: 80,
		},
	},
	{
		name: "NEXUS Africa",
		href: "#",
		logo: {
			src: "/partners/NEXUS Africa.jpeg",
			alt: "NEXUS Africa",
			width: 200,
			height: 80,
		},
	},
	{
		name: "NSBS",
		href: "#",
		logo: {
			src: "/partners/NSBS.jpeg",
			alt: "NSBS",
			width: 200,
			height: 80,
		},
	},
	{
		name: "NACOS OAU",
		href: "#",
		logo: {
			src: "/partners/Nacos.jpeg",
			alt: "NACOS OAU",
			width: 200,
			height: 80,
		},
	},
	{
		name: "PANS OAU",
		href: "#",
		logo: {
			src: "/partners/PANS OAU.jpeg",
			alt: "PANS OAU",
			width: 200,
			height: 80,
		},
	},
	{
		name: "PrepDesk",
		href: "#",
		logo: {
			src: "/partners/PrepDesk.jpeg",
			alt: "PrepDesk",
			width: 200,
			height: 80,
		},
	},
	{
		name: "QWorld",
		href: "#",
		logo: {
			src: "/partners/QWorld.jpeg",
			alt: "QWorld",
			width: 200,
			height: 80,
		},
	},
	{
		name: "RAIIN OAU",
		href: "#",
		logo: {
			src: "/partners/RAIIN OAU.jpeg",
			alt: "RAIIN OAU",
			width: 200,
			height: 80,
		},
	},
	{
		name: "SCA OAU",
		href: "#",
		logo: {
			src: "/partners/SCA.jpeg",
			alt: "SCA OAU",
			width: 200,
			height: 80,
		},
	},
];

export const FOOTER_CREDIT = "Powered by Google Developer Groups";

export const GDG_OAU_LOGO = {
	src: "/gdg-oau-logo.svg",
	alt: "GDG OAU",
};

export const CONTACT = {
	blessing: "blessingngoziagbor@gmail.com",
	samuel: "blendert5@gmail.com",
	general: "oaudsc@gmail.com",
};

export const LUMA_LINKS = {
	buildathon1: "#",
	buildathon2: "#",
	buildathon3: "#",
};

// ── What Was Built ────────────────────────────────────────────────────────────

export type ProjectCommunity = (typeof COMMUNITIES)[number];

export type Project = {
	id: number;
	community: ProjectCommunity;
	tags: string[];
	name: string;
	description: string;
	techTags: string[];
	demoHref: string;
	likes: number;
};

export const COMMUNITY_COLORS: Record<string, string> = {
	"Data Science & ML": "#ccf6c5",
	"Web & Mobile Dev": "#ff7daf",
	"Cloud & Cybersecurity": "#c3ecf6",
	"Game Dev & Design": "#ffe7a5",
	"The Creative Track": "#f8d8d8",
	"GDG OAU": "#57caff",
};

export const TECH_TAG_COLORS: Record<string, string> = {
	"Gemini API": "#d357ff",
	"Google ADK": "#db8f5c",
	Antigravity: "#5c6ddb",
	"Vertex AI": "#ff7daf",
	"Cloud Run": "#5cdb6d",
	"Bayse API": "#57caff",
};

export const WHAT_WAS_BUILT_PROJECTS: Project[] = [
	{
		id: 1,
		community: "Data Science & ML",
		tags: ["Pre-Series"],
		name: "EcoScan AI",
		description:
			"Real-time waste classification using Gemini Vision for university campuses.",
		techTags: ["Gemini API", "ADK"],
		demoHref: "#",
		likes: 24,
	},
	{
		id: 2,
		community: "Web & Mobile Dev",
		tags: [],
		name: "PulseQuest",
		description:
			"Gamified mental health tracker powered by Firebase and Google AI Studio.",
		techTags: ["Gemini API"],
		demoHref: "#",
		likes: 56,
	},
	{
		id: 3,
		community: "Data Science & ML",
		tags: ["Pre-Series"],
		name: "LexiLegal",
		description:
			"Simplifying Nigerian legal documents for entrepreneurs using LLMs.",
		techTags: ["Gemini API", "ADK"],
		demoHref: "#",
		likes: 102,
	},
	{
		id: 4,
		community: "Data Science & ML",
		tags: [],
		name: "AgriFlow",
		description:
			"Predictive irrigation scheduling for small-scale farmers in Oyo State.",
		techTags: ["ADK"],
		demoHref: "#",
		likes: 39,
	},
	{
		id: 5,
		community: "The Creative Track",
		tags: [],
		name: "SonicCanvas",
		description:
			"Turning spoken Yoruba poetry into generative digital art sequences.",
		techTags: ["Gemini API"],
		demoHref: "#",
		likes: 88,
	},
	{
		id: 6,
		community: "Cloud & Cybersecurity",
		tags: [],
		name: "SecureNodes",
		description:
			"AI-driven threat detection for multi-cloud infrastructure deployments.",
		techTags: ["ADK"],
		demoHref: "#",
		likes: 15,
	},
];

export type SocialLinks = {
	twitter?: string;
	linkedin?: string;
	github?: string;
	website?: string;
};

export type Speaker = {
	name: string;
	title: string;
	photo: string;
	organization: string;
	track: string;
	socials?: SocialLinks;
	slug: string;
	bio: string;
	role?: "SPEAKER" | "PANELIST" | "KEYNOTE SPEAKER"
};

export type Panelist = {
	name: string;
	title: string;
	photo: string;
	organization: string;
	track: "Cybersecurity" | "AI Governance & Policy";
	socials?: SocialLinks;
	slug: string;
	bio: string;
};

export const EVENT_SPEAKERS: Speaker[] = [
	{
		name: "Confidence Staveley",
		title: "Founder",
		organization: "Cybersafe Foundation",
		track: "Cybersecurity",
		photo: "/main-event/confidence_stavely.jpeg",
		slug: "confidence-staveley",
		bio: `
			Confidence Staveley is a multi-award-winning cybersecurity leader, author, and one of the most distinctive voices at the intersection of AI and security. 
			
			Known for making complex technical concepts land with any audience, she holds the CISSP, CSSLP, and CCISO certifications and serves on the World Economic Forum's Global Future Council on Cybersecurity and as a Global Ambassador for the Global Council for Responsible AI.
			
			Some of her accolades include 
			Top 40 Global Thought Leader in Security and Safety
			(2024 & 2025), SANS Difference Maker Award: People's Champion of the Year (2024),
			Cybersecurity Woman of the World (2023), 
			Top 25 Leader in Cybersecurity (2024), 
			SC Media’s Women in IT Security 2024 Power Player, 
			Security Magazine’s 2024 Women In Cybersecurity and recognition among the "150 Fascinating Females Fighting Cybercrime."
			Confidence is the Founder and Editor-in-Chief of AI Cyber Magazine, a practitioner-focused publication on AI and cybersecurity, and hosts The AI Cyber Podcast. 
			She leads CyberSafe Foundation, a nonprofit democratizing access to cybersecurity and AI education.
			A sought-after keynote speaker and board advisor, Confidence brings the rare combination of technical depth, editorial credibility, and the ability to cut through hype, delivering talks that leave audiences better informed and ready to act.

		`,
		socials: {
			linkedin: "https://linkedin.com/in/confidencestaveley",
			website: "https://cybersafefoundation.org"
		},
		role: "KEYNOTE SPEAKER"
	},
	{
		name: "Charles Grant",
		title: "Vice President",
		organization: "JPMorganChase",
		track: "",
		photo: "/main-event/charles_grant.jpeg",
		slug: "charles-grant",
		bio: `
			Charles Grant is a Vice President at JPMorgan Chase, with over a decade of finance, audit, accounting, and analytics experience across PwC, Deloitte, Grant Thornton, and Forvis Mazars.
			
			An ACCA-chartered accountant, he builds AI tools that streamline finance and analytics workflows, improving speed, accuracy, and reliability. Nigerian by heritage, he writes, speaks, and builds at the intersection of artificial intelligence and African finance.

			At Build with AI OAU, he speaks as both a practitioner inside a global bank and an independent builder.
		`,
		socials: {
			// linkedin: "https://linkedin.com/in/",
			// website: "https://example.com"
		},
		role: "KEYNOTE SPEAKER"
	}
];

export const EVENT_PANELISTS: Panelist[] = [
	{
		name: "Efam Harris",
		title: "Senior Security Engineer",
		organization: "Digiss",
		track: "Cybersecurity",
		photo: "/main-event/Efam_Harris.jpeg",
		slug: "efam-harris",
		bio: `Efam Harris is a Senior Security Engineer working across a broad range of cybersecurity domains including cloud security, security operations (SOC), incident response, identity and access management (IAM), and data loss prevention (DLP). His role spans multiple environments and security challenges, reflecting hands-on experience across the full security lifecycle.

He was the first professional from Nigeria to be named a Wazuh Ambassador, highlighting his commitment to advancing cybersecurity awareness, community engagement, and open-source contributions. 

He holds multiple certifications, including CompTIA Security+, AWS Certified Cloud Practitioner, AWS Certified Solutions Architect Associate, Kubernetes and Cloud Native Associate (KCNA), and Google Associate Cloud Engineer. With a background in Microbiology from the University of Lagos, he brings a practical and adaptive approach to cybersecurity and is passionate about mentoring and knowledge sharing.
`,

		socials: {
			linkedin: "https://linkedin.com/in/efamharris",
			website: "https://clippings.me"
		}
	},
	{
		name: "Damilola Abiona",
		title: "Application Security Engineer",
		organization: "CyberSafe Foundation",
		track: "Cybersecurity",
		photo: "/main-event/Damilola_Abiona.jpeg",
		slug: "damilola-abiona",
		bio: `Damilola Abiona is an Application Security Engineer, cybersecurity educator, and AI security researcher with experience securing web applications, mobile, APIs, cloud environments, and emerging AI systems. She is the founder of HackingAPIsWithDami, an initiative dedicated to helping aspiring security professionals develop practical API security skills through hands-on training and mentorship. 

Damilola has trained and mentored hundreds of learners through cybersecurity communities and educational programs. As a speaker and advocate for cybersecurity awareness, she is passionate about bridging the gap between security, artificial intelligence, and education while inspiring the next generation of technology professionals.
`,
		socials: {
			linkedin: "https://linkedin.com/in/damilola-abiona-2990781b4"
		}
	},
	{
		name: "Miracle Owolabi",
		title: "Offensive Security Engineer",
		organization: "",
		track: "Cybersecurity",
		photo: "/main-event/miracle_owolabi.jpeg",
		slug: "miracle_owolabi",
		bio: `Miracle Owolabi is an AI security researcher and offensive security engineer working on the security of autonomous AI systems. 
		
		He is a core author of the OWASP AI Exchange, the global industry standard for AI security, and has presented his research at DEF CON 33 and Black Hat MEA 2025. His work focuses on how AI agents can be attacked and defended as they take on more autonomous roles in real systems. 
		
		An Obafemi Awolowo University graduate in Electronic and Electrical Engineering, he builds open-source security tools and writes on agentic AI security.
`,
		socials: {
			linkedin: "https://www.linkedin.com/in/miracleowolabi-security"
		}
	},
	{
		name: "Grace Eyiolawi",
		title: "Founder",
		organization: "SHE AI Africa",
		track: "AI Governance & Policy",
		photo: "/main-event/grace_eyiolawi.jpeg",
		slug: "grace-eyiolawi",
		bio: `
			Grace Eyiolawi is the Founder of Afrique AI Lab, an independent pan-African institution advancing AI through skill development, research and innovation, policy and governance, and ecosystem building. She leads initiatives that strengthen Africa’s capacity to develop, deploy, and govern artificial intelligence responsibly. 
			
			Grace is also the Founder of SHE AI Africa, where she champions gender-responsive AI governance and inclusive digital policy. Her work brings together researchers, policymakers, civil society, and industry to ensure African perspectives shape the future of AI and that its benefits are equitable, accountable, and locally relevant.
		`,
		socials: {
			linkedin: "https://www.linkedin.com/in/graceeyiolawi/",
			// website: "https://example.com"
		}
	},
	{
		name: "Ridwan Badmus",
		title: "Head of Technology Law, Privacy/Data Protection & AI Governance",
		organization: "Oguntoye & Oguntoye LP",
		track: "AI Governance & Policy",
		photo: "/main-event/ridwan_badmus.jpeg",
		slug: "ridwan-badmus",
		bio: `
			Ridwan Badmus is the Head of Technology Law, Privacy/Data Protection and AI Governance at Oguntoye & Oguntoye LP, Privacy Engineering and AI Governance Lead at TechStabs Consulting and Co-Founder/Privacy Technologist at FR Data Protection. He's certified as an AI Governance Professional and Information Privacy Technologist with the International Association of Privacy Professionals (IAPP).

			Ridwan specialises in seamlessly integrating privacy, data protection & trustworthy AI requirements into products to process data responsibly. As a technology lawyer, he provides legal expertise across various domains, offering rare multidisciplinary support to startups and enterprises.

			Ridwan is a lifelong learner and innovative thinker, committed to continuous growth and excellence.
		`,
		socials: {
			linkedin: "https://www.linkedin.com/in/ridwan-badmus-aciarb/",
			// website: "https://example.com"
		}
	},
	{
		name: "Ayomide Odumakinde",
		title: "AI Research Scientist",
		organization: "Cohere Labs",
		track: "AI Governance & Policy",
		photo: "/main-event/ayomide_odumakinde.jpeg",
		slug: "ayomide-odumakinde",
		bio: `
			Ayomide Odumakinde is a Nigerian AI researcher whose path from Obafemi Awolowo University (OAU) to the frontier of multilingual AI research has become a notable case study in African AI talent development. After graduating, he spent roughly two and a half years self-teaching mathematics and machine learning from textbooks before being selected for Cohere's Scholars Program, one of just six chosen from a pool of about three thousand global applicants. 
			
			He has since worked as a researcher with Cohere Labs (formerly Cohere For AI), where his work includes the widely cited paper "Multilingual Arbitrage: Optimizing Data Pools to Accelerate Multilingual Progress," co-authored with Daniel D'Souza, Pat Verga, Beyza Ermiş, and Sara Hooker, which introduced a technique for sampling synthetic training data across a diverse pool of teacher models to close performance gaps in lower-resource languages; the paper was presented at ACL 2025 in Vienna. 
			
			Beyond his technical research, Odumakinde has spoken publicly on the societal risks of generative AI in the Nigerian context, including the accessibility of deepfake tools and their implications for the country's 2027 elections. He now joins the 2026 BWAI OAU AI Governance Panel Session as a speaker.
		`,
		socials: {
			linkedin: "https://www.linkedin.com/in/ayoodumak",
			// website: "https://example.com"
		}
	},
];

export const EVENT_LOCATION = {
	mainEvent: "BOOC, Obafemi Awolowo University",
	preSeries: "",
};

export const EVENT_SCHEDULE = [
	{
		time: "9:00 AM",
		title: "Opening Speech",
		description: "By the Campus Lead (Blessing Agbor)",
	},
	{
		time: "10:00 AM",
		title: "⁠Keynote session",
		description: "Welcome address and event overview",
	},
	{
		time: "11:00 AM",
		title: "AI Gov panel session",
		description: "Insights on AI governance and policy",
	},
	{
		time: "1:00 PM",
		title: "⁠Breakout session",
		description: "Hands-on workshops and community showcases (Web development, Data science, Cybersecurity, Design)",
	},
	{
		time: "2:00 PM",
		title: "Kahoot",
		description: "Interactive quiz session for attendees",
	},
	{
		time: "4:00 PM",
		title: "Cybersecurity Panel Session",
		description: "Insights on AI security and threat detection",
	},
	{
		time: "4:00 PM",
		title: "Lunch",
		description: "Buffet lunch for all attendees",
	},
	{
		time: "4:00 PM",
		title: "⁠Hackathon Pitch and Award Ceremony",
		description: "Presentations of hackathon projects and award distribution",
	},
	{
		time: "4:00 PM",
		title: "Closing Remarks",
		description: "By the Campus Lead (Blessing Agbor) and event organizers",
	},
];

export type BreakoutSession = {
	track: string;
	slug: string;
	title: string;
	summary: string;
	description: string;
	accent: keyof typeof HERO_PILL_TONE_COLORS;
	speakers: PreSeriesSpeaker[];
};

export const BREAKOUT_SESSIONS: BreakoutSession[] = [
	{
		track: "Web Development",
		slug: "web-development",
		title: "Building AI-Native Web Products",
		summary:
			"Hands-on session on shipping AI-assisted web products — from vibe coding to production-ready agent interfaces.",
		description:
			"This breakout dives into how AI is reshaping the modern web workflow. Expect a practical look at AI-assisted development, designing interfaces for agentic features, and patterns for shipping real, production-ready web products fast. Attendees will leave with a clearer sense of how to fold AI tooling into their day-to-day build process.",
		accent: "coreGreen",
		speakers: [],
	},
	{
		track: "Data Science",
		slug: "data-science",
		title: "AI Agents for Data-Driven Work",
		summary:
			"A practical walkthrough of building and deploying AI agents for real data science workflows.",
		description:
			"The Data Science breakout focuses on where AI agents actually earn their keep in a data workflow — from data wrangling to model-assisted analysis. Expect live demos and hands-on exercises building agents that plug into real pipelines, plus a look at the tooling landscape for taking these ideas from notebook to production.",
		accent: "coreBlue",
		speakers: [
			{
				name: "Abayomi Abiodun",
				role: "",
				organization: "Data Scientist and Machine Learning Engineer",
				photo: "/main-event/abayomi_abiodun.jpeg",
				bio: `
					Abayomi Abiodun is a Data Scientist, Machine Learning Engineer, and Microsoft Most Valuable Professional (MVP) passionate about building AI-powered solutions and developing the next generation of technology talent. He attained a gold milestone as a Microsoft Learn Student Ambassador during his undergraduate and he previously served as the Google Developer Student Clubs (GDSC) Lead at Obafemi Awolowo University (OAU), where he led initiatives that empowered students with practical technology skills and fostered a vibrant developer community.

					Abayomi is an internationally recognized speaker. Abayomi has delivered keynote talks, workshops, and panel sessions at numerous conferences, universities, and technology events, engaging audiences across Africa.
				`,
				socials: {
					linkedin: "https://www.linkedin.com/in/abayomi-abiodun",
				}
			},
		],
	},
	{
		track: "Cybersecurity",
		slug: "cybersecurity",
		title: "Securing Systems in the Age of AI",
		summary:
			"Insights on AI-augmented security work — from threat detection to securing AI-powered systems.",
		description:
			"This breakout explores the two-way relationship between AI and security: using AI to strengthen threat detection and response, and the new attack surfaces that AI-powered systems introduce. Attendees will get a grounded look at practical tools and techniques for integrating AI into a security workflow responsibly.",
		accent: "gray",
		speakers: [
			{
				name: "Olúmáyòwá Akinkuehinmi",
				role: "",
				organization: "DevOps Engineer & AI Solutions Architect",
				photo: "/main-event/olumayowa.jpeg",
				bio: `
					Olúmáyòwá is a DevOps Engineer, AI Solutions Architect, open source contributor, and Cisco Champion 2024 & 2025 with expertise in cloud infrastructure, cybersecurity, networking, and AI.
					He is the Founder of TechPeak Lab, where he leads initiatives that equip professionals across Africa with in-demand technology skills.
					
					As a former Subsea Network Engineer, he played a key role in deploying and interconnecting carrier-grade data centres and submarine cable landing stations across West Africa and Europe.
					His work now focuses on building secure enterprise AI solutions, intelligent agents, and agentic workflows using LangChain, MCP, n8n, and large language models.
					
					With over a decade of industry experience, he has delivered large-scale cloud and network projects while also training technology professionals.
					Olúmáyòwá is a speaker, mentor, and instructor dedicated to helping individuals and organizations leverage AI, cloud, and cybersecurity to drive digital transformation.
				`,
				socials: {
					linkedin: "https://www.linkedin.com/in/olumayowaa",
				}
			},
		],
	},
	{
		track: "Design",
		slug: "design",
		title: "Designing for AI-Powered Products",
		summary:
			"A look at how AI is changing product design — from AI-assisted design workflows to designing trustworthy AI interfaces.",
		description:
			"The Design breakout looks at what changes for product and UX design when AI is part of the product itself. Expect a walkthrough of AI-assisted design tooling, patterns for designing clear and trustworthy AI-powered interfaces, and discussion on where designers fit into fast-moving AI product teams.",
		accent: "coreYellow",
		speakers: [
			{
				name: "Faith Adeyinka",
				role: "",
				organization: "Product Designer",
				photo: "/main-event/faith_adeyinka.jpeg",
				bio: `
					Faith Adeyinka is a Product Designer and final-year Computer Engineering student passionate about designing technology that solves meaningful human problems. Her work spans product design, AI-assisted workflows, and emerging technologies, with a growing focus on emotionally intelligent experiences, wearable technology, and women's health.

					Driven by curiosity and a love for problem-solving, Faith explores how AI can enhance the design process, from research and ideation to critique and decision-making, all while keeping human-centred thinking at the core.

					Beyond her work, she is passionate about sharing knowledge and mentoring aspiring designers, helping the next generation of creatives build confidently with AI.
				`,
				socials: {
					linkedin: "https://www.linkedin.com/in/faith-adeyinka-adetomilola",
				}
			},
		],
	},
];

export type Organizer = {
	name: string;
	role: string;
	course: string;
	level: string;
	photo: string;
	socials?: SocialLinks;
};

export const ORGANIZERS: Organizer[] = [
	{
		name: "Blessing Agbor",
		role: "Campus Lead",
		course: "Bsc. Computer engineering",
		level: "300 Level",
		photo: "/organizers/blessing.jpeg",
		socials: {},
	},
	{
		name: "Akingunsoye Favour Adurapemi",
		role: "Volunteer Lead",
		course: "Bsc. Computer engineering",
		level: "300 Level",
		photo: "/organizers/adurapemi.jpeg",
		socials: {},
	},
	{
		name: "Sunmade",
		role: "Quant Computing Lead",
		course: "Bsc. Computer engineering",
		level: "300 Level",
		photo: "/organizers/sunmade.jpeg",
		socials: {},
	},
	{
		name: "Joseph Taiwo",
		role: "Cloud Computing Lead",
		course: "BSc. Computer Science with Economics",
		level: "400 Level",
		photo: "/organizers/Aribad.jpeg",
		socials: {},
	},
	{
		name: "Olamide Lawal ",
		role: "Data Science & ML Lead",
		course: "BSc. Electrical & Electronics Engineering",
		level: "300 Level",
		photo: "/organizers/olamide_lawal.jpg",
		socials: {},
	},
	{
		name: "Teminioluwa Adekoya ",
		role: "Web Development Co-Lead",
		course: "BSc. Computer Engineering",
		level: "300 Level",
		photo: "/organizers/temiloluwa_adekoya.jpeg",
		socials: {},
	},
	{
		name: "Moshood Bushroh",
		role: "Cybersecurity Co-Lead",
		course: "BSc. Computer Science with Mathematics",
		level: "200 Level",
		photo: "/organizers/bushroh.jpeg",
		socials: {},
	},
	{
		name: "Adesina Lekan Samuel ",
		role: "Quant Finance Lead",
		course: "BSc. Computer Science with Mathematics",
		level: "400 Level",
		photo: "/organizers/Limitless.jpeg",
		socials: {},
	},
	{
		name: "St. Mark Adebayo",
		role: "Data Science & ML Co-Lead",
		course: "BSc Microbiology",
		level: "400 Level",
		photo: "/organizers/stmarkadebayo.png",
		socials: {},
	},
	{
		name: "Joseph Oyetunde",
		role: "Web Development Lead",
		course: "BSc Computer Science & Engineering",
		level: "400 Level",
		photo: "/organizers/codegod.jpg",
		socials: {},
	},
];

export const COLOR_THEMES = [
	{
		card: "bg-coreRed/25 border-ink/55",
		title: "text-ink",
		summary: "text-ink/90",
		timeBg: "bg-ink",
		timeText: "text-base", // Assumes 'base' is your light/background color in tailwind config
	},
	{
		card: "bg-coreYellow/25 border-ink/55",
		title: "text-ink",
		summary: "text-ink/90",
		timeBg: "bg-ink",
		timeText: "text-base",
	},
	{
		card: "bg-coreBlue/25 border-ink/55",
		title: "text-ink",
		summary: "text-ink/90",
		timeBg: "bg-ink",
		timeText: "text-base",
	},
	{
		card: "bg-coreGreen/25 border-ink/55",
		title: "text-ink",
		summary: "text-ink/85",
		timeBg: "bg-ink", // Inverted for the dark card
		timeText: "text-base",
	},
];
