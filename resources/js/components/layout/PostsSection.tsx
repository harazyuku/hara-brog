import PostCard from '../ui/PostCard';

interface PostsSectionProps {
    posts?: Array<{
        id: number;
        title: string;
        content: string;
        category: string;
        created_at: string;
    }>;
}

function PostsSection({ posts = [] }: PostsSectionProps) {
    return (
        <section className="retro-panel">
            <h2 className="retro-heading">NEWS ARCHIVE</h2>
            <div className="divide-y divide-[#413535] px-4">
                {posts.length > 0 ? (
                    posts.map((post) => <PostCard key={post.id} post={post} />)
                ) : (
                    <p className="py-12 text-center text-xs text-[#887e7e]">
                        NO DATA
                    </p>
                )}
            </div>
        </section>
    );
}

export default PostsSection;
