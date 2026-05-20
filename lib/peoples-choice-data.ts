import "server-only";
import { prisma } from "@/lib/prisma";

export type SubmitPeoplesChoicePayload = {
  projectId: number;
  deviceId: string;
  linkedInProof: string;
  twitterProof: string;
  atfProof: string;
};

export async function hasDeviceVoted(deviceId: string): Promise<boolean> {
  const existingVote = await prisma.peoplesChoiceVote.findUnique({
    where: { deviceId },
  });
  return !!existingVote;
}

export async function submitPeoplesChoiceVote(data: SubmitPeoplesChoicePayload): Promise<void> {
  await prisma.peoplesChoiceVote.create({
    data: {
      projectId: data.projectId,
      deviceId: data.deviceId,
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
