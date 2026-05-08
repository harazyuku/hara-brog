import { Link, router } from '@inertiajs/react';
import React from 'react';
import { Trash2, Edit } from 'lucide-react';

interface PostCardProps {
    post: {
        id: number;
        title: string;
        content: string;
        category: string;
        created_at: string;
    }
}

function PostCard({ post }: PostCardProps) {
    const handleDelete = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (confirm('この記事を削除してもよろしいですか？')) {
            router.delete(`/posts/${post.id}`);
        }
    };

    const handleEdit = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        router.get(`/posts/${post.id}/edit`);
    };

    return (
        <div className="group relative bg-white border border-gray-100 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
            {/* 全面リンク */}
            <Link 
                href={`/posts/${post.id}`} 
                className="absolute inset-0 z-0 rounded-xl"
            >
                <span className="sr-only">詳細を見る</span>
            </Link>

            <div className="flex justify-between items-start mb-2">
                {/* カテゴリー */}
                <span className="relative z-10 inline-block bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded-full pointer-events-none">
                    {post.category}
                </span>

                {/* アクションアイコン（右上に集約・ホバーで表示） */}
                <div className="relative z-20 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={handleEdit}
                        className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all"
                        title="編集"
                    >
                        <Edit size={14} />
                    </button>
                    <button
                        onClick={handleDelete}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
                        title="削除"
                    >
                        <Trash2 size={14} />
                    </button>
                </div>
            </div>

            {/* タイトルと日付 */}
            <div className="relative z-10 pointer-events-none">
                <h3 className="font-bold text-gray-900 text-sm leading-snug group-hover:text-blue-600 transition-colors line-clamp-1">
                    {post.title}
                </h3>
                <p className="text-gray-400 text-[9px] mt-1">
                    {post.created_at}
                </p>
            </div>
        </div>
    );
}

export default PostCard;
