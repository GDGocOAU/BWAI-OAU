import { getProjectsForVoting } from "@/lib/peoples-choice-data";
import PeoplesChoiceClient from "./PeoplesChoiceClient";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "People's Choice Award - Build With AI OAU",
  description: "Vote for your favorite project built during the Build With AI OAU event.",
};

export default async function PeoplesChoicePage(
  { searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }
) {
  const projects = await getProjectsForVoting();
  
  const params = await searchParams;
  const token = typeof params.token === "string" ? params.token : null;
  
  let isTokenValid = false;
  let hasVoted = false;
  let email = "";

  if (token) {
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
  }

  return (
    <PeoplesChoiceClient 
      projects={projects} 
      token={isTokenValid ? token : null} 
      email={email}
      initialHasVoted={hasVoted} 
    />
  );
}
