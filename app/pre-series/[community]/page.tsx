import { notFound } from "next/navigation";
import PreSeriesEventPage from "@/components/pre-series/PreSeriesEventPage";
import {
    PRESERIES_EVENTS,
    PRESERIES_EVENT_DETAILS,
    PRESERIES_PHOTO_SLOTS,
} from "@/lib/config";

type Props = {
    params: Promise<{ community: string }>;
};

export default async function PreSeriesEventDetailPage({ params }: Props) {
    const { community } = await params;

    const event = PRESERIES_EVENTS.find((e) => e.communitySlug === community);
    const detail = PRESERIES_EVENT_DETAILS[community];

    if (!event || !detail) {
        notFound();
    }

    const photoUrls = PRESERIES_PHOTO_SLOTS[community] ?? [];

    return (
        <PreSeriesEventPage event={event} detail={detail} photoUrls={photoUrls} />
    );
}

export function generateStaticParams() {
    return PRESERIES_EVENTS.map((event) => ({
        community: event.communitySlug,
    }));
}
