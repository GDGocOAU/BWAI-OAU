"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { 
  FiCalendar, 
  FiChevronDown, 
  FiChevronUp, 
  FiCheckCircle, 
  FiFileText, 
  FiHelpCircle, 
  FiMail,
  FiAward,
  FiBookOpen,
  FiPlay,
  FiCheck
} from "react-icons/fi";
import { SITE_LINKS } from "@/lib/config";

// Tracks Data from Website Deliverables.md
const TRACKS = [
  {
    number: 1,
    title: "Artificial Intelligence and Computing",
    description: "Original research, systems work, and applied projects at the intersection of AI, machine learning, software engineering, and computing. This is our flagship track and covers the broadest range of technical work — from model evaluation and agentic systems to cybersecurity, quantitative finance applications, and AI infrastructure.",
    subAreas: [
      "Machine learning systems and model evaluation",
      "Agentic AI and autonomous systems",
      "Natural language processing and large language models",
      "AI observability and interpretability",
      "Cybersecurity in AI systems",
      "Human-computer interaction",
      "Quantitative finance and AI-driven market systems",
      "AI infrastructure and MLOps",
      "Edge computing in resource-constrained environments"
    ]
  },
  {
    number: 2,
    title: "AI in Health and Life Sciences",
    description: "Research exploring how artificial intelligence is being applied to health systems, diagnostics, public health, and biomedical research — with particular attention to African health contexts and the specific challenges of deploying AI in low-resource medical environments.",
    subAreas: [
      "AI-assisted diagnostics and clinical decision support",
      "Public health data systems and disease surveillance",
      "Health informatics and electronic health records",
      "AI in drug discovery",
      "Mental health technology",
      "Community health systems and telemedicine",
      "Bias and fairness in health AI models"
    ]
  },
  {
    number: 3,
    title: "AI Governance, Policy and Society",
    description: "Research examining the regulatory, ethical, political, and social dimensions of artificial intelligence — who governs it, who benefits, and who bears the risks. This track welcomes work from law, political science, sociology, economics, and interdisciplinary fields.",
    subAreas: [
      "AI regulation and national policy frameworks",
      "Data protection and digital rights",
      "Algorithmic accountability and audit frameworks",
      "AI and electoral integrity",
      "Misinformation and synthetic media governance",
      "AI ethics and value alignment",
      "African perspectives on global AI governance",
      "Gender and inclusion in AI systems"
    ]
  },
  {
    number: 4,
    title: "AI in Education and Learning",
    description: "Research on how artificial intelligence is transforming teaching, learning, curriculum design, and educational access — particularly in African university and secondary school contexts.",
    subAreas: [
      "AI tutoring systems and personalised learning",
      "Educational technology design",
      "AI literacy and digital skills development",
      "Curriculum innovation in the age of generative AI",
      "Access and equity in AI-assisted education",
      "Research methods and academic integrity in the AI era"
    ]
  }
];

// Abstract Options Data from reference site screenshots
const ABSTRACT_OPTIONS = [
  {
    title: "Option 1: Research Abstracts",
    sections: [
      { name: "Background", detail: "State the purpose/objective, hypothesis, or problem addressed." },
      { name: "Methods", detail: "Describe the study period, setting, design, population, data collection, and analysis." },
      { name: "Results", detail: "Present key findings and outcomes." },
      { name: "Conclusions", detail: "Explain the significance, implications, and future directions." }
    ]
  },
  {
    title: "Option 2: Programme/Project Implementation Abstracts",
    sections: [
      { name: "Background", detail: "Summarise the purpose, scope, and objectives of the programme, project, or policy." },
      { name: "Description", detail: "Outline the period, setting, structure, key populations, activities, and interventions." },
      { name: "Lessons Learned", detail: "Present findings, outcomes, and best practices, supported by specific results." },
      { name: "Conclusions/Next Steps", detail: "Discuss the significance, implications, and recommendations for future work." }
    ]
  }
];

