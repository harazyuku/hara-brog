import React from 'react'
import PostCard from '../ui/PostCard'

interface LatestPostsSectionProps {
  posts: Array<{  // ここを posts に修正
   id: number;
    title: string;
    content: string;
    category: string;
    created_at: string; 
  }>
}

// 引数の後ろは「:」で型を指定する
function LatestPostsSection({ posts }: LatestPostsSectionProps) {
  return (
    <section className="max-w-6xl mx-auto py-12 px-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
        <span className="bg-blue-500 w-2 h-8 mr-3 rounded-full"></span>
        新着記事
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.slice(0, 6).map((posts) => (
          <PostCard key={posts.id} post={posts} />
        ))}
      </div>
    </section>
  )
}

export default LatestPostsSection
