"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CONFIG_AUTH_HEADER } from "@/lib/config-auth";
import { apiClient } from "@/lib/axios";
import { CODE_STORAGE_KEY } from "../page";
import { FiExternalLink, FiTrash2 } from "react-icons/fi";

type Vote = {
  id: number;
  deviceId: string;
  linkedInProof: string;
  twitterProof: string;
  atfProof: string;
  createdAt: string;
};

type ProjectResult = {
  id: number;
  name: string;
  community: string;
  totalVotes: number;
  votes: Vote[];
};

type AuthState = "checking" | "locked" | "unlocked";

export default function PeoplesChoiceAdminPage() {
  const [authState, setAuthState] = useState<AuthState>("checking");
  const [accessCode, setAccessCode] = useState("");
  const [authError, setAuthError] = useState("");

  const [projects, setProjects] = useState<ProjectResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedProjectId, setExpandedProjectId] = useState<number | null>(null);
  const [deletingVoteId, setDeletingVoteId] = useState<number | null>(null);

  const authHeaders = useMemo(
    () => ({
      [CONFIG_AUTH_HEADER]: accessCode,
    }),
    [accessCode],
  );

  const fetchConfig = useCallback(async () => {
    if (!accessCode) return;
    try {
      const { data } = await apiClient.get<ProjectResult[]>("/config/peoples-choice", {
        headers: authHeaders,
      });
      // Sort projects by total votes descending
      const sorted = data.sort((a, b) => b.totalVotes - a.totalVotes);
      setProjects(sorted);
      setError("");
    } catch {
      setError("Could not load voting results.");
    }
  }, [accessCode, authHeaders]);

  useEffect(() => {
    const savedCode = sessionStorage.getItem(CODE_STORAGE_KEY);
    if (!savedCode) {
      setAuthState("locked");
      setLoading(false);
      return;
    }
    setAccessCode(savedCode);
    setAuthState("unlocked");
  }, []);

  useEffect(() => {
    if (authState !== "unlocked" || !accessCode) return;

    let mounted = true;

    const load = async () => {
      await fetchConfig();
      if (mounted) setLoading(false);
    };

    load();

    const interval = setInterval(async () => {
      try {
        await fetchConfig();
      } catch {
        // silently fail on polling
      }
    }, 10000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [accessCode, authState, fetchConfig]);

  async function unlock() {
    setAuthError("");
    const normalized = accessCode.trim();

    if (!normalized) {
      setAuthError("Enter your access code.");
      return;
    }

    try {
      await apiClient.post("/admin/auth", { code: normalized });
    } catch {
      setAuthError("Invalid code. Try again.");
      return;
    }

    sessionStorage.setItem(CODE_STORAGE_KEY, normalized);
    setAccessCode(normalized);
    setAuthState("unlocked");
  }

  async function deleteVote(voteId: number, projectId: number) {
    if (!window.confirm("Are you sure you want to delete this vote? This action cannot be undone.")) return;
    setDeletingVoteId(voteId);
    try {
      await apiClient.delete(`/config/peoples-choice/${voteId}`, { headers: authHeaders });
      
      // Optimitically update UI
      setProjects(prev => prev.map(p => {
        if (p.id === projectId) {
          const newVotes = p.votes.filter(v => v.id !== voteId);
          return { ...p, votes: newVotes, totalVotes: newVotes.length };
        }
        return p;
      }).sort((a, b) => b.totalVotes - a.totalVotes));

    } catch {
      alert("Failed to delete vote.");
    } finally {
      setDeletingVoteId(null);
    }
  }

  if (authState === "checking") {
    return <main className="min-h-screen bg-surface" />;
  }

  return (
    <main className="min-h-screen bg-surface px-4 py-10 sm:px-6 lg:px-8">
      {authState === "locked" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/45 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-[0_24px_80px_rgba(30,30,30,0.2)] sm:p-8">
            <p className="font-openSans text-xs font-bold uppercase tracking-[0.14em] text-ink/55">Protected Route</p>
            <h1 className="mt-2 text-2xl font-bold text-ink">Enter Access Code</h1>
            <p className="mt-2 text-sm text-ink/65">This dashboard is restricted. Enter your custom code to continue.</p>

            <input
              value={accessCode}
              onChange={(event) => setAccessCode(event.target.value)}
              onKeyDown={(event) => { if (event.key === "Enter") unlock(); }}
              className="mt-5 w-full rounded-xl bg-surface px-4 py-3 text-sm text-ink outline-none ring-2 ring-transparent transition-shadow focus:ring-coreBlue/30"
              placeholder="Enter config access code"
              type="password"
            />

            {authError && <p className="mt-3 text-sm text-coreRed">{authError}</p>}

            <button type="button" onClick={unlock} className="mt-5 w-full rounded-full bg-ink px-5 py-3 text-sm font-bold text-white transition-colors duration-200 hover:bg-coreBlue">
              Unlock Dashboard
            </button>
          </div>
        </div>
      )}

      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-openSans text-xs font-bold uppercase tracking-[0.12em] text-ink/55">Admin Dashboard</p>
            <h1 className="mt-2 text-3xl font-bold text-ink">People's Choice Results</h1>
          </div>
          <Link href="/config" className="text-sm font-semibold text-coreBlue">
            Back to config routes
          </Link>
        </div>

        <section className="rounded-3xl bg-white p-6 shadow-[0_12px_40px_rgba(30,30,30,0.06)] sm:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-bold text-ink">Leaderboard & Audits</h2>
            <button type="button" onClick={fetchConfig} className="cursor-pointer rounded-full bg-ink/5 px-4 py-2 text-sm font-bold text-ink transition-colors hover:bg-ink/10">
              Refresh Data
            </button>
          </div>

          {error && <p className="mb-4 text-sm text-coreRed">{error}</p>}

          {loading ? (
            <div className="space-y-4">
               <div className="h-16 w-full animate-pulse rounded-xl bg-surface" />
               <div className="h-16 w-full animate-pulse rounded-xl bg-surface" />
               <div className="h-16 w-full animate-pulse rounded-xl bg-surface" />
            </div>
          ) : (
            <div className="space-y-4 flex flex-col gap-4">
              {projects.length === 0 ? (
                <p className="text-sm text-ink/60">No projects found.</p>
              ) : (
                projects.map((project, idx) => (
                  <div key={project.id} className="rounded-2xl border border-ink/10 bg-white overflow-hidden transition-all hover:border-ink/20">
                    <div 
                      className="flex cursor-pointer items-center justify-between p-4 sm:p-5"
                      onClick={() => setExpandedProjectId(expandedProjectId === project.id ? null : project.id)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface text-lg font-bold text-ink">
                          {idx + 1}
                        </div>
                        <div>
                          <p className="text-base font-bold text-ink">{project.name}</p>
                          <p className="text-xs font-semibold uppercase tracking-wider text-ink/50">{project.community}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-2xl font-bold text-ink">{project.totalVotes}</p>
                          <p className="text-xs text-ink/50">votes</p>
                        </div>
                        <svg className={`h-5 w-5 text-ink/40 transition-transform ${expandedProjectId === project.id ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>

                    {expandedProjectId === project.id && (
                      <div className="border-t border-ink/5 bg-surface/30 p-4 sm:p-6">
                        <h4 className="mb-4 text-sm font-bold text-ink">Vote Audit Logs</h4>
                        {project.votes.length === 0 ? (
                          <p className="text-sm text-ink/50">No votes cast for this project yet.</p>
                        ) : (
                          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {project.votes.map((vote) => (
                              <div key={vote.id} className="rounded-xl border border-ink/10 bg-white p-4">
                                <div className="mb-3 flex items-start justify-between">
                                  <div>
                                    <p className="text-xs text-ink/40">Voter Device ID</p>
                                    <p className="truncate text-xs font-mono text-ink/70" title={vote.deviceId}>{vote.deviceId.substring(0, 16)}...</p>
                                    <p className="mt-1 text-[10px] text-ink/40">{new Date(vote.createdAt).toLocaleString()}</p>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => deleteVote(vote.id, project.id)}
                                    disabled={deletingVoteId === vote.id}
                                    title="Invalidate/Delete Vote"
                                    className="p-1.5 text-ink/30 hover:text-coreRed transition-colors disabled:opacity-50"
                                  >
                                    <FiTrash2 size={16} />
                                  </button>
                                </div>
                                <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
                                  <div>
                                    <p className="mb-1 truncate text-[9px] font-bold uppercase tracking-wider text-[#0077b5]">LinkedIn</p>
                                    <a href={vote.linkedInProof} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-lg border border-ink/10 bg-surface transition-colors hover:border-[#0077b5]/50">
                                      <img src={vote.linkedInProof} alt="LinkedIn" className="h-20 w-full object-cover" loading="lazy" />
                                    </a>
                                  </div>
                                  <div>
                                    <p className="mb-1 truncate text-[9px] font-bold uppercase tracking-wider text-black">Twitter/X</p>
                                    <a href={vote.twitterProof} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-lg border border-ink/10 bg-surface transition-colors hover:border-black/50">
                                      <img src={vote.twitterProof} alt="Twitter" className="h-20 w-full object-cover" loading="lazy" />
                                    </a>
                                  </div>
                                  <div>
                                    <p className="mb-1 truncate text-[9px] font-bold uppercase tracking-wider text-coreRed">ATF</p>
                                    <a href={vote.atfProof} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-lg border border-ink/10 bg-surface transition-colors hover:border-coreRed/50">
                                      <img src={vote.atfProof} alt="ATF" className="h-20 w-full object-cover" loading="lazy" />
                                    </a>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
