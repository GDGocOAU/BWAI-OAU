import "server-only";
import { prisma } from "@/lib/prisma";

export type SubmitPeoplesChoicePayload = {
  projectId: number;
  email: string;
  linkedInProof: string;
  twitterProof: string;
  atfProof: string;
};

export async function hasEmailVoted(email: string): Promise<boolean> {
  const existingVote = await prisma.peoplesChoiceVote.findUnique({
    where: { email },
  });
  return !!existingVote;
}

export async function submitPeoplesChoiceVote(data: SubmitPeoplesChoicePayload): Promise<void> {
  await prisma.peoplesChoiceVote.create({
    data: {
      projectId: data.projectId,
      email: data.email,
      linkedInProof: data.linkedInProof,
      twitterProof: data.twitterProof,
      atfProof: data.atfProof,
    },
  });
}

export async function getProjectsForVoting() {
  const projects = await prisma.whatWasBuiltProject.findMany({
    orderBy: [{ displayOrder: "asc" }, { id: "asc" }],
    select: {
      id: true,
      name: true,
      description: true,
      community: true,
    },
  });
  return projects;
}

export async function getVotingResultsAdmin() {
  const projects = await prisma.whatWasBuiltProject.findMany({
    orderBy: [{ displayOrder: "asc" }, { id: "asc" }],
    include: {
      peoplesChoiceVotes: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  return projects.map((p) => ({
    id: p.id,
    name: p.name,
    community: p.community,
    totalVotes: p.peoplesChoiceVotes.length,
    votes: p.peoplesChoiceVotes.map((v) => ({
      id: v.id,
      email: v.email,
      linkedInProof: v.linkedInProof,
      twitterProof: v.twitterProof,
      atfProof: v.atfProof,
      createdAt: v.createdAt.toISOString(),
    })),
  }));
}

export async function deletePeoplesChoiceVote(voteId: number): Promise<void> {
  await prisma.peoplesChoiceVote.delete({
    where: { id: voteId },
  });
}
