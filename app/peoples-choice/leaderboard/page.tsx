import { getProjectsForVoting } from "@/lib/peoples-choice-data";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { isVotingClosed } from "@/lib/config";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Leaderboard - People's Choice Award - Build With AI OAU",
  description: "Current standings for the People's Choice Award.",
};

export default async function LeaderboardPage() {
  const projects = await getProjectsForVoting();
  const votingClosed = isVotingClosed();

  // Sort projects by vote count (descending)
  const sortedProjects = [...projects].sort((a, b) => b.voteCount - a.voteCount);

  return (
    <div className="min-h-screen bg-surface pb-20">
      <section className="px-4 pb-10 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-3xl">
          <Link href="/peoples-choice" className="mb-6 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-4 py-2 text-sm font-bold text-ink transition-all hover:bg-ink/5 hover:border-ink/20">
            <FiArrowLeft size={16} />
            {votingClosed ? "Voting Closed" : "Back to Voting"}
          </Link>
          <div className="flex flex-col items-center text-center">
            <div className="flex h-24 w-24 items-center justify-center text-5xl">📊</div>
            <h1 className="mt-4 text-4xl font-bold leading-[1.1] text-ink sm:text-5xl">
              Live Leaderboard
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-ink/70">
              Current standings for the People&apos;s Choice Award.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-4xl">
          <div className="overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-ink">
                <thead className="border-b border-ink/10 bg-surface/50 text-xs font-bold uppercase tracking-wider text-ink/60">
                  <tr>
                    <th scope="col" className="px-6 py-4 w-24">Rank</th>
                    <th scope="col" className="px-6 py-4">Project</th>
                    <th scope="col" className="px-6 py-4">Community</th>
                    <th scope="col" className="px-6 py-4 text-right">Votes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink/10">
                  {sortedProjects.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-10 text-center text-ink/60">
                        No projects found.
                      </td>
                    </tr>
                  ) : (
                    sortedProjects.map((project, index) => (
                      <tr key={project.id} className="transition-colors hover:bg-surface/30">
                        <td className="whitespace-nowrap px-6 py-4 font-bold">
                          <div className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-sm
                            ${index === 0 ? "bg-amber-100 text-amber-700" : 
                              index === 1 ? "bg-slate-100 text-slate-700" : 
                              index === 2 ? "bg-orange-100 text-orange-700" : 
                              "bg-ink/5 text-ink/60"}
                          `}>
                            {index + 1}
                          </div>
                        </td>
                        <td className="px-6 py-4 font-bold text-ink">
                          {project.name}
                        </td>
                        <td className="px-6 py-4 font-semibold uppercase tracking-wider text-ink/60 text-xs">
                          {project.community}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-right font-bold">
                          <span className="inline-flex items-center rounded-full bg-ink/5 px-2.5 py-1 text-ink">
                            {project.voteCount}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
