"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { SOCIAL_LINKS } from "@/lib/config";
import { FiExternalLink } from "react-icons/fi";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

type ProjectSummary = {
  id: number;
  name: string;
  description: string;
  community: string;
};

type Props = {
  projects: ProjectSummary[];
  initialHasVoted: boolean;
  token: string | null;
  email: string;
};

export default function PeoplesChoiceClient({ projects, initialHasVoted, token, email }: Props) {
  const [emailInput, setEmailInput] = useState("");
  const [isRequestingLink, setIsRequestingLink] = useState(false);
  const [linkSent, setLinkSent] = useState(false);

  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [linkedInProof, setLinkedInProof] = useState<File | null>(null);
  const [twitterProof, setTwitterProof] = useState<File | null>(null);
  const [atfProof, setAtfProof] = useState<File | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(initialHasVoted);

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

  useEffect(() => {
    const localHasVoted = window.localStorage.getItem("bwai-has-voted");
    if (localHasVoted === "true") {
      setSuccess(true);
    }
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<File | null>>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Only image files are allowed.");
        e.target.value = "";
        setter(null);
      } else if (file.size > 2 * 1024 * 1024) {
        toast.error("File size must be less than 2MB");
        e.target.value = "";
        setter(null);
      } else {
        setter(file);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) return toast.error("Invalid session. Please request a new magic link.");
    if (!selectedProjectId) return toast.error("Please select a project to vote for.");
    if (!linkedInProof) return toast.error("Please upload proof of following on LinkedIn.");
    if (!twitterProof) return toast.error("Please upload proof of following on Twitter/X.");
    if (!atfProof) return toast.error("Please upload proof of joining the ATF AI Challenge.");

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("projectId", selectedProjectId.toString());
    formData.append("token", token);
    formData.append("linkedInProof", linkedInProof);
    formData.append("twitterProof", twitterProof);
    formData.append("atfProof", atfProof);

    try {
      const res = await fetch("/api/peoples-choice", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit vote");
      }

      if (res.ok) {
        toast.success("Vote submitted successfully!");
        setSuccess(true);
        window.localStorage.setItem("bwai-has-voted", "true");
        // Remove the token from URL to clean it up
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    } catch (err: any) {
      toast.error(err.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const linkedInLink = SOCIAL_LINKS.find((l) => l.label === "LinkedIn")?.href || "#";
  const twitterLink = SOCIAL_LINKS.find((l) => l.label === "Twitter/X")?.href || "#";
  const atfLink = "https://example.com/join-atf"; // Placeholder if not in SOCIAL_LINKS

  // 1. SUCCESS / ALREADY VOTED STATE
  if (success) {
    return (
      <main className="min-h-screen bg-surface px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-lg text-center">
          <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-coreGreen/10">
            {awardAnimation ? (
              <Lottie animationData={awardAnimation} loop={true} className="h-24 w-24" />
            ) : (
              <span className="text-6xl">🏆</span>
            )}
          </div>
          <h1 className="mt-6 text-3xl font-bold text-ink">Thank you for voting!</h1>
          <p className="mt-4 text-base text-ink/70">
            Your vote has been recorded. Stay tuned for the final announcement of the People's Choice Award!
          </p>
        </div>
      </main>
    );
  }

  // 2. REQUEST MAGIC LINK STATE (No valid token)
  if (!token) {
    return (
      <main className="min-h-screen bg-surface px-4 py-16 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-[0_24px_80px_rgba(30,30,30,0.1)] sm:p-8">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-coreBlue/10">
            {awardAnimation ? (
              <Lottie animationData={awardAnimation} loop={true} className="h-12 w-12" />
            ) : (
              <span className="text-3xl">🏆</span>
            )}
          </div>
          
          <h1 className="text-center text-2xl font-bold text-ink">Vote with Magic Link</h1>
          <p className="mt-2 text-center text-sm text-ink/65 mb-8">
            To prevent spam, please authenticate with your email. We will send you a secure, single-use voting link.
          </p>

          {linkSent ? (
            <div className="rounded-xl bg-coreGreen/10 p-5 text-center">
              <p className="text-sm font-semibold text-coreGreen">Magic link sent successfully!</p>
              <p className="mt-1 text-xs text-ink/70">Check your inbox. You can close this window and use the link in the email.</p>
            </div>
          ) : (
            <form onSubmit={handleRequestLink} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-ink">Email Address</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="mt-2 w-full rounded-xl bg-surface px-4 py-3 text-sm text-ink outline-none ring-2 ring-transparent transition-shadow focus:ring-coreBlue/30"
                  placeholder="hello@example.com"
                />
              </div>
              <button
                type="submit"
                disabled={isRequestingLink}
                className="w-full rounded-full bg-ink px-5 py-3 text-sm font-bold text-white transition-colors duration-200 hover:bg-coreBlue disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isRequestingLink ? "Sending link..." : "Send Magic Link"}
              </button>
            </form>
          )}
        </div>
      </main>
    );
  }

  // 3. VOTING FORM STATE (Valid Token)
  return (
    <main className="min-h-screen bg-surface px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-3xl">
        <div className="mb-10 text-center">
          <p className="font-openSans text-xs font-bold uppercase tracking-[0.14em] text-coreBlue">People's Choice</p>
          <h1 className="mt-3 text-4xl font-bold text-ink sm:text-5xl">Vote for the Best</h1>
          <p className="mt-4 text-base text-ink/70">Authenticated as: <strong>{email}</strong></p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <section className="rounded-3xl bg-white p-6 shadow-[0_12px_40px_rgba(30,30,30,0.06)] sm:p-8">
            <h2 className="mb-4 text-xl font-bold text-ink">1. Select a Project</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {projects.map((project) => (
                <label
                  key={project.id}
                  className={`relative flex cursor-pointer flex-col rounded-2xl border-2 p-5 transition-all ${
                    selectedProjectId === project.id
                      ? "border-coreBlue bg-coreBlue/5"
                      : "border-ink/5 bg-surface hover:border-ink/15"
                  }`}
                >
                  <input
                    type="radio"
                    name="project"
                    value={project.id}
                    checked={selectedProjectId === project.id}
                    onChange={() => setSelectedProjectId(project.id)}
                    className="sr-only"
                  />
                  <span className="mb-1 text-xs font-bold uppercase tracking-wider text-ink/50">
                    {project.community}
                  </span>
                  <span className="mb-2 text-lg font-bold text-ink">{project.name}</span>
                  <span className="text-sm text-ink/70 line-clamp-2">{project.description}</span>
                  
                  {selectedProjectId === project.id && (
                    <div className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-coreBlue text-white">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </label>
              ))}
            </div>
          </section>

          <section className="rounded-3xl bg-white p-6 shadow-[0_12px_40px_rgba(30,30,30,0.06)] sm:p-8">
            <h2 className="mb-4 text-xl font-bold text-ink">2. Upload Proofs (Max 2MB each)</h2>
            <div className="space-y-6">
              
              {/* LinkedIn Proof */}
              <div>
                <label className="mb-2 block text-sm font-bold text-ink">
                  Proof of following on LinkedIn
                </label>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <a href={linkedInLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full bg-[#0077b5] px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-[#005582] w-fit">
                    Go to LinkedIn <FiExternalLink />
                  </a>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, setLinkedInProof)}
                    className="block w-full text-sm text-ink/70 file:mr-4 file:rounded-full file:border-0 file:bg-coreBlue/10 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-coreBlue hover:file:bg-coreBlue/20"
                  />
                </div>
              </div>

              {/* Twitter Proof */}
              <div>
                <label className="mb-2 block text-sm font-bold text-ink">
                  Proof of following on Twitter/X
                </label>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <a href={twitterLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full bg-black px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-black/80 w-fit">
                    Go to Twitter <FiExternalLink />
                  </a>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, setTwitterProof)}
                    className="block w-full text-sm text-ink/70 file:mr-4 file:rounded-full file:border-0 file:bg-black/10 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-black hover:file:bg-black/20"
                  />
                </div>
              </div>

              {/* ATF Proof */}
              <div>
                <label className="mb-2 block text-sm font-bold text-ink">
                  Proof of joining ATF AI Challenge
                </label>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <a href={atfLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full bg-coreRed px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-coreRed/80 w-fit">
                    Join Challenge <FiExternalLink />
                  </a>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, setAtfProof)}
                    className="block w-full text-sm text-ink/70 file:mr-4 file:rounded-full file:border-0 file:bg-coreRed/10 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-coreRed hover:file:bg-coreRed/20"
                  />
                </div>
              </div>

            </div>
          </section>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-ink px-6 py-4 text-base font-bold text-white transition-colors duration-200 hover:bg-coreBlue disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Submitting Vote..." : "Submit Vote"}
          </button>
        </form>
      </div>
    </main>
  );
}
