import CommunityGalleryPage from "@/components/pre-series/CommunityGalleryPage";
import { PRESERIES_SLUG_MAP, PRESERIES_EVENTS } from "@/lib/config";

type Props = {
    params: { community: string };
};

export default function PreSeriesGalleryPage({ params }: Props) {
    // Fall back gracefully for unknown slugs — never show a raw 404
    const communityName =
        PRESERIES_SLUG_MAP[params.community] ?? params.community;

    const event = PRESERIES_EVENTS.find(
        (e) => e.communitySlug === params.community,
    );
    const googlePhotosHref = event?.googlePhotosHref ?? "#";

    return (
        <CommunityGalleryPage
            communityName={communityName}
            communitySlug={params.community}
            googlePhotosHref={googlePhotosHref}
        />
    );
}

export function generateStaticParams() {
    return Object.keys(PRESERIES_SLUG_MAP).map((slug) => ({ community: slug }));
}
