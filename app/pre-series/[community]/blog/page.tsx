import CommunityBlogPage from "@/components/pre-series/CommunityBlogPage";
import { PRESERIES_SLUG_MAP } from "@/lib/config";

type Props = {
    params: { community: string };
};

export default function PreSeriesBlogPage({ params }: Props) {
    // Fall back gracefully for unknown slugs — never show a raw 404
    const communityName =
        PRESERIES_SLUG_MAP[params.community] ?? params.community;

    return (
        <CommunityBlogPage
            communityName={communityName}
            communitySlug={params.community}
        />
    );
}

export function generateStaticParams() {
    return Object.keys(PRESERIES_SLUG_MAP).map((slug) => ({ community: slug }));
}
