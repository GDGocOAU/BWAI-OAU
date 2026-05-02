import CommunityGalleryPage from "@/components/pre-series/CommunityGalleryPage";
import {
    PRESERIES_SLUG_MAP,
    PRESERIES_EVENTS,
    PRESERIES_PHOTO_SLOTS,
} from "@/lib/config";

type Props = {
    params: { community: string };
};

export default async function PreSeriesGalleryPage({ params }: Props) {
    // Fall back gracefully for unknown slugs — never show a raw 404
    const {community} = await params;
    const communityName =
        PRESERIES_SLUG_MAP[community] ?? community;

    const event = PRESERIES_EVENTS.find(
        (e) => e.communitySlug === community,
    );
    const googlePhotosHref = event?.googlePhotosHref ?? "#";
    const photoUrls = PRESERIES_PHOTO_SLOTS[community] ?? Array.from({ length: 15 }, () => "#");

    return (
        <CommunityGalleryPage
            communityName={communityName}
            communitySlug={community}
            googlePhotosHref={googlePhotosHref}
            photoUrls={photoUrls}
        />
    );
}

export function generateStaticParams() {
    return Object.keys(PRESERIES_SLUG_MAP).map((slug) => ({ community: slug }));
}
