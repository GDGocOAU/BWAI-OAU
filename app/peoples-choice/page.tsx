import { getProjectsForVoting } from "@/lib/peoples-choice-data";
import PeoplesChoiceClient from "./PeoplesChoiceClient";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "People's Choice Award - Build With AI OAU",
  description: "Vote for your favorite project built during the Build With AI OAU event.",
};

export default async function PeoplesChoicePage() {
  const projects = await getProjectsForVoting();
  return <PeoplesChoiceClient projects={projects} />;
}
