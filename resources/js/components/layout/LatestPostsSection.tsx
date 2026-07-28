import PostCard from '../ui/PostCard';

interface LatestPostsSectionProps {
    posts: Array<{
        id: number;
        title: string;
        content: string;
        category: string;
        created_at: string;
    }>;
}

function LatestPostsSection({ posts }: LatestPostsSectionProps) {
    return (
        <section className="retro-panel">
            <div className="retro-heading flex items-center justify-between">
                <h2>LATEST NEWS</h2>
                <span className="font-normal text-[#9e9292] normal-case">
                    latest 6 entries
                </span>
            </div>
            <div className="divide-y divide-[#413535] px-4">
                {posts.length > 0 ? (
                    posts
                        .slice(0, 6)
                        .map((post, index) => (
                            <PostCard
                                key={post.id}
                                post={post}
                                isNew={index === 0}
                            />
                        ))
                ) : (
                    <p className="py-8 text-center text-xs text-[#887e7e]">
                        No entries have been published.
                    </p>
                )}
            </div>
        </section>
    );
}

export default LatestPostsSection;
