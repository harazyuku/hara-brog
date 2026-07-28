import { Link, router, usePage } from '@inertiajs/react';
import type React from 'react';
import { destroy, edit, icon, show } from '@/routes/posts';

interface PostCardProps {
    isNew?: boolean;
    post: {
        id: number;
        title: string;
        content: string;
        category: string;
        created_at: string;
        has_icon: boolean;
    };
}

function PostCard({ isNew = false, post }: PostCardProps) {
    const { auth } = usePage().props;

    const handleDelete = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (confirm('この記事を削除してもよろしいですか？')) {
            router.delete(destroy(post.id));
        }
    };

    const handleEdit = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        router.get(edit(post.id));
    };

    return (
        <article className="group grid gap-2 py-3 sm:grid-cols-[56px_minmax(0,1fr)]">
            <div className="hidden h-12 w-12 place-items-center border-3 border-double border-[#624747] bg-[#110e0e] text-xl text-[#b84b4b] sm:grid">
                {post.has_icon ? (
                    <img
                        src={icon(post.id).url}
                        alt=""
                        className="h-full w-full object-cover"
                    />
                ) : (
                    post.title.slice(0, 1)
                )}
            </div>
            <div className="min-w-0">
                <div className="mb-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] text-[#887e7e]">
                    <span className="border border-[#573f3f] bg-[#302222] px-1.5 py-0.5 text-[#e08a8a]">
                        {post.category}
                    </span>
                    <time>{post.created_at}</time>
                </div>
                <h3 className="mb-1 truncate text-sm font-bold">
                    <Link href={show(post.id)} className="retro-link">
                        {post.title}
                    </Link>
                    {isNew && <span className="retro-new">NEW!</span>}
                </h3>
                <p className="line-clamp-2 text-xs leading-5 text-[#aaa1a1]">
                    {post.content}
                </p>
                {auth.user?.is_admin && (
                    <div className="mt-2 flex gap-2">
                        <button
                            type="button"
                            onClick={handleEdit}
                            className="da-button"
                        >
                            Edit
                        </button>
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="da-button text-[#d8b6b6]"
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </article>
    );
}

export default PostCard;
