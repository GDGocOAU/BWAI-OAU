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
  try {
    const existingVote = await prisma.peoplesChoiceVote.findUnique({
      where: { email },
    });
    return !!existingVote;
  } catch (error) {
    console.error("Error checking if email has voted:", error);
    return false;
  }
}

export async function submitPeoplesChoiceVote(data: SubmitPeoplesChoicePayload): Promise<void> {
  try {
    await prisma.peoplesChoiceVote.create({
      data: {
        projectId: data.projectId,
        email: data.email,
        linkedInProof: data.linkedInProof,
        twitterProof: data.twitterProof,
        atfProof: data.atfProof,
      },
    });
  } catch (error) {
    console.error("Error submitting vote:", error);
    throw new Error("Failed to submit your vote. Please try again.");
  }
}

export async function getProjectsForVoting() {
  try {
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
  } catch (error) {
    console.error("Error fetching projects for voting:", error);
    return [];
  }
}

export async function getVotingResultsAdmin() {
  try {
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
  } catch (error) {
    console.error("Error fetching admin voting results:", error);
    return [];
  }
}

export async function deletePeoplesChoiceVote(voteId: number): Promise<void> {
  try {
    await prisma.peoplesChoiceVote.delete({
      where: { id: voteId },
    });
  } catch (error) {
    console.error("Error deleting vote:", error);
    throw new Error("Failed to delete the vote. Please try again.");
  }
}