// FAQ Data from Website Deliverables.md
const FAQS = [
  {
    question: "Can I submit if I am not from OAU?",
    answer: "Yes. This call is open to researchers from any Nigerian university and to independent practitioners."
  },
  {
    question: "Does my research have to be about AI?",
    answer: "Not exclusively, but all four tracks are framed around AI's role in their respective domains. Research that engages with AI — whether critically, technically, or practically — is the strongest fit. Pure social science or health research with no AI dimension would be better suited to a different conference."
  },
  {
    question: "Can I submit work that is still in progress?",
    answer: "Yes. Work in progress is welcome provided you can clearly articulate your research question, methodology, and preliminary or expected findings."
  },
  {
    question: "What happens after I submit?",
    answer: "You will receive an acknowledgement email confirming receipt. Decisions are sent to all applicants by the notification deadline, with brief feedback from reviewers."
  },
  {
    question: "What does the poster session look like on the day?",
    answer: "Accepted presenters stand beside a physical display of their research and present it to visitors who move freely between poster stations. You will engage directly with attendees, explain your work, and answer questions. It is intimate and conversational — not a lecture."
  },
  {
    question: "Who is on the Editorial Board?",
    answer: "Members of the Editorial Board will be announced on this page as they are confirmed."
  }
];

export default function ResearchPage() {
  const [openTrack, setOpenTrack] = useState<number | null>(1);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setMounted(true);
    setNow(new Date());
  }, []);

  const toggleTrack = (num: number) => {
    setOpenTrack(openTrack === num ? null : num);
  };

  const toggleFaq = (num: number) => {
    setOpenFaq(openFaq === num ? null : num);
  };

  const timelineItems = [
    { label: "Call for Abstracts Opens", date: "June 1, 2026", dateStr: "2026-06-01" },
    { label: "Abstract Submission Deadline", date: "June 30, 2026", dateStr: "2026-06-30" },
    { label: "Notification of Decisions", date: "July 10, 2026", dateStr: "2026-07-10" },
    { label: "Poster File Submission Deadline", date: "July 18, 2026", dateStr: "2026-07-18" },
    { label: "Build with AI OAU 2026 Main Event", date: "July 25, 2026", dateStr: "2026-07-25" }
  ];

  const processedItems = timelineItems.map((item, idx) => {
    let status: "past" | "active" | "future" = "future";
    
    // Default SSR state to avoid hydration mismatch
    if (!mounted || !now) {
      if (idx < 1) status = "past";
      else if (idx === 1) status = "active";
      else status = "future";
    } else {
      const eventDate = new Date(item.dateStr + "T00:00:00");
      const nextDay = new Date(eventDate);
      nextDay.setDate(nextDay.getDate() + 1);
      
      const isPast = now.getTime() >= nextDay.getTime();
      if (isPast) {
        status = "past";
      }
    }
    return { ...item, status };
  });

  if (mounted && now) {
    const firstActiveIdx = processedItems.findIndex(item => item.status !== "past");
    if (firstActiveIdx !== -1) {
      processedItems[firstActiveIdx].status = "active";
    }
  }

  return (
    <div className="relative isolate overflow-hidden bg-base pb-16">
      {/* Background gradients similar to SponsorsPage */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-120 bg-[radial-gradient(58rem_22rem_at_20%_0%,rgba(124,38,207,0.18),transparent),radial-gradient(52rem_20rem_at_95%_10%,rgba(66,133,244,0.15),transparent)]" />

      {/* Background Grid Lines */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60" />

      {/* Hero Section */}
      <section 
        className="mx-auto w-full max-w-7xl px-4 pt-16 sm:px-6 sm:pt-20 lg:px-8 lg:pt-24"
        // style={{ backgroundImage: "url('/research_hero_bg.jpg')" }}
      >
        <div 
          className="relative overflow-hidden rounded-3xl bg-cover bg-center bg-no-repeat px-6 py-12 text-white shadow-xl sm:px-12 sm:py-20 lg:px-16"
        >
          {/* Dark purple overlay to guarantee white text contrast */}
          <div className="absolute inset-0 bg-purple-950/70 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-950/90 via-indigo-950/75 to-purple-950/50" />
          
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35" />
          
          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-purple-200 backdrop-blur-md">
              <FiAward size={12} className="text-purple-300" />
              Build with AI OAU 2026
            </span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-white">
              Call for Abstracts
            </h1>
            <p className="mt-2 text-lg font-medium text-purple-200/90 sm:text-xl">
              Research Poster Session
            </p>
            <p className="mt-6 text-base leading-7 text-purple-100/80 sm:text-lg">
              Your research deserves a room. Submit your abstract and present your work at the inaugural Build with AI OAU 2026 Research Poster Session — the first of its kind at this event.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={SITE_LINKS.abstract_submission}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-purple-950 shadow-sm transition-transform duration-300 hover:-translate-y-0.5 hover:bg-purple-50"
              >
                Submit Your Abstract
              </a>
              <a
                href="#guidelines"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 hover:bg-white/10"
              >
                Read Submission Guidelines
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="mx-auto w-full max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          
          {/* Left Column: About, Tracks, and Formats */}
          <div className="flex flex-col gap-12 lg:col-span-8">
            
            {/* Poster Session Photo Container */}
            <div className="relative overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-md">
              <div className="relative aspect-video w-full">
                <Image
                  src="/research_poster_session.png"
                  alt="Build with AI OAU Research Poster Session"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 800px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 rounded-lg bg-black/60 px-3 py-1 text-xs text-white backdrop-blur-sm">
                  Inaugural Research Poster Session 2026
                </span>
              </div>
            </div>

            {/* About Section */}
            <div className="rounded-3xl border border-ink/10 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-ink sm:text-3xl">About This Call</h2>
              <div className="mt-4 flex flex-col gap-4 text-base leading-7 text-muted">
                <p>
                  Build with AI OAU 2026 is introducing a research category for the first time. On July 25, 2026, alongside keynote addresses, panel discussions, and breakout sessions, we will host a Research Poster Session where accepted researchers present original work to an audience of 300+ students, early-career practitioners, and industry professionals from across southwestern Nigeria.
                </p>
                <p>
                  This is not a typical campus presentation. Submitted abstracts undergo independent peer review by our Editorial Board before acceptance. Accepted presenters are listed in the official Build with AI OAU 2026 Research Proceedings and receive a formal Certificate of Presentation.
                </p>
                <p>
                  We are accepting submissions across four tracks, all centered on the role of artificial intelligence in shaping the world our builders are entering.
                </p>
              </div>

              {/* Who Should Submit */}
              <div className="mt-8 border-t border-ink/10 pt-6">
                <h3 className="text-lg font-bold text-ink">Who Should Submit</h3>
                <p className="mt-2 text-sm text-muted">This call is open to:</p>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[
                    "Undergraduate students at any Nigerian university",
                    "Postgraduate researchers (MSc, MPhil, PhD)",
                    "Faculty members and academic staff",
                    "Independent researchers and industry practitioners"
                  ].map((target) => (
                    <li key={target} className="flex items-start gap-2.5 text-sm text-muted">
                      <FiCheckCircle className="mt-0.5 shrink-0 text-purple-600" size={16} />
                      <span>{target}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs italic text-muted">
                  * You do not need a completed paper to submit. Work in progress is welcome, provided your research question, methodology, and preliminary findings are clearly defined.
                </p>
              </div>
            </div>

            {/* The Tracks Accordion */}
            <div>
              <h2 className="text-2xl font-bold text-ink sm:text-3xl">The Tracks</h2>
              <p className="mt-2 text-sm text-muted">Explore the four submission categories for original work.</p>
              
              <div className="mt-6 flex flex-col gap-4">
                {TRACKS.map((track) => {
                  const isOpen = openTrack === track.number;
                  return (
                    <div 
                      key={track.number}
                      className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                        isOpen 
                          ? "border-purple-300 bg-purple-50/30 shadow-sm" 
                          : "border-ink/10 bg-white hover:border-purple-200"
                      }`}
                    >
                      <button
                        onClick={() => toggleTrack(track.number)}
                        className={`flex w-full items-center justify-between px-5 py-4 text-left font-semibold transition-colors duration-200 cursor-pointer ${
                          isOpen ? "bg-purple-900 text-white" : "text-ink"
                        }`}
                      >
                        <span className="sm:text-lg">
                          Track {track.number}: {track.title}
                        </span>
                        {isOpen ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                          >
                            <div className="px-5 py-5 flex flex-col gap-4 text-sm leading-6 text-muted">
                              <p className="font-medium text-ink/95">{track.description}</p>
                              <div>
                                <h4 className="font-bold text-ink uppercase tracking-wider text-[11px] mb-2">Relevant Sub-areas:</h4>
                                <ul className="grid gap-2 sm:grid-cols-2">
                                  {track.subAreas.map((sub, i) => (
                                    <li key={i} className="flex items-start gap-2 text-xs">
                                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-600" />
                                      <span>{sub}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Abstract Format Options Section */}
            <div>
              <h2 className="text-2xl font-bold text-ink sm:text-3xl">Abstract Formats</h2>
              <p className="mt-2 text-sm text-muted">Authors can select between two formats for their abstract, guaranteeing clarity and relevance to their work.</p>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                {ABSTRACT_OPTIONS.map((opt, index) => {
                  const isOption1 = index === 0;
                  return (
                    <div 
                      key={index} 
                      className={`relative overflow-hidden rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 ${
                        isOption1
                          ? "border-purple-200 bg-gradient-to-br from-purple-50/95 via-purple-100/40 to-white shadow-[0_12px_30px_-15px_rgba(124,58,237,0.15)] hover:shadow-[0_16px_36px_-12px_rgba(124,58,237,0.25)]"
                          : "border-indigo-200 bg-gradient-to-br from-indigo-50/95 via-indigo-100/40 to-white shadow-[0_12px_30px_-15px_rgba(99,102,241,0.15)] hover:shadow-[0_16px_36px_-12px_rgba(99,102,241,0.25)]"
                      }`}
                    >
                      {/* Decorative inner glows */}
                      <div className={`absolute -right-8 -top-8 h-20 w-20 rounded-full blur-xl pointer-events-none ${
                        isOption1 ? "bg-purple-400/20" : "bg-indigo-400/20"
                      }`} />
                      <div className={`absolute -left-8 -bottom-8 h-20 w-20 rounded-full blur-xl pointer-events-none ${
                        isOption1 ? "bg-purple-300/10" : "bg-indigo-300/10"
                      }`} />

                      <h3 className={`text-lg font-bold flex items-center gap-2 ${
                        isOption1 ? "text-purple-950" : "text-indigo-950"
                      }`}>
                        <FiFileText className={isOption1 ? "text-purple-700" : "text-indigo-700"} size={18} />
                        {opt.title}
                      </h3>
                      
                      <div className="mt-5 flex flex-col gap-4 relative z-10">
                        {opt.sections.map((section, idx) => (
                          <div key={idx} className="text-sm">
                            <span className={`font-bold block ${
                              isOption1 ? "text-purple-900" : "text-indigo-900"
                            }`}>{section.name}</span>
                            <span className="text-muted block mt-0.5">{section.detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* How to Submit */}
            <div id="guidelines" className="rounded-3xl border border-ink/10 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-ink sm:text-3xl">How to Submit</h2>
              
              <div className="mt-6 flex flex-col gap-6">
                {[
                  {
                    step: "Step 1",
                    text: (
                      <span>
                        Prepare your abstract as a PDF following the <strong>IEEE formatting guidelines</strong> below. Do not include your name or institution inside the PDF document. Enter author details in the submission form only.
                      </span>
                    ),
                  },
                  {
                    step: "Step 2",
                    text: (
                      <span>
                        Complete the submission form at{" "}
                        <a
                          href={SITE_LINKS.abstract_submission}
                          target="_blank"
                          rel="noreferrer"
                          className="font-semibold text-purple-700 underline hover:text-purple-900 transition-colors"
                        >
                          Google Forms link
                        </a>
                        . The form will ask for your title, author details, track selection, and keywords, and will include a field to upload your PDF.
                      </span>
                    ),
                  },
                  {
                    step: "Step 3",
                    text: "You will receive an acknowledgement email confirming receipt of your submission within 48 hours.",
                  },
                  {
                    step: "Step 4",
                    text: "Your abstract undergoes double-blind peer review by the Editorial Board. Reviewer identities are not disclosed to authors and author identities are not disclosed to reviewers.",
                  },
                  {
                    step: "Step 5",
                    text: "All applicants receive a decision — accepted, waitlisted, or declined — by the notification deadline, along with brief reviewer feedback.",
                  },
                  {
                    step: "Step 6",
                    text: "Accepted presenters receive a formal acceptance letter, the official poster style guide, a recommended print vendor list in Ile-Ife, and further logistics details for July 25.",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <span className="flex h-8 w-16 shrink-0 items-center justify-center rounded-lg bg-purple-100 text-purple-800 font-bold text-xs">
                      {item.step}
                    </span>
                    <p className="text-sm text-muted leading-6">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* IEEE Formatting Guidelines */}
            <div id="formatting-guidelines" className="rounded-3xl border border-ink/10 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-ink sm:text-3xl">IEEE Formatting Guidelines</h2>
              <p className="mt-2 text-sm text-muted">
                Abstracts must be formatted strictly according to the following specifications to enter the peer review process:
              </p>
              
              <div className="mt-6 flex flex-col gap-6">
                <div className="flex gap-3">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded bg-purple-100 text-purple-800 font-bold text-xs">
                    <FiPlay size={12} className="fill-purple-800" />
                  </div>
                  <div>
                    <h3 className="font-bold text-ink">Format & Fonts</h3>
                    <ul className="mt-2 flex flex-col gap-2 text-sm text-muted pl-1">
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-purple-600" />
                        <span><strong>Title:</strong> Times New Roman, 12pt, sentence case, centered, bold.</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-purple-600" />
                        <span><strong>Body:</strong> Times New Roman, 11pt, single line spacing, one column.</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-purple-600" />
                        <span>No bullets, lists, headers, footers, citations, tables, figures, or references in the abstract.</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-purple-600" />
                        <span><strong>Word limit:</strong> 250 to 300 words for the abstract body, excluding title and author details.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded bg-purple-100 text-purple-800 font-bold text-xs">
                    <FiPlay size={12} className="fill-purple-800" />
                  </div>
                  <div>
                    <h3 className="font-bold text-ink">Keywords</h3>
                    <p className="mt-1 text-sm text-muted">Please indicate 3-5 keywords (free text, maximum 25 characters per keyword). The keywords must be representative of the content of the abstract.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded bg-purple-100 text-purple-800 font-bold text-xs">
                    <FiPlay size={12} className="fill-purple-800" />
                  </div>
                  <div>
                    <h3 className="font-bold text-ink">Originality & Language</h3>
                    <p className="mt-1 text-sm text-muted">Submissions must be original, in English only, and not previously published or presented unless substantially updated.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Poster Production */}
            <div id="poster-production" className="rounded-3xl border border-ink/10 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-ink sm:text-3xl">Poster Production</h2>
              <p className="mt-2 text-sm text-muted">
                Accepted presenters are responsible for designing and printing their own poster before the event.
              </p>
              
              <div className="mt-6 flex flex-col gap-6">
                <div className="flex gap-3">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded bg-purple-100 text-purple-800 font-bold text-xs">
                    <FiPlay size={12} className="fill-purple-800" />
                  </div>
                  <div>
                    <h3 className="font-bold text-ink">Poster Size & Layout</h3>
                    <p className="mt-1 text-sm text-muted">
                      <strong>Poster size:</strong> A0 portrait (841 × 1189mm)
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded bg-purple-100 text-purple-800 font-bold text-xs">
                    <FiPlay size={12} className="fill-purple-800" />
                  </div>
                  <div>
                    <h3 className="font-bold text-ink">Templates & Assets</h3>
                    <p className="mt-1 text-sm text-muted">
                      We recommend using the{" "}
                      <a
                        href="https://www.overleaf.com/gallery/tagged/poster"
                        target="_blank"
                        rel="noreferrer"
                        className="font-semibold text-purple-700 underline hover:text-purple-900 transition-colors"
                      >
                        Overleaf conference poster template library
                      </a>{" "}
                      as a starting point. Select any template, replace the content with your research, and export as PDF for printing.
                    </p>
                    <p className="mt-3 text-sm text-muted font-normal">
                      Include the Build with AI OAU 2026 logo in the top corner of your poster — the logo is available for download here:{" "}
                      <a
                        href="/gdg-oau-logo.png"
                        download
                        className="font-semibold text-purple-700 underline hover:text-purple-900 transition-colors"
                      >
                        Download Logo Asset
                      </a>
                      .
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded bg-purple-100 text-purple-800 font-bold text-xs">
                    <FiPlay size={12} className="fill-purple-800" />
                  </div>
                  <div>
                    <h3 className="font-bold text-ink">Style Guide</h3>
                    <p className="mt-1 text-sm text-muted font-normal">
                      A style guide specifying fonts, minimum text sizes, required sections, and logo placement will be sent to all accepted presenters. You do not need to design your poster before receiving it.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded bg-purple-100 text-purple-800 font-bold text-xs">
                    <FiPlay size={12} className="fill-purple-800" />
                  </div>
                  <div>
                    <h3 className="font-bold text-ink">Printing Costs & Vendors</h3>
                    <p className="mt-1 text-sm text-muted font-semibold">
                      Printing costs are the responsibility of the presenting author.
                    </p>
                    <p className="mt-1 text-sm text-muted font-normal">
                      A list of recommended local vendors in Ile-Ife with negotiated rates will be provided to accepted presenters.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Timeline, What Presenters Receive, and FAQ */}
          <div className="flex flex-col gap-12 lg:col-span-4">
            
            {/* Action Box: Submit CTA */}
            <div className="rounded-3xl border border-purple-200 bg-purple-50/70 p-6 shadow-sm sticky top-24">
              <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800">
                <span className="h-1.5 w-1.5 rounded-full bg-green-600 animate-pulse" />
                Submissions Open
              </span>
              <h3 className="mt-3 text-xl font-bold text-purple-950">Ready to Submit?</h3>
              <p className="mt-2 text-xs text-purple-900/80 leading-5">
                Ensure you have formatted your abstract strictly according to the guidelines, then submit via the official form before the deadline.
              </p>

              <div className="mt-5 flex flex-col gap-3">
                <a
                  href={SITE_LINKS.abstract_submission}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center justify-center rounded-full bg-purple-900 py-3 text-sm font-semibold text-white shadow-sm transition-transform duration-300 hover:-translate-y-0.5 hover:bg-purple-950"
                >
                  Submit Abstract Form
                </a>
                <div className="text-center text-[11px] text-muted mt-2">
                  Deadline: <span className="font-semibold text-purple-900">June 30, 2026</span>
                </div>
              </div>

              {/* What Accepted Presenters Receive */}
              <div className="mt-6 border-t border-purple-200 pt-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-purple-950">Presenters Receive:</h4>
                <ul className="mt-3 flex flex-col gap-2.5">
                  {[
                    "Letter of acceptance for academic records",
                    "Inclusion in official Research Proceedings",
                    "Certificate of Presentation",
                    "Eligibility for Research Poster Awards"
                  ].map((reward, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-purple-900/80">
                      <FiCheckCircle size={14} className="mt-0.5 shrink-0 text-purple-700" />
                      <span>{reward}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Timeline */}
            <div className="rounded-3xl border border-ink/10 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-ink flex items-center gap-2">
                <FiCalendar className="text-purple-600" size={18} />
                Timeline
              </h3>
              
              <div className="mt-5 flex flex-col gap-6">
                {processedItems.map((item, idx) => {
                  const isPast = item.status === "past";
                  const isActive = item.status === "active";
                  const isFuture = item.status === "future";

                  return (
                    <div key={idx} className="relative pl-6 border-l border-ink/10 last:border-0 pb-1">
                      {isPast && (
                        <span className="absolute left-0 top-1.5 h-4 w-4 -translate-x-1/2 rounded-full bg-purple-600 border border-purple-600 text-white flex items-center justify-center">
                          <FiCheck size={10} className="stroke-[3.5]" />
                        </span>
                      )}
                      {isActive && (
                        <span className="absolute left-0 top-1.5 h-4.5 w-4.5 -translate-x-1/2 rounded-full border-2 border-purple-600 bg-white flex items-center justify-center">
                          <span className="h-2 w-2 rounded-full bg-purple-600 animate-pulse" />
                        </span>
                      )}
                      {isFuture && (
                        <span className="absolute left-0 top-1.5 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-ink/20 bg-white" />
                      )}

                      <h4 className={`text-xs font-semibold ${
                        isActive ? "text-purple-950 font-bold" : isPast ? "text-ink/60" : "text-ink/50"
                      }`}>
                        {item.label}
                      </h4>
                      <p className={`text-sm mt-0.5 ${
                        isActive ? "text-purple-700 font-bold" : isPast ? "text-ink/80" : "text-ink/70"
                      }`}>
                        {item.date}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Contact Details */}
            <div className="rounded-3xl border border-ink/10 bg-white p-6 shadow-sm">
              <h3 className="text-base font-bold text-ink">Contact Info</h3>
              <p className="mt-1 text-xs text-muted">
                For questions about the abstract submission or guidelines:
              </p>
              <a
                href="mailto:oaudsc@gmail.com"
                className="mt-4 flex items-center gap-2 rounded-2xl border border-ink/5 bg-base/50 p-3 text-xs text-purple-950 hover:bg-purple-50/50 transition-colors"
              >
                <FiMail size={16} className="text-purple-700" />
                <div>
                  <span className="font-semibold block">Editorial Office</span>
                  <span className="text-muted text-[11px] block">oaudsc@gmail.com</span>
                </div>
              </a>
            </div>

          </div>

        </div>

        {/* FAQs Section */}
        <div className="mt-16 border-t border-ink/10 pt-12">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold text-ink sm:text-3xl flex items-center justify-center gap-2">
              <FiHelpCircle className="text-purple-600" size={24} />
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-sm text-muted">Common inquiries regarding the poster session and eligibility.</p>
          </div>

          <div className="mt-8 mx-auto max-w-4xl flex flex-col gap-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className="rounded-2xl border border-ink/10 bg-white overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="flex w-full items-center justify-between px-6 py-4 text-left font-semibold text-ink text-sm hover:bg-base/30"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-6 pb-5 pt-1 text-sm text-muted leading-6 border-t border-ink/5 bg-base/10">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

      </section>
    </div>
  );
}
