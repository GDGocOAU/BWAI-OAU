import { notFound } from "next/navigation";
import BreakoutSessionPage from "@/components/main-event/BreakoutSessionPage";
import { BREAKOUT_SESSIONS } from "@/lib/config";

type Props = {
    params: Promise<{ track: string }>;
};

export default async function BreakoutSessionDetailPage({ params }: Props) {
    const { track } = await params;

    const session = BREAKOUT_SESSIONS.find((s) => s.slug === track);

    if (!session) {
        notFound();
    }

    return <BreakoutSessionPage session={session} />;
}

export function generateStaticParams() {
    return BREAKOUT_SESSIONS.map((session) => ({
        track: session.slug,
    }));
}
