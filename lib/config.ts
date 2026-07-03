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

export const PRESERIES_PHOTO_SLOTS: Record<string, string[]> = {
	"mobile-web-dev": webDevPhotoSlots,
	"quantitative-finance": makePhotoSlots(),
	"game-development": makePhotoSlots(),
	"cybersecurity": makePhotoSlots(),
	"data-science-ml": makePhotoSlots(),
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
		],
	},
	{
		level: "Nano",
		sponsors: [],
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
	track: string;
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
	},
	{
		name: "Coming Soon...",
		title: "To Be Announced",
		organization: "TBA",
		track: "Mobile & Web Dev",
		photo: "/main-event/gdg-speaker-avatar.png",
		slug: "coming-soon-3",
		bio: "Biography coming soon. Stay tuned for updates on our keynote speakers!",
		socials: {
			linkedin: "https://linkedin.com/in/",
			website: "https://example.com"
		}
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
];

export const EVENT_LOCATION = {
	mainEvent: "BOOC, Obafemi Awolowo University",
	preSeries: "",
};

export const EVENT_SCHEDULE = [
	{
		time: "9:00 AM",
		title: "Registration & Welcome",
		description: "Check-in and networking breakfast",
	},
	{
		time: "10:00 AM",
		title: "Opening Keynote",
		description: "Welcome address and event overview",
	},
	{
		time: "11:00 AM",
		title: "Community Presentations",
		description: "Showcase of pre-series projects",
	},
	{
		time: "1:00 PM",
		title: "Lunch Break",
		description: "Networking and refreshments",
	},
	{
		time: "2:00 PM",
		title: "Panel Discussions",
		description: "Industry experts share insights",
	},
	{
		time: "4:00 PM",
		title: "Closing Ceremony",
		description: "Awards and next steps",
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
		name: "Akingunsoye Favour Adurapemi",
		role: "Community Lead",
		course: "Bsc. Computer engineering",
		level: "300 Level",
		photo: "/organizers/adurapemi.jpeg",
		socials: {},
	},
	{
		name: "Joseph Taiwo",
		role: "Organizer",
		course: "BSc. Computer Science with Economics",
		level: "400 Level",
		photo: "/organizers/Aribad.jpeg",
		socials: {},
	},
	{
		name: "Moshood Bushroh",
		role: "Organizer",
		course: "BSc. Computer Science with Mathematics",
		level: "200 Level",
		photo: "/organizers/bushroh.jpeg",
		socials: {},
	},
	{
		name: "Adesina Lekan Samuel ",
		role: "Organizer",
		course: "BSc. Computer Science with Mathematics",
		level: "400 Level",
		photo: "/organizers/Limitless.jpeg",
		socials: {},
	},
	{
		name: "St. Mark Adebayo",
		role: "Organizer",
		course: "BSc Microbiology",
		level: "400 Level",
		photo: "/organizers/stmarkadebayo.png",
		socials: {},
	},
	{
		name: "Joseph Oyetunde",
		role: "Organizer",
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
