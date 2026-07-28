import Navbar from '@/components/layout/Navbar';
import PostsSection from '@/components/layout/PostsSection';

interface Post {
    id: number;
    title: string;
    content: string;
    category: string;
    created_at: string;
    has_icon: boolean;
}

interface Props {
    Posts: Post[];
}

function Posts({ Posts }: Props) {
    return (
        <div className="retro-page">
            <Navbar />
            <main className="retro-container py-5">
                <div className="mb-4 border border-[#3e3232] bg-black px-3 py-2 text-[11px] text-[#918686]">
                    <span className="text-[#e26666]">IKEHARA PRESS</span> / NEWS
                    ARCHIVE
                </div>
                <PostsSection posts={Posts} />
            </main>
        </div>
    );
}

export default Posts;
