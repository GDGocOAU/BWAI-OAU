"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SOCIAL_LINKS } from "@/lib/config";
import { Toaster, toast } from "react-hot-toast";
import Lottie from "lottie-react";
import { FiExternalLink } from "react-icons/fi";

type ProjectSummary = {
  id: number;
  name: string;
  description: string;
  community: string;
};

type Props = {
  projects: ProjectSummary[];
};

export default function PeoplesChoiceClient({ projects }: Props) {
  const DEVICE_ID_STORAGE_KEY = "bwai-device-id";
  const [deviceId, setDeviceId] = useState<string>("");

  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [linkedInProof, setLinkedInProof] = useState<File | null>(null);
  const [twitterProof, setTwitterProof] = useState<File | null>(null);
  const [atfProof, setAtfProof] = useState<File | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

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
    const existingDeviceId = window.localStorage.getItem(DEVICE_ID_STORAGE_KEY);
    const generatedDeviceId =
      existingDeviceId ||
      (typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`);

    if (!existingDeviceId) {
      window.localStorage.setItem(DEVICE_ID_STORAGE_KEY, generatedDeviceId);
    }
    setDeviceId(generatedDeviceId);
  }, []);

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

    if (!selectedProjectId) return toast.error("Please select a project to vote for.");
    if (!linkedInProof) return toast.error("Please upload proof of following on LinkedIn.");
    if (!twitterProof) return toast.error("Please upload proof of following on Twitter/X.");
    if (!atfProof) return toast.error("Please upload proof of joining the ATF AI Challenge.");

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("projectId", selectedProjectId.toString());
    formData.append("deviceId", deviceId);
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

      setSuccess(true);
      toast.success("Vote submitted successfully!");
    } catch (err: any) {
      toast.error(err.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const linkedInLink = SOCIAL_LINKS.find((l) => l.label === "LinkedIn")?.href || "#";
  const twitterLink = SOCIAL_LINKS.find((l) => l.label === "Twitter/X")?.href || "#";
  const atfLink = "https://www.atfchallenge.org/apply?channel=WDVBKMUJ";

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface px-4 py-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mx-auto max-w-xl rounded-3xl border border-ink/10 bg-white p-10 text-center shadow-xl"
        >
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-coreGreen/20">
            <svg className="h-10 w-10 text-coreGreen" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-ink">Thank You for Voting!</h2>
          <p className="mt-4 text-lg text-ink/70">
            Your vote for the People's Choice Award has been successfully recorded. We appreciate your support for the community.
          </p>
          <a href="/what-was-built" className="mt-8 inline-flex items-center justify-center rounded-full bg-ink px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-ink/80">
            Back to Projects
          </a>
        </motion.div>
      </div>
    );
  }

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
            <h1 className="mt-4 text-5xl font-bold leading-[1.1] text-ink sm:text-6xl">
              People's Choice Award
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-[1.1rem] leading-relaxed text-ink/70">
              Vote for the project that wowed you the most! Support your favorite builders by engaging with our community channels and the ATF AI Challenge to cast your vote.
            </p>
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
                {projects.map((project) => (
                  <label
                    key={project.id}
                    className={`relative flex cursor-pointer flex-col rounded-2xl border p-5 transition-all ${
                      selectedProjectId === project.id
                        ? "border-ink bg-ink/5 ring-1 ring-ink"
                        : "border-ink/10 bg-white hover:border-ink/30"
                    }`}
                  >
                    <input
                      type="radio"
                      name="project"
                      className="sr-only"
                      value={project.id}
                      checked={selectedProjectId === project.id}
                      onChange={() => setSelectedProjectId(project.id)}
                    />
                    <span className="text-sm font-bold text-ink">{project.name}</span>
                    <span className="mt-1 text-xs font-semibold text-ink/60 uppercase tracking-wider">{project.community}</span>
                    <span className="mt-2 line-clamp-2 text-sm text-ink/70">{project.description}</span>
                    {selectedProjectId === project.id && (
                      <span className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-ink text-white">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* Step 2: Proof Uploads */}
            <div className="rounded-3xl border border-ink/10 bg-white p-6 sm:p-8 space-y-8">
              <h3 className="text-2xl font-bold text-ink">2. Verify Your Support</h3>
              
              <div className="space-y-6 mt-2 flex flex-col gap-4">
                <div className="rounded-2xl border border-ink/10 bg-surface/50 p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-bold text-ink">Follow on LinkedIn</h4>
                      <p className="text-sm text-ink/70">Upload a screenshot showing you follow GDG OAU.</p>
                    </div>
                    <a href={linkedInLink} target="_blank" rel="noopener noreferrer" className="mt-3 sm:mt-0 inline-flex items-center justify-center gap-2 rounded-full bg-[#0077b5] px-4 py-2 text-sm font-bold text-white hover:bg-[#0077b5]/90">
                      Go to LinkedIn
                      <FiExternalLink size={16} />
                    </a>
                  </div>
                  <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setLinkedInProof)} className="block w-full text-sm text-ink/70 file:mr-4 file:rounded-full file:border-0 file:bg-ink/5 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-ink hover:file:bg-ink/10 cursor-pointer" />
                </div>

                <div className="rounded-2xl border border-ink/10 bg-surface/50 p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-bold text-ink">Follow on Twitter/X</h4>
                      <p className="text-sm text-ink/70">Upload a screenshot showing you follow GDG OAU.</p>
                    </div>
                    <a href={twitterLink} target="_blank" rel="noopener noreferrer" className="mt-3 sm:mt-0 inline-flex items-center justify-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-bold text-white hover:bg-black/80">
                      Go to Twitter
                      <FiExternalLink size={16} />
                    </a>
                  </div>
                  <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setTwitterProof)} className="block w-full text-sm text-ink/70 file:mr-4 file:rounded-full file:border-0 file:bg-ink/5 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-ink hover:file:bg-ink/10 cursor-pointer" />
                </div>

                <div className="rounded-2xl border border-ink/10 bg-surface/50 p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-4">
                    <div>
                      <h4 className="text-lg font-bold text-ink">Join ATF AI Challenge</h4>
                      <p className="text-sm text-ink/70 mt-1">Join the African Technology Forum AI Challenge. You stand a chance to win amazing prizes, gain mentorship, and scale your AI ideas across the continent!</p>
                    </div>
                    <a href={atfLink} target="_blank" rel="noopener noreferrer" className="shrink-0 inline-flex items-center justify-center gap-2 rounded-full bg-coreRed px-4 py-2 text-sm font-bold text-white hover:bg-coreRed/90">
                      Join Challenge
                      <FiExternalLink size={16} />
                    </a>
                  </div>
                  <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setAtfProof)} className="block w-full text-sm text-ink/70 file:mr-4 file:rounded-full file:border-0 file:bg-ink/5 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-ink hover:file:bg-ink/10 cursor-pointer" />
                </div>
              </div>
            </div>

            <div className="text-center pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
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
