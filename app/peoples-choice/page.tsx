import { getProjectsForVoting, hasDeviceVoted } from "@/lib/peoples-choice-data";
import PeoplesChoiceClient from "./PeoplesChoiceClient";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "People's Choice Award - Build With AI OAU",
  description: "Vote for your favorite project built during the Build With AI OAU event.",
};

export default async function PeoplesChoicePage() {
  const projects = await getProjectsForVoting();
  
  const cookieStore = await cookies();
  const deviceId = cookieStore.get("bwai_peoples_choice_device_id")?.value;
  
  let hasVoted = false;
  if (deviceId) {
    hasVoted = await hasDeviceVoted(deviceId);
  }

  return <PeoplesChoiceClient projects={projects} initialHasVoted={hasVoted} />;
}
