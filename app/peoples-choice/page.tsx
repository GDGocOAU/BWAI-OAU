import { getProjectsForVoting } from "@/lib/peoples-choice-data";
import PeoplesChoiceClient from "./PeoplesChoiceClient";
import { prisma } from "@/lib/prisma";
import { isVotingClosed } from "@/lib/config";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "People's Choice Award - Build With AI OAU",
  description: "Vote for your favorite project built during the Build With AI OAU event.",
};

export default async function PeoplesChoicePage(
  { searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }
) {
  const votingClosed = isVotingClosed();

  let projects: Awaited<ReturnType<typeof getProjectsForVoting>> = [];

  try {
    projects = await getProjectsForVoting();
  } catch (error) {
    console.error("Failed to fetch projects for voting:", error);
    // Continue with empty projects array — the client will show an empty state
  }

  const params = await searchParams;
  const token = typeof params.token === "string" ? params.token : null;

  let isTokenValid = false;
  let hasVoted = false;
  let email = "";

  if (!votingClosed && token) {
    try {
      const magicLink = await prisma.magicLinkToken.findUnique({
        where: { token },
      });

      if (magicLink && magicLink.expiresAt > new Date()) {
        isTokenValid = true;
        email = magicLink.email;

        const existingVote = await prisma.peoplesChoiceVote.findUnique({
          where: { email },
        });
        if (existingVote) {
          hasVoted = true;
        }
      }
    } catch (error) {
      console.error("Failed to validate magic link token:", error);
      // Token validation failed — treat as invalid token, user will see the email form
    }
  }

  return (
    <PeoplesChoiceClient
      projects={projects}
      token={isTokenValid ? token : null}
      email={email}
      initialHasVoted={hasVoted}
      votingClosed={votingClosed}
    />
  );
}
