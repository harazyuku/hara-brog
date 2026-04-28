import React from 'react'
import PostsSection from '@/components/layout/PostsSection';
import Navbar from '@/components/layout/Navbar'; // ナビバーもついでに入れましょう！

interface Post {
    id: number;
    title: string;
    content: string;
    category: string;
    created_at: string;
}

// Controllerから送られてくるデータの型を定義
interface Props {
    Posts: Post[];
}

// 関数のカッコの中で { latestPosts } を受け取る！
function Posts({ Posts }: Props) {
  return (
    <div>
        <Navbar />
        <div className="py-12">
            <h1 className="text-center text-3xl font-bold mb-8">記事一覧</h1>
            <PostsSection posts={Posts} />
        </div>
    </div>
  )
}

export default Posts
