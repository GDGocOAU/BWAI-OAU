"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { SOCIAL_LINKS } from "@/lib/config";
import { FiExternalLink } from "react-icons/fi";
import { FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { MdRocketLaunch } from "react-icons/md";
import dynamic from "next/dynamic";
import { motion } from "motion/react";
import Link from "next/link";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

type ProjectSummary = {
  id: number;
  name: string;
  description: string;
  community: string;
  tags: string[];
  techTags: string[];
  demoHref: string;
  voteCount: number;
};

type Props = {
  projects: ProjectSummary[];
  initialHasVoted: boolean;
  token: string | null;
  email: string;
  votingClosed: boolean;
};

export default function PeoplesChoiceClient({ projects, initialHasVoted, token, email, votingClosed }: Props) {
  const [emailInput, setEmailInput] = useState("");
  const [isRequestingLink, setIsRequestingLink] = useState(false);
  const [linkSent, setLinkSent] = useState(false);

  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(initialHasVoted);

  const [linkedinBase64, setLinkedinBase64] = useState<string>("");
  const [twitterBase64, setTwitterBase64] = useState<string>("");
  const [atfBase64, setAtfBase64] = useState<string>("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are accepted.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("File size must be 2MB maximum.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setter(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const AWARD_LOTTIE_URL = "https://assets10.lottiefiles.com/packages/lf20_touohxv0.json";
  const [awardAnimation, setAwardAnimation] = useState<object | null>(null);

  useEffect(() => {
    let mounted = true;
    const loadAnimation = async () => {
      try {
        const response = await fetch(AWARD_LOTTIE_URL);
        if (!response.ok) return;
        const payload = (await response.json()) as object;
        if (mounted) setAwardAnimation(payload);
      } catch {
        // Fallback silently
      }
    };
    loadAnimation();
    return () => { mounted = false; };
  }, []);



  const handleRequestLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return toast.error("Please enter your email address.");

    setIsRequestingLink(true);
    try {
      const res = await fetch("/api/peoples-choice/request-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailInput }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to request link");

      setLinkSent(true);
      toast.success("Magic link sent! Check your inbox.");
    } catch (err: any) {
      toast.error(err.message || "An unexpected error occurred.");
    } finally {
      setIsRequestingLink(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) return toast.error("Invalid session. Please request a new magic link.");
    if (!selectedProjectId) return toast.error("Please select a project to vote for.");

    if (!(linkedinBase64 && twitterBase64)) return toast.error("Please upload all required screenshots.");

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/peoples-choice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId: selectedProjectId, token, linkedinBase64, twitterBase64, atfBase64 }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit vote");
      }

      toast.success("Vote submitted successfully!");
      setSuccess(true);
      window.history.replaceState({}, document.title, window.location.pathname);
    } catch (err: any) {
      toast.error(err.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const linkedInLink = SOCIAL_LINKS.find((l) => l.label === "LinkedIn")?.href || "#";
  const twitterLink = SOCIAL_LINKS.find((l) => l.label === "Twitter/X")?.href || "#";
  const atfLink = "https://www.atfchallenge.org/apply?channel=WDVBKMUJ";

  // 0. VOTING CLOSED STATE
  if (votingClosed) {
    return (
      <div className="min-h-screen bg-surface pb-20">
        <Toaster position="bottom-center" />
        <section className="px-4 pb-10 pt-14 sm:px-6 lg:px-8 lg:pt-20">
          <div className="mx-auto w-full max-w-3xl text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} className="flex flex-col items-center">
              {awardAnimation ? (
                <div className="h-40 w-40 sm:h-52 sm:w-52">
                  <Lottie animationData={awardAnimation} loop autoplay />
                </div>
              ) : (
                <div className="flex h-40 w-40 items-center justify-center text-7xl sm:h-52 sm:w-52">🏆</div>
              )}
              <h1 className="mt-4 text-5xl font-bold leading-[1.1] text-ink sm:text-6xl">Voting Closed</h1>
              <p className="mx-auto mt-6 max-w-2xl text-[1.1rem] leading-relaxed text-ink/70">
                The People&apos;s Choice Award voting period has ended. Winners will be announced soon — stay tuned!
              </p>
              <div className="mt-8">
                <Link href="/peoples-choice/leaderboard" className="inline-flex items-center justify-center rounded-full border border-ink/20 bg-white px-6 py-3 text-sm font-bold text-ink transition-all hover:bg-ink/5">
                  View Leaderboard
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    );
  }

  // 1. SUCCESS / ALREADY VOTED STATE
  if (success) {
    return (
      <div className="min-h-screen bg-surface pb-20">
        <Toaster position="bottom-center" />
        <section className="px-4 pb-10 pt-14 sm:px-6 lg:px-8 lg:pt-20">
          <div className="mx-auto w-full max-w-3xl text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} className="flex flex-col items-center">
              {awardAnimation ? (
                <div className="h-40 w-40 sm:h-52 sm:w-52">
                  <Lottie animationData={awardAnimation} loop autoplay />
                </div>
              ) : (
                <div className="flex h-40 w-40 items-center justify-center text-7xl sm:h-52 sm:w-52">🏆</div>
              )}
              <h1 className="mt-4 text-5xl font-bold leading-[1.1] text-ink sm:text-6xl">Thank you for voting!</h1>
              <p className="mx-auto mt-6 max-w-2xl text-[1.1rem] leading-relaxed text-ink/70">
                Your vote has been recorded. Stay tuned for the final announcement of the People&apos;s Choice Award!
              </p>
              <div className="mt-8">
                <Link href="/peoples-choice/leaderboard" className="inline-flex items-center justify-center rounded-full border border-ink/20 bg-white px-6 py-3 text-sm font-bold text-ink transition-all hover:bg-ink/5">
                  View Leaderboard
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    );
  }

  // 2. REQUEST MAGIC LINK STATE (No valid token)
  if (!token) {
    return (
      <div className="min-h-screen bg-surface pb-20">
        <Toaster position="bottom-center" />
        <section className="px-4 pb-10 pt-6 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-3xl text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} className="flex flex-col items-center">
              {awardAnimation ? (
                <div className="h-40 w-40 sm:h-52 sm:w-52">
                  <Lottie animationData={awardAnimation} loop autoplay />
                </div>
              ) : (
                <div className="flex h-40 w-40 items-center justify-center text-7xl sm:h-52 sm:w-52">🏆</div>
              )}
              <h1 className="mt-4 text-5xl font-bold leading-[1.1] text-ink sm:text-6xl">
                People&apos;s Choice Award
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-[1.1rem] leading-relaxed text-ink/70">
                Vote for the project that wowed you the most! Enter your email to receive a secure, single-use voting link.
              </p>
              <div className="mt-8">
                <Link href="/peoples-choice/leaderboard" className="inline-flex items-center justify-center rounded-full border border-ink/20 bg-white px-6 py-3 text-sm font-bold text-ink transition-all hover:bg-ink/5">
                  View Leaderboard
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-md">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}>
              <div className="rounded-3xl border border-ink/10 bg-white p-6 sm:p-8">
                <h3 className="mb-2 text-2xl font-bold text-ink">Get Your Magic Link</h3>
                <p className="mb-6 text-sm text-ink/60">To prevent spam, we&apos;ll send you a one-time voting link via email. No passwords, no accounts.</p>

                {linkSent ? (
                  <div className="rounded-2xl border border-coreGreen/20 bg-coreGreen/10 p-6 text-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-coreGreen/20 text-2xl">✉️</div>
                    <p className="text-base font-bold text-coreGreen">Magic link sent!</p>
                    <p className="mt-2 text-sm text-ink/70">Check your inbox and click the link to cast your vote. You can close this window.</p>
                  </div>
                ) : (
                  <form onSubmit={handleRequestLink} className="space-y-5 flex flex-col gap-4">
                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm font-bold text-ink">Email Address</label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        className="w-full rounded-xl border border-ink/10 bg-surface/50 px-4 py-3 text-sm text-ink outline-none transition-all focus:border-ink/30 focus:ring-1 focus:ring-ink/10"
                        placeholder="hello@example.com"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isRequestingLink}
                      className="inline-flex w-full items-center justify-center rounded-full bg-ink px-8 py-4 text-base font-bold text-white transition-all hover:bg-ink/80 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isRequestingLink ? (
                        <span className="flex items-center gap-2">
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                          Sending...
                        </span>
                      ) : (
                        "Send Magic Link"
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    );
  }

  // 3. VOTING FORM STATE (Valid Token)
  return (
    <div className="min-h-screen bg-surface pb-20">
      <Toaster position="bottom-center" />
      <section className="px-4 pb-10 pt-6 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-3xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} className="flex flex-col items-center">
            {awardAnimation ? (
              <div className="h-40 w-40 sm:h-52 sm:w-52">
                <Lottie animationData={awardAnimation} loop autoplay />
              </div>
            ) : (
              <div className="flex h-40 w-40 items-center justify-center text-7xl sm:h-52 sm:w-52">🏆</div>
            )}
            <h1 className="mt-4 text-5xl font-bold leading-[1.1] text-ink sm:text-6xl">
              People&apos;s Choice Award
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-[1.1rem] leading-relaxed text-ink/70">
              Vote for the project that wowed you the most! Support your favorite builders by engaging with our community channels and the ATF AI Challenge to cast your vote.
            </p>
            <p className="mt-3 rounded-full bg-ink/5 px-4 py-2 text-sm font-medium text-ink/70">
              Voting as: <strong className="text-ink">{email}</strong>
            </p>
            <div className="mt-8">
              <Link href="/peoples-choice/leaderboard" className="inline-flex items-center justify-center rounded-full border border-ink/20 bg-white px-6 py-3 text-sm font-bold text-ink transition-all hover:bg-ink/5">
                View Leaderboard
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-3xl">
          <form onSubmit={handleSubmit} className="space-y-12 flex flex-col gap-3">
            
            {/* Step 1: Select Project */}
            <div className="rounded-3xl border border-ink/10 bg-white p-6 sm:p-8">
              <h3 className="mb-6 text-2xl font-bold text-ink">1. Select a Project</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {projects.map((project) => {
                  const isSelected = selectedProjectId === project.id;
                  return (
                    <label
                      key={project.id}
                      className={`relative flex cursor-pointer flex-col rounded-2xl border p-5 transition-all ${
                        isSelected
                          ? "border-ink bg-ink/5 ring-1 ring-ink"
                          : "border-ink/10 bg-white hover:border-ink/30"
                      }`}
                    >
                      <input
                        type="radio"
                        name="project"
                        className="sr-only"
                        value={project.id}
                        checked={isSelected}
                        onChange={() => setSelectedProjectId(project.id)}
                      />
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <span className="block text-sm font-bold text-ink">{project.name}</span>
                          <span className="mt-1 block text-xs font-semibold text-ink/60 uppercase tracking-wider">{project.community}</span>
                        </div>
                        <div className="flex shrink-0 items-center gap-1.5 rounded-full bg-ink/5 px-2.5 py-1">
                          <span className="text-xs font-bold text-ink/70">{project.voteCount}</span>
                        </div>
                      </div>
                      <span className={`mt-2 text-sm text-ink/70 ${isSelected ? '' : 'line-clamp-2'}`}>{project.description}</span>

                      {isSelected && (
                        <div className="mt-4 flex flex-col gap-3 border-t border-ink/10 pt-4">
                          {project.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                              {project.tags.map((tag) => (
                                <span key={tag} className="rounded-full bg-coreBlue/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-coreBlue">{tag}</span>
                              ))}
                            </div>
                          )}
                          {project.techTags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                              {project.techTags.map((tag) => (
                                <span key={tag} className="rounded-full bg-ink/5 px-2.5 py-0.5 text-[10px] font-semibold text-ink/60">{tag}</span>
                              ))}
                            </div>
                          )}
                          {project.demoHref && project.demoHref !== '#' && (
                            <a
                              href={project.demoHref}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1.5 text-xs font-bold text-coreBlue hover:underline"
                            >
                              View Demo <FiExternalLink size={12} />
                            </a>
                          )}
                        </div>
                      )}

                      {isSelected && (
                        <span className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-ink text-white">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                      )}
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Engage With Community */}
            <div className="rounded-3xl border border-ink/10 bg-white p-6 sm:p-8">
              <h3 className="mb-2 text-2xl font-bold text-ink">2. Engage With Our Community</h3>
              <p className="mb-6 text-sm text-ink/60">Show your support by following us and joining the ATF AI Challenge!</p>
              
              <div className="mb-6 rounded-2xl bg-amber-50 p-4 border border-amber-200">
                <p className="text-sm font-semibold text-amber-800">
                  We updated our requirements, the items below are hereby required for submission of vote.
                </p>
              </div>

              <div className="flex flex-col gap-6">
                {/* LinkedIn */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-ink/5 pb-6">
                  <div className="flex-1">
                    <p className="text-lg font-bold text-ink mb-3">Follow on LinkedIn</p>
                    <div className="w-full sm:max-w-xs">
                      <label className="block text-xs font-bold text-ink/60 mb-1">Upload Screenshot (Max 2MB)</label>
                      <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, setLinkedinBase64)} className="block w-full text-sm text-ink/70 file:mr-4 file:rounded-full file:border-0 file:bg-ink/5 file:px-4 file:py-2 file:text-sm file:font-semibold hover:file:bg-ink/10 cursor-pointer" />
                    </div>
                  </div>
                  <div className="shrink-0 pt-1">
                    <a href={linkedInLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-[#0077b5] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#0077b5]/90">
                      <FaLinkedinIn /> View Page <FiExternalLink size={12} />
                    </a>
                  </div>
                </div>

                {/* Twitter */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-ink/5 pb-6">
                  <div className="flex-1">
                    <p className="text-lg font-bold text-ink mb-3">Follow on X</p>
                    <div className="w-full sm:max-w-xs">
                      <label className="block text-xs font-bold text-ink/60 mb-1">Upload Screenshot (Max 2MB)</label>
                      <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, setTwitterBase64)} className="block w-full text-sm text-ink/70 file:mr-4 file:rounded-full file:border-0 file:bg-ink/5 file:px-4 file:py-2 file:text-sm file:font-semibold hover:file:bg-ink/10 cursor-pointer" />
                    </div>
                  </div>
                  <div className="shrink-0 pt-1">
                    <a href={twitterLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-black px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-black/80">
                      <FaXTwitter /> View Profile <FiExternalLink size={12} />
                    </a>
                  </div>
                </div>

                {/* ATF Challenge */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-lg font-bold text-ink mb-3">
                      Join ATF AI Challenge <span className="ml-2 inline-flex items-center rounded-full bg-ink/5 px-2.5 py-0.5 text-[10px] font-bold text-ink/60 uppercase tracking-wider align-middle">$10,000 up for grabs</span>
                    </p>
                    <div className="w-full sm:max-w-xs">
                      <label className="block text-xs font-bold text-ink/60 mb-1">Upload Screenshot (Max 2MB)</label>
                      <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, setAtfBase64)} className="block w-full text-sm text-ink/70 file:mr-4 file:rounded-full file:border-0 file:bg-ink/5 file:px-4 file:py-2 file:text-sm file:font-semibold hover:file:bg-ink/10 cursor-pointer" />
                    </div>
                  </div>
                  <div className="shrink-0 pt-1">
                    <a href={atfLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-coreRed px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-coreRed/90">
                      <MdRocketLaunch /> Apply Now <FiExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center pt-4">
              {!selectedProjectId && (
                <p className="mb-3 text-sm text-ink/50">Please select a project above to cast your vote.</p>
              )}
              <button
                type="submit"
                disabled={isSubmitting || !selectedProjectId}
                className="inline-flex min-w-48 items-center justify-center rounded-full bg-ink px-8 py-4 text-base font-bold text-white transition-all hover:bg-ink/80 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Submitting...
                  </span>
                ) : (
                  "Cast Your Vote"
                )}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
